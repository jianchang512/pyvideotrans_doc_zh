---
title: 在软件中使用 HuggingFace 模型：详细指南
date: 2025-06-06 14:33:00
description: Hugging Face (huggingface.co) 是一个广受欢迎的机器学习模型仓库，其中包含了大量可用的语音识别模型。当内置的 Faster-Whisper 模型在处理小语种时支持不足，或您需要特定优化模型时，Hugging Face 将是寻找解决方案的理想平台,本功能适用于软件 **v3.71 及以上版本**，并仅支持由 `ctranslate2` 转换而来的模型。

---



## 在软件中使用 Hugging Face 模型：详细指南

Hugging Face (huggingface.co) 是一个广受欢迎的机器学习模型仓库，其中包含了大量可用的语音识别模型。当内置的 Faster-Whisper 模型在处理小语种时支持不足，或您需要特定优化模型时，Hugging Face 将是寻找解决方案的理想平台。

本功能适用于软件 **v3.71 及以上版本**，并仅支持由 `ctranslate2` 转换而来的模型。

---

### **第一步：确认模型兼容性**

在使用 Hugging Face 模型之前，您必须确认该模型已通过 `ctranslate2` 转换。如果模型未经过 `ctranslate2` 转换，则无法在软件中使用。

以下是几种检查方法：

**1. 页面明确标注**

如果模型页面明确显示“Converted from ctranslate2”或类似字样，则该模型兼容。

![如图明确说明了是由ctranslate2转换而来](https://pvtr2.pyvideotrans.com/1749136471541_image.png)
如图所示，页面明确写明使用 `ctranslate2` 转换，则该模型可用。

**2. 检查代码引用**

即使页面没有明确说明，您也可以查看模型页面中是否包含 `from faster_whisper` 相关的代码片段。通常，这类模型也兼容。
![查看模型页面中示例代码中是否包含 from faster_whisper](https://pvtr2.pyvideotrans.com/1749179810914_image.png)

**3. 查看 `config.json` 文件结构**

如果以上两种方法都无法确定，您可以点击模型页面中的 `Files and versions` 标签页，然后找到并点击 `config.json` 文件。

![点击文件列表，查看config.json结构](https://pvtr2.pyvideotrans.com/1749136683957_image.png)

如果 `config.json` 文件的结构类似下图，例如文件开头包含 `alignment_heads`，并且中间包含 `lang_ids` 等字段，则该模型通常也兼容。

![结构中由alignment_heads和lang_ids等](https://pvtr2.pyvideotrans.com/1749136784537_image.png)

---

### **第二步：获取并配置模型 ID**

一旦确认模型兼容，您就可以将其添加到软件中使用了。

**1. 获取模型 ID**

模型 ID 由两部分组成，用 `/` 分隔：`用户名/模型名称`。例如：`zh-plus/faster-whisper-large-v2-japanese-5k-steps`。

您可以在模型详情页找到并点击复制按钮直接获取模型 ID，如下图所示：

![可到达模型详情页直接点击复制id](https://pvtr2.pyvideotrans.com/1749136946826_image.png)

**2. 将模型 ID 添加到软件**

*   打开软件，点击 `菜单` -> `工具` -> `高级选项`。
*   在 `Faster 和 OpenAI 模型列表` 文本框的末尾，使用英文逗号 `,` 将您复制的模型 ID 粘贴到现有内容之后。
*   点击 `保存` 以应用更改。

![用英文逗号隔开粘贴](https://pvtr2.pyvideotrans.com/1749137037698_image.png)

---

### **第三步：使用并自动下载模型**

*   返回软件主界面。
*   在 `语音识别` 下拉列表中选择 `faster-whisper (本地)`。
*   在右侧的 `模型` 下拉列表中，选择您刚刚添加的模型 ID。
![选择您刚刚添加的模型 ID](https://pvtr2.pyvideotrans.com/1749179002003_image.png)
软件将自动从国内镜像站点 `https://hf-mirror.com` 下载该模型，无需科学上网。

---

### **重要注意事项**

**1. 模型可用性限制**

软件仅支持下载 Hugging Face 上公开可用的模型。对于需要您同意条款（如接受许可协议）才能下载的模型（如下图所示）以及私有模型，软件无法下载和使用。

![非公共模型不可下载](https://pvtr2.pyvideotrans.com/1749137379440_image.png)

**2. 国内镜像站点的使用**

*   当软件界面语言设置为中文时，软件将自动使用 `https://hf-mirror.com` 国内镜像站点进行模型下载，从而避免科学上网问题。
*   如果软件界面为英文，则仍会尝试从 Hugging Face 官网下载，可能需要科学上网。
*   您可以点击 `菜单` -> `工具` -> `高级选项` -> `界面语言`，填写 `zh` 并保存，然后重启软件，即可将界面变更为中文。
![填写 zh并保存，然后重启软件，即可将界面变更为中文](https://pvtr2.pyvideotrans.com/1749179047972_image.png)

