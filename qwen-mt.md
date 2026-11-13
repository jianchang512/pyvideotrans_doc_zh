---
title: Qwen-MT/Qwen3-ASR作为翻译模型和语音识别模型
date: 2025-09-07 14:33:00
description: Qwen-MT模型是基于通义千问模型优化的机器翻译大语言模型，支持92个语种
---

::: danger 新手或不熟悉阿里百炼的用户，不建议使用
阿里百炼的API非常混乱，所选地域不同(如华北2、新加坡、华东等)可使用的模型不同，需要配置的API地址也不同；
API KEY 分地域，不同地域的不通用；
更改所选模型，可能需要更换调用端口；
使用中会遇到很多莫名其妙问题。
:::


# 阿里百炼API / Qwen-MT Qwen-ASR 渠道

## 这是什么？

阿里百炼（DashScope）提供多种 AI 模型，其中：
- **Qwen-MT 系列**（`qwen-mt-plus`、`qwen-mt-turbo`）：专门为机器翻译优化的大语言模型，支持 **92 个语种**互译，提供术语干预、领域提示、记忆库等能力
- **Qwen 文本生成模型**（`qwen-plus`、`qwen-turbo` 等）：通用大语言模型，也可用于字幕翻译
- **Qwen3-ASR**：用于语音识别（STT）


## 前置条件

- pyVideoTrans 软件
- 阿里百炼平台账号（用于获取 API Key）



## API Key 获取步骤

**第一步：注册并登录阿里百炼平台**

打开 https://bailian.console.aliyun.com/?tab=model#/api-key ，使用阿里云账号登录。

**第二步：创建 API Key**

1. 登录后进入 API Key 管理页面
2. 点击 **"创建 API Key"** 按钮
3. 复制生成的 API Key

**第三步：开通模型服务**

首次使用需要开通对应模型的访问权限，在百炼控制台中完成开通即可。

## 在 pyVideoTrans 中配置

1. 打开菜单栏 → **翻译设置** → **阿里百炼（Open-MT）**
2. 在 **API Key** 中填写从百炼平台获取的 API Key
3. 点击页面右上角`业务空间`，复制当前所用业务空间ID，回到 pyVideoTrans，粘贴到 `TTS设置 → Qwen TTS`的业务空间ID中
![](https://pvtr2.pyvideotrans.com/1783523420003_image.png)

4. 点击 **测试** 按钮验证连接
5. 测试通过后保存

![](https://pvtr2.pyvideotrans.com/1757460782133_image.png)

---

## 使用 Qwen-MT 模型翻译字幕（推荐）

Qwen-MT 是专门为机器翻译优化的模型，翻译质量更高。

**可选模型：**

| 模型 | 特点 |
|------|------|
| `qwen-mt-plus` | 高质量翻译，适合专业场景 |
| `qwen-mt-turbo` | 翻译速度更快，性价比高 |

1. 在模型选择框中选择 `qwen-mt-plus` 或 `qwen-mt-turbo`
2. 主界面 **翻译渠道** 中选择 **阿里百炼**

> Qwen-MT 模型支持术语干预和领域提示，可提升专业领域的翻译效果。详细信息请参考：https://bailian.console.aliyun.com/?tab=doc#/doc/?type=model&url=2860790

## 使用 Qwen 文本生成模型翻译字幕

除了 Qwen-MT，通用的 Qwen 文本生成模型也可用于字幕翻译：

| 模型 | 说明 |
|------|------|
| `qwen-plus` | 通用高质量模型 |
| `qwen-turbo` | 通用快速模型 |

在模型选择框中选择对应模型即可。

![](https://pvtr2.pyvideotrans.com/1757460831763_image.png)

## 使用 Qwen3-ASR 做语音识别

同样是使用阿里百炼的 API，在 **翻译设置** → **阿里百炼** 中填写好 API Key 并选择语音识别模型，然后在 **语音识别** 渠道内选择 **Qwen3-ASR** 即可。

![](https://pvtr2.pyvideotrans.com/1757460938586_image.png)

## 推荐配置

| 配置项 | 推荐值 |
|--------|--------|
| API Key | 从阿里百炼平台获取 |
| 翻译模型 | `qwen-mt-turbo`（日常翻译）或 `qwen-mt-plus`（高质量翻译） |
| 语音识别模型 | `qwen3-asr` |

## 常见问题

| 问题 | 原因 | 解决方案 |
|------|------|----------|
| "Authentication Error" | API Key 填写错误 | 重新从百炼平台获取 API Key |
| "模型不存在" | 模型名称填写错误 | 使用上方推荐的模型名称 |
| 翻译结果为空 | 模型未开通或余额不足 | 在百炼控制台确认模型已开通并充值 |
| 使用多模态模型报错 | 选择了非文本模型 | Qwen-MT 翻译需要使用纯文本模型，不要选择多模态模型 |
