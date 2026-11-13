---
title: Windows系统安装 ffmpeg
date: 2024-01-22 14:33:00
description: Windows系统安装 ffmpeg的教程
---

## Windows系统安装 ffmpeg

> 如果你使用的是预打包版，则已内置ffmpeg，无需再单独安装

为什么要安装它呢？如果AI项目有涉及到音频或视频的，几乎百分百会用到它，因此建议安装

**下载ffmpeg 并设置环境变量**

ffmpeg Windows版本下载地址 

https://www.gyan.dev/ffmpeg/builds/#release-builds

选择下载 `ffmpeg-release-full.7z` 这个压缩包，这个包含所有常见库支持，下载后解压，进入到 bin 目录，你会看到3个exe文件。将他们复制到某个英文目录下，例如我复制到了`E:\sdk\ffmpeg`这个文件夹中，然后将这个路径添加到 Path 环境变量中。

![image.png](https://pvtr2.pyvideotrans.com/img/20241128131131-0.webp)
 
 
**添加Path 环境变量 的方法**：按住 Win键+Pause键(右上角)， 打开的窗口中依次点击--高级系统设置--环境变量--系统变量--找到 Path这行双击


![image.png](https://pvtr2.pyvideotrans.com/img/20241128131132-1.webp)
 
 
再依次点击 **新建--浏览**，找到那3个 exe 所在目录 


![image.png](https://pvtr2.pyvideotrans.com/img/20241128131132-2.webp)

在浏览对话框中找到 之前提到的 ffmpeg.exe 所在目录，然后点击确定

![image.png](https://pvtr2.pyvideotrans.com/img/20241128131133-3.webp)

然后就能在左侧看到新添加的路径了，点击确定关闭，一路确定下去关闭所有打开的对话框即可。

![image.png](https://pvtr2.pyvideotrans.com/img/20241128131133-4.webp)




![03.gif](https://pvtr2.pyvideotrans.com/img/20241128131133-5.webp)


验证是否安装成功

随便打开一个cmd窗口，输入 ffmpeg回车，如果显示如下，说明安装正确，如果提示“ffmpeg不是可用的命令或...”之类，说明你配置环境变量时出错了，请重新配置


![image.png](https://pvtr2.pyvideotrans.com/img/20241128131139-6.webp)



## Mac系统安装ffmpeg

1. 打开一个终端窗口，输入命令 `brew -v`，如果提示命令不存在或未找到等错误，则需要安装 brew

- 安装 brew，继续在终端输入该行命令 

```
/bin/zsh -c "$(curl -fsSL https://gitee.com/cunkai/HomebrewCN/raw/master/Homebrew.sh)"
``` 

- 确认安装完成，等待执行完毕，再重新执行 `brew -v`，如果显示版本号，说明brew安装成功，可以继续安装 ffmpeg 了




2. 继续在终端中执行命令 `brew install ffmpeg`,等待执行完毕后，再输入命令 `ffmpeg`,如果输出了大串版本信息，说明已成功安装 ffmpeg