---
title: 在本地部署 DeepLX
date: 2024-01-22 14:33:00
description: 请注意，deeplx本质是伪装偷DeepL的api，不稳定，如果使用时出错，在确定部署无问题后，请更换其他翻译渠道
---

# DeepLX 本地部署翻译渠道

## 这是什么？

DeepLX 是一个开源项目，通过模拟 DeepL 客户端行为来调用 DeepL 的翻译接口，**无需 DeepL 官方 API 密钥**即可使用。但请注意，DeepLX 本质上是伪装调用 DeepL 的接口，**不稳定**，如果使用时出错，请在确认部署无问题后更换其他翻译渠道。

## 前置条件

- 已下载 DeepLX 可执行文件（从 GitHub Releases 下载）

## 部署步骤

**第一步：下载 DeepLX**

前往 https://github.com/OwO-Network/DeepLX/releases ，根据你的操作系统选择对应的版本下载：

![下载页面](https://pvtr2.pyvideotrans.com/images/image-20231117104414564.png)

| 操作系统 | 文件名 |
|----------|--------|
| Windows 64位 | `deeplx_windows_amd64.exe` |
| macOS (Intel) | `deeplx_darwin_amd64` |
| macOS (Apple Silicon) | `deeplx_darwin_arm64` |
| Linux | `deeplx_linux_amd64` |

**第二步：运行 DeepLX**

以 Windows 为例，双击 `deeplx_windows_amd64.exe` 打开，显示以下界面即代表部署成功：

![运行成功](https://pvtr2.pyvideotrans.com/images/image-20231117104537697.png)

其中 `1188` 是本地监听端口。

**第三步：在 pyVideoTrans 中配置**

1. 打开菜单栏 → **翻译设置** → **DeepLX 设置界面**
2. 在 **API URL** 中填写 `http://127.0.0.1:1188`（即 `http://127.0.0.1:端口号`）
3. 点击 **测试** 按钮验证连接
4. 测试通过后保存

![配置界面](https://pvtr2.pyvideotrans.com/images/image-20231117104740347.png)

## 推荐配置

| 配置项 | 推荐值 |
|--------|--------|
| API URL | `http://127.0.0.1:1188`（默认端口） |
| API Key | 留空（DeepLX 通常不需要密钥） |

## 注意事项

1. **不稳定**：DeepLX 依赖 DeepL 的非官方接口，随时可能失效，不建议作为主要翻译渠道
2. **需要保持运行**：DeepLX 程序必须保持运行状态，关闭后翻译将无法使用
3. **端口冲突**：如果默认端口 `1188` 被占用，程序会自动使用其他端口，请查看运行界面中的实际端口号

大多 AI 翻译渠道可能都会限制每分钟请求数量。如果使用中报错提示超过请求频率，可通过软件 **菜单** → **工具/选项** → **高级选项** → **翻译后暂停时间** 来设置一个秒数（比如 30），避免超过限制频率报错。

![翻译后暂停时间设置](https://pvtr2.pyvideotrans.com/images/fanyidjs.webp)

## 常见问题

| 问题 | 原因 | 解决方案 |
|------|------|----------|
| 连接被拒绝 | DeepLX 未启动 | 确保 DeepLX 程序正在运行 |
| 翻译报错 | DeepLX 接口已失效 | 尝试更新 DeepLX 到最新版本，或更换其他翻译渠道 |
| 端口号不对 | DeepLX 使用了非默认端口 | 查看 DeepLX 运行界面显示的实际端口 |
| 翻译结果为空 | DeepLX 服务异常 | 重启 DeepLX 程序 |
