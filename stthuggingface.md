---
title: 从huggingface添加新模型
date: 2024-01-22 14:33:00
description: 从 0.0.94 版本开始，允许添加 huggingface.co 上兼容 faster-whisper/ctranslate2 的模型，比如专用于某个语言的模型，以弥补通用模型的不足。
---
## 从huggingface添加新模型

> 本页文档适用于 stt 语音识别转文字项目  [https://github.com/jianchang512/stt](https://github.com/jianchang512/stt)


从 0.0.94 版本开始，允许添加 huggingface.co 上兼容 faster-whisper/ctranslate2 的模型，比如专用于某个语言的模型，以弥补通用模型的不足。


## 添加方法


0. 升级到0.0.94

1. 确保会科学上网，知道什么是代理、代理端口，如果此条不满足，就不要添加了，因为无论是打开 huggingface.co 网站还是下载模型，都要求科学上网

2. 从 https://huggingface.co/models 搜索想要使用的模型，注意必须是兼容 faster-whisper/ctranslate2 的模型，否则不可用。

	比如我找到了这个模型  https://huggingface.co/zh-plus/faster-whisper-large-v2-japanese-5k-steps
	
	> 
	> Converted from clu-ling/whisper-large-v2-japanese-5k-steps using CTranslate2.
	> 
	> 已声明是使用 ctranslate2 转换，那么就可以使用
	>
	
	![](https://pvtr2.pyvideotrans.com/images/ec803e49f7e09f5e87531e1a57311d4d.jpg)


3. 如上图，点击复制 ID， 然后打开软件目录下 `set.ini`  , 找到   `model_list=`  行 ，在末尾添加英文逗号, 然后粘贴你复制的ID , 保存修改 。 


	![](https://pvtr2.pyvideotrans.com/images/db541d2fd82ad9f699c147118ebf2989.jpg)



4. 打开软件，填写网络代理地址，从模型中选择刚成你粘贴的名称，点击开始就可以了。
	
	如果你使用的是v2ray类软件，则默认代理地址是`http://127.0.0.1:10809` ,如果是clash类软件，默认代理地址是`http://127.0.0.1:7890`
	

	注意: 选择的视频语言必须和你添加的模型所支持语言一致，如果你选择了 日语模型但选择中文视频，那将无法得到预想结果
	
5. 开始执行后，在字幕识别阶段，检测到该模型在本地不存在，将会自动连接 huggingface.co 进行下载，根据你的代理情况，可能耗时几分钟到几十分钟，请耐心等待。

  只要没出现红色报错，就是正在下载。如果出现红色报错，基本都是代理问题，比如代理速度太慢、代理不稳定等。错误代码中一般包含 `Connection to huggingface.co timed out` 或 `46573454354`一串数字提示数据不完整。
  
  **注意如果源码部署，即便是代理网络错误，也只会报 `No such file xxxx` 类错误**