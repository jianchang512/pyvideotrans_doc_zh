---
title: 修改 AI 翻译提示词
date: 2025-06-22
description: 自定义 AI 翻译和 LLM 重新断句的提示词，优化翻译效果
---

# 修改 AI 翻译提示词 (Prompt)

pyVideoTrans 允许你自定义 AI 翻译和 LLM 重新断句的提示词，以优化翻译效果。本文介绍如何找到并修改这些提示词文件。

---

## 一、字幕翻译提示词

有两种不同的字幕翻译提示词，根据是否勾选「发送完整字幕」而使用不同的文件。

### 选中「发送完整字幕」时的提示词

> 当选中 `发送完整字幕` 复选框时，会自动使用该提示词。

**提示词位置**：`软件目录/videotrans/prompts/srt/` 文件夹

该文件夹下包含多个渠道的提示词文件，每个文件以渠道名称命名：

| 文件名 | 对应渠道 |
|--------|---------|
| `chatgpt.txt` | OpenAI ChatGPT |
| `deepseek.txt` | DeepSeek |
| `gemini.txt` | Google Gemini |
| `zhipuai.txt` | 智谱 AI |
| `xiaomi.txt` | 小米 AI |
| `minimax.txt` | MiniMax |
| `bailian.txt` | 阿里百炼 |
| `localllm.txt` | 本地大模型/兼容 AI |

该翻译方式会连带行号、时间行、字幕文字以合法的 SRT 字幕字符串发给 AI 模型，也期待 AI 会返回翻译后的合法 SRT 字幕格式。

**修改要注意**：类似 `{lang}`、`{batch_input}` 等以花括号包围的是变量，将在程序中被自动替换，不要修改和删除。

### 按行翻译的提示词（未选中「发送完整字幕」时）

> 未选中「发送完整字幕」时，会使用该提示词。

**提示词位置**：`软件目录/videotrans/prompts/text/` 目录下，例如 `deepseek.txt`

该文件夹下同样包含各渠道的提示词文件，结构与 `srt/` 目录相同。

**修改时注意**：类似 `{lang}` 以花括号包围的是变量，将在程序中被自动替换，不要修改和删除。

---

## 二、LLM 纠错提示词

对于语音识别结果，可使用 AI 模型修正错别字等。

**提示词位置**：`软件目录/videotrans/prompts/resegment/llm.txt`


可在 `菜单 → 工具/选项 → 高级选项 → 通用` 区域切换，默认使用 OpenAI ChatGPT 及兼容 AI 渠道。


**使用LLM重新断句替代LLM纠错**：
菜单-工具-高级选项-语音识别参数-使用LLM重新断句替代LLM纠错：需确保所用AI模型支持长上下文和长输出，选中后将不再单纯纠错，而是重新断句，重新断句提示词`软件目录/videotrans/prompts/resegment/llm_re.txt`

---

## 四、快速修改指南

| 场景 | 需要修改的文件 |
|------|---------------|
| AI 翻译结果不理想（使用完整字幕模式） | `videotrans/prompts/srt/` 下对应渠道的 `.txt` 文件 |
| AI 翻译结果不理想（按行翻译模式） | `videotrans/prompts/text/` 下对应渠道的 `.txt` 文件 |
| LLM 纠错效果不佳 | `videotrans/prompts/resegment/llm.txt` |
| LLM 重新断句 | `videotrans/prompts/resegment/llm_re.txt` |

> **重要提醒**：修改提示词前建议备份原始文件。`{lang}`、`{batch_input}` 等花括号变量不要删除，它们会被程序自动替换为实际值。


## 相关文档

* [提高 AI 翻译字幕的质量](/aitranslate) — 翻译模式对比与术语表使用
* [更好的使用本地大模型作为翻译渠道](/llmbetter) — 本地大模型配置指南
* [修改 AI 翻译提示词](/prompt) — 自定义翻译提示词
* [视频翻译最佳效果推荐](/bester) — 每个阶段的最优配置
* [翻译后出现"空白字幕行"的原因与解决方法](/faq17)