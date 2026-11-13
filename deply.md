---
title: 源码部署/MacOS/Linux/Windows
date: 2024-01-22 14:33:00
description: 源码部署
---


# MacOS/Linux/Windows 源码部署

> [推荐使用 uv 安装，如果还没有 uv，请查看官方安装方法](https://docs.astral.sh/uv/getting-started/installation/)
>
> [Windows用户也可查看该方法安装 uv 和 ffmpeg](https://pyvideotrans.com/blog/uv-ffmpeg)

1. MacOS/Linux预先安装工具

	MacOS需执行如下命令安装相关库
    ```
    brew install libsndfile

    brew install git

    brew install python@3.10
	
	brew uninstall --ignore-dependencies ffmpeg
	
	brew tap homebrew-ffmpeg/ffmpeg
	
	brew install homebrew-ffmpeg/ffmpeg/ffmpeg


    ```
	
	Linux需安装 `ffmpeg>=6`，命令`sudo yum install -y ffmpeg`或`apt-get install ffmpeg`
	
	Windows需下载 `ffmpeg>=6` 将`ffmpeg.exe`和`ffprobe.exe`放在`代码目录/ffmpeg`文件夹内，ffmpeg下载地址: https://www.gyan.dev/ffmpeg/builds/ffmpeg-release-full.7z

2. 创建不含空格和中文的文件夹，在终端中进入该文件夹，然后终端中执行命令 
	```
	git clone https://github.com/jianchang512/pyvideotrans
	cd pyvideotrans
	```
	> 也可直接去 https://github.com/jianchang512/pyvideotrans  该地址点击绿色*Code*按钮下载源码，解压后进入`sp.py`所在目录
	
3. 执行命令 `uv sync` 安装模块，根据网络情况，可能需要几分钟到十几分钟，中国大陆用户可使用镜像加速安装，命令：`uv sync --index https://mirrors.aliyun.com/pypi/simple/`
**Windows系统需要确保可以连接 github.com ，否则安装会失败**

> 默认不安装 `whisper.net` 本地渠道和webui界面`webui`，若需要全部安装请执行 `uv sync --all-extras `
>
> - 单独安装 `whisper.net`,执行  `uv sync --extra dotnet`
> - 若需 Webui界面,执行  `uv sync --extra webui`


4. 执行命令 `uv run sp.py` 打开软件界面, 执行`uv run webui.py` 打开webui界面




## 注意：


- 最新源码可通过 `dev` 分支获取

- 因 Qwen-TTS/Qwen-ASR 和 OmniVoice 对 transformers 不同版本的依赖冲突，前者固定 要求 4.57.6，后者需 >=5.3.0, 无法共存，为确保两者可内置于本项目中，对 `Qwen-TTS/Qwen-ASR` fork后做了修改，将从 https://github.com/jianchang512/Qwen3-asr 和 https://github.com/jianchang512/Qwen3-tts 安装，pyproject.toml中两者包名分别为 `qwen-tts-pvt`和`qwen-asr-pvt`，若需单独安装，需执行`uv add qwen-tts-pvt`和`uv add  qwen-asr-pvt`
