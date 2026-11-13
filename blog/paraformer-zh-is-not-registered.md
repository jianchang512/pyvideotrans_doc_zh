---
title: 当PySide6遇上ModelScope：一场关于 paraformer-zh is not registered 的地狱级调试之旅
date: 2025-06-19 14:33:00
description: paraformer-zh is not registered,SenseVoiceSmall is not registered 误导的开始
---

## `paraformer-zh is not registered`的错误分析和解决

## `SenseVoiceSmall is not registered`的错误分析和解决


> 简单来说就是PySide6的一个内部自检行为，和ModelScope的懒加载机制冲突，需要修改 modelscope 源码,如下图，具体原因和解释请阅读本文
>
> ![image](https://bbs.pyvideotrans.com/uploads/1758339451_68ce217b93d46.png)



在PySide6的界面操作后，调用`Funasr`进行语音识别。

- **在单独的测试脚本里运行？** 一切正常，行云流水。
- **在PySide6应用里点击按钮调用？** 永远无法消除的`xxx is not registered`报错。

而这一切，都始于一个看似简单无害的错误信息。

#### 报错`paraformer-zh is not registered`

最初，控制台抛出的错误是：
`AssertionError: paraformer-zh is not registered`
> 同样如果你使用的是`sensevoicesmall`,也会遇到同样错误`SenseVoiceSmall is not registered`

作为一个有经验的开发者，我的第一反应是：这肯定是模型注册的环节出了问题。在`Funasr`和`ModelScope`这类框架里，模型在使用前需要先“注册”到一个全局的列表中。这个错误显然意味着，当`AutoModel(model='paraformer-zh')`被调用时，它不认识`'paraformer-zh'`这个名字。

为什么在PySide6环境里就不认识了呢？我的脑海里闪过一连串“常规嫌疑犯”：
- **Python环境不对？** `sys.executable`和`sys.path`打印出来一模一样。排除。
- **工作目录变了？** `os.getcwd()`也显示正常。排除。
- **依赖库没装全？** 反复检查、重装，依赖完整。排除。

直觉告诉我，问题出在更深的地方。GUI应用的事件循环和复杂的运行时环境，一定在某个地方改变了代码的行为。

#### 进程隔离——正确的方向，错误的深度

为了摆脱PySide6主线程可能带来的“污染”，我祭出了标准武器：`multiprocessing`。我将整个识别逻辑放进一个独立的函数，用`spawn`上下文启动一个全新的进程来执行它。我满怀信心地认为，一个干净的、隔离的进程总该没问题了吧？

**然而，同样的错误再次出现。**

这让我陷入了沉思。`multiprocessing`虽然创建了新进程，但它为了在进程间传递数据和对象，依然与主进程有着千丝万缕的联系。子进程在启动时，依然会导入我项目中的某些模块，而这些模块又依赖于PySide6。也许，这种“污染”是更底层的。

于是，我换上了隔离性更强的`subprocess`（在PySide6中用`QProcess`实现）。我创建了一个“自己调用自己”的架构：我的主程序`sp.py`可以通过一个特殊的命令行参数`--worker-mode`来启动一个纯粹的“计算工人”模式。

这个方案终于让错误信息发生了变化！这就像在黑暗的隧道里走了很久，终于看到了一丝光。

#### `Cannot import __wrapped__`——真相浮出水面

新的错误日志，直指`ModelScope`的懒加载机制：
`ImportError: Cannot import available module of __wrapped__ in modelscope...`

经过一番艰苦的追踪，甚至一度想去修改`ModelScope`的`__init__.py`来“拆除”懒加载（那是一条通往循环导入地狱的死路，别试！），我终于在一条长长的调用堆栈中找到了凶案现场：

```
File "shibokensupport/signature/loader.py", ...
File "inspect.py", ... in _is_wrapper
    return hasattr(f, '__wrapped__')
File "modelscope/utils/import_utils.py", ... in __getattr__
ImportError: Cannot import available module of __wrapped__...
```

**原来，真凶是PySide6自己！**

让我来翻译一下这份“法医报告”：
1.  **`shibokensupport`** 是PySide6的底层支撑模块。当我的worker进程启动并导入`modelscope`时，即便它不创建任何窗口，PySide6的某些“幽灵”模块依然在后台活动。
2.  这个“幽灵”模块出于“好意”，想检查一下新导入的`modelscope`模块是不是一个被PySide6包装过的对象。
3.  它的检查方式非常标准，就是用Python内置的`inspect`库，问一句：`hasattr(modelscope, '__wrapped__')`（“你有`__wrapped__`这个属性吗？”）。
4.  这一问，恰好问到了`ModelScope`的痛处。`ModelScope`为了实现懒加载，用一个特殊的`LazyImportModule`对象伪装成了`modelscope`模块本身。这个对象会拦截所有属性访问。
5.  当`LazyImportModule`被问及`__wrapped__`时，它的`__getattr__`方法被触发。它错误地认为这是一个正常的请求，试图从`transformers`等库里去导入一个叫`__wrapped__`的模块——这当然是不存在的。于是，它抛出了那个致命的`ImportError`。

**结论就是：PySide6的一个无害的内部自检行为，和`ModelScope`精巧但脆弱的懒加载机制，发生了一次谁也意想不到的、灾难性的化学反应。**

#### 最终解决方案：修改ModelScope源码

既然问题根源已经找到，解决方案就变得异常清晰。我们不能阻止PySide6进行检查，但我们可以“教育”`ModelScope`如何正确地回应这个检查。我们只需要对`ModelScope`的源码进行一处微小的、外科手术式的修改。

**目标文件：** `[你的虚拟环境]/lib/site-packages/modelscope/utils/import_utils.py`
**手术方案：** 在`LazyImportModule`类的`__getattr__`方法的最开头，加上一个“特情处理”逻辑：

```python
# modelscope/utils/import_utils.py

class LazyImportModule(ModuleType):
    # ... 其他代码 ...
    def __getattr__(self, name: str) -> Any:
        # ==================== 补丁 ====================
        # 当PySide6的底层检查'__wrapped__'属性时，
        # 我们直接告诉它“没有这个属性”，而不是触发危险的懒加载。
        if name == '__wrapped__':
            raise AttributeError
        # =======================================================
        
        # ... 原来的懒加载逻辑保持不变 ...
```

在打上这个补丁后，**在开发环境中**，一切都恢复了正常！`python sp.py`启动的应用，终于可以愉快地调用`Funasr`了。


