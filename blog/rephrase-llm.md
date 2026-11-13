---
title: 对语音识别结果重新断句
date: 2025-05-08 15:33:00
description: 本文介绍了pyVideoTrans v3.69版本引入的基于LLM大模型智能断句功能，旨在解决传统语音识别结果断句不自然的问题。
---

# 对识别结果进行重新断句

为了提升字幕断句的自然度和准确性，pyVideoTrans 从 v3.69 版本开始，引入了基于 AI的`LLM重新断句`功能和基于标点符号的`本地重新断句`，旨在优化字幕处理体验。


![](https://pvtr2.pyvideotrans.com/1760276026372_image.png)





**工作原理：**

启用了**LLM重新断句**功能后：
1.  pyVideoTrans 会将识别到的包含**单词级时间戳**的`字/单词`发送给您配置的 LLM 进行重新断句。
2. LLM 会根据 `/videotrans/prompts/recharge/recharge-llm.txt` 文件中的提示词指导，对文本进行智能断句。

![](https://pvtr2.pyvideotrans.com/1760275836861_image.png)

3. 断句完成后，结果将被重新整理为标准的 SRT 字幕格式，供后续翻译或直接使用。
4. 如果 LLM 重新断句失败，软件将自动回退，使用 `faster-whisper/openai-whisper/parakeet-tdt` 自身提供的断句结果。


**细化控制**

要成功启用并使用此功能，请确保满足以下条件：

1.  **选择语音切割模式**：需设置为 `整体识别`。
![选择语音切割模式](https://pvtr2.pyvideotrans.com/1746715397581_image.png)

2.  **配置 LLM API**：在 **菜单 -> 翻译设置 -> OpenAI API 及兼容 AI或DeepSeek** 中，正确填写您的 API Key (SK)、选择模型名称，并设置其他相关参数。

3. 默认将使用 `OpenAI API` 进行重新断句，可以在`菜单--工具--高级选项--LLM重新断句使用的AI渠道`中切换为 `DeepSeek`

4. 在`工具--选项--高级选项--LLM重新断句每批次发送数量`中调整数值，默认每 **500** 个字或单词发送一次断句请求，该值越大，断句效果越好，但如果输出超过了所用模型允许的最大输出token，会引发错误。同时若增大该值，也需要相应调大下条所述的**最大输出token**

![](https://pvtr2.pyvideotrans.com/1760275732795_image.png)


## 2. 使用 `本地重新断句`

如果不想使用LLM重新断句，也可选择`本地重新断句`，将基于标点符号对识别出的字词重新断句，如果标点严重缺失，效果会比较差。

同样仅适用于`faster-whisper/openai-whisper/parakeet-tdt` 这3种语音识别渠道

