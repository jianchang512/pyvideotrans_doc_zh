---
title: 安装声音克隆工具 clone-voice
date: 2025-07-15 14:33:00
description: 这是一个声音克隆工具，可使用任何人类音色，将一段文字合成为使用该音色说话的声音，或者将一个声音使用该音色转换为另一个声音。使用非常简单，没有N卡GPU也可以使用，下
---

# 配音渠道：clone-voice

> 本项目所用模型为 [coqui.ai](https://coqui.ai/) 出品的 xtts_v2，模型开源协议为 [Coqui Public Model License 1.0.0](https://coqui.ai/cpml.txt)，使用本项目请遵循该协议，协议全文见 https://coqui.ai/cpml.txt

## 一、什么是 clone-voice

clone-voice 是一个声音克隆工具，可使用任何人类音色，将一段文字合成为使用该音色说话的声音，或者将一个声音使用该音色转换为另一个声音。

主要特点：
- **使用简单**：没有 N 卡 GPU 也可以使用，下载预编译版本，双击 `app.exe` 打开 Web 界面，鼠标点点就能用
- **多语言支持**：支持中、英、日、韩、法、德、意等 16 种语言
- **在线录音**：可在线从麦克风录制声音作为参考音频
- **效果**：英文效果很棒，中文效果还凑合

> **模型限制**：xtts 模型仅可用于学习研究，不可用于商业用途。

---

## 二、前置条件

| 条件 | 说明 |
|------|------|
| 操作系统 | Windows（预编译版）、Linux、macOS（源码部署） |
| 磁盘空间 | 预编译版约 4.7GB（主文件 1.7G + 模型 3G） |
| Python | 源码部署需要 Python 3.9~3.11 |
| GPU | 可选，有 NVIDIA 显卡可启用 CUDA 加速 |

---

## 三、Windows 预编译版使用方法

### 第一步：下载

[点击此处打开 Releases 下载页面](https://github.com/jianchang512/clone-voice/releases)，下载：
- 预编译版主文件（约 1.7GB）
- 模型文件（约 3GB）

### 第二步：解压

下载后解压到某处，比如 `E:/clone-voice`

### 第三步：解压模型

模型下载后解压到软件目录下的 `tts` 文件夹内，解压后效果如图：

![image](https://github.com/jianchang512/clone-voice/assets/3378335/4b5a60eb-124d-404b-a748-c0a527482e90)

> `tts` 文件夹内应有 3 个子文件夹。

### 第四步：启动

1. 双击 `app.exe`
2. 等待自动打开 Web 窗口
3. **请仔细阅读 cmd 窗口的文字提示**，如有错误均会在此显示

> 启动后需要冷加载模型，会消耗一些时间，请耐心等待显示出 `http://127.0.0.1:9988`，并自动打开浏览器页面后，稍等两三分钟后再进行转换。

### 第五步：使用

#### 文字→声音

1. 选择「文字→声音」按钮
2. 在文本框中输入文字，或点击导入 SRT 字幕文件
3. 点击「立即开始」

#### 声音→声音

1. 选择「声音→声音」按钮
2. 点击或拖拽要转换的音频文件（mp3/wav/flac）
3. 从「要使用的声音文件」下拉框中选择要克隆的音色
4. 如果没有满意的，可以点击「本地上传」按钮，选择已录制好的 5~20s 声音文件
5. 或者点击「开始录制」按钮，在线录制 5~20s 声音
6. 点击「立即开始」

> 如果机器拥有 N 卡 GPU 并正确配置了 CUDA 环境，将自动使用 CUDA 加速。

---

## 四、源码部署（Linux / Mac / Windows）

> **重要提示**：源码版需要在 `.env` 中设置 `HTTP_PROXY=` 代理（比如 `http://127.0.0.1:7890`），因为需要从 huggingface.co 和 github.com 下载模型，这些网址国内无法直接访问，必须保证代理稳定可靠。

### 部署步骤

1. **安装 Python 和 Git**：要求 Python 3.9~3.11，安装 [Git](https://github.com/git-for-windows/git/releases/download/v2.44.0.windows.1/Git-2.44.0-64-bit.exe)

2. **拉取源码**：
   ```bash
   # 创建空目录，比如 E:/clone-voice
   # 在该目录下打开 cmd，然后执行：
   git clone git@github.com:jianchang512/clone-voice.git .
   ```

3. **创建虚拟环境**：
   ```bash
   python -m venv venv
   ```

4. **激活环境**（Windows）：
   ```bash
   E:/clone-voice/venv/scripts/activate
   ```

5. **安装依赖**：
   ```bash
   pip install -r requirements.txt --no-deps
   ```

6. **启用 CUDA 加速**（可选，需要 NVIDIA 显卡）：
   ```bash
   pip uninstall -y torch
   pip install torch torchaudio --index-url https://download.pytorch.org/whl/cu121
   ```

7. **安装 FFmpeg**：
   - Windows：解压 `ffmpeg.7z`，将 `ffmpeg.exe` 放到与 `app.py` 同一目录
   - Linux/macOS：到 [FFmpeg 官网](https://ffmpeg.org/download.html) 下载，将 `ffmpeg` 可执行文件放到根目录

   ![image](https://github.com/jianchang512/clone-voice/assets/3378335/0c61c8b6-7f7e-475f-8984-47fb87ba58e8)

8. **首次运行下载模型**：
   ```bash
   python code_dev.py
   ```
   - 提示同意协议时输入 `y`
   - 等待模型下载完毕（需要全局代理）

9. **正式启动**：
   ```bash
   python app.py
   ```

10. **训练模型**（可选）：
    ```bash
    python train.py
    ```
    训练参数在 `param.json` 中调整。

---

## 五、在 pyVideoTrans 中使用

1. 启动 clone-voice 的 Web 界面（默认地址 `http://127.0.0.1:9988`）
2. 打开 pyVideoTrans，点击菜单 → TTS设置 → clone-voice
3. 填写 API 地址：`http://127.0.0.1:9988`
4. 点击「测试」，若无报错则配置成功
5. 在主界面「配音渠道」下拉列表中选择「clone-voice」

---

## 六、参考音频要求

| 项目 | 要求 |
|------|------|
| 格式 | WAV、MP3、FLAC 均可 |
| 时长 | 5~20 秒（最佳），保证合成效果 |
| 内容 | 发音清晰准确，无背景噪声 |
| 语言 | 支持 16 种语言 |

---

## 七、常见错误和注意事项

### 1. 模型下载需要代理

源码版需要在 `.env` 中设置 `HTTP_PROXY=` 代理，因为模型托管在 huggingface.co，国内无法直接访问。必须保证代理稳定可靠，否则大模型下载可能中途失败。

### 2. 每次启动都检测/更新模型

每次启动都会连接墙外检测或更新模型。如不想每次检测，可手动修改依赖包文件：

打开 `\venv\Lib\site-packages\TTS\utils\manage.py`，大约 389 行附近，`def download_model` 方法中，注释掉 `if md5sum is not None:` 开始到 `else` 结束的那段代码。

### 3. 启动后很久不动

启动后需要冷加载模型，会消耗一些时间，请耐心等待显示出 `http://127.0.0.1:9988`，并自动打开浏览器页面后，稍等两三分钟后再进行转换。

### 4. cmd 窗口很久不动，需要按回车才继续

在 cmd 左上角图标上单击，选择「属性」，取消「快速编辑」和「插入模式」的复选框。

### 5. 声音-声音线程启动失败

首先确认模型已正确放置（`tts` 文件夹内有 3 个文件夹）：

![image](https://github.com/jianchang512/clone-voice/assets/3378335/4b5a60eb-124d-404b-a748-c0a527482e90)

如果已正确放置但仍报错，[点击下载 extra-to-tts_cache.zip](https://github.com/jianchang512/clone-voice/releases/download/v0.0.1/extra-to-tts_cache.zip)，将解压后得到的 2 个文件复制到软件根目录的 `tts_cache` 文件夹内。

如果上述方法无效，在 `.env` 文件中 `HTTP_PROXY` 后填写代理地址（如 `HTTP_PROXY=http://127.0.0.1:7890`），必须确保代理稳定。

### 6. 提示文本长度超限

```
The text length exceeds the character limit of 182/82 for language
```

由句号分隔的句子太长导致。建议将太长的语句使用句号隔开，而不是大量使用逗号。或者打开 `clone/character.json` 文件手动修改限制。

### 7. 提示 `symbol not found __svml_cosf8_ha`

打开 https://www.dll-files.com/svml_dispmd.dll.html，下载 dll 文件后复制到 `C:\Windows\System32`。

---

## 八、CUDA 加速支持

### 安装 CUDA 工具

[详细安装方法](https://juejin.cn/post/7318704408727519270)

1. 升级显卡驱动到最新
2. 安装 [CUDA Toolkit 11.8](https://developer.nvidia.com/cuda-downloads)
3. 安装 [cuDNN for CUDA 11.X](https://developer.nvidia.com/rdp/cudnn-archive)

### 验证安装

按 `Win + R`，输入 `cmd` 回车，然后执行：

```bash
nvcc --version
```

确认有版本信息显示：

![image](https://github.com/jianchang512/pyvideotrans/assets/3378335/e68de07f-4bb1-4fc9-bccd-8f841825915a)

然后执行：

```bash
nvidia-smi
```

确认有输出信息并且能看到 CUDA 版本号：

![image](https://github.com/jianchang512/pyvideotrans/assets/3378335/71f1d7d3-07f9-4579-b310-39284734006b)

说明安装正确，可以使用 CUDA 加速。否则需重新安装。
