---
title: 模型下载地址说明
date: 2024-01-22 14:33:00
description: 语音识别模型、TTS模型、字幕翻译模型、说话人分离模型、分离人声背景声模型、降噪模型
---

# 本软件涉及所有模型和下载地址

本页面列出所有用到的模型下载地址、下载后本地存放位置，若自动下载总是失败，可先删掉已下载的模型文件，然后尝试手动下载。

为减小软件体积，不内置任何模型，将在第一次使用时自动在线下载，主要从国外模型仓库`huggingface.co`、国内镜像站`hf-mirror.com`和 阿里魔塔`modelscope.cn`下载


> 模型体积普遍较大(1G-5G)，除了部分阿里模型位于国内阿里魔塔`modelscope.cn`网站，其他均位于国外网站`huggingface.co`，而此站国内已屏蔽，无法直接访问， 需科学上网(VPN/代理)，无科学上网时软件内部会自动切换至国内镜像站`hf-mirror.com`
>
> 即便已科学上网，但若是（VPN/代理）不够稳定可靠，长时间持续下载仍可能失败；
>
> 而国内镜像站下载较慢、有频率限制，仍有较大概率下载失败。
>
> 以上种种原因导致模型下载频频失败，很多其他错误也多由模型下载失败后间接引发。


**软件目录是指`sp.exe`或`sp.py`所在的文件夹**

- **国外模型仓库地址**：https://huggingface.co 
- **部分阿里模型和onnx模型将从阿里魔塔下载**： https://modelscope.cn

::: details 下载注意事项

一般每个模型都有多个文件组成，而不同模型可能存在相同名字的文件，例如大多都存在`model.safetensors`，如果你下载目录下已存在同名文件，浏览器可能为自动为你重命名，例如你下载的是`model.safetensors`,可能被自动命名为`model(2).safetensors`，你必须重新改回原名，然后放到要求的存放位置，软件才能识别到。


在 huggingface.co 网站，点击下载图标，即可下载该模型文件

![](https://pvtr2.pyvideotrans.com/1784297941847_image.png)


:::


## 语音识别渠道所用模型

### Qwen-ASR(内置) 

**0.6B模型：**
- 下载地址：https://huggingface.co/Qwen/Qwen3-ASR-0.6B-hf/tree/main  
- 存放位置：`软件目录/models/models--Qwen--Qwen3-ASR-0.6B-hf` 

**1.7B模型：**
- 下载地址：https://huggingface.co/Qwen/Qwen3-ASR-1.7B-hf/tree/main  
- 存放位置：`软件目录/models/models--Qwen--Qwen3-ASR-1.7B-hf`


### Firered中文(内置)
- 下载地址：https://modelscope.cn/models/himyworld/videotrans/resolve/master/fireredasr2aed.zip
- 存放位置：`软件目录/models/复制压缩包内的 fireredasr 文件夹到此`
### Dolphin(内置)
- 下载地址：https://modelscope.cn/models/himyworld/videotrans/resolve/master/dolphin.zip
- 存放位置：`软件目录/models/复制压缩包内的 dolphin 文件夹到此`
### Omnilingual亚洲语言(内置)
- 下载地址：https://modelscope.cn/models/himyworld/videotrans/resolve/master/omnilingual.zip
- 存放位置：`软件目录/models/复制压缩包内的 omnilingual 文件夹到此`
### nemotron-3.5-asr-0.6b
- 下载地址：https://huggingface.co/nvidia/nemotron-3.5-asr-streaming-0.6b/tree/main
- 存放位置：`软件目录/models/models--nvidia--nemotron-3.5-asr-streaming-0.6b`


### parakeet日语(内置)
- 下载地址：https://modelscope.cn/models/himyworld/videotrans/resolve/master/parakeet-ja.zip
- 存放位置：`软件目录/models/复制压缩包内的 parakeet 文件夹到此`

### Moss-Diarize(内置)
- 下载地址：https://huggingface.co/OpenMOSS-Team/MOSS-Transcribe-Diarize/tree/main
- 存放位置：`软件目录/models/models--OpenMOSS-Team--MOSS-Transcribe-Diarize`

### faster-whisper(内置)

| 模型名称 | 本地存放位置 | 下载地址 |
|----------|-----------|---------------------|
| tiny | `软件目录/modles/models--Systran--faster-whisper-tiny` | https://huggingface.co/Systran/faster-whisper-tiny/tree/main |
| base | `软件目录/modles/models--Systran--faster-whisper-base` | https://huggingface.co/Systran/faster-whisper-base/tree/main |
| small | `软件目录/modles/models--Systran--faster-whisper-small` | https://huggingface.co/Systran/faster-whisper-small/tree/main |
| medium | `软件目录/modles/models--Systran--faster-whisper-medium` | https://huggingface.co/Systran/faster-whisper-medium/tree/main |
| large-v1 | `软件目录/modles/models--Systran--faster-whisper-large-v1` | https://huggingface.co/Systran/faster-whisper-large-v1/tree/main |
| large-v2 | `软件目录/modles/models--Systran--faster-whisper-large-v2` | https://huggingface.co/Systran/faster-whisper-large-v2/tree/main |
| large-v3 | `软件目录/modles/models--Systran--faster-whisper-large-v3` | https://huggingface.co/Systran/faster-whisper-large-v3/tree/main |
| large-v3-turbo | `软件目录/modles/models--mobiuslabsgmbh--faster-whisper-large-v3-turbo` | https://huggingface.co/mobiuslabsgmbh/faster-whisper-large-v3-turbo/tree/main |
|----------|-----------|---------------------|
| tiny.en | `软件目录/modles/models--Systran--faster-whisper-tiny.en` | https://huggingface.co/Systran/faster-whisper-tiny.en/tree/main |
| base.en | `软件目录/modles/models--Systran--faster-whisper-base.en` | https://huggingface.co/Systran/faster-whisper-base.en/tree/main |
| small.en | `软件目录/modles/models--Systran--faster-whisper-small.en` | https://huggingface.co/Systran/faster-whisper-small.en/tree/main |
| medium.en | `软件目录/modles/models--Systran--faster-whisper-medium.en` | https://huggingface.co/Systran/faster-whisper-medium.en/tree/main |
|----------|-----------|---------------------|
| distil-large-v2 | `软件目录/modles/models--Systran--faster-distil-whisper-large-v2` | https://huggingface.co/Systran/faster-distil-whisper-large-v2/tree/main |
| distil-large-v3 | `软件目录/modles/models--Systran--faster-distil-whisper-large-v3` | https://huggingface.co/Systran/faster-distil-whisper-large-v3/tree/main |
| distil-large-v3.5 | `软件目录/modles/models--distil-whisper--distil-large-v3.5-ct2` | https://huggingface.co/distil-whisper/distil-large-v3.5-ct2/tree/main |
| distil-small.en | `软件目录/modles/models--Systran--faster-distil-whisper-small.en` | https://huggingface.co/Systran/faster-distil-whisper-small.en/tree/main |
| distil-medium.en | `软件目录/modles/models--Systran--faster-distil-whisper-medium.en` | https://huggingface.co/Systran/faster-distil-whisper-medium.en/tree/main |



### openai-whisper(内置)

> 下载后的.pt模型文件直接放在 `软件目录/models` 文件夹内即可

- **tiny.en**  https://openaipublic.azureedge.net/main/whisper/models/d3dd57d32accea0b295c96e26691aa14d8822fac7d9d27d5dc00b4ca2826dd03/tiny.en.pt
- **tiny**  https://openaipublic.azureedge.net/main/whisper/models/65147644a518d12f04e32d6f3b26facc3f8dd46e5390956a9424a650c0ce22b9/tiny.pt
- **base.en**  https://openaipublic.azureedge.net/main/whisper/models/25a8566e1d0c1e2231d1c762132cd20e0f96a85d16145c3a00adf5d1ac670ead/base.en.pt
- **base**  https://openaipublic.azureedge.net/main/whisper/models/ed3a0b6b1c0edf879ad9b11b1af5a0e6ab5db9205f891f668f8b0e6c6326e34e/base.pt
- **small.en**  https://openaipublic.azureedge.net/main/whisper/models/f953ad0fd29cacd07d5a9eda5624af0f6bcf2258be67c92b79389873d91e0872/small.en.pt
- **small**  https://openaipublic.azureedge.net/main/whisper/models/9ecf779972d90ba49c06d968637d720dd632c55bbf19d441fb42bf17a411e794/small.pt
- **medium.en**  https://openaipublic.azureedge.net/main/whisper/models/d7440d1dc186f76616474e0ff0b3b6b879abc9d1a4926b7adfa41db2d497ab4f/medium.en.pt
- **medium**  https://openaipublic.azureedge.net/main/whisper/models/345ae4da62f9b3d59415adc60127b97c714f32e89e936602e85993674d08dcb1/medium.pt
- **large-v1**  https://openaipublic.azureedge.net/main/whisper/models/e4b87e7e0bf463eb8e6956e646f1e277e901512310def2c24bf0e11bd3c28e9a/large-v1.pt
- **large-v2**  https://openaipublic.azureedge.net/main/whisper/models/81f7c96c852ee8fc832187b0132e569d6c3065a3252ed18e56effd0b6a73e524/large-v2.pt
- **large-v3**  https://openaipublic.azureedge.net/main/whisper/models/e5b1a55b89c1367dacf97e3e19bfd829a01529dbfdeefa8caeb59b3f1b81dadb/large-v3.pt
- **large**  https://openaipublic.azureedge.net/main/whisper/models/e5b1a55b89c1367dacf97e3e19bfd829a01529dbfdeefa8caeb59b3f1b81dadb/large-v3.pt
- **large-v3-turbo**  https://openaipublic.azureedge.net/main/whisper/models/aff26ae408abcba5fbf8813c21e62b0941638c5f6eebfb145be0c9839262a19a/large-v3-turbo.pt
- **turbo**  https://openaipublic.azureedge.net/main/whisper/models/aff26ae408abcba5fbf8813c21e62b0941638c5f6eebfb145be0c9839262a19a/large-v3-turbo.pt

### HuggingFace_ASR(内置)

显示的模型名称为

- `Audio8/ARK-ASR-0.6B`   支持中英等10多种语言识别
- `Audio8/ARK-ASR-3B`     支持中英等10多种语言识别
- `zai-org/GLM-ASR-Nano-2512` 支持中英识别
- `ibm-granite/granite-speech-4.1-2b` 支持法英德西班牙
- `nvidia/parakeet-ctc-1.1b`  英语
- `nvidia/nemotron-3.5-asr-streaming-0.6b`  欧洲系语言及日韩越等40种
- `nvidia/parakeet-tdt-0.6b-v3`  英语等欧洲系语言
- `reazon-research/japanese-wav2vec2-large-rs35kh` 日语
- `kotoba-tech/kotoba-whisper-v2.0` 日语
- `vinai/Phowhisper-large`  越南语
- `nguyenvulebinh/wav2vec2-base-vietnamese-250h` 越南语
- `biodatlab/whisper-th-large-v3` 泰语
- `sakares/wav2vec2-large-xlsr-thai-demo` 泰语
- `SiangLao/xlsr-53-lao-asr`  老挝语
- `chuuhtetnaing/whisper-large-v3-myanmar` 缅甸语
- `1morecupofhottea/whisper-turbo-khmer-v9` 柬埔寨高棉语 
- `anke01/whisper-small-uyghur` 维吾尔语
- `billingsmoore/tibetan-asr-nict-tib1-whisper-small` 藏语
- `kingabzpro/whisper-large-v3-urdu` 乌尔都语
- `vasista22/whisper-tamil-small` 泰米尔语
- `theainerd/Wav2Vec2-large-xlsr-hindi` 印地语
- `cautroi/whisper-large-v3-id` 印尼语
- `Khalsuu/filipino-wav2vec2-l-xls-r-300m-official` 菲律宾
- `navai-uz/whisper-medium-uzbek` 乌兹别克语
- `MohammadKhosravi/whisper-large-v3-Persian` 波斯语
- `Ghost3454/translynx-pakistani-punjabi-whisper-small` 巴基斯坦旁遮普语
- `turkmedstt/whisper-large-v3-turkish-general` 土耳其语
- `anton-l/wav2vec2-large-xlsr-53-mongolian` 蒙古语
- `openai/whisper-large-v3` 所有内置语言


* 下载地址：https://huggingface.co/此处使用显示的模型名称替代/tree/main
* 存放位置：`软件目录/models/models--此处使用显示的名称名称替代，并将斜杠改为2个中横线`

例如显示名称是 `Audio8/ARK-ASR-0.6B`

那么下载地址就是`https://huggingface.co/Audio8/ARK-ASR-0.6B/tree/main`, 
存放位置就是 `软件目录/models/models--Audio8--ARK-ASR-0.6B`

看到规律了吗？下载地址就是直接使用模型显示名称替换，存放位置也是替换，并将显示名称中的`/` 斜线改为`--`



### whisper.cpp

- windows预编译包下载地址：下载后里面的`whisper-cli`文件夹复制到`软件目录内`
	* https://huggingface.co/mortimerme/repocollect/resolve/main/whisper-cpp-win32.zip?download=true
	* https://modelscope.cn/models/himyworld/videotrans/resolve/master/whisper-cpp-win32.zip
- 模型下载地址：
	
	* 下载源(墙外)：[https://huggingface.co/ggerganov/whisper.cpp/tree/main](https://huggingface.co/ggerganov/whisper.cpp/tree/main)
	* 镜像下载源：[https://hf-mirror.com/ggerganov/whisper.cpp/tree/main](https://hf-mirror.com/ggerganov/whisper.cpp/tree/main)
> 单文件模型，下载后将 `.bin` 文件放入 `软件目录/models` 文件夹内。


----
----

## 翻译渠道(字幕翻译)所用模型

### Hy-MT2-1.8B(内置)
- 下载地址： https://huggingface.co/tencent/Hy-MT2-1.8B/tree/main
- 存放位置：`软件目录/models/models--tencent--Hy-MT2-1.8B`
### M2M100(内置)
- 下载地址：https://modelscope.cn/models/himyworld/videotrans/resolve/master/m2m100_12b_model.zip
- 存放位置：`软件目录/models/复制压缩包内的 m2m100_12b 文件夹到此`

----
----

## 配音渠道所用模型

### Piper(内置)
- 下载地址：https://huggingface.co/rhasspy/piper-voices/tree/main  
- 存放位置：`软件目录/models/piper`

### VITS(内置)
- 下载地址：https://modelscope.cn/models/himyworld/videotrans/resolve/master/vits-tts.zip
- 存放位置：`软件目录/models/复制压缩包内的 vits 文件夹到此`

### ZipVoice(内置)
- 下载地址：https://modelscope.cn/models/himyworld/videotrans/resolve/master/zipvoice-tts.zip
- 存放位置：`软件目录/models/复制压缩包内的 zipvoice 文件夹到此`

### OmniVoice(内置)
- 下载地址：https://huggingface.co/k2-fsa/OmniVoice/tree/main  
- 存放位置：`软件目录/models/models--k2-fsa--OmniVoice`

### MOSS-TTS-Nano(内置)
- 下载地址：https://huggingface.co/OpenMOSS-Team/MOSS-TTS-Nano-100M/tree/main  
- 存放位置：`软件目录/models/MOSS-TTS-Nano-100M`
- 下载地址：https://huggingface.co/OpenMOSS-Team/MOSS-Audio-Tokenizer-Nano-ONNX/tree/main  
- 存放位置：`软件目录/models/MOSS-Audio-Tokenizer-Nano-ONNX`

### ChatterBox(内置)
- 下载地址：https://huggingface.co/ResembleAI/chatterbox/tree/main  
- 存放位置：`软件目录/models/models--ResembleAI--chatterbox`
> ChatterBox 第一次使用除了模型外，还需要从 github.com 下载2个文件到 `models`文件夹内，如果下载失败，请手动从该地址下载 [https://github.com/explosion/spacy-pkuseg/releases/download/v0.0.26/spacy_ontonotes.zip](https://github.com/explosion/spacy-pkuseg/releases/download/v0.0.26/spacy_ontonotes.zip),下载后解压，会得到2个文件，分别是`features.msgpack`和`weights.npz`，将他们复制到`软件目录/models/pkuser_home` 内，如果不存在该文件夹，请新建


### Supertonic(内置)
- 下载地址：https://huggingface.co/Supertone/supertonic-3/tree/main  
- 存放位置：`软件目录/models/models--Supertone--supertonic-3`

### Higgs-audio-v3(内置)
- 下载地址：https://huggingface.co/multimodalart/higgs-audio-v3-tts-4b-transformers/tree/main  
- 存放位置：`软件目录/models/models--multimodalart--higgs-audio-v3-tts-4b-transformers`

### Qwen3-TTS(内置)
- 下载地址：https://huggingface.co/Qwen/Qwen3-TTS-12Hz-0.6B-Base/tree/main
- 存放位置：`软件目录/models/models--Qwen--Qwen3-TTS-12Hz-0.6B-Base`

- 下载地址：https://huggingface.co/Qwen/Qwen3-TTS-12Hz-0.6B-CustomVoice/tree/main
- 存放位置：`软件目录/models/models--Qwen--Qwen3-TTS-12Hz-0.6B-CustomVoice`
### Confucius-TTS(内置)
- 下载地址：https://huggingface.co/netease-youdao/Confucius4-TTS/tree/main
- 存放位置：`软件目录/models/models--netease-youdao--Confucius4-TTS`

- 下载地址：https://huggingface.co/facebook/w2v-bert-2.0/tree/main
- 存放位置：`软件目录/models/models--models--facebook--w2v-bert-2.0`

- 下载地址：https://huggingface.co/nvidia/bigvgan_v2_22khz_80band_256x/tree/main
- 存放位置：`软件目录/models/models--nvidia--bigvgan_v2_22khz_80band_256x`

- 下载地址：https://huggingface.co/funasr/campplus/tree/main
- 存放位置：`软件目录/models/models--funasr--campplus`

### F5-TTS(内置)

- 官方中英模型(1.35G)：https://huggingface.co/SWivid/F5-TTS/tree/main/F5TTS_v1_Base
> 存放位置: `软件目录/models/models--SWivid--F5-TTS/F5TTS_v1_Base`

- 日语模型(5.6G)：https://huggingface.co/Jmica/F5TTS/tree/main/JA_21999120
> 存放位置: `软件目录/models/models--Jmica--F5TTS/JA_21999120`

- 法语模型(5.4G)：https://huggingface.co/RASPIAUDIO/F5-French-MixedSpeakers-reduced/tree/main
> 存放位置: `软件目录/models/models--RASPIAUDIO--F5-French-MixedSpeakers-reduced`

- 德语模型(1.35G)：https://huggingface.co/hvoss-techfak/F5-TTS-German/tree/main
> 存放位置: `软件目录/models/models--hvoss-techfak--F5-TTS-German`

- 俄语模型(3.4G)：https://huggingface.co/hotstone228/F5-TTS-Russian/tree/main
> 存放位置: `软件目录/models/models--hotstone228--F5-TTS-Russian`

- 意大利语模型(1.35G)：https://huggingface.co/alien79/F5-TTS-italian/tree/main
> 存放位置: `软件目录/models/models--alien79--F5-TTS-italian`

- 西班牙语模型(5.4G)：https://huggingface.co/jpgallegoar/F5-Spanish/tree/main
> 存放位置: `软件目录/models/models--jpgallegoar--F5-Spanish`

- 印地语模型(2.5G)：https://huggingface.co/SPRINGLab/F5-Hindi-24KHz/tree/main
> 存放位置: `软件目录/models/models--SPRINGLab/F5-Hindi-24KHz`

- 阿拉伯语模型(2.6G)：https://huggingface.co/silma-ai/silma-tts/tree/main
> 存放位置: `软件目录/models/models--silma-ai--silma-tts`

- 土耳其语模型(5.6G)：https://huggingface.co/multilingual-tts/F5-TTS-OpenBible-Turkish/tree/main
> 存放位置: `软件目录/models/models--multilingual-tts--F5-TTS-OpenBible-Turkish`

- 越南语模型(5.6G)：https://huggingface.co/multilingual-tts/F5-TTS-OpenBible-Vietnamese/tree/main
> 存放位置: `软件目录/models/models--multilingual-tts--F5-TTS-OpenBible-Vietnamese`


----
----

## 说话人分离模型

### 内置模型: 
- 下载地址：https://modelscope.cn/models/himyworld/videotrans/tree/master/onnx 

在该地址页下载`3dspeaker_speech_eres2net_large_sv_zh-cn_3dspeaker_16k.onnx` 、`nemo_en_titanet_small.onnx`、`seg_model.onnx` 这3个文件
- 存放位置：`软件目录/models/onnx/将下载的3个文件放到此处`
### pyannote
- 下载地址：https://huggingface.co/pyannote/speaker-diarization-3.1
- 存放位置: `软件目录/models/models--pyannote--speaker-diarization-3.1`

### Ali camp++: 
- 下载地址： https://modelscope.cn/models/iic/speech_campplus_speaker-diarization_common
- 存放位置：`软件目录/models/speech_campplus_speaker-diarization_common`

## 分离人声背景模型、降噪模型、标点恢复模型
下载地址：https://modelscope.cn/models/himyworld/videotrans/tree/master/onnx
存放位置：下载该页面所有 .onnx 文件后存放到 `软件目录/models/onnx/` 文件夹内


## 实时语音识别模型
- 下载地址: https://modelscope.cn/models/himyworld/videotrans/resolve/master/realtimestt.zip
- 存放位置: 下载后解压回看到一个 onnx 文件夹，将其内所有文件复制到 `软件目录/models/onnx/`
