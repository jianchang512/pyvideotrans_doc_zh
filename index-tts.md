---
title: 使用 index-tts 作为配音渠道
date: 2025-09-10 14:33:00
description: windows10/11上源码安装部署 index-tts
---

# 使用 Index-TTS 2.5 作为配音渠道

## 什么是 Index-TTS

Index-TTS 是 B站开源的 TTS 服务，支持中文和英文语音克隆，音质效果优秀。

> Index-TTS 开源地址：https://github.com/index-tts/index-tts


## 本地源码部署 index-tts 2.5

> **注意：** 建议提前配置科学上网，需要下载近10G的模型，无科学上网虽会自动使用国内镜像，但很可能超时失败。

0. 创建一个英文文件夹，例如`D:/indextts25`,后续所有的操作都在该文件夹下

1. 下载 index-tts 2.5 源码，打开官方代码地址 [https://github.com/index-tts/index-tts](https://github.com/index-tts/index-tts) 点击绿色`<>Code`按钮，继续点击`Download ZIP`按钮，会自动下载一个zip文件`index-tts-main.zip`
![](https://pvtr2.pyvideotrans.com/1786637494365_image.png)

2. 解压后会得到一个`index-tts-main`文件夹，进入该文件夹，会看到很多文件，如果进入后只看到一个文件夹，则继续进入，直到看见很多文件(包括 webui.py 文件),复制所有这些文件和文件夹到`D:/indextts25`中

![](https://pvtr2.pyvideotrans.com/1786637533534_image.png)


![](https://pvtr2.pyvideotrans.com/1786637635594_image.png)

3. 下载 uv.exe,下载地址是 [https://releases.astral.sh/github/uv/releases/download/0.12.3/uv-x86_64-pc-windows-msvc.zip](https://releases.astral.sh/github/uv/releases/download/0.12.3/uv-x86_64-pc-windows-msvc.zip) 下载后解压会得到3个exe文件，分别是`uv.exe, uvx.exe, `将他们也都复制到`D:/indextts25`中

![](https://pvtr2.pyvideotrans.com/1786638382532_image.png)


4. 在`D:/indextts25`文件夹的地址栏中清空所有内容，输入cmd，然后回车，会打开一个黑色框框（终端）

![](https://pvtr2.pyvideotrans.com/1786637717938_image.png)

![](https://pvtr2.pyvideotrans.com/1786637764642_image.png)

5. 在此黑色终端内输入命令`uv sync --extra webui`，然后回车，进行安装过程，该过程需要很长一段时间，请耐心等待
![](https://pvtr2.pyvideotrans.com/1786637864122_image.png)

6. 上一步完成后，继续输入命令`uv run webui.py`,等待一段时间后，会显示`http://0.0.0.1:7860`
![](https://pvtr2.pyvideotrans.com/1786637944058_image.png)

![](https://pvtr2.pyvideotrans.com/1786638604287_image.png)



在浏览器中打开 http://127.0.0.1:7860  即可使用了，界面如下
![](https://pvtr2.pyvideotrans.com/1786637978859_image.png)

----

## 在 Google Colab 中免费使用 index-tts 2.5

> 必须会科学上网，有 Google 账号

如果不会或不想本地部署，也可在 google colab 上使用，点击[该 Google Colab链接](https://colab.research.google.com/drive/1S1rXSkGcJh7txeMOhj5eQLlLLkamyw-9?usp=sharing) ，打开后点击 顶部的**全部运行**按钮
![](https://pvtr2.pyvideotrans.com/1786638874851_image.png)

等待底部显示如图后
![](https://pvtr2.pyvideotrans.com/1786638825281_image.png)

将这个 ** https://xxxxxx.gradio.live** 地址填写到 pyVideoTrans 中，即可使用



----

## 在 pyVideoTrans 中使用

### 配置步骤

1. 启动 Index-TTS WebUI（确保浏览器能打开 `http://127.0.0.1:7860`）
2. 打开 pyVideoTrans，点击菜单 → TTS设置 → index-TTS/VoxCPM-TTS
3. 在「IndexURL」文本框中填写：本地部署填写 `http://127.0.0.1:7860` ，google colab 上的填写 Running on public URL 对应的地址
4. 在版本号下拉选`V2.5`
5. 点击「测试」，若无报错则配置成功
6. 在主界面「配音渠道」下拉列表中选择「Index-TTS」

> **注意**：仅对接 Index-TTS 官方 WebUI。


---

## 参考音频要求

| 项目 | 要求 |
|------|------|
| 格式 | WAV 格式（推荐） |
| 时长 | 3~10 秒（最佳） |
| 内容 | 发音清晰，无背景噪音 |
| 放置位置 | pyVideoTrans 根目录下的 `f5-tts` 文件夹 |

### 参考音频格式

```
音频文件名.wav#音频对应的文字内容
```

> **源码代码验证**（`_index.py`）：Index-TTS 使用 `/gen_single` Gradio API 端点，支持 v1 和 v2 版本。v2 版本额外支持情感控制（`emo_control_method`），默认选项为 `Same as the voice reference`（与音色参考音频相同）。

---

## 常见问题

### 1. 第三方整合包无法使用

如果你使用了第三方整合包，请用 [Index-TTS 官方源码](https://github.com/index-tts/index-tts) 中的 `webui.py` 文件覆盖三方包的 `webui.py`，然后启动该 `webui.py`，否则可能无法使用。

### 2. 报错 `配音全部失败 Value: 'Same as the voice reference' is not in the list of choices`

或者报错 `Value: '与音色参考音频相同' is not in the list of choices`。

**解决方法**：打开 Index-TTS 项目的 `webui.py` 文件，搜索 `i18n("与音色参考音频相同")`，替换为 `Same as the voice reference`。

### 3. 连接失败

确保：
- Index-TTS WebUI 已启动
- 地址填写正确（默认 `http://127.0.0.1:7860`）
- 浏览器能正常打开 WebUI 界面

### 4. 模型下载慢

首次启动需要下载模型，请耐心等待。如需加速可配置科学上网环境。
