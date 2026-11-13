---
title: F5-TTS api调用常见错误
date: 2025-03-18 23:04:18
description: 在使用源码部署 F5-TTS 项目后，使用api调用时，可能会遇到一些报错，常见报错如下  
---

在使用源码部署 F5-TTS 项目后，使用api调用时，可能会遇到一些报错，常见报错如下

1. 报错 `Could not fetch config for http://127.0.0.1:7860/`

答：可能的原因如下
- 未启动F5-TTS
- 端口不正确
- 端口被其他程序占用，一般ai项目界面多使用gradio实现，默认端口都是7860
- 需关闭share，启动命令使用 `f5-tts_infer-gradio --api`,去掉 `--share`
- 升级调用端的 `gradio_client`到最新， 执行`pip install --upgrade gradio_client`

2. 报错`{detail:not found}`

答：可能原因
- 调用端的 gradio_client 版本太旧，请更新 `pip install --upgrade gradio_client`
- 端口不正确或端口是其他项目的端口


3. 频频出现这类错误
```
    raise ConnectTimeout(e, request=request)
requests.exceptions.ConnectTimeout: (MaxRetryError("HTTPSConnectionPool(host='huggingface.co', port=443): Max retries exceeded with url: /SWivid/F5-TTS/resolve/main/F5TTS_v1_Base/vocab.txt (Caused by ConnectTimeoutError(<urllib3.connection.HTTPSConnection object at 0x000002174796DF60>, 'Connection to huggingface.co timed out. (connect timeout=10)'))"), '(Request ID: 0458b571-90ab-4edd-ae59-b93bd603cdd0)')

```
梯子问题，请科学上网，并使用流畅的梯子

