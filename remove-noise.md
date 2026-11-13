---
title: 语音降噪方法
date: 2024-01-22 14:33:00
description: 在许多语音相关的应用场景中，噪声的存在会严重影响性能和用户体验。例如：
---

### 为什么要降噪？

在许多语音相关的应用场景中，噪声的存在会严重影响性能和用户体验。例如：

-   **语音识别:**  噪声会降低语音识别的准确率，尤其是在低信噪比环境下。
-   **语音克隆:**  噪声会使依据参考音频合成语音的自然度和清晰度下降。

通过语音降噪能够一定程度上解决这些问题。

### 常见的降噪方法

目前，语音降噪技术主要有以下几种方法：

1.  **谱减法：** 这是一种经典的降噪方法，原理简单。
2.  **维纳滤波：**  这种方法对稳定的噪声效果较好，但对于变化的噪声效果有限。
3.  **深度学习：**  这是目前最先进的降噪方法。利用强大的深度学习模型，例如循环神经网络 (RNN)、卷积神经网络 (CNN) 和生成对抗网络 (GAN)，来学习噪声和语音之间的复杂关系，实现更精准、更自然的降噪效果。


### ZipEnhancer 模型：深度学习降噪

本工具基于通义实验室开源的 [ZipEnhancer 模型](https://modelscope.cn/models/iic/speech_zipenhancer_ans_multiloss_16k_base) ，并提供了一个简单易用的界面和 API 接口，让每个人都能轻松体验深度学习降噪的魅力。

[项目已在 GitHub 开源](https://github.com/jianchang512/remove-noise)

ZipEnhancer 模型的核心是 Transformer 网络结构和多任务学习策略。它不仅能够去除噪声，还能同时增强语音质量和消除回声。工作原理如下：

*   **自注意力机制：**  捕捉语音信号中重要的长时关系，理解声音的上下文信息。
*   **多头注意力机制：**  从不同的角度分析语音特征，实现更精细的噪声抑制和语音增强。


### 如何使用本工具？

**Windows 预打包版：**

1.  下载并解压预打包版本 (https://github.com/jianchang512/remove-noise/releases/download/v0.1/win-remove-noise-0.1.7z)。
2.  双击 `runapi.bat` 文件，浏览器将自动打开 `http://127.0.0.1:5080` 。
3.  选择音频或视频文件，即可开始降噪。


**源码部署：**

1.  **环境准备：** 确保安装了 Python 3.10 - 3.12。
2.  **安装依赖：** 运行 `pip install -r requirements.txt --no-deps`。
3.  **CUDA 加速（可选）：** 如果你有 NVIDIA 显卡，可以安装 CUDA 12.1 来加速处理：
    ```bash
    pip uninstall -y torch torchaudio torchvision
    pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu121
    ```
4.  **运行程序：** 运行 `python api.py`。

**Linux 系统:**

*   需要安装 `libsndfile` 库：`sudo apt-get update && sudo apt-get install libsndfile1`。
*    **注意:** 请确保 `datasets` 库版本为 3.0，否则可能会出现错误。可以使用 `pip list | grep datasets` 命令查看版本。


### 界面预览

![界面预览](https://pvtr2.pyvideotrans.com/img/remove-noise.jpg)


### API 使用方法

**接口地址:** `http://127.0.0.1:5080/api`

**请求方法:** POST

**请求参数:**

*   `stream`:  0 返回音频 URL，1 返回音频数据。
*   `audio`:  待处理的音频或视频文件。

**返回结果 (JSON):**

*   **成功 (stream=0):**  `{"code": 0, "data": {"url": "音频URL"}}`
*   **成功 (stream=1):**  WAV 音频数据。
*   **失败:**  `{"code": -1, "msg": "错误信息"}`


**示例代码 (Python):**  (已在原文基础上优化)


```python
import requests

url = 'http://127.0.0.1:5080/api'
file_path = './300.wav'


# 获取音频 URL
try:
  res = requests.post(url, data={"stream": 0}, files={"audio": open(file_path, 'rb')})
  res.raise_for_status() 
  print(f"降噪后音频 URL: {res.json()['data']['url']}")

except requests.exceptions.RequestException as e:
    print(f"请求失败: {e}")



# 获取音频数据
try:
    res = requests.post(url, data={"stream": 1}, files={"audio": open(file_path, 'rb')})
    res.raise_for_status()
    with open("ceshi.wav", 'wb') as f:
        f.write(res.content)
    print("降噪后的音频已保存为 ceshi.wav")

except requests.exceptions.RequestException as e:
    print(f"请求失败: {e}")

```