---
title: XAI TTS配音渠道
date: 2024-01-22 14:33:00
description: X.AI Grok TTS 配音渠道，支持16种语言
---

## X.AI TTS 配音渠道

**这是什么？**

X.AI TTS 是 x.ai（Elon Musk 的 AI 公司）推出的语音合成服务，基于 Grok 模型。支持多种语言，音色独特。

**前提条件：**
- 需要 x.ai 付费订阅账号
- 需要获取 API Key
- v3.98-319+ 版本

![](https://pvtr2.pyvideotrans.com/1773843810275_image.png)

![](https://pvtr2.pyvideotrans.com/1773844017555_image.png)

## 第一步：获取 API Key

1. 访问：https://console.x.ai
2. 点击左侧 **API Keys**
3. 创建并复制你的 API Key

## 第二步：配置软件

1. 打开软件，进入 **菜单 → TTS设置 → X.AI TTS**
2. 粘贴 API Key
3. 点击 **测试** 按钮
4. 如果无报错并且发出声音，说明成功
5. 点击 **保存**

## 第三步：使用配音

1. 回到主界面
2. 在 **配音渠道** 中选择 `X.AI`
3. 选定目标语言
4. 选择配音角色
5. 开始配音

## 可用角色

X.AI TTS 提供以下 5 个音色：
- `eve` - 女声
- `ara` - 女声
- `rex` - 男声
- `sal` - 男声
- `leo` - 男声

## 支持的语言

X.AI TTS 支持以下 16 种语言：
- 中文、英语、法语、德语
- 意大利语、日语、韩语、俄语
- 西班牙语、土耳其语、越南语
- 印地语、印尼语、孟加拉语
- 阿拉伯语、葡萄牙语

> **注意**：
> - 阿拉伯语固定使用 `沙特阿拉伯语`
> - 葡萄牙语使用 `葡萄牙语(葡萄牙)`
> - 西班牙语固定使用 `西班牙语(西班牙)`

## 注意事项

- **必须付费**：你需要开通 x.ai 的付费订阅才可使用
- **不支持中转站**：如果你使用中转站，请将相关信息填写到 `菜单 → TTS设置 → openai及兼容` 设置中
- API 地址为：`https://api.x.ai/v1/tts`

## 常见错误

| 错误信息 | 原因 | 解决方案 |
|----------|------|----------|
| Authentication error | API Key 无效 | 检查 Key 是否正确 |
| Payment required | 未开通付费订阅 | 开通 x.ai 付费账号 |
| Connection error | 网络问题 | 检查网络连接 |
| Unsupported language | 语言不在支持列表 | 选择支持的语言 |
