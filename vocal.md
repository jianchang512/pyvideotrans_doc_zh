---
title: 推荐2个用于人声背景音分离的工具
date: 2024-01-22 14:33:00
description: 在音频转文字任务中，背景噪声或伴奏也会对识别效果产生影响，要获得更精确的效果也需要提前去除音频中的背景伴奏
---
在音频转文字任务中，背景噪声或伴奏也会对识别效果产生影响，要获得更精确的效果也需要提前去除音频中的背景伴奏。


## 推荐2个用于人声背景音分离的工具

**一是 vocal-separate:**  基于[spleeter](https://github.com/deezer/spleeter) 实现的本地离线人声背景音分离工具，windows下有预打包版，解压双击可用，Mac/Linux下需源码部署。中文界面，使用非常简单，支持直接处理视频，速度较快。

![](https://pvtr2.pyvideotrans.com/images/7dbe59f0976c2c96efc51fc9c1202144.jpg)

**二是Ultimate Vocal Remover:** 这是uvr5的桌面GUI版，Windows下需要安装到C盘下，否则容易出问题，英文界面，选项较多，操作相对复杂，但功能也更强，效果更好。

![](https://pvtr2.pyvideotrans.com/images/3090034c947a03939dd807185f782805.jpg)


----

## vocal-separate 安装和使用

**1.** Windows上首先去这里下载预打包版，其他系统拉取源码部署。
https://github.com/jianchang512/vocal-separate/releases


![](https://pvtr2.pyvideotrans.com/images/c32105bc781b180320c12b4e24bfca9a.jpg)

**2.** 下载后解压，双击 `start.exe` ，等待自动打开浏览器页面，如果出现下图类似报错，无需担心，这只是提醒无法GPU加速，不影响使用

![](https://pvtr2.pyvideotrans.com/images/f3b037495db564c37abce5ecbbd404c9.jpg)

启动成功后会打开如下浏览器页面

![](https://pvtr2.pyvideotrans.com/images/b74a0af2982c41c06e28c68ccb8e821e.jpg)

**3.** 如上图所示，拖拽或点击上传想分离出单独人声的音频或视频，视频在上传后会自动转为音频然后再处理。

从模型中选择“2stems”，将把上传的文件分离为人声和其他声音2个文件。

当然也可以选择 4stems 和 5stems 模型，它们除了分离出人声外，还会将其他声音细分为“鼓声”“贝斯声”等文件，一般情况下只使用 2stems 即可。


![](https://pvtr2.pyvideotrans.com/images/23ca264486a0f640d2d4699023d5bb86.jpg)

可在网页中试听分离结果，点击下载或者直接去显示的分离结果目录下找到分离文件，人声文件名称为 **vocals.wav**，其他声音文件名为 **accompaniment.wav**

![](https://pvtr2.pyvideotrans.com/images/9066c1ccb8e2514176b66648d01a384a.jpg)

就这么简单。


----

## Ultimate Vocal Remover 安装和使用

**1.** 首先去这里 https://github.com/Anjok07/ultimatevocalremovergui/releases/tag/v5.6  下载 

![](https://pvtr2.pyvideotrans.com/images/d968599e97eb361cfa1df05d260265f4.jpg)

windows版也可点此链接直接下载，下载后双击该exe文件，一路next即完成安装 
https://github.com/Anjok07/ultimatevocalremovergui/releases/download/v5.6/UVR_v5.6.0_setup.exe

**2.** 安装完成后，双击桌面图标启动。

![](https://pvtr2.pyvideotrans.com/images/9e92da7e0a2ace8bd7d74046f08fbf04.jpg)



**3.** 如下图所示，选择要处理的音频文件，并设置输出结果目录，选择要处理的模型，比特率等各种选项，除了“Select Input”和“Select Output” 其他都是非必选，保持默认即可。

![](https://pvtr2.pyvideotrans.com/images/b43315437f0999d4e4e569d2b920ba0c.jpg)


“**Select Input**”：点即它选择要处理的音频文件，

"**Select Output**"：点击它选择处理后的文件保存到哪里。

“**CHOOSE PROCESS MEHTODS**”：选择处理方法，默认 MDX-Net，这个效果应该是最好的，保持默认即可。

![](https://pvtr2.pyvideotrans.com/images/38b10765eb05b11a8446365889e991d0.jpg)

“**CHOOSE MDX-NET MODEL**”： 上面方法所对应要使用的模型，如果不是“MDX-Net”方法，需要额外下载模型。

![](https://pvtr2.pyvideotrans.com/images/3ca4859617b27486045defe9eac4e278.jpg)


![](https://pvtr2.pyvideotrans.com/images/3de31d131127b242b73abf4345970b2b.jpg)

“**Start Processing**”: 选择完毕后的启动执行按钮，点击它开始执行分离操作，等待提示完成。


![](https://pvtr2.pyvideotrans.com/images/015e3df71efcc252e4ee1a4b4b2f8f35.jpg)