---
title: 自定义 翻译 api
date: 2024-01-22 14:33:00
description: 自定义 翻译 api
---

# 自定义翻译 API 渠道

## 这是什么？

pyVideoTrans 支持接入你自己的翻译 API 服务。如果你已经搭建了翻译接口，或者使用了第三方提供的自定义翻译服务，可以通过此渠道对接。软件会以 **GET 请求** 向你填写的 API 地址发送翻译请求。

## 前置条件

- 一个可用的翻译 API 接口
- 接口需要返回指定格式的 JSON 数据

## API 接口规范

### 请求方式

软件向填写的 API 地址发送 **GET 请求**，参数格式为 `application/x-www-form-urlencoded`。

### 请求参数

| 参数名 | 类型 | 说明 |
|--------|------|------|
| `text` | string | 需要翻译的文本（URL 编码后发送） |
| `source_language` | string | 原始语言代码，如 `zh`、`en`、`ja` 等 |
| `target_language` | string | 目标语言代码，如 `zh`、`en`、`ja` 等 |
| `secret` | string | 可选，API 密钥（在设置中配置） |

### 支持的语言代码

`zh`、`en`、`ja`、`ko`、`ru`、`de`、`fr`、`tr`、`th`、`vi`、`ar`、`hi`、`hu`、`es`、`pt`、`it`

### 响应格式

接口需要返回 JSON 格式数据：

```json
{
    "code": 0,
    "msg": "ok",
    "text": "翻译后的文本"
}
```

| 字段 | 说明 |
|------|------|
| `code` | 状态码，`0` 表示成功，`>0` 表示失败 |
| `msg` | 状态信息，成功时为 `ok`，失败时为错误原因 |
| `text` | 翻译后的文本（成功时返回） |

## 在 pyVideoTrans 中配置

1. 打开菜单栏 → **翻译设置** → **自定义翻译 API 设置**
2. 在 **API URL** 中填写你的翻译接口地址
   - 例如：`https://your-api.com/translate`
   - 软件会自动拼接参数，无需手动添加 query string
3. 可选：在 **Secret** 中填写 API 密钥
4. 点击 **测试** 按钮验证接口是否正常
5. 测试通过后保存

## 示例：使用开源翻译 API

基于 Cloudflare 和 M2M100 实现的免费翻译 API 可参考：
https://github.com/jianchang512/translate-api

部署后将其地址填写到 pyVideoTrans 的自定义翻译 API 中即可使用。

## 常见问题

| 问题 | 原因 | 解决方案 |
|------|------|----------|
| 连接失败 | API URL 填写错误 | 检查 URL 格式是否正确，确认接口可达 |
| 返回格式错误 | 接口返回格式不符合规范 | 确认返回 JSON 包含 `code`、`msg`、`text` 字段 |
| 翻译结果为空 | `text` 字段为空 | 检查接口逻辑是否正确处理了翻译请求 |
| 频繁报错 | 接口有频率限制 | 增大翻译后暂停时间 |
