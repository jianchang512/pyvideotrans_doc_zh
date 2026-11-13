---
title: 语音识别渠道集成 Whisper_CPP 使用方式
date: 2026-01-22 14:33:00
description: 语音识别渠道集成 Whisper_CPP
---

# Whisper_CPP 语音识别集成

Whisper_CPP 是 OpenAI Whisper 模型的 **C++ 高性能实现版本**，相比原生 Python 实现，Whisper_CPP 具有更快的推理速度和更低的内存占用。

## 支持的模型

Whisper_CPP 使用 GGML 格式模型文件（`.bin` 扩展名），支持以下模型：

| 模型文件 | 参数量 | 显存需求 | 识别效果 | 推荐场景 |
|----------|--------|----------|----------|----------|
| ggml-tiny.bin | 39M | ~1GB | 一般 | 快速测试 |
| ggml-base.bin | 74M | ~1GB | 较好 | 日常简单场景 |
| ggml-small.bin | 244M | ~2GB | 好 | 多语言识别 |
| ggml-medium.bin | 769M | ~5GB | 很好 | 高精度识别 |
| ggml-large-v1.bin | 1550M | ~10GB | 好 | 大模型 v1 |
| ggml-large-v2.bin | 1550M | ~10GB | 很好 | 大模型 v2 |
| ggml-large-v3.bin | 1550M | ~10GB | 最佳 | 最高精度 |
| ggml-large-v3-turbo.bin | 1550M | ~10GB | 效果速度均衡 | 推荐首选 |


### Windows 系统

自 v4.08 版本起，windows上第一次使用时将自动下载[预编译GPU版本whisper-cublas-12.4.0-bin-x64.zip
]并解压到 `软件目录/whisper-cpp`文件夹内。

如果你想使用其他版本，可以自行打开该地址 https://github.com/ggml-org/whisper.cpp/releases/tag/v1.9.1 然后下载标有 `Win32`或`x64`的压缩包，解压后将`Releases`内的所有文件复制覆盖到 `软件目录/whisper-cpp`文件夹内即可


### macOS或Linux 系统

这2个系统下，你需要根据操作系统，下载符合该系统对应的预编译包，并将解压后的二进制文件和依赖复制到`软件目录/whisper-cpp`内，并赋予`whisper-cli`文件可执行权限。

如果不存在预编译包，需你自行根据仓库文档说明本地编译，然后将编译产物及so等依赖库复制到`软件目录/whisper-cpp`内，确保存在`whisper-cli`可执行文件。


## 下载载模型文件

模型文件在需要时会自动从以下地址下载 GGML 格式模型文件：

- **官方下载源(墙外)**：[https://huggingface.co/ggerganov/whisper.cpp/tree/main](https://huggingface.co/ggerganov/whisper.cpp/tree/main)
- **镜像下载源**：[https://hf-mirror.com/ggerganov/whisper.cpp/tree/main](https://hf-mirror.com/ggerganov/whisper.cpp/tree/main)

下载后将 `.bin` 文件放入 `软件目录/models` 文件夹内。



## 添加额外关键参数说明

可在 pyVideoTrans 软件目录下，即 sp.exe 同目录下创建一个 `pyvideotrans.txt`文本，自定义额外参数

## 常见问题

| 问题 | 可能原因 | 解决方法 |
|------|----------|----------|
| whisper-cli.exe 无法启动 | 缺少 VC++ 运行库 | 安装 Microsoft Visual C++ Redistributable |
| 提示找不到模型文件 | 模型未下载或路径错误 | 将 `.bin` 模型文件放入 `models/` 目录 |
| GPU 加速未生效 | CUDA/Vulkan 环境未配置 | 安装对应版本的 CUDA Toolkit 或更新显卡驱动 |
| 识别速度很慢 | 使用了 CPU 版本 | 下载对应的 CUDA 加速版本并正确配置 |
| 识别结果不准 | 模型太小或语言设置错误 | 使用更大的模型，确认语言设置正确 |
| 路径包含中文报错 | 程序路径不支持中文 | 将 pyVideoTrans 解压到不含中文路径的文件夹 |
