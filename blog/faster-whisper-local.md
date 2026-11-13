---
title: 最简单的语音转文字方案：完全离线、免费、安全、不限时！
date: 2025-11-08 14:33:00
description: 零门槛上手，不联网也能自动生成字幕，小白也能轻松搞定。基于 faster-whisper + uv + ffmpeg 的本地语音识别全图解教程。
---



如果你正在寻找一个完全免费、在自己电脑上运行、并且转录效果顶尖的语音转字幕工具，那么你来对地方了。

![效果和使用如图](https://pvtr2.pyvideotrans.com/1762844849551_stt.gif)

这份教程会手把手带你完成所有设置，过程非常简单，即使是电脑新手也能轻松搞定。让我们开始吧！

## 第一部分：准备工作（如果已有uv和ffmpeg可跳过该部分）

在正式开始前，我们需要给电脑请来两位“小助手”：`uv` 和 `ffmpeg`。别担心，这很简单！

### **步骤 1：安装 uv**

`uv` 就像一个聪明的管家，它能帮我们自动搞定所有复杂的程序配置，我们只需要一个简单的命令就行。

*   **下载地址：**
    Windows 用户请点击这里下载 `uv`：
    `https://github.com/astral-sh/uv/releases/download/0.9.8/uv-x86_64-pc-windows-msvc.zip`

*   **操作步骤：**
    1.  下载后，解压这个 `uv-x86_64-pc-windows-msvc.zip` 压缩包。你会看到 `uv.exe` 等几个文件。
    2.  现在，我们需要把这个“管家”放到一个系统能随时找到的地方。打开电脑的任意文件夹，在顶部的地址栏里，**清空原有路径**，然后输入 ` %userprofile%\.local\bin` 并按回车键。
        ![在文件地址栏输入特定路径](https://pvtr2.pyvideotrans.com/1762673253425_image.png)
    3.  把刚才解压出来的 `uv.exe` 等所有文件，**全部复制粘贴**到这个新打开的文件夹里。
        ![将uv.exe文件粘贴到指定路径](https://pvtr2.pyvideotrans.com/1762673298235_image.png)

*   **小贴士：** 这一步是为了让电脑“记住” `uv` 在哪里，以后我们就能在任何地方直接使唤它了！
*   *（如果你是 Mac 用户，操作更简单，只需在终端里运行 `wget -qO- https://astral.sh/uv/install.sh | sh` 即可。）*

### **步骤 2：安装 ffmpeg**

`ffmpeg` 是一个处理音视频的万能工具，我们的程序需要用它来读取你上传的任何音频或视频文件。

*   **下载地址：**
    Windows 用户请点击这里下载 `ffmpeg`：
    `https://www.gyan.dev/ffmpeg/builds/ffmpeg-release-full.7z`

*   **操作步骤：**
    1.  下载后，解压这个 `ffmpeg-release-full.7z` 压缩包。
    2.  进入解压后的文件夹（名字类似 `ffmpeg-x.x.x-full_build`），找到里面的 `bin` 文件夹。
    3.  在 `bin` 文件夹里，你会看到一个 `ffmpeg.exe` 文件。把它**复制**出来。
    4.  将这个 `ffmpeg.exe` 文件，粘贴到我们刚才存放 `uv.exe` 的**同一个文件夹**里（也就是 `%userprofile%\.local\bin` 那个）。

*   *（如果你是 Mac 用户，同样很简单，在终端里运行 `brew install ffmpeg` 就行了。）*


###  仍然提示 uv 或 ffmpeg 未找到怎么办？

> 打开一个新的cmd，输入`uv`，如果提示未找到，说明 `%userprofile%/.local/bin`不在环境变量中

点开左下角“开始菜单”找到 "命令行提示符"，右键-->更多--->以管理员身份运行，粘贴这个命令，回车执行

`reg add "HKCU\Environment" /v Path /t REG_EXPAND_SZ /d "%PATH%;%USERPROFILE%\.local\bin" /f`


![](https://pvtr2.pyvideotrans.com/1762845015239_path.gif)


**太棒了！** 最关键的准备工作已经完成。这两个工具只需要安装这一次，以后就再也不用管了。

## 第二部分：下载程序与模型

现在，我们来下载转录工具本身。

### **步骤 1：下载主程序**

*   **下载地址：** `https://pyvideotrans.com/stt.7z` (约600KB)

*   **操作步骤：**
    1.  点击上面的链接下载 `stt.7z` 压缩包。
    2.  把它解压到你喜欢的位置，比如桌面。解压后你会得到一个文件夹`models`和 `app.py` 、 `index.html` 文件。
        ![](https://pvtr2.pyvideotrans.com/1762800336864_image.png)

### **步骤 2：下载核心模型**

模型就是这个工具的“大脑”，负责识别语音。

*   **下载模型国内：** `https://hf-mirror.com/dropbox-dash/faster-whisper-large-v3-turbo/resolve/main/model.bin?download=true`
*   **下载模型墙外：** `https://huggingface.co/dropbox-dash/faster-whisper-large-v3-turbo/resolve/main/model.bin?download=true`
*   **操作步骤：**
    1.  点击链接下载这个 `model.bin` 文件（文件1.6G，请耐心等待）。
    2.  下载完成后，把它移动到我们刚才解压的程序文件夹里。具体路径是：进入程序文件夹 -> 进入 `models` 文件夹 -> 进入 `turbo` 文件夹，然后把 `model.bin` **放进这个 `turbo` 文件夹里**。
![](https://pvtr2.pyvideotrans.com/1762801398027_image.png)


## 第三部分：启动与使用

1.  打开我们刚才解压的程序文件夹。
2.  在文件夹顶部的地址栏里，**清空所有内容**，输入 `cmd`，然后按回车键。这会弹出一个黑色窗口。
3.  在黑色窗口里，输入下面的命令，然后按回车键：
    ```
    uv run app.py
    ```
    ![](https://pvtr2.pyvideotrans.com/1762703986708_image.png)
4.  稍等片刻，当窗口里显示出类似下面的信息时，就代表服务启动成功了！![](https://pvtr2.pyvideotrans.com/1762800099472_image.png)
    

5.  同时，你的默认浏览器会自动打开一个新页面，这就是我们的语音转录工具界面！![](https://pvtr2.pyvideotrans.com/1762800084113_image.png)
    

现在，你就可以点击或拖拽你的音频/视频文件上去，调整参数，然后点击“提交转录”来体验了！祝你使用愉快！