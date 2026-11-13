---
title: 语音识别模型分类与说明
date: 2024-01-22 14:33:00
description: 语音识别模型共14个，可分为3类，都是用于将视频中的人类说话声识别为字幕文字
---

语音识别模型共14个，可分为3类，都是用于将视频中的人类说话声识别为字幕文字。
  
为减小下载体积，软件默认只内置最小尺寸的tiny模型，这个模型识别精度最低，如需更好效果，请下载其他更大的模型。

### openai 和 faster 模式均可使用的模型

- **tiny,tiny.en**：最小模型，速度最快消耗资源最少，精确度也最低
- **base,base.en**：比tiny略大
- **small,small.en**：比base略大
- **medium,medium.en**： 中等模型，用于中文识别，模型至少要选择medium或更大
- **large-v1,large-v2,large-v3**： 最大模型，精度最高，需要8G或12G以上可用显存

> **.en** 结尾的模型，只可用于英文发音的音视频

### 仅限 faster 模式下使用的模型

- **distil-whisper-small.en**：仅限用于英文视频
- **distil-whisper-medium.en**：仅限用于英文视频
- **distil-whisper-large-v2**: 需要8G以上显存，目前用于英文视频效果较好，其他语言很差

 
### 第一类是带后缀 .en 的模型

例如 `tiny.en` 、  `base.en` 、 `medium.en`等，顾名思义，这类模型只用于原始语言是英语的视频处理，也就是说如果你待处理的视频中说话语言是英语，那么选择后缀为 .en 的模型，效果将比不带 .en 的同等模型更好。

   
### 第二类是不带 .en的模型

可用于所有支持的语言，比如  `tiny`  `large-v1` 等

   
### 第三类是 distil 开头的模型

这类模型目前只有三个，并且都只能处理原始语言是英语的视频，即便不带.en后缀，也建议只用于处理英语发音的视频，处理其他语言的视频效果会非常差。

这类的模型特点是速度更快。注意distil模型只能在faster模式下使用，不可在openai模式下使用。

- distil-whisper-small.en  
- distil-whisper-medium.en
- distil-whisper-large-v2

   
### faster 模型下载

所有模型都从 `https://github.com/jianchang512/stt/releases/tag/0.0`  这个地址下载

打开后，根据想使用的模式选择，建议选择 faster 模型，速度更快。  
  
faster模型下载后，压缩包里是文件夹，将里面的文件夹复制到软件目录下 models 文件夹中。  

例如 medium 模型下载后，打开压缩包会看到文件夹,将这个文件夹复制到 models 目录下


  
### openai模型下载

同样是这个地址  `https://github.com/jianchang512/stt/releases/tag/0.0`

向下拉，下载后得到的是一个 .pt 后缀的文件，将该文件直接复制到 models 目录下即可