---
title: 智谱Zhipu AI模型接入
date: 2025-07-15  14:33:00
description: 自 v3.74 版本起，pyVideoTrans中已将 智谱AI 作为单独渠道使用
---

# 智谱 AI 翻译渠道

## 这是什么？

智谱 AI（Zhipu AI）是国内领先的大模型平台，提供 GLM 系列模型。自 v3.74 版本起，pyVideoTrans 将智谱 AI 作为独立翻译渠道接入。此外，智谱 AI 还支持语音识别（GLM-ASR）和配音（GLM-TTS）功能。

## 前置条件

- pyVideoTrans **v3.74** 或更高版本（翻译功能）
- pyVideoTrans **v3.93** 或更高版本（语音识别和配音功能）
- 智谱 AI 平台账号（用于获取 API Key）

## API Key 获取步骤

**第一步：注册并登录智谱 AI 平台**

打开 https://www.bigmodel.cn ，使用手机号或邮箱注册并登录。

**第二步：创建 API Key**

1. 登录后访问 https://www.bigmodel.cn/usercenter/apikeys
2. 点击 **"创建 API Key"** 按钮
3. 为 Key 起一个名称
4. 复制生成的 API Key（请妥善保存）

**第三步：获取免费额度**

智谱 AI 为新用户提供免费额度，可在平台首页查看。

## 在 pyVideoTrans 中配置翻译

1. 打开菜单栏 → **翻译设置** → **智谱AI 设置界面**
2. 在 **API KEY** 中填写从智谱平台获取的 API Key
3. 在 **模型选择框** 中选择一个模型，推荐使用 `glm-4-flash`（免费、速度快），也可以填写其他智谱 AI 模型
4. 点击 **测试** 按钮验证连接
5. 测试通过后保存

![](https://pvtr2.pyvideotrans.com/1752632796203_image.png)

![](https://pvtr2.pyvideotrans.com/1752632629230_image.png)

![](https://pvtr2.pyvideotrans.com/1752587739231_image.png)

## 使用语音识别（GLM-ASR）

从 v3.93 版本后，语音识别渠道新增 **智谱AI GLM-ASR**：

1. 在 **翻译设置** → **智谱AI** 中填写好 API Key
2. 选择语音识别模型 `glm-asr-2512`
3. 在主界面的 **语音识别** 渠道中选择 **智谱AI GLM-ASR**
4. 支持 10 多种语言的语音识别

## 使用配音（GLM-TTS）

从 v3.93 版本后，配音渠道新增 **智谱AI GLM-TTS**：

1. 在 **翻译设置** → **智谱AI** 中填写好 API Key
2. 在主界面的 **配音** 渠道中选择 **智谱AI GLM-TTS**
3. 使用 `glm-tts` 模型进行配音

> **注意**：默认配音中会出现 **滴滴水印声**，请到智谱 AI 控制台关闭：
> 个人中心 → 安全管理 → 水印管理：https://www.bigmodel.cn/usercenter/safety-mgmt/watermark

## 推荐配置

| 配置项 | 推荐值 |
|--------|--------|
| API URL | `https://open.bigmodel.cn/api/paas/v4/`（默认，无需修改） |
| API Key | 从智谱 AI 平台获取 |
| 翻译模型 | `glm-4-flash`（免费、快速）或 `glm-4.5-flash` |
| 最大输出 Tokens | 4095（默认） |

## 常见问题

| 问题 | 原因 | 解决方案 |
|------|------|----------|
| "Authentication Error" | API Key 填写错误 | 重新登录智谱平台获取新的 API Key |
| 配音有滴滴水印声 | 未关闭水印 | 到智谱 AI 控制台关闭水印：https://www.bigmodel.cn/usercenter/safety-mgmt/watermark |
| 语音识别不可用 | 版本过低 | 升级到 v3.93 或更高版本 |
| 连接超时 | 网络问题 | 智谱 AI 是国内服务，一般无需代理；如仍超时请检查网络 |
| 频繁报错 "超过请求频率" | 请求过于频繁 | 增大翻译后暂停时间 |
