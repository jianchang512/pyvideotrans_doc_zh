---
title: 语音识别渠道
description: 所有可用的语音识别(ASR)渠道一览
---

# 语音识别渠道

语音识别（ASR）是视频翻译的第一步，将音频或视频中的人声转录为带时间轴的字幕文件。pyVideoTrans 支持 30+ 种识别渠道。

![](https://pvtr2.pyvideotrans.com/1787031005014_image.png)

> 如果无法确定说话语言，可使用左侧面板中的 **语音转录**功能，发音语言选择**自动检测**，语音识别渠道选择`faster-whisper/openai-whisper/Omnilingual/Dolphin`等支持语言多的渠道

---

## 本地离线识别

无需联网，首次使用时下载模型。
> GPU 加速列中`优先使用`是指：只要CUDA可用，无论是否选中了`启用硬件加速`，都优先尝试使用
>

| 渠道 | 说明 | GPU 加速 | 推荐度 |
|------|------|---------|--------|
| [faster-whisper(内置)](/faster) | 速度快、质量高，支持所有内置语言。若已选启用硬件加速但cuda不可用，将尝试vulkan+ggml量化模型 | ✅  | ⭐⭐⭐ **默认推荐** |
| [openai-whisper(内置)](/openaiwhisper) | 准确度高，速度略慢，支持所有内置语言 |✅ | ⭐⭐⭐ |
| [Qwen-ASR(内置)](/qwenasrlocal) | 中文效果佳，支持多数10多种主要语言 | 优先使用 | ⭐⭐⭐  |
| `Whisper.cpp(Win内置)` | 在Windows上已内置 whisper.cpp，可直接使用，MacOS和Linux上需自行单独部署| 需选中`启用CUDA加速` | ⭐⭐⭐|
| [FunASR(内置)](/funasr) | 中英为主，中文效果佳，有多个模型可选 | ✅ | ⭐⭐⭐  |
| [Aduio.cpp](/audiocpp) | 基于 audio.cpp 的语音识别，可选7种模型(qwenasr/funasr/parakeet/nemotron等) | ✅ | ⭐⭐ |
| VibeVoice-ASR(内置) | 微软出品，多语言支持，极消耗显存(低于15G不建议) | ✅ | ⭐⭐⭐  |
| Nemotron-3.5-asr-0.6(内置) | [拉丁语系及日韩越等40种](https://huggingface.co/nvidia/nemotron-3.5-asr-streaming-0.6b#supported-languages) | 优先使用 | ⭐⭐ |
| Firered中文(内置) | 仅支持中文及20中文方言 | 纯CPU | ⭐⭐ |
| Dolphin(内置) | 支持40多亚洲语言及20中文方言 | 纯CPU | ⭐⭐ |
| Omnilingual ASR(内置) | 支持1600多种语言 | 纯CPU | ⭐⭐ |
| Huggingface_ASR(内置) | 可选多个语言模型及小语种，具体见本页面下方 | 优先使用 | ⭐⭐ |
| Moss-Diarize(内置) | 支持50+语言，90分钟内可同时分离说话人，超出90分钟需配合说话人模型单独分离 | ✅ | ⭐⭐ |
| [Faster-Whisper-XXL.exe](/xxl) | faster-whisper的Windows封装版本,**需自定额外下载**并指定exe | ✅ | ⭐⭐ |

> VibeVoice-ASR(内置) 流畅运行需>15G显存，否则较慢，虽本身支持多说话人分离和断句，但所需显存将高达24G以上，并且对于中文可能出现大量10-40s的超长句子，因此采用预先VAD断句切片，逐个转录，放弃VibeVoice说话人和断句
>
>
> 因国内网络环境问题，加之模型都比较巨大，自动下载有可能失败，如果失败，[请点击查看模型下载地址和手动下载方式](/aboutmodels)

### faster-whisper/openai-whisper渠道模型选择建议

| 模型 | 速度 | 准确度 | 显存需求 |
|------|------|--------|---------|
| tiny | 最快 | 低 | ~1GB |
| base | 快 | 中低 | ~1GB |
| small | 中 | 中 | ~2GB |
| medium | 慢 | 较高 | ~5GB |
| large-v3-turbo | 较快 | 高 | ~6GB |
| large-v3 | 最慢 | 最高 | ~8GB |

**推荐**：`large-v3-turbo`，速度与质量兼顾。

---

## 在线识别

| 渠道 | 说明 |
|------|------|
| [DeepSeek](/deepseek) | DeepSeek的语音识别API，支持中文、粤语、英语、日语、韩语、德语、法语、西班牙语、葡萄牙语、意大利语、俄语、阿拉伯语、印地语、印尼语、越南语、泰语、土耳其语、马来语、菲律宾语、波兰语、匈牙利语 |
| [阿里百炼 Qwen3-ASR](/qwen-mt) | 需开通阿里百炼平台服务 |
| 小米 | mimo-v2.5-asr模型中文/中英混合效果佳 [需开通小米AI平台充值并获取API key](https://platform.xiaomimimo.com/console/api-keys)  填写到`菜单-翻译设置-小米AI`|
| [字节语音识别大模型极速版](/zijierecognmodel) | 中文效果极佳 |
| [Elevenlabs.io 语音识别](/elevenlabsrecogn) | 免费账号频率限制严格，几乎不可用 |
| [Deepgram.com](/deepgram) | 需注册 API Key |
| Gemini AI | 识别小语种能力强，需科学上网,固定使用`gemini-3.5-transcribe`模型 |
| [302.AI](/302ai) | 访问 302.ai 申请 |
| [OpenAI 语音识别API](/openairecogn) | 效果优秀，需 SK 密钥 |
| 硅基流动 | 在 翻译设置--硅基流动--选择使用的模型 |
| MinimaxAI | 在 翻译设置--MinimaxAI--选择使用的模型 |
| OpenRoute | 在 翻译设置--OpenRoute--选择使用的模型 |

---

## 高级自定义

| 渠道 | 说明 |
|------|------|
| [Parakeet-tdt(本地API)](/parakeet) | 需自行单独部署|
| [WhisperX(本地API)](/whisperx) | 需自行单独部署 |
| [STT(本地API)](/stt) | 需自行单独部署 |
| [Whisper.NET](/whisper_net_setup) | 支持AMD显卡加速，需源码安装并按照文档说明下载相关dll |
| [自定义语音识别 API](/openairecogn) | 可编写自己的识别接口 |

---

## Huggingface_ASR(内置) 渠道可用模型

> 该渠道无论是否选中了`启用CUDA加速`，只要CUDA可用，就优先尝试使用

| 模型 | 支持语言 |
|------|---------|
| nvidia/parakeet-tdt-0.6b-v3 | en,bg,hr,cs,da,nl,et,fi,fr,de,el,hu,it,lv,lt,mt,pl,pt,ro,sk,sl,es,sv,ru,uk |
| nvidia/nemotron-3.5-asr-streaming-0.6b | [欧洲系语言及日韩越等40种](https://huggingface.co/nvidia/nemotron-3.5-asr-streaming-0.6b#supported-languages) |
| reazon-research/japanese-wav2vec2-large-rs35kh | 日语 |
| kotoba-tech/kotoba-whisper-v2.0 | 日语 |
| biodatlab/whisper-th-large-v3 | 泰语 |
| vinai/Phowhisper-large | 越南语 |
| anke01/whisper-small-uyghur | 维吾尔语 |
| openai/whisper-large-v3 | 所有语言 |
| zai-org/GLM-ASR-Nano-2512 | 智谱AI模型，中文粤语效果佳 |
|Audio8/ARK-ASR-0.6B/3B| 中文,英语,德语,日语,法语,韩语,西班牙,波兰,意大利,罗马尼亚,匈牙利,捷克,荷兰|
|ibm-granite/granite-speech-4.1-2b| 英语,法语,德语,西班牙语,葡萄牙语,日语|
|nguyenvulebinh/wav2vec2-base-vietnamese-250h|越南语|
|sakares/wav2vec2-large-xlsr-thai-demo|泰语|
|SiangLao/xlsr-53-lao-asr|老挝语|
|chuuhtetnaing/whisper-large-v3-myanmar|缅甸语|
|1morecupofhottea/whisper-turbo-khmer-v9|高棉语 柬埔寨|
|anke01/whisper-small-uyghur|维吾尔语|
|kingabzpro/whisper-large-v3-turbo-urdu|乌尔都语|
|vasista22/whisper-tamil-small|泰米尔|
|theainerd/Wav2Vec2-large-xlsr-hindi|印地语|
|cautroi/whisper-large-v3-id|印尼语|
|Khalsuu/filipino-wav2vec2-l-xls-r-300m-official|菲律宾|
|navai-uz/whisper-medium-uzbek|乌兹别克|
|jonatasgrosman/wav2vec2-large-xlsr-53-persian|波斯语|
|Ghost3454/translynx-pakistani-punjabi-whisper-small|旁遮普语|
|turkmedstt/whisper-large-v3-turkish-general|土耳其语|
|anton-l/wav2vec2-large-xlsr-53-mongolian|蒙古语|
|HNO333333/w2v-bert-2.0-Tibetan-Amdo|藏语|

---


