---
title: 半开源语音克隆神器 MegaTTS3：安装难、用起来更难？手把手带你从零到精通
date: 2025-03-18 15:33:00
description: 本教程提供MegaTTS3（字节跳动中英文语音克隆项目）在Windows系统上的详细安装和使用指南，解决官方文档简略、安装困难等问题。教程分步指导用户使用Miniconda创建和配置虚拟环境，下载并放置源码，安装依赖库（特别指出Windows环境下安装要点及requirements.txt修改），下载预训练模型（需科学上网），并可选安装GPU加速支持。重点讲解了MegaTTS3“半开源”特性，即只能使用官方提供的特定音色文件进行克隆，并详细指导用户如何从Google Drive下载可用的音色（.wav和配套的.npy文件），最后演示如何在Web界面上传音色文件、输入文本并合成语音。文末还提供了用户上传自己音色文件以供官方审核使用的流程。
---


MegaTTS3 是字节跳动开源的一个中英文语音克隆项目，效果相当不错。然而，官方的安装文档有些简略，尤其是在 Windows 系统上，许多用户反映安装困难。本教程旨在帮助大家解决这些问题，顺利在 Windows 上安装并使用 MegaTTS3。

开始之前，我们先来了解几个教程中会用到的基本概念：

*   **CMD 控制台 (命令提示符)**：
    *   如何打开：在你想要操作的文件夹（比如 `D:/python/megatts3`）的地址栏里，删掉原来的路径，输入 `cmd` 三个字母，然后按回车键。 ![打开CMD控制台](https://pvtr2.pyvideotrans.com/1743753694409_image.png)
    *   作用：会弹出一个黑色的窗口，这就是 CMD 控制台。本教程中提到的所有 **命令** 都在这里输入并按回车执行。
 ![CMD控制台示例](https://pvtr2.pyvideotrans.com/1743753710261_image.png)
*   **执行命令**：
    *   在 CMD 控制台里输入一行指定的文本（即“命令”），然后按下回车键。

---

## 首次安装与配置

> **强烈建议**：在 Windows 系统下使用 `Miniconda` 来部署 MegaTTS3，这能避免很多不必要的麻烦。以下教程均基于 `Miniconda`。
> **示例路径**：本教程假设你的工作目录（安装 MegaTTS3 的地方）是 `D:/python/megatts3`。如果你的路径不同，请相应修改命令中的路径。

### 步骤一：安装 Miniconda

1.  **下载 Miniconda**：
    *   用浏览器访问：`https://www.anaconda.com/download/success#miniconda`
    *   找到页面中的 `Miniconda Installers` 部分，点击下载链接。
 ![在Miniconda Installers区域部分点击下载](https://pvtr2.pyvideotrans.com/1743752722653_image.png)

2.  **安装 Miniconda**：
    *   双击下载好的 `.exe` 安装文件。
    *   一路点击 `Next`，在许可协议页面点击 `I Agree`。
 ![点击Next](https://pvtr2.pyvideotrans.com/1743752841320_image.png)
    *   **关键步骤**：在选择安装选项时，**务必勾选第二个复选框 "Add Miniconda3 to my PATH environment variable"**。不用理会它旁边的红色警告文字，请务必勾选。
 ![选中第一第二复选框](https://pvtr2.pyvideotrans.com/1743752888140_image.png)
    *   继续点击 `Next` 或 `Install` 直至安装完成。

### 步骤二：下载 MegaTTS3 源代码

1.  **访问官方仓库**：
    *   打开网址  `https://github.com/bytedance/MegaTTS3`

2.  **下载代码**：
    *   点击绿色的 `<>Code` 按钮，然后选择 `Download ZIP`。
    *   ![点击Download ZIP下载压缩包](https://pvtr2.pyvideotrans.com/1743753384301_image.png)

3.  **解压并放置文件**：
    *   解压下载的 `MegaTTS3-main.zip` 文件。
    *   将解压后 `MegaTTS3-main` 文件夹 **里面** 的所有文件和子文件夹，**全部复制** 到你准备好的工作目录，例如 `D:/python/megatts3`。
 ![压缩包第二层中的所有文件](https://pvtr2.pyvideotrans.com/1743753622565_image.png)
    *   复制完成后，`D:/python/megatts3` 文件夹内应包含 `assets`, `checkpoints`, `tts` 文件夹等。
![正确解压复制后的文件列表](https://pvtr2.pyvideotrans.com/1743757823897_image.png)

### 步骤三：创建并激活虚拟环境

1.  **打开 CMD 控制台**：
    *   进入你的工作目录 `D:/python/megatts3`。
    *   在地址栏输入 `cmd` 并回车。
     ![打开CMD控制台](https://pvtr2.pyvideotrans.com/1743753694409_image.png)

2.  **创建虚拟环境**：
    *   在 CMD 控制台输入以下命令，创建一个名为 `megatts3env` 且使用 Python 3.10 的环境：
 ```bash
conda create -n megatts3env python=3.10
```
 ![执行命令创建虚拟环境](https://pvtr2.pyvideotrans.com/1743754961227_image.png)
安装过程中，如果提示 `Proceed ([y]/n)?`，输入 `y` 然后按回车。
![输入y，回车](https://pvtr2.pyvideotrans.com/1743753768973_image.png)

3.  **激活虚拟环境**：
    *   创建完成后，输入以下命令激活环境（**以后每次运行 MegaTTS3 前都需要执行此步骤激活虚拟环境**）：
```bash
conda activate megatts3env
```
![激活环境](https://pvtr2.pyvideotrans.com/1743753846907_image.png)

激活成功后，命令行提示符前会显示 `(megatts3env)`字样。

 ![激活后开头会有(megatts3env)字符](https://pvtr2.pyvideotrans.com/1743753856760_image.png)


**注意：以下所有安装和运行命令，都必须在已激活 `(megatts3env)` 环境的 CMD 控制台中执行！**

### 步骤四：安装依赖库

> **特别注意**：直接按照官方仓库文档在 Windows 上安装通常会失败。请务必严格按照以下顺序执行命令。

1.  **安装 pynini**：
    *   在 **已激活** 的 CMD 控制台中输入并执行：
        ```bash
        conda install -y -c conda-forge pynini==2.1.5
        ```
    *   等待命令执行完成。

2.  **安装 WeTextProcessing 1.0.3**：
    *   继续在 CMD 控制台中输入并执行：
        ```bash
        pip install WeTextProcessing==1.0.3
        ```
    *   等待命令执行完成。

3.  **修改 requirements.txt 并安装剩余依赖**：
    *   用记事本或其他文本编辑器打开工作目录 (`D:/python/megatts3`) 下的 `requirements.txt` 文件。
    *   找到并 **删除** 包含 `WeTextProcessing==1.0.4.1` 的那一行。
    *   保存并关闭文件。
    *   回到 CMD 控制台，执行以下命令来安装其余的依赖项：
        ```bash
        pip install -r requirements.txt
        ```
        
![必须删掉这行，否则必定报错](https://pvtr2.pyvideotrans.com/1743779797048_image.png)


4.  **设置环境变量**：
    *   将下面这行命令完整复制粘贴到 CMD 控制台，然后按回车执行。**注意**：如果你安装目录不是 `D:/python/megatts3`，请修改命令中的路径为你自己的实际路径。
        ```bash
        conda env config vars set PYTHONPATH="D:/python/megatts3;%PYTHONPATH%"
        ```
    *   设置成功后，你需要 **关闭当前 CMD 窗口，然后重新打开一个新的 CMD 窗口，并重新激活环境 `conda activate megatts3env`**，这样环境变量才会生效。

**检查**：如果以上步骤均未报错（忽略一些黄颜色警告信息 WARN），则依赖环境安装成功。如果遇到红色报错，请仔细检查是否严格按照顺序执行，特别是是否正确修改了 `requirements.txt` 文件。

![安装完成](https://pvtr2.pyvideotrans.com/1743755237234_image.png)

### 步骤五：下载预训练模型

> **提示**：模型文件托管在 Hugging Face Hub，国内访问无法访问，必须科学上网。

*   再次确保你的 CMD 控制台处于 **已激活** `(megatts3env)` 状态。
*   执行以下命令下载模型文件到工作目录下的 `checkpoints` 文件夹：
    ```bash
    huggingface-cli download ByteDance/MegaTTS3 --local-dir ./checkpoints --local-dir-use-symlinks False
    ```
*   耐心等待下载完成。
![模型下载中](https://pvtr2.pyvideotrans.com/1743758193908_image.png)

### 步骤六：(可选) 添加 GPU 加速支持

> 如果你的电脑配备了 **NVIDIA 显卡**，并且已经安装了 **CUDA 12.x** 版本，可以通过安装  GPU 版本来加速语音合成。

*   确保 CMD 控制台已激活 `(megatts3env)`。
*   执行以下命令：

```bash
    pip install --force-reinstall torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu126
```

到这里，所有的安装和配置工作就完成了！

---

## 启动 MegaTTS3 Web 服务

> 每次你想使用 MegaTTS3 时，都需要按以下步骤启动。

1.  **打开 CMD 控制台**：
    *   进入你的 MegaTTS3 工作目录 (例如 `D:/python/megatts3`)。
    *   在地址栏输入 `cmd` 并回车。

2.  **激活虚拟环境**：
    *   执行命令：`conda activate megatts3env`
 ![先激活环境再启动](https://pvtr2.pyvideotrans.com/1743758360015_image.png)

3.  **(建议) 修改 Gradio 监听地址**：
    *   **首次启动前强烈建议执行此步骤**：用代码编辑器或记事本打开文件 `D:\python\megatts3\tts\gradio_api.py`
    *   滚动到文件末尾，找到 `server_name="0.0.0.0"` 修改为 `server_name="127.0.0.1"`。
    *   **原因**：在 Windows 上使用 `0.0.0.0` 可能导致输出大量无关错误信息，甚至启动失败。修改为 `127.0.0.1` 通常更稳定。
    *   修改后保存文件。
    
![修改0.0.0.0为127.0.0.1](https://pvtr2.pyvideotrans.com/1743779994312_image.png)


![正确修改后](https://pvtr2.pyvideotrans.com/1743780020816_image.png)



4.  **启动程序**：
    *   在已激活的 CMD 控制台中执行：
        ```bash
        python tts/gradio_api.py
        ```
   *   如果启动成功，你会在 CMD 控制台中看到类似下面的输出，提示服务正在运行：
![启动成功后的画面](https://pvtr2.pyvideotrans.com/1743775458565_image.png)     

5.  **访问 Web 界面**：

    *   在你的浏览器中打开这个地址 `http://127.0.0.1:7929`。
 ![在浏览器中打开](https://pvtr2.pyvideotrans.com/1743775553395_image.png)

---

## 使用 MegaTTS3 进行语音克隆

### 理解音色来源

MegaTTS3 目前是一个 **“半开源”** 项目。这意味着你 **不能** 克隆任意你提供的声音样本。你 **只能** 使用字节跳动官方预先处理并公布在特定页面的音色（latents）。

*   **官方解释**：这样做是出于安全和法律法规的考虑。
*   **如果想克隆自己的声音**：你需要按照官方指定的方式提交你的音频，等待他们审核通过并放在 Latents  页面后，才能下载使用。（具体方法见下文）

### 下载可用的音色文件

1.  **访问 Google Drive 文件夹**：
    *   你需要科学上网访问 Google 服务并拥有一个Google账号（若没有可免费注册）。
    *   打开网址(即latens页面)：`https://drive.google.com/drive/folders/1QhcHWcy20JfqWjgqZX1YM3I6i9u4oNlr`
    *   这里有三个子文件夹 (`librispeech_testclean_40`, `official_test_case`, `user_batch_1-3`)，包含了所有当前可用的音色。

2.  **选择并下载文件**：
    *   进入任意一个文件夹，浏览里面的 `.wav` 音频文件，试听并选择你想要克隆的音色(wav文件上右键-打开方式-预览，可试听)。
![进入文件夹选择想克隆的音色](https://pvtr2.pyvideotrans.com/1743774978155_image.png)
![wav文件上右键-打开方式-预览，可试听](https://pvtr2.pyvideotrans.com/1743780255790_image.png)
    *   **重要**：当你决定下载某个 `.wav` 文件（例如 `speaker_xxx.wav`）时，**必须同时下载同名的 `.npy` 文件**（即 `speaker_xxx.npy`）。这两个文件是配对使用的，缺一不可。
 ![下载某个wav后，必须再下载同名的npy文件](https://pvtr2.pyvideotrans.com/1743775050834_image.png)
    *   将下载好的 `.wav` 和 `.npy` 文件保存在你的电脑上。

### 在 Web 界面合成语音

1.  **打开 Web 界面**：
    *   确保 MegaTTS3 服务正在运行，并在浏览器中打开 `http://127.0.0.1:7929`。

2.  **上传音色文件**：
    *   在页面上找到上传区域。
    *   点击 "Upload.wav" 区域，选择你刚才下载的 `.wav` 文件。
    *   点击 "Upload.npy" 区域，选择与 `.wav` 文件同名的那个 `.npy` 文件。![web界面使用](https://pvtr2.pyvideotrans.com/1743775747414_image.png)

3.  **输入文本并合成**：
    *   在 "Input Text" 输入框中，输入你想要让这个声音朗读的中文或英文文字。
    *   点击 "Submit" 按钮执行。

4.  **获取结果**：
    *   等待一小段时间，合成过程会在后台进行。
    *   完成后，右上角可以直接播放生成的语音，或者找到下载按钮将其保存为音频文件。
    
    
现在你已经成功在 Windows 上安装并使用 MegaTTS3 进行语音克隆了！


## 上传自己想克隆的音色

如果你希望克隆的音色不存在，可以自行上传

1. 首先将你希望克隆音色音频文件，转为wav格式音频，时长不要超过24秒，建议5-24秒内
2. 必须保证音频内容合法、不侵犯版权，并且无背景噪声、发音清晰、一个说话人
3. 打开该网址`https://drive.google.com/drive/folders/1gCWL1y_2xu9nIFhUX_OW5MbcFuB7J5Cl` ,将你整理好的wav文件拖拽进去，然后等待审核通过后即可使用了。

![拖拽上传](https://pvtr2.pyvideotrans.com/1743780628188_image.png)

> 字节审核通过后，会创建同名的npy文件，然后将wav和npy都放进上文所提的`latens`页面的`user_batch_1-3`文件夹内，然后你就可以下载这个wav文件以及同名npy文件来克隆了。
