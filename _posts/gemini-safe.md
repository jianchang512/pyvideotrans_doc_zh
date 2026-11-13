---
title: Gemini安全过滤
date: 2025-01-05 14:37:57
description: Gemini 对处理的内容存在安全限制，虽然代码中允许一定的调整，也做了“Block None”的最宽松限定，但最终是否过滤仍由gemini综合评估决定。
---



在使用 Gemini AI 执行翻译或语音识别任务时，有时会遇到 “响应内容被标记”等报错

![image.png](https://pvtr2.pyvideotrans.com/img/20250114133334-0.webp)

这是因为 Gemini 对处理的内容存在安全限制，虽然代码中允许一定的调整，也做了“Block None”的最宽松限定，但最终是否过滤仍由gemini综合评估决定。

**Gemini API 的可调整安全过滤器涵盖以下类别，其他不再此列的内容无法通过代码调整：**

| 类别     | 说明                    |
| ------ | --------------------- |
| 骚扰内容   | 针对身份和/或受保护属性的负面或有害评论。 |
| 仇恨言论   | 粗鲁、无礼或亵渎性的内容。         |
| 露骨色情内容 | 包含对性行为或其他淫秽内容的引用。     |
| 危险内容   | 宣扬、助长或鼓励有害行为。         |
| 公民诚信   | 与选举相关的查询。



下表介绍了可以针对每种类别在代码中的屏蔽设置。

例如，如果您将**仇恨言论**类别的屏蔽设置设为**屏蔽少部分**，则系统会屏蔽包含仇恨言论内容概率较高的所有部分。但允许任何包含危险内容概率较低的部分。

| 阈值（Google AI Studio） | 阈值 (API)                           | 说明                     |
| -------------------- | ---------------------------------- | ---------------------- |
| 全部不屏蔽                | `BLOCK_NONE`                       | 无论不安全内容的可能性如何，一律显示     |
| 屏蔽少部分                | `BLOCK_ONLY_HIGH`                  | 在出现不安全内容的概率较高时屏蔽       |
| 屏蔽一部分                | `BLOCK_MEDIUM_AND_ABOVE`           | 当不安全内容的可能性为中等或较高时屏蔽    |
| 屏蔽大部分                | `BLOCK_LOW_AND_ABOVE`              | 当不安全内容的可能性为较低、中等或较高时屏蔽 |
| 不适用                  | `HARM_BLOCK_THRESHOLD_UNSPECIFIED` | 阈值未指定，使用默认阈值屏蔽

代码中可通过如下设置启用`BLOCK_NONE`

```
safetySettings = [
    {
        "category": HarmCategory.HARM_CATEGORY_HARASSMENT,
        "threshold": HarmBlockThreshold.BLOCK_NONE,
    },
    {
        "category": HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        "threshold": HarmBlockThreshold.BLOCK_NONE,
    },
    {
        "category": HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        "threshold": HarmBlockThreshold.BLOCK_NONE,
    },
    {
        "category": HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        "threshold": HarmBlockThreshold.BLOCK_NONE,
    },
]

model = genai.GenerativeModel('gemini-2.0-flash-exp')
model.generate_content(
                message,
                safety_settings=safetySettings
)

```

然而要注意的是：即便都设置为了 `BLOCK_NONE`也不代表Gemini会放行相关内容，仍会根据上下文推断安全性从而过滤。


## 如何降低出现安全限制的概率？

一般来说，flash系列安全限制更多，pro和thinking系列模型相对较少，可尝试切换不同模型。
另外，在可能涉及敏感内容时，一次性少发送一些内容，降低上下文长度，也可在一定程度上降低安全过滤频率。


## 如何彻底禁止Gemini做安全判断，对上述内容统统放行？

绑定国外信用卡，切换到按月付费的高级账户







