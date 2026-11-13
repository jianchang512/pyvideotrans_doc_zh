---
title: 如何查看 FFmpeg 是否支持某个编码和硬件加速
date: 2025-07-09 14:33:00
description: FFmpeg 能处理哪些音视频格式，FFmpeg 是否支持某个编码和硬件加速,以及我们的电脑硬件（如显卡）能否用来加速视频处理
---



## 如何用 FFmpeg 查看支持的编码和硬件加速

在使用 FFmpeg 处理视频时，我们经常需要知道它到底支持哪些编码格式，以及我们的电脑硬件（如显卡）能否用来加速视频处理。如果能用上硬件加速，处理视频的速度会快很多。这篇文章就用最直接的方式，教你如何查看这些信息。

## 一、查看所有支持的编解码器

想知道你的 FFmpeg 能处理哪些音视频格式，最简单的办法就是让它自己列出来。

### **1. 查看全部编解码器**

打开你的命令行终端（Windows 里的 CMD 或 PowerShell，macOS 或 Linux 里的终端），输入以下命令：

```bash
ffmpeg -codecs
```

执行后，你会看到一个长长的列表。每一行的格式都差不多，关键是看懂开头的那些字母：

```
Codecs:
 D..... = 支持解码 (Decoding)
 .E.... = 支持编码 (Encoding)
 ..V... = 视频 (Video)
 ..A... = 音频 (Audio)
 ..S... = 字幕 (Subtitle)
 ...I.. = 仅帧内压缩 (Intra frame-only)
 ....L. = 有损压缩 (Lossy)
 .....S = 无损压缩 (Lossless)
 -------
 D.V.L. h264                 H.264 / AVC / MPEG-4 AVC / MPEG-4 part 10
 DEV.LS h264_amf              AMD AMF H.264 Encoder (codec h264)
 DEV.L. h264_nvenc            NVIDIA NVENC H.264 encoder (codec h264)
 D.A.L. aac                   AAC (Advanced Audio Coding)
```

**怎么看这个列表？**

*   **第一列的字母** 是最重要的。比如 `D.V.L.` 就表示它是一个支持**解**码的、**视**频的、**有**损压缩的编解码器。
*   如果同时有 `D` 和 `E`，就表示这个格式既能解码（读取），也能编码（生成）。
*   **第二列是编解码器的名字**，比如 `h264`、`h264_nvenc`、`aac`。在 FFmpeg 命令里，我们就是用这些名字来指定编解码器的。
*   **第三列是描述**，帮助你理解这是什么东西。

### **2. 只看编码器或解码器**

如果列表太长，你也可以只看你想看的部分。

*   **只看支持的编码器 (Encoders):**
    ```bash
    ffmpeg -encoders
    ```

*   **只看支持的解码器 (Decoders):**
    ```bash
    ffmpeg -decoders
    ```
这会让你找东西更方便。

## 二、查看硬件加速支持

硬件加速通常分为两个层面：一是 FFmpeg 本身支不支持某种硬件加速技术，二是有没有对应的编解码器能用上这个技术。

### **第一步：检查 FFmpeg 支持哪些硬件加速技术**

这个命令会告诉你，你安装的这个 FFmpeg 版本在编译时都加入了哪些硬件加速功能。

```bash
ffmpeg -hwaccels
```

你可能会看到这样的输出：

```
Hardware acceleration methods:
vaapi
qsv
cuda
cuvid
d3d11va
videotoolbox

```

这些名字分别对应不同的技术和厂商：

*   `cuda`, `cuvid`, `nvenc`: 基本都是 **NVIDIA** 显卡用的。`nvenc` 主要管编码，`cuvid` 主要管解码。
*   `qsv`: **Intel** 核显的 Quick Sync Video 技术。
*   `vaapi`, `vdpau`: **Linux** 系统下常用的视频加速接口，Intel 和 AMD 显卡都可能用到。
*   `d3d11va`, `dxva2`: **Windows** 系统专用的，基于 DirectX 的加速技术，主要用于解码。
*   `videotoolbox`: **macOS** 系统专用的。
*   `amf`: **AMD** 显卡用的。

**如果这个列表是空的，那就说明你的 FFmpeg 版本不支持任何硬件加速。**

### **第二步：找到与硬件技术对应的编解码器**

知道了支持哪种技术，我们就可以去找能用上这个技术的具体编解码器了。这些编解码器通常有个特殊的后缀，比如 `_nvenc` (NVIDIA编码)、`_qsv` (Intel编码)、`_cuvid` (NVIDIA解码)。

我们可以用 `grep` (Linux/macOS) 或 `findstr` (Windows) 来快速筛选。

**如果你用的是 NVIDIA 显卡：**

*   查找硬件编码器：
    ```bash
    # Linux 或 macOS
    ffmpeg -encoders | grep nvenc
    # Windows
    ffmpeg -encoders | findstr "nvenc"
	
	# 输出类似
	V....D av1_nvenc            NVIDIA NVENC av1 encoder (codec av1)
	V....D h264_nvenc           NVIDIA NVENC H.264 encoder (codec h264)
	V....D hevc_nvenc           NVIDIA NVENC hevc encoder (codec hevc)
	
    ```
	
	
*   查找硬件解码器：
    ```bash
    # Linux 或 macOS
    ffmpeg -decoders | grep cuvid
    # Windows
    ffmpeg -decoders | findstr "cuvid"
	
	# 输出类似
	
	 V..... av1_cuvid            Nvidia CUVID AV1 decoder (codec av1)
	 V..... h264_cuvid           Nvidia CUVID H264 decoder (codec h264)
	 V..... hevc_cuvid           Nvidia CUVID HEVC decoder (codec hevc)
	 V..... mjpeg_cuvid          Nvidia CUVID MJPEG decoder (codec mjpeg)
	 V..... mpeg1_cuvid          Nvidia CUVID MPEG1VIDEO decoder (codec mpeg
	 V..... mpeg2_cuvid          Nvidia CUVID MPEG2VIDEO decoder (codec mpeg
	 V..... mpeg4_cuvid          Nvidia CUVID MPEG4 decoder (codec mpeg4)
	 V..... vc1_cuvid            Nvidia CUVID VC1 decoder (codec vc1)
	 V..... vp8_cuvid            Nvidia CUVID VP8 decoder (codec vp8)
	 V..... vp9_cuvid            Nvidia CUVID VP9 decoder (codec vp9)
    ```

**如果你用的是 Intel 核显：**

*   查找 QSV 相关的编解码器：
    ```bash
    # Linux 或 macOS
    ffmpeg -codecs | grep qsv
    # Windows
    ffmpeg -codecs | findstr "qsv"
	
	# 输出类似
	 DEV.L. av1                  Alliance for Open Media AV1 (decoders: libdav1d libaom-av1 av1 av1_cuvid av1_qsv) (encod
	: libaom-av1 librav1e libsvtav1 av1_nvenc av1_qsv av1_amf av1_vaapi)
	 DEV.LS h264                 H.264 / AVC / MPEG-4 AVC / MPEG-4 part 10 (decoders: h264 h264_qsv h264_cuvid) (encoders
	ibx264 libx264rgb h264_amf h264_mf h264_nvenc h264_qsv h264_vaapi h264_vulkan)
	 DEV.L. hevc                 H.265 / HEVC (High Efficiency Video Coding) (decoders: hevc hevc_qsv hevc_cuvid) (encode
	 libx265 hevc_amf hevc_d3d12va hevc_mf hevc_nvenc hevc_qsv hevc_vaapi hevc_vulkan)
	 DEVIL. mjpeg                Motion JPEG (decoders: mjpeg mjpeg_cuvid mjpeg_qsv) (encoders: mjpeg mjpeg_qsv mjpeg_vaa

	 DEV.L. mpeg2video           MPEG-2 video (decoders: mpeg2video mpegvideo mpeg2_qsv mpeg2_cuvid) (encoders: mpeg2vide
	peg2_qsv mpeg2_vaapi)
	 D.V.L. vc1                  SMPTE VC-1 (decoders: vc1 vc1_qsv vc1_cuvid)
	 DEV.L. vp8                  On2 VP8 (decoders: vp8 libvpx vp8_cuvid vp8_qsv) (encoders: libvpx vp8_vaapi)
	 DEV.L. vp9                  Google VP9 (decoders: vp9 libvpx-vp9 vp9_cuvid vp9_qsv) (encoders: libvpx-vp9 vp9_vaapi
	_qsv)
	 DEV.L. vvc                  H.266 / VVC (Versatile Video Coding) (decoders: vvc vvc_qsv) (encoders: libvvenc)
    ```

**如果你用的是 macOS：**

*   查找 VideoToolbox 相关的编解码器：
    ```bash
    # macOS
    ffmpeg -codecs | grep videotoolbox
    ```

## 三、综合实例：一个完整的检查流程

假设你用的是一块 NVIDIA 显卡，想把一个 HEVC (H.265) 格式的视频，用硬件加速转换成 H.264 格式。

### **1. 检查能否硬解 HEVC：**

运行 `ffmpeg -decoders | grep cuvid`。如果在结果里看到 `hevc_cuvid`，就说明可以。

```
V..... hevc_cuvid           Nvidia CUVID HEVC decoder (codec hevc)
```

### **2. 检查能否硬编 H.264：**

运行 `ffmpeg -encoders | grep nvenc`。如果在结果里看到 `h264_nvenc`，就说明可以。

```
V..... h264_nvenc           NVIDIA NVENC H.264 encoder (codec h264)
```

### **3. 使用硬件加速**

既然检查下来都支持，那你就可以在 FFmpeg 命令里大胆地使用它们了。一个典型的命令会长这样：

```bash
# -hwaccel cuvid               # 全局开启cuvid硬件解码加速
# -c:v hevc_cuvid              # 指定用 hevc_cuvid 解码器来处理输入视频
# -c:v h264_nvenc              # 指定用 h264_nvenc 编码器来生成输出视频
# -c:a copy                    # 音频直接复制，不重新编码

ffmpeg -hwaccel cuvid -c:v hevc_cuvid -i input.mkv -c:v h264_nvenc -c:a copy output.mp4
```

通过上面这几个简单的命令，你就能对自己电脑上的 FFmpeg 的能力有个全面的了解，也能写出更高效的视频处理命令。