---
title: 免费免代理本地白嫖 OpenAI 文字配音API服务
date: 2025-03-25 17:40:22
description: 通过逆向 `openai.fm` 实现了本地白嫖，只需要安装并启动该**ttsfm**，填写到视频翻译软件菜单--TTS设置-OpenAI TTS 的地址中，即可使用。
---



大家都知道OpenAI有文字合成配音API服务，当然想使用需要有国外信用卡付费并且还要挂VPN，不太方便。

![](https://pvtr2.pyvideotrans.com/1742917029712_image.png)

GitHub有大神搞了个逆向项目**ttsfm**，通过逆向 `openai.fm` 实现了本地白嫖，只需要安装并启动该**ttsfm**，并将`http://localhost:7000/v1` 填写到视频翻译软件菜单--TTS设置-OpenAI TTS 的地址中，即可使用。

> 未来使用人数太多，OpenAI 扛不住白嫖的时候，肯定会失效，但至少目前还可用，想用的抓紧了。

下面讲下如何在本地安装并启动，你需要保证本地已有 python3.8+ 环境，如果还没有python环境，[请点击查看如何配置](/_posts/pythoninstall)

## 下载项目源码并解压

打开该地址下载zip压缩包： https://github.com/dbccccccc/ttsfm
![](https://pvtr2.pyvideotrans.com/1742917286964_image.png)

下载后解压到某个文件夹内，例如我解压到了`D:/python/openaitts`目录内，解压后如图


![](https://pvtr2.pyvideotrans.com/1742917350099_image.png)


## 安装依赖并启动

1. 在该文件夹地址栏输入`cmd`然后回车，在打开的终端中输入命令`python -m venv venv` 回车，创建虚拟环境，如下图，成功后目录内会新增一个 `venv` 文件夹

![](https://pvtr2.pyvideotrans.com/1742917452590_image.png)

2. 然后继续执行命令` venv\scripts\activate`，执行成功后，cmd终端前会增加代码`(venv)`

![](https://pvtr2.pyvideotrans.com/1742917517216_image.png)

3. 继续执行安装依赖 `pip install -r requirements.txt`

![](https://pvtr2.pyvideotrans.com/1742917560257_image.png)

如果执行成功未出现红色报错，则安装完成，可以启动了

执行  `python  server.py`, 出现如下所示，代表启动成功


![](https://pvtr2.pyvideotrans.com/1742917621063_image.png)


## 在 pyVideoTrans 中填写 api 地址并配音

打开 pyVideoTrans，找到菜单--TTS设置-OpenAI TTS

- API URL中填写 `http://localhost:7000/v1`
- SK 中随意填写不要留空
- 在填写所有模型文本框中，确保填写的是`tts-1,tts-1-hd,gpt-4o-mini-tts`
- 在选择模型中选中`gpt-4o-mini-tts`
- 声音效果提示词可随意填写，例如`用生气的语调`


![](https://pvtr2.pyvideotrans.com/1742917847229_image.png)

填写后测试下，等待片刻，如无意外你会听到音频播放声。

然后呢，就可以去主界面使用了



![](https://pvtr2.pyvideotrans.com/1742917914947_image.png)



> 以OpenAI的尿性，估计这个白嫖方案坚持不久，欲用从速哦