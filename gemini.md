---
title: Gemini AI 转录音频视频为 SRT 字幕的工具
date: 2024-01-22 14:33:00
description: Gemini AI 转录音频视频为 SRT 字幕的工具
---

## 这是一个使用 Gemini AI 转录音频视频为 SRT 字幕的工具


> **预打包版下载地址**
> 
> 预打包版仅适用于 win10/11, Macos和Linux系统[请使用源码部署](https://github.com/jianchang512/gemini-speech2srt) 
>
>
> 百度网盘地址：https://pan.baidu.com/s/10gJVMa5L3wnzlf1tFd9euw?pwd=dtpt
> 


音视频内容已成为我们获取知识、分享观点的重要载体。高效地将音视频内容转化为文字，特别是转为有精确时间轴的字幕，通常更多的是使用 OpenAI 开源的 Whisper实现。

Gemini AI 的出现为我们带来了新的解决方案。它凭借强大的自然语言处理能力，可以快速、准确地将音视频内容转录为文字。并且Gemini AI 提供了可观的每日免费额度，足以满足日常的音视频转录需求。

> 但是，直接将完整的音视频文件发送给 Gemini AI 虽然可以快速获得 SRT 格式的字幕，但时间轴往往不够精确。这主要是因为 Gemini AI 在处理长音频时，可能会出现时间轴偏移。
>
> 为了解决这个问题，开发了一个简单易用的工具，它会自动完成以下步骤：
> 
> 
>1. **智能切片：** 利用 VAD（语音活动检测）模型，将音视频文件智能切分成小片段。
>2. **逐片转录：** 将每个片段单独发送给 Gemini AI 进行转录。
>3. **精准组装：** 将转录结果按时间顺序重新组装成一个完整的 SRT 字幕文件，确保时间轴的准确性。

**无需复杂的设置，只需简单操作，即可获得时间轴精确的 SRT 字幕！**

![image.png](https://pvtr2.pyvideotrans.com/img/20250110153031-0.webp)

## Gemini AI 的优势：

* **高准确率：** Gemini AI 基于强大的 AI 模型，拥有极高的语音识别准确率，能够准确捕捉音视频中的内容。
* **速度快：** 得益于 Gemini AI 的强大计算能力，转录速度非常快，大大节省您的时间。
* **免费额度：**  Gemini AI 提供充足的每日免费额度，足以满足日常的音视频转录需求，降低使用成本。
* **支持多种格式：**  本工具支持常见的音视频格式，无需进行额外的格式转换。
* **时间轴精准：** 通过智能切片和逐片转录，确保生成的 SRT 字幕时间轴精确无误。





## 使用方式

1. **获取 Gemini API Key:**  首先，您需要拥有一个 Gemini API Key。如果您还没有，请按照文末的说明获取。
2. **填写 API Key:**  将您的 Gemini API Key 粘贴到工具的 `GeminiAI Key` 输入框中。
3. **选择模型：**  建议选择 `gemini-2.0-flash-exp` 模型，该模型效果较佳，且每日免费额度充足。
4. **设置代理（可选）：** 如果您在没有科学上网的环境下使用，请填写 HTTP 代理地址和端口。
5. **选择文件：**  点击上方大块区域选择您想要转录的音频或视频文件。
6. **开始转录：**  点击“开始”按钮，工具将自动完成切片、转录和组装字幕的过程。
7. **查看结果：**  转录完成后，点击“打开结果文件夹”即可找到生成的 SRT 字幕文件。

![gemini.gif](https://pvtr2.pyvideotrans.com/img/20250110153032-1.webp)


## 如何获取 Gemini API Key

1. **准备工作:** 确保您已经科学上网。
2. **访问 Google AI Studio:**  打开网址 [https://aistudio.google.com/apikey](https://aistudio.google.com/apikey)。
3. **注册/登录:** 如果您没有 Google 账号，请先注册一个。
4. **创建 API Key:**  点击“创建密钥”按钮。
5. **复制 API Key:**  复制自动生成的 API Key。

![image.png](https://pvtr2.pyvideotrans.com/img/20250110153034-2.webp)