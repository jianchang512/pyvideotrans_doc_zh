---
title: 下载Youtube视频
date: 2024-01-22 14:33:00
description: 实际下载是分别下载视频画面无声文件和音频文件，下载完毕后再自动合并。
---
## 下载Youtube视频

该模式用于从Youtube下载视频

![image-20240808010810495](https://pvtr2.pyvideotrans.com/images/image-20240808010810495.png)




**网络代理地址**：众所周知Youtube国内无法访问，因此你需要填写网络代理地址



**视频播放页url**：需要下载那个视频，就从youtube网页打开该视频播放，复制播放地址到此



**选择保存目录**：下载后要保存到哪里



**使用VID作为视频名称**：默认视频名称是视频标题名，非常长而且有乱七八糟的符号，
在windows上处理时可能出错，因此可选中该项，将名称变的短小，防止出错




**注意**：

1. 实际下载是分别下载视频画面无声文件和音频文件，下载完毕后再自动合并。请等待合并后或已提示
下载成功再打开视频文件，否则可能导致合并失败。
2. 如果你是源码安装，可能会提示失败，因为缺少一个exe文件，可根据操作系统下载该文件后复制到本软件的
ffmpeg文件夹下，地址：https://github.com/jianchang512/pyvideotrans/releases/v2.19/

win下载 `ytwin32.exe`

mac下载 `ytdarwin`

linux下载 `ytlinux`




从Youtube(油管)下载视频有很多办法，不论是命令行形式还是网页UI，在视频翻译软件中也内置了简单的下载功能，打开**菜单--工具/选项--下载油管视频**，即可方便的下载。

![image.png](https://pvtr2.pyvideotrans.com/img/20241109002201-0.webp)

下载界面如下图所示

![image.png](https://pvtr2.pyvideotrans.com/img/20241109002201-1.webp)

填写网络代理、视频播放页地址就可点击下载了。



## 经常遇到需要登录验证的错误

![image.png](https://pvtr2.pyvideotrans.com/img/20241109002201-2.webp)


![image.png](https://pvtr2.pyvideotrans.com/img/20241109002202-3.webp)

如图，这类报错 **一是**可能下载过于频繁被风控，**二是**可能是你使用的机场IP被污染，已在Youtube黑名单。

## 解决办法：

**一：** 切换vpn节点，可能需要切换多个节点， 才能遇到可用的ip

**二：** 使用chrome浏览器先正常登录 Youtube，然后复制cookie信息到 `www.youtube.com_cookies.txt` 文件中，将该文件放到视频翻译软件`sp.exe`所在目录下。


> 当然这个方法不一定百分百下载成功，但能显著提高下载成功率，减少错误发生

## 如何获取 cookies.txt

1. 首先需要安装 Chrome浏览器，如果没有安装，可到这个地址下载  https://www.google.cn/chrome  
2. 安装浏览器扩展`# Get cookies.txt LOCALLY`,安装地址  `https://chromewebstore.google.com/detail/get-cookiestxt-locally/cclelndahbckbenkjhflpdbgdldlbecc` 
 
![image.png](https://pvtr2.pyvideotrans.com/img/20241109002202-5.webp)

3. 打开 youtube.com 网站并登录


4. 在当前页面处于 youtube.com 网站中时，点击刚才安装的浏览器扩展图标

![image.png](https://pvtr2.pyvideotrans.com/img/20241109002203-6.webp)

在弹出的小窗口中再点击  `Export`，就会自动下载cookies.txt文件。

![image.png](https://pvtr2.pyvideotrans.com/img/20241109002203-7.webp)

下载后的名称是 `www.youtube.com_cookies.txt`，复制到 sp.exe 所在目录下即可。

5. 再去重新下载试试 

## 如果还是失败怎么办

当成功下载几个视频后，可能又会出现下载失败问题，此时刷新youtube页面，重新下载cookies.txt去覆盖

当然由于youtube风控缘故，成功率想彻底提高，还是要选些干净的vpn节点