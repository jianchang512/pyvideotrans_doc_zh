---
title: 三步反思法翻译SRT字幕
date: 2025-01-05 14:37:57
description: 吴恩达老师的「反思式三步翻译法」非常有效，它通过让模型自我审视翻译结果并提出改进建议，进一步提升翻译质量。然而，直接将该方法应用于 SRT 格式字幕翻译却存在一些挑战。
---




吴恩达老师的「反思式三步翻译法」非常有效，它通过让模型自我审视翻译结果并提出改进建议，进一步提升翻译质量。然而，直接将该方法应用于 SRT 格式字幕翻译却存在一些挑战。

**SRT 字幕格式的特殊要求**

SRT 格式字幕有严格的格式要求：

- **第一行：** 行号数字
- **第二行：**  两个时间戳，由 `-->` 连接，格式为 `小时:分钟:秒,3位毫秒`
- **第三行及以后：** 字幕文本内容

字幕之间使用两个空行隔开。

**示例：**

```
1
00:00:01,950 --> 00:00:04,430
五老星系中发现了有几分子,

2
00:00:04,720 --> 00:00:06,780
我们离第三类接触还有多元。

3
00:00:07,260 --> 00:00:09,880
微博真是展开拍摄任务已经进来周年,

4
00:00:10,140 --> 00:00:12,920
最近也传过来许多过去难以拍摄到的照片。
```

**SRT 翻译中的常见问题**

在使用 AI 翻译 SRT 字幕时，可能会出现以下问题：

- **格式错误：** 
    - 丢失行号或重复时间戳
    - 将时间戳中的英文符号翻译成中文符号
    - 将相邻两条字幕文本合并成一行，尤其是在上句和下句在语法上构成完整句子时
- **翻译质量问题：**
    - 即使使用严格的提示词限制，也经常会出现翻译错误。

**常见错误示例：**

- **字幕文本合并导致空行**

![image.png](https://pvtr2.pyvideotrans.com/img/20241110225324-0.webp)


- **格式混乱**

![image.png](https://pvtr2.pyvideotrans.com/img/20241110225324-1.webp)

- **行号被翻译**

![image.png](https://pvtr2.pyvideotrans.com/img/20241110225325-2.webp)

- **原始字幕和结果字幕数量不一致**

像上面所述，当前后两条字幕在语法上属于一句时，很可能会被翻译为同一条，导致结果字幕条数缺少


![image.png](https://pvtr2.pyvideotrans.com/img/20241110225325-3.webp)


而格式出现错误直接导致后续依赖srt的流程无法进行，不同模型出现的错误和出错概率各不相同，相对来说，智能程度越高的模型，越可能返回合法的符合要求的内容，而本地部署的小规模模型几乎压根不可用。


不过鉴于三步反思法对翻译质量的提升，还是尽量尝试了下。最终选择使用 `gemini-1.5-flash` 小小尝试一下，主要因为它的智能程度足够、而且免费，除了限制频繁，其他几乎无限制。

## 撰写提示词思路

按照吴恩达的三步反思工作流，撰写提示词

- 第一步要求AI按照字面意思直译
- 第二步要求根据直译结果评估并给出优化建议
- 第三步根据优化建议重新进行意译。
 
所不同的是加强要求返回的内容务必是合法的SRT格式，虽然它未必百分百遵从。


## 搭建简单api

三步反思模式一个问题是额外消耗多得多的token，提示词变长，输出结果变长，另外因Gemini的频率限制，超频会返回429报错，需要在每次请求之后暂停一段时间。

采用 flask 搭建后端api，前台使用 bootstrap5 简单做个单页，总体界面如下


![image.png](https://pvtr2.pyvideotrans.com/img/20241110225326-4.webp)

> 显然国内想使用 Gemini 必须有梯子

- 同时翻译行：是指一次翻译请求中的字幕行数，如果太大可能超出token限制，导致出错，太小没有意义，建议30-100内，默认50。
- 翻译后暂停秒：防止请求过于频繁导致返回 429 报错，将在每次请求返回后暂停10s，再发起下次请求


返回结果示例

```
<step1_initial_translation>
1
00:00:01,950 --> 00:00:04,430
Several molecules have been discovered in the five-star system,

2
00:00:04,720 --> 00:00:06,780
We are still multiple universes away from third-type contact.

3
00:00:07,260 --> 00:00:09,880
Weibo has been carrying out filming missions for years now,

4
00:00:10,140 --> 00:00:12,920
Many previously difficult-to-capture photos have been transmitted recently.

5
00:00:13,440 --> 00:00:17,500
In early June, astronomers published this photo in Nature,

6
00:00:18,040 --> 00:00:19,180
Outside the blue core,

7
00:00:19,360 --> 00:00:21,380
There\'s also this circle of orange light,

8
00:00:21,900 --> 00:00:23,740
This is a new drama-scale sweet donut,

9
00:00:24,380 --> 00:00:25,640
This is a portal.

10
00:00:26,280 --> 00:00:28,100
This is the generation ring of an alien civilization,

</step1_initial_translation>

<step2_reflection>
* **Line 1:** "Five-star system" is likely a mistranslation.  It probably refers to a five-member committee or group, not a star system. Clarify the context.
* **Line 2:** "Multiple universes" seems like an over-exaggeration.  Rephrase for clarity and accuracy.
* **Line 3:** "Weibo" should be explained as a Chinese social media platform.  "Filming missions" is unclear.  Does it mean "posting videos/images"?
* **Line 8:** "Drama-scale sweet donut" is a nonsensical literal translation. Figure out the intended meaning.
* **Line 9:** "Portal" seems out of context.  Verify the intended meaning.
* **Line 10:** "Generation ring" is likely a mistranslation.  Clarify the context.
* **Line 11:** "Organic polycyclic aromatic hydrocarbons" is overly technical for a general audience. Simplify if possible.
* **Line 12 and 14:** Use the correct formatting for the galaxy\'s name: SPT0418-47.
* **Line 15:** "It hasn\'t been shortened" is awkward. Remove or rephrase.
* **Line 28:**  The name of the organization and the resource should be translated more naturally and accurately.  Consider breaking this long line into two for better readability.
* **Line 29:**  "Cute plush dolls" may sound childish. Consider rephrasing as "animated characters" or similar.
* **Line 35:** "James Webb Space Telescope" should be used consistently throughout. Shortening to "Webb Telescope" after the first mention is acceptable.
* **Line 44:** "SPD048" is likely a typo.  It should be SPT0418-47 to be consistent.
* **Line 45-46:**  "Standard beautiful photo" is redundant.  Simplify to "beautiful photo".
* **Line 48:** "Grovitational Lenshin" is a typo. Correct to "Gravitational Lensing".
* **Line 50:** The sentence is incomplete. Finish the thought.

</step2_reflection>

<step3_refined_translation>
1
00:00:01,950 --> 00:00:04,430
Several molecules have been discovered in the five-member group\'s area of focus.

2
00:00:04,720 --> 00:00:06,780
We are still far from making contact with extraterrestrial life.

3
00:00:07,260 --> 00:00:09,880
The James Webb Space Telescope has been capturing images for a year now,

4
00:00:10,140 --> 00:00:12,920
and has recently transmitted many previously unseen photos.

5
00:00:13,440 --> 00:00:17,500
In early June, astronomers published this image in Nature.

6
00:00:18,040 --> 00:00:19,180
Outside the blue core,

7
00:00:19,360 --> 00:00:21,380
there\'s a ring of orange light.

8
00:00:21,900 --> 00:00:23,740
This is a large, ring-shaped structure.

9
00:00:24,380 --> 00:00:25,640
This is being investigated.

10
00:00:26,280 --> 00:00:28,100
This is thought to be a sign of an early galaxy.

</step3_refined_translation>
```

从结果中提取出<step3_refined_translation></step3_refined_translation>标签内文本，即是翻译结果。


## 简单打了一个包，感兴趣可下载本地尝试

直接下载，解压后双击`app.exe`即可自动在浏览器中打开上述UI界面，输入在Gemini申请的Key、填写代理地址、选择要翻译的srt字幕文件、选择要翻译到的目标语言，试试结果。


![image.png](https://pvtr2.pyvideotrans.com/img/20241110225326-5.webp)

### Q1: 反思工作流与传统机器翻译有何不同？

A1: 反思工作流引入了自我评估和优化机制，模拟人类译者的思考过程，能够产生更加精准和自然的翻译结果。

### Q2: 使用反思工作流需要多长时间？

A2: 虽然反思工作流需要多次AI处理，但通常只比传统方法多花费10–20秒，考虑到翻译质量的提升，这点时间投资是值得的。

### Q3: 反思工作流能保证字幕翻译结果一定是合法srt吗

A3: 不能，仍可能出现空行、同原始字幕数不一致的问题，例如前后两条字幕，后边一条仅有3-5个文字，而且语法上属于上面一句的连续，那么翻译结果很可能会合并为一条



----
----

对小工具加了一个功能，可支持同时上传视频或音频文件，借助Gemini将音频视频转为字幕，在转为字幕的同时还可以进行翻译，并返回翻译结果。

Gemini大模型本身既支持文字形态又支持音视频形态，因此可以一个请求实现从音视频转录为字幕并翻译。

例如一个英语发音的视频发送给Gemini，并指定翻译为中文，那么返回的就是一个中文字幕。


![image.png](https://pvtr2.pyvideotrans.com/img/20241112001622-0.webp)



![image.png](https://pvtr2.pyvideotrans.com/img/20241112001623-1.webp)


**1. 仅翻译字幕**

可以在左侧文本框粘贴SRT格式的字幕内容，或直接点击“上传SRT字幕”按钮，从本地计算机选择字幕文件。  


然后设定想翻译到的目标语言，即可使用“三步反思翻译法”指挥Gemini执行翻译任务，返回结果输出到右侧文本框内，点击右下角“下载按钮”可保存为srt文件到本地

**2. 将音频视频转录为字幕**  


点击左侧的“上传音视频转录为字幕”按钮，选择任意音频或视频文件上传，上传完毕后，提交，Gemini在处理后，将返回根据音视频里的说话声识别道的字幕内容，效果还不错。

如果同时指定了目标语言，那么Gemini在识别后，会继续讲该结果翻译为你指定的语言再返回。也就是同时完成生成字幕和翻译字幕2个任务。

  


**下载地址：**  

https://github.com/jianchang512/ai2srt/releases/download/v0.2/windows-ai2srt-0.2.7z