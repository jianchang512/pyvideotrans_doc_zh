---
title: DeepL翻译渠道
date: 2024-01-22 14:33:00
description: 这个渠道国内无法购买注册，假如你已有付费账号，可将api密钥填写到软件--DeepL中
---

# DeepL 翻译渠道

## 这是什么？

DeepL 是来自德国的高质量机器翻译服务，以其翻译的自然度和准确性著称，特别适合欧洲语言之间的翻译。pyVideoTrans 通过 DeepL 官方 Python SDK 接入，支持 DeepL 官方 API 和自建 API 两种方式。

## 前置条件

- pyVideoTrans 软件
- DeepL **付费账号**（免费账号无法使用 API）
- 由于 DeepL 不支持国内注册，你需要已有海外账号

## API Key 获取步骤

**第一步：注册 DeepL 账号**

访问 https://www.deepl.com/signup 注册账号。由于国内无法直接注册，你可能需要：
- 使用海外手机号
- 或通过已有海外账号登录

**第二步：获取 Auth Key**

1. 登录后访问 https://www.deepl.com/your-account/keys
2. 页面上会显示你的 **Auth Key**（即 API 密钥）
3. 复制该密钥（格式类似 `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx:fx`）

> **注意**：免费版的 Auth Key 后缀为 `:fx`，付费版没有后缀。两种都可以在 pyVideoTrans 中使用。

## 在 pyVideoTrans 中配置

1. 打开菜单栏 → **翻译设置** → **DeepL 设置界面**
2. 在 **密钥（Auth Key）** 中填写你复制的 API 密钥
3. **API URL 保持为空**（使用 DeepL 官方 API 时无需填写）
   - 如果你使用自建的 DeepL 兼容 API（如 `deeplx`），可以填写自建 API 地址
4. 可选：填写 **术语表 ID**（Glossary ID），用于统一专业术语翻译
5. 点击 **测试** 按钮验证连接
6. 测试通过后保存

![DeepL设置界面](https://pvtr2.pyvideotrans.com/images/deepl01.jpg)

![密钥填写](https://pvtr2.pyvideotrans.com/images/deepl02.jpg)

## 推荐配置

| 配置项 | 推荐值 |
|--------|--------|
| Auth Key | 从 DeepL 官方获取 |
| API URL | 留空（使用官方 API） |
| 术语表 ID | 留空（可选，高级用户使用） |

## 支持的语言

DeepL 支持以下语言互译：中文（简/繁）、英语、德语、法语、西班牙语、葡萄牙语、意大利语、荷兰语、波兰语、俄语、日语、韩语、土耳其语等。

> 语言代码自动映射：`en` → `EN-US`，`zh-CN` → `ZH-HANS`，`zh-TW` → `ZH-HANT`，`pt` → `PT-PT`

## 注意事项

大多 AI 翻译渠道可能都会限制每分钟请求数量。如果使用中报错提示超过请求频率，可通过软件 **菜单** → **工具/选项** → **高级选项** → **翻译后暂停时间** 来设置一个秒数（比如 30），即每次翻译后等待 30 秒再进行下一次翻译，避免超过限制频率报错。

![翻译后暂停时间设置](https://pvtr2.pyvideotrans.com/images/fanyidjs.webp)

## 常见问题

| 问题 | 原因 | 解决方案 |
|------|------|----------|
| 连接失败 | Auth Key 填写错误 | 检查 Key 格式是否正确 |
| "Quota exceeded" | API 配额用完 | 等待下月配额重置，或升级套餐 |
| 国内无法注册 | DeepL 不支持国内注册 | 需要使用海外账号或海外手机号 |
| 翻译结果为乱码 | 网络不稳定 | 检查网络连接，必要时使用代理 |
