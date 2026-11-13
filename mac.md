---
title: MacOS源码部署视频翻译软件
date: 2024-01-22 14:33:00
description: MacOS上使用 brew 安装 python3 和 ffmpeg，如果你的Mac上不支持 brew 命令，需要先安装 Homebrew
---
## 预先安装相关依赖



MacOS上使用 brew 安装 ffmpeg，如果你的Mac上不支持 brew 命令，需要先安装 Homebrew

使用该命令安装 Homebrew， `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`

上述命令需要科学上网才可成功执行，如果失败，请使用下方命令
 
`/bin/zsh -c "$(curl -fsSL https://gitee.com/cunkai/HomebrewCN/raw/master/Homebrew.sh)"`

打开一个终端，执行以下命令:`brew install ffmpeg libsndfile git`

确认都执行正确无报错，再接下向下看



## 下载源码并解压

1. 推荐使用 uv 安装，如果还没有uv，请执行下列命令先安装uv

`curl -LsSf https://astral.sh/uv/install.sh | sh`


2. 下载源码，执行以下命令下载源代码
	```
	git clone https://github.com/jianchang512/pyvideotrans
	cd pyvideotrans
	```
3. 执行命令 `uv sync` 安装模块，根据网络情况，可能需要几分钟到十几分钟，中国大陆用户可使用镜像加速安装，命令：`uv sync --index https://mirrors.aliyun.com/pypi/simple/`

> 默认不安装 `qwen-tts`、 `qwen-asr` 、`moss-tts` 、`chatterbox` 本地渠道，若需要全部安装请执行 `uv sync --all-extra `
> - 单独安装 `qwen-tts`,执行  `uv sync --extra qwentts`
> - 单独安装 `qwen-asr`,执行  `uv sync --extra qwenasr`
> - 单独安装 `moss-tts`,执行  `uv sync --extra mosstts`
> - 单独安装 `chatterbox`,执行  `uv sync --extra chatterbox`

4. 执行命令 `uv run sp.py` 打开软件界面





## 如何再次打开软件

每次打开软件，都需要在软件目录内打开一个终端，然后执行 `uv run sp.py`这条命令就能打开软件了


