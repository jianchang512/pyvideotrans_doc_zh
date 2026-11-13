---
title: ElevenLabs语音合成
date: 2024-01-22 14:33:00
description: ElevenLabs是一个人工智能语音平台(有免费额度)，提供尖端的AI语音合成技术，支持多语言、声音克隆和实时语音生成
---

## ElevenLabs 配音渠道

**这是什么？**

ElevenLabs 是一个领先的 AI 语音合成平台，提供极其逼真、富有表现力的人工智能声音。支持多语言、声音克隆和自定义音色创建。号称是 AI 语音领域最顶尖的服务之一。

**优点：**
- 有免费额度可用
- 语音质量业界领先
- 支持声音克隆
- 支持多语言
- 可自定义创建音色

## 注册登录

### 第一步：访问官网

打开浏览器，访问 [ElevenLabs 官网](https://elevenlabs.io/)

![ElevenLabs 官网](https://pvtr2.pyvideotrans.com/img/20241129170353-0.webp)

### 第二步：注册账号

1. 点击右上角 **LOG IN** 或 **GO TO APP** 按钮
2. 如果已有账号或有 Google/GitHub 账号，可直接登录
3. 如果没有，点击下方 **Sign up** 注册

![注册页面](https://pvtr2.pyvideotrans.com/img/20241129170354-1.webp)

![填写注册信息](https://pvtr2.pyvideotrans.com/img/20241129170354-2.webp)

## 获取 API Key

### 第一步：进入 API Keys 页面

注册登录后，访问：https://elevenlabs.io/app/settings/api-keys

![API Keys 页面](https://pvtr2.pyvideotrans.com/img/20241129170355-3.webp)

### 第二步：创建并复制 Key

1. 系统会自动创建一个 API Key
2. **立即复制并保存**，Key 只显示一次，后续不再显示

![复制 API Key](https://pvtr2.pyvideotrans.com/img/20241129170355-4.webp)

## 在翻译软件中使用

### 第一步：填写 API Key

1. 打开视频翻译软件
2. 进入 **菜单 → TTS设置 → Elevenlabs.io**
3. 将上一步复制的 API Key 填入
4. 点击 **测试** 按钮
5. 如果提示 OK，点击 **保存**

![填写 API Key](https://pvtr2.pyvideotrans.com/img/20241129170356-5.webp)

### 第二步：选择配音角色

1. 回到软件主界面
2. 在 **配音渠道** 中选择 `Elevenlabs.io`
3. 在 **配音角色** 中选择想使用的角色

![选择配音角色](https://pvtr2.pyvideotrans.com/img/20241129170356-6.webp)

> **注意**：免费账号有频率限制，为避免超出频率出错，请修改并发数和每次配音后暂停时长。

![调整并发设置](https://pvtr2.pyvideotrans.com/img/20241129170357-7.webp)

## 选择想使用的音色

ElevenLabs 有几千种音色，默认可免费使用约十来种，也可以自行创建音色。

### 添加音色

1. 访问 [Voice Lab](https://elevenlabs.io/app/voice-lab)
2. 选择想使用的音色
3. 点击 **+Add** 添加到自己的音色列表

> **注意**：免费账号最多只能添加 3 个自定义音色

![添加音色](https://pvtr2.pyvideotrans.com/img/20241129170357-8.webp)

### 更新角色列表

添加或删除音色后，需要在视频翻译中更新角色列表：

1. 打开 **菜单 → TTS设置 → Elevenlabs.io**
2. 点击 **测试并更新角色**
3. 等待完成，若未报错请保存
4. 到主界面，如果当前配音渠道不是 `Elevenlabs.io` 则直接切换过来；如果已是，请先切换到其他渠道再切换回来

## 创建自定义角色

如果没有想要的角色，可以自定义生成新的角色：

![创建自定义角色](https://pvtr2.pyvideotrans.com/img/20241129170357-9.webp)

1. 点击创建按钮，弹出自定义框
2. 上方框填写音色要求（描述你想要的声音特征）
3. 下方填写阅读文字（用于试听效果）

![填写自定义信息](https://pvtr2.pyvideotrans.com/img/20241129170358-10.webp)

## 克隆配音

在配音角色里选择 **clone**，表示使用原始视频里的音色进行配音。

> **重要**：该功能需要 ElevenLabs.io 的 **付费会员** 才可用，否则不要使用，必然出错。

如需使用，可升级账号：https://elevenlabs.io/app/subscription

你也可以在他们网站免费试用该功能（上传视频），但生成结果会存在水印。

地址：https://elevenlabs.io/app/dubbing

![克隆配音](https://pvtr2.pyvideotrans.com/img/20241129170358-11.webp)

![试用克隆](https://pvtr2.pyvideotrans.com/img/20241129170359-12.webp)

## 常见问题

| 问题 | 解决方案 |
|------|----------|
| 测试失败 | 检查 API Key 是否正确；确认账号有效 |
| 提示频率限制 | 降低并发数，增加配音后暂停时长 |
| 找不到想要的音色 | 到 Voice Lab 添加更多音色 |
| 克隆功能不可用 | 需要付费会员才能使用 |
