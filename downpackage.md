---
title: 免费下载pyVideoTrans视频翻译软件 
date: 2026-01-21 08:33:00
description: 免费下载 pyVideoTrans 视频翻译软件
---

# Win10/11 预打包版本下载

> [MacOS/Linux系统安装部署教程](/deply)


:::details 小额捐赠助力开源项目更新优化
	
> 如果该项目对你有帮助，请考虑小额捐助，助力开发者持续更新和维护优化

<div style="display:flex;justify-content:space-around"><img src="https://pvtr2.pyvideotrans.com/images/wx.png" width="200"><img src="https://pvtr2.pyvideotrans.com/images/alipay.png" width="200">
</div>


- **Donate via ko-fi:** https://ko-fi.com/jianchang512

:::

----

### v4.19 完整包下载(2.7G)

- 百度网盘地址: https://pan.baidu.com/s/1A9Td1PZrsgmMsBar5BCNGg?pwd=1234
- huggingface.co: https://huggingface.co/mortimerme/repocollect/resolve/main/win-pyvideotrans-v4.19.7z?download=true


### v4.19 补丁包下载(400MB)

> 补丁包不可单独使用，仅用于覆盖旧包, 如果版本相差较多，请直接下载完整包，勿使用补丁包。覆盖后如果闪退或报错，请下载完整包。

- 百度网盘地址: https://pan.baidu.com/s/1OhDChShEgYzD-dyk0HTulA?pwd=1234
- huggingface.co: https://huggingface.co/mortimerme/repocollect/resolve/main/win-PatchUpdate-v4.19.7z?download=true


----

::: details 如果新版遇到问题可继续使用上个版本(v4.18/v4.03)

**v4.18 完整包下载(2.7G)**

- 百度网盘地址: https://pan.baidu.com/s/1a32u2WqH9BXbe7TM0SeK8w?pwd=1234
- huggingface.co: https://huggingface.co/mortimerme/repocollect/resolve/main/win-pyvideotrans-v4.18.7z?download=true

**v4.14 完整包下载(2.7G)**
- 百度网盘地址: https://pan.baidu.com/s/1nPX5v_kqcOUzaqk9Zu33PA?pwd=1234
- huggingface.co: https://huggingface.co/mortimerme/repocollect/resolve/main/win-pyvideotrans-v4.14.7z?download=true


**v4.03 完整包下载(2.7G)**

- 百度网盘地址: https://pan.baidu.com/s/1yENT4t7E5K1OrbOFS7WEvA?pwd=1234
- huggingface.co:  https://huggingface.co/mortimerme/repocollect/resolve/main/win-pyvideotrans-v4.03-0626.7z?download=true


:::

----

## V4.19 更新日志

- 支持使用 DeepSeek 进行 语音识别 和 文字配音
- faster-whisper/Audio.cpp 支持通过 vulkan 启用 AMD/Intel 显卡加速
- 翻译渠道`OpenAI ChatGPT` 支持 responses API，若 API 地址以`/responses`结尾，将自动使用 `responses`发送数据
* fix(dubbing): save a one-subtitle .srt dubbed with Edge-TTS, and keep its start time, auto speed-up and volume by @tanishqbaweja in https://github.com/jianchang512/pyvideotrans/pull/1274
* fix(tts): dub subtitle lines that contain & or < with Azure TTS by @tanishqbaweja in https://github.com/jianchang512/pyvideotrans/pull/1276
* fix(translator): keep apostrophes, quotes and & in Google translations by @tanishqbaweja in https://github.com/jianchang512/pyvideotrans/pull/1275
* fix(tts): give Doubao 2.0 and Ali Bailian the ids 18 and 19 on dev, so the TTS list runs the chosen channel by @tanishqbaweja in https://github.com/jianchang512/pyvideotrans/pull/1278
* fix(translator): send the Reasoning Effort chosen for the VolcEngine LLM channel by @tanishqbaweja in https://github.com/jianchang512/pyvideotrans/pull/1277
* fix(tts): give Doubao 2.0 and Ali Bailian the ids 18 and 19 on main by @tanishqbaweja in https://github.com/jianchang512/pyvideotrans/pull/1280
* fix(srt): keep the Chinese lines of GBK subtitles in the Batch Subtitle Format Converter by @tanishqbaweja in https://github.com/jianchang512/pyvideotrans/pull/1279
* feat: add WorldRouter subtitle translation provider by @xueyuanhuang in https://github.com/jianchang512/pyvideotrans/pull/1281
* feat(translator): add Standard Compute translation channel by @henrikdukefoss in https://github.com/jianchang512/pyvideotrans/pull/1282
* fix(srt): read .srt and .txt subtitles saved as UTF-16 or UTF-32 with a BOM by @tanishqbaweja in https://github.com/jianchang512/pyvideotrans/pull/1283
* fix(vas): burn subtitles into a video without an audio track in Merge V/A/Srt by @tanishqbaweja in https://github.com/jianchang512/pyvideotrans/pull/1284
* fix(vas): don't pad the chosen .wav file itself in Merge V/A/Srt by @tanishqbaweja in https://github.com/jianchang512/pyvideotrans/pull/1285
* fix(srt): draw the bottom language of bilingual hard subtitles in the font chosen for it by @tanishqbaweja in https://github.com/jianchang512/pyvideotrans/pull/1286
* fix(ui): keep each line's voice after a line is deleted in Edit Subtitles & Assign Voice Roles by @tanishqbaweja in https://github.com/jianchang512/pyvideotrans/pull/1287
* fix(recogn): keep a decimal in one cue on the second pass by @GPT-AGI in https://github.com/jianchang512/pyvideotrans/pull/1288
* fix(ui): keep the countdown of the dubbing proofreading panel running when there are more than 200 dubbed lines by @tanishqbaweja in https://github.com/jianchang512/pyvideotrans/pull/1292
* feat(translator): add UberLLM translation channel by @PSA-Team-source in https://github.com/jianchang512/pyvideotrans/pull/1291
* fix(ui): cut one clip per line of an .ass file in Trim Video by Subtitles by @tanishqbaweja in https://github.com/jianchang512/pyvideotrans/pull/1293
* fix(ui): create the output folder shown in a tool window when it doesn't exist by @tanishqbaweja in https://github.com/jianchang512/pyvideotrans/pull/1294
* fix(ui): save next to each file with Save to SourceDir and Save to Original by @tanishqbaweja in https://github.com/jianchang512/pyvideotrans/pull/1295
* fix(ui): keep hand edits when using Replace in the subtitle proofreading panels by @tanishqbaweja in https://github.com/jianchang512/pyvideotrans/pull/1296
* fix(ui): read .vtt times without hours in Trim Video by Subtitles by @tanishqbaweja in https://github.com/jianchang512/pyvideotrans/pull/1297
* fix(vas): show Execution Complete in Merge V/A/Srt only once the video is saved by @tanishqbaweja in https://github.com/jianchang512/pyvideotrans/pull/1298
* fix(ui): don't change the working folder in Merge Video & Audio and Batch Add Watermarks by @tanishqbaweja in https://github.com/jianchang512/pyvideotrans/pull/1299
* fix(ui): put the watermark at the chosen position in Batch Add Watermarks by @tanishqbaweja in https://github.com/jianchang512/pyvideotrans/pull/1300
* fix(ui): show the progress of Batch Add Watermarks from 0 to 100% by @tanishqbaweja in https://github.com/jianchang512/pyvideotrans/pull/1301
* fix(ui): open the recordings folder in Real-time Speech-to-Text when output/ is missing by @tanishqbaweja in https://github.com/jianchang512/pyvideotrans/pull/1302
* fix(ui): show the settings of Translation V/A again after using STT-Translation by @tanishqbaweja in https://github.com/jianchang512/pyvideotrans/pull/1303
* fix(tts): use the saved Audio.cpp model when no model is passed by @tanishqbaweja in https://github.com/jianchang512/pyvideotrans/pull/1304
* add language zh_TW by @lwhuang in https://github.com/jianchang512/pyvideotrans/pull/1306
* feat: add end-to-end Vulkan GPU acceleration for ASR, HY-MT2 & TTS by @fangfufu in https://github.com/jianchang512/pyvideotrans/pull/1305
* feat(gpu): fall back to CUDA for non-Vulkan models by @fangfufu in https://github.com/jianchang512/pyvideotrans/pull/1309
* perf(audio): pass CPU core count to audiocpp_cli --threads by @fangfufu in https://github.com/jianchang512/pyvideotrans/pull/1308
* feat(translator): add Requesty translation channel by @Thibaultjaigu in https://github.com/jianchang512/pyvideotrans/pull/1311
* feat(translator): add TrustedRouter translation channel by @jperla in https://github.com/jianchang512/pyvideotrans/pull/1312


----

**解压注意事项：**

- 解压7z压缩包，解压后，找到 `sp.exe` 文件，双击即可启动软件,不可在压缩包内双击运行。
- 不要将软件解压到桌面或 C 盘的 `Program Files` 等需要管理员权限的文件夹下。
- 避免路径错误： 解压路径中不要包含中文、空格或特殊符号。
- 如果使用7zip软件解压提示错误，请尝试使用 [Bandizip](https://bandisoft.com/bandizip/) 或 [360压缩软件](https://yasuo.360.cn) 进行解压





----

::: danger 防骗声明

- 本软件是一款基于 [GPL-V3 协议](https://www.gnu.org/licenses/gpl-3.0.html) 发布的开源免费软件。您可以从 [官方GitHub仓库](https://github.com/jianchang512/pyvideotrans) 或 [文档站](/downpackage) 下载和使用源代码或Windows预打包版。

- 【未授权商业销售行为】
本开发者未授权任何实体或个人销售本软件(例如淘宝、闲鱼、拼多多等)。
任何通过付费渠道获取本软件的行为均与开发者无关，开发者未授权也未从中受益，对此不承担任何责任，如果你是花钱购买并且想退款，请自行找卖家退钱或平台投诉，勿找开发者。

- 【无需登录或认证】下载预打包版或部署源码后就直接可用，无需登录或卡密验证，凡是需要此类操作才可使用的，都不是官方原版，请知悉。

- 【关于第三方API】
第三方 API 需您自行提供账户和密钥（仅本地存储），相关费用你需自行在第三方平台充值或购买，与开发者无关，开发者仅在软件中提供API对接的技术规范。

[查看软件使用和许可协议了解更多...](/law)

:::

