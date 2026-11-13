---
title: 使用openai新推出的gep-4o-mini-tts语音合成模型
date: 2025-03-21 17:40:22
description: 如何在视频翻译中使用OpenAI新推出的语音识别和语音合成模型
---
如何在视频翻译中使用OpenAI新推出的语音识别和语音合成模型

> 这个音频就是使用openai的新语音模型合成的配音

<audio controls src="https://pvt9.com/openaitts.mp3"></audio>

## 新的语音转录模型

OpenAI刚刚推出了新的语音转录模型，相比之前的 whisper-1更加准确，而且分为2种型号，便宜的 `gpt-4o-mini-transcribe` 型号，昂贵的 `gpt-4o-transcribe` 型号，如果你需要高质量的识别或者音视频背景噪声较大，不妨试试后者。

使用很简单，如果你使用的OpenAI官方的接口，那么直接将这2个模型名字填写到`菜单--语音识别设置--OpenAI语音识别及兼容API--填写所有模型`中即可，然后选择所用模型，保存，回到语音识别渠道中选择


![填写这2个模型后，选择要使用的那个，然后保存](https://pvtr2.pyvideotrans.com/1742549176032_image.png)


![回到主界面中，语音识别渠道选择OpenAI](https://pvtr2.pyvideotrans.com/1742549192690_image.png)

## 新的语音合成(文字配音)模型

新的语音合成模型`gpt-4o-mini-tts` 效果相比之前的`tts-1`好了很多，而且还支持输入提示词设定发音人的说话风格，例如`请以兴奋的语气说话`、`请模仿新闻播音员的强调`等

可以OpenAI提供的免费试用网站体验

https://www.openai.fm/

![](https://pvtr2.pyvideotrans.com/1742549416838_image.png)


使用同样很简单，在软件的`菜单--TTS设置-OpenAI TTS--填写所有模型`中写入`gpt-4o-mini-tts`，然后选择所用模型

![填写，选中所用模型](https://pvtr2.pyvideotrans.com/1742549656840_image.png)

保存后，就可以去主界面中使用了

![主界面配音渠道中选择OpenAI TTS](https://pvtr2.pyvideotrans.com/1742549695760_image.png)

**为什么没有可以输入提示词的地方？因为这是刚刚出来的新模型，翻译软件还未来得及更新**

## 使用的第三方中转模型该怎么办？

使用方法一样，只是将 API 地址改为你的第三方中转提供的API，但要注意，截止目前，大部分第三方中转站还不支持新增的模型。