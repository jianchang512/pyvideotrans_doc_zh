---
title: Offine-Text-Translate 本地离线文字翻译 OTT
date: 2024-01-22 14:33:00
description: Offine-Text-Translate 本地离线文字翻译 OTT
---



## Offine-Text-Translate 本地离线文字翻译 OTT

支持多语言的本地离线文字翻译，提供api接口。

>
>
> 本项目是基于 [开源项目LibreTranslate](https://github.com/LibreTranslate/LibreTranslate) 的再封装，目的是提供一个容易在本地机器上直接部署的翻译Api服务，无需docker，并提供 Windows 预编译exe包，不必部署，双击可用，方便新手和小白使用。
>
> 第一次启动需要下载模型，后续即可离线运行
>
> 如果你想使用原生LibreTranslate项目或想部署在docker，请访问 https://github.com/LibreTranslate/LibreTranslate
>

# Windows 预编译包使用

0. 如果你无法打开 https://raw.githubusercontent.com 这个地址，必须在 set.ini 中 `PROXY=` 设置代理地址

你也可以从百度网盘下载已打包好的模型，解压后将里面的".local" 文件夹复制覆盖到本软件根目录下,[点击去百度网盘下载](https://pan.baidu.com/s/1h5upbQIQw3LmUU6-3-YRbw?pwd=72bj)

1. [点击下载window预编译包](https://github.com/jianchang512/ott)，解压到无空格的英文目录下，双击 start.exe

2. 第一次启动后会自动下载模型，下载完毕后会显示当前Api服务的地址和端口，就可以使用了
(你也可以从百度网盘下载已打包好的模型，解压后将里面的".local" 文件夹复制覆盖到本软件根目录下)


3. 可以自己编写程序请求该Api服务，实现替代百度翻译等功能，或者填写到一些需要翻译功能的软件中，比如若要用在[视频翻译配音软件](https://github.com/jianchang512/pyvideotrans)中，在软件菜单-设置-OTT中填写 服务器地址和端口即可(默认http://127.0.0.1:9911)

# Window上源码部署

0. 首先到 python.org 下载 python3.9+版本并安装，建议3.10，在安装时仔细查看，选择 “Add ... Path”复选框，以方便后续使用

1. window上安装git客户端，[点击去下载](https://git-scm.com/download/win)，选择下载 64-bit Git for Windows Setup，下载后双击安装，一路下一步直到完成

2. 创建一个空目录，比如在 D盘下创建目录 ott，然后进入该目录 `D:/ott`,在文件夹地址栏输入 `cmd` 后回车，在打开的cmd黑窗口中输入`git clone https://github.com/jianchang512/ott .` 回车执行.

3. 创建虚拟环境，在刚刚的cmd窗口中继续输入命令 `python -m venv venv` 回车

>     此处注意：如果提示"python 不是内部或外部命令，也不是可运行的程序",说明 第0步 安装时未选中复选框，重新双击已下载的 Python安装包，选择“Modify”,然后注意选中“Add ... Path”。
>
>     重新安装python完毕后，**必须关闭已打开的cmd窗口**,否则可能还是提示命令未找到，然后进入`D:/ott`,地址栏输入`cmd`回车，再重新执行`python -m venv venv`
>

4. 上步命令执行成后，继续输入 `.\venv\scripts\activate` 回车，再执行 `pip install -r requirements.txt --no-deps`, 如果提示“not found version xxx”，请将将镜像源改为pip官方或者阿里云镜像

5. 如果需要启用cuda加速翻译，则继续分别执行
    `pip uninstall -y torch`

    `pip install torch==2.1.2 --index-url https://download.pytorch.org/whl/cu121`

6. 在set.ini中设置代理 PROXY=代理地址，比如如果你的代理地址是 `http://127.0.0.1:10189`,那么填写后`PROXY=http://127.0.0.1:10189`

7. 执行启动服务命令，`python start.py`