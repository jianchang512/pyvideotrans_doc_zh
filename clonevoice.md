---
title: 如何使用原视频中音色配音
date: 2024-01-22 14:33:00
description: 如何使用原视频中音色配音
---
## 如何使用原视频中音色配音


在配音操作中，我们通常选择一个固定的音色，如“yunxi”、“xiaoyi”或“解说小帅”，并在整段配音中只使用该音色。然而，对于多说话人的场景，单一音色的使用可能不够理想。更好的效果是每个说话人对应一个特定音色，最好是与原视频中说话人的音色一致。例如，如果原视频中的八戒在说话，翻译成英语后依然保持八戒的音色，那么就需要用到原音色克隆功能。

目前，该软件支持3个配音渠道来实现原音色克隆，分别是 **clone-voice**、**CosyVoice** 和 **F5-TTS**。



> 原理：对某个片段配音时（例如 00:00:03 --> 00:00:08），会先剪切出该片段的原音频，获取音频对应的原始文字内容和翻译后的目标文字。然后将这些数据传送至配音渠道，该渠道参考原音频的音色生成目标文字的配音。



## 使用 clone-voice 配音渠道

需要安装 https://github.com/jianchang512/clone-voice 项目，打开该项目主页后，仔细阅读说明，可使用源码部署该 clone-voice 项目，如果是 Windows系统，也可直接右侧中部找到 **Releases** (https://github.com/jianchang512/clone-voice/releases) ，直接下载整合包，下载解压后双击 `app.exe` 即可启动。

当显示启动成功后，将默认api地址 `http://127.0.0.1:9988` 填写到视频翻译软件 **菜单--TTS设置--原音色克隆 clone-voice** 的 http地址内，测试无问题后就可开始使用了

![image.png](https://pvtr2.pyvideotrans.com/img/clone0.webp)


## 使用 CosyVoice 配音渠道

同样需要安装 CosyVoice 项目，安装教程详见 https://pyvideotrans.com/cosyvoice.html

> 当然也可以使用第三方整合包，但第三方整合包不支持克隆音色，只可指定固定音频。

按教程安装后，到这个地址 https://github.com/jianchang512/cosyvoice-api/blob/main/api.py  下载 `api.py`  文件，放到 CosyVoice 项目下，和 webui.py 文件在同一目录下。

![image.png](https://pvtr2.pyvideotrans.com/img/clone6.jpg)

![image.png](https://pvtr2.pyvideotrans.com/img/clone1.webp)

然后启动 api.py，并将api地址填写到视频翻译软件 **菜单--TTS设置-CosyVoice** 的api地址中，默认地址 `http://127.0.0.1:9233`

![image.png](https://pvtr2.pyvideotrans.com/img/clone2.webp)


## 使用 F5-TTS 配音渠道

需要安装 F5-TTS 项目，详细安装教程见 https://pyvideotrans.com/f5tts.html

可源码安装，Windows下也可使用整合包安装，安装后双击 run-api.bat 启动api服务，然后将默认地址 `http://127.0.0.1:5010`填写到视频翻译软件菜单-TTS设置-F5-TTS api地址中

![image.png](https://pvtr2.pyvideotrans.com/img/clone3.webp)



## 主界面中角色选择 clone，就可以进行克隆音色配音了

注意，除了 clone-voice 支持十多种语言外，F5-TTS、CosyVoice只支持中英语言克隆

![image.png](https://pvtr2.pyvideotrans.com/img/clone4.webp)



----

## 多角色配音

当一次只选择一个视频进行翻译时，在字幕翻译完成后出现暂停按钮时，点击暂停，在右侧字幕区可以单独为每条字幕设置一个配音角色，从而实现多角色配音。

在主界面的配音角色中需要选择一个默认配音角色，如果不单独设置，则统统使用该默认角色


![p1](https://pvtr2.pyvideotrans.com/img/duojuese1.jpg)