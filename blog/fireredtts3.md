---
title: FireRedTTS3 新手指南及整合包下载：一句话克隆音色、文字捏声音、音频无痕修改
date: 2026-08-16 14:33:00
description: FireRedTTS3 新手指南及整合包下载：一句话克隆音色、文字捏声音、音频无痕修改
---


# FireRedTTS3 新手指南：一句话克隆音色、文字捏声音、音频无痕修改！

如果你平时用过 **Edge-TTS**、**GPT-SoVITS**、**F5-TTS** 或 **Index-TTS** 等语音工具，那么小红书最新开源的 **FireRedTTS3** 会给你带来全新的体验。

### 相比常见 TTS 工具，它有什么不同与优势？
* **对比 Edge-TTS**：Edge-TTS 只能用微软预设的声音，无法克隆；而 FireRedTTS3 支持真正的**零样本声音克隆**。
* **对比 GPT-SoVITS**：GPT-SoVITS 仅支持中英日韩语言；FireRedTTS3 支持24种常见语言并且支持设计新声音。
* **全能特性**：除了支持 **24 种语言**克隆外，它还支持**“用文字描述凭空捏声音”** 以及**“像修图一样无痕修改音频台词与音调”**


---

### 一、核心功能亮点

1. **极速声音克隆**
   * **超低门槛**：官方建议 5~20 秒，但**实际上 1~3 秒的干净音频就能出效果**（建议不低于 2~3 秒，太短会影响相似度）。上传音频及对应文本，AI 就能以极快速度用该音色朗读新文本。
2. **文本一键捏声音**
   * 无需任何参考音频，直接输入：“*一个年轻女性的温柔嗓音，语速稍慢*”，AI 会自动生成专属音色。
3. **智能语音编辑**
   * 输入指令即可无痕替换已有录音中的指定字词，或调节语速、音高。

---

### 二、 显存与版本选择（重要！）

[官方原版地址](https://github.com/FireRedTeam/FireRedTTS3) , [本人修改版地址](https://github.com/jianchang512/FireRedTTS3) , 修改版移除了极易报错的 `flash_attn` 依赖，并提供了两个 webUI界面，请根据显存选择：

<img width="1120" height="1028" alt="webui.py启动后的界面图" src="https://github.com/user-attachments/assets/237ea4da-109f-43d5-9b08-bf616c4e7b90" />

![alt text](https://pvtr2.pyvideotrans.com/1786888554923_image.png)


| webUI脚本文件 | 功能范围 | 显存门槛 | 适用场景 |
| :--- | :--- | :--- | :--- |
| **`webui.py`** | 仅声音克隆 | **≥ 8G 显存** | **8G 显卡 / Colab 免费版推荐** |
| **`webuiall.py`**| 克隆 + 设计 + 编辑 | **≥ 16G 显存** | 24G 显卡（如 3090/4090）|

> ❗ **注意**：免费的 Google Colab 显存有限，**请务必只运行 `webui.py`**，若强行运行 `webuiall.py` 会因显存不足（OOM）报错闪退。

---

### 三、如何使用？

#### 方式 1：Google Colab 云端免配置（无需本地显卡）

适合本地显存不足的用户（需能正常访问外网及拥有 Google 账号）：
1. 打开云端运行链接：👉 [点击直达 Colab 脚本](https://colab.research.google.com/drive/1gi82EaS7nYTVeo99WU9K3udizEuAIwF6?usp=sharing)
2. 启动时请添加 `--share` 参数（即 `python webui.py --share`），运行后控制台会输出一个 `.gradio.live` 的公共链接，点击即可在浏览器直接使用。

#### 方式 2：Windows 一键整合包（解压即用）
* **硬件要求**：N卡（NVIDIA）且显存 $\ge$ 8GB。
* **下载地址**： https://pan.baidu.com/s/12nry3XqWLxgb9xGL4yzLeA?pwd=1234
* 解压后运行相应启动脚本即可。**第一次启动会下载TTS模型，总体积大约20G，建议提前备好稳定的科学上网方法，默认会使用国内镜像站，但可能较慢超时失败**

启动后默认webui地址是`http://127.0.0.1:7860`,在浏览器中打开即可使用


#### 方式 3：源码本地部署
```bash
git clone https://github.com/jianchang512/FireRedTTS3
cd FireRedTTS3
pip install -r requirements.txt

# 启动克隆版（8G显存）
python webui.py

# 启动全功能版（需16G以上显存）
python webuiall.py
```

启动后默认webui地址是`http://127.0.0.1:7860`,在浏览器中打开即可使用


---

### 💡 避坑小贴士
1. **参考音频**：录音尽量**无背景音、无混响**，长度建议保持在 **3 秒以上**以获得最佳音质。
2. **方言支持**：目前部分中文方言功能官方仍在优化适配中。