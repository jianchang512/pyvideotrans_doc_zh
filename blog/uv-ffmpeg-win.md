---
title: 【新手必看】在Windows下设置环境变量uv+ffmpeg
date: 2025-12-02 14:33:00
description: 【新手必看】在Windows下设置环境变量uv+ffmpeg
---

![](https://pvtr2.pyvideotrans.com/1764778166268_path变量.gif)

在部署 pyVideoTrans、F5-TTS 或 Index-TTS 等 AI 项目时，**uv** 和 **ffmpeg** 是必不可少的基础工具。

很多朋友下载了软件，但在运行源码时却遇到报错：
> ![](https://pvtr2.pyvideotrans.com/1764778624067_image.png)

这是因为 Windows 系统还不知道这俩工具“藏”在哪里。本文将通过图文演示，手把手教你把它们加入系统环境变量。

## 一、 准备工作
首先，请确保你已经下载并解压了相关工具。
假设你将 `uv.exe` 和 `ffmpeg.exe` 统一存放到了 `D:/tools` 文件夹下，如下图所示：
> **注意**：请确保该文件夹内能直接看到 `.exe` 文件。

![](https://pvtr2.pyvideotrans.com/1764777668424_image.png)

## 二、 配置步骤

**1. 打开系统属性**
回到电脑桌面，找到【此电脑】图标，**右键**点击，选择底部的【属性】。
*(提示：Win11 用户如果右键没看到属性，请点击“显示更多选项”)*
![](https://pvtr2.pyvideotrans.com/1764777756443_1.png)

**2. 进入高级设置**
在弹出的设置面板中，向下拉到底部，找到并点击【高级系统设置】。
![](https://pvtr2.pyvideotrans.com/1764777868740_2.png)

**3. 打开环境变量**
在弹出的“系统属性”小窗口中，点击右下角的【环境变量】按钮。
![](https://pvtr2.pyvideotrans.com/1764777928672_3.png)

**4. 编辑 Path 变量（关键步骤）**
在下方的“系统变量”区域中，找到名为 `Path` 的一行，选中它，然后点击【编辑】（或者直接双击 Path 这一行）。
![](https://pvtr2.pyvideotrans.com/1764777974826_4.png)

**5. 添加路径**
在弹出的列表中，点击右上角的【新建】，然后点击【浏览】。
![](https://pvtr2.pyvideotrans.com/1764778017156_5.png)

**6. 定位文件夹**
在浏览框中，依次展开 `此电脑` -> `D盘` -> `tools`（或者你存放 exe 的那个文件夹），点击确定。
![](https://pvtr2.pyvideotrans.com/1764778052848_6.png)

**7. 保存设置**
最后，**必须连续点击所有弹窗的【确定】按钮**，直到所有窗口关闭，设置才会生效。


## 三、 验证是否成功
1. 按下键盘上的 `Win + R` 键，输入 `cmd` 并回车。![](https://pvtr2.pyvideotrans.com/1764778519290_image.png)
2. 在黑窗口中输入 `uv --version` 或 `ffmpeg -version`。
3. 如果出现了版本号说明安装成功！如果依然提示“不是内部命令”，请重启电脑后再试。

---
## 附：工具下载地址
*   **uv.exe**：下载后解压。
    *   [点击下载 uv (Windows版)](https://github.com/astral-sh/uv/releases/download/0.9.8/uv-x86_64-pc-windows-msvc.zip)
*   **ffmpeg.exe**：下载后解压，进入 `bin` 文件夹，将其中的 3 个 exe 文件放入你的工具目录。
    *   [点击下载 ffmpeg](https://www.gyan.dev/ffmpeg/builds/ffmpeg-release-full.7z)

