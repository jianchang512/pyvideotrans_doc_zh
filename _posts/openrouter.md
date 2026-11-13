---
title: OpenRouter大模型集市
date: 2025-01-05 14:37:57
description: 有没有一个平台，既能提供国内外主流的 AI 模型，又能方便国内用户使用呢？答案是肯定的，那就是 **OpenRouter.ai**！
---

AI 已渗透到我们工作和娱乐的方方面面，无论是国外的 OpenAI、Gemini、Claude 三巨头，还是国内的 DeepSeek、智谱 AI、通义千问、Kimi等，各大厂商都提供了强大的 AI 模型。

然而，一个令人头疼的问题是，每使用一个平台的模型，我们就需要注册一个账号，甚至需要绑定支付方式。想要使用 ChatGPT？你需要 OpenAI 账号。想体验 Gemini？你需要 Google 账号。

当然，市场上也有一些 AI 聚合平台，如阿里云的百炼、字节跳动的火山方舟等。但它们主要侧重于自家的模型，缺乏国外顶尖模型。硅基流动虽然提供了一些国外模型，但并不全面，缺少 OpenAI 和 Claude 等热门选择。

有没有一个平台，既能提供国内外主流的 AI 模型，又能方便国内用户使用呢？答案是肯定的，那就是 **OpenRouter.ai**！

**OpenRouter.ai** 的优势：

*   **国内可直接访问，速度稳定**：无需特殊网络环境，即可流畅使用。
*   **模型齐全**：囊括国内外主流 AI 模型，包括 OpenAI、Google、Claude、Deepseek、Qwen 等。
*   **免费额度**：提供每日免费请求额度，让你轻松体验各种模型。

## 1. 免费注册与登录

访问 OpenRouter.ai 官网： [https://openrouter.ai](https://openrouter.ai)

*   如果你有 Google 账号，可以直接使用 Google 账号登录。
*   如果没有，点击“**Sign up**”使用邮箱注册。

![注册登录](https://pvtr2.pyvideotrans.com/img/20250212012827-0.webp)


![image.png](https://pvtr2.pyvideotrans.com/img/20250212012828-1.webp)

注册后打开你的邮箱，点击验证邮箱中的链接，就可以登录了。

## 2. 创建 API 密钥

登录后，进入 API 密钥管理页面：[https://openrouter.ai/settings/keys](https://openrouter.ai/settings/keys)

![创建 API Key](https://pvtr2.pyvideotrans.com/img/20250212012828-2.webp)

点击“**Create Key**”创建新的 API 密钥。

![创建](https://pvtr2.pyvideotrans.com/img/20250212012828-3.webp)

复制生成的 API 密钥，妥善保管。

![复制 API Key](https://pvtr2.pyvideotrans.com/img/20250212012828-4.webp)

## 3. 探索免费模型

访问 **OpenRouter.ai** 的模型列表页面： [https://openrouter.ai/models](https://openrouter.ai/models)

如下图筛选出所有免费模型。

![筛选免费模型](https://pvtr2.pyvideotrans.com/img/20250212012829-5.webp)

你会看到许多带有 `(free)` 标识的模型，这些都是可以免费使用的，包括满血版 `DeepSeek:R1`。


![免费模型列表](https://pvtr2.pyvideotrans.com/img/20250212012829-6.webp)

**免费额度说明：**

OpenRouter.ai 为每个用户提供每日 200 次的免费请求额度。

![免费额度](https://pvtr2.pyvideotrans.com/img/20250212012829-7.webp)

## 4. 使用 OpenRouter.ai 替换 OpenAI

选择一个你感兴趣的模型，复制模型名称（Model Name）。

![image.png](https://pvtr2.pyvideotrans.com/img/20250212012830-8.webp)

现在，你可以在任何支持 OpenAI API 格式的应用或代码中，通过以下方式使用 OpenRouter.ai：

*   **API 地址**：`https://openrouter.ai/api/v1`
*   **API 密钥 (SK)**：你之前复制的 OpenRouter.ai API 密钥
*   **模型名称**：你刚刚复制的模型名称

## 5. 特别推荐：免费体验满血版 DeepSeek-R1

OpenRouter.ai 还提供了一个特别的模型：`deepseek/deepseek-r1:free`

访问：[https://openrouter.ai/deepseek/deepseek-r1:free](https://openrouter.ai/deepseek/deepseek-r1:free)

![DeepSeek-R1](https://pvtr2.pyvideotrans.com/img/20250212012830-9.webp)

这是一个满血版的 DeepSeek-R1 推理模型，完全免费调用！

## 6. 实例：在 pyVideoTrans 中使用 OpenRouter.ai

以 pyVideoTrans 这款视频翻译软件为例，演示如何在实际应用中使用 OpenRouter.ai：

1.  打开软件，进入“菜单”->“OpenAI ChatGPT API”。
2.  在“API URL”中填写：`https://openrouter.ai/api/v1`
3.  在“SK”中填写你的 OpenRouter.ai API 密钥。
4.  在“填写所有可用模型”中粘贴你复制的模型名称。
5.  点击“保存”即可。


![image.png](https://pvtr2.pyvideotrans.com/img/20250212012830-10.webp)


