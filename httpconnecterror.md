---
title: 视频翻译软件使用过程中经常遇到的报错
date: 2024-01-22 14:33:00
description: 在视频翻译软件使用过程中，可能经常会遇到一些报错，如标题中的错误以及下图中
---
在视频翻译软件使用过程中，可能经常会遇到一些报错，如标题中的错误以及下图中


![](https://pvtr2.pyvideotrans.com/img/httperror1.webp)


![](https://pvtr2.pyvideotrans.com/img/httperror2.webp)

**错误信息中一般包含如下这些字符**

`HTTPSConnection`

`Connection error` 

`ConnectionError`

`HTTPSConnectionPool`

`Max retries exceeded with url`

报错主要出现在以下3种使用情景中

- 翻译渠道中选择  **Google/OpenAI ChatGPT/Gemini/** 

![](https://pvtr2.pyvideotrans.com/img/httperror3.webp)

- 配音渠道中选择 **OpenAI TTS/Elevenlabs.io/GoogleTTS**

![](https://pvtr2.pyvideotrans.com/img/httperror4.webp)

- 语音识别中选择 **OpenAI识别API/**

![](https://pvtr2.pyvideotrans.com/img/httperror5.webp)


**为何会这样呢，主要有以下几个原因**

## 国内无法直接访问的服务需要魔法，否则必然报错

从上面3种情景大概能看出，都是些需要连接国外api的服务，众所周知因为墙的缘故，国内是无法直接访问的，想使用必须魔法上网，如果你本机都不可打开Google网站( https://www.google.com )、OpenAI官方网站 ( https://chat.openai.com )，那么报错是必然的。



## 本机已魔法上网能打开Google但代理填写错误

如果本机可正常访问Google，但翻译软件还是出错，请检查软件界面中的**网络代理**文本框中是否填写了代理地址，如果里面有内容，但你不知道那个内容代表什么涵义，有什么作用，也不是自己有意行为，请删掉，然后再重试。

![](https://pvtr2.pyvideotrans.com/img/httperror6.webp)


如果还是不行，请查看你使用的魔法工具，找到里面指示的http代理端口号数字，假如你的魔法工具在本机运行，那么文本框内填写 `http://127.0.0.1:端口号数字`，例如v2ray系列软件一般填写`http://127.0.0.1:10809`，clash系列软件一般填写`http://127.0.0.1:7890`

![](https://pvtr2.pyvideotrans.com/img/httperror7.webp)


**特别注意：** 如果你看不懂上面这段内容在说什么，就删掉网络代理文本框内的所有内容，保持为空，什么都不要填写。也就是要么不填，要填就一定要保证正确，并且是可用的代理地址。

> 切记不要在网络代理文本框里胡乱填写或者填写一些网站的地址、一些api地址，要么不填，要么填写可以使用连接的代理地址和端口。
> 
> 软件默认会从系统中自动获取代理，一般情况下如果本机已魔法，那么即使网络代理文本框保持为空，也是可以访问这些服务的，但可能会因为权限、安全策略、安全软件、防火墙等限制获取失败。
> 
> 假如本机访问没问题，但软件仍频频报错，请在网络代理文本框中填写正确的代理地址



## 国内翻译服务和AI服务不支持使用国外代理国外ip访问

在翻译软件中使用 **百度翻译/腾讯翻译/字节火山引擎翻译/豆包模型识别** 时报网络连接错误或提示不支持的授权等，可能的原因是连接时使用了国外ip(如vpn国外节点/魔法工具等)。

国内这些翻译服务和Ai服务都是禁止国外ip访问的，如果使用代理访问这些服务，那么肯定报错，只需要删掉网络代理文本框中的内容，必要时关闭本机魔法工具即可。