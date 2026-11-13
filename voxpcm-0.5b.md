---
title: VoxCPM-0.5B 音色克隆一键整合包
date: 2025-09-18 14:33:00
description: VoxCPM-0.5B  很小但很棒的音色克隆一键整合包
---

# VoxCPM-2.0 支持30多种语言

自 v3.98-0408 版本起，支持 VoxCPM-2.0,在 `菜单--TTS设置-F5-TTS--voxcpm`中选择`v2`版本

> VoxCPM2 是一个文本到语音的模型——20 亿个参数 ， 30 种语言 ， 48kHz 音频输出
>
> **支持30多种语言**
> 阿拉伯语、缅甸语、中文、丹麦语、荷兰语、英语、芬兰语、法语、德语、希腊语、希伯来语、印地语、印尼语、意大利语、日语、高棉语、韩语、老挝语、马来语、挪威语、波兰语、葡萄牙语、俄语、西班牙语、斯瓦希里语、瑞典语、他加禄语、泰语、土耳其语、越南语
> 中文: 四川话, 粤语, 吴语, 东北话, 河南话, 陕西话, 山东话, 天津话, 闽南话
>
> **开源且可商用** — 采用 Apache 2.0 许可证，可免费用于商业用途



### Win整合包下载

> 百度网盘下载地址: https://pan.baidu.com/s/1k18dHSSN_imfEeY85XGakw?pwd=1234
>
> huggingface.co 下载: https://huggingface.co/mortimerme/repocollect/resolve/main/VoxCPM2.0--0411--win.7z?download=true

- 解压后双击`start.bat`，第一次将在线下载模型，从 https://modelscope.cn  和 https://hf-mirror.com 下载

- 完毕后将启动服务，启动成功会显示 http://127.0.0.1:8808 ，将该地址填写到 `菜单--TTS设置-F5-TTS--voxcpm url`中


### 源码部署

见官方仓库 https://github.com/OpenBMB/VoxCPM



----

----


# VoxCPM-0.5B  很小但很棒的音色克隆一键整合包

> VoxCPM：无需标记器的 TTS，用于上下文感知语音生成和逼真的语音克隆


**[下载地址：https://pan.baidu.com/s/1CvM_3E5YqE5s8zTHHvjSSw?pwd=hj7b](https://pan.baidu.com/s/1CvM_3E5YqE5s8zTHHvjSSw?pwd=hj7b)**

### 使用方法

1. 下载解压
2. 双击`双击启动.bat`，第一次启动将从 modelscope.cn 下载 SenseVoiceSmall 模型，该模型用于将参考音频转录为对应文本。

![](https://pvtr2.pyvideotrans.com/1758294089647_image.png)

3. 启动成功后会自动在浏览器中打开操作界面，如果未打开，请手动在浏览器中访问 `http://127.0.0.1:7860`

*启动中界面*
![启动中](https://pvtr2.pyvideotrans.com/1758290937609_0.png)


*如果最终窗口底部显示如下图，说明成功.*

![](https://pvtr2.pyvideotrans.com/1758290991123_0.5.png)



如果最终出现`Error:` 如下图字样，则失败，请关闭窗口重新打开
![](https://pvtr2.pyvideotrans.com/1757555246399_3.png)




4. 成功后，将自动在浏览器中打开地址`http://127.0.0.1:7860`

![](https://pvtr2.pyvideotrans.com/1758291073000_1.png)


5. 上传3-10s的参考音频用于克隆它的音色，上传后会自动识别生成对应的文本内容，也可以手动修改，然后填写要合成语音的文字。



### 注意：
1. 整合包已含模型，但可能仍会检测模型更新，如果使用时出现网络连接失败，报错有类似`HTTPConnection`字符串，并且你不会科学上网，可右键编辑`双击启动.bat`，将`rem set HF_ENDPOINT=https://hf-mirror.com` 这行前的`rem`删掉，然后保存，重新双击启动该文件。
![](https://pvtr2.pyvideotrans.com/1758291637214_image.png)


2. 如果你会科学上网并知道你所用工具的代理端口，可不必进行上一步操作，而是`rem set https_proxy=http://127.0.0.1:10808` 将改行前的`rem`删掉，并将`10808`端口改为你的代理端口，保存，重新启动，将能确保连接更加稳定，不易出现连接错误。


![](https://pvtr2.pyvideotrans.com/1758296405115_image.png)


