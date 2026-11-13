---
title: 配音渠道_Spark-TTS/index-TTS/VoxCPM/FireRed3-TTS
date: 2024-01-22 14:33:00
description: 该页面对接 pyVideoTrans 方式只适用于 pyVideoTrans V3.66之后的版本
---

# 配音渠道： Index-TTS / Spark-TTS / VoxCPM / FireRed3-TTS

> v3.68 起，这些 TTS 服务共享同一个设置界面，只需填写对应 TTS 服务启动后的 WebUI 地址（默认通常是 `http://127.0.0.1:7860`），然后在主界面「配音渠道」下拉列表中选择对应服务即可。

本文档涵盖 4 个开源 TTS 服务的部署与对接方法。它们都通过 Gradio WebUI 提供 API，配置方式基本一致。

---

## 一、各渠道简介

| 渠道 | 开发者 | 支持语言 | 默认地址 | 官方项目 |
|------|--------|----------|----------|----------|
| Index-TTS | B站开源 | 中文、英文 | `http://127.0.0.1:7860` | https://github.com/index-tts/index-tts |
| FireRed3-TTS | 小红书 | 24 种语言 | `http://127.0.0.1:7860` | https://github.com/jianchang512/FireRedTTS3  官方修改版，增加webui.py用于对接 |
| VoxCPM-TTS | 面壁智能 | 30+ 种语言 | `http://127.0.0.1:7860` | https://github.com/OpenBMB/VoxCPM |
| Spark-TTS | SparkAudio | 中文、英文 | `http://127.0.0.1:7860` | https://github.com/SparkAudio/Spark-TTS |

> 所有渠道的对接流程相同：启动 WebUI → 在 pyVideoTrans 中填写地址 → 选择渠道 → 配置参考音频 → 使用。

---

## 二、前置条件

在使用这些 TTS 服务之前，请确保满足以下条件：

1. **pyVideoTrans 版本**：v3.68 或更高版本
2. **硬件要求**：建议有 NVIDIA 显卡（GPU 加速），部分服务也支持 CPU 运行（速度较慢）
3. **网络环境**：首次启动可能需要从 HuggingFace 下载模型，国内用户可能需要科学上网或配置镜像
4. **Python 环境**：如果选择源码部署，需要 Python 3.10+ 和 Git

----

## Index-TTS

Index-TTS 是 B站开源的 TTS 服务，支持中文和英文语音克隆，音质效果优秀。


#### Windows 整合包

- 百度网盘下载：https://pan.baidu.com/s/1dmLdhJgBC7HlfY-hITMVeg?pwd=1234
- HuggingFace 下载：https://huggingface.co/mortimerme/repocollect/resolve/main/indextts2-0529.7z?download=true

#### 源码部署

请参照官方项目说明文档：https://github.com/index-tts/index-tts

### 启动 WebUI

启动后默认地址是 `http://127.0.0.1:7860`，配置方法与 F5-TTS 完全一致。

> **注意**：仅对接 Index-TTS 官方 WebUI。如果你使用了第三方整合包，请用官方源码中的 `webui.py` 覆盖三方包的 `webui.py`，否则可能无法使用。

----

## FireRed3-TTS 小红书TTS3

> 支持语言：阿拉伯语 · 粤语 · 中文 · 捷克语 · 荷兰语 · 英语 ·  法语 · 德语 · 希腊语 · 印地语 · 印尼语 · 意大利语 · 日语 · 韩语 · 波兰语 · 葡萄牙语 · 罗马尼亚语 · 俄语 · 西班牙语 · 泰语 · 土耳其语 · 乌克兰语 · 越南语

官方原版无 webui，无法对接，因此修改新增了 webui.py, 仓库地址 https://github.com/jianchang512/FireRedTTS3

### 安装部署：

* 需要有英伟达显卡，并配置好 CUDA 12.9 环境


```
git clone https://github.com/jianchang512/FireRedTTS3
cd FireRedTTS3
pip install -r requirements.txt
```

- 启动webui.py ：`python webui.py`,如果在 colab 上使用，添加 share参数，即 `python webui.py --share`
- 启动webuiall.py ：`python webuiall.py` 如果在 colab 上使用，添加 share参数，即 `python webuiall.py --share`

启动后将地址，默认本地`http://127.0.0.1:7860` 填写到 软件才对--TTS设置--Index/VoxCPM/Spark/FireRed3 的 `FireRed3-TTS URL`中 


- 如果本地部署有困难，建议直接使用 Google Colab 运行，需要有Google账号并能科学上网，[点击该链接打开 Colab](https://colab.research.google.com/drive/1gi82EaS7nYTVeo99WU9K3udizEuAIwF6?usp=sharing)
- [Windows整合包下载](https://pan.baidu.com/s/12nry3XqWLxgb9xGL4yzLeA?pwd=1234)
* **HuggingFace下载**: https://huggingface.co/mortimerme/repocollect/resolve/main/FireRedTTS3-0817.7z?download=true 


----
----

----

## VoxCPM-TTS

VoxCPM-TTS 是面壁智能开源的 TTS 服务，支持 30 多种语言，包括中文多种方言。

### 支持的语言

- **国际语言**（30+）：阿拉伯语、缅甸语、中文、丹麦语、荷兰语、英语、芬兰语、法语、德语、希腊语、希伯来语、印地语、印尼语、意大利语、日语、高棉语、韩语、老挝语、马来语、挪威语、波兰语、葡萄牙语、俄语、西班牙语、斯瓦希里语、瑞典语、他加禄语、泰语、土耳其语、越南语
- **中文方言**：普通话、四川话、粤语、吴语、东北话、河南话、陕西话、山东话、天津话、闽南话

### 部署方式

源码部署，参照官方项目说明文档：https://github.com/OpenBMB/VoxCPM

启动 WebUI 后默认地址是 `http://127.0.0.1:7860`，配置方法与 F5-TTS 一致。

----

## Spark-TTS

Spark-TTS 是 SparkAudio 开源的 TTS 服务，支持中文和英文语音克隆。

### 部署方式

请源码部署，参照官方项目说明文档：https://github.com/SparkAudio/Spark-TTS

启动 WebUI 后默认地址是 `http://127.0.0.1:7860`，配置方法与 F5-TTS 一致。


----

## 九、配置参考音频

> 参考音频统一在菜单 → TTS设置 → 设置参考音频中处理。

### 操作步骤

1. 打开「参考音频」设置界面
2. 在「参考音频」文本框中填写以下格式的内容：

```
音频文件名#该音频文件中对应的文字
```

3. 将参考音频文件放置在 pyVideoTrans 项目根目录下的 `f5-tts` 文件夹内（如该文件夹不存在请手动创建）

### 示例

假设你有一个音频文件 `nverguo.wav`，音频内容是「女儿国王说话」，则填写：

```
nverguo.wav#女儿国王说话
```

![参考音频放到pyVideotrans软件内的f5-tts文件夹内，别搞错](https://pvtr2.pyvideotrans.com/1742227715529_image.png)

![参考音频和参考音频内文字](https://pvtr2.pyvideotrans.com/1742230242932_image.png)

### 参考音频要求

| 项目 | 要求 |
|------|------|
| 格式 | WAV 格式（推荐），MP3 等格式也可 |
| 时长 | 3~12 秒（F5-TTS 最长 12 秒，超长自动截断） |
| 内容 | 发音清晰，无背景噪音 |
| 文字 | 必须与音频内容一致 |

---


---

## 常见错误和注意事项

### 1. 不能关闭终端窗口

API 使用过程中，可以关闭浏览器中的 WebUI 界面，但**不能关闭启动 TTS 服务的终端窗口**。

![这个界面不可关闭，否则api无法调用](https://pvtr2.pyvideotrans.com/1742230825845_image.png)

### 2. 不能动态切换模型

不可以动态切换模型。需要手动修改代码，然后重启 WebUI。

### 3. HuggingFace 连接超时

如果出现类似以下错误：

```
requests.exceptions.ConnectTimeout: HTTPSConnectionPool(host='huggingface.co', port=443): Max retries exceeded
```

这是网络问题，需要配置科学上网环境，确保能访问 huggingface.co。

### 4. 参考音频时长限制

建议 3~10 秒

