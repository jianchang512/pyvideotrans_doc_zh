---
title: 使用字节火山字幕生成
date: 2024-01-22 14:33:00
description: 使用字节火山字幕生成
---

# 本文讲述如何使用语音识别渠道中的`字节火山字幕生成`


![](https://pvtr2.pyvideotrans.com/1761549735548_image.png)


> 请注意，这里说的是`字节火山字幕生成`渠道，和`字节语音识别大模型极速版`不是一回事。
>
> 另外字节火山中有一大堆名称类似的各种语音识别服务，必须使用指定的这个`音视频生成`才可以。对应的字节文档图  
> ![](https://pvtr2.pyvideotrans.com/1761551219585_image.png)
>


## 首先登陆注册火山引擎

登陆地址  [https://console.volcengine.com/auth/login](https://console.volcengine.com/auth/login)，火山后台有些凌乱，登陆后请点击直达该地址   https://console.volcengine.com/speech/app 去创建应用

若无账号，当然需要先注册了，还需要实名认证哦

## 创建一个应用

上步登陆并实名认证后，打开该地址 https://console.volcengine.com/speech/app  创建应用，请再次确认左上角是使用的`旧版`，新版你可能不太容易找到在哪里创建应用，一不小心可能就去创建`智能体应用`了，那个自然无法在本软件中使用。


![](https://pvtr2.pyvideotrans.com/1761549270733_image.png)


https://console.volcengine.com/speech/service/9

请再次确认左上角是**旧版**，左侧打开的菜单项是`API服务中心--音视频字幕--音视频字幕生成`，选择的产品若不对，肯定无法正常使用。



点击 "创建应用"，名字填写英文，描述随意，重要的是下方的一堆复选框，拉到底部，选中**音视频字幕生成**，这是必须的，其他均可以不选。

![](https://pvtr2.pyvideotrans.com/1761549380146_image.png)


点击确定，继续下一步“获取 APP ID 和 Access Token”


## 获取 Access Token / 开通正式版

创建应用后，去应用服务开通的地方复制 Access Token，按下图所示进入，点击左侧 **API服务中心--音视频字幕--音视频字幕生成**  或 直接打开 

https://console.volcengine.com/speech/service/9

你将能看到已创建的所有应用，选择你要使用的那个，默认试用版，有20个小时的免费时长。

从上方应用名称里选择你要使用的的应用，拉到页面底部找到“**服务接口认证信息**”处，复制 **APP ID** 和 **Access Token**, 代码中将用到这2个信息。


![](https://pvtr2.pyvideotrans.com/1761549485007_image.png)



## 在 pyVideoTrans 软件中使用

![](https://pvtr2.pyvideotrans.com/1761549587099_image.png)

> 特别注意，`字节火山字幕生成`和`字节语音识别大模型极速版`是2个不同东西，需要分别单独设置

1. 打开 pyVideoTrans 视频翻译配音软件，找到`菜单--语音识别设置-字节火山字幕生成`
2. 将APP ID 填入，将 Access Token填入
3. 保存，到主界面中选择 “字节火山字幕生成” 就可以了
![](https://pvtr2.pyvideotrans.com/1743256301624_image.png)

