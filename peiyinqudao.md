---
title: 配音渠道
description: 所有可用的TTS语音合成渠道一览
---

# 配音渠道


配音（TTS）是视频翻译的第三步，将翻译后的字幕文本转换为语音音频。pyVideoTrans 支持 30+ 种配音渠道。![](https://pvtr2.pyvideotrans.com/1787031115121_image.png)

> 也可通过左侧面板**文字配音**单独使用配音功能，支持导入多个srt字幕文件或txt文件进行配音。
>
> 角色`clone`代表使用原始视频中的说话人音色进行配音，以实现语音克隆，该角色仅在主界面`视频翻译`功能中可用。
>
> 有`clone`角色渠道均支持自定义参考音频，即克隆你自己准备的一段3-10s的音频中的音色，使用该音色配音，具体方法见下方的`制作和使用参考音频`
---

## 开箱即用（免费）

无需复杂配置，非常适合新手。

| 渠道 | 说明 | 推荐度 |
|------|------|--------|
| [Edge-TTS(免费)](/edgetts) | 微软免费接口，声音自然，支持所有语种 | ⭐⭐⭐ **默认推荐** |
| gTTS(免费) | Google TTS，基础质量，国内需科学上网 | ⭐⭐ |

> ⚠️ Edge-TTS 短时间内大量使用可能触发限流，建议在高级选项中将并发数设为 1，暂停秒数设为 5-10。

---

## 内置（免费）

首次使用时自动下载模型。

> GPU 加速列中`优先使用`是指：只要CUDA可用，无论是否选中了`启用CUDA加速`，都优先尝试使用
>

| 渠道 | 说明 | GPU 加速 |支持克隆(`clone`角色)| 推荐度 |
|------|------|---------|--------|--------|
| [Qwen3-TTS(内置)](/qwen-tts) | 支持中文、英文、日文、韩文、德文、法文、俄文、葡萄牙文、西班牙文和意大利文 | 优先使用 |✅ | ⭐⭐⭐ 推荐 |
| [F5-TTS(内置)](/f5tts) | 中英日法德俄意、西班牙、印地、阿拉伯语 | ✅ |  ✅ |⭐⭐⭐ |
| [OmniVoice-TTS](/ominivoice) | 支持600种语言(v4.05起内置) | 优先使用 | ✅ | ⭐⭐⭐ 推荐 |
| [Audio.cpp](/audiocpp) | 多个模型 | ✅| ✅ | ⭐⭐⭐ |
| Confucius-TTS(内置)*v4.06起* | 中文、英文、日语、韩语、德语、法语、西班牙语、印尼语、意大利语、泰语、葡萄牙语、俄语、马来语、越南语 | ✅| ✅ | ⭐⭐⭐ |
| MOSS-TTS-Nano(内置) | 中文、英文、德文、西班牙文、法文、日文、意大利文、匈牙利文、韩文、俄文、波斯文、阿拉伯文、波兰文、葡萄牙文、捷克文、瑞典文、希腊文、土耳其文 | ❌ | ✅ |⭐⭐ |
| ZipVoice(内置) | 中英语言 | X固定CPU | ✅ |⭐⭐⭐ 推荐 |
| [Piper(内置)](/vitspiper) | 轻量级，支持20种语言 | ❌ |  ❌ |⭐⭐ |
| ChatterBox(内置) | 阿拉伯语、德语、希腊语、英语、西班牙语、芬兰语、法语、希伯来语、印地语、意大利语、日语、韩语、马来语、荷兰语、挪威语、波兰语、葡萄牙语、俄语、瑞典语、斯瓦希里语、土耳其语、中文 | ✅ |✅ | ⭐⭐⭐ 推荐 |
| Supertonic3(内置) | 英语、韩语、日语、阿拉伯语、捷克语、德语、希腊语、西班牙语、法语、印地语、匈牙利语、印尼语、意大利语、荷兰语、波兰语、葡萄牙语、罗马尼亚语、俄语、瑞典语、土耳其语、乌克兰语、越南语 | ❌ | ❌ | ⭐⭐ |
| [VITS(内置)](/vitspiper) | 中英配音 | ❌ | ❌ | ⭐⭐ |
| Higgs-audio-v3(内置) | 所有内置语言，纯CPU运行需20G内存,GPU加速需显存大于10G | 优先使用 | ✅ | ⭐⭐ |



> ChatterBox 第一次使用除了模型外，还需要从 github.com 下载2个文件到 `models`文件夹内，如果下载失败，请手动从该地址下载 [https://github.com/explosion/spacy-pkuseg/releases/download/v0.0.26/spacy_ontonotes.zip](https://github.com/explosion/spacy-pkuseg/releases/download/v0.0.26/spacy_ontonotes.zip),下载后解压，会得到2个文件，分别是`features.msgpack`和`weights.npz`，将他们复制到`软件目录/models/pkuser_home` 内，如果不存在该文件夹，请新建




**因国内网络环境问题，加之模型都比较巨大，自动下载有可能失败，如果失败，[请点击查看模型下载地址和手动下载方式](/aboutmodels)**

---

## 本地自行部署

| 渠道 | 说明 | 支持克隆(`clone`角色) | 推荐度 |
|------|------|---------|--------|
| [GPT-SoVITS](/gptsovits) | 支持中英日韩粤 | ✅ | ⭐⭐⭐ 推荐 |
| [Index-TTS](/gradiowin) | 中英 | ✅ | ⭐⭐⭐ 推荐 |
| [Audio.cpp](/audiocpp) | 多个配音模型 | ✅ | ⭐⭐⭐ 推荐 |
| [VoxCPM-TTS](/gradiowin) | 阿拉伯语、缅甸语、中文、丹麦语、荷兰语、英语、芬兰语、法语、德语、希腊语、希伯来语、印地语、印尼语、意大利语、日语、高棉语、韩语、老挝语、马来语、挪威语、波兰语、葡萄牙语、俄语、西班牙语、斯瓦希里语、瑞典语、他加禄语、泰语、土耳其语、越南语 | ✅ | ⭐⭐⭐ |
| [CosyVoice](/cosyvoice) | 中文、英语、日语、韩语、德语、西班牙语、法语、意大利语、俄语 | ✅ | ⭐⭐ |
| [FireRed3-TTS](/gradiowin) | Arabic · Cantonese · Chinese · Czech · Dutch · English · Finnish · French · German · Greek · Hindi · Indonesian · Italian · Japanese · Korean · Polish · Portuguese · Romanian · Russian · Spanish · Thai · Turkish · Ukrainian · Vietnamese | ✅ | ⭐⭐ |
| [ChatTTS](/chattts) | 支持中英 | — | ⭐⭐ |
| [Fish-TTS](/fishtts) | 支持内置所有语言 | — | ⭐ |
| [Kokoro-TTS](/kokorotts) | 中英韩意葡德法印地 | — | ⭐ |
| [Spark-TTS](/gradiowin) | 中英 | ✅ | ⭐⭐ |
| [clone-voice](/clone-voice) | 已不维护 | ✅ | ⭐ |


## 制作和使用参考音频

> 支持 `克隆` 的配音渠道(配音角色含有`clone`,选此即克隆原视频中说话银色)，均可使用参考音频，在配音角色中选择该参考音频，配音时将自动使用该音频音色进行配音，参考音频统一在**菜单 → TTS设置 → 设置参考音频**中配置。

### 操作步骤

0. 录制或从已有音频中截取`3-10s`时长的**单声道**音频片段，保存为**wav**格式，并确保发音清晰、无背景噪声。
1. 打开`菜单 → TTS设置 → 设置参考音频`界面
2. 在文本框中填写以下格式的内容：
```
音频文件名#该音频文件中对应的文字
```
3. 将参考音频文件放置在 `软件目录/f5-tts` 文件夹内（如该文件夹不存在请手动创建）

### 示例

假设你有一个音频文件 `nverguo.wav`，音频内容是「女儿国王说话」，则填写：

```
nverguo.wav#女儿国王说话
```

![参考音频放到pyVideotrans软件内的f5-tts文件夹内，别搞错](https://pvtr2.pyvideotrans.com/1742227715529_image.png)

![](https://pvtr2.pyvideotrans.com/1787029774996_image.png)

### 参考音频要求

| 项目 | 要求 |
|------|------|
| 格式 | WAV 格式，单声道 |
| 时长 | 3~10 秒|
| 内容 | 发音清晰，无背景噪音 |
| 文字 | 必须与音频内容一致 |


---

## 专业云服务（需 API Key）

| 渠道 | 说明 | 推荐度 |
|------|------|--------|
| [DeepSeek](/deepseek) | DeepSeek的语音合成服务，支持普通话、粤语、英语、日语、韩语、马来语、阿拉伯语、印尼语、泰语、越南语 | ⭐⭐⭐ |
| [Azure TTS](/azuretts) | 微软专业级语音服务 | ⭐⭐⭐ |
| [OpenAI TTS](/openaitts) | 声音技术领先 | ⭐⭐⭐ |
| [字节语音合成2.0](/doubao2tts) | 中文发音地道 | ⭐⭐⭐ |
| [阿里 Qwen-TTS](/qwen-tts) | 阿里云语音合成 | ⭐⭐⭐ |
| [Gemini TTS](/gemini-tts) | 谷歌 TTS | ⭐⭐ |
| [Elevenlabs.io](/elevenlabstts) | AI 音频技术公司 | ⭐⭐⭐ |
| [302.AI](/302ai) | 聚合平台 | ⭐⭐ |
| [Minimaxi](/minimaxi) | 需充值使用 | ⭐⭐ |
| [小米 TTS](/mitts) | 小米 AI 开放平台 | ⭐⭐ |
| [X.AI TTS](/xaitts) | x.ai 平台 | ⭐⭐ |
| [fish.audio ](/fishaudioapi) | 可平替 Elevenlabs ,国人开发，中文效果更佳 | ⭐⭐ |
| 硅基流动 | 在 翻译设置--硅基流动--选择使用的模型 |
| MinimaxAI | 在 翻译设置--MinimaxAI--选择使用的模型 |
| OpenRoute | 在 翻译设置--OpenRoute--选择使用的模型 |


---

## 自定义TTS API
[如果你有编程能力，或有自己的TTS 云服务，或想使用其他TTS提高的webUI，可查看自定义TTS API 渠道](/ttsapi)