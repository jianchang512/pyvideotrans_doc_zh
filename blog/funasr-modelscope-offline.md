---
title: 搞定FunASR部署：修复离线加载与GUI集成的两大关键补丁 
date: 2025-06-21 01:33:00
description: 搞定FunASR部署：修复离线加载与GUI集成的两大关键补丁
---

在当今的AI应用开发中，高质量的语音识别（ASR）技术是许多产品的核心竞争力。特别是对于中文场景，阿里达摩院开源的FunASR项目效果非常出色。

**FunASR** 并非单一的模型，而是一个功能全面的基础语音识别工具包。它集成了语音识别（paraformer-zh/sensevoicesmall）、语音端点检测（VAD）等一系列强大功能。

在使用 `paraformer-zh` 和 `sensevoicesmall` 时，需要依赖`funasr`和`modelscope`这两个库。虽然模型本身很强大，但在离线环境或需要稳定部署的场景下，我遇到了一个相当棘手且具有迷惑性的问题。

## 核心问题：`local_files_only`参数为何在离线部署时“失灵”？

为了实现真正的离线使用，我们自然会想到使用官方提供的`local_files_only=True`参数。它的设计初衷，就是告诉程序“只使用本地缓存的模型，不要去访问网络”。

然而，在实践中，即便像下面这样设置了所有能想到的“离线”参数，程序在没有网络的环境下依然会尝试连接服务器，最终导致失败。

```python
# 理想中的调用方式
AutoModel(
    model=model_name,
    # ... 其他模型参数 ...
    hub='ms',
    local_files_only=True, # 期望这个参数能生效
    disable_update=True,
)
```

更令人困扰的是，不论是网络超时、下载失败还是其他I/O问题，`funasr`最终只会抛出一个笼统的错误：`paraformer-zh is not registered`。这个信息完全无法帮助我们定位到真正的病因——网络连接尝试。

####   深挖根源：断裂的参数传递链

通过追溯源码，我们很快就找到了问题所在。问题不出在`modelscope`，而出在`funasr`的调用层。`funasr`在调用`modelscope`的下载函数`snapshot_download`时，并没有将`local_files_only`这个关键参数传递下去。

 **证据在此**: `site-packages/funasr/download/download_model_from_hub.py` (约232行)

```python
    # funasr的调用代码，可以看到参数列表里根本没有 local_files_only
    model_cache_dir = snapshot_download(
                model, revision=model_revision, user_agent={Invoke.KEY: key, ThirdParty.KEY: "funasr"}
            )
```

参数在半路就“丢失”了，`modelscope`底层的离线逻辑自然无法被触发，导致它依然我行我素地去检查模型更新，最终在离线环境下报错。

####   解决方案：绕过上游，直击下游

既然修改上游的参数传递链比较繁琐，我们可以采取更直接的策略：直接修改`modelscope`的下载逻辑，让它变得更“智能”，主动拥抱本地缓存。

**我们的目标是：无论上游怎么调用，只要本地有模型缓存，就强制使用，不再进行任何网络检查。**

**修改文件**: `site-packages/modelscope/hub/snapshot_download.py`

在函数 `_snapshot_download` 内部，找到 `if local_files_only:` 这行判断。在它的**正上方**，插入以下补丁代码：

```python
    # ... 函数 _snapshot_download 的开头部分 ...

    # ==================== 强制使用本地缓存补丁 ====================
    # 优先检查本地缓存中是否已存在模型文件（通常数量大于1）
    if len(cache.cached_files) > 1:
        # 如果有，打印一条提示信息（可选），然后直接返回本地路径，中断后续所有操作。
        print("Found local model cache, using it directly. To re-download, delete the model folder.")
        return cache.get_root_location()
    else:
        # 如果本地没有缓存，为防止上游错误地传入 local_files_only=True 导致下载失败，
        # 在这里强制将其设为 False，确保能够继续执行下载流程。
        local_files_only = False
    # ===============================================================

    # 原有的判断逻辑
    if local_files_only:
        if len(cache.cached_files) == 0:
            raise ValueError(
                'Cannot find the requested files in the cached path and outgoing'
                ' traffic has been disabled. To enable look-ups and downloads'
                " online, set 'local_files_only' to False.")
```
这个修改一劳永逸地解决了问题。它赋予了`modelscope`优先使用本地缓存的能力，完美适配了离线部署的需求。

## 顺带一提：解决与PySide6等GUI库的冲突

在将FunASR集成到PySide6图形界面应用时，你可能还会遇到另一个问题：因`modelscope`的懒加载机制与PySide6的内部自检行为冲突，导致模型无法加载。

简单的解决方案是修改 `site-packages/modelscope/utils/import_utils.py` 文件，在 `LazyImportModule` 类的 `__getattr__` 方法开头添加两行代码，让它在被“盘问”时直接表明“没有这个属性”，从而避免触发问题。

```python
# site-packages/modelscope/utils/import_utils.py
class LazyImportModule(ModuleType):
    def __getattr__(self, name: str) -> Any:
        # ===== 补丁 =====
        if name == '__wrapped__':
            raise AttributeError
        # =================
        # ... 原有代码 ...
```

> 关于这个问题的详细背景和分析，可以参考我的另一篇文章 ，这里就不再赘述了。
> https://pyvideotrans.com/blog/paraformer-zh-is-not-registered

希望以上两个针对性的修改，能帮助你顺利地将FunASR部署到任何需要的环境中。
