---
title: kokoro TTS项目
date: 2024-01-22 14:33:00
description: 这是一个用于kokoro TTS项目的webui和api项目，支持中文、英文、日语、法语、意大利语、葡萄牙、西班牙、印地语共8种语言配音
---

## Kokoro TTS 配音渠道

**这是什么？**

Kokoro TTS 是一个轻量级的语音合成项目，支持 8 种语言配音：中文、英文、日语、法语、意大利语、葡萄牙语、西班牙语、印地语。提供 Web 界面和 API 接口。

**优点：**
- 支持 8 种语言
- 有 Web 界面可试听
- 兼容 OpenAI API 格式
- 轻量级，启动快

![Kokoro TTS Web 界面](https://pvtr2.pyvideotrans.com/img/pre.jpg)

## 项目信息

- 项目地址：https://github.com/jianchang512/kokoro-uiapi
- 启动后默认 UI 地址：`http://127.0.0.1:5066`
- 支持对文字和 SRT 字幕进行配音
- 支持在线试听和下载
- 支持对齐字幕

## 安装方法

### Windows 用户

1. 下载整合包：https://github.com/jianchang512/kokoro-uiapi/releases/v0.1
2. 解压后双击 `start.bat` 即可启动
3. 如需 GPU 加速，请确保拥有 NVIDIA 显卡并安装 CUDA 12

### Linux/macOS 用户

**前置条件：**
- Python 3.8+（建议 3.10-3.11）
- 安装 ffmpeg：
  - Linux：`apt install ffmpeg` 或 `yum install ffmpeg`
  - macOS：`brew install ffmpeg`

**安装步骤：**

```bash
# 1. 拉取源码
git clone https://github.com/jianchang512/kokoro-uiapi

# 2. 创建虚拟环境并激活
cd kokoro-uiapi
python3 -m venv venv
source venv/bin/activate

# 3. 安装依赖
pip3 install -r requirements.txt

# 4. 启动
python3 app.py
```

## 在 pyVideoTrans 中使用

### 第一步：启动 Kokoro TTS

- Windows 整合包：双击 `start.bat`
- 源码安装：执行 `python3 app.py`

### 第二步：配置视频翻译软件

1. 升级 pyVideoTrans 到 v3.48+ 版本
2. 打开 **菜单 → TTS设置 → Kokoro TTS**
3. 在 HTTP 地址中填写：`http://127.0.0.1:5066`
4. 点击测试按钮验证连接
5. 保存设置

![填写 Kokoro TTS 地址](https://pvtr2.pyvideotrans.com/img/kokoro01.jpg)

### 第三步：使用配音

1. 回到主界面
2. 在 **配音渠道** 中选择 `Kokoro TTS`
3. 选择目标语言和配音角色
4. 点击配音按钮开始

## 兼容 OpenAI API

Kokoro TTS 的 API 兼容 OpenAI TTS 格式，可以使用 OpenAI SDK 调用。

### API 信息

- 地址：`http://127.0.0.1:5066/v1/audio/speech`
- 方法：`POST`
- 数据格式：`application/json`

### 请求参数

```json
{
    "input": "需要配音的文字",
    "voice": "配音角色",
    "speed": 1.0
}
```

### OpenAI SDK 使用示例

```python
from openai import OpenAI

client = OpenAI(
    api_key='123456',
    base_url='http://127.0.0.1:5066/v1'
)

try:
    response = client.audio.speech.create(
        model='tts-1',
        input='你好啊，亲爱的朋友们',
        voice='zf_xiaobei',
        response_format='mp3',
        speed=1.0
    )
    with open('./test_openai.mp3', 'wb') as f:
        f.write(response.content)
    print("MP3 file saved successfully")
except Exception as e:
    print(f"An error occurred: {e}")
```

## 角色列表

### 英语角色

```
af_alloy, af_aoede, af_bella, af_jessica, af_kore, af_nicole, af_nova,
af_river, af_sarah, af_sky, am_adam, am_echo, am_eric, am_fenrir,
am_liam, am_michael, am_onyx, am_puck, am_santa, bf_alice, bf_emma,
bf_isabella, bf_lily, bm_daniel, bm_fable, bm_george, bm_lewis
```

### 中文角色

```
zf_xiaobei, zf_xiaoni, zf_xiaoxiao, zf_xiaoyi,
zm_yunjian, zm_yunxi, zm_yunxia, zm_yunyang
```

### 日语角色

```
jf_alpha, jf_gongitsune, jf_nezumi, jf_tebukuro, jm_kumo
```

### 其他语言角色

- **法语**：`ff_siwis`
- **意大利语**：`if_sara, im_nicola`
- **印地语**：`hf_alpha, hf_beta, hm_omega, hm_psi`
- **西班牙语**：`ef_dora, em_alex, em_santa`
- **葡萄牙语**：`pf_dora, pm_alex, pm_santa`

## 代理/VPN

源码部署方式需要从 Hugging Face 下载音色 pt 文件，需提前设置全局代理或系统代理。

也可以提前下载好模型解压到 `app.py` 所在目录下：
- 模型下载地址：https://github.com/jianchang512/kokoro-uiapi/releases/download/v0.1/moxing--jieya--dao--app.py--mulu.7z

## Credit

- [Kokoro-82M](https://github.com/hexgrad/kokoro)
