---
title: 缺少 ffmpeg
date: 2024-01-22 14:33:00
description: 如果是windows系统，预打包版本中已含有ffmpeg，无需处理，源码中有 ffmpeg.7z 文件，解压后存放在软件根目录即可
---
## 缺少 ffmpeg

如果是windows系统，预打包版本中已含有ffmpeg，无需处理，源码中有 ffmpeg.7z 文件，解压后存放在软件根目录即可。

如果是Linux系统，Debian系可使用 `apt-get install ffmpeg` 或 Fedora系 `yum install ffmpeg` 安装即可。

Mac系统使用 `brew install ffmpeg` 安装


## 安装 ffmpeg

为什么要安装它呢？如果AI项目有涉及到音频或视频的，几乎百分百会用到它，因此建议安装

**下载ffmpeg 并设置环境变量**

ffmpeg Windows版本下载地址 

https://www.gyan.dev/ffmpeg/builds/packages/ffmpeg-6.1.1-full_build.7z

> 更多其他版本下载 https://www.gyan.dev/ffmpeg/builds/


下载后解压，进入到 bin 目录，你会看到3个exe文件。将他们复制到某个英文目录下，例如我复制到了`E:\sdk\ffmpeg`这个文件夹中，然后将这个路径添加到 Path 环境变量中。

 
 
**添加Path 环境变量 的方法**：按住 Win键+Pause键(右上角)， 打开的窗口中依次点击--高级系统设置--环境变量--系统变量--找到 Path这行双击


 
 
再依次点击 **新建--浏览**，找到那3个 exe 所在目录 



在浏览对话框中找到 之前提到的 ffmpeg.exe 所在目录，然后点击确定


然后就能在左侧看到新添加的路径了，点击确定关闭，一路确定下去关闭所有打开的对话框即可。






验证是否安装成功

随便打开一个cmd窗口，输入 ffmpeg回车，如果显示如下，说明安装正确，如果提示“ffmpeg不是可用的命令或...”之类，说明你配置环境变量时出错了，请重新配置