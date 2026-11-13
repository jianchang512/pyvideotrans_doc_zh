---
title: IMS Toucan TTS
date: 2024-01-22 14:33:00
description: IMS Toucan TTS自称支持超过7000种语言配音
---
**IMS Toucan TTS**项目，自称支持超过7000种语言配音，拉下来试了试，确实可以，不过效果吗马马虎虎，算不上优秀，要求不高的话可以使用。

该项目没有类似edge-tts的几种固定音色可选，而是每种语言固定一种音色，可通过`prosody_creativity/duration_scaling_factor/voice_seed/emb1`等几个参数微调随机音色、种子、性别等。

> 项目地址 https://github.com/DigitalPhonetics/IMS-Toucan


## 本地部署方法

> 可直接到项目官网根据说明源码部署 https://github.com/DigitalPhonetics/IMS-Toucan
>
> 顺手打了个Win整合包，不愿折腾的可直接使用这个整合包

到百度网盘下载整合包，解压到某个目录下，例如 `D:/python/IMS-Toucan` 目录下。

> 整合包下载地址 https://pan.baidu.com/s/1om62tz-fmq4o5sijmHmnMQ?pwd=dck6

解压后会发现一个 `espeak-ng-X64.msi` 文件，可安装可不安装，安装后声音效果更好，双击按照默认一路下一步就ok了。


![image.png](https://pvtr2.pyvideotrans.com/img/20241109221134-0.webp)


目录下会看到3个bat文件，双击可执行

![image.png](https://pvtr2.pyvideotrans.com/img/20241109221138-1.webp)


**启动api加简单网页.bat**：

双击将启动一个api接口服务，并打开一个简单网页，可用于对接视频翻译软件的自定义TTS接口，这个api仅支持常用的24种语言


![image.png](https://pvtr2.pyvideotrans.com/img/20241109221139-2.webp)

> 接口地址是 `http://127.0.0.1:5020/api`，可填写在视频翻译软件的自定义TTS接口中


**启动完整网页ui.bat**：

双击启动IMS Toucan官方自带的web界面，支持所有语言的合成与配音。可自行尝试摸索

![image.png](https://pvtr2.pyvideotrans.com/img/20241109221139-3.webp)

> 如果浏览器没有自动打开该页面，当终端显示如下图时，手动复制该地址在浏览器中打开即可
> ![image.png](https://pvtr2.pyvideotrans.com/img/20241109221140-4.webp)


**启动高级QT-ui.bat**：

双击启动自带的软件界面，这个界面未做汉化，感兴趣可研究研究

![image.png](https://pvtr2.pyvideotrans.com/img/20241109221140-5.webp)



## 注意问题

1. 启动时可能终端窗口会出现一堆信息，如下图，这并非报错，忽略即可

![image.png](https://pvtr2.pyvideotrans.com/img/20241109221141-6.webp)

2. api和完整网页ui界面启动后会自动在浏览器中打开相应页面，高级QT会自动打开软件


3. 有时可能提示一堆错误，其中有`https://docs.microsoft.com` 微软网址，此时请关闭窗口，重新右键以管理员身份运行bat


4. 整合包以自带模型，但启动时有可能会检测是否有模型更新，需要连接 `https://huggingface.co` ，国外无法访问，需自备梯子，当错误中出现 `HTTPSConnect` 字样时，说明你需要挂全局或系统代理了


## 在视频翻译软件中使用

> 首先升级视频翻译软件到最新补丁包，下载地址 https://pyvideotrans.com

启动软件后，点击菜单-TTS设置-自定义TTS接口，将 `http://127.0.0.1:5020/api`填写到 api地址中，角色列表中可随意填写字母，比如 `a,b,c`等


![image.png](https://pvtr2.pyvideotrans.com/img/20241109221141-7.webp)


![image.png](https://pvtr2.pyvideotrans.com/img/20241109221143-8.webp)

测试无问题后，就可使用了

![image.png](https://pvtr2.pyvideotrans.com/img/20241109221143-9.webp)