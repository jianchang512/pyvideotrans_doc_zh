---
title: AzureTTS 配音渠道
date: 2024-01-22 14:33:00
description: 微软 Azure 提供的高质量 TTS 服务，效果自然，适合专业配音需求
---

## AzureTTS 配音渠道

**这是什么？**

AzureTTS 是微软 Azure 云平台提供的文字转语音服务，语音效果非常自然，支持 SSML 语义标记，适合对配音质量有专业要求的用户。

**前提条件：**
- 需要 Azure 账号（国内无法直接注册，需海外账号）
- 需要开通 Azure Speech Services
- 需要获取授权 Key 和区域信息

![AzureTTS 配音渠道](https://pvtr2.pyvideotrans.com/images/84e7ac3806364cc0a1e5e0c66d3be0e8~tplv-73owjymdk6-jj-mark_0_0_0_0_q75.webp)

## 第一步：开通 Azure Speech Services

1. 访问 [Azure 官网](https://portal.azure.com/) 并登录
2. 创建资源 → 搜索 "Speech Services"
3. 创建 Speech 资源，选择合适的区域（建议 **East Asia**）
4. 创建完成后，进入资源详情页

## 第二步：获取 Key 和区域

1. 在资源详情页，找到 "Keys and Endpoint"
2. 复制 **KEY 1** 或 **KEY 2**（任选一个）
3. 记住你的 **区域**（如 `eastasia`）

## 第三步：配置软件

1. 打开软件，进入 **菜单 → 设置 → AzureTTS**
2. 填写以下信息：
   - **授权 Key**：粘贴刚才复制的 Key
   - **区域**：填写 `EastAsia`（或其他你创建资源时选择的区域）
   - **自定义区域**：如无特殊需求，请留空
3. 点击测试按钮验证连接

![填写 Azure 配置](https://pvtr2.pyvideotrans.com/images/cfd2af7439244c26a09fbab4d3c45856~tplv-73owjymdk6-jj-mark_0_0_0_0_q75.webp)

## 第四步：选择配音角色

配置完成后，回到主界面：
1. 在 **配音渠道** 中选择 `AzureTTS`
2. 在 **目标语言** 中选择需要的语言
3. 在 **配音角色** 下拉框中选择角色
4. 可点击播放按钮试听效果

## 免费试用通道

从 v3.95 版本起，软件内置了一个基于 Azure 试听通道的免费配音渠道。该渠道：
- 可使用所有 Azure 音色
- **无需 Azure 账号**
- 可能不太稳定
- 有条件建议开通 Azure 收费服务以获得更好体验

## 支持的语言和角色

AzureTTS 支持全球 400+ 种语言和语音角色，包括：
- 中文（普通话、粤语、台湾语）
- 英语（美式、英式、澳式等）
- 日语、韩语
- 法语、德语、西班牙语
- 更多语言...

## 注意事项

- 国内无法直接注册 Azure 账号，需使用海外手机号或企业账号
- 按字符计费，大量使用前请了解 Azure 定价
- 区域选择影响延迟，建议选择离你最近的区域
- 如使用自定义区域，请确保与 Azure 资源所在区域一致

## 常见错误

| 错误信息 | 原因 | 解决方案 |
|----------|------|----------|
| Authentication error | Key 无效 | 检查 Key 是否正确复制 |
| Resource not found | 区域错误 | 确认区域与 Azure 资源一致 |
| Quota exceeded | 用量超限 | 检查 Azure 账号配额或升级套餐 |
