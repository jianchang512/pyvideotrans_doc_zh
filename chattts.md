---
title: 使用 ChatTTS-ui项目
date: 2024-01-22 14:33:00
description: 下载 部署 ChatTTS-ui项目，实现本地高质量中文语音合成
---

## ChatTTS 配音渠道

**这是什么？**

ChatTTS 是一个开源的中文语音合成项目，可以部署在本地运行，提供高质量的中文语音合成效果。通过 ChatTTS-ui 项目提供 Web 界面和 API 接口。

**优点：**
- 完全本地运行，无需联网
- 中文语音效果优秀
- 免费开源

## 前提条件

- 需要先部署并启动 ChatTTS-ui 项目
- 需要 NVIDIA 显卡（推荐）
- 需要足够的显存（建议 4GB+）

## 第一步：下载或部署 ChatTTS-ui 项目

### 方式一：下载预打包版（推荐）

1. 访问 [ChatTTS-ui Releases](https://github.com/jianchang512/ChatTTS-ui/releases/)
2. 下载最新的 Windows 预打包版本
3. 解压后双击 `start.bat` 启动

### 方式二：源码部署

1. 克隆项目：`git clone https://github.com/jianchang512/chattts-ui`
2. 安装依赖并启动

详细部署方法请参考：[ChatTTS 部署方法](/depychattts)

## 第二步：启动 ChatTTS-ui

1. 双击 `start.bat`（预打包版）或运行 `python app.py`（源码版）
2. 等待启动完成
3. 默认 HTTP 地址：`http://127.0.0.1:9966`

## 第三步：在视频翻译软件中配置

1. 打开视频翻译软件
2. 进入 **菜单 → 设置 → ChatTTS地址**
3. 填写 ChatTTS-ui 的 HTTP 地址：
   ```
   http://127.0.0.1:9966
   ```
4. 点击测试按钮验证连接
5. 保存设置

## 第四步：使用 ChatTTS 配音

1. 回到主界面
2. 在 **配音渠道** 中选择 `ChatTTS`
3. 在 **配音角色** 中选择音色
4. 点击配音按钮开始

## 注意事项

- ChatTTS-ui 必须保持运行状态，视频翻译软件才能正常使用
- 默认地址为 `http://127.0.0.1:9966`，如果修改了端口请相应调整
- 如果 ChatTTS-ui 部署在其他机器上，请将 `127.0.0.1` 替换为对应 IP 地址
- 首次使用可能需要下载模型，请确保网络通畅

## 常见错误

| 错误信息 | 原因 | 解决方案 |
|----------|------|----------|
| Connection refused | ChatTTS-ui 未启动 | 确保 ChatTTS-ui 已启动并正常运行 |
| API URL error | 地址填写错误 | 检查地址格式，确保包含 `http://` |
| Connection timeout | 网络问题 | 检查网络连接和防火墙设置 |
