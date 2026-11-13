---
title: deepgram.com 语音识别api使用
date: 2024-01-22 14:33:00
description: 在 v2.92后，新增了 deepgram.com 的语音识别api支持，这是一个国外AI服务，注册即赠送200美元额度，足够用一段时间了
---

## deepgram.com 语音识别API使用指南

### 什么是Deepgram语音识别？

Deepgram是一个提供云端语音识别服务的AI平台。在pyVideoTrans v2.92版本后，我们集成了Deepgram的API，让用户可以利用其强大的语音识别能力将视频中的语音转换为字幕。Deepgram支持多种语言，包括中文，并提供注册即赠200美元免费额度的优惠。

### 前提条件

- 一个有效的电子邮箱地址，用于注册Deepgram账号
- 稳定的网络连接
- pyVideoTrans软件版本 v2.92 或更高

### 注册与获取API Key

1. 打开Deepgram官网：https://deepgram.com/ ，点击注册按钮创建账号。
2. 注册完成后，登录并进入控制台：https://console.deepgram.com/

   ![](https://pvtr2.pyvideotrans.com/img/deepgram0.jpg)

3. 在控制台中，点击绿色的“Create API Key”按钮。

   ![](https://pvtr2.pyvideotrans.com/img/deepgram0-1.jpg)

4. 在弹出的窗口中，在第一个文本框内随意输入一个名称（如“pyVideoTrans”），然后点击底部的“Create API Key”按钮。

   ![](https://pvtr2.pyvideotrans.com/img/deepgram1.jpg)

5. 生成的API Key会显示在屏幕上，请务必复制并妥善保存。这个Key将用于在pyVideoTrans中配置Deepgram服务。

   ![](https://pvtr2.pyvideotrans.com/img/deepgram2.jpg)

### 在pyVideoTrans中配置Deepgram

1. 打开pyVideoTrans软件，进入菜单栏的“语音识别设置”，选择“Deepgram”选项。

   ![](https://pvtr2.pyvideotrans.com/img/deepgram1-1.jpg)

2. 在配置窗口中：
   - **API Key**：粘贴上一步复制的Deepgram API Key。
   - **静默时长**：默认值为200毫秒。可根据视频语速调整：
     - 语速较快：适当降低到150毫秒
     - 语速较慢或静音较多：适当提高到500或800毫秒

3. 点击保存按钮完成配置。

### 支持的模型与选项

Deepgram支持多种语音识别模型，包括：
- **nova-3**：最新模型，识别准确度最高
- **whisper系列**：whisper-large、whisper-medium、whisper-small、whisper-base、whisper-tiny（基于OpenAI的Whisper模型）
- **nova-2**：上一代Nova模型
- **enhanced**：增强版模型
- **base**：基础模型

对于中文识别，建议选择nova-3或whisper-large以获得最佳效果。

高级选项包括：
- **smart_format**：智能格式化，自动添加标点符号
- **punctuate**：启用标点恢复
- **paragraphs**：按段落分割
- **utterances**：按语句分割
- **diarize**：说话人分离，可区分不同说话人

### 最佳配置建议

对于中文视频识别，推荐以下配置：
1. 模型选择：nova-3 或 whisper-large
2. 启用“中文重新断句”选项（在软件界面中选中），以优化标点符号和断句
3. 静默时长根据视频特点调整，一般200-300毫秒较为合适
4. 如果需要区分说话人，启用diarize选项

### 常见错误与解决方案

- **错误：API Key无效**
  确保复制的Key正确无误，且没有多余的空格或字符。

- **错误：识别结果缺少标点符号**
  这是Deepgram对中文支持的已知问题。请在软件界面中启用“中文重新断句”功能，该功能会使用阿里中文标点恢复模型重新处理字幕。

- **错误：文件过大无法处理**
  Deepgram平台对大于50MB的文件会自动重新编码为MP3格式，但如果你遇到问题，可以尝试先压缩视频文件。

- **错误：网络连接问题**
  确保网络可以正常访问deepgram.com，必要时配置代理。

### 注意事项

- Deepgram提供注册即赠200美元免费额度，足以处理大量视频内容。
- 对于CJK语言（中文、日文、韩文），Deepgram会自动移除空格。
- 中文识别时，Deepgram会进行繁体转简体的转换。
- 软件内置了重试机制，网络波动时会自动尝试重新识别。

通过以上步骤，你就可以在pyVideoTrans中使用Deepgram的语音识别服务了。如有更多问题，请参考Deepgram官方文档或软件帮助中心。