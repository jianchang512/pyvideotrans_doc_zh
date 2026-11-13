---
title: 硅基流动 siliconflow AI模型接入
date: 2025-07-15  14:33:00
description: 自 v3.74 版本起，pyVideoTrans中已将 硅基流动 siliconflow 作为单独渠道使用
---

# 硅基流动 SiliconFlow AI 翻译渠道

## 这是什么？

硅基流动（SiliconFlow）是国内知名的 AI 推理服务平台，提供多种开源大模型的 API 访问，包括 DeepSeek、Qwen、Llama 等模型。自 v3.74 版本起，pyVideoTrans 将其作为独立翻译渠道接入，国内用户访问速度快，无需代理。

## 前置条件

- pyVideoTrans **v3.74** 或更高版本
- 硅基流动平台账号（用于获取 API Key）

## API Key 获取步骤

**第一步：注册并登录硅基流动平台**

打开 https://cloud.siliconflow.cn ，使用手机号或邮箱注册并登录。

**第二步：创建 API Key**

1. 登录后访问 https://cloud.siliconflow.cn/account/ak
2. 点击 **"创建 API Key"** 按钮
3. 为 Key 起一个名称
4. 复制生成的 API Key（请妥善保存）

**第三步：获取免费额度**

硅基流动为新用户提供免费额度，部分模型（如 Qwen-7B）可免费使用。可在平台首页查看当前余额。

## 在 pyVideoTrans 中配置

1. 打开菜单栏 → **翻译设置** → **硅基流动 设置界面**
2. 在 **API KEY** 中填写从硅基流动平台获取的 API Key
3. 在 **模型选择框** 中选择一个模型，例如：
   - `Qwen/Qwen2.5-7B-Instruct`（免费，适合日常翻译）
   - `deepseek-ai/DeepSeek-V3`（高质量翻译）
   - 也可以手动填写其他硅基流动支持的模型
4. 点击 **测试** 按钮验证连接
5. 测试通过后保存

![](https://pvtr2.pyvideotrans.com/1752632796203_image.png)

![](https://pvtr2.pyvideotrans.com/1752632658237_image.png)

![](https://pvtr2.pyvideotrans.com/1752587739231_image.png)

## 推荐配置

| 配置项 | 推荐值 |
|--------|--------|
| API URL | `https://api.siliconflow.cn/v1`（默认，无需修改） |
| API Key | 从硅基流动平台获取 |
| 模型 | `Qwen/Qwen2.5-7B-Instruct`（免费）或 `deepseek-ai/DeepSeek-V3`（高质量） |
| 最大输出 Tokens | 8192（默认） |

## 热门模型推荐

| 模型 | 价格 | 特点 |
|------|------|------|
| `Qwen/Qwen2.5-7B-Instruct` | 免费 | 适合日常翻译 |
| `deepseek-ai/DeepSeek-V3` | 付费 | 翻译质量高 |
| `meta-llama/Meta-Llama-3.1-8B-Instruct` | 免费 | 英文翻译优秀 |

> 可在 https://cloud.siliconflow.cn/models 查看所有可用模型及价格。

## 常见问题

| 问题 | 原因 | 解决方案 |
|------|------|----------|
| "Authentication Error" | API Key 填写错误 | 重新登录平台获取新的 API Key |
| 连接超时 | 网络问题 | 硅基流动是国内服务，一般无需代理；如仍超时请检查网络 |
| 模型返回错误 | 模型名称不正确 | 确认模型名称格式为 `provider/model-name` |
| 频繁报错 "超过请求频率" | 免费模型有频率限制 | 增大翻译后暂停时间，或升级为付费模型 |
| 翻译结果空白行过多 | 模型能力不足 | 尝试使用更大的模型（如 14B 或 32B 版本） |
