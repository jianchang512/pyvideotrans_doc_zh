---
title: 升级代码后报错`incompatible constructor arguments ctranslate2`的解决方法
date: 2025-08-02 12:33:00
description: init() incompatible constructor arguments. The following argument types are supported  ctranslate2._ext.这是使用 pyvideotrans 软件中出现的问题，通常发生在使用源码方式安装，并且从GitHub上拉取了最新代码后，出现的。

---

```
__init__(): incompatible constructor arguments. The following argument types are supported: 1. ctranslate2._ext.Whisper

```
![](https://pvtr2.pyvideotrans.com/1754147943486_image.png)


这是使用 pyvideotrans 软件中出现的问题，通常发生在使用源码方式安装，并且从GitHub上拉取了最新代码后，出现的。

## 问题分析

错误信息是：
`__init__(): incompatible constructor arguments. The following argument types are supported: 1. ctranslate2._ext.Whisper`

**解读：**
简单来说，就是代码和 `ctranslate2` 库的某个版本不兼容。

**最常见的原因：**

1.  **版本不匹配**：代码中使用了最新 `faster-whisper` 代码，与您环境中实际安装的版本不一致。需要更新相关依赖。
2.  **模型文件格式过时或不完整**：需要删掉 `models`文件夹内对应的模型。

---

## 解决方案

请按照以下步骤逐一尝试，通常第一步或第二步就能解决问题。

### 方案一：更新核心依赖库

这是最可能解决问题的办法。进入到该项目目录下，根据你安装时创建的虚拟环境，激活，然后执行以下命令：

**更新 `faster-whisper`** 

`pip install --upgrade faster-whisper `     或  `pip3 install --upgrade faster-whisper `


**操作建议**：更新后，**完全关闭程序，然后重新启动**，再试一次。

### 方案二：删除旧模型，让程序重新下载

如果更新库后问题依旧，可能是模型文件本身的问题。

1.  程序的根目录下的 `models`内，删掉所使用的那个模型或模型文件夹
2.  重新启动程序，并选择该模型。程序会自动重新下载和转换模型，这次会使用您当前已安装的最新库来处理，确保格式兼容。

### 方案三：检查CUDA环境（如果方案一、二无效）

1.  **尝试不勾选“启用CUDA?”**，使用CPU模式运行。如果这样能成功，说明问题出在GPU相关的部分。
2.  如果确定是GPU问题，请确保您的NVIDIA驱动、CUDA Toolkit版本与 `ctranslate2` 所支持的版本兼容。通常，更新`ctranslate2`（如方案一）会安装支持您当前CUDA环境的版本。

### 方案四：重新安装

如果以上方法都无效，可能是您的环境配置非常混乱。最彻底的办法是：

`pip install --force-reinstall  -r requirements.txt`

