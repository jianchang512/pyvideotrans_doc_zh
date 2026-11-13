---
title: 小红书开源 FireRedASR
date: 2024-01-22 14:33:00
description: 小红书开源了一款名为 FireRedASR 的语音自动识别项目，它在中文语音识别方面表现出色。此前，他们只开源了一个较小的 AED 模型。最近，他们又发布了一个更大的 LLM 模型，识别准确率得到了进一步提升
---

小红书开源了一款名为 FireRedASR 的语音自动识别项目，它在中文语音识别方面表现出色。此前，他们只开源了一个较小的 AED 模型。最近，他们又发布了一个更大的 LLM 模型，识别准确率得到了进一步提升。

这款 ASR 模型已经集成到整合包中，可以在视频翻译软件(pyVideoTrans)中方便地使用。

## 整合包下载及模型说明

**模型体积：**

*   **AED 模型 (model.pth.tar)：** 4.35GB
*   **LLM 模型：** 包含两个模型
    *   小红书识别模型 (model.pth.tar)：3.37GB
    *   Qwen2-7B 模型 (4个文件)：合计 17GB

**模型总计约 21GB**。即使压缩成 7z 格式，体积仍然超过 10GB。体积限制无法上传到GitHub或网盘，因此整合包中仅包含程序主体，不包含任何模型文件。

请您下载整合包后，按照以下步骤单独下载模型文件，并将其放入指定位置。

> **注意：** 模型文件托管在 **huggingface.co** 网站上，该网站在国内无法直接访问，您需要魔法上网才能下载。

## 整合包主体下载

整合包主体体积相对较小，**1.7G**。您可以在浏览器中直接打开以下地址下载：

[https://github.com/jianchang512/fireredasr-ui/releases/download/v0.3/fireredASR-2025-0224.7z](https://github.com/jianchang512/fireredasr-ui/releases/download/v0.3/fireredASR-2025-0224.7z)

下载完成后，解压压缩包，您应该看到类似下图的文件结构：

![](https://img.pyvideotrans.com/file/1740320246309_image.png)

## 下载 AED 模型

AED 模型的下载比较简单，只需下载一个模型文件。

1.  下载 `model.pth.tar` 文件。
    > 下载地址：
    >
    > [https://huggingface.co/FireRedTeam/FireRedASR-AED-L/resolve/main/model.pth.tar?download=true](https://huggingface.co/FireRedTeam/FireRedASR-AED-L/resolve/main/model.pth.tar?download=true)

2.  将下载的 `model.pth.tar` 文件放入整合包目录下的 `pretrained_models/FireRedASR-AED-L` 文件夹内。

下载完成后，文件存放位置示例如下：

![](https://img.pyvideotrans.com/file/1740318846202_image.png)

## 下载 LLM 模型

LLM 模型的下载稍微复杂一些，需要下载共 5 个文件（1个小红书模型 + 4个 Qwen2 模型）。

**1. 下载小红书模型 (model.pth.tar):**

*   下载地址：
    [https://huggingface.co/FireRedTeam/FireRedASR-LLM-L/resolve/main/model.pth.tar?download=true](https://huggingface.co/FireRedTeam/FireRedASR-LLM-L/resolve/main/model.pth.tar?download=true)

*   将下载的 `model.pth.tar` 文件放入整合包的 `pretrained_models/FireRedASR-LLM-L` 文件夹内。请务必注意文件夹名称中包含 `LLM`，不要放错位置。

文件存放位置示例如下：

![](https://img.pyvideotrans.com/file/1740319032881_image.png)

**2. 下载 Qwen2 模型 (4个文件):**

*   将以下 **4 个链接** 中的文件分别下载，并放入整合包的 `pretrained_models/FireRedASR-LLM-L/Qwen2-7B-Instruct` 文件夹内。

    *   [https://huggingface.co/Qwen/Qwen2-7B-Instruct/resolve/main/model-00001-of-00004.safetensors?download=true](https://huggingface.co/Qwen/Qwen2-7B-Instruct/resolve/main/model-00001-of-00004.safetensors?download=true)
    *   [https://huggingface.co/Qwen/Qwen2-7B-Instruct/resolve/main/model-00002-of-00004.safetensors?download=true](https://huggingface.co/Qwen/Qwen2-7B-Instruct/resolve/main/model-00002-of-00004.safetensors?download=true)
    *   [https://huggingface.co/Qwen/Qwen2-7B-Instruct/resolve/main/model-00003-of-00004.safetensors?download=true](https://huggingface.co/Qwen/Qwen2-7B-Instruct/resolve/main/model-00003-of-00004.safetensors?download=true)
    *   [https://huggingface.co/Qwen/Qwen2-7B-Instruct/resolve/main/model-00004-of-00004.safetensors?download=true](https://huggingface.co/Qwen/Qwen2-7B-Instruct/resolve/main/model-00004-of-00004.safetensors?download=true)

下载完成后，`Qwen2-7B-Instruct` 文件夹内应包含 4 个文件，如下图所示：

![](https://img.pyvideotrans.com/file/1740319183044_image.png)

## 启动整合包

当所有模型文件下载完成并正确放置后，双击运行整合包目录下的 `启动.bat` 文件即可启动程序。

程序启动后，会自动在浏览器中打开地址 `http://127.0.0.1:5078`。如果看到如下界面，则表示程序已成功启动，可以开始使用了。

![](https://img.pyvideotrans.com/file/1740319997817_image.png)

## 在视频翻译软件中使用

如果您想在视频翻译软件 pyVideoTrans 中使用 FireRedASR 模型，请按照以下步骤操作：

1.  确保您已按照上述说明下载并放置了模型文件，并已成功启动整合包。
2.  打开 pyVideoTrans 软件。
3.  在软件菜单中，依次选择 **菜单** -> **语音识别设置** -> **OpenAI语音识别及兼容AI**。
4.  在设置界面中，按照下图所示填写相关信息。

    ![](https://img.pyvideotrans.com/file/1740319865234_image.png)
5.  填写完成后，点击 **保存**。
6.  在语音识别渠道选择中，选择 **OpenAI语音识别**。

    ![](https://img.pyvideotrans.com/file/1740320052716_image.png)




## API 地址:

默认地址: <http://127.0.0.1:5078/v1>

**OpenAI SDK中使用**

```
from openai import OpenAI
client = OpenAI(api_key='123456',
    base_url='http://127.0.0.1:5078/v1')

audio_file = open("5.wav", "rb")
transcript = client.audio.transcriptions.create(
  model="whisper-1",
  file=audio_file,
  response_format="json",
  timeout=86400
)

print(transcript.text)


```