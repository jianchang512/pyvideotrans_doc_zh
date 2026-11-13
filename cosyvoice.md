---
title: 在视频翻译软件中使用 CosyVoice3
date: 2024-01-22 14:33:00
description: 支持 中文、英文、日语、韩语、粤语，对应语言代码分别是 `zh|en|jp|ko|yue`
---

# 配音渠道：CosyVoice3

## 一、什么是 CosyVoice3

CosyVoice 是阿里通义实验室开源的 TTS 服务，支持中文、英文、日语、韩语、粤语语音克隆。CosyVoice3 是其最新版本，具有以下特点：

- 支持 5 种语言：中文（zh）、英文（en）、日语（jp）、韩语（ko）、粤语（yue）
- 3 秒极速复刻：仅需 3 秒参考音频即可克隆音色
- 内置 clone 角色：可直接复制原视频中的音色

> CosyVoice 开源地址：https://github.com/FunAudioLLM/CosyVoice

---

## 二、前置条件

| 条件 | 说明 |
|------|------|
| pyVideoTrans 版本 | 最新版（建议升级到最新） |
| 硬件 | 建议有 NVIDIA 显卡（GPU 加速） |
| 网络 | 首次启动需从 modelscope.cn 下载模型 |

---

## 三、重要说明：WebUI 文件修改

> **CosyVoice3 官方自带的 `webui.py` 无法直接用于对接！** 因其中的 audio 组件使用了流式输出，导致 API 调用时返回 m3u8 文件而非 wav 音频。

### 解决方法

打开 `webui.py` 文件，搜索代码 `streaming=True`，修改为 `streaming=False`，然后重新启动 `webui.py`。

或者直接下载修改版 `webui.py` 文件覆盖官方自带的：
- 下载地址：https://github.com/jianchang512/stt/releases/download/0.0/cosyvoice3-webui-py.zip

---

## 四、部署方式

### 方式一：Windows 整合包（推荐新手）

- 百度网盘下载(网友修改兼容RTX50版)：https://pan.baidu.com/s/15IvVlNrhGEsJucJfs-mqag?pwd=1234
- HuggingFace 下载：https://huggingface.co/mortimerme/repocollect/resolve/main/cosyvoice3-0529.7z?download=true

下载后解压，双击启动脚本即可。

### 方式二：源码部署

1. 部署好官方项目
2. 确认可以启动 `webui.py`，并在 UI 界面中成功完成一次配音操作
3. 下载修改版 `webui.py` 文件，覆盖官方自带的
4. 重新启动 `webui.py`

---

## 五、在 pyVideoTrans 中使用

### 操作步骤

1. **升级软件**：确保 pyVideoTrans 已升级到最新版本
2. **启动 WebUI**：确保已部署 CosyVoice 项目，并启动了 `webui.py`，可在浏览器中打开 `http://127.0.0.1:8000` 界面
3. **配置地址**：打开视频翻译软件 → 菜单 → TTS设置 → CosyVoice，填写 WebUI 地址，默认是 `http://127.0.0.1:8000`
4. **填写参考音频**：填写参考音频文件名和音频对应文字
5. **选择渠道**：在主界面「配音渠道」中选择 CosyVoice

### 参考音频格式

```
音频文件名.wav#音频对应的文字内容
```

示例：`nverguo.wav#女儿国王说话`

将音频文件放在 pyVideoTrans 项目根目录下的 `f5-tts` 文件夹内。

### 角色选择

- **clone 角色**：复制原视频中的音色（自动克隆）
- **自定义角色**：使用配置的参考音频进行克隆

---

## 六、参考音频要求

| 项目 | 要求 |
|------|------|
| 格式 | WAV 格式（推荐） |
| 时长 | 3~10 秒（最佳） |
| 内容 | 发音清晰，无背景噪音 |
| 放置位置 | pyVideoTrans 根目录下的 `f5-tts` 文件夹 |

> **源码代码验证**（`_cosyvoice.py`）：CosyVoice 使用 `/generate_audio` API 端点，参考音频会自动添加 `<|endofprompt|>` 标记，流式输出已强制关闭（`stream: False`）。

---

## 七、常见问题

### 1. 第一次使用下载模型很慢

第一次使用会自动从 modelscope.cn 下载模型，用时较久，请耐心等待。

### 2. 返回 m3u8 文件而非音频

这是因为未修改 WebUI 文件。请搜索 `streaming=True` 修改为 `streaming=False`，或下载修改版 `webui.py`。

### 3. 配音效果不理想

- 确保参考音频质量良好（发音清晰、无噪音）
- 参考音频时长建议 3~10 秒
- 尝试使用不同的参考音频

### 4. 连接失败

确保：
- CosyVoice WebUI 已启动
- 地址填写正确（默认 `http://127.0.0.1:8000`）
- 浏览器能正常打开 WebUI 界面
