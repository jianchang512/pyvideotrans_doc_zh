---
title: 替换edge-tts配音渠道的几种方式
date: 2025-01-05 14:37:57
description: 以前用 edge-tts 配音特别顺手，几乎没遇到过问题。可惜从去年底开始，它开始频繁报 403 错误。一开始只是中国地区这样，用国外 IP 还能勉强解决，但现在全球范围内都会出现这个错误。看来微软这么大的公司，也扛不住大家疯狂“薅羊毛”。
---

以前用 edge-tts 配音特别顺手，几乎没遇到过问题。可惜从去年底开始，它开始频繁报 403 错误。一开始只是中国地区这样，用国外 IP 还能勉强解决，但现在全球范围内都会出现这个错误。看来微软这么大的公司，也扛不住大家疯狂“薅羊毛”。

如果现在还想用 edge-tts，得悠着点，最好少量使用，尤其别在同一个 IP 上频繁操作。不然微软的服务端会直接返回 403 错误。为了方便理解，软件里会提示“限流错误”。这里有两种解决办法：

- 可以试试把接口部署到 Cloudflare 上，利用它的动态特性，能减少 403 错误的发生。具体方法可以参考文档：**https://pvt9.com/edgettscf**
- 或者继续在本地用，但得搭配动态代理，也就是每次请求换个 IP。具体操作可以看看这篇文章：**https://pvt9.com/edgetts-proxy**

## 使用本地配音模型

除了 edge-tts，还可以用一些开源的本地配音模型，比如 GPT-SoVITS、ChatTTS-ui、Fish-TTS、F5-TTS、CosyVoice、Clone-voice、KokoroTTS 等等。这些都是免费的，部署到自己电脑上就能用。不过，这需要额外花点时间配置，对电脑硬件和动手能力也有一定要求。

> 想试试的话，可以参考这个教程：**https://pvt9.com/gptsovits**，页面左侧边栏也有更多说明。

![](https://img.pyvideotrans.com/file/1740494234378_image.png)

## 使用在线配音 API 代替

如果硬件不够好，或者不想折腾本地部署，可以选择在线配音 API，比如 OpenAI TTS、Azure TTS、字节火山语音合成等等。

不过，国内直接用 OpenAI TTS 或 Azure TTS 得翻墙，免费额度很有限，付费还得有国外手机号和信用卡，挺麻烦的。建议用国内能直接访问的 OpenAI TTS 中转服务，或者 Azure TTS 中转服务，会方便很多。

要是用官方的 OpenAI TTS，只需要在软件里打开 **菜单--TTS设置--OpenAI TTS API**，把你的 SK 填到 SK 文本框里就行，不用多设置什么。但别忘了，国内得翻墙才能用。

![](https://img.pyvideotrans.com/file/1740494336787_image.png)

---

下面一步步说明怎么用第三方中转的 OpenAI TTS 配音、Azure TTS 配音，以及字节语音合成。

## 使用 302.AI 或其他第三方的 OpenAI TTS 配音中转 API

> 注册登录地址（送 1 美元额度）：**https://share.302.ai/pyvideo**

操作步骤很简单：
1. 在软件的 **菜单--TTS设置--OpenAI TTS API** 里，把 API URL 填成 `https://api.302.ai/v1`。如果用的是别家的中转 API，就填他们给的地址，通常是以 `/v1` 结尾。
2. 在 SK 文本框里，填上你在 302.AI 上创建的 API Key。如果是其他第三方服务，就填他们提供的 Key。
![](https://img.pyvideotrans.com/file/1740493725599_image.png)


![](https://img.pyvideotrans.com/file/1740492896634_image.png)
测试一下，如果能自动播放配音音频，说明设置成功了。之后在软件主界面的配音渠道里选 OpenAI TTS 就能用。支持的音色有：`alloy, ash, coral, echo, fable, onyx, nova, sage, shimmer`。

![](https://img.pyvideotrans.com/file/1740492928376_image.png)
## 使用 302.AI 中转的 Azure TTS

> 注册登录地址（送 1 美元额度）：**https://share.302.ai/pyvideo**

OpenAI TTS 只有 9 种音色，中文发音还有点“大舌头”，如果觉得不够好，可以试试 Azure TTS。这是微软家的产品，音色更多，效果也比 edge-tts 好。不过国内直接用需要国外信用卡，不方便的话，可以用 302.AI 提供的中转 API。

操作方法：
1. 在 302.AI 上创建一个 Key。
2. 打开软件的 **菜单--翻译设置--302.AI**，把 Key 填进去。注意，这次是在“翻译设置”菜单下的“302.AI”选项里填。
![](https://img.pyvideotrans.com/file/1740493760375_image.png)
填好后，你就能用 Azure TTS 的所有配音角色了。而且，302.AI 还中转了字节语音合成，所以字节的音色也能直接用。
![](https://img.pyvideotrans.com/file/1740493860702_image.png)
## 单独使用字节语音合成

字节语音合成已经有详细教程，可以看看：**https://pvt9.com/volcenginetts**。

不过要注意，默认只有通用男声和通用女声能用。如果想要其他音色，得去字节官网单独买，按月收费。如果只是偶尔用，不太划算。建议直接用上面提到的 302.AI，能直接用字节的各种音色，更方便。

