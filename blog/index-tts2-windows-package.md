---
title: Index-TTS2 windows 一键整合包，IndexTTS2整合包
date: 2025-09-10 14:33:00
description: 适用于windows10和11的index-tts2一键整合包下载，IndexTTS2整合包
---



# Index-TTS2 Windows 一键整合包下载


## 下载地址

> Windows系统直接下载index-tts2整合包
> 
> [百度网盘下载地址](https://pan.baidu.com/s/1dmLdhJgBC7HlfY-hITMVeg?pwd=1234)
>
> [huggingface.co下载地址](https://huggingface.co/mortimerme/repocollect/resolve/main/indextts2-0529.7z?download=true)
>
> 解压后双击`启动webui.bat`,等待自动下载模型，启动完成。

## 使用方法

1. 下载后先解压
2. 双击解压后的 `启动webui.bat` 文件
3. 第一次启动会自动创建python环境、安装依赖、下载 index-tts2 模型，耗时从几分钟到几十分钟不等，请耐心等待

![](https://pvtr2.pyvideotrans.com/1757555342996_image.png)

---

如果最终窗口底部显示如下图，说明成功.

![](https://pvtr2.pyvideotrans.com/1757555245090_Snipaste_2025-09-10_14-06-22.png)

---

如果最终出现`Error:` 或如下图字样，则失败，请关闭窗口重新打开

![](https://pvtr2.pyvideotrans.com/1757555246399_3.png)


4. 成功后，将自动在浏览器中打开地址`http://127.0.0.1:7860`

![](https://pvtr2.pyvideotrans.com/1757555427297_image.png)


## 修改模型下载源地址

默认从  modelscope.cn 下载 Index-TTS2 模型，如果你希望从 huggingface.co 下载，则打开 `webui.py`文件，找到第 53 行，将紧接着的4行代码前的`#`符号删掉，然后删掉 后续的3行代码，即可。如图

![](https://pvtr2.pyvideotrans.com/1757555601819_image.png)




- [index-tts2 官方仓库](https://github.com/index-tts/index-tts)