---
title: LibreTranslate开源的机器翻译 API
date: 2024-01-22 14:33:00
description: LibreTranslate 是一款免费和开源的机器翻译 API，自托管、支持离线且易于设置
---

# LibreTranslate 翻译渠道

## 这是什么？

LibreTranslate 是一款**免费开源**的机器翻译 API，支持自托管和离线使用。你可以选择：
- **使用官方付费 API**：简单快捷，无需部署
- **本地自建部署**：完全免费，数据私密，但需要一定的技术能力

## 前置条件

- pyVideoTrans **v3.00** 或更高版本
- 方式一：LibreTranslate 官方 API Key（付费购买）
- 方式二：本地部署 LibreTranslate 服务

---

## 方式一：使用 LibreTranslate 官方 API

**第一步：获取 API Key**

1. 访问 https://portal.libretranslate.com/ 注册并登录
2. 购买 API Key（有免费试用额度）
3. 复制 API Key

**第二步：在 pyVideoTrans 中配置**

1. 打开菜单栏 → **翻译设置** → **LibreTranslate API**
2. 在 **API URL** 中填写：`https://libretranslate.com/translate`
3. 在 **API Key** 中填写你购买的 API Key
4. 点击 **测试** 按钮验证连接
5. 测试通过后保存

![LibreTranslate配置](https://pvtr2.pyvideotrans.com/img/20241103162244-0.webp)

![API地址和Key](https://pvtr2.pyvideotrans.com/img/20241103162245-1.webp)

---

## 方式二：本地自建部署

### 快速部署（Docker 方式）

如果你已安装 Docker，可以一行命令启动：

```bash
docker run -ti --rm -p 5000:5000 libretranslate/libretranslate
```

启动后，在 pyVideoTrans 中填写 API URL 为：`http://127.0.0.1:5000`

### 手动部署

请参考 LibreTranslate 官方文档：https://github.com/LibreTranslate/LibreTranslate?tab=readme-ov-file#install-and-run

---

## 推荐配置

| 配置项 | 官方 API | 本地部署 |
|--------|----------|----------|
| API URL | `https://libretranslate.com/translate` | `http://127.0.0.1:5000` |
| API Key | 从 LibreTranslate 购买 | 留空（默认无需密钥） |

## 支持的语言

LibreTranslate 支持 50+ 种语言的互译，完整列表请查看：https://libretranslate.com/languages

## 相关地址

- 开源地址：https://github.com/LibreTranslate/LibreTranslate
- 官方 API 服务：https://libretranslate.com/
- 购买 API Key：https://portal.libretranslate.com/
- 支持的语言列表：https://libretranslate.com/languages

## 常见问题

| 问题 | 原因 | 解决方案 |
|------|------|----------|
| 连接失败 | 本地服务未启动 | 确保 LibreTranslate 服务正在运行 |
| "API Key required" | 使用官方 API 但未填写 Key | 填写有效的 API Key |
| 翻译速度慢 | 本地部署硬件资源不足 | 使用更大内存的机器，或使用官方 API |
| 不支持某些语言 | 语言不在支持列表中 | 查看官方语言列表确认支持 |
