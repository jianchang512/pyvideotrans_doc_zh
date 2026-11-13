---
title: 302.AI大模型集市介绍
date: 2024-01-22 14:33:00
description: 众所周知国内无法直接使用 OpenAI/Gemini/Claude 三巨头的 API 服务，想使用需魔法上网并有国外信用卡，要么使用第三方中转api服务。第三方中转api一般比较便宜，但质量和稳定性可能靠不住，也可能随时跑路。
---
众所周知国内无法直接使用 OpenAI/Gemini/Claude 三巨头的 API 服务，想使用需魔法上网并有国外信用卡，要么使用第三方中转api服务。第三方中转api一般比较便宜，但质量和稳定性可能靠不住，也可能随时跑路。

> 之前也推荐过一些国内api服务商，例如 
> 
> 阿里百炼 https://bailian.console.aliyun.com
> 
> 硅基流动 https://cloud.siliconflow.cn
> 
> 字节火山方舟 https://console.volcengine.com/ark
> 
> OpenRouter  https://openrouter.ai
> 


目前国内可直连无需vpn的AI大模型市场，最齐全的似乎首数 302.AI。聚齐了国内外各主流模型，从语言模型到图片生成、音频视频生成、语音合成、语音识别等都存在，几乎叫的出名字的AI大模型都可在此使用。

*   **无需魔法，国内直连，注册即赠 1美元额度**
*   **全球模型，一网打尽：** 不仅囊括 OpenAI、Gemini、Claude 三巨头，还整合了国内各大主流模型，如 Qwen、Deepseek 等。
*   **全方位 AI 能力：** 覆盖语言模型、图像生成、音频视频生成、语音合成、语音识别等全方位 AI 能力。
*   **OpenAI API 兼容：** 语言类模型完美兼容 OpenAI API 格式，可直接替换 ChatGPT 类调用。
*   **价格与官方一致：** 顶级模型（如 GPT-4 系列）价格与 OpenAI 官方保持一致。




## 模型阵容

**🌍 国外 AI 三巨头**
![image.png](https://pvtr2.pyvideotrans.com/img/20250213152741-0.webp)

**国内主流 AI 模型**

![image.png](https://pvtr2.pyvideotrans.com/img/20250213152741-1.webp)

**Deepseek-r1 满血**

![image.png](https://pvtr2.pyvideotrans.com/img/20250213152742-2.webp)

**🎨 从文字生成图片模型**

![image.png](https://pvtr2.pyvideotrans.com/img/20250213152742-3.webp)

**🎬 从文字生成视频模型**

![image.png](https://pvtr2.pyvideotrans.com/img/20250213152742-4.webp)

**🎤 语音合成/语音识别/语音克隆**

![image.png](https://pvtr2.pyvideotrans.com/img/20250213152742-5.webp)

## 🔑 快速上手指南：

1.  **注册 & 创建 API Key：**
    *   访问注册页面 https://gpt302.saaslink.net/teRK8Y 完成注册，注册即送 1 美元额度，如未收到，请根据页面提示加入社群联系获取。
    *   前往API Key 管理页面 https://dash.302.ai/apis/list  创建您的专属 API Key。

![image.png](https://pvtr2.pyvideotrans.com/img/20250213152743-6.webp)

> **温馨提示：** 若左侧未显示 API 选项，请点击“个人中心”，将地址设置为“海外”。

![image.png](https://pvtr2.pyvideotrans.com/img/20250213152743-7.webp)

2.  **替换 API 信息：**

    *   **API 接口地址：**`https://api.302.ai/v1`
    *   **API Key：** 您创建的 API Key
    *  **模型名称：** 填写您想使用的模型名称（支持所有 OpenAI/Gemini/Claude 模型）

3.  **尽情体验！**

    以 pyVideoTrans 视频翻译软件为例：

![image.png](https://pvtr2.pyvideotrans.com/img/20250213152743-8.webp)

## OpenAI SDK 使用示例：

```python
from openai import OpenAI
client = OpenAI(
    api_key='sk-123456',  # 替换为您的 API Key
    base_url='https://api.302.ai/v1'
)

completion = client.chat.completions.create(
    model="gpt-4o",  # 可替换为您想使用的模型
    messages=[
        {"role": "system", "content": "你是srt字幕翻译助手."},
        {
            "role": "user",
            "content": "将<INPUT>标签内的srt字幕翻译为英语，确保输出符合 EBU-STL 标准的SRT字幕内容<INPUT>............</INPUT>"
        }
    ]
)

print(completion.choices[0].message.content)

```

## 💰 价格一览：

*   **顶尖模型：** 与 OpenAI/Gemini/Claude 官方价格一致。
*   **部分自部署模型：** 更具价格优势。

 详细价格列表，请点击此处查看 https://302.ai/pricing 

![image.png](https://pvtr2.pyvideotrans.com/img/20250213152744-9.webp)

**点击这里，注册体验 https://gpt302.saaslink.net/teRK8Y**