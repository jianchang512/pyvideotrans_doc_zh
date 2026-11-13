---
title: 使用OpenAI官方的 ChatGPT API
date: 2024-01-22 14:33:00
description: 如果有免费账号，那么也就有了免费api使用权限，不过这个免费api限制很大，一分钟只能有个位数次请求，很容易就超限失败了。当然如果不在乎，坚持要用，也是可以的。
---
> **[点击查看使用国内AI模型代替OpenAI ChatGPT](/aimodels)**

# OpenAI ChatGPT 翻译渠道

## 这是什么？

OpenAI 的 ChatGPT 是全球最知名的 AI 大模型之一，翻译质量优秀。pyVideoTrans 通过 OpenAI 兼容接口接入 ChatGPT，支持官方 API 和第三方中转 API 两种使用方式。

## 前置条件

- pyVideoTrans 软件
- OpenAI 账号（免费账号即可获取 API，但有频率限制）或第三方中转服务账号

---

## 方式一：使用 OpenAI 官方 API

### 获取 API Key（SK）

**第一步：** 打开 https://platform.openai.com ，点击右上角 **"Log in"** 登录

![](https://pvtr2.pyvideotrans.com/images/63a5835289cb35ad8709c3bd8e2fc178.jpg)

**第二步：** 登录后，点击左侧 **锁形图标**，查看 API 信息

![](https://pvtr2.pyvideotrans.com/images/adfd9bbdb05fff7247cbdb8668e2fd3c.jpg)

**第三步：** 在右侧点击 **"Create new secret key"**，创建 Secret Key (SK)

![](https://pvtr2.pyvideotrans.com/images/719880580d0e835745b25ba37438381b.jpg)
![](https://pvtr2.pyvideotrans.com/images/f5e9534fb213016ebd9c2feff9ec10a5.jpg)

**第四步：** 可能会经过验证码验证后，弹出 Secret Key 创建文本框。**这个 Key 只显示一次，一旦关闭弹窗就无法再看到，请立即复制保存！**

![](https://pvtr2.pyvideotrans.com/images/e1a11af68a47a72897c66b791c915cd3.jpg)

### 在 pyVideoTrans 中配置

1. 点击左上角 **设置菜单** → **OpenAI/ChatGPT**
2. 在 **SK** 中填写你复制的 Secret Key
3. **API URL 保持为空**（使用官方账号时无需填写）
4. 选择要使用的模型（如 `gpt-4o`、`gpt-4o-mini` 等）
5. 点击 **测试**，成功后保存

![](https://pvtr2.pyvideotrans.com/images/11d56c675705d78302260bb21fbf3f30.jpg)

> **免费账号限制**：免费的 ChatGPT 账号虽然可以使用 API，但一分钟只有约 3 次请求，一旦超限就会各种报错，使用体验较差。建议升级为付费账号或使用第三方中转服务。

---

## 方式二：使用第三方中转 API

第三方中转服务很多，良莠不齐，也存在跑路风险，请自行选择，这里不做强制推荐。

### 获取密钥和 API URL

**第一步：** 在你选择的第三方平台注册并创建 API Key

![](https://pvtr2.pyvideotrans.com/images/69b78e1d90e42522e8f1d822b15af046.jpg)

**第二步：** 复制密钥，粘贴到 pyVideoTrans 的 **SK** 文本框中

![](https://pvtr2.pyvideotrans.com/images/8da5c64ec68d0543ac10b888ffb5bccb.jpg)

**第三步：** 获取第三方提供的 API URL（在他们的文档或客服处获取），填写到软件的 **"API URL"** 文本框中

![](https://pvtr2.pyvideotrans.com/images/b6269d1fd33da93ecead66cd5f009b46.jpg)

填写后的效果：

![](https://pvtr2.pyvideotrans.com/images/8f5508a51bbf32bb3a025903d3565609.jpg)

> **关键信息**：无论使用哪家第三方 API 服务，最核心的两个信息是：①密钥（SK / Secret Key）②第三方的 API URL 地址。

---

## 推荐配置

| 配置项 | 官方 API | 第三方中转 |
|--------|----------|------------|
| API URL | 留空 | 填写第三方提供的地址 |
| SK | 从 OpenAI 平台获取 | 从第三方平台获取 |
| 模型 | `gpt-4o`、`gpt-4o-mini` | 根据第三方支持选择 |
| 最大输出 Tokens | 8192（默认） | 根据需求调整 |

## 注意事项

1. **请求频率限制**：大多 AI 翻译渠道可能都会限制每分钟请求数量。如果报错提示超过请求频率，可在软件主界面中单击 **"翻译渠道↓"**，在弹窗中将 **暂停秒** 改为 10，即每一次翻译后等待 10 秒再发起下一次请求，一分钟最多 6 次，防止频率超限。

   ![](https://pvtr2.pyvideotrans.com/img/localllm04.jpg)

2. **翻译结果空白行过多**：如果所选模型不够智能（尤其是本地部署的小模型），无法准确按照指令要求返回符合格式的译文，可能会出现翻译结果有过多空白行。可尝试：
   - 使用更大的模型
   - 打开 **菜单** → **工具/选项** → **高级选项** → **使用AI翻译时发送完整字幕内容**，取消选中

   ![](https://pvtr2.pyvideotrans.com/img/localllm05.jpg)

3. **在沉浸式翻译中使用**：如果要将第三方 API 填写到"沉浸式翻译"中，需要在 API 地址后面加上 `/v1/chat/completions`，即 `第三方API地址/v1/chat/completions`。

## 常见问题

| 问题 | 原因 | 解决方案 |
|------|------|----------|
| "Authentication Error" | SK 填写错误或已过期 | 重新创建 Secret Key 并填写 |
| "Insufficient balance" | 账户余额不足 | 充值 OpenAI 账户 |
| 连接超时 | API URL 不正确或网络问题 | 检查 API URL 是否正确，确认网络可达 |
| "超过请求频率" | 请求过于频繁 | 增大翻译后暂停时间 |
| 翻译结果为空 | 模型不支持或格式问题 | 尝试更换模型，确认 API URL 正确 |
