---
title: 使用 Gemini TTS 配音
date: 2025-05-24 14:33:00
description: Gemini 2.5 新增了多说话人文字配音功能，支持24种语言，30个发音人角色
---

## Gemini TTS 配音渠道

**这是什么？**

Gemini TTS 是 Google 推出的语音合成功能，基于 Gemini 2.5 模型实现。支持多说话人文字配音，提供 24 种语言和 30 个发音人角色。

**支持的模型：**
- `gemini-2.5-flash-preview-tts`（推荐，限制更少，免费额度更高）
- `gemini-2.5-pro-preview-tts`

**前提条件：**
- 需要科学上网（访问 Google AI 服务）
- 需要 Google 账号
- v3.70+ 版本的 pyVideoTrans

## 第一步：获取 Gemini API Key

1. 访问 [Google AI Studio](https://aistudio.google.com/)
2. 使用 Google 账号登录
3. 进入 API Keys 页面
4. 创建并复制你的 API Key

## 第二步：配置软件

1. 打开软件，进入 **菜单 → 翻译设置 → Gemini Pro**
2. 填写 API Key
3. 在底部 **TTS Model** 中选择模型：
   - 推荐使用 `gemini-2.5-flash-preview-tts`（免费额度更高）
4. 保存设置

![填写 Gemini 配置](https://pvtr2.pyvideotrans.com/1748064664038_image.png)

## 第三步：使用 Gemini TTS

1. 回到主界面
2. 在 **配音渠道** 中选择 `Gemini TTS`
3. 选择目标语言
4. 在 **配音角色** 中选择发音人
5. 点击配音按钮开始

![选择 Gemini TTS 角色](https://pvtr2.pyvideotrans.com/1748064701564_image.png)

## 可用角色（30个）

Gemini TTS 提供以下发音人角色：

```
Zephyr, Puck, Charon, Kore, Fenrir, Leda, Orus, Aoede,
Callirrhoe, Autonoe, Enceladus, Iapetus, Umbriel, Algieba,
Despina, Erinome, Algenib, Rasalgethi, Laomedeia, Achernar,
Alnilam, Schedar, Gacrux, Pulcherrima, Achird, Zubenelgenubi,
Vindemiatrix, Sadachbia, Sadaltager, Sulafat
```

## 可能遇到的问题及解决方案

### 429 频率限制错误

目前 Gemini 对 API 的调用频率限制比较严格。当你处理的文本行数较多，特别是使用双说话人模式时，可能会遇到生成失败（尤其是中文文字时），错误信息中包含 `429` 错误码。

**解决方案：**

1. **等待后重试**：等待几分钟或更长时间后重新尝试
2. **调整并发设置**：
   - 增大配音暂停后的等待时长
   - 减小并发数量
3. **开通付费账号**：更好的方法是开通 Google 的付费账号

![遇到429报错的解决方法](https://pvtr2.pyvideotrans.com/1748064566013_image.png)

## 重要提示

> 1. **科学上网能力**：访问 Google AI 服务，你需要能够访问国际互联网（请自行解决网络问题）。这是使用国外 AI 工具的基础，否则后续步骤无法进行。
> 2. **Google 账号**：你需要一个免费的 Google 账号。如果还没有，可以前往 Google 官网注册，通常国内手机号即可完成注册。

## 常见问题

| 问题 | 解决方案 |
|------|----------|
| 无法连接 API | 需要科学上网 |
| 429 频率限制 | 等待后重试，或降低并发数 |
| 账号余额不足 | 开通 Google 付费账号 |
| 找不到 TTS 设置 | 确保使用 v3.70+ 版本 |
