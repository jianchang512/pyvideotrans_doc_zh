---
title: Google翻译渠道
date: 2024-01-22 14:33:00
description: 完全免费的翻译渠道，无需API密钥，但需要网络代理才能在国内使用
---

# Google 翻译渠道

## 这是什么？

Google翻译是 pyVideoTrans 中**完全免费**的翻译渠道，无需注册账号、无需API密钥、不限制调用频率。它通过 Google Translate 的移动端网页接口进行翻译，适合预算有限或只是偶尔使用的用户。

## 前置条件

- **网络代理**：由于国内无法直接访问 Google 服务，你必须在软件中配置网络代理地址才能使用
- 无需任何 API Key 或账号

## 配置步骤

**第一步：准备代理工具**

确保你的电脑上已安装并运行了代理工具，例如：
- **v2ray**：默认代理端口为 `10808`
- **clash**：默认代理端口为 `7890`
- 其他代理工具：请查看对应的本地代理端口

**第二步：在软件中配置**

1. 打开 pyVideoTrans 软件
2. 在主界面的 **翻译渠道** 下拉菜单中选择 **Google**
3. 点击菜单栏 → **翻译设置** → **Google翻译设置**
4. 在 **网络代理地址** 中填写你的代理地址，例如：
   - v2ray 用户填写：`http://127.0.0.1:10808`
   - clash 用户填写：`http://127.0.0.1:7890`
5. 点击 **测试** 按钮验证是否连通
6. 测试通过后保存设置

> **注意**：即便你开启了系统全局代理，软件也未必会走该代理，请务必在软件中单独填写代理地址。

![](https://pvtr2.pyvideotrans.com/1743258438408_image.png)

## 新增目标语言

在批量字幕翻译功能中，默认只显示常用的目标语言。如果你想新增其他语言（如维吾尔语、希伯来语等），可以按以下步骤操作：

> **注意**：只有使用 **Google** 或 **FreeGoogle** 翻译渠道时，才能新增目标语言，其他渠道不支持。

**第一步**：打开菜单 → **工具/选项** → **高级选项**

**第二步**：在打开的窗口中找到 **"Google翻译新增语言代码"** 文本框

**第三步**：填写目标语言的语言代码，多个语言用英文逗号分隔。例如：
- 新增维吾尔语：填写 `ug`
- 同时新增维吾尔语和希伯来语：填写 `ug,he`

![](https://pvtr2.pyvideotrans.com/images/google-01.webp)

**语言代码在哪里找？**

访问 Google 官方文档查看所有支持的语言代码：

https://cloud.google.com/translate/docs/languages?hl=zh-cn

![](https://pvtr2.pyvideotrans.com/images/google-02.webp)
![](https://pvtr2.pyvideotrans.com/images/google-03.webp)
![](https://pvtr2.pyvideotrans.com/images/google-04.webp)
![](https://pvtr2.pyvideotrans.com/images/google-05.webp)
![](https://pvtr2.pyvideotrans.com/images/google-06.webp)
![](https://pvtr2.pyvideotrans.com/images/google-07.webp)

## 推荐配置

| 配置项 | 推荐值 |
|--------|--------|
| 翻译渠道 | Google |
| 网络代理地址 | `http://127.0.0.1:你的代理端口` |
| 源语言 | auto（自动检测） |

## 常见问题

| 问题 | 原因 | 解决方案 |
|------|------|----------|
| 翻译报错 "Google Translate error" | 代理未配置或代理地址填写错误 | 检查代理是否运行，重新填写正确的代理地址 |
| 连接超时 | 代理工具未开启，或端口号不正确 | 确认代理工具已启动，核对端口号 |
| 翻译结果为乱码 | 代理不稳定导致返回异常 | 尝试更换代理节点或稍后重试 |
