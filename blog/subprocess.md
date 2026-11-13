---
title: 在 Python 中轻松驾驭 Shell 命令：从入门到灵活应用（Windows 和 Linux 版）
date: 2025-04-08 15:33:00
description: 本文详细讲解了Python subprocess模块及其核心函数subprocess.run，用于在Python中调用Shell命令。通过分析args、shell、capture_output、stdout、stderr、text、encoding、errors、input、check等常用参数，结合Linux和Windows平台的具体示例，涵盖了运行简单/复杂命令、捕获输出/错误、异常处理、调用外部程序（如FFmpeg）及输入数据等核心场景。强调了shell=True与False的区别、capture_output与check的搭配、以及FFmpeg日志输出特性。最后总结了不同场景下的选项搭配建议，帮助读者全面掌握subprocess模块，提高命令行调用的灵活性和代码健壮性。
---

# 在 Python 中轻松驾驭 Shell 命令：从入门到灵活应用（Windows 和 Linux 版）




## 先聊聊为啥写这篇

如果你对 Python 3 有所了解，可能知道 `subprocess` 是跑 Shell 命令的好工具。它能让 Python 调用系统命令，功能强大。

但它选项多、知识点杂，管道、输入输出、错误处理、编码问题一大堆，经常让人用得稀里糊涂。很多时候，我们随便抄段代码，能跑就行，却不清楚为啥这么写、啥时候该换个方法。

今天，根据官方文档，我又重学了一遍 `subprocess`，争取掌握的全面又透彻，知道在各种场景下怎么用、怎么灵活搭配选项！

---

## 什么是 `subprocess`，为啥要用它？

`subprocess` 是 Python 的一个模块，用来运行系统命令。比如：
- Linux 上跑 `ls -l` 列目录；
- Windows 上跑 `dir` 查看文件。

为啥不用 Shell 脚本？Python 代码更清晰、易维护，还能加逻辑处理。`subprocess.run`（Python 3.5 引入）是最好用的函数，咱们今天就围绕它讲透。

---

## `subprocess.run` 的常用参数一览

`subprocess.run` 有很多参数，先统一介绍，后面场景再细讲用法。这样你能先有个整体印象，知道每个选项干啥用。

| 参数名            | 作用                                      | 常见取值                              | 注意事项                              |
|-------------------|-------------------------------------------|---------------------------------------|---------------------------------------|
| `args`            | 要运行的命令                              | 列表（如 `["ls", "-l"]`）或字符串（如 `"ls -l"`） | 列表用于无 Shell，字符串用于 `shell=True` |
| `shell`           | 是否用 Shell 执行                         | `True` / `False`（默认）             | `True` 效率低，Windows 内置命令需用    |
| `capture_output`  | 是否捕获 stdout 和 stderr                 | `True` / `False`（默认）             | 等于 `stdout=PIPE, stderr=PIPE`       |
| `stdout`          | 标准输出去向                              | `PIPE` / `None` / `STDOUT` / 文件对象 | `PIPE` 捕获，`None` 显示终端          |
| `stderr`          | 错误输出去向                              | `PIPE` / `None` / `STDOUT` / 文件对象 | `STDOUT` 合并到 stdout                |
| `text`            | 是否直接返回字符串                        | `True` / `False`（默认）             | `True` 需配 `encoding`，省去解码      |
| `encoding`        | 输出编码方式                              | `"utf-8"` / `"gbk"` 等               | 推荐 `"utf-8"`，Windows 注意系统编码  |
| `errors`          | 解码出错处理                              | `"strict"` / `"ignore"` / `"replace"` | 只对 `text=True` 有效                 |
| `input`           | 输入数据给命令                            | 字符串（如 `"data"`）                | `text=True` 时用字符串，否则用字节    |
| `check`           | 检查返回码，失败抛异常                    | `True` / `False`（默认）             | 抛 `CalledProcessError`               |

**返回对象**（`cp` 或异常 `e`）：
- `cp.returncode`：返回码（0 成功，非 0 失败）。
- `cp.stdout`：标准输出。
- `cp.stderr`：错误输出（或日志，如 FFmpeg）。
- `e.stdout` / `e.stderr`：异常时的输出和错误。

---

## 核心场景和用法：从简单到复杂

咱们用这些参数，逐步看常见场景的用法。

### 场景 1：跑简单命令并捕获输出

#### Linux：跑 `echo`
```python
import subprocess

cp = subprocess.run(
    args=["echo", "hello world"],
    capture_output=True,    # 捕获 stdout 和 stderr
    text=True,             # 直接返回字符串
    encoding="utf-8"       # UTF-8 编码
)
print(cp.stdout)  # 输出：hello world
```

#### Windows：跑 `dir`
```python
import subprocess

cp = subprocess.run(
    args="dir",
    shell=True,            # Windows 内置命令需要 Shell
    capture_output=True,
    text=True,
    encoding="utf-8"
)
print(cp.stdout)  # 输出：目录列表
```

**要点**：
- `capture_output=True` 简化捕获。
- Linux 用列表，Windows 内置命令用 `shell=True`。

#### 啥时候用？
- 跑简单命令，想拿结果。

---

### 场景 2：跑复杂命令（带管道 `|` ）

#### Linux：跑 `ls -l | grep file`
```python
import subprocess

cp = subprocess.run(
    args="ls -l | grep file",
    shell=True,
    capture_output=True,
    text=True,
    encoding="utf-8"
)
print(cp.stdout)  # 输出：过滤后的文件列表
```

#### Windows：跑 `dir | find "txt"`
```python
import subprocess

cp = subprocess.run(
    args='dir | find "txt"',
    shell=True,
    capture_output=True,
    text=True,
    encoding="utf-8"
)
print(cp.stdout)  # 输出：含 "txt" 的行
```

**要点**：
- `shell=True` 支持管道。

#### 啥时候用？
- 组合命令过滤输出。

---

### 场景 3：分别获取输出和错误

#### Linux：跑 `ls` 和不存在的文件
```python
import subprocess

cp = subprocess.run(
    args=["ls", "nope"],
    stdout=subprocess.PIPE,  # 单独捕获输出
    stderr=subprocess.PIPE,  # 单独捕获错误
    text=True,
    encoding="utf-8"
)
print(f"输出：{cp.stdout}")
print(f"错误：{cp.stderr}")  # 输出：ls: cannot access 'nope'
```

#### Windows：跑 `dir` 和不存在的文件
```python
import subprocess

cp = subprocess.run(
    args="dir nope",
    shell=True,
    stdout=subprocess.PIPE,
    stderr=subprocess.PIPE,
    text=True,
    encoding="utf-8"
)
print(f"输出：{cp.stdout}")
print(f"错误：{cp.stderr}")  # 输出：找不到文件
```

**要点**：
- `stdout=PIPE, stderr=PIPE` 分别捕获。

#### 啥时候用？
- 区分输出和错误。

---

### 场景 4：检查结果和异常处理

#### Linux：检查返回码 vs 抛异常
```python
import subprocess

# 方法 1：检查返回码
cp = subprocess.run(
    args=["ls", "nope"],
    capture_output=True,
    text=True,
    encoding="utf-8"
)
if cp.returncode != 0:
    print(f"失败！返回码：{cp.returncode}")
    print(f"错误：{cp.stderr}")

# 方法 2：用 check=True
try:
    cp = subprocess.run(
        args=["ls", "nope"],
        capture_output=True,
        text=True,
        encoding="utf-8",
        check=True
    )
except subprocess.CalledProcessError as e:
    print(f"失败！返回码：{e.returncode}")
    print(f"输出：{e.stdout}")
    print(f"错误：{e.stderr}")
```

#### Windows：类似处理
```python
import subprocess

try:
    cp = subprocess.run(
        args="dir nope",
        shell=True,
        capture_output=True,
        text=True,
        encoding="utf-8",
        check=True
    )
except subprocess.CalledProcessError as e:
    print(f"失败！返回码：{e.returncode}")
    print(f"输出：{e.stdout}")
    print(f"错误：{e.stderr}")
```

**要点**：
- `capture_output=True` 只捕获。
- `check=True` 失败抛异常。

#### 啥时候用？
- 确保命令成功。

---

### 场景 5：调用外部程序（如 FFmpeg）
> 特别注意：FFmpeg 正常日志在 stderr 中而非 stdout

#### 转码视频文件
用 FFmpeg 把 `input.mp4` 转成 `output.mp3`：

```python
import subprocess

cp = subprocess.run(
    args=["ffmpeg", "-i", "input.mp4", "output.mp3", "-y"],
    capture_output=True,
    text=True,
    encoding="utf-8"
)
if cp.returncode == 0:
    print("转码成功！")
    print(f"日志：{cp.stderr}")  # FFmpeg 正常日志在 stderr
else:
    print(f"转码失败！返回码：{cp.returncode}")
    print(f"输出：{cp.stdout}")
    print(f"错误详情：{cp.stderr}")

# 或者用 check=True
try:
    cp = subprocess.run(
        args=["ffmpeg", "-i", "input.mp4", "output.mp3", "-y"],
        capture_output=True,
        text=True,
        encoding="utf-8",
        check=True
    )
    print("转码成功！")
    print(f"日志：{cp.stderr}")  # FFmpeg 正常日志在 stderr
except subprocess.CalledProcessError as e:
    print(f"转码失败！返回码：{e.returncode}")
    print(f"输出：{e.stdout}")
    print(f"错误详情：{e.stderr}")
```

**要点**：
- 用列表调用外部程序。
- FFmpeg 正常日志在 `stderr`，失败信息也在 `stderr`，`stdout` 通常为空。
- `check=True` 时，成功日志用 `cp.stderr`，失败信息用 `e.stderr`。

#### 啥时候用？
- 处理音视频、文件转换。

---

### 场景 6：输入数据给命令

```python
import subprocess

data = "line1\nline2 py\nline3"
cp = subprocess.run(
    args=["grep", "py"],
    input=data,
    capture_output=True,
    text=True,
    encoding="utf-8"
)
print(cp.stdout)  # 输出：line2 py
```

**要点**：
- `input` 传数据给命令。

#### 啥时候用？
- 处理程序生成的数据。

---

## 选项搭配详解

### 1. `shell=True` 还是 `False`？
- **`False`**：高效安全，用列表。
- **`True`**：支持复杂命令，用字符串。

---

### 2. `capture_output=True` vs `check=True`
- **`capture_output=True`**：捕获输出和错误，不关心结果。
- **`check=True`**：检查返回码，失败抛异常。
- **搭配**：
  ```python
  cp = subprocess.run(["ls", "nope"], capture_output=True, check=True, text=True, encoding="utf-8")
  ```

---

### 3. `stdout` 和 `stderr`
- **`PIPE`**：捕获到程序。
- **`None`**：显示终端。
- **`STDOUT`**（仅 `stderr`）：合并到 stdout。
- **文件**：写入文件。

---

### 4. `text=True`
- **作用**：返回字符串，需配 `encoding`。
- **不加**：返回字节，需手动解码。

---

### 5. `encoding` 和 `errors`
- **`encoding="utf-8"`**：推荐。
- **`errors`**：`replace` 防乱码。

---

## 常见问题

1. **Windows 为啥老用 `shell=True`？**
   - 内置命令依赖 `cmd.exe`。

2. **FFmpeg 输出在 stderr 咋办？**
   - 用 `capture_output=True`，正常和错误都在 `cp.stderr` 或 `e.stderr`。

3. **编码乱了咋办？**
   - `text=True, encoding="utf-8", errors="replace"`。

---

## 啥场景咋用？

| 场景             | 用法                                   | 选项搭配                              |
|------------------|---------------------------------------|---------------------------------------|
| 简单命令         | `["cmd", "arg"]`                     | `capture_output=True, text=True`     |
| 复杂命令         | `"cmd1 | cmd2"`                      | `shell=True, capture_output=True`    |
| 分别捕获         | `["cmd", "arg"]`                     | `stdout=PIPE, stderr=PIPE`           |
| 检查结果         | 加 `check=True`                      | `capture_output=True`                |
| 外部工具         | `["ffmpeg", "-i", "in", "out"]`      | `capture_output=True, check=True`    |
| 输入数据         | 用 `input`                           | `text=True, encoding="utf-8"`        |

**核心技巧**：
- 用 `capture_output=True` 简化捕获。
- `text=True` 省心，`check=True` 严格。
- FFmpeg 等工具注意 `stderr`。

