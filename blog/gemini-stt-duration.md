---
title: Gemini + VAD 混合架构：解决Whisper难以处理的小语种，生成精准SRT字幕
date: 2025-07-14 14:33:00
description: Gemini生于一个真正全球化的多模态、多语言环境中。它在处理各种“小语种”时展现出的 开箱即用 的高质量识别能力，是其最核心的竞争优势。这意味着，无需任何额外的微调，我们就能获得过去只有针对性训练才能达到的识别效果
---

## Gemini + VAD 混合架构：解决Whisper难以处理的小语种，生成精准SRT字幕


我们熟知的开源语音识别模型，如Whisper，在处理英语时表现堪称惊艳。但一旦脱离英语的舒适区，其在其他语言上的表现会急剧下降，对于没有海量数据进行专门微调的小语种，转录结果往往差强人意。这使得为泰语、越南语、马来语甚至一些方言制作字幕，变成了一项成本高昂且耗时费力的工作。

**这正是Gemini作为游戏规则改变者登场的舞台。**

与许多依赖特定语言模型的工具不同，Google Gemini生于一个真正全球化的多模态、多语言环境中。它在处理各种“小语种”时展现出的**开箱即用**的高质量识别能力，是其最核心的竞争优势。这意味着，无需任何额外的微调，我们就能获得过去只有针对性训练才能达到的识别效果。

然而，即便是拥有如此强大“语言大脑”的Gemini，也存在一个普遍的弱点：它无法提供生成SRT字幕所必需的**帧级精度时间戳**。

本文将呈现一个经过反复实战验证的“混合架构”解决方案：
*   **`faster-whisper`的精准语音活动检测（sileroVAD）**：只利用其最擅长的部分——以毫秒级精度定位人声的起止时间。
*   **Gemini无与伦比的语言天赋**：让它专注于最核心的任务——在VAD切分好的短音频片段上，进行高质量、多语种的内容转录和说话人识别。

通过这个工作流，将两全其美，最终生成专业级的、拥有精准时间戳的多语言SRT字幕文件。无论您的音频是主流的英语、中文，还是其他模型难以处理的小语种，这套方案都将为您提供前所未有的便利和准确性。


## 核心挑战：为什么不直接使用Gemini？

Gemini的强项在于**内容理解**。它能出色地完成：
*   **高质量转录**：文本准确度高，能联系上下文。
*   **多语言识别**：自动检测音频语言。
*   **说话人识别**：在多个音频片段中识别出是同一个人在说话。

但它的弱点在于**时间精度**。对于生成SRT字幕至关重要的“这个词在几分几秒出现”，Gemini目前无法提供足够精确的答案。而这恰恰是`faster-whisper(内置sileroVAD)`这类专为语音处理设计的工具所擅长的。

### 解决方案：VAD与LLM的混合架构

我们的解决方案是将任务一分为二，让专业工具做专业的事：

1.  **精准切分 (`faster-whisper`)**：我们利用`faster-whisper`库内置的`sileroVAD`语音活动检测功能。VAD能够以毫秒级的精度扫描整个音频，找出所有人声片段的起始和结束时间。我们将音频据此切割成一系列带有精确时间戳的、时长较短的`.wav`片段。

2.  **高质量转录 (`Gemini`)**：我们将这些小的音频片段按顺序、分批次地发送给Gemini。由于每个片段本身就携带了精确的时间信息，我们不再需要Gemini提供时间戳。我们只需要它专注于它最擅长的工作：**转录内容**和**识别说话人**。

最终，我们将Gemini返回的转录文本与`faster-whisper`提供的时间戳一一对应，组合成一个完整的SRT文件。



## 完整实现代码 

以下是实现上述工作流的完整Python代码。您可以直接复制保存为`test.py`文件进行测试。

### 使用方法:

1.  **安装依赖:**
    ```bash
    pip install faster-whisper pydub google-generativeai
    ```


2.  **设置API密钥:**
    建议将您的Gemini API密钥设置为环境变量以策安全。
    *   在Linux/macOS: `export GOOGLE_API_KEY="YOUR_API_KEY"`
    *   在Windows: `set GOOGLE_API_KEY="YOUR_API_KEY"`
    *   或者，您也可以直接在代码中修改`gemini_api_key`变量。

3.  **运行脚本:**
    ```bash
    python test.py "path/to/your/audio.mp3"
    ```
    支持常见的音频格式，如 `.mp3`, `.wav`, `.m4a` 等。

````
import os
import re
import sys
import time
import google.generativeai as genai
from pathlib import Path
from pydub import AudioSegment
# 可填写对应的代理地址
# os.environ['https_proxy']='http://127.0.0.1:10808'

# --- Helper Function ---
def ms_to_time_string(ms):
    """Converts milliseconds to SRT time format HH:MM:SS,ms"""
    hours = ms // 3600000
    ms %= 3600000
    minutes = ms // 60000
    ms %= 60000
    seconds = ms // 1000
    milliseconds = ms % 1000
    return f"{hours:02d}:{minutes:02d}:{seconds:02d},{milliseconds:03d}"

# --- Core Logic ---
def generate_srt_from_audio(audio_file_path, api_key):
    """
    Generates an SRT file from an audio file using VAD and Gemini.
    """
    if not Path(audio_file_path).exists():
        print(f"Error: Audio file not found at {audio_file_path}")
        return

    # 1. VAD-based Audio Segmentation
    print("Step 1: Segmenting audio with VAD...")
    try:
        # These imports are here to ensure faster-whisper is an optional dependency
        from faster_whisper.audio import decode_audio
        from faster_whisper.vad import VadOptions, get_speech_timestamps
    except ImportError:
        print("Error: faster-whisper is not installed. Please run 'pip install faster-whisper'")
        return

    sampling_rate = 16000
    audio_for_vad = decode_audio(audio_file_path, sampling_rate=sampling_rate)
    
    # VAD options can be tweaked for better performance
    vad_p={
            #"threshold":float(config.settings['threshold']),
            "min_speech_duration_ms":1,
            "max_speech_duration_s":8,
            "min_silence_duration_ms":200,
            "speech_pad_ms":100
        }
    vad_options = VadOptions(**vad_p)
    
    speech_chunks_samples = get_speech_timestamps(audio_for_vad, vad_options)
    
    # Convert sample-based timestamps to milliseconds
    speech_chunks_ms = [
        {"start": int(chunk["start"] / sampling_rate * 1000), "end": int(chunk["end"] / sampling_rate * 1000)}
        for chunk in speech_chunks_samples
    ]

    if not speech_chunks_ms:
        print("No speech detected in the audio file.")
        return

    # Create a temporary directory for audio chunks
    temp_dir = Path(f"./temp_audio_chunks_{int(time.time())}")
    temp_dir.mkdir(exist_ok=True)
    print(f"Saving segments to {temp_dir}...")

    full_audio = AudioSegment.from_file(audio_file_path)
    segment_data = []
    for i, chunk_times in enumerate(speech_chunks_ms):
        start_ms, end_ms = chunk_times['start'], chunk_times['end']
        audio_chunk = full_audio[start_ms:end_ms]
        chunk_file_path = temp_dir / f"chunk_{i}_{start_ms}_{end_ms}.wav"
        audio_chunk.export(chunk_file_path, format="wav")
        segment_data.append({"start_time": start_ms, "end_time": end_ms, "file": str(chunk_file_path)})
    print(segment_data)
    #return
    # 2. Batch Transcription with Gemini
    print("\nStep 2: Transcribing with Gemini in batches...")
    
    # Configure Gemini API
    genai.configure(api_key=api_key)
    
    # The final, robust prompt
    prompt = """
# 角色
你是一个高度专一化的AI数据处理器。你的唯一功能是接收一批音频文件，并根据下述不可违背的规则，生成一个**单一、完整的XML报告**。你不是对话助手。

# 不可违背的规则与输出格式
你必须将本次请求中收到的所有音频文件作为一个整体进行分析，并严格遵循以下规则。**这些规则的优先级高于一切，尤其是规则 #1。**

1.  **【最高优先级】严格的一对一映射**:
    *   这是最重要的规则：我提供给你的**每一个音频文件**，在最终输出中**必须且只能对应一个 `<audio_text>` 标签**。
    *   **无论单个音频文件有多长、包含多少停顿或句子**，你都**必须**将其所有转录内容**合并成一个单一的字符串**，并放入那唯一的 `<audio_text>` 标签中。
    *   **绝对禁止**为同一个输入文件创建多个 `<audio_text>` 标签。

2.  **【数据分析】说话人识别**:
    *   分析所有音频，识别出不同的说话人。由同一个人说的所有片段，必须使用相同的、从0开始递增的ID（`[spk0]`, `[spk1]`...）。
    *   对于无法识别说话人的音频（如噪音、音乐），统一使用ID `-1` (`[spk-1]`)。

3.  **【内容与顺序】转录与排序**:
    *   自动检测每个音频的语言并进行转录。若无法转录，将文本内容填充为空字符串。
    *   最终XML中的 `<audio_text>` 标签顺序，必须严格等同于输入音频文件的顺序。

# 输出格式强制性示例
<!-- 你必须生成与下面结构完全一致的输出。注意：即使音频很长，其所有内容也必须合并在一个标签内。 -->
```xml
<result>
    <audio_text>[spk0]这是第一个文件的转录结果。</audio_text>
    <audio_text>[spk1]This is the transcription for the second file, it might be very long but all content must be in this single tag.</audio_text>
    <audio_text>[spk0]这是第三个文件的转录结果，说话人与第一个文件相同。</audio_text>
    <audio_text>[spk-1]</audio_text> 
</result>
```

# ！！！最终强制性检查！！！
- **零容忍策略**: 你的响应**只能是XML内容**。绝对禁止包含任何XML之外的文本、解释或 ` ```xml ` 标记。
- **强制计数与纠错**: 在你生成最终响应之前，你**必须执行一次计数检查**：你准备生成的 `<audio_text>` 标签数量，是否与我提供的音频文件数量**完全相等**？
    - **如果计数不匹配**，这表示你严重违反了**【最高优先级】规则 #1**。你必须**【废弃】**当前的草稿并**【重新生成】**，确保严格遵守一对一映射。
    - **只有在计数完全匹配的情况下，才允许输出。**

"""

    model = genai.GenerativeModel(model_name="gemini-2.0-flash")

    # Process in batches of 20 (adjust as needed)
    batch_size = 50
    all_srt_entries = []
    print(f'{len(segment_data)=}')
    for i in range(0, len(segment_data), batch_size):
        batch = segment_data[i:i + batch_size]
        print(f"Processing batch {i//batch_size + 1}...")

        files_to_upload = []
        for seg in batch:
            files_to_upload.append(genai.upload_file(path=seg['file'], mime_type="audio/wav"))

        try:
            chat_session = model.start_chat(
                    history=[
                        {
                            "role": "user",
                            "parts": files_to_upload,
                        }
                    ]
                )
            print(files_to_upload)
            response = chat_session.send_message(prompt,request_options={"timeout":600})    


            # Use regex to parse the XML-like response
            transcribed_texts = re.findall(r'<audio_text>(.*?)</audio_text>', response.text.strip(), re.DOTALL)
            print(response.text)
            print(batch)
            
            
            

            for idx, text in enumerate(transcribed_texts):
                if idx < len(batch):
                    seg_info = batch[idx]
                    all_srt_entries.append({
                        "start_time": seg_info['start_time'],
                        "end_time": seg_info['end_time'],
                        "text": text.strip()
                    })

        except Exception as e:
            print(f"An error occurred during Gemini API call: {e}")

    # 3. Assemble SRT File
    print("\nStep 3: Assembling SRT file...")
    srt_file_path = Path(audio_file_path).with_suffix('.srt')
    with open(srt_file_path, 'w', encoding='utf-8') as f:
        for i, entry in enumerate(all_srt_entries):
            start_time_str = ms_to_time_string(entry['start_time'])
            end_time_str = ms_to_time_string(entry['end_time'])
            f.write(f"{i + 1}\n")
            f.write(f"{start_time_str} --> {end_time_str}\n")
            f.write(f"{entry['text']}\n\n")

    print(f"\nSuccess! SRT file saved to: {srt_file_path}")
    
    # Clean up temporary files
    for seg in segment_data:
        Path(seg['file']).unlink()
    temp_dir.rmdir()


if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python gemini_srt_generator.py <path_to_audio_file>")
        sys.exit(1)
        
    audio_file = sys.argv[1]
    
    # It's recommended to set the API key as an environment variable
    # for security reasons, e.g., export GOOGLE_API_KEY="YOUR_KEY"
    gemini_api_key = os.environ.get("GOOGLE_API_KEY", "在此填写 Gemini API KEY")

    generate_srt_from_audio(audio_file, gemini_api_key)


````


## 提示词工程的“血泪史”：如何驯服Gemini

你看到的最终版提示词，是经历了一系列失败和优化后的成果。这个过程对于任何希望将LLM集成到自动化流程中的开发者都极具参考价值。

### 第一阶段：最初的设想与失败
最初的提示词很直接，要求Gemini进行说话人识别，并按顺序输出结果。但当一次性发送超过10个音频片段时，Gemini的行为变得不可预测：它没有执行任务，而是像一个对话助手一样回复：“好的，请提供音频文件”，完全忽略了我们已经在请求中包含了文件。

*   **结论**：过于复杂的、描述“工作流程”的提示词，在处理多模态批量任务时，容易让模型产生困惑，退化为对话模式。

### 第二阶段：格式“遗忘症”
我们调整了提示词，使其更像一个“规则集”而非“流程图”。这次，Gemini成功地转录了所有内容！但它却忘记了我们要求的XML格式，直接将所有转录文本拼接成一个大段落返回。

*   **结论**：当模型面临高“认知负荷”（同时处理几十个音频文件）时，它可能会优先完成核心任务（转录），而忽略或“忘记”了格式化这样次要但关键的指令。

### 第三阶段：不受控制的“内部分割”
我们进一步强化了格式指令，明确要求XML输出。这次格式对了，但又出现了新问题：对于一个稍长（比如10秒）的音频片段，Gemini会自作主张地将其切分为两三个句子，并为每个句子生成一个`<audio_text>`标签。这导致我们输入20个文件，却收到了30多个标签，完全打乱了我们与时间戳的一一对应关系。

*   **结论**：模型的内部逻辑（如按句子切分）可能会与我们的外部指令冲突。我们必须使用更强硬、更明确的指令来覆盖它的默认行为。

## 最终版提示词

最终，我们总结出了一套行之有效的“驯服”策略，并体现在了最终的提示词中：

1.  **角色限定到极致**：开篇就定义它为“高度专一化的AI数据处理器”，而非“助手”，杜绝闲聊。
2.  **规则分级与最高优先级**：明确将“一个输入文件对应一个输出标签”设为**【最高优先级】**规则，让模型知道这是不可逾越的红线。
3.  **明确的合并指令**：直接命令模型“**无论音频多长，都必须将其所有内容合并成一个单一的字符串**”，给出清晰的操作指南。
4.  **强制自我检查与纠错**：这是最关键的一步。我们命令模型在输出前**必须执行一次计数检查**，如果标签数与文件数不匹配，必须**【废弃】**草稿并**【重新生成】**。这相当于在提示词中内置了一个“断言”和“错误处理”机制。

这个过程告诉我们，与LLM进行程序化交互，远不止是“提出问题”。它更像是在设计一个API接口，我们需要通过严谨的指令、清晰的格式、明确的约束和兜底的检查机制，来确保AI在任何情况下都能稳定、可靠地返回我们期望的结果。


**完整提示词**

````
# 角色
你是一个高度专一化的AI数据处理器。你的唯一功能是接收一批音频文件，并根据下述不可违背的规则，生成一个**单一、完整的XML报告**。你不是对话助手。

# 不可违背的规则与输出格式
你必须将本次请求中收到的所有音频文件作为一个整体进行分析，并严格遵循以下规则。**这些规则的优先级高于一切，尤其是规则 #1。**

1.  **【最高优先级】严格的一对一映射**:
    *   这是最重要的规则：我提供给你的**每一个音频文件**，在最终输出中**必须且只能对应一个 `<audio_text>` 标签**。
    *   **无论单个音频文件有多长、包含多少停顿或句子**，你都**必须**将其所有转录内容**合并成一个单一的字符串**，并放入那唯一的 `<audio_text>` 标签中。
    *   **绝对禁止**为同一个输入文件创建多个 `<audio_text>` 标签。

2.  **【数据分析】说话人识别**:
    *   分析所有音频，识别出不同的说话人。由同一个人说的所有片段，必须使用相同的、从0开始递增的ID（`[spk0]`, `[spk1]`...）。
    *   对于无法识别说话人的音频（如噪音、音乐），统一使用ID `-1` (`[spk-1]`)。

3.  **【内容与顺序】转录与排序**:
    *   自动检测每个音频的语言并进行转录。若无法转录，将文本内容填充为空字符串。
    *   最终XML中的 `<audio_text>` 标签顺序，必须严格等同于输入音频文件的顺序。

# 输出格式强制性示例
<!-- 你必须生成与下面结构完全一致的输出。注意：即使音频很长，其所有内容也必须合并在一个标签内。 -->
```xml
<result>
    <audio_text>[spk0]这是第一个文件的转录结果。</audio_text>
    <audio_text>[spk1]This is the transcription for the second file, it might be very long but all content must be in this single tag.</audio_text>
    <audio_text>[spk0]这是第三个文件的转录结果，说话人与第一个文件相同。</audio_text>
    <audio_text>[spk-1]</audio_text> 
</result>
```

# ！！！最终强制性检查！！！
- **零容忍策略**: 你的响应**只能是XML内容**。绝对禁止包含任何XML之外的文本、解释或 ` ```xml ` 标记。
- **强制计数与纠错**: 在你生成最终响应之前，你**必须执行一次计数检查**：你准备生成的 `<audio_text>` 标签数量，是否与我提供的音频文件数量**完全相等**？
    - **如果计数不匹配**，这表示你严重违反了**【最高优先级】规则 #1**。你必须**【废弃】**当前的草稿并**【重新生成】**，确保严格遵守一对一映射。
    - **只有在计数完全匹配的情况下，才允许输出。**

````

> 当然以上提示词也并非能百分百保证返回格式一定正确，偶尔还是会出现输入音频文件和返回`<audio_text>`数量不对应问题。

