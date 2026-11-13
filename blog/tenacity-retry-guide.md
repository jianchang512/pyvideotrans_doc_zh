---
title: 搞懂 Tenacity：一行代码创建优雅简单的自动重试
date: 2025-07-31 12:33:00
description: 在与AI大模型API服务交互时，我们总会面对一个无法回避的现实：网络并不总是可靠。代理可能中断，API会限制请求频率，连接可能超时，甚至网络会短暂中断。幸运的是，这些问题通常是暂时的。如果第一次请求失败，稍等片刻再试一次，往往就能成功。
---


# 搞懂 Tenacity：一行代码创建优雅简单的自动重试

在与AI大模型API服务交互时，我们总会面对一个无法回避的现实：网络并不总是可靠。代理可能中断，API会限制请求频率，连接可能超时，甚至网络会短暂中断。幸运的是，这些问题通常是暂时的。如果第一次请求失败，稍等片刻再试一次，往往就能成功。

这种“再试一次”的策略，就是**重试**。它不是什么高深的技术，却是构建可靠、健壮应用程序的关键一环。

## 一切始于一个简单的 API 调用

让我们从一个真实场景开始：调用 AI 模型的 API 来完成字幕翻译。一段基础的代码可能长这样：

```python
# 一个基本的 API 调用函数
from openai import OpenAI, APIConnectionError

def translate_text(text: str) -> str:
    message = [
        {'role': 'system', 'content': '您是一名顶级的字幕翻译引擎。'},
        {'role': 'user', 'content': f'<INPUT>{text}</INPUT>'},
    ]
    model = OpenAI(api_key="YOUR_API_KEY", base_url="...") 

    try:
        response = model.chat.completions.create(model="gpt-4o", messages=message)
        if response.choices:
            return response.choices[0].message.content.strip()
        raise RuntimeError("API未返回有效结果")
    except APIConnectionError as e:
        print(f"网络连接失败: {e}。需要重试...")
        raise # 程序在这里崩溃
    except Exception as e:
        print(f"发生其他错误: {e}")
        raise
```

这段代码能工作，但它很“脆弱”。一旦遇到网络问题，它只会打印一条消息然后崩溃。我们当然可以手动写一个 `for` 循环和 `time.sleep` 来实现重试：

```python
# 手动实现重试
for attempt in range(3):
    try:
        # ... API 调用逻辑 ...
        return response.choices[0].message.content.strip()
    except APIConnectionError as e:
        print(f"第 {attempt + 1} 次尝试失败: {e}")
        if attempt == 2: # 检查是否是最后一次尝试
            raise
    # ... 对其他异常也要重复写相似的逻辑 ...
```
这种方式很快就会让代码变得复杂和混乱。重试逻辑和业务逻辑混杂在一起，而且如果我们需要在多个地方重试，就不得不编写大量重复、易错的代码。

这时，`tenacity` 库就派上用场了。

## Tenacity 入门：一行代码实现优雅重试

`tenacity` 是一个专为 Python 设计的通用重试库。它的核心理念就是用简单、清晰的方式，为任何可能失败的操作添加重试能力。

我们可以用 `@retry` 装饰器轻松改造上面的函数：

```python
from tenacity import retry

@retry
def translate_text(text: str) -> str:
    # ... 内部逻辑和之前完全一样，无需任何改动 ...
```

仅仅加了一行 `@retry`，这个函数就焕然一新。现在，如果 `translate_text` 函数内部抛出任何异常，`tenacity` 都会自动捕获它，并立即重新调用该函数。它会一直重试，永不停止，直到函数成功返回一个值。

## 精细控制：让重试按我们的意愿行事

“永远重试”通常不是我们想要的。我们需要设定一些边界。`tenacity` 提供了丰富的参数来实现精细的控制。

### 1. 设置停止条件 (`stop`)

我们不希望无限次地重试。最常见的需求是“最多尝试 N 次”，这可以通过 `stop_after_attempt` 实现。

```python
from tenacity import retry, stop_after_attempt

# 总共尝试 3 次
@retry(stop=stop_after_attempt(3))
def translate_text(text: str) -> str:
    # ...
```

> **注意：一个重要的认知细节**
> `stop_after_attempt(N)` 指的是**总共的尝试次数**，而不是“重试次数”。
>
> *   `stop_after_attempt(1)` 意味着：执行 1 次，如果失败，**立即停止**。它根本不会重试。
> *   `stop_after_attempt(3)` 意味着：总共执行 3 次，即**首次尝试 + 2 次重试**。
>
> 记住这个简单的规则：**如果你希望在失败后能额外重试 `Y` 次，那么你应该设置 `stop_after_attempt(Y + 1)`。**

我们也可以按时间来限制，比如 `stop_after_delay(10)` 表示“10秒后停止”。更棒的是，你可以用 `|` (或) 操作符将它们组合起来，哪个条件先满足就停止。

```python
from tenacity import stop_after_delay

# 总次数达到 5 次或总耗时超过 30 秒，就停止
@retry(stop=(stop_after_attempt(5) | stop_after_delay(30)))
def translate_text(text: str) -> str:
    # ...
```

### 2. 设置等待策略 (`wait`)

连续不断地快速重试可能会压垮服务器或达到频率限制。在两次重试之间加入等待是明智之举。最简单的是固定等待，使用 `wait_fixed`：

```python
from tenacity import retry, wait_fixed

# 每次重试前都等待 2 秒
@retry(wait=wait_fixed(2))
def translate_text(text: str) -> str:
    # ...
```
在与网络服务交互时，更推荐**指数退避** (`wait_exponential`)。它会随着重试次数的增加，逐渐拉长等待时间（比如 2s, 4s, 8s...），能有效避免在服务高峰期造成“重试风暴”。

```python
from tenacity import wait_exponential

# 首次重试等 2^1=2s, 之后等 4s, 8s... 最多等到 10s
@retry(wait=wait_exponential(multiplier=1, min=2, max=10))
def translate_text(text: str) -> str:
    # ...
```

### 3. 决定何时重试 (`retry`)

默认情况下，`tenacity` 会在遇到任何异常时都进行重试。但这并不总是对的。

比如，`APIConnectionError` (网络问题) 或 `RateLimitError` (请求太频繁) 是典型的**可恢复错误**，重试很有可能会成功。但 `AuthenticationError` (密钥错误) 或 `PermissionDeniedError` (无权限) 则是**致命错误**，重试多少次都注定失败。

我们可以通过 `retry_if_not_exception_type` 来告诉 `tenacity` 遇到某些致命错误时不要重试。

> **注意：一个常见的语法陷阱**
> 当指定多个异常类型时，你可能会直觉地写成 `AuthenticationError | PermissionDeniedError`。
> ```python
> # 错误的方式！这无法按预期工作
> @retry(retry=retry_if_not_exception_type(AuthenticationError | PermissionDeniedError))
> ```
> 在现代 Python 中，`A | B` 创建的是一个 `UnionType` 对象，而 `tenacity` 的这个函数期望接收一个包含异常类型的**元组 (tuple)**。
>
> 正确的写法是：
> ```python
> from openai import AuthenticationError, PermissionDeniedError
>
> # 正确的方式！使用元组
> @retry(retry=retry_if_not_exception_type((AuthenticationError, PermissionDeniedError)))
> ```
> 这个小小的括号，至关重要。

## 当重试最终失败时

如果 `tenacity` 在用尽所有尝试后依然失败，它会怎么做？默认情况下，它会抛出一个 `RetryError`，其中包含了最后一次失败时的原始异常。

但有时我们不希望程序崩溃，而是想执行一些自定义的收尾工作，比如记录一条详细的错误日志，并返回一个友好的错误提示。这就是 `retry_error_callback` 的用武之地。

```python
from tenacity import RetryCallState

def my_error_callback(retry_state: RetryCallState):
    # retry_state 对象包含了这次重试的所有信息
    print(f"所有 {retry_state.attempt_number} 次尝试均失败！")
    return "默认的翻译结果或错误提示"

@retry(stop=stop_after_attempt(3), retry_error_callback=my_error_callback)
def translate_text(text: str) -> str:
    # ...
```
现在，如果函数连续失败 3 次，它不会抛出异常，而是会返回 `my_error_callback` 函数的返回值。

> **注意：回调函数里的一个微妙陷阱**
> 在回调函数中，我们如何安全地获取最后一次的异常信息？
> ```python
> def return_last_value(retry_state: RetryCallState):
>     # 危险！这会重新抛出异常！
>     return "失败：" + retry_state.outcome.result()
> ```
> `retry_state.outcome` 代表了最后一次尝试的结果。如果那次尝试是失败的，调用 `.result()` 方法会**重新抛出那个异常**，导致我们的回调函数自身崩溃。
>
> 正确的做法是使用 `.exception()` 方法，它会安全地返回异常对象，而不会抛出它：
> ```python
> def return_last_value(retry_state: RetryCallState):
>     # 安全！这只会返回异常对象
>     last_exception = retry_state.outcome.exception()
>     return f"经过 {retry_state.attempt_number} 次尝试后失败。最后一次错误是: {last_exception}"
> ```

## 当 Tenacity 遇到面向对象

随着代码库的增长，我们通常会把逻辑封装在类里。这时，我们会遇到两个更深层次的问题：**作用域**和**继承**。

### 1. 回调函数如何访问 `self`？

假设我们的回调函数需要访问类的实例变量（比如 `self.name`）。我们可能会很自然地这样写：
```python
class TTS:
    def __init__(self, name):
        self.name = name

    def _my_callback(self, retry_state):
        print(f"实例 {self.name} 的任务失败了。")
        # ...

    # 这会失败！NameError: name 'self' is not defined
    @retry(retry_error_callback=self._my_callback)
    def run(self):
        # ...
```
这会立即报错，因为 `@retry` 装饰器是在**定义类**的时候执行的，那时还没有任何类的实例，自然也就没有 `self`。

最优雅的解决方案是**“内部函数闭包”**模式。我们将装饰器应用在一个定义于实例方法内部的函数上：

```python
class TTS:
    def __init__(self, name):
        self.name = name

    def run(self):
        # 在这里，self 是可用的！
        @retry(
            # 因为装饰器在 run 方法内部，它可以“捕获”到 self
            retry_error_callback=self._my_callback
        )
        def _execute_task():
            # 这里是真正需要重试的逻辑
            print(f"正在为 {self.name} 执行任务...")
            raise ValueError("任务失败")

        # 调用被装饰的内部函数
        return _execute_task()

    def _my_callback(self, retry_state: RetryCallState):
        # ...
```
这是一种非常强大且 Pythonic 的模式，完美解决了作用域问题。

### 2. 如何在父类中定义重试策略，让所有子类继承？

这是我们讨论的最后一个，也是最体现设计思想的问题。假设我们有一个 `BaseProvider` 父类，和多个 `MyProviderA`, `MyProviderB` 子类。我们希望所有子类都遵循统一的重试规则。

一个常见的错误想法是在父类的空方法上应用装饰器。当子类重写该方法时，父类上的装饰器也随之丢失。

正确的解决方案是**模板方法设计模式 (Template Method Pattern)**。

*   **父类**定义一个**模板方法** (`_exec`)，它包含了不可变的算法框架（即我们的重试逻辑）。
*   这个模板方法会调用一个抽象的**钩子方法** (`_do_work`)。
*   **子类**只需要实现这个钩子方法，填充具体的业务逻辑即可。

让我们用一个更完整的例子来构建这个模式：

```python
from openai import OpenAI, AuthenticationError, PermissionDeniedError
from tenacity import retry, stop_after_attempt, wait_fixed, retry_if_not_exception_type, RetryCallState

# 1. 定义一个通用的、可复用的异常处理类
class RetryRaise:
    # 定义不应重试的致命异常
    NO_RETRY_EXCEPT = (AuthenticationError, PermissionDeniedError)

    @classmethod
    def _raise(cls, retry_state: RetryCallState):
        ex = retry_state.outcome.exception()
        if ex:
            # 根据不同异常类型，进行日志记录并抛出自定义的、更友好的 RuntimeError
            # ... 此处可以添加更复杂的异常分类逻辑 ...
            raise RuntimeError(f"重试 {retry_state.attempt_number} 次后最终失败: {ex}") from ex
        raise RuntimeError(f"重试 {retry_state.attempt_number} 次后失败，但未捕获到异常。")

# 2. 实现模板父类
class BaseProvider:
    @retry(
        stop=stop_after_attempt(3),
        wait=wait_fixed(2),
        retry=retry_if_not_exception_type(RetryRaise.NO_RETRY_EXCEPT),
        retry_error_callback=RetryRaise._raise
    )
    def _exec(self) -> str:
        """这是模板方法，负责重试。子类不应重写它。"""
        # 调用钩子方法，由子类实现
        return self._do_work()

    def _do_work(self) -> str:
        """这是钩子方法，子类必须实现它。"""
        raise NotImplementedError("子类必须实现 _do_work 方法")

# 3. 实现具体的子类
class DeepSeekProvider(BaseProvider):
    def __init__(self, api_key: str, base_url: str):
        self.api_key = api_key
        self.base_url = base_url
        self.model = OpenAI(api_key=self.api_key, base_url=self.base_url)

    def _do_work(self) -> str:
        """这里只关心核心业务逻辑，完全不用考虑重试。"""
        response = self.model.chat.completions.create(
            model="deepseek-chat",
            messages=[{'role': 'user', 'content': '你是谁？'}]
        )
        if response.choices:
            return response.choices[0].message.content.strip()
        raise RuntimeError(f"API未返回有效结果: {response}")

# --- 如何使用 ---
 provider = DeepSeekProvider(api_key="...", base_url="...")
 try:
     # 我们调用的是 _exec，它包含了重试逻辑
     result = provider._exec()
     print("执行成功:", result)
 except RuntimeError as e:
     # 如果最终失败，会捕获到 RetryRaise 抛出的友好异常
     print("执行失败:", e)
```

通过这种方式，我们将重试策略（不变的部分）和业务逻辑（可变的部分）完美地分离开来，构建了一个既健壮又易于扩展的框架。

----

`tenacity` 是一个看似简单，实则功能强大的库。它不仅能轻松应对简单的重试场景，更能通过巧妙的设计模式，解决复杂的、面向对象的应用程序中的可靠性问题。

更完整的使用说明请查看官方文档  <http://tenacity.readthedocs.io/>
