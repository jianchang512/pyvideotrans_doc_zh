---
title: 如何在 Windows 10 上安装 Miniconda 并配置 AI 软件环境
date: 2025-03-13 18:02:11
description: 这篇教程会手把手教你在 Windows 10 上安装 Miniconda，下载地址是官方提供的，然后配置一个 Python 3.10 的环境，再安装一些常用模块。别担心，即使你完全没基础，也能轻松搞定！
---

Miniconda 是一个轻量版的 Anaconda，能帮你快速安装 Python 和各种软件包，比完整的 Anaconda 更适合新手用来运行 AI 程序。

这篇教程会手把手教你在 Windows 10 上安装 Miniconda，下载地址是官方提供的，然后配置一个 Python 3.10 的环境，再安装一些常用模块。别担心，即使你完全没基础，也能轻松搞定！

---

## 第一步：下载并安装 Miniconda

1. **下载 Miniconda**  
   - 打开浏览器，输入这个网址，然后按回车：  
     **[https://www.anaconda.com/download/success#miniconda](https://www.anaconda.com/download/success#miniconda)**
   - 往下拉，找到“Miniconda”部分，点击 Windows 的下载链接，或者直接用这个直链：  
     **[https://repo.anaconda.com/miniconda/Miniconda3-latest-Windows-x86_64.exe](https://repo.anaconda.com/miniconda/Miniconda3-latest-Windows-x86_64.exe)**
![](https://pvtr2.pyvideotrans.com/1741858490861_image.png)

   - 文件会保存到你的“下载”文件夹（比如 `C:\Users\你的用户名\Downloads`），文件名类似 `Miniconda3-latest-Windows-x86_64.exe`。

2. **安装 Miniconda**  
   - 双击下载的文件，弹出安装窗口。  
   - 点击“Next”（下一步），同意许可协议（点“I Agree”）。  
![](https://pvtr2.pyvideotrans.com/1741858543784_image.png)

   - **重要：** 在“Advanced Options”页面，勾选 **Add Miniconda3 to my PATH environment variable** （把 Miniconda 加到环境变量），这样就能直接用 `conda` 命令操作了, 否则你会遇到错误    `conda 不是内部或外部命令，也不是可运行的程序或批处理文件。`![](https://pvtr2.pyvideotrans.com/1741858681423_image.png)
    - 注意：有些电脑可能会警告说不推荐加到 PATH，别管它，勾上就好，这是新手常见的坑，不勾的话后面命令用不了。  


![](https://pvtr2.pyvideotrans.com/1741858751173_image.png)

   - 点击“Install”（安装），等待几分钟，完成后点“Finish”（完成）。

---

## 第二步：检查安装并创建 Python 3.10 虚拟环境

1. **打开命令行终端（CMD）**  
   - 按住键盘上的 Windows 键 + R，弹出“运行”窗口。  
   - 输入 `cmd`，按回车，打开黑色命令行窗口。

2. **检查 Miniconda 是否安装成功**  
   - 在命令行输入：  ` conda --version `  
按回车，如果显示类似 `conda 25.1.1`，说明安装成功。

![](https://pvtr2.pyvideotrans.com/1741859714241_image.png)

如果提示“不是内部或外部命令”，说明没加环境变量，重新安装并勾选
**Add Miniconda3 to my PATH environment variable**。
![](https://pvtr2.pyvideotrans.com/1741859759865_image.png)
3. **创建一个 Python 3.10 的虚拟环境**  
   - 在命令行输入：       `conda create -n myai python=3.10`  
   -  myai  是环境的名字，可以随便取（比如 `ai_env`）。  ![](https://pvtr2.pyvideotrans.com/1741859804821_image.png)
   - 按回车后，系统会下载 Python 3.10 和一些基础包，过程中会问你“Y/N”，输入 `y` 并回车，继续安装。
   
![](https://pvtr2.pyvideotrans.com/1741859833599_image.png)




4. **激活虚拟环境**  
   - 输入：  `conda activate myai`  
     按回车，如果命令行前面多了 `(myai)`，说明成功进入了环境。

![](https://pvtr2.pyvideotrans.com/1741859933246_image.png)

5. **常用虚拟环境命令**  
   - **退出环境**：输入 `conda deactivate`，按回车，`(myai)` 消失就退出了。  
   - **查看所有环境**：输入 `conda env list`，可以看到你创建的环境列表。  
   - **删除环境**（如果用不上）：输入 `conda env remove -n myai`，就删掉了。

---

## 第三步：用 pip 安装模块和 requirements.txt

1. **确保在虚拟环境中**  
   - 输入 `conda activate myai`，确认命令行有 `(myai)`。

2. **安装一个常用模块试试**  
   - 比如安装 `numpy`（一个数学计算工具，很多 AI 软件需要）：  
     `pip install numpy`  
     按回车，下载安装后可以用 `python -c "import numpy; print(numpy.__version__)"` 检查版本。

3. **安装 requirements.txt**  
   - 如果你的 AI 软件提供了一个 `requirements.txt` 文件（列了需要的软件包），把它复制到某个文件夹（比如桌面新建的“AIProject”）。  
   - 进入文件夹,然后删掉文件夹地址栏中内容，输入`cmd`回车，打开终端窗口：  
     
![](https://pvtr2.pyvideotrans.com/1741860046149_image.png)

   - 然后输入：  
     `pip install -r requirements.txt`  
     按回车，会自动安装文件里列的所有包。

---

## 第四步：pip 常用命令和常见错误处理

1. **常用 pip 命令**  
   - **检查 pip 版本**：`pip --version`，看看是不是最新。  
   - **更新 pip**：如果版本老，输入 `pip install --upgrade pip` 更新。  
   - **列出已安装的包**：`pip list`，看看都装了啥。  
   - **卸载某个包**：比如 `pip uninstall numpy`，不想用就删掉。

2. **常见错误及解决办法**  
   - **网络错误（下载慢或失败）**：  
  - 可能是网络问题，多试几次，或者用国内镜像加速：  
       `pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple`  
   - **权限错误（Access Denied）**：  
     - 以管理员身份运行 CMD：右键“开始”菜单，选“命令提示符（管理员）”，再试试命令。  
![](https://pvtr2.pyvideotrans.com/1741860107200_image.png)

   - **依赖冲突（版本不兼容）**：  
     - 提示某个包冲突时，试试更新 pip（`pip install --upgrade pip`），然后重新安装。如果还不行，问问软件作者推荐的版本。  
   - **命令无效**：  
     - 如果 `pip` 用不了，输入 `python -m ensurepip` 和 `python -m pip install --upgrade pip` 修复。

---

现在 Miniconda 装好了，Python 3.10 的环境也配置好了，还能安装各种需要的包。如果你的 AI 软件有运行说明（比如 `python run.py`），在虚拟环境中（有 `(myai)` 的状态下）输入对应命令试试。

