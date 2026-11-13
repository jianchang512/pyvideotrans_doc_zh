---
title: edge-tts常见错误
date: 2024-01-22 14:33:00
description: 一般出现在配音阶段，并且使用的配音渠道是“edgeTTS”,这是微软用于edge浏览器大声朗读功能的TTS服务api，可免费使用，但最近似乎有了新限流措施，同ip短时间大量请求会触发403拦截，导致错误
---
> “当前IP受限请使用代理”
> “配音出错数量大于1/3”


如上面这类错误，一般出现在配音阶段，并且使用的配音渠道是“edgeTTS”,这是微软用于edge浏览器大声朗读功能的TTS服务api，可免费使用，但最近似乎有了新限流措施，同ip短时间大量请求会触发403拦截，导致错误。

![](https://pvtr2.pyvideotrans.com/img/fanyichucuo1.webp)
![](https://pvtr2.pyvideotrans.com/img/fanyichucuo2.webp)

## 如何解决呢？

#### 第一：查看是否有最新版本补丁包，如果有，先下载覆盖升级，再测试问题是否解决。

下载升级地址 https://pyvideotrans.com/downpackage



#### 第二：如果知道什么是代理/vpn/墙，那么就用上它，将http代理地址填写到“网络代理”文本框内。

![](https://pvtr2.pyvideotrans.com/img/fanyichucuo4.webp)

#### 第三：如下图，点击“配音渠道”，在弹出框内将并发改为 1，将暂停改为5，通过降低配音速度来减少错误产生。

![](https://pvtr2.pyvideotrans.com/img/fanyichucuo5.webp)

#### 第四：如果以上方法均未解决，可更换其他配音渠道。
例如免费配音服务有“GPT-SoVITS”、“ChatTTS”、“F5-TTS”、“CosyVoice”等，将对应项目部署到本地即可，打开设置框会有对应教程链接。
![](https://pvtr2.pyvideotrans.com/img/fanyichucuo6.webp)
![](https://pvtr2.pyvideotrans.com/img/fanyichucuo7.webp)

或使用收费的在线api，例如 302.AI、字节火山语音合成、OpenAI-TTS等
![](https://pvtr2.pyvideotrans.com/img/fanyichucuo8.webp)

#### 完全本地离线翻译设置

翻译渠道选择：离线翻译OTT

![](https://pvtr2.pyvideotrans.com/img/fanyichucuo9.webp)

配音渠道选择：F5-TTS/CosyVoice/FishTTS/GPT-SoVITS/clone-voice/ChatTTS 均是本地，需要额外部署，设置框内有部署教程

语音识别选择：faster-whisper/openai-whisper/SenseVoice/STT 均是本地识别

最稳定翻译设置：

追求稳定，当然商业级api最合适，除非本机性能强悍，也可使用本地翻译

翻译渠道可选择：302.AI/OpenAI-ChatGPT/字节火山大模型/百度翻译/腾讯翻译

![](https://pvtr2.pyvideotrans.com/img/fanyichucuo10.webp)

配音渠道可选择：字节火山语音合成/OpenAI-TTS/302.AI
![](https://pvtr2.pyvideotrans.com/img/fanyichucuo11.webp)

语音识别渠道可选择：字节火山字幕生成
![](https://pvtr2.pyvideotrans.com/img/fanyichucuo12.webp)