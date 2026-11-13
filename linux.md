---
title: Linux 源码部署
date: 2024-01-22 14:33:00
description: Linux上建议使用 `miniconda` 来安装部署，能避免掉很多的环境问题。
---
## Linux 源码部署

1. 安装 ffmpeg，centos下执行`yum install ffmpeg`,ubuntu 下执行`apt-get install ffmpeg`
2. 推荐使用 uv 安装，如果还没有 uv，请执行命令安装`curl -LsSf https://astral.sh/uv/install.sh | sh`
3. 下载源码，执行以下命令下载源代码
	```
	git clone https://github.com/jianchang512/pyvideotrans
	cd pyvideotrans
	```
4. 执行命令 `uv sync` 安装模块，根据网络情况，可能需要几分钟到十几分钟，中国大陆用户可使用镜像加速安装，命令：`uv sync --index https://mirrors.aliyun.com/pypi/simple/`

> 默认不安装 `qwen-tts`、 `qwen-asr` 、`moss-tts` 、`chatterbox` 本地渠道，若需要全部安装请执行 `uv sync --all-extra `
> - 单独安装 `qwen-tts`,执行  `uv sync --extra qwentts`
> - 单独安装 `qwen-asr`,执行  `uv sync --extra qwenasr`
> - 单独安装 `moss-tts`,执行  `uv sync --extra mosstts`
> - 单独安装 `chatterbox`,执行  `uv sync --extra chatterbox`

5. 执行命令 `uv run sp.py` 打开软件界面





**使用CUDA加速，分别执行**

> 示例

```
uv  remove torch torchaudio

uv  add --reinstall torch torchaudio --index-url https://download.pytorch.org/whl/cu126

uv add nvidia-cublas-cu12 nvidia-cudnn-cu12

```