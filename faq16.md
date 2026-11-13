---
title: 网络代理是什么
date: 2024-01-22 14:33:00
description: 网络代理是什么
---
如果你不知道代理是什么，也无法访问 Google，那么就不要理会了，记住不要使用 Google、Gemini、OpenAI ChatGPT 就可以了。

**切莫在`网络代理地址` 里胡乱填写或将API地址填写到里面。可以不填，但不要乱填**


![](https://pvtr2.pyvideotrans.com/images/5a2e9339824a94ce812b10b8a1edc0dc.jpg)

如果你知道代理是什么，并且也知道你计算机上正使用着代理工具，也能找到代理端口，那么就将代理地址填写到 网络代理地址 框里即可，一般形式是 `http://127.0.0.1:数字端口号`


如果你使用的是 v2ray 类软件，那么填写 `http://127.0.0.1:10809`

如果你使用的是 cloash 类软件，那么填写 `http://127.0.0.1:7890`


**请切记，** 如果你部署了本地的 DeepLx，那么需要将DeepLx的地址填写到“设置菜单-DeepLX”中，而不是填写到网络代理地址中，然后不断疑惑为什么不能用。

同样，如果你使用了chatGPT的国内中转api，也是要将api地址填写到“设置菜单-OpenAI/ChatGPT”中，而不是网络代理地址中



![](https://pvtr2.pyvideotrans.com/images/7379a81f557e9f09891919e733f40e68.jpg)



## 已设置了系统代理是否还要填写


按住 `Windows键 + R键`，在弹出的运行窗口中输入 `ms-settings:network-proxy`,然后点击确定


![](https://pvtr2.pyvideotrans.com/images/323478f258180a58f6530b701474415b.jpg)

如果弹出的设置面板类似下图，说明已正确设置了系统代理，可以无需在软件中填写“网络代理地址”

![](https://pvtr2.pyvideotrans.com/images/265f18a6f68a76495fabe6db51b5b9d9.jpg)