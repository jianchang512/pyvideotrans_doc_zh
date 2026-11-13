---
title: 新增目标语言 
date: 2026-01-21 08:33:00
description: 新增目标语言
---

# 如何在 pyVideoTrans 中新增目标语言代码
> 在 v4.11 版本之后，优化了新增语言办法,以下针对 v4.11及以上 版本

pyVideoTrans 默认已内置支持 30 多种常用目标语言。如果你需要翻译或配音到其他小众语种，可以按照以下步骤手动添加。

---

### ⚠️ 新增前必读提示
在开始添加前，请先确认：**你打算使用的翻译渠道和配音渠道，是否支持该语种？**
- 很多配音渠道（如F5-TTS）仅支持常见语种，不支持小语种；
- 部分翻译渠道（如 DeepL）支持的语言种类也相对有限。
- 部分语音识别渠道 （如Qwen-ASR）支持的语言也有限
> **注意**：如果渠道本身不支持该语言，即便在软件中添加成功，实际运行时依然会报错。

---

## 第一步：查询并获取目标语言的渠道代码

不同的翻译和识别服务对同一门语言的“代号（代码）”要求各不相同。例如【简体中文】：
- Google翻译渠道为 `zh-CN`
- DeepL 翻译渠道为 `ZH-HANS`
- Faster-whisper识别渠道为`zh`
- 软字幕规范识别为 `zho`

请按需前往对应渠道查询你的目标语言代码：

1. **Google 翻译**：[点击查询支持的语言代码](https://docs.cloud.google.com/translate/docs/languages) （例如中文是 `zh-CN`）  
![](https://pvtr2.pyvideotrans.com/1787387562167_image.png)

2. **腾讯翻译**：[点击查询支持的语言代码](https://cloud.tencent.com/document/product/551/118482) （例如中文是 `zh`）  
![](https://pvtr2.pyvideotrans.com/1787387669982_image.png)

3. **百度翻译**：[点击查询支持的语言代码](https://fanyi-api.baidu.com/product/113) （例如中文是 `zh`）  
![](https://pvtr2.pyvideotrans.com/1787387696279_image.png)

4. **DeepL / DeepLX**：[点击查询支持的语言代码](https://developers.deepl.com/docs/getting-started/supported-languages) （例如中文是 `ZH-HANS`）  
![](https://pvtr2.pyvideotrans.com/1787387711383_image.png)

5. **微软翻译 (Microsoft)**：[打开网页](https://www.bing.com/translator?mkt=zh-CN) （例如中文是 `zh-Hans`，一般与 Google 一致，也可按 F12 调试查看）

6. **阿里机器翻译**：[点击查询支持的语言代码](https://help.aliyun.com/zh/machine-translation/developer-reference/machine-translation-language-code-list) （例如中文是 `zh`）  
![](https://pvtr2.pyvideotrans.com/1787387752947_image.png)

7. **阿里百炼API**：[点击查询支持的语言代码](https://help.aliyun.com/zh/model-studio/machine-translation#14735a54e0rwb) （例如中文是 `zh`）  
![](https://pvtr2.pyvideotrans.com/1787387804121_image.png)

8. **AI 翻译渠道（ChatGPT / Claude 等）**：直接填写该语言的**英文全称**（例如中文填写 `Simplified Chinese`）。

9. **LibreTranslate 渠道**：[点击查询支持的语言代码](https://docs.libretranslate.com/guides/supported_languages/) （括号内的 2~3 位代码）  
![](https://pvtr2.pyvideotrans.com/1787388737920_image.png)

10. **字幕嵌入代码（必填项）**：当生成内嵌软字幕时，必须使用 **ISO 3 位字母**代码。在下方列表中找到对应语言 `Set2` 列的 3 位字母（若区分 `T`/`B`，请使用 `T` 列，例如中文填写 `zho`）：  
![](https://pvtr2.pyvideotrans.com/1787387902123_image.png)

---

## 第二步：组装代码片段

按照以下格式模板，把你查到的真实代码替换进去：

> 💡 **小贴士**：
> 1. 如果某些翻译渠道你不使用，可以直接填 `No`(区分大小写)；
> 2. 第 2 行的 **`字幕嵌入代码`必须真实填写**，否则将无法正常嵌入软字幕。

```json
"google翻译对应的语言代码小写形式": [
    "Google翻译对应的语言代码", 
    "字幕嵌入对应的3位语言代码", 
    "百度翻译对应的语言代码", 
    "DeepL对应的语言代码",  
    "腾讯翻译对应的语言代码",  
    "Libre渠道对应的语言代码", 
    "微软翻译对应的语言代码", 
    "AI对应填写语言的英文名称", 
    "阿里机器翻译对应的语言代码", 
    "阿里百炼API对应的语言代码", 
]
```

**【参考范例】** 简体中文组装后的完整格式如下：
```json
"zh-cn": [
    "zh-cn",  
    "zho",  
    "zh",  
    "ZH-HANS", 
    "zh",
    "zh", 
    "zh-Hans",
    "Simplified Chinese",
    "zh", 
    "zh",  
]
```

---

## 第三步：写入配置文件 `languages.json`

1. 打开软件根目录下`videotrans`文件夹内的 `languages.json` 文件（推荐使用记事本或 VSCode 打开）。
2. 将你刚才组装好的代码，粘贴到大括号 `{ }` 内部。
3. **关键细节**：每组语言之间必须用**英文半角逗号 `,`** 隔开，最后一组后面不要加逗号。

**【粘贴位置示例】：**
```json
{
    "ar-st": [
        "es",
        "spa",
        "spa",
        "ES-419",
        "es",
        "es",
        "es",
        "Spanish",
        "es",
        "es",
    ],
    "zh-cn": [
        "zh-cn",  
        "zho",  
        "zh",  
        "ZH-HANS", 
        "zh",
        "zh", 
        "zh-Hans",
        "Simplified Chinese",
        "zh", 
        "zh"
    ]
}
```

4. 保存文件并**重启软件**，在目标语言下拉列表中就能看到新增的语言代码了。

---

## 第四步（可选）：自定义界面的显示名称

添加完成后，软件下拉框默认显示的是语言代码（如 `zh-cn`）。如果你希望显示为更友好的中文名称（如“简体中文”），请按以下步骤设置：

1. 打开文件：`软件目录/videotrans/language/zh.json`；
2. 翻到文件最底部，在最后一个 `}` 之前查看前一行末尾是否有英文逗号 `,`；
3. 如果没有，先在前一行末尾补上英文逗号 `,`，然后换行添加下列2行：
   ```json
   "google对应的语言代码小写形式": "你想在软件中显示的中文名称",
   "你想在软件中显示的中文名称":"google对应的语言代码小写形式",
   ```
   *例如：`"zh-cn": "简体中文"`*
4. 保存文件并重启软件生效。

如果你的软件是英文界面，需要修改 `软件目录/videotrans/language/en.json`，方法一样

---

## ❓ 常见报错排查

如果修改后**软件启动报错或未报错但添加的语言未生效**，99% 是由于 `JSON` 格式错误造成的，这几个文件都是json文件，需要严格合法的语法，请重点检查：
1. **中英文符号**：所有标点符号（`"`、`,`、`:`、`{}`、`[]`）必须为**英文半角符号**，切勿输入中文逗号或中文引号。
2. **多余或遗漏逗号**：检查两段语言代码之间是否遗漏了逗号 `,`，或者在最后一项后面多写了逗号。
----


