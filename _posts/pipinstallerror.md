---
title: 执行 pip 安装命令时非常慢，又老是报错，该怎么办？
date: 2025-03-20 22:57:14
description: 遇到不少 pip 相关的错误，例如 `pip install xxx` 安装时，速度非常慢，几 kb/秒，对于尺寸几个 G 的模型而言，要下载到天荒地老。
---

经常玩 AI 工具，尤其是开源工具的朋友，不可避免会遇到需要本地使用 Python 部署的情况。那么想必会遇到不少 pip 相关的错误，例如 `pip install xxx` 安装时，速度非常慢，几 kb/秒，对于尺寸几个 G 的模型而言，要下载到天荒地老。

而有时直接无法下载，提示 `cannot connect huggingface.co`。好不容易配好了科学上网环境，结果又出错了，`proxyError`、`max retries` 等错误层出不穷。

现在就来简单处理下这几个问题。

### 1. 下载缓慢

pip 下载源在国外，众所周知，由于各种原因，国内下载不可避免会很慢。

**临时使用阿里云镜像**

如果只是安装一个模块，或偶尔使用，可在命令后指定使用阿里云镜像，方法如下：

```bash
pip install  xx模块名 -i  http://mirrors.aliyun.com/pypi/simple/ --trusted-host  mirrors.aliyun.com
```

**永久修改为阿里云镜像**

如果经常使用，临时方法很不方便。此时，在 Windows 上打开【计算机】-->【C盘】-->【用户】-->【你的用户名】-->【pip文件夹(如果不存在就创建)】 。 打开里面的 `pip.ini` 文件，同样如果不存在这个文件，就创建，注意后缀扩展名是 `.ini` 而不是 `.txt`。

然后清空里面内容，替换为：

```ini
[global]
index-url = http://mirrors.aliyun.com/pypi/simple/

[install]
trusted-host=mirrors.aliyun.com
```

![在pip.ini中永久指定镜像](https://pvtr2.pyvideotrans.com/1742481075455_image.png)

> 想使用其他镜像源怎么办？比如清华大学等？
> 方法一样，唯一不同的是 `index-url` 和 `trusted-host` 这两个，根据所提供的方式替换即可。

```ini
# 豆瓣：
[global]
index-url = https://pypi.douban.com/simple/

[install]
trusted-host=pypi.douban.com

# 清华大学：
[global]
index-url = https://pypi.tuna.tsinghua.edu.cn/simple/

[install]
trusted-host=pypi.tuna.tsinghua.edu.cn

# 中国科学技术大学：
[global]
index-url = https://pypi.mirrors.ustc.edu.cn/simple/

[install]
trusted-host=pypi.mirrors.ustc.edu.cn

```

### 2. 已经使用了国内镜像, 还是报一堆错误？

仔细查看错误中是否存在 `proxyError` 或 `Retrying (Retry(total=4` 等错误，如下图：

![使用了代理导致错误](https://pvtr2.pyvideotrans.com/1742481388265_image.png)

国内镜像不允许使用国外 IP 下载，出现这种报错，请关闭代理，或者按照上述方法反向操作，删掉 `pip.ini` 使用官方默认 pip 源。

### 3. 一堆红色报错，其中有很多版本号数字

如下图报错：

![指定的版本号不存在](https://pvtr2.pyvideotrans.com/1742481628575_image.png)

这种错误说明你指定的那个版本不存在，只有 `from versions:` 后的一堆版本号才是可以安装的。此时你可以找一个和你指定的那个版本号最接近的，并且第一个版本号数字一致的版本安装。

例如 `pip install requests==2.32.0`，想安装这个版本，但不存在。 如上图观察发现，以版本 `2.` 开头，并且最接近的版本号是 `2.32.2`，那么命令可以改为 `pip install requests==2.32.2`。

> 其他可能还会遇到一些问题，尤其是模块之间冲突问题。例如两个模块 a 和 b 都要使用模块 c，但 a 需要 c 的版本 1.2，但 b 需要 c 的版本 3.6，此时就造成冲突了。具体选择哪个，只能视情况而定。


