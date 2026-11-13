---
title: 本地大模型 及 兼容AI接口的使用方法
date: 2024-01-22 14:33:00
description: 本地大模型 及 兼容OpenAI ChatGPT接口的国产AI使用方法
---

# 兼容AI / 本地大模型 翻译渠道

## 这是什么？

在 pyVideoTrans 中，AI 大模型可以作为高效的翻译渠道，通过关联上下文来显著提升翻译质量。**兼容AI/本地模型** 渠道支持所有兼容 OpenAI ChatGPT 接口的 AI 服务，包括：

- 国内 AI 平台（月之暗面、百川智能、零一万物等）
- 本地部署的大模型（通过 Ollama、LM Studio 等）
- 任何兼容 OpenAI 接口的第三方服务

## 前置条件

- pyVideoTrans 软件
- 对应 AI 平台的 API Key（在线服务）或本地模型（离线使用）

---

## 使用国内 AI 平台

### 月之暗面 Moonshot AI

1. 打开菜单栏 → **翻译设置** → **OpenAI ChatGPT API 设置界面**
2. 在 **API接口地址** 中填写：`https://api.moonshot.cn/v1`
3. 在 **SK** 中填写从 Moonshot 平台获取的 API Key（获取地址：https://platform.moonshot.cn/console/api-keys ）
4. 在 **模型文本框** 中填写：`moonshot-v1-8k,moonshot-v1-32k,moonshot-v1-128k`
5. 在选择模型中选中想使用的模型
6. 点击 **测试**，成功后保存

![](https://pvtr2.pyvideotrans.com/img/localllm02.jpg)

### 百川智能 AI

1. 打开菜单栏 → **翻译设置** → **OpenAI ChatGPT API 设置界面**
2. 在 **API接口地址** 中填写：`https://api.baichuan-ai.com/v1`
3. 在 **SK** 中填写从百川平台获取的 API Key（获取地址：https://platform.baichuan-ai.com/console/apikey ）
4. 在 **模型文本框** 中填写：`Baichuan4,Baichuan3-Turbo,Baichuan3-Turbo-128k,Baichuan2-Turbo`
5. 在选择模型中选中想使用的模型
6. 点击 **测试**，成功后保存

![](https://pvtr2.pyvideotrans.com/img/localllm07.jpg)

### 零一万物

| 配置项 | 值 |
|--------|-----|
| API URL | `https://api.lingyiwanwu.com/v1` |
| API Key | 从 https://platform.lingyiwanwu.com/apikeys 获取 |
| 模型 | `yi-lightning` |

---

## 使用 Ollama 本地部署大模型

### 第一步：安装 Ollama

1. 打开 https://ollama.com/download
2. 下载对应操作系统的安装包

![](https://pvtr2.pyvideotrans.com/images/4336c48c4ec11563f33fbc09baa07f37.jpg)

3. 双击安装包，点击 **Install** 完成安装

![](https://pvtr2.pyvideotrans.com/images/9beedd165d61e4d98acda548b566dbce.jpg)

### 第二步：下载模型

安装完成后会自动弹出命令窗口，输入以下命令下载通义千问模型：

```
ollama run qwen
```

![](https://pvtr2.pyvideotrans.com/images/f17c24ee244a265dd011e81da873e91d.jpg)

等待模型下载完成（无需代理，速度较快）：

![](https://pvtr2.pyvideotrans.com/images/ca247a0885e0e7ba85cbb2e401ef13e9.jpg)

当显示 **"Success"** 时，表示模型部署完成。

![](https://pvtr2.pyvideotrans.com/images/3821569aa36c3500a80bc91eda4604bf.jpg)

> 默认接口地址是 `http://localhost:11434`

> **如何重新打开命令窗口？** 按 `Win+Q` 输入 `cmd` 搜索，打开命令提示符，输入 `ollama run qwen` 即可。

![](https://pvtr2.pyvideotrans.com/images/d7cf385d319c76e2d022bf1435792b91.jpg)
![](https://pvtr2.pyvideotrans.com/images/7f905d54b5897ea7d7b2e3ddf35d86f5.jpg)

### 第三步：可选 - 安装图形化界面

如果命令行界面不太友好，可以安装 ChatBox 获取更好的 UI 体验：

1. 打开 https://chatboxai.app/zh 下载安装

![](https://pvtr2.pyvideotrans.com/images/3904ad609152bd04c4a9828f6c052139.jpg)

2. 安装后打开，点击 **"开始设置"**
3. 在设置中：AI模型提供方选择 **"Ollama"**，API域名填写 `http://localhost:11434`，模型选择 `Qwen:latest`
4. 保存后即可使用

![](https://pvtr2.pyvideotrans.com/images/46abcc4ba32f70e1f38fda21b63370fa.jpg)

### 第四步：在 pyVideoTrans 中配置

1. 打开 **菜单** → **设置** → **兼容OpenAI及本地大模型**
2. 在中部文本框中添加模型名称，如 `qwen`（多个模型用逗号分隔）
3. 在 **API URL** 中填写：`http://localhost:11434/v1`
4. **SK 随意填写**，例如 `1234`
5. 选择要使用的模型
6. 点击 **测试**，成功后保存

![](https://pvtr2.pyvideotrans.com/images/d6205374bac7450c0d7aa970cccdbd75.jpg)
![](https://pvtr2.pyvideotrans.com/img/localllmv1.webp)

### 第五步：使用其他模型

除了通义千问，Ollama 还支持很多模型。使用方法一样简单：

1. 打开 https://ollama.com/library 查看所有可用模型
2. 复制模型名称
3. 在命令窗口执行 `ollama run 模型名称`

例如安装 `openchat` 模型：

```
ollama run openchat
```

![](https://pvtr2.pyvideotrans.com/images/b19ff4885be54bf6b8e8b2dae25c4d47.jpg)

![](https://pvtr2.pyvideotrans.com/images/d5d4dc2c6055830ceba20eb2c809ab90.jpg)

![](https://pvtr2.pyvideotrans.com/images/7dfb0cab90a5a43c389beadbeb48d2b2.jpg)

---

## 注意事项

1. **请求频率限制**：大多 AI 翻译渠道可能都会限制每分钟请求数量。如果报错提示超过请求频率，可在软件主界面中单击 **"翻译渠道↓"**，在弹窗中将 **暂停秒** 改为 10，即每一次翻译后等待 10 秒再发起下一次请求，一分钟最多 6 次。

![](https://pvtr2.pyvideotrans.com/img/localllm04.jpg)

2. **翻译结果空白行过多**：如果所选模型不够智能（尤其是本地部署的小模型），无法准确按照指令要求返回符合格式的译文，可能会出现翻译结果有过多空白行。可尝试：
   - 使用更大的模型
   - 打开 **菜单** → **工具/选项** → **高级选项** → **使用AI翻译时发送完整字幕内容**，取消选中

![](https://pvtr2.pyvideotrans.com/img/localllm05.jpg)

## 常见问题

| 问题 | 原因 | 解决方案 |
|------|------|----------|
| 连接 Ollama 失败 | Ollama 未启动 | 确保 Ollama 服务正在运行（端口 11434） |
| API URL 填写错误 | 格式不正确 | 本地模型填写 `http://localhost:11434/v1` |
| 翻译结果为空 | 模型能力不足 | 尝试更大的模型（如 14B、32B 版本） |
| 本地模型翻译慢 | 硬件资源不足 | 使用 GPU 加速，或选择更小的模型 |
