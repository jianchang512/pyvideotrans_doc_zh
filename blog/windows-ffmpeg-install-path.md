---
title: windows上应该安装下载哪个ffmpeg版本？如何设置到环境变量
date: 2025-07-03 10:33:00
description: 在windows上安装 ffmpeg，最简单的方式是直接下载官方提供的exe,ffmpeg-release-essentials,ffmpeg-release-full,ffmpeg-release-full-shared 多个版本间有什么区别，应该使用哪个
---

在windows上安装 ffmpeg，最简单的方式是直接下载官方提供的exe。

> ffmpeg官方下载地址：https://www.gyan.dev/ffmpeg/builds

在下载页面存在多个版本，如下图，他们之间有什么区别、应该下载哪个呢？

![](https://pvtr2.pyvideotrans.com/1751509699515_image.png)


## 各版本详细解释

### 1. `ffmpeg-release-essentials`开头的  (基础版)

*   **包含内容**:
    *   `ffmpeg.exe` (主程序，用于音视频转换、处理)
    *   `ffprobe.exe` (用于查看媒体文件详细信息)
    *   `ffplay.exe` (一个简单的播放器，用于快速预览)
    *   包含了一组最核心、最常用的库（编码器、解码器、滤镜等），例如 H.264, H.265 (HEVC), AAC, MP3, VP9 等。
*   **特点**:
    *   文件体积最小。
    *   功能足够满足绝大多数日常使用场景，如格式转换、视频剪辑、合并、提取音频等。
*   **适合谁**:
    *   **绝大多数普通用户和初学者**。如果你不确定自己需要什么，选这个版本基本不会错。

---

### 2. `ffmpeg-release-full` (完整版)

*   **包含内容**:
    *   包含 `essentials` 版本的所有内容。
    *   **额外**包含大量非必需但很强大的第三方库和滤镜。例如：
        *   更专业的编码器（如 `AV1` 的 `svt-av1`）。
        *   高级滤镜（如 `libvmaf` 用于视频质量评估）。
        *   支持更多不常见的格式和协议。
*   **特点**:
    *   功能最全面，支持几乎所有 FFmpeg 能做的事情。
    *   文件体积比 `essentials` 版大。
    *   这是一个 **"static" (静态)** 版本，意味着所有依赖的库都编译进了 `ffmpeg.exe` 等可执行文件中。这使得程序非常便携，只需要一个 `.exe` 文件就能运行，但也导致了 `.exe` 文件本身比较大。
*   **适合谁**:
    *   **所有人**，或者当你在使用 `essentials` 版本时遇到 "Unknown encoder/decoder/filter..." (未知的编码器/解码器/滤镜) 错误提示，说明你需要的功能不在基础版里，这时就应该下载完整版。

---

### 3. `ffmpeg-release-full-shared` (完整共享库版)

> 非程序开发者请勿使用该版本，否则可能遇到缺少 xxx.dll 的错误
>
> ![](https://pvtr2.pyvideotrans.com/1751509974801_image.png)


*   **包含内容**:
    *   功能上和 `full` 版本完全一样，包含了所有库。
    *   **结构不同**: 这是一个 **"shared" (共享)** 版本。它没有把所有库都编译进 `.exe` 文件中，而是将这些库作为独立的 `.dll` 文件（动态链接库）放在 `bin` 文件夹下。
*   **特点**:
    *   `ffmpeg.exe` 文件本身很小。
    *   程序运行时需要依赖同目录下的 `.dll` 文件，不能单独移动 `.exe` 文件。
    *   总解压后的文件夹体积是最大的。
*   **适合谁**:
    *   **软件开发者**。当你想在自己的程序（例如用 C++, Python, C# 等语言）中调用 FFmpeg 的功能时，你需要链接这些 `.dll` 库文件。普通命令行用户几乎用不到这个版本。

---

## 将 他们加入到系统环境变量中

添加Path 环境变量 的方法：按住 Win键+Pause键(右上角)， 打开的窗口中依次点击--高级系统设置--环境变量--系统变量--找到 Path这行双击

![](https://pvtr2.pyvideotrans.com/1751510084884_image.png)

再依次点击 新建--浏览，找到那3个 exe 所在目录

![](https://pvtr2.pyvideotrans.com/1751510092574_image.png)

在浏览对话框中找到 之前提到的 ffmpeg.exe 所在目录，然后点击确定

![](https://pvtr2.pyvideotrans.com/1751510100051_image.png)

然后就能在左侧看到新添加的路径了，点击确定关闭，一路确定下去关闭所有打开的对话框即可。

![](https://pvtr2.pyvideotrans.com/1751510113881_image.png)

**动图演示**

![](https://pvtr2.pyvideotrans.com/1751510118241_image.png)

**验证是否设置环境变量成功**

随便打开一个cmd窗口，输入 ffmpeg回车，如果显示如下，说明安装正确，如果提示“ffmpeg不是可用的命令或...”之类，说明你配置环境变量时出错了，请重新配置

![](https://pvtr2.pyvideotrans.com/1751510144720_image.png)



## 关于压缩格式：`.7z` vs `.zip`

*   `ffmpeg-release-essentials.7z` (27 MB)
*   `ffmpeg-release-essentials.zip` (88 MB)

这两个文件的 **内容完全相同**，唯一的区别是压缩算法。

*   **`.7z`**: 使用 7-Zip 算法，压缩率更高，所以下载文件更小。你需要安装 7-Zip 或 WinRAR 等软件来解压。
*   **`.zip`**: Windows 系统自带解压功能，兼容性最好，但压缩率较低，所以下载文件更大。

**建议**: 如果你电脑上装了 7-Zip 或 WinRAR，**下载 `.7z` 版本**可以节省下载时间和带宽。

---

## 总结与选择建议

| 版本名称 | 主要特点 | 目标用户 | 推荐指数 |
| :--- | :--- | :--- | :--- |
| **`ffmpeg-release-essentials`** | 核心功能，体积小 | **普通用户、初学者** | ★★★★★ (最推荐) |
| **`ffmpeg-release-full`** | 功能最全，静态编译，可执行文件大 | **高级用户、专业人士** | ★★★★☆ |
| **`ffmpeg-release-full-shared`** | 功能最全，动态链接，包含大量DLL文件 | **软件开发者** | ★☆☆☆☆ (普通用户不要选) |

**一句话总结：**

*   **不确定用哪个？** -> 下载 `ffmpeg-release-essentials.7z`。
*   **`essentials` 版报错说找不到某个功能？** -> 换用 `ffmpeg-release-full.7z`。
*   **你是程序员，要在自己的项目里用 FFmpeg？** -> 下载 `ffmpeg-release-full-shared.7z`。