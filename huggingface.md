---
title: HuggingFace_ASR 语音识别渠道
date: 2025-12-15 14:33:00
description: HuggingFace_ASR 语音识别渠道。
---

## 什么是 HuggingFace_ASR 语音识别渠道？

HuggingFace_ASR 是视频翻译软件从 v3.91 版本起新增的语音识别渠道，支持使用 [HuggingFace](https://huggingface.co) 上的开源模型进行语音识别。该渠道涵盖了多种语言的识别模型，适合需要识别非中文语音（如英语、日语、越南语、泰语等）的场景。

---

## 前提条件

- 视频翻译软件版本 >= v3.91
- 首次使用某个模型会自动从 HuggingFace 下载，需要网络连接
- 国内用户可能需要使用镜像站或手动下载模型（详见下方说明）
- GPU 加速可显著提升识别速度（推荐使用 NVIDIA GPU）

---

## 自动下载说明

第一次使用某个模型时，软件会自动从以下地址下载：
- 国际站：`https://huggingface.co`
- 国内镜像：`https://hf-mirror.com`

> 因网络原因，国内用户自动下载可能失败。如果失败，请参考下方 **手动下载** 部分。

---

## 支持的模型与语言

### 英语模型

| 模型名称 | 语言 |  说明 |
|---------|------|---------|------|
| **nvidia/parakeet-ctc-1.1b** | 英语 |  NVIDIA 出品，识别精度高 |

### 日语模型

| 模型名称 | 语言 | 说明 |
|---------|------|---------|------|
| **reazon-research/japanese-wav2vec2-large-rs35kh** | 日语 | wav2vec2 架构 |
| **kotoba-tech/kotoba-whisper-v2.0** | 日语 | 专为日语优化的 whisper |

### 越南语模型

| 模型名称 | 语言 |  说明 |
|---------|------|------|
| **vinai/Phowhisper-large** | 越南语 |  whisper-large-v3 微调版 |

### 泰语模型

| 模型名称 | 语言 |  说明 |
|---------|------|------|
| **biodatlab/whisper-th-large-v3** | 泰语 |  whisper-large-v3 泰语版 |

---

---

## 手动下载方法

如果自动下载失败，可以手动下载模型文件。所有模型的存放规则相同：

1. 在 `sp.exe(sp.py)` 同级的 `models` 文件夹内创建对应文件夹
2. 打开模型下载页面，下载所有文件
3. 将下载的文件放入创建的文件夹内

> **注意**：下载后不要修改文件名称。如果下载目录已有同名文件（如 `xxx(1)`），请先删除旧文件再重命名。

### nvidia/parakeet-ctc-1.1b（英语）

1. 创建文件夹：在 `models` 文件夹内创建 `models--nvidia--parakeet-ctc-1.1b`
2. 下载地址：https://huggingface.co/nvidia/parakeet-ctc-1.1b/tree/main
3. 将该页面所有文件下载后放入文件夹

### reazon-research/japanese-wav2vec2-large-rs35kh（日语）

1. 创建文件夹：在 `models` 文件夹内创建 `models--reazon-research--japanese-wav2vec2-large-rs35kh`
2. 下载地址：https://huggingface.co/reazon-research/japanese-wav2vec2-large-rs35kh/tree/main
3. 将该页面所有文件下载后放入文件夹

### kotoba-tech/kotoba-whisper-v2.0（日语）

1. 创建文件夹：在 `models` 文件夹内创建 `models--kotoba-tech--kotoba-whisper-v2.0`
2. 下载地址：https://huggingface.co/kotoba-tech/kotoba-whisper-v2.0/tree/main
3. 将该页面所有文件下载后放入文件夹


### biodatlab/whisper-th-large-v3（泰语）

1. 创建文件夹：在 `models` 文件夹内创建 `models--biodatlab--whisper-th-large-v3`
2. 下载地址：https://huggingface.co/biodatlab/whisper-th-large-v3/tree/main
3. 将该页面所有文件下载后放入文件夹
### vinai/Phowhisper-large（越南语）

1. 创建文件夹：在 `models` 文件夹内创建 `models--vinai--Phowhisper-large`
2. 下载地址：https://huggingface.co/vinai/Phowhisper-large/tree/main
3. 将该页面所有文件下载后放入文件夹
### openai/whisper-large-v3

1. 创建文件夹：在 `models` 文件夹内创建 `models--openai--whisper-large-v3`
2. 下载地址：https://huggingface.co/openai/whisper-large-v3/tree/main
3. 将该页面所有文件下载后放入文件夹

### zai-org/GLM-ASR-Nano-2512

1. 创建文件夹：在 `models` 文件夹内创建 `models--zai-org--GLM-ASR-Nano-2512`
2. 下载地址：https://huggingface.co/zai-org/GLM-ASR-Nano-2512/tree/main
3. 将该页面所有文件下载后放入文件夹

### anke01/whisper-small-uyghur

1. 创建文件夹：在 `models` 文件夹内创建 `models--anke01--whisper-small-uyghur`
2. 下载地址：https://huggingface.co/anke01/whisper-small-uyghur/tree/main
3. 将该页面所有文件下载后放入文件夹


---

## 常见错误与排查

### 自动下载失败

- **原因**：网络无法访问 HuggingFace 或镜像站不稳定
- **解决**：使用上方手动下载方法，或配置代理后重试

### 模型文件名称错误

- **原因**：下载时浏览器自动重命名（如 `xxx(1)`）
- **解决**：删除带有 `(1)` 后缀的文件，将正确名称的文件放入模型文件夹

### 识别结果为空或报错

- **原因**：模型文件不完整或文件夹结构不正确
- **解决**：检查模型文件夹内是否包含所有必要文件，必要时重新下载

---




