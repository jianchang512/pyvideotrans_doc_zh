---
title: 从零开始制作一个 AI 项目的 Windows 整合包：以 F5-TTS 为例，你也能成为整合包大神！
date: 2024-01-22 14:33:00
description: 本教程以 F5-TTS 为例，在 Windows 10 上使用 Python 3.10 创建一个整合包。主要步骤如下
---


对于 AI 新手来说，从源码部署一个 AI 软件可能会有些困难。有了整合包，只需下载、解压、双击即可使用，大大降低了使用门槛。但有时可能找不到现成的整合包，或者整合包没有及时更新。这时，你可以尝试自己创建一个整合包，并分享给其他人使用。

> 由于 AI 项目的模型通常很大，再加上 GPU 支持，即使压缩成 7z 格式，文件大小也可能远远超过 5GB，不管是上传网盘和存储，都比较困难。因此，本人不再制作整合包，如果你感兴趣，可以根据本教程自行制作整合包，并分享给他人。

本教程以 F5-TTS 为例，在 Windows 10 上使用 Python 3.10 创建一个整合包。主要步骤如下：

1.  **下载 Python 3.10 embed 版本** (不是 exe 安装包，而是一个zip压缩包)。
2.  **安装 pip**，并为项目设置依赖查找路径。
3.  **下载 F5-TTS 源码**。
4.  **安装 F5-TTS 的依赖模块**。
5.  **创建一键启动脚本**，并将模型目录设置到项目目录下。
6.  **配置代理**，下载模型。
7.  **执行一次克隆任务**，完成 Whisper等其他模型下载。
8.  **压缩为整合包**。
9. **为其他AI项目制作整合包**


---

## 开始前的准备：

首先，创建一个空文件夹。为避免出错，建议在非系统盘下创建一个英文文件夹，例如 `D:\f5win`。
本文以`D:\f5win`为例，然后，在该文件夹内再创建一个空文件夹 `runtime`，用于存放稍后下载的 Python 3.10 embed 版本文件。

**在开始之前，请务必点击文件夹导航栏的 “查看”，然后勾选 “文件扩展名”，否则后续操作容易出错，尤其是不熟悉扩展名的朋友。**

![显示文件扩展名](https://pvtr2.pyvideotrans.com/1742362096642_image.png)

---

## 1. 下载 Python 3.10 embed 版本

**重要提示：** 这里下载的是 embed 版本，而不是 exe 安装版。这个版本不依赖于你本机的 Python 环境，即使你本机已经安装了 Python，也仍然需要下载这个版本。

*   **下载地址：** [https://www.python.org/downloads/release/python-31011/](https://www.python.org/downloads/release/python-31011/)
*   打开网页后，拉到底部，点击 **`Windows embeddable package (64-bit)`** 下载。下载后得到一个 zip 压缩包。

    ![下载Python embed版本](https://pvtr2.pyvideotrans.com/1742360097619_image.png)

    **务必下载这个版本，不要弄错了！**

*   下载完成后，将 zip 压缩包解压，将里面的所有文件复制到刚才创建的 `runtime` 文件夹内。如下图所示：

    ![Python embed文件复制到runtime文件夹内](https://pvtr2.pyvideotrans.com/1742360433231_image.png)

---

## 2. 安装 pip 并修改包查找路径

embed 版本的 Python 不包含 pip 模块，因此需要手动安装。

*   **安装 pip：**
    *   打开此地址：[https://bootstrap.pypa.io/get-pip.py](https://bootstrap.pypa.io/get-pip.py)
    *   右键另存为，将文件保存到 `runtime` 目录下。保存后，`runtime` 文件夹内应该有一个名为 `get-pip.py` 的文件。

        ![下载get-pip.py](https://pvtr2.pyvideotrans.com/1742360448904_image.png)
        ![get-pip.py文件](https://pvtr2.pyvideotrans.com/1742360472565_image.png)
        ![runtime目录下的get-pip.py](https://pvtr2.pyvideotrans.com/1742360494176_image.png)

    *   在 `runtime` 文件夹的地址栏中输入 `cmd` 并回车，打开终端窗口（黑色窗口）。

        ![打开cmd，并确认路径是否在runtime内](https://pvtr2.pyvideotrans.com/1742360600919_image.png)

    *   在终端窗口中输入命令 `.\python get-pip.py` 并回车。**务必注意** 命令行显示的当前文件夹地址是否在 `runtime` 文件夹内，否则会出错。

        等待安装完成...

        ![pip安装中](https://pvtr2.pyvideotrans.com/1742360614065_image.png)

        pip 模块安装成功！

        ![pip 模块安装成功](https://pvtr2.pyvideotrans.com/1742360629734_image.png)

*   **修改 `python310._pth` 文件：**
    *   在 `runtime` 文件夹内找到名为 `python310._pth` 的文件，右键使用记事本打开。

        ![python310._pth文件内默认内容](https://pvtr2.pyvideotrans.com/1742360752236_image.png)

    *   在第二行的点符号 `.` 的下一行，添加以下三行内容：
        ```
        ./Lib/site-packages
        ../src
        ../src/f5_tts
        ```
    *   保存文件。修改后的文件内容如下，请仔细核对，确保正确：

        ![修改后的python310._pth文件内容应如下](https://pvtr2.pyvideotrans.com/1742363216298_image.png)

---

## 3. 下载 F5-TTS 源码

*   打开 F5-TTS 项目的 GitHub 仓库： [https://github.com/SWivid/F5-TTS](https://github.com/SWivid/F5-TTS)
*   下载源码的 zip 压缩包。

    ![下载F5-TTS源码](https://pvtr2.pyvideotrans.com/1742361017262_image.png)

*   解压下载的 zip 包，将 `F5-TTS-main` 文件夹内的 **所有文件** 复制到 `D:\f5win` 文件夹内。**注意：** 是复制里面的文件，而不是整个 `F5-TTS-main` 文件夹。

    ![复制F5-TTS-main内文件](https://pvtr2.pyvideotrans.com/1742361126719_image.png)

    解压后，`D:\f5win` 文件夹的内容应该如下图所示：

    ![正确复制后的D:\f5win目录结构](https://pvtr2.pyvideotrans.com/1742361138303_image.png)

---
**回到之前的CMD窗口**
> 还是刚才的终端窗口，执行下 `cd ../` 命令，确保命令行前的地址已减少了`runtime`字符，变成如下，接下来的操作都要在 `D:/f5win` 目录下执行

![](https://pvtr2.pyvideotrans.com/1742360938573_image.png)

## 4. 安装依赖模块

*   回到 cmd 终端窗口，再次确认当前命令行显示的路径是 `D:\f5win` (不带 `runtime`)。
*   执行以下命令安装依赖(注意空格和点符号)：
    ```
    .\runtime\python -m pip install -e .
    ```

    ![安装依赖中](https://pvtr2.pyvideotrans.com/1742361239203_image.png)

    等待安装完成...
    
![所有依赖安装完成](https://pvtr2.pyvideotrans.com/1742365877802_image.png)


*   **如果你希望整合包支持 NVIDIA 显卡 (可选)：**
    继续执行以下命令安装 CUDA 版本的 PyTorch 和 torchaudio(注意空格和点符号，命令不可换行)：
    ```
    .\runtime\python -m pip install torch==2.4.0+cu124 torchaudio==2.4.0+cu124 --extra-index-url https://download.pytorch.org/whl/cu124
    ```

---

## 5. 创建一键启动脚本

> 默认情况下，模型会保存到 C 盘的用户目录下。为了方便整合，我们需要将模型下载到整合包内。

*   在 `D:\f5win` 文件夹下右键--新建--文本文档，创建一个 `run.txt` 文件，用记事本打开，输入以下代码：

![](https://pvtr2.pyvideotrans.com/1742365627762_image.png)


    ```bat
    @echo off

    chcp 65001 > nul

    set "HF_HOME=%~dp0models"
    set "MODELSCOPE_CACHE=%~dp0models"

    echo HF_HOME: %HF_HOME%
    echo MODELSCOPE_CACHE: %MODELSCOPE_CACHE%

    "%~dp0runtime\python" -m f5_tts.infer.infer_gradio  --inbrowser

    pause
    ```
> 上面脚本意思是：将模型保存到当前目录的`models`文件夹内，然后启动web界面，并自动在浏览器中打开

*   保存文件后，将 `run.txt` 重命名为 `run.bat`。此时会弹出警告，选择“是”。**如果没有弹出警告，说明你修改错误，请检查是否已显示文件扩展名。**

    ![重命名为run.bat的警告弹窗](https://pvtr2.pyvideotrans.com/1742362190709_image.png)

---

## 6. 配置科学上网环境

由于国内网络环境的限制，无法直接访问 F5-TTS 模型所在的 Hugging Face (huggingface.co)。因此，你需要配置科学上网环境，并设置为系统代理。

例如，假如工具是 v2ray，中可以这样设置：

![v2ray中设置为系统代理](https://pvtr2.pyvideotrans.com/1742362853836_image.png)

配置好后，双击刚才创建的 `run.bat` 文件。

*   **如果双击后直接用记事本打开了文件，说明你修改扩展名失败，请回到本文顶部开始准备那里，按说明选中文件扩展名**
*   如果双击后打开了黑色窗口，则会开始下载模型到 `D:\f5win\models` 文件夹内。

    ![下载模型中](https://pvtr2.pyvideotrans.com/1742362951031_image.png)

*   如果出现类似下图的报错，说明你没有配置好科学上网环境，或者没有正确设置为系统代理，导致无法连接到 Hugging Face 下载模型。

    ![下载模型错误：无法连接到huggingface.co](https://pvtr2.pyvideotrans.com/1742363094226_image.png)
    
    > 有时会出现下载到一半失败了，最大原因是你梯子节点不稳，请更换更稳定的梯子或节点

*   模型下载完成后，会自动打开浏览器窗口。
    ![模型下载完毕，自动打开浏览器](https://pvtr2.pyvideotrans.com/1742363834396_image.png)

---

## 7. 执行一次克隆任务，下载 Whisper 模型

在进行语音克隆时，如果没有提供参考音频对应的文本，F5-TTS 会自动从 Hugging Face 下载 Whisper 模型。为了打包完整，我们需要提前下载它。

*   在自动打开的 Web 窗口中，选择一个 5-10 秒的干净参考音频，输入你想合成的文字（例如“你好啊朋友”），然后点击“合成”。

    ![Web界面](https://pvtr2.pyvideotrans.com/1742363930933_image.png)

*   这将开始下载 Whisper 模型。

    ![下载Whisper模型中](https://pvtr2.pyvideotrans.com/1742364455801_image.png)

*   当合成成功且没有出错时，就可以开始将项目打包为整合包了。

![](https://pvtr2.pyvideotrans.com/1742366963652_image.png)

---

## 8. 压缩为整合包

*   在压缩之前，你可以将 `run.bat` 重命名为 `点我启动.bat`，方便新手用户理解。
*   将整个 `D:\f5win` 文件夹压缩为 zip 文件，或者压缩为体积更小的 7z 文件。
*   将压缩包分享给其他人，他们解压后双击 `run.bat` (或 `点我启动.bat`) 即可使用。

![](https://pvtr2.pyvideotrans.com/1742367192101_image.png)

---

## 9. 如何为其他 AI 项目制作整合包

GitHub 上大部分基于 Python 的开源项目都可以使用类似的方法制作整合包。主要区别在于以下三点：

1.  **Python 版本：** Python 3.10 是最通用的版本，适用于大多数项目。如果项目有特殊要求（比如 3.11 或 3.12），可以在此页面 [https://www.python.org/downloads/windows/](https://www.python.org/downloads/windows/) 寻找对应版本的 `Windows embeddable package (64-bit)`。**务必注意，不可下载 exe 安装包。**

2.  **`python310._pth` 文件的内容：**
    *   `./Lib/site-packages` 仍然是必须添加的。
    *   其他的路径根据项目的实际情况添加。
    *   如果项目里有一个名为 `cfg` 的代码目录，则添加一行 `../cfg`。
    *   如果项目有一个 `src` 目录，`src` 下还有其他文件夹，则继续添加 `../src/目录名`。

3.  **`run.bat` 脚本的启动命令：**
    *   只需要修改这一行命令：
        ```
        "%~dp0runtime\python" -m f5_tts.infer.infer_gradio  --inbrowser
        ```
    *   `"%~dp0runtime\python"` 部分保持不变，后面的部分改为对应项目启动的命令（不包含 `python`）。
    *   如果有疑问，可以将 `run.bat` 的内容和对应项目的启动命令交给 AI，让它仿照 `run.bat` 给出新的启动脚本。记得告诉 AI，使用 `run.bat` 里的 Python 解释器。