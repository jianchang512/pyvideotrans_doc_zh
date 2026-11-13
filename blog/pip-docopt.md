---
title: 安装 Python 包时，我遇到的两个报错和解决方法-No module named docopt,gbk codec can't decode
date: 2025-07-27 18:33:00
description: 轻松搞定东方语言(方言和小语种)音视频转写为字幕-Dolphin整合包
---



## 安装 Python 包时，我遇到的两个报错和解决方法


最近在配置一个英伟达的开源项目 Parakeet 时，需要安装不少 Python 依赖包。过程不算复杂，但中途遇到了两个有点意思的报错。这些问题本身不难，但如果你是第一次遇到，可能会卡住一阵子。

这里我把解决过程分享出来，希望能帮到有类似困扰的朋友。

## 第一个问题：`ModuleNotFoundError: No module named 'docopt'`

当我运行 `pip install -r requirements.txt` 后，安装过程在一个叫 `docopt` 的包上停住了。报错信息很清楚：

```
ModuleNotFoundError: No module named 'docopt'
```

奇怪的是，我就是要安装 `docopt`，它却告诉我找不到 `docopt` 模块。

仔细看了一下完整的报错日志，发现问题出在包的 `setup.py` 安装脚本上。这个脚本在执行安装前，居然先尝试 `import docopt`。这就成了一个“先有鸡还是先有蛋”的问题：我想安装它，但它的安装脚本却需要它已经被安装。

这其实是这个包自身打包方式的问题，而不是 pip 的错。

解决方法很简单，既然它需要一个 `docopt` 模块文件才能继续，那我们就手动给它一个。

1.  直接在浏览器里搜索 `docopt.py`。
2.  在搜索结果中，通常能从 GitHub 或其他代码托管平台找到这个文件的源代码。
3.  把这个 `docopt.py` 文件下载下来，直接放到我的 Parakeet 项目根目录里。
4.  然后，回到命令行，重新运行之前的 `pip install` 命令。

这一次，当安装脚本需要 `docopt` 模块时，它在当前目录下找到了这个 `docopt.py` 文件。问题解决，安装继续。

## 第二个问题：`UnicodeDecodeError: 'gbk' codec can't decode...`

解决了上一个问题，我继续安装。没想到，很快又遇到了第二个拦路虎。这次是安装 `indic_numtowords` 这个包的时候。

报错信息是这样的：

```
UnicodeDecodeError: 'gbk' codec can't decode byte 0xae in position 268: illegal multibyte sequence
```

这是一个非常典型的编码错误。

问题的原因是，在 Windows 系统上，默认的文本编码是 GBK。而 `indic_numtowords` 这个包的安装脚本在读取一个文件（比如 `README.md`）时，没有指定用什么编码。于是，系统就默认用 GBK 去读。但这个文件很可能是用 UTF-8 编码保存的。

这就好比让一个只懂中文的人去读一篇英文文章，他看到不认识的字符，自然就出错了。

要解决这个问题，我们需要告诉 Python，在执行这次安装时，请统一使用 UTF-8 编码来读写文件。

方法也很直接，就是在执行安装命令前，先设置一个临时的环境变量。

1.  打开你的命令行工具（CMD 或 PowerShell）。
2.  输入下面这行命令，然后回车。这个命令只在当前窗口有效，关掉就没了，很安全。

    **如果你用的是 CMD:**
    ```shell
    set PYTHONUTF8=1
    ```

    **如果你用的是 PowerShell:**
    ```shell
    $env:PYTHONUTF8=1
    ```

3.  **在同一个窗口里**，重新运行 `pip install indic_numtowords`。

执行后，安装顺利通过。因为 Python 在这个环境变量的指示下，使用了正确的 UTF-8 编码去读取文件，没有再出现乱码和报错。

这两个问题都和 `pip` 工具本身关系不大，而是和被安装的包如何编写有关。希望我的这点经验能为你节省一些排查问题的时间。