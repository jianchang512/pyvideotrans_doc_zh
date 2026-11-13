---
title: 在 Colab 上使用 pyVideoTrans 将音视频转录为字幕
date: 2024-01-22 14:33:00
description: 本文将手把手教你如何在 Colab 上使用 pyVideoTrans 将音视频转录为字幕，即使你没有任何编程经验也没关系，我们将提供一个已经配置好的 Colab 笔记本，你只需要点击几个按钮就能完成。
---
Google Colab 是一个免费的云端编程环境，你可以把它想象成一台放在云端的电脑，可以运行代码、处理数据，甚至进行复杂的 AI 计算，比如把你的音视频文件通过大模型快速准确地转换成字幕。

本文将手把手教你如何在 Colab 上使用 pyVideoTrans 将音视频转录为字幕，即使你没有任何编程经验也没关系，我们将提供一个已经配置好的 Colab 笔记本，你只需要点击几个按钮就能完成。

<video width="100%" controls src="/colab-he.mp4"></video>

## 准备工作：魔法上网和 Google 账号 

在开始之前，你需要两样东西： 

1. **魔法上网：** 由于一些原因，国内无法直接访问 Google 的服务，你需要使用一些特殊方法才能访问 Google 网站。 
2. **Google 账号：** 你需要一个 Google 账号才能使用 Colab，注册是完全免费的。 有了 Google 账号，你才能登录 Colab 并使用它的服务。

> 确认你能打开Google   https://google.com


## 打开 Colab 笔记本 

确保你能访问 Google 网站并登录 Google 账号后，点击以下链接打开我们为你准备好的 Colab 笔记本：

https://colab.research.google.com/drive/1kPTeAMz3LnWRnGmabcz4AWW42hiehmfm?usp=sharing

你会看到类似下图的界面。由于这是共享的笔记本，你需要先复制一份到自己的 Google 云端硬盘才能修改和运行。点击左上角的“复制到云端硬盘”，Colab 会自动为你创建一个副本并自动打开。

![image.png](https://pvtr2.pyvideotrans.com/img/20241201004915-0.webp)

如下图，是创建好的页面

![image.png](https://pvtr2.pyvideotrans.com/img/20241201004917-1.webp)


## 连接到 GPU/TPU 

Colab 默认使用 CPU 运行代码。为了加快转录速度，我们需要使用 GPU 或 TPU。

点击菜单栏中的“代码执行程序” -> “更改运行时类型”，然后在“硬件加速器”下拉菜单中选择“GPU”或“TPU”。 点击“保存”。


![image.png](https://pvtr2.pyvideotrans.com/img/20241201004918-2.webp)



![image.png](https://pvtr2.pyvideotrans.com/img/20241201004918-3.webp)


保存完毕即可，如果弹出对话框，一律选择 允许、同意等。


> 使用很简单，共分为三步


## 1. 拉取源码并安装环境

找到第一个代码块（带有播放按钮的灰色区域），点击播放按钮执行代码。 这段代码会自动下载并安装 pyvideotrans 以及它所需要的其他软件。

等待代码执行完成，你会看到播放按钮变成一个勾号。 过程中可能出现红色错误提示，可以忽略。


![image.png](https://pvtr2.pyvideotrans.com/img/20241201004919-4.webp)


## 2. 检查 GPU/TPU 是否可用

运行第二个代码块，确认 GPU/TPU 是否连接成功。如果输出结果显示支持 CUDA，则表示连接成功。 如果没有连接成功，请返回重新检查是否连接到 GPU/TPU 


![image.png](https://pvtr2.pyvideotrans.com/img/20241201004920-5.webp)


![image.png](https://pvtr2.pyvideotrans.com/img/20241201004920-6.webp)


## 3. 上传音视频并执行转录


* **上传文件：** 点击 Colab 界面左侧的文件图标，打开文件浏览器。
![image.png](https://pvtr2.pyvideotrans.com/img/20241201004921-7.webp)

将你的音视频文件从电脑直接拖拽到文件浏览器空白处即可上传。 

![image.png](https://pvtr2.pyvideotrans.com/img/20241201004921-8.webp)


* **复制文件路径：** 上传完成后，在文件名上右键点击，选择“复制路径”，获取文件的完整路径（例如：`/content/你的文件名.mp4`）。
![image.png](https://pvtr2.pyvideotrans.com/img/20241201004922-9.webp)



* **执行命令**
![image.png](https://pvtr2.pyvideotrans.com/img/20241201004922-10.webp)


以下方命令为例，

`!python3 cli.py --model large-v2 --language zh --file "/content/1.mp4"` 


> `!python3 cli.py ` 这是固定开头命令，包括感叹号不可缺少
>
> `cli.py` 后边可以接控制参数， 例如使用哪个模型、音视频是什么发音语言、使用GPU还是cpu、从哪里找到要转录的音视频文件等。其中只有 `音视频文件地址` 是必须传递的，其他都可以无需传递，使用默认值。

假如你的视频名字为 `1.mp4`,上传后复制路径，在粘贴路径时注意两侧使用英文双引号括起来，以防止名字中有空格导致出错。

`!python3 cli.py --file "在此粘贴复制的路径"` 粘贴替换后为
`!python3 cli.py --file "/content/1.mp4"`



接着点击执行按钮，等待结束就好了，所需模型会自动加载，下载速度很快

![image.png](https://pvtr2.pyvideotrans.com/img/20241201004923-12.webp)


> 默认模型是 `large-v2`, 如果想改为 large-v3模型怎么办呢，执行如下命令
>
>`!python3 cli.py --model large-v3 --file  "粘贴复制的路径" `
>
> 如果还想设置语言为中文呢。
>
> `!python3 cli.py --model large-v3 --language zh  --file  "粘贴复制的路径" `


## 转录结果在哪里找到

开始执行后，你会发现左侧文件夹列表会出现一个 `output` 文件夹，所有转录结果均在此处，以原始音视频名字命名

![image.png](https://pvtr2.pyvideotrans.com/img/20241201004924-13.webp)


在`output`名字上单击，可查看其内的所有文件，在某个文件上右键，点击下载，即可下载到本地电脑

![image.png](https://pvtr2.pyvideotrans.com/img/20241201004924-14.webp)



## 注意事项

1. 魔法上网魔法上网
2. 上传的文件和生成后的srt，只是临时保存在colab里，当连接断开或达到colab免费时限时，文件会自动删除，包括拉取的所有源码、安装的所有依赖都会删除，所以请及时下载生成的结果。
3. 当再次打开colab时，或连接断开再次连接时，需要重新从第一步开始执行。

![image.png](https://pvtr2.pyvideotrans.com/img/20241201004925-15.webp)
4. 关闭了浏览器，下次从哪里再找到。

打开该地址 https://colab.research.google.com/

点击上次使用的名字

![image.png](https://pvtr2.pyvideotrans.com/img/20241201004925-16.webp)

5. 如上图，名字不好记，怎么修改

![image.png](https://pvtr2.pyvideotrans.com/img/20241201004925-17.webp)