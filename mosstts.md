---
title: MossTTS接入方法
date: 2024-01-22 14:33:00
description: MossTTS接入方法
---



从 pyVideoTrans v3.99-0421 版本起，已支持使用 MOSS-TTS-Nano-100M 进行配音


> 支持的语言 中文、英文、德语、西班牙语、法语、日语、意大利语、匈牙利语、韩语、俄语、波斯语、阿拉伯语、波兰语、葡萄牙语、捷克语、丹麦语、瑞典语、希腊语、土耳其语


## 使用源码部署 MossTTS

1. 点击去 [MOSS-TTS-Nano-100M 官方代码仓库](https://github.com/OpenMOSS/MOSS-TTS-Nano/blob/main/README_zh.md) 按照说明部署后，然后执行 `python app.py`  启动API
2. 打开 `pyVideoTrans`软件，到`菜单--TTS设置--MossTTS-API URL` 填写接口地址，默认 `http://127.0.0.1:18083`,然后在下方角色列表中填写需要使用的参考音频及其对应文本

> 参考音频是指你希望用来进行克隆音频的wav文件，最佳时长在3-10秒，发音清晰
>
> 例如已有音频`nverguo.wav`，音频内是纯净的女儿国王说话声，将它放在`pyVideoTrans`软件下的`f5-tts`内，然后在设置界面角色文本框内填写该音频对应的文本内容
>
> `nverguo.wav#这里填写说话的文字内容`

3. 点击测试，若提示OK，则保存，去使用即可

