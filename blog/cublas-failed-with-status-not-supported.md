---
title: CUBLAS_STATUS_NOT_SUPPORTED faster-whisper 在50系显卡上加速遇到错误的解决办法
date: 2025-08-06 14:33:00
description: cuBLAS failed with status CUBLAS_STATUS_NOT_SUPPORTED，process cuBLAS failed with status CUBLAS_STATUS_NOT_SUPPORTED
---

在使用基于 CTranslate2 的工具，例如 faster-whisper或pyVideotrans时，50x系显卡上可能会遇到类似错误
```
cuBLAS failed with status CUBLAS_STATUS_NOT_SUPPORTED

err[msg]=_process:cuBLAS failed with status
CUBLAS_STATUS_NOT_SUPPORTED
```

![](https://pvtr2.pyvideotrans.com/1754467355571_image.png)


该原因是 50x 显卡底层架构变更，Ctranslate2默认值是`auto`,此时会自动选择 `int8_float16`数据类型，无法在 50x 显卡上运算。目前可通过尝试手动指定计算类型来解决。

1. 命令行中可指定  `--compute_type='float16'`
2. 在 pyVideoTrans 软件中，可通过打开  **菜单--工具--高级选项--faster/openai语音识别调整--CUDA数据类型--选择 float16** ,然后保存，重启软件，来恢复使用。

![](https://pvtr2.pyvideotrans.com/1754467318216_image.png)
