---
title: OpenRouter AI模型接入
date: 2025-07-15  14:33:00
description: 自 v3.74 版本起，pyVideoTrans中已将 OpenRouter 作为单独渠道使用
---

# OpenRouter AI 翻译渠道

## 这是什么？

OpenRouter 是一个 AI 模型聚合平台，提供对多种 AI 模型（如 Claude、Llama、Mistral、GPT 等）的统一 API 访问。通过 OpenRouter，你只需一个 API Key 就能使用多种不同厂商的模型，非常适合想要灵活切换模型的用户。

## 前置条件

- pyVideoTrans **v3.74** 或更高版本
- OpenRouter 平台账号（用于获取 API Key）

## API Key 获取步骤

**第一步：注册并登录 OpenRouter 平台**

打开 https://openrouter.ai ，使用 Google 账号或邮箱注册并登录。

**第二步：创建 API Key**

1. 登录后访问 https://openrouter.ai/settings/keys
2. 点击 **"Create Key"** 按钮
3. 为 Key 起一个名称
4. 复制生成的 API Key（请妥善保存）

**第三步：为账户充值**

OpenRouter 需要付费使用（部分模型有免费额度），前往 https://openrouter.ai/credits 进行充值。

## 在 pyVideoTrans 中配置

1. 打开菜单栏 → **翻译设置** → **OpenRouter 设置界面**
2. 在 **API KEY** 中填写从 OpenRouter 平台获取的 API Key
3. 在 **模型选择框** 中选择一个模型，例如 `anthropic/claude-sonnet-4`、`google/gemini-flash-1.5` 等
   - 也可以手动填写其他 OpenRouter 支持的模型名称
4. 可选：设置 **推理努力级别**（Reasoning Effort）
5. 点击 **测试** 按钮验证连接
6. 测试通过后保存

![](https://pvtr2.pyvideotrans.com/1752632796203_image.png)

![](https://pvtr2.pyvideotrans.com/1752632765534_image.png)

![](https://pvtr2.pyvideotrans.com/1752587739231_image.png)

## 推荐配置

| 配置项 | 推荐值 |
|--------|--------|
| API URL | `https://openrouter.ai/api/v1`（默认，无需修改） |
| API Key | 从 OpenRouter 平台获取 |
| 模型 | `anthropic/claude-sonnet-4`（高质量）或 `google/gemini-flash-1.5`（性价比） |
| 最大输出 Tokens | 8192（默认，可根据模型调整） |

## 热门模型推荐

| 模型 | 特点 | 适用场景 |
|------|------|----------|
| `anthropic/claude-sonnet-4` | 翻译质量极高 | 高质量翻译 |
| `google/gemini-flash-1.5` | 速度快、性价比高 | 日常翻译 |
| `meta-llama/llama-3.1-8b-instruct` | 免费额度 | 免费体验 |
| `mistralai/mistral-7b-instruct` | 免费额度 | 免费体验 |

> 可在 https://openrouter.ai/models 查看所有可用模型及价格。

## 常见问题

| 问题 | 原因 | 解决方案 |
|------|------|----------|
| "Authentication Error" | API Key 填写错误 | 重新登录 OpenRouter 获取新的 API Key |
| "Insufficient balance" | 账户余额不足 | 前往 https://openrouter.ai/credits 充值 |
| 模型返回错误 | 模型名称填写不正确 | 确认模型名称格式为 `provider/model-name` |
| 连接超时 | 网络问题 | 检查网络连接，可能需要代理 |
| 频繁报错 "超过请求频率" | 请求过于频繁 | 增大翻译后暂停时间 |
