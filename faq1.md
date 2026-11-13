---
title: 错误中含有  ffprobe exect error
date: 2024-01-22 14:33:00
description: 大概率是视频名字太长，或者视频所在路径过深，尤其是从youtube下载的视频，名字一般都几百个文字甚至更长，同时如何视频存放的文件夹层级又很深，那么几乎肯定会遇到windows 上路径长度限制。
---
## 报错，错误中含有 “ffprobe exect error”


![](https://pvtr2.pyvideotrans.com/images/f9842ed0a362453c2d7e9ce39d0a0e07.jpg)

1. 执行中，经常报出含有这类“ffprobe except error”字符的错误，那么大概率是视频名字太长，或者视频所在路径过深，尤其是从youtube下载的视频，名字一般都几百个文字甚至更长，同时如何视频存放的文件夹层级又很深，那么几乎肯定会遇到windows 上路径长度限制。


![](https://pvtr2.pyvideotrans.com/images/04d23e741b37cfaf448df7d0126f7b49.jpg)

像上图这个，文件夹层级深，视频名字长，在调用 `ffprobe` 或 `ffmpeg` 执行命令时，几乎肯定会报错。

解决方法很简单，直接在某个盘下创建一个英文文件夹，然后将视频改个简单名字放进去，比如`D:/myvideos/1.mp4`,再试试，应该就无错了。


2. 非Windows版本查看 ffmpeg 是否安装，如果未安装请安装 ffmpeg。
windows版本查看ffmpeg文件夹内是否有 ffprobe.exe，如果没有，请下载 ffmpeg.exe和ffprobe.exe放在该目录下