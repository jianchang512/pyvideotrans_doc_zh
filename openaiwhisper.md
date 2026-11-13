---
title: openai-whipser(本地) 语音识别渠道
date: 2024-01-22 14:33:00
description: 视频翻译软件的核心原理是：根据视频中的说话声音识别出文字，然后将文字翻译为目标语言文字，再将翻译后的文字进行配音，最后将配音、文字嵌入视频。
---


## openai-whisper(本地) 语音识别渠道

### 渠道简介

该模式是 OpenAI 官方开源的 whisper 模型，相比 faster-whisper 速度较慢，但准确度略高一些。如果你对识别精度有更高要求，且不介意较慢的处理速度，可以选择此渠道。

**与 faster-whisper 的主要区别：**

| 对比项 | openai-whisper | faster-whisper |
|--------|---------------|----------------|
| 识别速度 | 较慢 | 快（快数倍） |
| 准确度 | 略高 | 略低 |
| 模型格式 | `.pt` 文件 | 文件夹结构（`.json`/`.bin`/`.txt`） |
| 下载来源 | OpenAI 官方 CDN | HuggingFace |
| 模型大小 | 与 faster-whisper 相当 | 与 openai-whisper 相当 |

**主要优势：**

- 纯本地运行，不上传音频文件到互联网
- 准确度略高于 faster-whisper
- 模型从 OpenAI 官方 CDN 下载，国内访问相对稳定
- 首次使用自动下载，之后完全离线可用

![image.png](https://pvtr2.pyvideotrans.com/images/66cd7fb8af434a37aca402f575c65e12~tplv-73owjymdk6-jj-mark_0_0_0_0_q75.webp)

## 前置条件

在使用 openai-whisper 之前，请确认以下条件：

| 条件 | 说明 |
|------|------|
| 硬盘空间 | 至少预留 5-15GB 用于存放模型文件（大模型更大） |
| 内存 | 基础模型（tiny/base）需 4GB+；large 系列需 16GB+ |
| 显卡（可选） | NVIDIA 显卡 + CUDA 加速可大幅提速，large-v3 需 10GB+ 显存 |
| 网络 | 首次使用需联网下载模型，之后可离线使用 |

## 模型选择

**第一次使用某个模型时，将自动从 openai-whipser 的官方cdn下载**

`tiny --> base --> small --> medium --> large-v3-turbo --> large-v1 --> large-v2 --> large-v3`

从前到后模型尺寸越来越大，识别精确度也越来越高，需要的内存和显存也越来越多。

建议至少选择大于等于`large-v3-turbo`的模型，效果最佳的模型是**large-v3**

### 模型详细对照表

| 模型名称 | 适用场景 | 内存需求 | 显存需求（CUDA） | 说明 |
|----------|----------|----------|------------------|------|
| tiny | 快速预览 | 2GB+ | 1GB+ | 速度最快，准确度最低 |
| base | 简单内容 | 3GB+ | 1GB+ | 适合清晰语音 |
| small | 一般场景 | 4GB+ | 2GB+ | 速度与准确度较均衡 |
| medium | 多语种 | 8GB+ | 5GB+ | 多语种效果好 |
| large-v3-turbo | 推荐起步 | 10GB+ | 6GB+ | 速度快且准确度高 |
| large-v1 | 高精度 | 16GB+ | 10GB+ | 经典大模型 |
| large-v2 | 高精度 | 16GB+ | 10GB+ | 改进版大模型 |
| large-v3 | 最佳效果 | 16GB+ | 10GB+ | **推荐使用**，效果最好 |

> 注意：openai-whisper 的模型为 `.pt` 文件，与 faster-whisper 的文件夹结构不同。下载后会自动保存在软件目录中。

## 该渠道最佳配置

为达到最佳语音识别效果，请参考以下设置

1. 模型选择 `large-v3` (确保计算机内存大于16G 或 显存大于10G )，若不满足可尝试使用`large-v1/large-v3-turbo`模型.
2. 明确指定**发音语言**，确保和视频中语音所用语言一致
3. *菜单-工具-高级选项-语音识别参数* 区域：将`最短语音持续毫秒`设为 1000 ，`最长语音持续秒数`设为大于等于 5 的值，**不要选中**`Whisper预分割音频`

> 此处需注意，如果你需要配音并且配音角色是`clone`,即克隆原始发音音色进行配音，那么强烈建议将`最短语音持续毫秒`设为 3000 ，将`最长语音持续秒数`设为 10 ，因为 语音克隆时会自动将字幕时长对应的原始语音片段作为参考音频，而多数配音渠道均要求该参考音频时长在 3-10s 之间，否则配音很可能失败。
> 同时应该选中 `Whisper预分割音频`以及`合并过短字幕到相邻`，以确保字幕时长能够落在 3-10s 之间

4. 如果原始语音不够清晰或者有噪声，请选中 **降噪** 
5. 如果你不使用`clone`角色，并且希望识别后的字幕尽可能短小，以便适配竖版视频，可适当降低 `最长语音持续秒数`，例如设为 3 或 2. 如果有配音的话，可同时选中`二次识别`。

>  二次识别: 在选择配音并选择了嵌入单字幕时，选中二次识别意味着，将在配音完毕后再次对配音后的音频文件进行语音转录，生成较为简短的字幕嵌入视频内，确保字幕和配音精确对齐


## CUDA 加速

为加快任务速度，在Windows和Linux上，如果有英伟达显卡，可配置安装CUDA和cuDNN环境后，启用`CUDA加速`，将能明显提高执行速度。


![image.png](https://pvtr2.pyvideotrans.com/images/25fc2cf7b19c46409671f20a3818db13~tplv-73owjymdk6-jj-mark_0_0_0_0_q75.webp)

[查看CUDA和cuDNN安装教程](https://pvt9.com/gpu.html)

### CUDA 加速配置步骤

1. 确认你的 NVIDIA 显卡支持 CUDA（GTX 10 系列及以上）
2. 下载并安装对应版本的 CUDA Toolkit
3. 下载并安装对应版本的 cuDNN
4. 在软件中启用 `CUDA加速` 选项
5. 重启软件使配置生效

## 模型下载说明

openai-whisper 的模型为 `.pt` 格式文件，与 faster-whisper 的文件夹结构不同。

### 自动下载

首次使用某个模型时，软件会自动从 OpenAI 官方 CDN（`openaipublic.azureedge.net`）下载对应的 `.pt` 模型文件。下载完成后会缓存到本地，之后使用无需联网。

### 手动下载

如果自动下载失败，可手动下载模型文件：

OpenAI 官方模型下载地址如下，将下载的 `.pt` 文件放置在软件目录/models 文件夹

- **tiny.en**  https://openaipublic.azureedge.net/main/whisper/models/d3dd57d32accea0b295c96e26691aa14d8822fac7d9d27d5dc00b4ca2826dd03/tiny.en.pt
- **tiny**  https://openaipublic.azureedge.net/main/whisper/models/65147644a518d12f04e32d6f3b26facc3f8dd46e5390956a9424a650c0ce22b9/tiny.pt
- **base.en**  https://openaipublic.azureedge.net/main/whisper/models/25a8566e1d0c1e2231d1c762132cd20e0f96a85d16145c3a00adf5d1ac670ead/base.en.pt
- **base**  https://openaipublic.azureedge.net/main/whisper/models/ed3a0b6b1c0edf879ad9b11b1af5a0e6ab5db9205f891f668f8b0e6c6326e34e/base.pt
- **small.en**  https://openaipublic.azureedge.net/main/whisper/models/f953ad0fd29cacd07d5a9eda5624af0f6bcf2258be67c92b79389873d91e0872/small.en.pt
- **small**  https://openaipublic.azureedge.net/main/whisper/models/9ecf779972d90ba49c06d968637d720dd632c55bbf19d441fb42bf17a411e794/small.pt
- **medium.en**  https://openaipublic.azureedge.net/main/whisper/models/d7440d1dc186f76616474e0ff0b3b6b879abc9d1a4926b7adfa41db2d497ab4f/medium.en.pt
- **medium**  https://openaipublic.azureedge.net/main/whisper/models/345ae4da62f9b3d59415adc60127b97c714f32e89e936602e85993674d08dcb1/medium.pt
- **large-v1**  https://openaipublic.azureedge.net/main/whisper/models/e4b87e7e0bf463eb8e6956e646f1e277e901512310def2c24bf0e11bd3c28e9a/large-v1.pt
- **large-v2**  https://openaipublic.azureedge.net/main/whisper/models/81f7c96c852ee8fc832187b0132e569d6c3065a3252ed18e56effd0b6a73e524/large-v2.pt
- **large-v3**  https://openaipublic.azureedge.net/main/whisper/models/e5b1a55b89c1367dacf97e3e19bfd829a01529dbfdeefa8caeb59b3f1b81dadb/large-v3.pt
- **large**  https://openaipublic.azureedge.net/main/whisper/models/e5b1a55b89c1367dacf97e3e19bfd829a01529dbfdeefa8caeb59b3f1b81dadb/large-v3.pt
- **large-v3-turbo**  https://openaipublic.azureedge.net/main/whisper/models/aff26ae408abcba5fbf8813c21e62b0941638c5f6eebfb145be0c9839262a19a/large-v3-turbo.pt
- **turbo**  https://openaipublic.azureedge.net/main/whisper/models/aff26ae408abcba5fbf8813c21e62b0941638c5f6eebfb145be0c9839262a19a/large-v3-turbo.pt



### 模型存储位置

模型文件下载后会自动保存在软件运行目录下，无需手动指定路径。


## 常见问题与错误

### 下载模型失败或卡住

**原因：** 网络不稳定或无法访问 OpenAI CDN。

**解决方案：**

1. 检查网络连接，确保可以访问外网
2. 如果使用代理，请在系统中正确配置代理设置
3. 尝试在网络状况较好的时段重新下载
4. 手动下载模型文件，参照上方"手动下载"章节

### 识别结果空白或乱码

**原因：** 模型文件下载不完整或损坏。

**解决方案：**

1. 删除软件目录中对应的 `.pt` 模型文件，重新启动软件让其自动下载
2. 确认模型文件完整无缺（文件大小应与官方标注一致）

### 识别速度非常慢

**原因：** 未启用 CUDA 加速，或使用了过大的模型。

**解决方案：**

1. 确认已安装 CUDA 和 cuDNN，并在软件中启用 `CUDA加速`
2. 若无 NVIDIA 显卡，可尝试使用较小的模型（如 `base` 或 `small`）
3. 确认显卡显存满足模型要求

### 内存不足（OOM）

**原因：** 模型太大，内存或显存不够。

**解决方案：**

1. 使用较小的模型（如 `large-v3-turbo` 替代 `large-v3`）
2. 关闭其他占用内存的程序
3. 确保内存不低于 16G（使用 large 系列模型时）

### 识别的语言不正确

**原因：** 未正确指定发音语言。

**解决方案：**

1. 在软件中明确指定**发音语言**，确保与视频中语音所用语言一致
2. 如果视频包含多种语言，尝试分段处理

### 与 faster-whisper 的选择建议

如果你不确定选择哪个渠道，可参考以下建议：

- **追求速度：** 选择 `faster-whisper`，处理速度更快
- **追求精度：** 选择 `openai-whisper`，准确度略高
- **首次使用：** 建议先用 `faster-whisper`，体验更好
- **大模型处理：** 两者差异不大，可按个人偏好选择

