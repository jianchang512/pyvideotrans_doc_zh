---
title: 语音识别转文字工具
date: 2024-01-22 14:33:00
description: 这是一个离线运行的本地语音识别转文字工具，基于 openai-whipser 开源模型，可将视频/音频中的人类声音识别并转为文字，可输出json格式、srt字幕带时间戳格式、纯文字格式。可用于自行部署后替代 openai 的语音识别接口或百度语音识别等，准确率基本等同openai官方api接口。
---

# 语音识别渠道：STT 本地识别工具

## 这是什么？

STT 是一个基于 Faster-Whisper 开源模型的**离线本地语音识别工具**，能够将视频或音频中的人声转换为文字。

**核心特点**：
- 完全离线运行，无需联网
- 支持多种输出格式：JSON、SRT 字幕、纯文字
- 内置 base 模型，可自行下载更多模型
- 支持 CUDA GPU 加速
- 准确率基本等同 OpenAI 官方 API

> GitHub 仓库：[https://github.com/jianchang512/stt](https://github.com/jianchang512/stt)

## 可用模型

STT 支持以下 Whisper 模型，按识别效果从低到高排列：

| 模型名称 | 参数量 | 显存需求 | 识别效果 | 适用场景 |
|----------|--------|----------|----------|----------|
| base | 74M | ~1GB | 一般 | 快速测试、简单场景 |
| small | 244M | ~2GB | 较好 | 日常使用 |
| medium | 769M | ~5GB | 好 | 多语言识别 |
| large | 1550M | ~10GB | 很好 | 高精度识别 |
| large-v3 | 1550M | ~10GB | 最佳 | 最高精度要求 |

> 模型下载地址：[https://github.com/jianchang512/stt/releases/tag/0.0](https://github.com/jianchang512/stt/releases/tag/0.0)

**模型选择建议**：如果显卡显存不足，建议从 base 或 small 模型开始。模型越大，识别越准确，但对硬件要求也越高。

## 预编译 Windows 版使用方法

### 环境要求

- Windows 10/11 64位系统
- 如需 GPU 加速，需要 NVIDIA 显卡并正确配置 CUDA

### 安装步骤

1. **下载预编译文件**
   访问 [Releases 页面](https://github.com/jianchang512/stt/releases) 下载最新版本的预编译包

2. **解压文件**
   将下载的压缩包解压到任意位置，推荐路径不含中文和空格，例如 `E:/stt`

3. **启动服务**
   双击 `start.exe`，等待浏览器自动打开本地网页界面

4. **识别语音**
   - 在网页中点击上传区域，或直接拖拽音频/视频文件到上传区域
   - 选择发声语言（中文/英文/自动检测等）
   - 选择输出格式（JSON/SRT/纯文字）
   - 选择使用的模型（已内置 base 模型）
   - 点击"立即开始识别"
   - 等待识别完成，结果将显示在页面底部文本框中

5. **GPU 加速**
   如果机器拥有 NVIDIA 显卡并正确配置了 CUDA 环境，将自动使用 GPU 加速识别

## Linux 和 Mac 源码部署

### 环境要求

- Python 3.9 至 3.11 版本
- pip 包管理器
- FFmpeg（需要手动安装）

### 部署步骤

1. **创建项目目录并拉取源码**

   创建一个空目录（如 `E:/stt`），在该目录下打开命令行终端（在 Windows 资源管理器地址栏输入 `cmd` 并回车），然后执行：

   ```bash
   git clone git@github.com:jianchang512/stt.git .
   ```

2. **创建并激活虚拟环境**

   ```bash
   # 创建虚拟环境
   python -m venv venv

   # 激活环境（根据操作系统选择）
   # Windows:
   %cd%/venv/scripts/activate
   # Linux/Mac:
   source ./venv/bin/activate
   ```

3. **安装依赖**

   ```bash
   pip install -r requirements.txt
   ```

   > **提示**：如果遇到版本冲突错误，可尝试使用 `pip install -r requirements.txt --no-deps` 跳过依赖检查

4. **安装 FFmpeg**

   - **Windows**：解压 `ffmpeg.7z`，将 `ffmpeg.exe` 和 `ffprobe.exe` 放到项目根目录
   - **Linux/Mac**：从 [FFmpeg 官网](https://ffmpeg.org/download.html) 下载对应版本，将 `ffmpeg` 和 `ffprobe` 二进制程序放到项目根目录

5. **下载模型**

   访问 [模型下载页面](https://github.com/jianchang512/stt/releases/tag/0.0)，根据需要下载对应模型。下载后将 `.pt` 文件放入项目根目录的 `models` 文件夹内。

6. **启动服务**

   ```bash
   python start.py
   ```

   等待自动打开本地浏览器窗口即可使用。

## API 接口说明

STT 提供 RESTful API 接口，可用于与其他工具集成。

### 接口地址

```
POST {url}/api
```

### 请求参数

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| file | 文件 | 是 | 音频文件（wav 格式，16kHz 采样率，单声道） |
| language | 字符串 | 否 | 语言代码（如 `zh`、`en`），留空则自动检测 |
| model | 字符串 | 否 | 模型名称（如 `base`、`small`） |
| response_format | 字符串 | 否 | 输出格式：`json`、`srt`、`text` |

### 返回格式

```json
{
  "code": 0,
  "data": "识别结果文本或SRT内容"
}
```

- `code` 为 0 表示成功，1 表示失败
- `data` 包含识别结果

### 重试机制

API 支持自动重试，如果识别失败会自动重新尝试。

## 常见问题

| 问题 | 可能原因 | 解决方法 |
|------|----------|----------|
| 浏览器未自动打开 | 防火墙阻止或端口被占用 | 手动访问 `http://localhost:7860` |
| 识别结果为空 | 音频格式不支持 | 使用 FFmpeg 将音频转换为 wav 格式（16kHz，单声道） |
| 识别速度很慢 | 未启用 GPU 加速 | 检查 CUDA 环境，确保 NVIDIA 驱动和 CUDA Toolkit 正确安装 |
| 显存不足报错 | 显卡显存不够 | 换用更小的模型（如 base 或 small） |
| 依赖安装失败 | Python 版本不兼容 | 确保使用 Python 3.9-3.11 版本 |
| FFmpeg 未找到 | FFmpeg 未正确放置 | 确保 ffmpeg 和 ffprobe 在项目根目录下 |
