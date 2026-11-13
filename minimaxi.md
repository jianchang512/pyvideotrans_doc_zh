---
title: 接入 Minimaxi 字幕翻译和配音
date: 2024-01-22 14:33:00
description: 接入 Minimaxi 的字幕翻译和配音功能，支持多种情绪表达
---

## Minimaxi 配音和翻译渠道

**这是什么？**

Minimaxi（海螺AI）是 MiniMax 公司推出的 AI 服务平台，提供文字转语音和翻译功能。支持 7 种情绪表达，语音效果自然。

**前提条件：**
- 需要注册 Minimaxi 账号
- 需要完成实名认证（国内用户）
- 需要获取 API Key

**注意**：国内和海外账号及余额不通用。

## 注册登录

### 国内用户

- 注册地址：https://platform.minimaxi.com/login

### 海外用户

- 注册地址：https://platform.minimax.io/login

> **重要**：国内站（minimaxi.com）和海外站（minimax.io）的账号、API Key、余额等完全不互通。

---

## 接入字幕翻译

### 第一步：获取 API Key

1. 登录后访问：https://platform.minimaxi.com/user-center/basic-information/interface-key
2. 创建并复制 API Key

### 第二步：配置软件

1. 打开软件，进入 **菜单 → 翻译设置 → Minimax AI**
2. 填写以下信息：
   - **API 地址**：
     - 国内用户：`https://api.minimaxi.com/v1`
     - 海外用户：`https://api.minimax.io/v1`
   - **SK**：粘贴 API Key
3. 点击测试按钮验证连接
4. 保存设置

![翻译设置](https://pvtr2.pyvideotrans.com/1773727771017_image.png)

### 第三步：使用翻译

1. 回到主界面
2. 在 **翻译渠道** 中选择 `Minimax AI`
3. 开始翻译任务

---

## 接入配音

### 第一步：获取 API Key

同翻译部分，使用相同的 API Key。

### 第二步：配置软件

1. 打开软件，进入 **菜单 → TTS设置 → Minimaxi API**
2. 填写以下信息：
   - **API 地址**：
     - 国内用户：选择 `api.minimaxi.com`
     - 海外用户：选择 `api.minimax.io`
   - **SK**：粘贴 API Key
3. 点击测试按钮验证连接
4. 保存设置

![配音设置](https://img.pyvideotrans.com/file/1741096615493_image.png)

![填写 API Key](https://img.pyvideotrans.com/file/1741096626565_image.png)

### 第三步：选择发音情绪

Minimaxi 支持 7 种情绪表达：
- 高兴
- 悲伤
- 愤怒
- 害怕
- 厌恶
- 惊讶
- 中性

可在设置界面选择默认情绪。不过测试发现区别不大，可根据需要调整。

### 第四步：使用配音

1. 回到主界面
2. 在 **配音渠道** 中选择 `Minimaxi`
3. 选择目标语言和配音角色
4. 点击配音按钮开始

---

## 频率限制设置

> **重要**：除非你在 Minimaxi 开通了企业账号且等级较高，否则可能频频报 `rate limit` 频率限制错误。

**请务必设置以下参数：**

1. 打开 **菜单 → 工具/选项 → 高级选项 → 配音调整**
2. 设置 **同时配音数量** 为 `1`
3. 设置 **配音后暂停时间** 为 `25` 秒或更大

普通用户 1 分钟只允许请求 3 次，即约 20 秒一次。

![频率限制设置](https://img.pyvideotrans.com/file/1741099589114_image.png)

---

## 国内用户注意事项

> :warning: 登录后需银行卡号和银行预留手机号实名认证。如果你未通过实名认证，测试可能会失败。

此外使用该方式时，请打开 **菜单 → 工具/选项 → 高级选项 → 配音调整**：
- 同时配音数量设为 `1`
- 配音后暂停时间设为大于 `25` 的值

否则很可能超过频率失败。

## 常见错误

| 错误信息 | 原因 | 解决方案 |
|----------|------|----------|
| rate limit | 频率超限 | 降低并发数，增加暂停时间 |
| Authentication error | API Key 无效 | 检查 Key 是否正确 |
| 实名认证失败 | 未完成实名 | 完成银行卡实名认证 |
| 账号余额不足 | 额度用完 | 充值 Minimaxi 账号 |
