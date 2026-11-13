---
title: 腾讯翻译API
date: 2024-01-22 14:33:00
description: 如何申请腾讯翻译API
---
## 腾讯翻译API

**1. 申请免费api**
 
打开腾讯机器翻译控制台，https://console.cloud.tencent.com/tmt 同样如果没登录会转到登录界面，登录后再重新打开该页面，打开后同意弹出的协议，就可以免费用了，每月500万字符免费额度，是百度的100倍。

**2. 创建 appid和密钥**

第一步完成后，打开这个地址 https://console.cloud.tencent.com/cam/capi 

![](https://pvtr2.pyvideotrans.com/images/71604a9d1bfa3da886af6427b1ceb047.jpg)

点击继续使用


![](https://pvtr2.pyvideotrans.com/images/d9be0014cb2e19cb67210d70d53dc198.jpg)

然后在这个页面，点击“新建密钥”，会自动创建一对id和密钥


![](https://pvtr2.pyvideotrans.com/images/0c027366c22216cbabf407f44757c49f.jpg)

复制 SecretId 和 SecretKey

分别填写到 设置菜单-腾讯翻译设置中

![](https://pvtr2.pyvideotrans.com/images/991d61ac554558300460fd1e56978a68.jpg)


## 注意事项：

大多 AI 翻译渠道可能都会限制每分钟请求数量，如果使用中报错提示超过请求频率，可通过软件`菜单--工具/高级设置--高级设置/set.ini--翻译后暂停时间`来设置一个秒数，比如30，即每次翻译后等待30s再进行下一次翻译，避免超过限制频率报错。

![image.png](https://pvtr2.pyvideotrans.com/images/fanyidjs.webp)