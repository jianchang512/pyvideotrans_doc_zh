---
title: 报错显示 APIError_11 is not defined,GPT-SoVITS 的 api_v2 接口时，总是提示 400 Client error 
date: 2025-08-09 01:33:00
description: 报错显示`APIError_11 is not defined`是什么原因？使用 GPT-SoVITS 的 api_v2 接口时，总是提示 400 client error 错误？
---


# 报错显示`APIError_11 is not defined`是什么原因？


![](https://pvtr2.pyvideotrans.com/1754671103614_image.png)


这是一个笔误，请重新下载 3.77-0809 补丁包覆盖，即使已经是3.77了，也已经覆盖了，在看到该处时，请重新下载，再覆盖一遍，即可解决。

下载更新地址： https://pyvideotrans.com/downpackage



# 使用 GPT-SoVITS 的 api_v2 接口时，总是提示 400 错误？

![](https://pvtr2.pyvideotrans.com/1754671380575_image.png)

1. 首先确保软件版本是 v3.77，如果不是，先去升级，如果已是，请下载 3.77-0809 补丁包覆盖
2. 检查你在菜单--TTS设置-GPT-SoVITS中填写的参考音频是否正确
音频必须是wav格式，时长必须在3-10秒之内，否则会报400错误。
音频放在GPT-SoVITS项目根目录下，此填写带后缀wav名称，填写示例格式如下
**123.wav#你好啊我的朋友#zh**


![](https://pvtr2.pyvideotrans.com/1754671417989_image.png)

**示例解释:**
123.wav 是wav格式的音频文件，放在GPT-SoVITS根下，时长在3-10秒内，中间文字是该音频对应文本，zh代表该文本语言代码

![](https://pvtr2.pyvideotrans.com/1754671350337_image.png)

