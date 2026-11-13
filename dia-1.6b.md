---
title: Windows10/11上源码安装部署 Dia-1.6B TTS
date: 2024-01-22 14:33:00
description: windows10/11上源码安装部署 Dia-1.6B TTS
---

# windows10/11上源码安装部署 Dia-1.6B TTS

> v3.68 起，F5-TTS的配置接口可同时用于 F5-TTS/Spark-TTS/index-TTS/Dia-TTS, 只需要填写正确的url地址(本机通常是http://127.0.0.1:7860)并在下拉列表中选择对应服务即可。
>

## 1. 确保已安装 python3.10和Git

> 如果未安装 python3.10，[查看该教程安装](/_posts/pythoninstall)
>
> 如果没有安装git，请打开页面 https://git-scm.com/downloads/win   点击 `64-bit Git for Windows Setup` 下载exe安装

## 2. 下载源码并安装

找到一个文件夹，在地址栏输入`cmd`回车，然后依次执行以下命令
```
git clone https://github.com/nari-labs/dia.git
cd dia
python -m venv .venv
venv\scripts\activate

pip install -e .

```
如果未出现红色报错，则安装完成


## 3. 启用webui
进入dia文件夹，能看到`app.py`的目录，地址栏输入`cmd`，然后执行`venv\scripts\activate`激活虚拟环境，再执行下面启动命令

`python app.py`

如果未报错，则到浏览器中打开`http://127.0.0.1:7860`

