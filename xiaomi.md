---
title: 小米 MiMo AI 翻译和配音渠道
date: 2024-01-22 14:33:00
description: 小米 MiMo AI 的字幕翻译和TTS配音渠道，支持中英翻译和配音
---

# 小米 MiMo AI — 翻译与配音渠道

小米 MiMo AI 是小米推出的 AI 开放平台，pyVideoTrans 自 v3.98-327 版本起集成了其翻译和 TTS 配音功能。

---

## 这是什么？

- **翻译渠道**：使用小米大模型将字幕翻译为目标语言
- **配音渠道**：使用小米 TTS 生成配音音频（目前支持中文和英文）

---

## 前置条件

1. 拥有小米 MiMo AI 平台账号
2. 在平台控制台中创建并获取 API Key

---

## 配置步骤

### 第一步：获取 API Key

1. 访问 [小米 MiMo 平台控制台](https://platform.xiaomimimo.com/#/console/api-keys)
2. 登录或注册小米账号
3. 创建 API Key 并复制

![](https://pvtr2.pyvideotrans.com/1774595519577_image.png)

### 第二步：在 pyVideoTrans 中填写

1. 打开菜单 → **翻译设置** → **小米 AI**
2. 将 API Key 粘贴到对应输入框
3. 点击 **测试** 按钮验证
4. 测试通过后点击 **保存**

![](https://pvtr2.pyvideotrans.com/1774595530704_image.png)

### 第三步：使用

1. 在主界面的 **翻译渠道** 下拉框中选择 **小米 AI**
2. 在 **配音渠道** 下拉框中选择 **小米 TTS**
3. 选择目标语言后即可使用

---

## 可用音色

小米 TTS 当前可用音色列表：https://platform.xiaomimimo.com/docs/zh-CN/usage-guide/speech-synthesis-v2.5

---

## 常见问题

| 问题 | 解决方案 |
|------|---------|
| 提示 API Key 错误 | 检查 Key 是否复制完整，无多余空格 |
| 测试按钮报错 | 确认网络连接正常，API Key 有效 |
| TTS 无声音 | 当前仅支持中文和英文，请检查目标语言 |
| 提示余额不足 | 在 [小米模型控制台](https://platform.xiaomimimo.com/#/console/balance) 充值后使用 |

> 小米限时免费期结束后需在平台控制台充值才可继续使用。
