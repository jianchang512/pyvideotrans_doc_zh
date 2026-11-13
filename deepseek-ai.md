---
title: DeepSeek AI模型接入
date: 2025-07-15  14:33:00
description: 自 v3.74 版本起，pyVideoTrans中已将 deepseek 作为单独渠道使用
---

# DeepSeek AI 翻译渠道

## 这是什么？

DeepSeek 是国内知名的 AI 大模型平台，自 v3.74 版本起，pyVideoTrans 将 DeepSeek 作为独立的翻译渠道接入。它基于 OpenAI 兼容接口，翻译质量较高，且支持深度思考（Thinking）模式，适合对翻译质量有较高要求的用户。

## 前置条件

- pyVideoTrans **v3.74** 或更高版本
- DeepSeek 平台账号（用于获取 API Key）

## API Key 获取步骤

**第一步：注册并登录 DeepSeek 平台**

打开 https://platform.deepseek.com/api_keys ，使用手机号或邮箱注册并登录。

**第二步：创建 API Key**

1. 登录后进入 API Keys 管理页面
2. 点击 **"创建 API Key"** 按钮
3. 为 Key 起一个名称（如 "pyVideoTrans"）
4. 复制生成的 API Key（只显示一次，请妥善保存）

**第三步：为账户充值**

DeepSeek API 需要付费使用，前往 https://platform.deepseek.com/account/topup 进行充值。新用户通常有少量免费额度。

## 在 pyVideoTrans 中配置

1. 打开菜单栏 → **翻译设置** → **DeepSeek 设置界面**
2. 在 **API KEY** 中填写从 DeepSeek 平台获取的 API Key
3. 在 **模型选择框** 中选择一个模型，推荐使用 `deepseek-chat`（通用对话模型）或 `deepseek-v4-flash`
4. 可选：开启 **深度思考** 模式（Thinking），可提升复杂翻译的准确性
5. 点击 **测试** 按钮验证连接
6. 测试通过后保存

![](https://pvtr2.pyvideotrans.com/1752632796203_image.png)

![](https://pvtr2.pyvideotrans.com/1752632688044_image.png)

![](https://pvtr2.pyvideotrans.com/1752587739231_image.png)

## 推荐配置

| 配置项 | 推荐值 |
|--------|--------|
| API URL | `https://api.deepseek.com/v1/`（默认，无需修改） |
| API Key | 从 DeepSeek 平台获取 |
| 模型 | `deepseek-chat`（通用）或 `deepseek-v4-flash`（快速） |
| 最大输出 Tokens | 65536（默认，一般无需修改） |
| 深度思考 | 根据需求开启 |

## 常见问题

| 问题 | 原因 | 解决方案 |
|------|------|----------|
| 提示 "Authentication Error" | API Key 填写错误或已过期 | 重新登录 DeepSeek 平台获取新的 API Key |
| 提示 "Insufficient balance" | 账户余额不足 | 前往 https://platform.deepseek.com/account/topup 充值 |
| 翻译结果为空 | 模型返回格式不符合预期 | 尝试更换模型，或调整翻译线程数 |
| 连接超时 | 网络问题 | 检查网络连接，或尝试使用代理 |
| 频繁报错 "超过请求频率" | 请求过于频繁 | 在主界面"翻译渠道↓"弹窗中将暂停秒改为 10，每分钟最多 6 次请求 |
