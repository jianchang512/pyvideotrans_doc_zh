---
title: LibreTranslate开源本地机器翻译项目
date: 2024-01-22 14:33:00
description: LibreTranslate是开源优秀的本地机器翻译项目，支持众多语言之间的互译，官方提供了各种平台的安装方法，以及docker安装方式，不过并未提供Windows整合包，在win上需要使用docker安装。
---
LibreTranslate是开源优秀的本地机器翻译项目，支持众多语言之间的互译，官方提供了各种平台的安装方法，以及docker安装方式，不过并未提供Windows整合包，在win上需要使用docker安装。

> https://libretranslate.com/
> 
> ![image.png](https://pvtr2.pyvideotrans.com/img/20241104003255-0.webp)
> 
> ![image.png](https://pvtr2.pyvideotrans.com/img/20241104003256-1.webp)

简单搞了个windows整合包，解压双击可用，以方便小白用户使用



## 下载整合包

![image.png](https://pvtr2.pyvideotrans.com/img/20241104003257-2.webp)

> 整合包百度网盘地址: https://pan.baidu.com/s/1UN7WL69DA59iKHHtT6h1GQ?pwd=a5ce
> 整合包更新补丁下载(更改模型地址到整合包目录下而非模型c盘家目录): https://pan.baidu.com/s/1yLWpJM8qXJO8sWVnZ_ew-A?pwd=g59m

在此地址下载整合包，下载后解压到某个目录下，会看到有一个 `启动.bat` 文件，双击即可启动，启动成功后会显示下图

![image.png](https://pvtr2.pyvideotrans.com/img/20241104003257-3.webp)

注意第一次启动时会在线下载翻译模型，共有92个左右的模型，下载时间比较长，请耐心等待。
 
如果下载失败，请提前设置好系统代理，并重新`启动.bat`

整合包下载后的模型存放在用户家目录中，随意打开一个文件夹，删掉地址栏内容，输入命令 `%userprofile%/.local/share/argos-translate/packages` 然后回车，即可看到下载的所有模型

**下载并覆盖补丁包后，模型地址将更改到整合包目录下的models文件夹内，需重新下载模型，或查看补丁包说明.txt复制 .local 文件夹 到models下**

> 需要先有下载，才可打开该目录，否则会提示目录不存在
> ![image.png](https://pvtr2.pyvideotrans.com/img/20241104003257-4.webp)


自带一个web界面，默认地址是 `http://127.0.0.1:5000`，在浏览器中打开该地址即可看到如下界面


![image.png](https://pvtr2.pyvideotrans.com/img/20241104003257-5.webp)


左侧是待翻译的原始文字输入区，右侧是翻译结果区。



## 使用API

在上一步双击`启动.bat`启动成功后，API也就可以使用了，api地址是 `http://127.0.0.1:5000/translate`

在网页中会显示翻译api使用的JavaScript代码示例


![image.png](https://pvtr2.pyvideotrans.com/img/20241104003258-6.webp)


## 在视频翻译软件中使用

打开视频翻译软件，点击菜单--翻译设置--LibreTranslate，在窗口中的API URL 文本框内输入`http://127.0.0.1:5000/translate`, API KEY 保持为空即可


![image.png](https://pvtr2.pyvideotrans.com/img/20241104003258-7.webp)