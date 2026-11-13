---
title: 在软件中使用 GroqCloud
date: 2024-01-22 14:33:00
description: GroqCloud是一个国外AI推理平台，提供大量免费额度和多种模型选择，非常适合免费试用。本文介绍如何使用GroqCloud并将其接入视频翻译软件。
---
## 在软件中使用 GroqCloud

GroqCloud是一个国外AI推理平台，提供大量免费额度和多种模型选择，非常适合免费试用。本文介绍如何使用GroqCloud并将其接入视频翻译软件。


> **GroqCloud网址：** [https://console.groq.com/](https://console.groq.com/)


##  需要科学上网

GroqCloud 阻止中国大陆IP访问。  如果无法访问，请确保已开启科学上网工具。

![image.png](https://pvtr2.pyvideotrans.com/img/20241116121900-0.webp)


## 登录注册并查看可用模型

登录后，按照下图所示步骤即可查看所有可用模型。

> **GroqCloud 模型列表：** [https://console.groq.com/playground](https://console.groq.com/playground)

![image.png](https://pvtr2.pyvideotrans.com/img/20241116121901-1.webp)


特别推荐 `whisper-large-v3` 和 `whisper-large-v3-turbo` 这两个模型，它们可以将音频转换为字幕，效果与OpenAI官方模型基本一致。


![image.png](https://pvtr2.pyvideotrans.com/img/20241116121901-2.webp)

其他模型主要用于文本翻译，例如 `llama-3.2-11b-text-preview` 和 `llama-3.2-90b-text-preview`，建议选择参数更大的模型（例如90b），效果通常更好。


## 获取免费API密钥

> **获取API密钥：** [https://console.groq.com/keys](https://console.groq.com/keys)

按照下图所示，创建一个新的API密钥。

![image.png](https://pvtr2.pyvideotrans.com/img/20241116121901-3.webp)


##  连接到视频翻译软件

在视频翻译软件中，找到语音识别设置（通常在菜单栏），选择OpenAI语音识别API选项。

填写以下信息：

* **API URL:** `https://api.groq.com/openai/v1`
* **API 密钥:**  您在之前步骤中创建的密钥
* **可用模型:**  `whisper-large-v3, whisper-large-v3-turbo, distil-whisper-large-v3-en` (建议只使用前两个，支持多语言；最后一个仅支持英文)

![image.png](https://pvtr2.pyvideotrans.com/img/20241116121901-4.webp)


## 测试


![image.png](https://pvtr2.pyvideotrans.com/img/20241116121902-5.webp)


## 使用其他模型进行翻译


同样，在翻译设置中选择OpenAI ChatGPT选项，填写 `https://api.groq.com/openai/v1` 作为API地址，输入您的API密钥，并在文本框中输入您想要使用的模型名称。**请勿选择名称中包含“vision”的模型，这些是视觉模型，使用时可能会出错。**

![image.png](https://pvtr2.pyvideotrans.com/img/20241116121902-6.webp)

![image.png](https://pvtr2.pyvideotrans.com/img/20241116121902-7.webp)


## 故障排除：连接错误

如果出现以下错误信息，请检查您的科学上网工具是否正常工作并已正确设置系统代理或全局代理。

![image.png](https://pvtr2.pyvideotrans.com/img/20241116121903-8.webp)

例如，使用某些VPN软件，可以自动配置系统代理。

![image.png](https://pvtr2.pyvideotrans.com/img/20241116121903-9.webp)