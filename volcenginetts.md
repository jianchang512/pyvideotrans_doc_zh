---
title: 字节语音合成
date: 2024-01-22 14:33:00
description: 字节火山引擎的语音合成服务，支持 中、英、日、葡萄牙、西班牙、泰国语、越南语、印尼语等8种语言的配音，中文下还支持东北话、四川话等多种方言，有20000次免费请求，大约能合成10小时语音。
---

## 字节语音合成 渠道使用方法

> 请注意，字节有非常多的语音合成产品，名称都类似，本渠道对应的是字节中`音视频生成-->语音合成-->在线语音合成API`，请务必准确，否则不可用
> 
![](https://pvtr2.pyvideotrans.com/1761747790842_image.png)





## 支持的中文音色

> 仅展示部分中文音色，其他7种语言音色 在此查看 https://www.volcengine.com/docs/6561/97465

支持的中文音色很多，包括各种方言以及抖音中流行的小帅小美电影解说音。

|音色名称   | voice_type   | 
| ----------- | ------------------ | 
| 灿灿 2.0             | BV700_V2_streaming |
| 炀炀          | BV705_streaming    | 
| 阳光青年        | BV123_streaming    |  
| 反卷青年        | BV120_streaming    |    
| 通用赘婿        | BV119_streaming    |   
| 古风少御        | BV115_streaming    |  
| 霸气青叔        | BV107_streaming    | 
| 质朴青年        | BV100_streaming    | 
| 温柔淑女        | BV104_streaming    |   
| 开朗青年        | BV004_streaming    |   
| 甜宠少御        | BV113_streaming    |  
| 儒雅青年        | BV102_streaming    | 
| 甜美小源        | BV405_streaming    |
| 亲切女声        | BV007_streaming    |   
| 知性女声        | BV009_streaming    |      
| 诚诚          | BV419_streaming    |  
| 童童          | BV415_streaming    |    
| 亲切男声        | BV008_streaming    |   
| 译制片男声              | BV408_streaming    |  
| 懒小羊         | BV426_streaming    |   
| 清新文艺女声      | BV428_streaming    |  
| 鸡汤女声        | BV403_streaming    | 
| 智慧老者        | BV158_streaming    |  
| 慈爱姥姥        | BV157_streaming    | 
| 说唱小哥        | BR001_streaming    | 
| 活力解说男       | BV410_streaming    |   
| 影视解说小帅      | BV411_streaming    |  
| 解说小帅-多情感    | BV437_streaming    | 
| 影视解说小美      | BV412_streaming    | 
| 纨绔青年        | BV159_streaming    |  
| 直播一姐        | BV418_streaming    | 
| 反卷青年        | BV120_streaming    | 
| 沉稳解说男       | BV142_streaming    |
| 潇洒青年        | BV143_streaming    | 


## 如何开通

1. 当然要先注册登录并通过实名认证

https://console.volcengine.com/

打开该地址注册登录，完成实名

2. **进入后台创建应用：** 字节后台凌乱，类似名称的菜单项很多，请注意一定要进入--音视频生成下的`语音合成`，请按照下图进入

![](https://pvtr2.pyvideotrans.com/1761747934841_image.png)

或直接点此连接进入 https://console.volcengine.com/speech/app

**注意左上角请切换`旧版`**,新版很多东西太乱，难以找到

照下图所示--旧版--应用中心--应用管理--创建应用


![](https://pvtr2.pyvideotrans.com/1761748031818_image.png)

名称和简介随便填写，但注意一定要选中**语音合成---语音合成**这个复选框，这里有一大堆名称相似的 `语音合成`，一定要选中仅仅由4个字`语音合成`的那个。




3. **开通试用或正式开通** 接下来进入语音合成页面开通免费试用

直到地址  https://console.volcengine.com/speech/service/8

顶部选择你刚才创建的应用，点击“试用”开通

![image.png](https://pvtr2.pyvideotrans.com/img/volc3.webp)

4. **复制信息去使用** 复制3个参数，就可填写到视频翻译软件中使用了

第一个是 `cluster id`，如图复制cluster id 下的名称

![image.png](https://pvtr2.pyvideotrans.com/img/volc4.webp)

第二个是 `App id`，还在该页面下拉，就能看到

![image.png](https://pvtr2.pyvideotrans.com/img/volc5.webp)

第三个是 `Access Token` 在 `App id` 右侧 ，复制它。

![image.png](https://pvtr2.pyvideotrans.com/img/volc6.webp)

5. 填写到视频翻译软件中，打开 **菜单-TTS设置--字节语音合成** 窗口填写，测试无问题后保存。

![image.png](https://pvtr2.pyvideotrans.com/img/volc7.webp)


## 在视频翻译软件中使用

填写测试无问题后，软件中先选择目标语言，再到配音渠道中选择 **字节火山语音合成**，可点击试听每个音色

![image.png](https://pvtr2.pyvideotrans.com/img/volc8.webp)

选择满意的音色即可开始配音操作了。


## 特别注意

如果你开通了正式版，默认只有 通用男生 和 通用女生 2个角色可用，其他角色都需要在字节火山后台单独购买开通。