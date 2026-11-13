---
title: 2种界面说明：桌面软件和web网页
date: 2025-10-31 14:33:00
description: 2种界面说明：桌面软件和web网页
---

**支持2种UI界面**
- 一是基于Qt的桌面软件，不可在线预览，必须下载本地使用，也是主要维护模块，实现视频翻译、语音转录、语音合成、字幕翻译等完整功能；
- 二是**可预览**的基于 Gradio 的web页面，在浏览器中使用，可实现部署机和使用机分离。

## 桌面软件(sp.exe/sp.py)：本地使用

![](https://pvtr2.pyvideotrans.com/1779437252571_image.png)

Windows上双击 sp.exe，或执行`uv run sp.py`启动桌面软件界面，只可本机使用，功能完善，是维护重点

> [下载 Windows 预打包版](/downpackage)  
> [源码部署](/deply)

----

## WebUI界面

![](https://pvtr2.pyvideotrans.com/1782451631011_image.png)

- **[预览使用：在 huggingface.co(需科学上网)](https://huggingface.co/spaces/mortimerme/pyvideotrans)**
> 该预览运行时仅为2核无GPU，非常卡顿，请点击右上角三个点符号，选择`Clone repository`，克隆仓库到自己账号下，使用自己的GPU资源运行，速度更快
>
> 请勿在设置中填写SK 密钥等，所有设置均公开可见

- **[在 Google Colab 中使用：免费额度支持GPU加速(需科学上网)](https://colab.research.google.com/drive/1kPTeAMz3LnWRnGmabcz4AWW42hiehmfm?usp=sharing)**


- 在本地部署webui，并在浏览器中使用
```
git clone -b dev https://github.com/jianchang512/pyvideotrans.git 
cd pyvideotrans
uv sync --extra webui

uv run webui.py
```
