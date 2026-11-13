---
title: ChatTTS部署方法
date: 2024-01-22 14:33:00
description: ChatTTS部署方法
---

## ChatTTS部署方法

![](https://pvtr2.pyvideotrans.com/images/49c0cea156fee169155c6a79794e8bf8.jpg)

## Windows预打包版

1. 从 [Releases](https://github.com/jianchang512/chatTTS-ui/releases)中下载压缩包，解压后双击 app.exe 即可使用


## Linux 下源码部署

1. 配置好 python3.9+环境
2. 创建空目录 `/data/chattts` 执行命令 `cd /data/chattts &&  git clone https://github.com/jianchang512/chatTTS-ui .`
3. 创建虚拟环境 `python3 -m venv venv`
4. 激活虚拟环境 `source ./venv/bin/activate`
5. 安装依赖 `pip3 install -r requirements.txt`
6. 如果不需要CUDA加速，执行 `pip3 install torch torchaudio`

	如果需要CUDA加速，执行 
	```
		pip install torch torchaudio --index-url https://download.pytorch.org/whl/cu118
		
		pip install nvidia-cublas-cu11 nvidia-cudnn-cu11
	
	```
	另需安装 CUDA11.8 ToolKit，请自行搜索安装方法
7. 执行 `python3 app.py` 启动，将自动打开浏览器窗口，默认地址 `http://127.0.0.1:9966`


## MacOS 下源码部署

1. 配置好 python3.9+环境,安装git ，执行命令  `brew install git python@3.10`
   继续执行

    ```
    export PATH="/usr/local/opt/python@3.10/bin:$PATH"

    source ~/.bash_profile 
	
	source ~/.zshrc

    ```
	
2. 创建空目录 `/data/chattts` 执行命令 `cd /data/chattts &&  git clone https://github.com/jianchang512/chatTTS-ui .`
3. 创建虚拟环境 `python3 -m venv venv`
4. 激活虚拟环境 `source ./venv/bin/activate`
5. 安装依赖 `pip3 install -r requirements.txt`
6. 安装torch `pip3 install torch torchaudio`
7. 执行 `python3 app.py` 启动，将自动打开浏览器窗口，默认地址 `http://127.0.0.1:9966`


## Windows源码部署

1. 下载python3.9+，安装时注意选中`Add Python to environment variables`
2. 下载并安装git，https://github.com/git-for-windows/git/releases/download/v2.45.1.windows.1/Git-2.45.1-64-bit.exe 
3. 创建空文件夹 `D:/chattts` 并进入，地址栏输入 `cmd`回车，在弹出的cmd窗口中执行命令 `git clone https://github.com/jianchang512/chatTTS-ui .`
4. 创建虚拟环境，执行命令 `python -m venv venv`
4. 激活虚拟环境，执行 `.\venv\scripts\activate`
5. 安装依赖,执行 `pip install -r requirements.txt`
6. 如果不需要CUDA加速，执行 `pip install torch torchaudio`

	如果需要CUDA加速，执行 
	
	```
		pip install torch torchaudio --index-url https://download.pytorch.org/whl/cu118
		
	```
	
	另需安装 CUDA11.8 ToolKit，请自行搜索安装方法
7. 执行 `python app.py` 启动，将自动打开浏览器窗口，默认地址 `http://127.0.0.1:9966`



## 常见问题

1. 从 modelscope 下载模型后缺少 spk_stat.pt

改成从 modelscope下载模型后，下载成功运行时提示`AssertionError: Missing spk_stat.pt: **/pzc163/chatTTS/asset/spk_stat.pt`

从 https://huggingface.co/2Noise/ChatTTS/blob/main/asset/spk_stat.pt 下载 spk_stat.pt 复制到 asset 目录后问题解决

2. mac下报错时，请尝试

`brew install libomp` 

3. 提示not support python3.12+

请降级到 3.10版本