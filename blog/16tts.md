---
title: 16款本地TTS（语音克隆）模型大盘点，不懂代码也能玩转！
date: 2026-06-22 14:33:00
description: 16款本地TTS（语音克隆）模型大盘点，不懂代码也能玩转！
---

AI 语音克隆和配音（TTS）不仅效果逼真，很多还能直接模仿你自己的声音。

其实，现在有很多**免费开源、可以部署在自己电脑上**的TTS模型！

不懂代码也没关系，有很多热心开发者制作的“**一键整合包**”，下载解压双击启动就能用。整理了一下目前较为活跃的 16 款本地 TTS 模型，从**速度、语言、资源消耗**等维度看看哪款最适合你！

---

## 太长不看版！

不想看长篇大论，直接根据需求对号入座：

*   **只要中文配音最好听：** `index-tts` / `F5-TTS` / `Qwen3-TTS` / `Confucius4-TTS` / `CosyVoice3`
*   **要做多语言/出海短视频：** `OmniVoice` / `Fish-TTS` / `VoxCPM` / `ChatterBox`
*   **电脑配置一般，只求速度快：** `Kokoro-TTS` / `supertonic` / `ChatTTS` / `MOSS-TTS-Nano`
*   **想用自己的声音训练（炼丹）：** 首推 `GPT-SoVITS`

---

## 16款TTS 模型详细盘点

为了方便大家对比，我将它们的核心特点做了一个梳理。
*(注：文中附带了 GitHub 开源地址和在线体验地址，小白朋友可直接复制名字去 B站 搜索“XXX 一键整合包”)*


### 1. 综合全能 & 中文王者

*   **F5-TTS**
    *   **出身：** 上海交大开源
    *   **语言：** 中文、英文
    *   **特点：** 容易部署，综合体验优秀，中英双语的克隆效果非常自然。
    *   **开源地址：** github.com/SWivid/F5-TTS
    *   **在线体验：** huggingface.co/spaces/mrfakename/E2-F5-TTS
*   **index-tts**
    *   **出身：** B站开源
    *   **语言：** 中文、英文
    *   **特点：** **效果极佳！** 声音表现力天花板级别，但代价是*生成速度比较慢*，适合对音质要求极高的“慢工出细活”玩家。
    *   **开源地址：** github.com/index-tts/index-tts
    *   **在线体验：** modelscope.cn/studios/IndexTeam/IndexTTS-2-Demo
*   **Qwen3-TTS**
    *   **出身：** 阿里开源
    *   **语言：** 中英日韩法德等 10 种语言
    *   **特点：** 大厂出品，**中文发音极其地道**，不过生成速度略慢，需要一点耐心。
    *   **开源地址：** github.com/QwenLM/Qwen3-TTS
    *   **在线体验：** modelscope.cn/studios/Qwen/Qwen3-TTS
*   **GPT-SoVITS**
    *   **出身：** 国内大神 RVC-Boss 开源
    *   **语言：** 中、英、日、韩、粤语
    *   **特点：** 非常适合小白用很少的干音（几分钟甚至十几秒）来微调训练出专属的语音模型。
    *   **开源地址：** github.com/RVC-Boss/GPT-SoVITS

### 2. 追求极致速度 & 节省资源

*   **Kokoro-82M**
    *   **语言：** 中英日、法意西葡、印地语
    *   **特点：** 极致轻量化！**速度直接起飞**，对电脑配置要求极低。但缺点是感情起伏比较平淡，效果一般。
    *   **开源地址：** github.com/hexgrad/kokoro
    *   **在线体验：** huggingface.co/hexgrad/Kokoro-82M
*   **Confucius4-TTS**
    *   **出身：** 网易有道开源
    *   **语言：** 14 种主流语言
    *   **特点：** 速度非常快，而且声音效果不错，属于**既要速度又要质量**的均衡之选。
    *   **开源地址：** github.com/netease-youdao/Confucius4-TTS
    *   **在线体验：** confucius4-tts.youdao.com/gradio.
*   **ChatTTS**
    *   **语言：** 中文、英文
    *   **特点：**  对话感极强，甚至能自动加“呃、啊”等语气词，生成速度较快。
    *   **开源地址：** github.com/2noise/ChatTTS
    *   **在线体验：** huggingface.co/spaces/taa/ChatTTS_Speaker
*   **MOSS-TTS-Nano**
    *   **出身：** 模思 OpenMoss
    *   **语言：** 19 种主流语言
    *   **特点：** 主打一个 Nano（小巧），生成速度极快，适合轻量级应用场景。
    *   **开源地址：** github.com/OpenMOSS/MOSS-TTS-Nano
    *   **在线体验：** modelscope.cn/studios/openmoss/MOSS-TTS-Nano

### 3. 语言大师 & 方言达人

*   **CosyVoice3**
    *   **出身：** 阿里开源
    *   **语言：** 9国语言 + **18种以上中文方言**
    *   **特点：** 妥妥的方言神器！支持粤语、四川话、东北话、上海话等，方言配音博主必备。
    *   **开源地址：** github.com/FunAudioLLM/CosyVoice
    *   **在线体验：** modelscope.cn/studios/FunAudioLLM/Fun-CosyVoice3-0.5B
*   **OmniVoice**
    *   **出身：** 小米开源
    *   **语言：** **支持 600 多种语言！**
    *   **特点：** 语言库庞大到离谱，如果你需要非常冷门的小语种，找它就对了。
    *   **开源地址：** github.com/k2-fsa/OmniVoice
    *   **在线体验：** huggingface.co/spaces/k2-fsa/OmniVoice
*   **Fish-Speech**
    *   **出身：** fish.audio
    *   **语言：** 80 多种语言分级支持
    *   **特点：** 零样本克隆能力极强，中英日效果最好，生态好，非常适合做海外多语言矩阵账号(明确要求不得用于商业，其他模型要么未明确，要么只要有被克隆声音授权就可商用)。
    *   **开源地址：** github.com/fishaudio/fish-speech
*   **VoxCPM2**
    *   **出身：** 面壁智能开源
    *   **语言：** 30+ 种语言及众多中文方言
    *   **特点：** 效果很不错，方言支持也很好，**但注意：必须有N卡（NVIDIA显卡）才能跑得动，其他模型无N卡也可用，虽然会极慢。**
    *   **开源地址：** github.com/OpenBMB/VoxCPM
    *   **在线体验：** modelscope.cn/studios/OpenBMB/VoxCPM2-Demo

### 4. 专精外语赛道

*   **supertonic-3**
    *   **语言：** 31种语言（以欧洲语言为主，也支持中文）
    *   **特点：** 极度适合英文和欧洲语系，速度极快，做外语短视频首选。
    *   **开源地址：** github.com/supertone-inc/supertonic
    *   **在线体验：** huggingface.co/spaces/Supertone/supertonic-3
*   **ChatterBox**
    *   **出身：** Resemble AI
    *   **语言：** 23种语言
    *   **特点：** 速度较快，同样在欧洲语言的表现上非常亮眼，也支持中文。
    *   **开源地址：** github.com/resemble-ai/chatterbox
    *   **在线体验：** huggingface.co/spaces/ResembleAI/Chatterbox-Multilingual-TTS
*   **Dia-1.6b**
    *   **出身：** Nari Labs
    *   **语言：** 仅支持英文
    *   **特点：** 专注英文赛道，术业有专攻。
    *   **开源地址：** github.com/nari-labs/dia
    *   **在线体验：** huggingface.co/spaces/nari-labs/Dia-1.6B
*   **Spark-tts**
    *   **出身：** 国内几所高校联合开源
    *   **语言：** 中、英
    *   **特点：** 高校学术背景，底层架构扎实，适合中英双语场景。
    *   **开源地址：** github.com/SparkAudio/Spark-TTS
    *   **在线体验：** huggingface.co/spaces/thunnai/SparkTTS

---

> 在线体验地址为 `modelscope.cn` 开头的国内可直接访问，`huggingface.co`开头的需科学上网



## 小白怎么用？

看到那么多 GitHub 链接先别晕！对于没有编程基础的朋友，**强烈建议不要直接去 GitHub 下载源码折腾。**

**正确姿势是：**
打开 B站 或 百度，直接搜索 **“模型名字 + 一键整合包”**（例如：*F5-TTS 一键整合包*）。你只需要：**下载 ➡️ 解压 ➡️ 双击启动 ➡️ 在网页里打字** ！


> 笔者也做了f5-tts/index-tts/confucius4等几款tts的整合包，存在百度网盘上，有需要可以看看，其他整合包请B站搜索
> 
> **https://pan.baidu.com/s/1GMDyj0zKIrOalKdjkXos-g?pwd=1234**


