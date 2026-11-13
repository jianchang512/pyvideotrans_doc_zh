---
title: 如何在 Windows 10 上使用 pip 和 venv 并安装 PyTorch
date: 2025-03-13 21:40:39
description: 还会指导你安装 PyTorch（一个常用的 AI 工具），支持不同的 CUDA 版本（11.8、12.4、12.6）。别担心，我会一步步带你走，即使没基础也能学会！
---



在使用 Python 运行 AI 软件时，可能会经常用到 `pip` 和 `venv`。`pip` 是安装 Python 软件包的工具，而 `venv` 能帮你创建独立的环境，避免软件冲突。这篇教程会教你怎么用它们，还会指导你安装 PyTorch（一个常用的 AI 工具），支持不同的 CUDA 版本（11.8、12.4、12.6）。别担心，我会一步步带你走，即使没基础也能学会！

---

## 第一步：认识 pip 的常见命令和错误处理

### 常用 pip 命令
1. **安装一个模块**  
   - 比如安装 `requests`（一个网络工具）：  
     ```
     pip install requests
     ```  
     按回车，下载并安装完成。

2. **检查已安装的模块**  
   - 输入：  
     ```
     pip list
     ```  
     会列出你装过的所有模块和版本。

3. **更新 pip 本身**  
   - 如果 pip 版本老了，输入：  
     ```
     pip install --upgrade pip
     ```  
     保持最新能减少问题。

4. **卸载模块**  
   - 不想要某个模块，比如 `requests`，输入：  
     ```
     pip uninstall requests
     ```  
     按提示输入 `y` 确认删除。

### 常见错误及解决办法
1. **模块版本冲突**  
   - 比如提示“某某模块需要 xxx 版本，但已安装 yyy 版本”。  
   - **解决**：先卸载冲突的模块（`pip uninstall 模块名`），再安装指定版本：  
     ```
     pip install 模块名==版本号
     ```  
     比如 `pip install numpy==1.21.0`。版本号可以问软件作者。

2. **网络连接错误**  
   - 提示“连接超时”或“下载失败”。  
   - **解决**：多试几次，或者换个网络。如果还不行，下一节会教你用镜像源加速。

3. **模块未找到错误**  
   - 比如输入 `pip install xxx` 后提示“找不到模块”。  
   - **解决**：检查拼写，或者上网搜一下正确名字（比如 Google “Python xxx module”）。也可能是 pip 没装好，输入：  
     ```
     python -m ensurepip
     python -m pip install --upgrade pip
     ```  
     修复后再试。

---

## 第二步：设置 pip 镜像源和恢复默认

### 为什么要用镜像源？
默认情况下，pip 从国外服务器下载模块，速度可能很慢。镜像源就像国内的“替身服务器”，能加速下载。

### 指定镜像源
1. **临时使用镜像源**  
   - 在命令后加 `-i` 和镜像地址，比如用清华大学的源：  
     ```
     pip install numpy -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```  
     下载会快很多。

2. **永久设置镜像源**  
   - 打开文件资源管理器，在地址栏输入：  
     ```
     %APPDATA%
     ```  
     按回车，进入 `C:\Users\你的用户名\AppData\Roaming`。  
   - 新建文件夹 `pip`，进去后新建文本文件，命名为 `pip.ini`（注意改后缀）。  
   - 用记事本打开 `pip.ini`，输入：  
     ```
     [global]
     index-url = https://pypi.tuna.tsinghua.edu.cn/simple
     ```  
   - 保存关闭，以后 pip 都会用这个源。

### 恢复默认源
- 如果想用回官方源，打开 `pip.ini`，把内容改成：  
  ```
  [global]
  index-url = https://pypi.org/simple
  ```  
- 或者直接删除 `pip.ini` 文件。

---

## 第三步：使用 venv 创建和管理虚拟环境

`venv` 是 Python 自带的工具，能创建独立的环境，适合运行不同项目的 AI 软件。

1. **创建虚拟环境**  
   - 进入一个文件夹（比如新建的“AIProject”）：  
   进入该文件夹，删掉地址栏内容，输入`cmd`回车，打开终端
   - 在终端中输入命令创建环境：  
     ```
     python -m venv myenv
     ```  
     `myenv` 是环境名字，会在文件夹里生成一个“myenv”子文件夹。

2. **激活虚拟环境**  
   - 输入：  
     ```
     myenv\Scripts\activate
     ```  
     按回车，看到 `(myenv)` 就成功了。

3. **退出虚拟环境**  
   - 输入：  
     ```
     deactivate
     ```  
     `(myenv)` 消失就退出了。

4. **删除虚拟环境**  
   - 不需要时，直接删除 `myenv` 文件夹就行（右键 > 删除）。

---

## 第四步：用 pip 安装 PyTorch（支持 CUDA 11.8、12.4、12.6）

PyTorch 是 AI 软件常用的模块，支持 GPU 加速（需要英伟达显卡和 CUDA）。我们以 Windows 为例安装不同 CUDA 版本的 PyTorch。

1. **确保在虚拟环境中**  
   - 输入 `myenv\Scripts\activate`，确认有 `(myenv)`。

2. **安装 PyTorch**  
   - 根据你的 CUDA 版本（教程二有检查方法），输入对应命令：  
  - **CUDA 11.8**：  
       ```
       pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118
       ```  
     - **CUDA 12.4**：  
       ```
       pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu124
       ```  
     - **CUDA 12.6**：  
       ```
       pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu126
       ```  
   - `torch` 是主模块，`torchvision` 处理图像，`torchaudio` 处理音频。

3. **验证安装**  
   - 输入：  
     ```
     python -c "import torch; print(torch.__version__); print(torch.cuda.is_available())"
     ```  
   - 如果输出类似 `2.6.0`（版本号）和 `True`，说明安装成功且 GPU 可用。  
   - 如果是 `False`，检查 CUDA 是否装好（参考教程二）。

4. **没装 CUDA？用 CPU 版**  
   - 如果没有英伟达显卡或 CUDA，输入：  
     ```
     pip install torch torchvision torchaudio
     ```  
     装的是 CPU 版，能跑但速度慢点。

---

## 最后：开始你的 AI 之旅！

现在你会用 pip 装模块、设置镜像源、用 venv 管理环境，还装好了 PyTorch。如果你的 AI 软件有运行命令（比如 `python run.py`），在虚拟环境中试试吧！
