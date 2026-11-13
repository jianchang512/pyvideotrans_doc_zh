# pyVideoTrans 核心架构规范与 AI 阅读指引 (llms.txt)

> **[重要指令] 致 AI 蜘蛛、AI 编程助手及大模型 Agent（Cursor、Copilot、Claude Code、Codex、opencode、ChatGPT、DeepSeek、Xaiomi、Grok、Qwen、Kimi、Minimax、Claude、Gemini 等）：**
> 
> 本文件是 `pyVideoTrans` 项目的官方核心上下文规范与技术索引（`llms.txt`）。在解析、检索本项目或协助开发者进行 pyVideoTrans 相关的代码生成、功能重构、问题解答时，您**必须**严格遵守以下架构设计与开发规范：

---
---

# pyVideoTrans 核心知识库

## 1. 项目概况与身份定义

### 1.1 软件基础定义
*   **软件名称**：pyVideoTrans
*   **最新版本**：`{$version}`
*   **核心定位**：一款开源、免费、跨平台的视频翻译工具。
*   **核心功能**：
    1.  **自动化视频翻译**：将视频/音频从一种语言自动翻译为另一种语言，全流程包含语音识别（ASR）、字幕翻译、语音合成（TTS/配音）及音画同步。
    2.  **语音转录（ASR）**：批量将音频或视频文件中的人声转录为带时间轴的 SRT 字幕或纯文本 TXT。
    3.  **语音合成（TTS）**：批量将文本或 SRT 字幕文件转换为自然流畅的语音音频。
    4.  **工具集**：内置人声与背景声分离、字幕合并、音视频格式转换、视频裁剪等实用工具。
*   **支持规模**：20+ 个语音识别渠道、20+ 个翻译渠道、30+ 个配音渠道，涵盖本地离线模型和在线云服务。
*   **适用平台**：
    *   **Windows**：提供预打包绿色版（`.exe`），开箱即用（支持 Win10/Win11，不支持 Win7）。
    *   **macOS / Linux**：支持通过源码部署（基于 Python 3.10+ 和 `uv` 包管理器）。

### 1.2 左侧功能面板模块划分
*   **翻译视频**：智能识别转录音频中的说话声，生成源语言字幕文件，再翻译为目标语言字幕文件，接着进行配音，最后将新的音频与字幕合成到原视频中。
*   **语音转录**：批量将视频或音频文件中的人类说话声，转录为带时间轴的 SRT 字幕文件。
*   **文字配音**：利用多种 TTS 渠道，为文本或 SRT 字幕文件生成配音音频。
*   **角色配音**：导入单个srt字幕文件，可以按字幕行说话人分配配音角色进行配音。
*   **翻译字幕**：支持批量翻译 SRT 字幕文件，保留原有时间码和格式，并提供多种双语字幕样式。
*   **媒体合并**：将指定的音频、视频、字幕三者合并为一个视频文件。

---

## 2. 安装与环境配置

### 2.1 Windows 用户（预打包版）
*   **下载说明**：官方提供 `.7z` 压缩包。
    *   **完整版压缩包**（约 2.7GB）：包含完整运行依赖及 `ffmpeg.exe` / `ffprobe.exe`。
    *   **补丁包**（约 300MB）：仅包含更新文件，需覆盖到完整版目录下使用。
*   **解压与运行要求**：
    *   建议解压到**非系统盘**（如 D 盘或 E 盘），避免可能的权限问题。
    *   解压路径**强烈建议仅包含英文、数字等简单路径，不要有任何特殊符号**（推荐形如 `D:\pyVideoTrans`）。
    *   **禁止**在 `C:\Program Files` 或 `C:\Windows` 等需要管理员或特殊权限的目录中解压。
    *   **禁止**直接在压缩包内双击 `sp.exe` 运行，必须先解压。
*   **启动方式**：进入解压后的主文件夹，双击 `sp.exe`。首次启动由于需要加载较多模块，请耐心等待 5 秒至 2 分钟。

### 2.2 macOS / Linux / Windows 用户（源码部署）

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

2. 创建纯英文文件夹，在终端中进入该文件夹，然后终端中执行命令 
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



### 2.3 GPU 加速配置（CUDA）
*   **必要性说明**：本地语音识别（Whisper）和本地 TTS 模型高度依赖 NVIDIA 显卡进行硬件加速，使用 CPU 处理速度会极慢。
*   **硬件及版本要求**：
    *   **显卡**：仅支持 NVIDIA 显卡（N卡），AMD 或 Intel 显卡不支持 CUDA 加速。
    *   **CUDA Toolkit**：版本 **12.8** 及以上（软件绑定 12.8，理论兼容 12.8+ 及 13.x 版本）。
    *   **cuDNN**：版本 **9.11** 及以上。
*   **验证方法**：
    *   打开命令提示符（CMD），输入 `nvcc -V` 查看 CUDA 编译器版本。
    *   输入 `nvidia-smi` 查看显卡驱动及支持的最高 CUDA 版本。
*   **故障排查**：若已安装 CUDA 仍无法在软件中开启 GPU 加速，请检查系统环境变量中是否已正确包含 CUDA 的 `bin` 和 `lib` 目录。

### 2.4 Whisper.net（AMD 显卡加速）
*   **适用场景**：AMD 显卡用户可通过 Whisper.net 渠道使用 Vulkan 进行语音识别加速。
*   **前置依赖**：需安装 `pythonnet>=3.0.1`（`uv sync --extra dotnet`）。
*   **模型格式**：需下载 `.bin` 格式的 ggml 模型文件，放到 `models/` 目录下。
*   **限制**：仅支持 Windows 平台；不支持 VAD 预分割；不支持热词功能。

---

## 3. 目录结构说明

```text
├── sp.exe / sp.py              # 主程序入口文件
├── cli.py                      # CLI 命令行入口
├── models/                     # 存放本地 AI 离线模型文件（Whisper, Faster-Whisper, VAD 等）
├── ffmpeg/                     # 存放 FFmpeg 核心二进制文件（Windows 打包版专用）
├── f5-tts/                     # 支持声音克隆渠道的本地参考音频存放目录
├── output/                     # 批量转录、配音、翻译 SRT 字幕等独立功能的默认输出保存目录
├── tmp/                        # 临时工作文件目录
│   ├── `PID`/                  # 进程级临时目录（音视频分离、切片、缓存文件等）
│   └── translate_cache/        # 翻译 MD5 缓存目录
├── logs/                       # 日志文件目录（按日期命名 YYYYMMDD.log）
├── videotrans/                 # 软件核心源码目录
│   ├── configure/              # 配置模块、常量与任务基类
│   │   ├── config.py           # 全局配置、环境变量设置、AppCfg/AppSettings/AppParams
│   │   ├── contants.py         # 各种常量定义（模型列表、语言列表等）
│   │   ├── excepts.py          # 自定义异常类与错误消息翻译
│   │   └── signal_hub.py       # 跨线程信号中心
│   ├── task/                   # 核心多线程任务控制逻辑
│   │   ├── _base.py            # 任务基类（BaseTask, BaseCon）
│   │   ├── _rate.py            # SpeedRate 音画对齐引擎
│   │   ├── job.py              # Worker 线程与任务流水线调度
│   │   ├── trans_create.py     # 任务创建与全流程编排
│   │   ├── taskcfg.py          # 数据类定义（TaskCfgVTT, SrtItem 等）
│   │   ├── speech2text.py      # ASR 任务实现
│   │   ├── translate_srt.py    # 翻译任务实现
│   │   ├── dubbing.py          # 配音任务实现
│   │   └── only_one.py         # 单视频交互翻译模式
│   ├── recognition/            # ASR 语音识别各渠道实现模块
│   ├── tts/                    # TTS 语音合成配音各渠道实现模块
│   ├── translator/             # 字幕翻译各渠道实现模块
│   ├── winform/                # 设置窗口、独立功能面板
│   ├── ui/                     # 各个窗口的ui布局代码
│   ├── language/               # 多语言界面翻译文件（zh.json, en.json 等）
│   ├── prompts/                # 系统提示词目录
│   │   ├── srt/                # 开启"发送完整字幕"时的各 AI 渠道提示词模板
│   │   ├── text/               # 未开启"发送完整字幕"（按行翻译）时的提示词模板
│   │   ├── resegment/llm.txt  # LLM 重新断句使用的系统提示词
│   │   └── recogn/gemini_recogn.txt   # Gemini 语音识别使用的提示词
│   ├── voicejson/              # 各渠道音色列表 JSON 文件
│   └── styles/                 # 硬字幕样式文件
└── webui.py                     # webui界面文件
```

---

## 4. 核心功能工作流：视频翻译

视频翻译是本软件最核心的功能，默认启动界面即为"翻译视频或音频"。

### 4.1 基本原理
通过自动化流水线将视频中的语言重构：
```text
【提取原始音视频】 ──> 【语音转录 (ASR)】 ──> 【字幕翻译 (STS)】 ──> 【语音合成 (TTS)】 ──> 【音画对齐与合成】
```
*   **可处理范围**：任何包含清晰人类语音的音视频（无论视频本身是否有字幕）。
*   **无法处理范围**：仅有背景音乐/画面但无人声说话的视频。
*   *注意：本功能无法直接提取或抹除视频画面已经内嵌的硬字幕。
*   如需提取硬字幕，请使用单独的硬字幕提取工具 [本地离线提取视频硬字幕](https://pyvideotrans.com/ocrsp)。 或 [video-subtitle-extractor](https://github.com/YaoFANGUK/video-subtitle-extractor)*
*   如需抹除删除硬字幕，推荐使用github开源项目[video-subtitle-remover](https://github.com/YaoFANGUK/video-subtitle-remover)
---

### 4.2 主界面功能及参数详解

打开软件默认显示的就是 `翻译视频` 工作区，这也是软件最核心的功能。

> **基本使用流程**：点击「选择视频或音频」选择需要翻译的原始视频 → 在「语音识别」选择语音识别渠道 → 在「发音语言」选择发音语言 → 在「目标语言」选择目标语言 → 在「翻译渠道」选择翻译渠道 → 在「配音渠道」选择配音渠道 → 在「配音角色」选择配音角色 → 点击「开始」开始执行。

以下将一步步带您完成一个完整的视频音频翻译任务。

#### 第 1 行：选择要翻译的视频

> 支持的视频格式 `mp4/mov/avi/mkv/webm/mpeg/ogg/mts/ts/wmv/flv`
>
> 支持的音频格式 `wav/mp3/m4a/flac/aac/wma/ogg`

*   **`选择视频或视频`**：点击该按钮，选择一个或多个需要翻译的视频或音频文件（按住 `Ctrl` 可多选）。
*   **`文件夹`**：勾选此项可批量处理整个文件夹内的所有视频。
*   **`清理已生成`**：若需对同一视频重新处理（而不是使用缓存），请勾选此项，否则会使用上次已生成的缓存文件。
*   **`输出到..`**：默认翻译后的文件保存到原视频目录下的 `_video_out` 文件夹，点击此按钮可单独设置翻译后视频的输出目录。
    - 未勾选`文件夹`时默认输出位置: 所选视频同级的 `_video_out` 文件夹内，例如所选视频是`D:/videos/001.mp4`,则输出到`D:/videos/_video_out`内，每个视频生成一个结果文件夹，名字是`{视频名字(不含后缀)}-{视频后缀名}`
    - 若勾选`文件夹`时默认输出位置：所选文件夹同级的`_video_out/{该文件夹名}` 下，例如所选文件夹是 `D:/videos/ceshi`, 输出到`D:/videos/_video_out/ceshi` 文件夹内，每个视频生成一个结果文件夹，名字是`{视频名字(不含后缀)}-{视频后缀名}`
*   **`仅输出mp4`**：如果选中，则输出中只保留最终的翻译视频，其他字幕、音频等文件都会自动删除。
*   **`完成后关机`**：处理完所有任务后自动关闭计算机，适合大批量、长时间任务。

#### 第 2 行：语音识别渠道

**语音识别**：用来将音频或视频中的说话声转录为字幕文件，这一步的质量直接决定后续效果，支持 20+ 种不同识别方式。


| 渠道 | 推荐场景 | 说明 |
|------|---------|------|
| `faster-whisper(内置)` | **默认推荐** | 速度快、质量高 |
| `openai-whisper(内置)` | 高精度需求 | 准确度略高，速度较慢 |
| `Qwen-ASR(内置)` | 中文及其他十多种常见语言 | 中文识别效果好，速度慢 |
| `Whisper.cpp(Win内置)` | 在Windows上已内置 whisper.cpp，可直接使用，MacOS和Linux上需自行单独部署| whisper模型的c++版 |
| `阿里FunASR(内置)` | 中文识别效果好，可选 paraformer/sensevoice/Fun-ASR-Nano多种模型 |
| `Firered中文(内置)` | 中文及方言视频 | 小红书开源模型 |
| `parakeet日语(内置)` | 日语视频 | 英伟达开源模型 |
| `Dolphin亚洲语言(内置)` | 东亚语言、东南亚及中东语言 | 专注亚洲小语种 |
| `OmnilingualASR(内置)` | 支持所有内置语言，范围广 | facebook开源，支持语言多但效果不佳 |

模型选择：
- `tiny` → 最快，准确度低
- `base` / `small` → 平衡之选
- `medium` → 较好效果
- `large-v3` → 最佳效果，需要 8GB+ 显存
- `large-v3-turbo` → **推荐**，速度与质量兼顾


- **二次识别**:在选择了`配音角色`并选择了`嵌入单字幕`时，可选中二次识别，将在配音完毕后，针对配音文件进行语音转录，生成简短的字幕嵌入视频，确保字幕和配音精确对齐
> 在`高级选项--语音识别区域` 设置二次识别的`最长语音持续时间`和`最短语音持续时间`，设置较小的值有利于生成短小字幕
>
> 注意：在对生成后的配音进行二次识别时，仍会使用语音识别渠道里所选渠道和模型，你需要确保所用渠道支持识别`目标语言`，否则会得到错误的识别结果。
>
> 例如`发音语言(视频说话语言)`是中文，`目标语言(翻译后配音)`是日语，所选语音识别渠道为`Firered中文`,而渠道不支持日语，若选中二次识别，最后得到的字幕可能是乱码或完全错误的文字
- **默认断句和LLM重新断句**: 
	* 默认断句：是指使用识别模型返回的断句结果或VAD的断句结果，不进行其他处理
	* LLM重新断句：是指在语音识别出字幕文本后，将文本发送给AI大模型，修正错别字、重新切分长文本等，以得到更通顺流畅的结果，需配置DeepSeek或OpenAI ChatGPT。可在**菜单-工具--高级选项-通用-LLM断句模型**里选择，但注意使用LLM重新断句后结果也可能更糟糕，效果取决于AI大模型本身智能。
	
	> 在克隆原音色(即配音角色是`clone`)时，**强烈不建议**使用该断句方式，默认即可。
	>
	> 启用说话人分离后，会禁用LLM重新断句，以避免降低说话人识别精度
	>
	> LLM重新断句的提示词在`软件目录/videotrans/prompts/resegment/llm.txt`中，可自行修改调整
	
- **同时选中二次识别和LLM重新断句**：将在二次识别后，对识别结果再次使用 LLM重新断句，提示词在文件`软件目录/videotrans/prompts/resegment/llm2.txt`中

> [查看 所有支持的语音识别渠道](https://pyvideotrans.com/yuyinshibiequdao)


*   此外还支持 字节火山字幕生成、OpenAI语音识别、Gemini语音识别、阿里Qwen3-ASR语音识别、智谱AI GLM-ASR、Deepgram、ElevenLabs、Google Speech、302.AI、WhisperX、Whisper.NET、Whisper.cpp、Faster-Whisper-XXL、Parakeet-tdt、STT、CAMB AI、自定义API 等多种在线API及本地模型。


#### 第 3 行：翻译渠道

**翻译渠道**：用来将转录后的原始语言字幕文件，翻译为目标语言字幕文件，内置 24 种翻译渠道供选择。


*   **`免费传统翻译`**：Google翻译（需代理）、微软翻译（无需代理）、M2M100本地翻译、DeepLX（需自行部署）。
*   **`收费传统翻译`**：百度翻译、腾讯翻译、阿里机器翻译、DeepL。
*   **`AI智能翻译`**：OpenAI ChatGPT、Gemini、DeepSeek、智谱AI、硅基流动、302.AI、MiniMax、小米AI、CAMB AI、阿里百炼、字节火山等，需自备SK密钥并填写在`菜单-翻译设置-对应渠道设置面板内`。
*   **`兼容AI/本地模型`**：同时支持自行本地部署大模型，只需要选择 兼容AI/本地模型 渠道，并将api地址填写到菜单-翻译设置-本地大模型设置内即可。
*   **`发音语言**：是指原始视频中人物说话的语言，必须正确选择。
*   **`目标语言**：就是你希望将音视频翻译成的目标语言。
*   **`翻译术语表`**：用于AI翻译时，发送给AI的术语。
*   **`发送完整字幕`**：用于AI翻译时，附带行号和时间轴发给AI，在使用AI翻译渠道时，建议选中。如果选中，则使用`软件目录/videotrans/prompts/srt`中的提示词，否则使用`软件目录/videotrans/prompts/text`中的提示词。
> LLM重新断句的提示词在`软件目录/videotrans/prompts/srt/和 text`文件夹中，可自行修改调整。

> [查看所有支持的翻译渠道](https://pyvideotrans.com/fanyiqudao)

#### 第 4 行：配音渠道

| 渠道 | 说明 |
|------|------|
| `Edge-TTS(免费)` | **默认推荐**，微软免费接口，声音自然 |
| `Qwen3-TTS(内置)` | 阿里本地模型，效果好速度慢，支持克隆 |
| `F5-TTS(内置)` | 中英，支持克隆 |
| `OmniVoice(内置)` | 支持所有内置语言，支持克隆 |
| `Confucius(内置)` | 支持14种语言，支持克隆 |
| `ChatterBox(内置)` | 多语言，欧洲语言效果好，支持克隆 |
| `ZipVoice中英(内置)` | 支持中英语言，支持克隆 |
| `Moss-TTS-Nano(内置)` | 多语言，支持克隆 |
| `gTTS(免费)` | 多语言，google家的，国内需科学上网 |

选择渠道后，在「配音角色」下拉框中选择发音人。配音角色选中`clone`,代表将使用原始视频对应的音色进行配音


*   **配音角色**：每个配音渠道一般都有多个发音人供选择，先选中**目标语言**后，即可选择配音角色。
*   **`试听配音`**：在选中某个配音角色后，即可点击试听当前角色的声音效果。

**配音角色选中`clone`，代表将使用原始视频对应的音色进行配音**。


> [查看所有支持的配音渠道](https://pyvideotrans.com/peiyinqudao)

#### 第 5 行：同步对齐和字幕

::: 视频翻译后出现字幕、语音、画面不同步的根源
当一种语言翻译为其他语言并配音后，因不同语言的音节数不同、语法结构差异，配音时长肯定会发生变化，进而导致字幕、语音、画面不同步，这是正常现象。

针对该问题，可在此通过加速音频或减缓视频来进行一定程度的调整。

主要针对**配音后时长** `大于` **原时长** 的情况进行调整，以避免声音重叠，对于配音后时长变短的情况不做处理。
:::

*   **`音频加速`**：如果某个配音片段比原声音片段长时，加速配音以匹配原时长。
*   **`视频慢速`**：同样当某个配音比视频长时，放慢该片段的视频播放速度以匹配配音时长。（若选中，处理会比较耗时，同时生成大量中间片段，出于尽量减小质量损失考虑，整体尺寸会比原视频增大数倍）。
*   **`不嵌入字幕`**：只替换声音，不添加任何字幕。
*   **`嵌入硬字幕`**：将字幕永久"烧录"到画面中，无法关闭，在任何地方播放均会显示字幕。
*   **`嵌入软字幕`**：将字幕作为独立轨道封装进视频，播放器可选择开关，网页中播放时无法显示字幕。
*   **`(双)`**：每条字幕都由两行组成，分别是原始语言字幕和目标语音字幕。
*   **`网络代理`**：对于中国大陆地区，使用 Google、Gemini、OpenAI等国外服务，需要使用代理，如果你有vpn等服务，并且知道代理端口号，可在此填写，形式类似`http://127.0.0.1:7860`等。

> [查看视频翻译中的配音、字幕、画面同步对齐原理](https://pyvideotrans.com/subtitle-sound-alignment)

#### 第 6 行：开始（开始执行）

*   **`CUDA加速`**：在Windows和Linux上，如果您有 NVIDIA 显卡并正确安装了 CUDA 环境，请务必勾选此项，它能将语音识别的速度提升数倍甚至数十倍。

> 如果你有多张英伟达显卡，可选中`菜单--工具--高级选项--通用设置--多卡模式`，将会尝试使用多卡并行处理。
> [点击查看配置CUDA加速环境](/gpu)

一切设置完毕后，点击【**开始**】按钮。

如果一次选择翻译多个音视频，将同时交叉执行，中间不会暂停。
> 如果想彻底完成一个后再继续下个，可在`菜单--工具--高级选项--通用设置--批量翻译视频时每批数量`填写为`1`。


一次仅选择一个视频时，自动使用**单视频模式**，将弹出单独的字幕编辑窗口，你可在此对字幕进行修改


#### 第 7 行：进度条

任务完成后，点击底部进度条区域即可打开输出文件夹。您会看到最终的 MP4 文件以及过程中生成的 SRT 字幕、配音文件等素材。如果选中了`仅输出mp4`，则只会看到翻译后的视频文件。
v4.08版本起，批量翻译视频时，每个进度条右侧会显式一个删除叉号，点击会终止该视频的翻译任务


#### 第 8 行：设置更多参数

如果你还想进行更精细的控制，例如语速、音量、每行字幕字符数、降噪、说话人识别等，可以点击 **设置更多参数...**，点击后如图：

*   **`识别说话人`**：若选中，将在语音识别结束后，尝试识别区分说话人（准确度有限），后边的数字代表预先设定想识别出几个说话人，若提前确定，将增加准确度，默认不限制。在高级选项中可切换说话人模型（内置、阿里cam++、payanote等）。
*   **`配音语速`**：默认0，若填写`50`则代表语速加快 50%，`-50`代表降速 50%。
*   **`音量+`**：同样默认0，填写`50`代表音量增大 50%，`-50`代表降低50%。
*   **`音调+`**：默认0，`20`代表音调调高 20Hz变得尖锐，反之`-20`降低20Hz变得低沉。
*   **`修改硬字幕样式`**：点击将弹出专门的硬字幕样式编辑器。
*   **`分离人声背景声`**：选中将把视频中的背景伴奏声和说话声分离出来（此步为纯 CPU 操作较为缓慢）。
*   **`嵌入背景`**：将分离出来的背景声在最终完成配音合并时，再嵌入进去。
*   **`循环背景音`**：如果背景音频时长小于最终的视频时长，选中将循环播放背景音，否则以静音填充。
*   **`背景音量`**：重新嵌入后新的背景音量设置，默认0.8，即音量降低为原来的 0.8 倍。
*   **`额外添加背景音频`**：你也可以选择本地某个音频，作为新的背景伴奏。
*   **`降噪`**：将尝试清除音频中的背景噪声、音乐等，如果同时选中了`分离人声和背景声`，则仅对分离出的人声进行降噪处理。
*   **`恢复标点、删除标点`**：恢复标点：如果选择后，将在识别后尝试添加标点符号。删除标点：选择后将删除字幕中所有标点符号。

---

## 5. 原音色语音克隆（Voice Cloning）与多角色配音

语音克隆是指：使用原始视频中说话人的音色生成目标语言的配音。例如将一段中文视频翻译为英文，生成的新英文配音听起来依然是原说话人的声音。

### 基本原理

1. 提取要配音的字幕数据
2. 根据字幕的起始与结束时间，从原始视频中截取对应的音频片段，作为**参考音频**
3. 将参考音频与翻译后的目标字幕文本一并发送给支持声音克隆的 TTS 引擎

### 支持音色克隆的渠道

| 渠道 | 本地/在线 | 支持语言 | 推荐度 |
|------|----------|---------|--------|
| OmniVoice-TTS | 本地内置 | 所有语言 | ⭐⭐⭐  |
| Qwen-TTS | 本地内置 | 中英日韩等10+种 | ⭐⭐⭐  |
| F5-TTS | 本地内置 | 中英 | ⭐⭐⭐  |
| Confucius-TTS | 本地内置 | 14种语言 | ⭐⭐⭐ |
| ZipVoice-TTS | 本地内置 | 中英 | ⭐⭐ |
| ChatterBox | 本地内置 | 10+种语言 | ⭐⭐  |
| GPT-SoVITS | 本地API | 中英日韩 | ⭐⭐⭐  |
| Index-TTS | 本地API | 中英 | ⭐⭐⭐  |
| VoxCPM-TTS | 本地API | 10+种语言 | ⭐⭐⭐  |
| CosyVoice | 本地API | 中英日韩等10+种 | ⭐⭐ |
| Spark-TTS | 本地API | 英语 | ⭐⭐ |

::: 本地API/内置/免费 是什么意思

- **免费:** 例如 Google翻译、微软翻译、Edge-TTS配音，这些渠道都是在线免费使用的，无需配置开箱即用，只是需注意有限流错误，高频使用时可能会遇到报错
- **本地API:** 很多开源模型可自行在本地部署，部署并启动后，将API地址或WebUI地址填写在 pyVideoTrans 软件设置界面，软件即可通过该地址调用你部署的模型服务。例如 GPT-SoVITS / CosyVoice 等
- **内置:** 有些模型可以相对方便的集成到 pyVideoTrans 软件内，而无需单独另行部署，开箱可用，例如 VITS/Piper/Qwen3-TTS/ OmniVoice / F5-TTS / Qwen3-ASR/SuperionTTS/ChatterBox等，但需要注意，为避免软件体积无限膨胀，仅调用代码内置，模型本身并未内置，第一次使用时需在线下载模型。

> [查看所有模型下载地址及手动下载方法](https://pyVideoTrans.com/aboutmodels)


:::


### 最佳克隆配置

为获得最佳克隆效果，请在主界面和高级选项中进行如下配置：

1. **禁止使用「LLM重新断句」**: 因该功能会重新划分时间轴，进而导致截取的参考音频与说话时间错位
2. **强制控制字幕时长**：通常TTS配音引擎要求参考音频在 3-10s 时间内，否则极可能出错
   - 进入 `菜单 -> 工具 -> 高级选项 -> 语音识别参数`
   - 最长语音持续秒数：6-10
   - 最短语音持续毫秒：3000-4000
   - 勾选「合并过短字幕到邻近」
3. **翻译渠道**：使用 DeepSeek 或 OpenAI 等大模型，勾选「发送完整字幕」
4. **人声背景分离**：点击主界面「设置更多参数」，勾选「分离人声背景声」，大幅提升克隆音质


### 使用本地参考音频

有时您可能不希望克隆原始视频中的音色，而是使用某个本地音频里的音色。

**步骤**：

1. 准备一段 3-10 秒的 WAV 格式音频，确保：
   - 清晰准确的单一人声
   - 没有背景噪声
   - 开头结尾没有多余静音

2. 将音频复制到软件目录下的 `f5-tts` 文件夹

3. 打开 `菜单 -> TTS 设置 -> 设置参考音频`，填写：
	
   **文件名.wav#音频中的说话文本**，例如    `myaudio1.wav#你说四大皆空，却为何紧闭双眼`
  
4. 保存后，在主界面配音角色下拉框中选择 `myaudio1.wav`

> **注意**：GPT-SoVITS 的参考音频需要放在 GPT-SoVITS 软件的根目录下，而不是 `f5-tts` 文件夹内。



---

## 6. 使用已有的外部 SRT 字幕与音视频素材

# 使用已有的 SRT 字幕  和 人声背景声

> 如果你本地有配套的或自行准备好的 SRT 字幕，质量更高，不想使用软件自动生成的字幕；
>
> 或者有已经分离好了的人声和背景声，想让软件直接使用他们。

---

## 〇、了解视频翻译输出位置的默认规则

- 未勾选`文件夹`时默认输出位置: 所选视频同级的 `_video_out` 文件夹内，例如所选视频是`D:/videos/001.mp4`,则输出到`D:/videos/_video_out`内，每个视频生成一个结果文件夹，名字是`{视频名字(不含后缀)}-{视频后缀名}`，例如`D:/videos/_video_out/001-mp4`
- 若勾选`文件夹`时默认输出位置：所选文件夹同级的`_video_out/{该文件夹名}` 下，例如所选文件夹是 `D:/videos/ceshi`, 输出到`D:/videos/_video_out/ceshi` 文件夹内，每个视频生成一个结果文件夹，名字是`{视频名字(不含后缀)}-{视频后缀名}`,例如`D:/videos/_video_out/ceshi/001-mp4`

> **当点击了`输出到...`自定义输出位置后，将不再保存到默认位置，而是你指定的位置**
> **为简单起见，建议不要点击`输出到...`手动指定，而是使用默认位置，以下教程均假定你使用的是默认位置**


## 一、导入本地已有 SRT 字幕

### 前置准备

1. **规范文件名**：由于底层工具对中文、空格、特殊符号兼容性较差，建议将视频文件名改为简单的英文字母、数字、下划线组合（如 `myvideo.mp4`）

2. **开启系统扩展名显示**：
   - Win10：打开文件夹 → 点击「查看」→ 勾选「文件扩展名」
   - Win11：打开文件夹 → 点击「查看」→「显示」→ 勾选「文件扩展名」

### 1. 手动处理具体步骤

**如果只有很少几个视频，例如个位数个，可手动按照如下方法处理**

假设视频文件名为 `myvideo.mp4`，目标是从英文翻译至中文。

**步骤 1**：在视频文件所在的同级目录下，创建一个名为 `_video_out` 的文件夹。

**步骤 2**：进入 `_video_out` 文件夹，创建一个**视频同名且带格式后缀**的子文件夹：
```
_video_out/myvideo-mp4/
```

> ⚠️ v3.87 及以后版本必须带有后缀，格式为 `[文件名]-[视频格式]`，例如 `myvideo-mp4` 或 `video1-avi`。

**步骤 3**：将准备好的两种语言字幕文件复制到子文件夹内，并重命名为标准的语言代码：
```
_video_out/myvideo-mp4/en.srt      ← 源语言字幕（英文）
_video_out/myvideo-mp4/zh-cn.srt   ← 目标语言字幕（中文）
```

**步骤 4**：回到软件主界面，导入该视频并执行翻译。软件检测到 `_video_out` 内的对应字幕后，将跳过 ASR 和翻译阶段，直接进入配音与合成阶段。**一定不要勾选`清理已生成`，否则会清空已有的字幕**

### 2.自动处理：适合大批量，例如几十几百个视频(必须确保软件版本大于等 v4.05-0711)

![](https://pvtr2.pyvideotrans.com/1783749706602_image.png)


> **必须确保视频名字和字幕名字完全相同(仅仅后缀不同)，并且位于同一文件夹内**
>
> 例如  
> - D:/myvideos/123.mp4
> - D:/myvideos/123.srt
> - D:/myvideos/abc.mp4
> - D:/myvideos/abc.srt

点击`软件--菜单--工具/选项--批量创建文件夹结构`

1. 选择要处理的视频，按住 `ctrl` 键可多选，按住`ctrl+A`可全选
2. 选择 `字幕文本语言`：必须选择字幕文本真实所属语言，不可乱选，如果字幕是中文，就必选选择中文。
- 如果所选语言和视频发音语言【相同】：视频翻译时将把这个字幕视为发音语言字幕，跳过语音识别；
- 如果所选语言和视频发音语言【不同】：视频翻译时将把这个字幕视为翻译后的字幕，不再翻译该字幕，但仍会进行语音识别，创建发音语言字幕，若不需要，请将主界面发音语言设为和目标语言一样。

3.  任务完成后，即可去主界面选择这些视频，将自动使用这些字幕，但一定不要再点击【输出到...】按钮，否则无法找到这些字幕。也不要选中【清理已生成】，否则会删除里面的字幕文件


----
----

## 二、导入外部人声和背景声

由于软件内置的人声分离采用纯 CPU 计算，速度极慢。建议使用专业第三方工具（如 [UVR5-GUI](https://github.com/Anjok07/ultimatevocalremovergui/releases)）在 GPU 加速下进行分离：

**步骤 1**：使用第三方工具将音频分离为：
- 人声文件（Vocal）：无背景音的人声
- 伴奏文件（Instrumental）：无干声的伴奏

输出格式必须为 `wav`。

**步骤 2**：将文件重命名：
```
vocal.wav       ← 人声
instrument.wav  ← 伴奏
```

**步骤 3**：将这两个文件复制到 `_video_out/myvideo-mp4/` 文件夹内。

**步骤 4**：一定`不要勾选 清理已生成`，否则会清空已有的人声和背景声，并且必须勾选`分离人声背景声`和`重新嵌入背景` 。

---

## 三、语言代码参考

| 语言 | 代码 | 语言 | 代码 |
|------|------|------|------|
| 英语 | en | 中文（简体） | zh-cn |
| 中文（繁体） | zh-tw | 日语 | ja |
| 韩语 | ko | 法语 | fr |
| 德语 | de | 西班牙语 | es |
| 俄语 | ru | 葡萄牙语 | pt |
| 意大利语 | it | 阿拉伯语 | ar |
| 土耳其语 | tr | 越南语 | vi |
| 印地语 | hi | 泰语 | th |
| 波兰语 | pl | 荷兰语 | nl |
| 瑞典语 | sv | 希腊语 | el |
| 印尼语 | id | 马来语 | ms |
| 挪威语 | nb | 罗马尼亚 | ro |
| 高棉语 | km | 乌都尔语 |  ur|
| 粤语 | yue | 波斯 |  fa|
| 希伯来 | he | 孟加拉 |  bn|
| 菲律宾 | fil | - | -|

---


### 6.4 标准 SRT 字幕格式规范
批量为 SRT 字幕配音时，输入的字幕必须符合标准 SRT 格式：
```
[行号]
[开始时间(2位小时:2位分钟:2位秒,3位毫秒)] --> [结束时间(2位小时:2位分钟:2位秒,3位毫秒)]
[字幕文本]
[空行]
[下一行行号]
...
```
并且：
*   结束时间需要大于开始时间
*   下条字幕的开始时间大于或等于上一条字幕的结束时间
*   示例：
```
1
00:00:01,000 --> 00:00:03,000
文本内容

2
00:00:04,000 --> 00:00:06,000
文本内容
```

---

## 7. 视频翻译的音画同步对齐引擎

由于不同语言在表达相同意思时句子的音节数和语法结构不同，配音后的时长必定会发生变化（如中文的"你好"，英文配音为"Hello there"或"How do you do"，耗时不同），这会导致字幕、声音、画面不同步。

### 7.1 软件内嵌的 5 大对齐调整策略
为了缓解这一问题，pyVideoTrans 底层 `SpeedRate` 对齐引擎支持以下策略：
1.  **音频加速**：当配音时长超出原字幕对应时长时，自动将该句配音音频倍速播放。
2.  **精简译文**：通过大模型或人工精简目标语言的字数，从源头上缩短配音时长。
3.  **调整字幕间静音**：若原视频字幕段落之间存在静音间隙，通过压缩或移除这些间隙来"借用时间"，避免字幕重叠。
4.  **移除配音前后静音**：剔除 TTS 引擎在句首和句尾自动生成的无声缓冲时间，从而缩短音频。
5.  **视频降速播放（视频慢速）**：如果音频加速仍不足以对齐，则强行将该画面片段进行慢动作播放，延长视频时长以匹配声音。

### 7.2 对齐引擎（SpeedRate）核心逻辑
`videotrans/task/_rate.py` 内置了 `SpeedRate`（视频场景）和 `TtsSpeedRate`（纯字幕配音场景）两个引擎。`SpeedRate` 优先级处理策略如下：
*   **启用音频加速 + 视频慢速**：两者协同工作，忽略单项最大倍率限制，声音与画面各承担一半的时间差异。
*   **仅启用音频加速**：加速配音直至匹配原字幕时长，但最高速度不能超过设置的 `max_audio_speed_rate`。
*   **仅启用视频慢速**：放慢视频画面直至匹配配音时长，但放慢倍数最高不超过设置的 `max_video_pts_rate`。
*   **两者均不启用**：按原有字幕时间轴强行拼接音频片段，差异时间以静音填充，可能会造成声音阶段性重叠或断层。

### 7.3 音频加速实现细节
*   **首选方案**：使用 Rubber Band 算法（`pyrubberband`），效果最平滑。
*   **回退方案**：使用 FFmpeg `atempo` 滤镜链（`atempo` 单次范围 [0.5, 2.0]，超出时自动链式组合如 `atempo=2.0,atempo=2.0,atempo=X`）。
*   **Rubber Band 安装提示**：
    *   Windows：下载 `rubberband-4.0.0-gpl-executable-windows.zip` 并将可执行文件放入 `ffmpeg/` 目录
    *   macOS：`brew install rubberband` 并 `uv add pyrubberband`
    *   Linux：`sudo apt install rubberband-cli libsndfile1-dev` 并 `uv add pyrubberband`

### 7.4 对齐引擎的局限性
*   **PTS 精度限制**：FFmpeg 的 `setpts` 滤镜无法实现毫秒级精确的视频减速，输出视频可能与预期有微小偏差,随着视频时长的延长偏差会累积。
*   **CRF/Preset 覆盖**：对齐步骤的 CRF 和编码预设可通过 `<ROOT>/crf.txt` 和 `<ROOT>/preset.txt` 文件覆盖全局设置（默认 CRF=20, preset=veryfast）。
*   **最小片段时长**：低于 40ms 的音频片段会被丢弃（`MIN_CLIP_DURATION_MS = 40`）。
*   **无效文件检测**：小于 1024 字节的文件被视为无效（可能只包含元数据）。

---

## 8. 最佳配置推荐

## 第一步：语音识别

**目标**：将视频中的语音转换为对应语言的字幕文件。

> 💡 **提示**：如果原始音视频有背景音或噪声，建议在主界面点击 `设置更多参数` 并选中 `分离人声背景声`，处理后排除噪声干扰，识别效果会更准确。

### 非中文视频

| 配置级别 | 渠道 | 模型 | 说明 |
|---------|------|------|------|
| 免费推荐 | faster-whisper(内置) | large-v3 | 速度与质量兼顾 |
| 免费备选 | openai-whisper(内置) | large-v3 | 准确度略高 |
| 免费备选 | whipser.cpp(Win内置) | large-v3 | 速度较快，win内置 |
| 收费推荐 | OpenAI 语音识别 API | — | 效果优秀 |

### 中文视频

| 配置级别 | 渠道 | 模型 | 说明 |
|---------|------|------|------|
| 免费推荐 | Qwen-ASR(内置) | — | 中文效果佳 |
| 免费备选 | 阿里 FunASR(内置) | paraformer-zh | 中文效果佳 |
| 免费备选 | Firered中文(内置) | 小红书中文及方言 | 中文效果佳 |
| 免费备选 | Huggingface_ASR(内置) | zai-org/GLM-ASR-Nano-2512 | 智谱AI模型中文效果佳 |
| 收费推荐 | 豆包语音识别大模型极速版 | — | 中文效果佳 |
| 收费推荐 | 小米mimo-v2.5-asr | — | 中文效果佳 |
| 收费备选 | 阿里百炼 ASR | — | 中文优化 |

### 日语视频

| 配置级别 | 渠道 | 模型 | 说明 |
|---------|------|------|------|
| 免费推荐 | openai-whisper(内置) | large-v3 | 通用效果好 |
| 免费推荐 | parakeet日语(内置) | 英伟达开源日语模型 | 效果好 |
| 免费备选 | Huggingface_ASR | japanese-wav2vec2-large | 日语专用 |
| 收费推荐 | OpenAI 语音识别 API | — | 效果优秀 |

### 小语种视频

| 配置级别 | 渠道 | 说明 |
|---------|------|------|
| 免费推荐 | openai-whisper(内置) large-v3 | 通用模型，支持数十种语言 |
| 免费推荐 | Dophin(内置) | 专门用于亚洲语言(批量语音转录界面可选择`自动检测`) |
| 免费推荐 | Omnilingual ASR(内置) | 1600多种语言(批量语音转录界面可选择`自动检测`) |
| 收费推荐 | Gemini 大模型识别 / OpenAI API | 小语种效果好 |

> **注意**：使用本地模型时，如果没有 N 卡或未启用 CUDA 加速，处理速度会很慢。显存不够大时可能崩溃。

> [点击查看语音识别各个渠道使用方法](/yuyinshibiequdao)

---

## 第二步：字幕翻译

**目标**：将第一步生成的字幕翻译为目标语言。

| 配置级别 | 渠道 | 说明 |
|---------|------|------|
| **首选** | DeepSeek / OpenAI ChatGPT / Gemini（最新模型） | AI 翻译质量最佳 |
| 免费 | Google 翻译 / Microsoft 翻译 | 传统翻译，速度快 |
| 本地 | M2M100 | 完全离线翻译 |
| 本地 | Hy-MT2-1.8B | 腾讯开源翻译模型 |

**关键设置**：
- 勾选「发送完整字幕」— 让 AI 看到完整上下文，翻译更自然
- 使用 AI 渠道时，将「AI翻译渠道每批字幕行数」设为 100 或更大，配合支持超长上下文的模型

---

## 第三步：配音

**目标**：根据翻译后的字幕生成配音音频。

| 配置级别 | 渠道 | 说明 |
|---------|------|------|
| 免费推荐 | Edge-TTS | 微软免费接口，效果自然，支持所有语种 |
| 本地推荐 | Qwen-TTS、F5-TTS、OmniVoice、Confucius| 内置，支持克隆 |
| 收费推荐 | 豆包语音合成2.0 / Qwen-TTS(bailian) / 小米 / Minimaxi / OpenAI-TTS | 高质量商业 API |
| 克隆语音 | OmniVoice / Confucius / Qwen-TTS / GPT-SOVITS / CosyVoice / F5-TTS / Index-TTS / ChatterBox / ZipVoice| 使用原视频音色 |

> [点击查看配音渠道详细信息和使用方法](/peiyinqudao)

---

## 第四步：字幕、配音、画面同步对齐

**目标**：将字幕、配音和画面进行同步处理。

| 配置 | 说明 |
|------|------|
| 选中「二次识别」 | 在配音完成后对配音文件再次语音识别，生成时间轴精准的字幕 |
| 设置「配音语速」 | 中文翻译成英文时，设置 `+10` 或 `+15` 加快配音速度 |
| 选中「配音加速」 | 当配音比原视频长时，自动加速配音 |
| 同时选中「视频慢速」 | 配合音频加速，效果最佳 |
| 选中「分离人声背景声」 | 嵌入原始背景音 |
| 选中「降噪」 | 提升原音质量，提高识别精度 |

---

## 第五步：其他质量提升

### 基础设置
1. 选中「发送完整字幕」
2. 选中「菜单-工具-高级选项-AI翻译附带完整原字幕」
3. 将「AI翻译渠道每批次字幕行数」设为 100 或更大
4. 必须使用支持超长上下文的在线 AI 大模型



---

## 9. 菜单高级选项（Advanced Options）核心参数详解

通过主界面顶部 `菜单 -> 工具/选项 -> 高级选项` 进入，此处的配置会全局影响软件的行为与资源消耗。



#### 【通用设置】

-  **`软件界面语言`**: 设置软件界面语言，修改后需要重启软件

-  **`单视频交互翻译暂停倒计时`**: 当单视频交互翻译时，暂停倒计时秒数(设为0将跳过编辑窗口)

-  **`独立功能输出目录`**: 用于设置 批量语音转录 / 批量为字幕配音 / 批量翻译srt字幕 等功能的输出结果位置，非视频翻译结果保存位置，默认软件安装目录
下output文件夹

-  **`失败后重试次数`**: 失败后重试次数(针对重试可能恢复的错误，在此设定重试次数)

-  **`LLM重新断句每批字幕行数`**: LLM大模型重新断句时，每次发送多少条字幕，该值越大断句效果越好，一次性发送全部字幕最佳，但受限于最大输出token和上
下文(max_token)，过长输入可能导致超出AI限制而失败，默认20条字幕

-  **`LLM重新断句所用AI渠道`**: LLM重新断句时使用的AI渠道，目前支持 OpenAI-ChatGPT 或 DeepSeek 渠道

-  **`禁用桌面通知`**: 任务完成或失败后不显示桌面通知

-  **`批量翻译视频时每批数量`**: 批量翻译视频时，在此设置每批次同时翻译几个，默认0即不限制

-  **`主界面显示所有参数?`**: 为避免过多参数造成困扰，主界面默认隐藏大部分参数，如果选中这里将切换为默认显示所有参数

-  **`CPU同时任务数[重启生效]`**: 最大CPU同时任务数，越大越快但可能爆内存，最大不应超过cpu核数
(修改保存后重启生效)

-  **`GPU同时任务数[重启生效]`**: GPU任务同时执行数量，除非多卡或单卡显存大于24G，否则请设为1
(修改保存后重启生效)

-  **`多显卡模式[重启生效]`**: 如果有多张显卡，可启用该项，同时可将上述选项设为2或显卡数
(修改保存后重启生效)


#### 【视频输出控制】

-  **`视频输出质量控制`**: 视频转码时损失控制，0=无损但视频会超级大，51=质量差文件小

-  **`输出视频压缩率`**: 主要调节编码速度和质量的平衡，有 ultrafast、superfast、veryfast、faster、fast、medium、slow、slower、veryslow 选项，编码速
度从快到慢、压缩率从低到高、视频尺寸从大到小。

-  **`264/265编码`**: 采用 libx264 编码或 libx265 编码，264兼容性更好，265压缩比更大清晰度更高

-  **`输出视频格式(mp4/mkv)`**: 输出视频格式(mp4/mkv)

-  **`可变帧率vfr/固定帧率cfr`**: 有视频慢速处理时，可变帧率vrf效果更好，固定帧率cfr兼容性更佳

-  **`强制软编码视频?`**: 强制ffmpeg使用软编解码?（速度慢但兼容性好不易出错，默认优选硬件编码）

-  **`视频合成cuda硬解码`**: 最后一步视频合成时，强制使用cuda解码视频，更快但易出错

-  **`自定义ffmpeg命令参数`**: 自定义ffmpeg命令参数， 将添加在输出文件之前的位置,例如  -bf 7 -b_ref_mode middle


#### 【语音识别参数】

-  **`选择VAD`**: 选择要使用的VAD

-  **`语音阈值`**: 表示音频片段被认为是语音的最低概率。VAD 会为每个音频片段计算语音概率，超过此阈值的部分被视为语音，反之视为静音或噪音。越小越灵敏
但可能误将噪声视为语音

-  **`非语音阈值`**: 减小可降低幻觉但可能遗漏文字

-  **`最长语音持续(秒)`**: 最长语音持续时长(秒),限制单个语音片段的最大长度。超过此时长时强制分割。填写数字，单位是秒

-  **`最短语音持续(毫秒)`**: 最短语音持续时长(毫秒)，如果某条字幕时长小于该ms，则尝试将该字幕合并进相邻字幕中，单位是毫秒

-  **`二次识别最长语音持续(秒)`**: 二次识别最长语音持续时长(秒),限制单个语音片段的最大长度。超过此时长时强制分割。填写数字，单位是秒

-  **`二次识别最短语音持续(毫秒)`**: 二次识别最短语音持续时长(毫秒)，如果某条字幕时长小于该ms，则尝试将该字幕合并进相邻字幕中，单位是毫秒

-  **`静音分割持续毫秒`**: 在语音结束时，需等待的静音时间达到此值后，才会分割出语音片段。填写数字，单位ms
也就是只在大于此值的静音片段处分割

-  **`合并过短字幕到邻近`**: 只有选中该项，才会合并短字幕

-  **`Whisper预分割音频?`**: 是否提前将音频切割为句子片段后再发给whisper模型识别?
若使用clone配音角色，请选中，并将最短语音设为3000，最大语音设为10，提供语音克隆可靠性

-  **`说话人分离模型`**: 用于说话人分离的模型，默认内置模型支持中英.
若选 pyannote 必须拥有 https://huggingface.co 上的token，
并且同意pyannote组织的授权协议

具体请访问URL查看教程:
https://pvt9.com/shuohuaren

-  **`Huggingface的token`**: 填写你在 huggingface.co 的token，否则无法使用 pyannote，具体查看教程
https://pvt9.com/shuohuaren

-  **`计算数据类型`**: faster模式时计算数据类型，int8=消耗资源少，速度快，精度低，float32=消耗资源多，速度慢，精度高，float16适合GPU加速。default默
认自选

-  **`识别准确度beam_size`**: 字幕识别时精度调整，1-5，1=消耗显存最低，5=消耗显存最多

-  **`识别准确度best_of`**: 字幕识别时精度调整，1-5，1=消耗显存最低，5=消耗显存最多

-  **`启用上下文感知`**: 若开启将占用更多GPU，效果也更好，但也容易出现重复或幻觉

-  **`重复惩罚`**: 增大该值有利于减少重复

-  **`文本压缩率`**: 减小该值有利于减少重复

-  **`采样温度`**: 采样温度

-  **`热词`**: 告诉模型哪些词可能出现，以英文逗号分隔多个

-  **`faster-whisper模型`**: faster-whipser的模型列表，英文逗号分隔

-  **`whisper.cpp模型`**: whisper.cpp的模型名字列表，英文逗号分隔

-  **`Gemini语音识别每批切片数`**: 使用gemini识别语音时，每次发送音频切片数，越大效果越好，但失败率会升高

-  **`字幕繁体转简体`**: 强制将识别出的繁体字幕转为简体

-  **`删除字幕末尾标点?`**: 删除字幕末尾标点?

-  **`云API识别暂停秒`**: 云API每次识别后暂停秒数，防止超过频率限制


#### 【字幕翻译调整】

-  **`传统翻译渠道每批字幕行数`**: 传统翻译渠道每次发送字幕行数

-  **`AI翻译渠道每批字幕行数`**: AI翻译渠道每次发送字幕行数

-  **`AI翻译一次性翻译所有字幕行`**: AI翻译渠道一次性翻译字幕所有行，翻译质量最佳
【务必注意】1. 必须使用支持超长上下文的先进模型(在线AI旗舰模型)
2. 需要将对应AI渠道设置界面中的max token设为较大值，否则长篇输出可能被截断而报错
3. 可能反馈较慢，表现为迟迟未返回数据

-  **`翻译后暂停秒`**: 每次翻译后暂停秒数,用于限制请求频率

-  **`发送完整字幕`**: 是否在使用AI翻译渠道时发送完整字幕格式内容

-  **`AI翻译模型温度值`**: AI翻译模型温度值，默认1.0


#### 【字幕配音调整】

-  **`并发配音线程数`**: 同时配音的线程数

-  **`配音后暂停秒`**: 每次配音后暂停秒数,用于限制请求频率

-  **`移除配音前后静音缓冲`**: 移除每条字幕配音前后静音缓冲，利于音画同步，但可能结尾仓促

-  **`保留每条字幕的配音文件`**: 保留每行字幕的配音结果

-  **`文本规范化`**: 配音前对文本规范化处理

-  **`ChatTTS音色值`**: ChatTTS 音色值

-  **`EdgeTTS配音渠道配音并发数`**: EdgeTTS渠道配音并发数，越大越快，但可能限流失败

-  **`EdgeTTS配音渠道失败重试次数`**: EdgeTTS渠道失败后重试次数,有些失败无论多少次重试也无法恢复，太大只会延长耗时

-  **`人声背景分离线程数`**: 人声背景声分离线程数，越大越快但占用资源越多

-  **`分离背景声模型`**: 选择分离背景声时所用模型


#### 【字幕声音画面对齐】

-  **`音频加速最大倍数`**: 最大音频加速倍数，默认100

-  **`视频慢放最大倍数`**: 视频慢放最大倍数，默认10，不可大于10

-  **`中日韩字幕单行字符数`**: 中日韩字幕单行字符数，多于将换行，仅针对视频翻译中的目标字幕或单独的语音转录功能字幕

-  **`其他语言字幕单行字符数`**: 其他语言字幕单行字符数，多于将换行，仅针对视频翻译中的目标字幕或单独的语音转录功能字幕


#### 【Whisper模型提示词】

-  **`whisper模型简体中文提示词`**: 发音语言为简体中文时发送给whisper模型的提示词
....其他语言提示词类似
---

## 10. 技术架构与核心数据类定义

软件在架构上将音视频翻译与配音处理抽象为 **9 个独立阶段**（`Stage`），通过五大布尔控制标志位来灵活调度、拼装流水线。

### 10.1 九个处理阶段说明
整个生命周期内，同一阶段内部的所有子任务串行处理，阶段之间支持高度的并行流转：

| 阶段 | 对应核心方法 | 阶段职责描述 |
|:---|:---|:---|
| **① 预处理** | `prepare()` | 分离视频中的无声视频流和原始音频流；进行人声伴奏分离及音频降噪；初始化缓存与输出目录。 |
| **② 语音识别** | `recogn()` | 调用 ASR 引擎将音频转录为带精确时间轴的 `SrtItem` 列表。可选恢复标点、LLM 重新断句。 |
| **③ 说话人分离**| `diariz()` | 调用分离模型（内置、阿里CAM++、pyannote），将识别出的字幕按说话人角色重新归类。 |
| **④ 字幕翻译** | `trans()` | 将源字幕通过指定渠道翻译为目标语言。支持输出单行、双语、及各种双语样式。 |
| **⑤ 语音合成** | `dubbing()` | 逐条生成配音音频切片。若启用 `clone`，将在此阶段动态裁剪原声作为参考音频进行克隆。 |
| **⑥ 音画对齐** | `align()` | 依靠 `SpeedRate` 引擎执行：配音加速、视频慢放、去除字幕静音、强行对齐等音画重构操作。 |
| **⑦ 二次识别** | `recogn2pass()` | 对合成的新配音再次进行 ASR（非双语硬字幕嵌入模式），生成字数精简、时间更贴合的字幕。 |
| **⑧ 最终合成** | `assembling()`| 利用 FFmpeg 命令行，将无声视频、配音、背景伴奏以及目标字幕压制/合并为最终 MP4/MKV。 |
| **⑨ 任务收尾** | `task_done()` | 将成品文件从缓存移动至指定输出目录，彻底清理临时切片与进程缓存，发送完成通知。 |

### 10.2 流程控制标志位设计
位于 `videotrans/task/_base.py`。软件会根据用户在界面上的配置，在初始化 `TransCreate` 任务时动态计算这五个关键控制位：
*   **`should_recogn`**：是否需要执行语音识别。若用户手动导入了已准备好的源字幕，则此项设为 `False`。
*   **`should_trans`**：是否需要进行字幕翻译。若源语言与目标语言完全一致，此项设为 `False`。
*   **`should_dubbing`**：是否需要生成配音。若配音角色选择为"不配音"，此项设为 `False`。
*   **`should_hebing`**：是否需要执行最后的视频合成。仅在非"提取字幕（tiqu）"模式下起效。
*   **`should_separate`**：是否需要进行人声伴奏的分离。由用户是否勾选该参数决定。

### 10.3 核心数据类 Python 定义
软件在底层依托分层继承的 `@dataclass` 体系（定义于 `videotrans/task/taskcfg.py`）来确保类型安全与统一的接口交互：

```python


@dataclass
class SrtItem:
    text: str = ""
    start_time: Union[int,float] = 0
    end_time: Union[int,float] = 0
    startraw: str = ''
    endraw: str = ''
    line: Optional[int] = 1
    time: Optional[str] = ""
    spk: Optional[str] = ""#说话人id
    filename: Optional[str] = ""#对应音频片段


    def __getitem__(self, key):
        return getattr(self, key)

    def __setitem__(self, key, value):
        return setattr(self, key, value)

    def get(self, key,default=None):
        return getattr(self,key,default)

    def items(self):
        _names=("line","time","start_time","end_time","startraw","endraw","text","spk","filename")
        for k in _names:
            yield k,getattr(self,k)

    def __iter__(self):
        _names=("line","time","start_time","end_time","startraw","endraw","text","spk","filename")
        return iter(_names)


# 视频翻译流程使用全部属性
@dataclass
class TaskCfgBase:
    # 通用区域
    uuid: str = None  # 默认唯一任务id

    name: Union[os.PathLike,str]=None  # 规范化处理的原始文件绝对路径 D:/XXX/1.MP4
    dirname: Union[os.PathLike,str]=None  # 原始文件所在目录 D:/XXX
    noextname: str = None  # 去掉扩展名的原始视频名
    basename: str = None  # noextname + ext 名 1.mp4
    ext: str = None  # 扩展名 mp4

    target_dir: str = None  # 输出文件夹，目标视频输出文件夹

    cache_folder: str = None  # 当前文件的临时文件夹,用于存放临时过程文件

    is_cuda: bool = False  # 是否使用cuda加速

    source_language: str = None  # 原始语言名称或代码
    source_language_code: str = None  # 原始语言代码
    source_sub: Union[os.PathLike,str]=None  # 原始字幕文件绝对路径
    source_wav: Union[os.PathLike,str]=None  # 原始语言音频，存在于临时文件夹下
    source_wav_output: Union[os.PathLike,str]=None  # 原始语言音频输出，存在于目标文件夹下

    target_language: str = None  # 目标语言名称或代码
    target_language_code: str = None  # 目标语言代码
    target_sub: Union[os.PathLike,str]=None  # 目标字幕文件绝对路径
    target_wav: Union[os.PathLike,str]=None  # 目标语言音频，存在于临时文件夹下
    target_wav_output: Union[os.PathLike,str]=None  # 目标语言音频输出，存在于目标文件夹下


# 语音识别
@dataclass
class TaskCfgSTT(TaskCfgBase):
    ####### 语音识别相关
    detect_language: str = None  # 字幕检测语言代码
    recogn_type: int = None  # 语音识别渠道
    model_name: str = None  # 模型名字
    shibie_audio: Union[os.PathLike,str]=None  # 转为 pcm_s16le  16k 作为语音识别的音频文件
    remove_noise: bool = False  # 是否移除噪声
    enable_diariz: bool = False  # 是否进行说话人识别
    nums_diariz: int = 0  # 是否进行说话人识别
    rephrase: int = 0  # 0 默认断句不处理 1=LLM重新断句
    fix_punc: int = 0  # 0=默认，1=恢复标点符号，2=移除所有标点


# 配音
@dataclass
class TaskCfgTTS(TaskCfgBase):
    ######## 配音相关
    tts_type: int = None  # 语音合成渠道
    volume: str = "+0%"  # 音量
    pitch: str = "+0Hz"  # 音调
    voice_rate: str = "+0%"  # 语速
    voice_role: str = None  # 配音角色
    voice_autorate: bool = False  # 是否音频自动加速
    video_autorate: bool = False  # 是否视频自动慢速
    remove_silent_mid: bool = False  # 是否移除字幕间的空隙
    align_sub_audio: bool = True  # 是否强制对齐字幕和声音


# 字幕翻译
@dataclass
class TaskCfgSTS(TaskCfgBase):
    ######## 字幕翻译相关
    translate_type: int = None  # 字幕翻译渠道


# 视频翻译所有
@dataclass
class TaskCfgVTT(TaskCfgSTT, TaskCfgTTS, TaskCfgSTS):
    ############## 视频翻译特有
    subtitle_language: str = None  # 软字幕嵌入语言代码，3位
    app_mode: str = "biaozhun"  # 工作模式 biaohzun tiqu
    subtitles: str = ""  # 已存在的字幕文本，例如预先导入的
    targetdir_mp4: Union[os.PathLike,str]=None  # 最终输出合成后的mp4
    novoice_mp4: Union[os.PathLike,str]=None  # 从原始视频分离出的无声视频
    is_separate: bool = False  # 是否进行人声、背景音分离
    embed_bgm: bool = True  # 是否需要重新嵌入背景音
    instrument: Union[os.PathLike,str]=None  # 分离出的背景音频
    vocal: Union[os.PathLike,str]=None  # 分离出的人声音频
    clear_cache: bool = False  # 是否清理已存在的文件
    background_music: Union[os.PathLike,str]=None  # 手动添加的背景音频，整理后的完整路径
    subtitle_type: int = 0  # 软硬字幕嵌入类型 0=不嵌入，1=硬字幕，2=软字幕，3=双硬，4=双软
    only_out_mp4: bool = False  # 是否仅仅输出mp4,仅视频翻译使用
    recogn2pass: bool = False  # 对配音音频再次识别
    output_srt: int = 0  # 转录并翻译 模式输出字幕类似，0=单字幕，1=目标语言在线双字幕，2=目标语言在上双字幕
    copysrt_rawvideo: bool = False  # 是否将生成的字幕复制到视频目录下
    loop_backaudio: int = 0  # 循环背景音 或 延长拉伸背景音
    backaudio_volume: float = 0.8  # 背景音量
    batch:bool=False# 批量翻译模式或单视频翻译模式
    batch_size:int=0#0批量并发模式，>0 每批n个
    
```

---

## 11. 多线程异步任务处理架构

pyVideoTrans 底层采用 **"生产者-消费者"** 模型，基于多队列协作，实现高效异步流水线。

```text
                     MultVideo (生产者)
                           │
                    app_cfg.prepare_queue
                           ▼
                   WorkerPrepare (×N)
                    ┌────────┼────────┐
                    │ should_recogn ?  │
                    ▼        ▼        ▼
           regcon_queue  trans_queue  dubb_queue / assemb_queue / taskdone_queue
                │
                ▼
          WorkerRegcon (×N)
                │
         diariz_queue
                │
                ▼
          WorkerDiariz (×N)
           ┌────┼────┐
           ▼    ▼    ▼
      trans_queue  dubb_queue  assemb_queue / taskdone_queue
           │
           ▼
     WorkerTrans (×1) ────► API 接口调用 (限制并发以防封禁限流)
      ┌────┼────┐
      ▼    ▼    ▼
 dubb_queue  assemb_queue  taskdone_queue
      │
      ▼
WorkerDubb (×1) ────► API 接口调用 (限制单线程以防封 IP)
      │
 align_queue
      │
      ▼
WorkerAlign (×1)
 ┌────┼────┐
 ▼    ▼    ▼
regcon2_queue  assemb_queue  taskdone_queue
 │
 ▼
WorkerRegcon2Pass (×1)
 ┌────┼────┐
 ▼    ▼
assemb_queue  taskdone_queue
 │
 ▼
WorkerAssemb (×N)
 │
taskdone_queue
 │
 ▼
WorkerTaskDone (×1)
 │
【终止并输出最终 MP4】
```

### 11.1 Worker 线程实例分配与动态调节策略
在启动时，软件会自动计算分配各 Worker 的并发实例数量：
*   **`WorkerTrans`（字幕翻译）与 `WorkerDubb`（配音生成）**：实例数**强制锁死为 1**。因为翻译与配音往往会调用第三方在线云 API 接口，强制单线程能够最大程度规避因高频突发并发导致的目标服务提供商 IP 封禁与 403 频率限流限制。
*   **计算/显卡密集型 Worker**（`Prepare` 预处理、`Regcon` 语音识别、`Assemb` 合成压制）：实例数根据 GPU 与物理硬件资源动态弹性计算（范围为 `1~4`）。若系统拥有单个 GPU，实例默认设为 1；若开启了多卡，实例上限将自适应扩大。
```python
# 策略实现代码 videotrans/task/job.py
def start_thread():
    gpus.getset_gpu()
    task_nums = 1
    # 存在可用显卡时，进一步判断应该启动几个相关线程
    if app_cfg.NVIDIA_GPU_NUMS > 0:
        try:
            process_max_gpu = int(float(settings.get('process_max_gpu', 0)))
        except (TypeError,ValueError):
            process_max_gpu = 1
        # 如果手动设置了gpu进程数量
        if process_max_gpu > 0:
            task_nums = process_max_gpu
        elif app_cfg.NVIDIA_GPU_NUMS > 1 and bool(settings.get('multi_gpus')):
            # 显卡数量真的大于1 并且 启用了多显卡，
            task_nums = 2 if app_cfg.NVIDIA_GPU_NUMS < 4 else 4
        logger.debug(f'最大允许GPU进程[0为不限制]:{process_max_gpu}, 是否多显卡模式:{settings.get("multi_gpus")}, {task_nums=} ')
    logger.debug(f'最大允许CPU进程[0为不限制]: {settings.get("process_max")}, {task_nums=}')
    worker_config = {
        WorkerPrepare: task_nums,  # 准备工作
        WorkerRegcon: task_nums,  # 语音识别
        WorkerDiariz: task_nums,
        WorkerTrans: 1,
        WorkerDubb: 1,
        WorkerRegcon2Pass: 1,
        WorkerAlign: 1,
        WorkerAssemb: task_nums,
        WorkerTaskDone: 1,
    }

    workers = []

    for worker_cls, count in worker_config.items():
        for i in range(count):
            worker = worker_cls()
            if count > 1:
                worker.name = f"{worker.name}-{i + 1}"
            worker.start()
            workers.append(worker)
    logger.debug(f"start {len(workers)} jobs")
    return workers


```

### 11.2 独立子进程池与 GlobalProcessManager
为防止本地 AI 推理模型（如 `faster-whisper`）在遇到极端视频帧或因 C++ 底层显存溢出发生硬崩溃（SegFault）直接连带导致整个 pyVideoTrans 客户端闪退，软件设计了独立子进程隔离池管理机制：
*   **双进程池划分**：`GlobalProcessManager` 在底层维护了专门的 CPU 进程池（`_executor_cpu`）与 GPU 进程池（`_executor_gpu`）。
*   **自适应最大子进程数计算**：
    *   CPU 进程数基于系统空闲内存动态核算。获取物理剩余内存后，按**每 4GB 内存分配 1 个进程**进行划分（限制在 `2~8` 之间）。
    *   GPU 进程数默认等同于系统物理显卡数量。
*   **防内存泄漏自我重启**：每个子进程的 `maxtasksperchild` 属性**强制设置为 1**，即每个子进程在被派发执行完单次 AI 运算（如一段视频的 Whisper 识别）后，进程会被主控池安全回收并重新拉起新实例，从根本上杜绝了开源 AI 推理模型长期运行导致的内存与显卡显存泄漏。

### 11.3 SignalHub 跨线程信号中心
为了消除多线程模型直接修改 Qt 主窗口控件造成的客户端死锁崩溃，pyVideoTrans 设计了统一的单例信号分发中心 `SignalHub`：
*   所有后台 Worker 的状态、百分比进度、调试日志、出错警报一律不得直接修改 UI。
*   Worker 统一通过调用 `BaseCon.signal(**kwargs)` 将状态包装为 `SignMsg`。
*   `SignalHub` 通过 Qt 的异步队列连接（`QueuedConnection`）向主窗口 `MainWindow` 抛出 `new_message`。
*   主窗口的 `WinAction` 接收到消息体后，在安全的 UI 主线程上刷新进度条、弹窗或提示。

---

## 12. 懒加载动态通道加载机制

为避免软件在运行之初一次性加载上百个依赖库（如 PyTorch、OnnxRuntime、各云厂商 SDK 等）导致启动极其缓慢甚至因系统缺少特定 DLL 直接崩溃，软件所有第三方渠道一律使用 **动态懒加载** 技术。

各功能渠道在初始化时仅作为轻量级的元信息注册在列表中。只有当用户在主界面选择该渠道并点击"开始执行"时，pyVideoTrans 才会触发动态导入。

### 12.1 渠道矩阵

#### ASR 语音识别（22 个渠道，注册于 `videotrans/recognition/__init__.py`）
为了满足不同用户的需求，我们提供了多种选择，涵盖本地离线模型和在线云服务。点击渠道名字，查看该渠道详细使用方法。

**本地离线识别 (无需联网，保护隐私)**

这类渠道需要在您第一次使用时下载模型文件到电脑里，之后就可以完全离线运行了。

| 渠道 | 说明 | GPU 加速 | 推荐度 |模型下载地址|
|------|------|---------|--------|--------|
| [faster-whisper(本地内置)](/faster) | 速度快、质量高、支持数十种语言 | ✅ | ⭐⭐⭐ **默认推荐** |[点击进入详情页查看](/faster)|
| [openai-whisper(本地内置)](/openaiwhisper) | 准确度高，速度较慢 | ✅ | ⭐⭐⭐ |[点击进入详情页查看](/openaiwhisper)|
| [Qwen-ASR(本地内置)](/qwenasrlocal) | 中文效果佳 | ✅ | ⭐⭐⭐ 中文推荐 |https://huggingface.co/collections/Qwen/qwen3-asr|
| [FunASR(本地内置)](/funasr) | 中文效果佳 | ✅ | ⭐⭐⭐ 中文推荐 |[点击进入详情页查看](/funasr)|
| Firered中文(本地内置) | 中文+20中文方言 | X | ⭐⭐ |https://modelscope.cn/models/himyworld/videotrans/files|
| Dolphin(本地内置) | 40东方语言 +20中文方言 | X | ⭐⭐ |https://modelscope.cn/models/himyworld/videotrans/files|
| Omnilingual ASR(本地内置) | 1600多种语言 | X | ⭐⭐ |https://modelscope.cn/models/himyworld/videotrans/files|
| parakeet-ja(本地内置) | 仅支持日语 | X | ⭐⭐ |https://modelscope.cn/models/himyworld/videotrans/files|
| [Huggingface_ASR(本地内置)](/huggingface) | 支持多种语言模型 | ✅ | ⭐⭐ |[点击进入详情页查看](/huggingface)|
| [Faster-Whisper-XXL.exe](/xxl) | faster-whisper的Windows封装版本,**需自定额外下载**并指定exe | ✅ | ⭐⭐ |[点击进入详情页查看](/xxl)|
| [whisper.cpp](/whisper-cli) | 使用 whisper.cpp 后端,windows版内置，其他系统需自行编译并将包含`whisper-cli`的二进制文件放入`软件目录/whisper-cpp`文件夹内 | ✅ | ⭐⭐ |[点击进入详情页查看](https://pyVideoTrans.com/whisper-cli)|


**在线识别 (云端处理，功能强大)**

这类渠道会将音频文件上传到云端服务器进行处理，通常效果出色，但部分服务需要付费或有使用限制。


*   **[阿里百炼 Qwen3-ASR](/qwen-mt)**：基于阿里巴巴的"通义千问"大模型，您需要前往阿里百炼平台开通服务并创建 API Key。
*  小米 mimo-v2.5-asr模型中文/中英混合效果佳 [需开通小米AI平台充值并获取API key](https://platform.xiaomimimo.com/console/api-keys)  填写到`菜单-翻译设置-小米AI`|
*   **[Elevenlabs.io 语音识别](/elevenlabsrecogn)**：一家专注于 AI 音频技术的公司提供的服务。您需要前往其官网注册并获取免费的 API Key，免费版额度有限制。
*   **[deepgram.com 语音识别](/deepgram)**：一家知名的语音识别服务商，以高准确率和快速度著称。您需要到其官网 [deepgram.com](http://deepgram.com) 注册并申请 API Key。
*   **[Gemini 大模型识别](/gemini-recognition)**：Google 推出的强大模型，识别小语种的能力很突出。使用时需要有 Gemini API KEY，但国内使用需科学上网。
*   **[Google Speech to Text](https://pyvideotrans.com/)**：Google 语音识别服务。


*   **[302.AI 语音识别](/302ai)**：访问 [302.ai](http://302.ai) 官网申请 app key 后即可使用。
*   **[字节语音识别大模型极速版](/zijierecognmodel)**：字节跳动旗下的语音识别大模型，中文效果极佳。
*   **[字节火山字幕生成](/doubao)**：同样是字节跳动的语音识别模型，效果较上面这个略低。
*   **[OpenAI 语音识别](/openairecogn)**：使用 OpenAI 官方提供的 API 进行识别，效果与本地版 Whisper 同样优秀，但需要您拥有 OpenAI 的 API 密钥（SK）。
*   **[智谱AI GLM-ASR](/zhipu-ai)**：智谱AI提供的语音识别服务。
*   **[Parakeet-tdt 语音识别(本地API)](/parakeet)**：由英伟达（NVIDIA）开源的识别模型。这需要您自行部署服务，然后在软件的设置菜单中填入您的 API 地址。
*   **[STT 语音识别 (本地API)](/stt)**：同样是一个需要您自行部署的开源项目，部署完成后将 API 地址填入软件即可使用。
*   **[WhisperX(本地API)](/whisperx-api)**：WhisperX 的 API 接口版本。
*   **[CAMB AI](/)**：CAMB AI 语音识别服务。
*   **[自定义语音识别 API](/recognapi)**：如果您拥有编程能力，可以根据我们提供的数据格式标准，编写完全属于您自己的语音识别 API 接口，实现最大程度的定制化。

**Huggingface_ASR 可用的模型和支持的语言**
*   `"nvidia/parakeet-ctc-1.1b"`: ['en']
*   `"reazon-research/japanese-wav2vec2-large-rs35kh"`: ['ja']
*   `"kotoba-tech/kotoba-whisper-v2.0"`: ['ja']
*   `"biodatlab/whisper-th-large-v3"`: ['th']
*   `"vinai/Phowhisper-large"`: ['vi']
*   `"openai/whisper-large-v3"`: [所有语言]
*   `zai-org/GLM-ASR-Nano-2512`:智谱AI模型，中文粤语效果佳 
*   `anke01/whisper-small-uyghur`  维吾尔语


#### STS 字幕翻译（24+ 个渠道，注册于 `videotrans/translator/__init__.py`）

**免费翻译渠道**

这类渠道通常免费，但可能存在网络限制或使用频率限制。默认使用Google 翻译渠道，如果失败则自动调用 Microsoft翻译。

*   **[Google 翻译](/googletranslate)**：大家的老朋友，翻译质量可靠。不过，在中国大陆地区使用需要"科学上网"。
*   **[Microsoft 翻译](/microsoft)**：微软出品，无需特殊网络环境即可使用。但请注意，如果短时间内请求次数太多，可能会暂时无法使用。
*   **[M2M100本地模型](/m2m100)**：本地模型翻译，第一次使用在线下载模型。
*   **Hy-MT2-1.8B 本地模型**：腾讯的文字翻译模型，第一次使用在线下载模型。下载地址 https://huggingface.co/tencent/Hy-MT2-1.8B/tree/main
	> 默认使用 1.8B 小尺寸的模型，如果你想使用 7B/30B 更大的模型，请手动到该地址 https://huggingface.co/tencent/Hy-MT2-7B/tree/main  下载所有文件放到 `软件目录/models/models--tencent--Hy-MT2-1.8B` 文件夹内覆盖


**需要申请 API Key 的专业翻译服务**

这些是专业的机器翻译平台，通常需要注册账户、创建应用并获取密钥（API Key）才能使用。它们的服务更稳定，翻译质量也更有保障。

*   **[百度翻译](/baidu)**：百度官方提供的翻译服务。你需要访问[百度翻译开放平台](https://fanyi-api.baidu.com/)，创建自己的应用，并获取 AppID 和密钥。请注意，该服务仅限中国大陆IP使用。
*   **[腾讯翻译](/tencent)**：腾讯云旗下的机器翻译服务。你需要登录[腾讯云](https://cloud.tencent.com/product/tmt)，开通相关服务并创建访问密钥（SecretID 和 SecretKey）。同样，此服务也仅限中国大陆IP使用。
*   **[阿里机器翻译](/alibaba-machine-translation)**：来自阿里云的专业翻译服务。你需要前往阿里云官网开通服务。
*   **[DeepL 翻译](/deepl)**：以高质量和自然的翻译效果而闻名。你需要在其[官网](https://www.deepl.com)注册并使用国际信用卡开通服务。

**AI 大模型翻译渠道**

利用前沿的人工智能模型进行翻译，翻译结果更智能、更贴近人类语言习惯。

*   **[DeepSeek](/deepseek-ai)**：一家专注于大模型研发的公司。你需要前往其开放平台申请 API 密钥。
*   **[字节火山大模型](/zijiehuoshan)**：由字节跳动火山引擎提供。你需要前往其官网开通服务并创建推理点。
*   **[智谱 AI](/zhipu-ai)**：国内领先的 AI 公司。你需要访问[智谱 AI 开放平台](https://open.bigmodel.cn/)申请 API 密钥。
*   **[阿里百炼 API](/qwen-mt)**：阿里云推出的大模型服务平台。你需要前往[阿里百炼平台](https://www.aliyun.com/product/bailian)申请 API 密钥。
*   **[硅基流动 (SiliconFlow)](/siliconflow-ai)**：一家专注于 AI 技术服务的公司。你需要访问其官网申请 SK 密钥。
*   **[302.AI 翻译](/302ai)**：访问 `302.ai` 网站申请 appkey 即可使用。
*   **[OpenRouter.ai](/openrouter-ai)**：一个集成了多种 AI 模型的平台。你需要前往其官网 `openrouter.ai` 申请 SK 密钥。
*   **[OpenAI (ChatGPT)](/openai)**：大名鼎鼎的 ChatGPT，翻译效果出众。你可以使用 OpenAI 官方模型，也可以配置兼容的第三方或中转 API。
*   **[Gemini 翻译](/gemini-recognition)**：Google 出品的强大 AI 模型。你需要前往 Google AI 平台申请 Gemini 的 API 密钥，国内使用需要科学上网。
*   **[AzureGPT 翻译](/azure)**：微软 Azure 云平台提供的 AI 翻译服务，你需要开通 Azure 服务。
*   **[MiniMax AI](/minimaxi)**：MiniMax AI 翻译服务。
*   **[小米AI](/xiaomi)**：小米AI翻译服务。
*   **[CAMB AI](/)**：CAMB AI 翻译服务。

**自行部署与定制**

适合有一定技术能力的开发者，可以让你拥有更高的自由度和控制权。

*   **[DeepLX 翻译](/deeplx)**：一个可以让你免费使用 DeepL 服务的项目，需要你自己在本地或服务器上进行部署。
*   **[LibreTranslate 翻译](/libretranslate)**：一款开源的机器翻译软件，你需要自行部署才能使用。
*   **[兼容 AI/本地模型翻译](/localllm)**：如果你在自己的电脑或服务器上部署了 AI 大模型（需兼容 OpenAI 的接口），可以在这里填写 API 地址直接调用。
*   **[自定义翻译 API](/transapi)**：如果你具备编程能力，可以编写自己的翻译 API。只要按照指定的格式返回数据，就可以无缝集成到我们的软件中。

#### TTS 语音合成（34 个渠道，注册于 `videotrans/tts/__init__.py`）

## 开箱即用（免费）

无需复杂配置，非常适合新手。

| 渠道 | 说明 | 推荐度 |
|------|------|--------|
| [Edge-TTS(免费)](/edgetts) | 微软免费接口，声音自然，支持所有语种 | ⭐⭐⭐ **默认推荐** |
| gTTS(免费) | Google TTS，基础质量，国内需科学上网 | ⭐⭐ |

> ⚠️ Edge-TTS 短时间内大量使用可能触发限流，建议在高级选项中将并发数设为 1，暂停秒数设为 5-10。

---

## 本地内置（免费）

首次使用时自动下载模型，完全离线运行。

| 渠道 | 说明 | GPU 加速 |支持克隆| 推荐度 |模型下载地址|
|------|------|---------|--------|--------|--------|
| [Qwen3-TTS(本地内置)](/qwen-tts) | 支持中英日韩10+语言 | ✅ |✅ | ⭐⭐⭐ 推荐 |https://huggingface.co/collections/Qwen/qwen3-tts|
| [F5-TTS(本地内置)](/f5tts) | 中英日法德俄意、西班牙、印地、阿拉伯语 | ✅ |  ✅ |⭐⭐⭐ |https://huggingface.co/rhasspy/piper-voices|
| MOSS-TTS-Nano(本地内置) | 20种语言 | ❌ | ✅ |⭐⭐ |https://huggingface.co/OpenMOSS-Team/MOSS-TTS-Nano-100M|
| ZipVoice(本地内置) | 中英语言 | ✅ | ✅ |⭐⭐⭐ 推荐 |https://modelscope.cn/models/himyworld/videotrans/files|
| [Piper(本地内置)](/vitspiper) | 轻量级，支持20种语言 | ❌ |  ❌ |⭐⭐ |https://huggingface.co/rhasspy/piper-voices|
| ChatterBox(本地内置) | 22种语言 | ✅ |✅ | ⭐⭐⭐ 推荐 |https://huggingface.co/ResembleAI/chatterbox|
| Supertonic3(本地内置) | 英韩西法配音 | ❌ | ❌ | ⭐⭐ |https://huggingface.co/Supertone/supertonic-3|
| [VITS(本地内置)](/vitspiper) | 中英配音 | ❌ | ❌ | ⭐⭐ |https://modelscope.cn/models/himyworld/videotrans/files|
| [OmniVoice-TTS](/ominivoice) | v4.05版本起内置，支持几乎所有语言 | ✅ | ⭐⭐⭐ 推荐 |



---

## 专业云服务（需 API Key）

| 渠道 | 说明 | 推荐度 |
|------|------|--------|
| [Azure TTS](/azuretts) | 微软专业级语音服务 | ⭐⭐⭐ |
| [OpenAI TTS](/openaitts) | 声音技术领先 | ⭐⭐⭐ |
| [字节语音合成2.0](/doubao2tts) | 中文发音地道 | ⭐⭐⭐ |
| [阿里 Qwen-TTS](/qwen-tts) | 阿里云语音合成 | ⭐⭐⭐ |
| [Gemini TTS](/gemini-tts) | 谷歌 TTS | ⭐⭐ |
| [Elevenlabs.io](/elevenlabstts) | AI 音频技术公司 | ⭐⭐⭐ |
| [302.AI](/302ai) | 聚合平台 | ⭐⭐ |
| [Minimaxi](/minimaxi) | 需充值使用 | ⭐⭐ |
| [小米 TTS](/mitts) | 小米 AI 开放平台 | ⭐⭐ |
| [X.AI TTS](/xaitts) | x.ai 平台 | ⭐⭐ |

---

## 本地自行部署（高阶）

| 渠道 | 说明 | 支持克隆 | 推荐度 |
|------|------|---------|--------|
| [GPT-SoVITS](/gptsovits) | 只需少量音频即可克隆 | ✅ | ⭐⭐⭐ 推荐 |
| [Index-TTS](/f5tts) | 中英克隆 | ✅ | ⭐⭐⭐ 推荐 |
| [Confucius-TTS](/f5tts) | 14种语言 | ✅ | ⭐⭐⭐ |
| [VoxCPM-TTS](/f5tts) | 10+种语言 | ✅ | ⭐⭐⭐ |
| [CosyVoice](/cosyvoice) | 中英日韩等10+种 | ✅ | ⭐⭐ |
| [ChatTTS](/chattts) | 支持中文和英文 | — | ⭐⭐ |
| [Fish-TTS](/fishtts) | 支持内置所有语言 | — | ⭐ |
| [Kokoro-TTS](/kokorotts) | 中英韩意葡德法印地 | — | ⭐ |
| [Spark-TTS](/f5tts) | 中英 | ✅ | ⭐⭐ |
| [clone-voice](/clone-voice) | 已不维护 | ✅ | ⭐ |


---

## 13. CLI 命令行模式详解

## 环境要求

| 项目 | 要求 |
|------|------|
| Python | 3.10 |
| 包管理 | [uv](https://docs.astral.sh/uv/) |
| FFmpeg | 必须安装并配置环境变量（Windows 打包版已内置） |
| GPU 加速（可选） | NVIDIA 显卡 + CUDA 12.8 + cuDNN 9.11 |

### 启动方式

```bash
# 源码部署
uv run cli.py [参数...]

# Windows 打包版 不支持命令行模式，必须源码部署使用
```

> **注意**：Windows 打包版不可使用命令行模式，必须源码部署后使用。

---

## 基本用法

```bash
uv run cli.py --task <任务类型> --name "<文件路径>" [其他参数]
```

**四种任务类型：**

| 任务 | 说明 | 流水线 |
|------|------|--------|
| `stt` | 语音转录 — 将音频/视频中的人声转为 SRT 字幕 | 预处理 → 语音识别 → 说话人分离 → 输出字幕 |
| `tts` | 文字配音 — 将 SRT 字幕或文本转为语音音频 | 预处理 → 配音 → 音画对齐 → 输出音频 |
| `sts` | 字幕翻译 — 将 SRT 字幕翻译为目标语言 | 预处理 → 翻译 → 输出字幕 |
| `vtv` | 视频翻译 — 全流程：识别 → 翻译 → 配音 → 合成视频 | 预处理 → 识别 → 说话人分离 → 翻译 → 配音 → 对齐 → 二次识别 → 合成视频 |

---

## 全局选项

| 选项 | 说明 | 默认值 |
|------|------|--------|
| `--task {stt,tts,sts,vtv}` | **必选** — 任务类型 | — |
| `--name FILE` | **必选** — 输入文件的绝对路径 | — |
| `--output-dir DIR` | 输出目录 | `<软件目录>/output/<文件名>/` |
| `--list {providers,languages,models}` | 查询可用渠道/语言/模型列表 | — |
| `--log-level {DEBUG,INFO,WARNING,ERROR}` | 日志级别 | `WARNING` |
| `-v, --verbose` | 详细输出（等同 `--log-level INFO`） | 否 |
| `-q, --quiet` | 静默模式，仅输出错误 | 否 |
| `--version` | 显示版本号 | — |
| `-h, --help` | 显示帮助信息 | — |

---

## 任务类型总览

### 各任务必选参数

| 任务 | `--name` | `--voice_role` | `--source_language_code` | `--target_language_code` |
|------|:---:|:---:|:---:|:---:|
| `stt` | ✅ | — | — | — |
| `tts` | ✅ | ✅ | — | — |
| `sts` | ✅ | — | 可选（默认 auto） | ✅ |
| `vtv` | ✅ | 可选（默认 No） | ✅ | ✅ |

### 各任务参数范围

| 参数 | stt | tts | sts | vtv |
|------|:---:|:---:|:---:|:---:|
| `--recogn_type` | ✅ | — | — | ✅ |
| `--detect_language` | ✅ | — | — | ✅ |
| `--model_name` | ✅ | — | — | ✅ |
| `--cuda` | ✅ | — | — | ✅ |
| `--remove_noise` | ✅ | — | — | ✅ |
| `--enable_diariz` | ✅ | — | — | ✅ |
| `--nums_diariz` | ✅ | — | — | ✅ |
| `--rephrase` | ✅ | — | — | ✅ |
| `--fix_punc` | ✅ | — | — | ✅ |
| `--tts_type` | — | ✅ | — | ✅ |
| `--voice_role` | — | ✅ | — | ✅ |
| `--voice_rate` | — | ✅ | — | ✅ |
| `--volume` | — | ✅ | — | ✅ |
| `--pitch` | — | ✅ | — | ✅ |
| `--voice_autorate` | — | ✅ | — | ✅ |
| `--align_sub_audio` | — | ✅ | — | ✅ |
| `--translate_type` | — | — | ✅ | ✅ |
| `--source_language_code` | — | — | ✅ | ✅ |
| `--target_language_code` | — | — | ✅ | ✅ |
| `--video_autorate` | — | — | — | ✅ |
| `--is_separate` | — | — | — | ✅ |
| `--recogn2pass` | — | — | — | ✅ |
| `--subtitle_type` | — | — | — | ✅ |
| `--clear_cache` | — | — | — | ✅ |

---

## STT — 语音转录

将音频或视频中的人声转录为带时间轴的 SRT 字幕文件。

### 参数说明

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `--recogn_type` | int | `0` | 语音识别渠道编号（0=faster-whisper, 1=openai-whisper, ...） |
| `--detect_language` | str | `auto` | 音频发音语言（auto=自动检测, zh-cn, en, ja, ...） |
| `--model_name` | str | `tiny` | 模型名称（仅 faster-whisper/openai-whisper 有效） |
| `--cuda` | flag | 否 | 启用 CUDA GPU 加速 |
| `--remove_noise` | flag | 否 | 启用降噪 |
| `--enable_diariz` | flag | 否 | 启用说话人识别 |
| `--nums_diariz` | int | `-1` | 说话人数量（-1=自动检测） |
| `--rephrase` | int | `0` | 重新断句（0=默认, 1=LLM 断句） |
| `--fix_punc` | flag | 否 | 恢复标点符号 |

### 示例

**最简用法 — 使用 faster-whisper 转录中文视频：**

```bash
uv run cli.py --task stt --name "60.mp4"
```

> 默认使用 faster-whisper + tiny 模型，输出 SRT 字幕到 `output/60-mp4/` 目录。

**指定 large-v3 模型 + GPU 加速：**

```bash
uv run cli.py --task stt --name "60.mp4" --recogn_type 0 --model_name large-v3 --cuda
```

**指定源语言为中文 + 降噪：**

```bash
uv run cli.py --task stt --name "60.mp4" --detect_language zh-cn --remove_noise --cuda
```

**使用 openai-whisper 渠道：**

```bash
uv run cli.py --task stt --name "60.mp4" --recogn_type 1 --model_name large-v3 --cuda
```

**启用说话人识别（指定 2 人）：**

```bash
uv run cli.py --task stt --name "60.mp4" --enable_diariz --nums_diariz 2 --cuda
```

**启用 LLM 重新断句 + 恢复标点：**

```bash
uv run cli.py --task stt --name "60.mp4" --rephrase 1 --fix_punc --cuda
```

**自定义输出目录：**

```bash
uv run cli.py --task stt --name "60.mp4" --output-dir "D:/my_output" --cuda
```

---

## TTS — 文字配音

将 SRT 字幕文件或纯文本文件转换为语音音频。

### 参数说明

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `--tts_type` | int | `0` | 配音渠道编号（0=Edge-TTS, ...） |
| `--voice_role` | str | **必选** | 音色名称 |
| `--voice_rate` | str | `+0%` | 语速（如 `+20%` 加速, `-10%` 减速） |
| `--volume` | str | `+0%` | 音量（如 `+50%` 增大, `-30%` 减小） |
| `--pitch` | str | `+0Hz` | 音调（如 `+10Hz` 变尖锐, `-5Hz` 变低沉） |
| `--voice_autorate` | flag | 否 | 自动加速音频以对齐字幕时间轴 |
| `--align_sub_audio` | flag | 否 | 强制修改字幕时间轴以对齐音频 |
| `--target_language_code` | str | `None` | 目标语言代码 |

### 示例

**最简用法 — 使用 Edge-TTS 为中文字幕配音：**

```bash
uv run cli.py --task tts --name "zw.srt" --voice_role "zh-CN-YunyangNeural"
```

> 使用微软免费 Edge-TTS 的云扬（男声）为中文字幕生成配音音频。

**英文配音（从中文翻译后配音）：**

```bash
uv run cli.py --task tts --name "zw.srt" --voice_role "en-US-GuyNeural" --target_language_code en
```

**调整语速和音量：**

```bash
uv run cli.py --task tts --name "zw.srt" --voice_role "zh-CN-YunyangNeural" --voice_rate=+20% --volume=+10%
```

**调整音调（变低沉）：**

```bash
uv run cli.py --task tts --name "zw.srt" --voice_role "zh-CN-YunyangNeural" --pitch=-5Hz
```

**启用自动加速对齐：**

```bash
uv run cli.py --task tts --name "zw.srt" --voice_role "zh-CN-YunyangNeural" --voice_autorate
```

**使用其他 TTS 渠道（如 OpenAI TTS，渠道编号需通过 `--list providers` 查看）：**

```bash
uv run cli.py --task tts --name "zw.srt" --tts_type <渠道编号> --voice_role "alloy"
```

### 常用 Edge-TTS 音色

| 音色名称 | 性别 | 语言 | 说明 |
|----------|------|------|------|
| `zh-CN-YunyangNeural` | 男 | 中文 | 云扬 — 新闻播报风格 |
| `zh-CN-XiaoxiaoNeural` | 女 | 中文 | 晓晓 — 自然对话 |
| `zh-CN-YunxiNeural` | 男 | 中文 | 云希 — 年轻活泼 |
| `en-US-GuyNeural` | 男 | 英文 | Guy — 自然男声 |
| `en-US-JennyNeural` | 女 | 英文 | Jenny — 自然女声 |
| `en-US-AriaNeural` | 女 | 英文 | Aria — 专业女声 |
| `en-US-EmmaNeural` | 女 | 英文 | Emma — 温暖女声 |
| `en-US-BrianNeural` | 男 | 英文 | Brian — 沉稳男声 |

> 完整音色列表请运行 `uv run cli.py --list providers` 或在软件 GUI 的 TTS 设置中查看。

---

## STS — 字幕翻译

将 SRT 字幕文件从一种语言翻译为另一种语言。

### 参数说明

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `--translate_type` | int | `0` | 翻译渠道编号（0=Google, ...） |
| `--source_language_code` | str | `auto` | 源语言代码（auto=自动检测） |
| `--target_language_code` | str | **必选** | 目标语言代码 |

### 示例

**最简用法 — 将中文字幕翻译为英文：**

```bash
uv run cli.py --task sts --name "zw.srt" --target_language_code en
```

> 默认使用 Google 翻译，源语言自动检测。

**指定源语言为中文：**

```bash
uv run cli.py --task sts --name "zw.srt" --source_language_code zh-cn --target_language_code en
```

**使用其他翻译渠道（如 DeepSeek，渠道编号需通过 `--list providers` 查看）：**

```bash
uv run cli.py --task sts --name "zw.srt" --translate_type <渠道编号> --target_language_code en
```

**翻译为日文：**

```bash
uv run cli.py --task sts --name "zw.srt" --target_language_code ja
```

**翻译为韩文：**

```bash
uv run cli.py --task sts --name "zw.srt" --target_language_code ko
```

---

## VTV — 视频翻译

全流程视频翻译：语音识别 → 字幕翻译 → 配音 → 音画合成。这是最常用也是最复杂的任务类型。

### 参数说明

VTV 模式包含 STT + TTS + STS 的所有参数，加上以下额外参数：

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `--source_language_code` | str | **必选** | 源语言代码（不可为 auto） |
| `--target_language_code` | str | **必选** | 目标语言代码 |
| `--voice_role` | str | `No` | 配音角色（`No`=不配音） |
| `--video_autorate` | flag | 否 | 自动慢速视频以对齐配音 |
| `--is_separate` | flag | 否 | 分离人声背景声 |
| `--recogn2pass` | flag | 否 | 二次语音识别（生成更精准字幕） |
| `--subtitle_type` | int | `1` | 字幕类型（0=无, 1=硬字幕, 2=软字幕, 3=硬字幕双语, 4=软字幕双语） |
| `--clear_cache` | flag | 是 | 完成后清理缓存 |
| `--no-clear-cache` | flag | — | 不清理缓存 |

### 示例

**最简用法 — 中文视频翻译为英文（不配音，仅替换字幕）：**

```bash
uv run cli.py --task vtv --name "60.mp4" --source_language_code zh-cn --target_language_code en
```

> 默认使用 faster-whisper 识别 + Google 翻译 + 不配音（voice_role=No），嵌入硬字幕。

**完整流程 — 中文视频翻译为英文并配音：**

```bash
uv run cli.py --task vtv --name "60.mp4" --source_language_code zh-cn --target_language_code en --voice_role "en-US-GuyNeural"
```

> 使用 Edge-TTS 的 Guy 男声为翻译后的英文字幕配音。

**GPU 加速 + 高精度模型：**

```bash
uv run cli.py --task vtv --name "60.mp4" --source_language_code zh-cn --target_language_code en --voice_role "en-US-GuyNeural" --cuda --recogn_type 0 --model_name large-v3
```

**分离人声背景声（提高识别和配音质量）：**

```bash
uv run cli.py --task vtv --name "60.mp4" --source_language_code zh-cn --target_language_code en --voice_role "en-US-GuyNeural" --is_separate --cuda
```

**双语硬字幕 + 二次识别：**

```bash
uv run cli.py --task vtv --name "60.mp4" --source_language_code zh-cn --target_language_code en --voice_role "en-US-GuyNeural" --subtitle_type 3 --recogn2pass --cuda
```

**软字幕（播放器可开关）+ 音频自动加速：**

```bash
uv run cli.py --task vtv --name "60.mp4" --source_language_code zh-cn --target_language_code en --voice_role "en-US-GuyNeural" --subtitle_type 2 --voice_autorate --cuda
```

**视频慢速对齐（配音比视频长时放慢视频）：**

```bash
uv run cli.py --task vtv --name "60.mp4" --source_language_code zh-cn --target_language_code en --voice_role "en-US-GuyNeural" --video_autorate --cuda
```

**自定义输出目录 + 保留缓存：**

```bash
uv run cli.py --task vtv --name "60.mp4" --source_language_code zh-cn --target_language_code en --voice_role "en-US-GuyNeural" --output-dir "D:/translated" --no-clear-cache
```

**翻译为日文并配音：**

```bash
uv run cli.py --task vtv --name "60.mp4" --source_language_code zh-cn --target_language_code ja --voice_role "ja-JP-KeitaNeural" --cuda
```

**翻译为韩文并配音：**

```bash
uv run cli.py --task vtv --name "60.mp4" --source_language_code zh-cn --target_language_code ko --voice_role "ko-KR-InJoonNeural" --cuda
```

**静默模式运行（仅输出错误）：**

```bash
uv run cli.py --task vtv --name "60.mp4" --source_language_code zh-cn --target_language_code en --voice_role "en-US-GuyNeural" -q
```

**详细日志模式（调试用）：**

```bash
uv run cli.py --task vtv --name "60.mp4" --source_language_code zh-cn --target_language_code en --voice_role "en-US-GuyNeural" -v
```

---

## 查询工具

### 列出所有可用渠道

```bash
uv run cli.py --list providers
```

输出示例：

```
=== Available Providers ===

--- Speech Recognition (STT) ---
  0 = faster-whisper(本地内置)
  1 = openai-whisper(本地内置)
  2 = Qwen-ASR(本地内置)
  ...

--- Translation ---
  0 = Google翻译
  1 = 微软翻译
  2 = 百度翻译
  ...

--- Text-to-Speech (TTS) ---
  0 = Edge-TTS
  1 = Azure TTS
  2 = OpenAI TTS
  ...
```

### 列出所有支持的语言

```bash
uv run cli.py --list languages
```

输出示例：

```
=== Available Language Codes ===
  en         English
  zh-cn      简体中文
  zh-tw      繁體中文
  ja         日本語
  ko         한국어
  fr         Français
  de         Deutsch
  es         Español
  ...
```

### 列出 faster-whisper 可用模型

```bash
uv run cli.py --list models
```

输出示例：

```
=== faster-whisper Models ===
  tiny                      Systran/faster-whisper-tiny
  base                      Systran/faster-whisper-base
  small                     Systran/faster-whisper-small
  medium                    Systran/faster-whisper-medium
  large-v3                  Systran/faster-whisper-large-v3
  large-v3-turbo            mobiuslabsgmbh/faster-whisper-large-v3-turbo
  ...
```

---

## 完整示例

以下示例均假设：
- 中文原始视频文件为 `60.mp4`
- 中文字幕文件为 `zw.srt`
- 翻译目标语言为英文
- 配音使用 Edge-TTS 的 `en-US-GuyNeural` 音色
- 其他非必须参数保持默认

### 场景 1：仅语音转录（中文字幕生成）

```bash
uv run cli.py --task stt --name "60.mp4" --detect_language zh-cn --cuda
```

**说明**：将 `60.mp4` 中的中文语音转录为 `zh-cn.srt` 字幕文件，输出到 `output/60-mp4/`。

### 场景 2：仅字幕翻译（中文字幕 → 英文字幕）

```bash
uv run cli.py --task sts --name "zw.srt" --source_language_code zh-cn --target_language_code en
```

**说明**：将 `zw.srt` 翻译为 `en.srt`，输出到 `output/zw-srt/`。

### 场景 3：仅文字配音（为中文字幕生成英文配音）

```bash
uv run cli.py --task tts --name "zw.srt" --voice_role "en-US-GuyNeural" --target_language_code en
```

**说明**：为 `zw.srt` 中的文本生成英文配音 WAV 文件，输出到 `output/zw-srt/`。

### 场景 4：完整视频翻译（中文 → 英文，带配音）

```bash
uv run cli.py --task vtv --name "60.mp4" --source_language_code zh-cn --target_language_code en --voice_role "en-US-GuyNeural" --cuda
```

**说明**：全流程处理：
1. 识别 `60.mp4` 中的中文语音 → 生成中文字幕
2. 将中文字幕翻译为英文字幕
3. 使用 Edge-TTS Guy 男声生成英文配音
4. 将英文字幕和配音合成到视频中

输出：`output/60-mp4/60.mp4`（翻译后的视频）


---

## 13.2 WebUI界面使用说明

# pyVideoTrans WebUI 使用指南

## ⚠️ 重要提示

> **WebUI 版本仅实现了部分功能**，主要用于以下场景：
> - 云服务器部署（远程访问翻译服务）
> - 局域网内部署（服务器与使用机分离）
> - Docker 容器化部署
>
> **如需完整功能**，请使用桌面客户端（`sp.exe`）或源码运行（`sp.py`）。
> 桌面版支持更多 API 渠道配置、实时交互编辑、批量处理等高级功能。

---

## 一、部署方式

### 1.1 源码部署（推荐）

```bash
git clone https://github.com/jianchang512/pyvideotrans.git
cd pyvideotrans
uv sync --extra webui
```

启动服务：

```bash
uv run webui.py                    # 默认 0.0.0.0:7860
uv run webui.py --port 8080        # 指定端口
uv run webui.py --host 127.0.0.1   # 仅本机访问
uv run webui.py --share            # 创建 Gradio 公网链接
```

访问：`http://127.0.0.1:7860` 或 `http://<服务器IP>:7860`

### 1.2 Docker 部署

```bash
# 构建镜像
git clone https://github.com/jianchang512/pyvideotrans.git
cd pyvideotrans
docker build -t pyvideotrans-webui .

# 运行
docker run -d -p 7860:7860 --name pyvideotrans pyvideotrans-webui

# 持久化配置和输出
docker run -d -p 7860:7860 \
  -v ./data/output:/app/output \
  -v ./data/config:/app/videotrans \
  --name pyvideotrans pyvideotrans-webui

# GPU 加速
docker run -d -p 7860:7860 --gpus all \
  -v ./data/output:/app/output \
  -v ./data/config:/app/videotrans \
  --name pyvideotrans pyvideotrans-webui
```

### 1.3 Google Colab

1. 打开 https://colab.research.google.com/drive/1kPTeAMz3LnWRnGmabcz4AWW42hiehmfm?usp=sharing
2. 登录 Google 账号 → 点击 **全部运行**
3. 等待 `*.gradio.live` 链接出现，点击使用

> ⚠️ Colab 免费版有 4-6 小时使用时长限制。

---

## 二、界面说明

WebUI 分为三个标签页：

### 2.1 🎬 视频翻译（主界面）

**文件选择**：支持 mp4/mkv/avi/mov/webm/wav/mp3/m4a/flac 等格式

**语音识别**：可选 faster-whisper/openai-whisper/Qwen-ASR/FunASR/Huggingface_ASR（均为本地内置免费渠道）

**字幕翻译**：可选 Google/Microsoft/M2M100（免费渠道）

**字幕配音**：可选 Edge-TTS/Qwen3-TTS/MOSS-TTS/Piper/VITS/Supertonic/ChatterBox/gTTS（免费/本地内置渠道）

**对齐与字幕**：配音加速、视频慢速、语速/音量/音调调节、字幕嵌入类型

**更多设置**：降噪、标点处理、人声分离、背景声嵌入、CUDA 加速

**硬字幕样式编辑**：字体、颜色、描边、阴影、对齐等全面自定义

### 2.2 ⚙️ 渠道设置

配置各渠道的 API 地址、SK 密钥、模型等。**与桌面版通用**，配置保存在 `videotrans/params.json` 中。

包含：翻译渠道、语音识别渠道、配音渠道、参考音频设置

> 使用 API 渠道前，需先用桌面版（sp.exe）配置好 API 地址和 SK 密钥。

### 2.3 🔧 高级选项

配置全局高级参数，与桌面版 `菜单 → 工具 → 高级选项` 完全通用。

包含：通用设置、视频输出控制、语音识别参数、字幕翻译调整、字幕配音调整、字幕声音画面对齐、Whisper模型提示词

---

## 三、执行翻译

1. 选择视频/音频文件
2. 配置识别/翻译/配音参数
3. 点击「🚀 开始执行」

执行过程：
- 按钮变为「⏳ 执行中...」并禁用
- 右侧日志实时显示 8 个阶段进度
- 完成后按钮恢复，视频预览区可在线播放，文件区可下载

---

## 四、与桌面版对比

| 功能 | WebUI | 桌面版 |
|------|:-----:|:-----:|
| 视频翻译完整流程 | ✅ | ✅ |
| API 渠道（需先用桌面版配置） | ✅ | ✅ |
| 高级选项配置 | ✅ | ✅ |
| 实时交互编辑字幕 | ❌ | ✅ |
| 批量处理 | ❌ | ✅ |
| 视频预览播放 | ✅ | ❌ |
| 远程访问 / Docker | ✅ | ❌ |

---

## 五、常见问题

**Q: 启动报错 No module named gradio**
`uv sync --extra webui`

**Q: Docker 如何持久化配置**
`-v ./data/output:/app/output -v ./data/config:/app/videotrans`

**Q: Docker 如何使用 GPU**
安装 nvidia-container-toolkit 后：`docker run --gpus all ...`

**Q: 如何使用 API 渠道**
先用桌面版配置好 API 地址和 SK，WebUI 自动读取 `params.json`

**Q: 如何创建公网链接**
`uv run webui.py --share`，控制台输出临时 `*.gradio.live` 链接


---




## 14. 手动下载 各个渠道使用的模型
为减小软件体积，不内置任何模型，将在第一次使用时自动在线下载，主要从国外模型仓库`huggingface.co`、国内镜像站`hf-mirror.com`和 阿里魔塔`modelscope.cn`下载

> 模型体积普遍较大、国外模型仓库国内无法直接访问，需科学上网，无科学上网时软件内部会自动切换国内镜像站
>
> 即便已科学上网，但若是科学工具网络不够稳定仍可能下载失败；
>
> 而国内镜像站有下载频率限制，下载速度也不够快、不够稳定。
>
> 由于以上种种原因，下载失败非常常见，很多其他错误也多由模型下载失败后间接引发的。


本页面列出所有用到的模型下载地址、下载后本地存放位置，若自动下载总是失败，可尝试手动下载。


- 国外模型仓库地址：https://huggingface.co 
- 部分阿里模型和onnx模型将从阿里魔塔下载： https://modelscope.cn

::: details 下载注意事项

一般每个模型都有多个文件组成，而不同模型可能存在相同名字的文件，例如大多都存在`model.safetensors`，如果你下载目录下已存在同名文件，浏览器可能为自动为你重命名，例如你下载的是`model.safetensors`,可能被自动命名为`model(2).safetensors`，你必须重新改回原名，然后放到要求的存放位置，软件才能识别到。


在 huggingface.co 网站，点击下载图标，即可下载该模型文件

![](https://pvtr2.pyvideotrans.com/1784297941847_image.png)


:::

----
----


## 语音识别渠道所用模型

### Qwen-ASR(本地内置) 

**0.6B模型：**
	- 下载地址：https://huggingface.co/Qwen/Qwen3-ASR-0.6B/tree/main  
	- 存放位置：`软件目录/models/models--Qwen--Qwen3-ASR-0.6B` 

**1.7B模型：**
	- 下载地址：https://huggingface.co/Qwen/Qwen3-ASR-1.7B/tree/main  
	- 存放位置：`软件目录/models/models--Qwen--Qwen3-ASR-1.7B`

### Firered中文(本地内置)
- 下载地址：https://modelscope.cn/models/himyworld/videotrans/resolve/master/fireredasr2aed.zip
- 存放位置：`软件目录/models/解压后得到 fireredasr 文件夹到此`
### Dolphin(本地内置)
- 下载地址：https://modelscope.cn/models/himyworld/videotrans/resolve/master/dolphin.zip
- 存放位置：`软件目录/models/解压后得到 dolphin 文件夹到此`
### Omnilingual亚洲语言(本地内置)
- 下载地址：https://modelscope.cn/models/himyworld/videotrans/resolve/master/omnilingual.zip
- 存放位置：`软件目录/models/解压后得到 omnilingual 文件夹到此`
### parakeet日语(本地内置)
- 下载地址：https://modelscope.cn/models/himyworld/videotrans/resolve/master/parakeet-ja.zip
- 存放位置：`软件目录/models/解压后得到 parakeet 文件夹到此`

### faster-whisper(本地内置)

| 模型名称 | 本地存放位置 | 下载地址 |
|----------|-----------|---------------------|
| tiny | `软件目录/modles/models--Systran--faster-whisper-tiny` | https://huggingface.co/Systran/faster-whisper-tiny/tree/main |
| base | `软件目录/modles/models--Systran--faster-whisper-base` | https://huggingface.co/Systran/faster-whisper-base/tree/main |
| small | `软件目录/modles/models--Systran--faster-whisper-small` | https://huggingface.co/Systran/faster-whisper-small/tree/main |
| medium | `软件目录/modles/models--Systran--faster-whisper-medium` | https://huggingface.co/Systran/faster-whisper-medium/tree/main |
| large-v1 | `软件目录/modles/models--Systran--faster-whisper-large-v1` | https://huggingface.co/Systran/faster-whisper-large-v1/tree/main |
| large-v2 | `软件目录/modles/models--Systran--faster-whisper-large-v2` | https://huggingface.co/Systran/faster-whisper-large-v2/tree/main |
| large-v3 | `软件目录/modles/models--Systran--faster-whisper-large-v3` | https://huggingface.co/Systran/faster-whisper-large-v3/tree/main |
| large-v3-turbo | `软件目录/modles/models--mobiuslabsgmbh--faster-whisper-large-v3-turbo` | https://huggingface.co/mobiuslabsgmbh/faster-whisper-large-v3-turbo/tree/main |
|----------|-----------|---------------------|
| tiny.en | `软件目录/modles/models--Systran--faster-whisper-tiny.en` | https://huggingface.co/Systran/faster-whisper-tiny.en/tree/main |
| base.en | `软件目录/modles/models--Systran--faster-whisper-base.en` | https://huggingface.co/Systran/faster-whisper-base.en/tree/main |
| small.en | `软件目录/modles/models--Systran--faster-whisper-small.en` | https://huggingface.co/Systran/faster-whisper-small.en/tree/main |
| medium.en | `软件目录/modles/models--Systran--faster-whisper-medium.en` | https://huggingface.co/Systran/faster-whisper-medium.en/tree/main |
|----------|-----------|---------------------|
| distil-large-v2 | `软件目录/modles/models--Systran--faster-distil-whisper-large-v2` | https://huggingface.co/Systran/faster-distil-whisper-large-v2/tree/main |
| distil-large-v3 | `软件目录/modles/models--Systran--faster-distil-whisper-large-v3` | https://huggingface.co/Systran/faster-distil-whisper-large-v3/tree/main |
| distil-large-v3.5 | `软件目录/modles/models--distil-whisper--distil-large-v3.5-ct2` | https://huggingface.co/distil-whisper/distil-large-v3.5-ct2/tree/main |
| distil-small.en | `软件目录/modles/models--Systran--faster-distil-whisper-small.en` | https://huggingface.co/Systran/faster-distil-whisper-small.en/tree/main |
| distil-medium.en | `软件目录/modles/models--Systran--faster-distil-whisper-medium.en` | https://huggingface.co/Systran/faster-distil-whisper-medium.en/tree/main |



### openai-whisper(本地内置)

> 下载后的.pt模型文件直接放在 `软件目录/models` 文件夹内即可

- **tiny.en**  https://openaipublic.azureedge.net/main/whisper/models/d3dd57d32accea0b295c96e26691aa14d8822fac7d9d27d5dc00b4ca2826dd03/tiny.en.pt
- **tiny**  https://openaipublic.azureedge.net/main/whisper/models/65147644a518d12f04e32d6f3b26facc3f8dd46e5390956a9424a650c0ce22b9/tiny.pt
- **base.en**  https://openaipublic.azureedge.net/main/whisper/models/25a8566e1d0c1e2231d1c762132cd20e0f96a85d16145c3a00adf5d1ac670ead/base.en.pt
- **base**  https://openaipublic.azureedge.net/main/whisper/models/ed3a0b6b1c0edf879ad9b11b1af5a0e6ab5db9205f891f668f8b0e6c6326e34e/base.pt
- **small.en**  https://openaipublic.azureedge.net/main/whisper/models/f953ad0fd29cacd07d5a9eda5624af0f6bcf2258be67c92b79389873d91e0872/small.en.pt
- **small**  https://openaipublic.azureedge.net/main/whisper/models/9ecf779972d90ba49c06d968637d720dd632c55bbf19d441fb42bf17a411e794/small.pt
- **medium.en**  https://openaipublic.azureedge.net/main/whisper/models/d7440d1dc186f76616474e0ff0b3b6b879abc9d1a4926b7adfa41db2d497ab4f/medium.en.pt
- **medium**  https://openaipublic.azureedge.net/main/whisper/models/345ae4da62f9b3d59415adc60127b97c714f32e89e936602e85993674d08dcb1/medium.pt
- **large-v1**  https://openaipublic.azureedge.net/main/whisper/models/e4b87e7e0bf463eb8e6956e646f1e277e901512310def2c24bf0e11bd3c28e9a/large-v1.pt
- **large-v2**  https://openaipublic.azureedge.net/main/whisper/models/81f7c96c852ee8fc832187b0132e569d6c3065a3252ed18e56effd0b6a73e524/large-v2.pt
- **large-v3**  https://openaipublic.azureedge.net/main/whisper/models/e5b1a55b89c1367dacf97e3e19bfd829a01529dbfdeefa8caeb59b3f1b81dadb/large-v3.pt
- **large**  https://openaipublic.azureedge.net/main/whisper/models/e5b1a55b89c1367dacf97e3e19bfd829a01529dbfdeefa8caeb59b3f1b81dadb/large-v3.pt
- **large-v3-turbo**  https://openaipublic.azureedge.net/main/whisper/models/aff26ae408abcba5fbf8813c21e62b0941638c5f6eebfb145be0c9839262a19a/large-v3-turbo.pt
- **turbo**  https://openaipublic.azureedge.net/main/whisper/models/aff26ae408abcba5fbf8813c21e62b0941638c5f6eebfb145be0c9839262a19a/large-v3-turbo.pt

### HuggingFace_ASR(本地内置)

- **zai-org/GLM-ASR-Nano-2512**

	* 下载地址：https://huggingface.co/zai-org/GLM-ASR-Nano-2512/tree/main
	* 存放位置：`软件目录/models/models--zai-org--GLM-ASR-Nano-2512`

- **anke01/whisper-small-uyghur**

	* 下载地址：https://huggingface.co/anke01/whisper-small-uyghur/tree/main
	* 存放地址：`软件目录/models/models--anke01--whisper-small-uyghur`

- **nvidia/parakeet-ctc-1.1b（英语）**

	* 下载地址：https://huggingface.co/nvidia/parakeet-ctc-1.1b/tree/main
	* 存放地址：`软件目录/models/models--nvidia--parakeet-ctc-1.1b`

- **reazon-research/japanese-wav2vec2-large-rs35kh（日语）**
	* 下载地址：https://huggingface.co/reazon-research/japanese-wav2vec2-large-rs35kh/tree/main
	* 存放地址：`软件目录/models/models--reazon-research--japanese-wav2vec2-large-rs35kh`


- **kotoba-tech/kotoba-whisper-v2.0（日语）**

	* 下载地址：https://huggingface.co/kotoba-tech/kotoba-whisper-v2.0/tree/main
	* 存放地址：`软件目录/models/models--kotoba-tech--kotoba-whisper-v2.0`


- **biodatlab/whisper-th-large-v3（泰语）**

	* 下载地址：https://huggingface.co/biodatlab/whisper-th-large-v3/tree/main
	* 存放地址：`软件目录/models/models--biodatlab--whisper-th-large-v3`


- **vinai/Phowhisper-large（越南语）**

	* 下载地址：https://huggingface.co/vinai/Phowhisper-large/tree/main
	* 存放地址：`软件目录/models/models--vinai--Phowhisper-large`


- **openai/whisper-large-v3**

	* 下载地址：https://huggingface.co/openai/whisper-large-v3/tree/main
	* 存放地址：`软件目录/models/models--openai--whisper-large-v3`

### whisper.cpp

- windows预编译包下载地址：下载后里面的`whisper-cli`文件夹复制到`软件目录内`
	* https://huggingface.co/mortimerme/repocollect/resolve/main/whisper-cpp-win32.zip?download=true
	* https://modelscope.cn/models/himyworld/videotrans/resolve/master/whisper-cpp-win32.zip
- 模型下载地址：
	
	* 下载源(墙外)：[https://huggingface.co/ggerganov/whisper.cpp/tree/main](https://huggingface.co/ggerganov/whisper.cpp/tree/main)
	* 镜像下载源：[https://hf-mirror.com/ggerganov/whisper.cpp/tree/main](https://hf-mirror.com/ggerganov/whisper.cpp/tree/main)
> 单文件模型，下载后将 `.bin` 文件放入 `软件目录/models` 文件夹内。

> Macos和Linux系统需要自行根据 whisper.cpp 官方仓库说明编译，编译后将包含 whisper-cli 的二进制文件及依赖放入`软件目录/whisper-cpp`文件夹内
> [whisper.cpp官方仓库](https://github.com/ggml-org/whisper.cpp)

----
----

## 翻译渠道(字幕翻译)所用模型

### Hy-MT2-1.8B(本地内置)
- 下载地址： https://huggingface.co/tencent/Hy-MT2-1.8B/tree/main
- 存放地址：`软件目录/models/models--tencent--Hy-MT2-1.8B`
### M2M100(本地内置)
- 下载地址：https://modelscope.cn/models/himyworld/videotrans/resolve/master/m2m100_12b_model.zip
- 存放地址：`软件目录/models/解压后得到 m2m100 文件夹到此`

----
----

## 配音渠道所用模型

### Piper(本地内置)
- 下载地址：https://huggingface.co/rhasspy/piper-voices/tree/main  
- 存放位置：`软件目录/models/piper`

### VITS(本地内置)
- 下载地址：https://modelscope.cn/models/himyworld/videotrans/resolve/master/vits-tts.zip
- 存放位置：`软件目录/models/解压后得到 vits 文件夹到此`

### ZipVoice(本地内置)
- 下载地址：https://modelscope.cn/models/himyworld/videotrans/resolve/master/zipvoice-tts.zip
- 存放位置：`软件目录/models/解压后得到 zipvoice 文件夹到此`

### OmniVoice(本地内置)
- 下载地址：https://huggingface.co/k2-fsa/OmniVoice/tree/main  
- 存放位置：`软件目录/models/models--k2-fsa--OmniVoice`

### MOSS-TTS-Nano(本地内置)
- 下载地址：https://huggingface.co/OpenMOSS-Team/MOSS-TTS-Nano-100M/tree/main  
- 存放位置：`软件目录/models/MOSS-TTS-Nano-100M`
- 下载地址：https://huggingface.co/OpenMOSS-Team/MOSS-Audio-Tokenizer-Nano-ONNX/tree/main  
- 存放位置：`软件目录/models/MOSS-Audio-Tokenizer-Nano-ONNX`

### ChatterBox(本地内置)
- 下载地址：https://huggingface.co/ResembleAI/chatterbox/tree/main  
- 存放位置：`软件目录/models/models--ResembleAI--chatterbox`

### Supertonic(本地内置)
- 下载地址：https://huggingface.co/Supertone/supertonic-3/tree/main  
- 存放位置：`软件目录/models/models--Supertone--supertonic-3`

### Qwen3-TTS(本地内置)
- 下载地址：https://huggingface.co/Qwen/Qwen3-TTS-12Hz-0.6B-Base/tree/main
- 存放位置：`软件目录/models/models--Qwen--Qwen3-TTS-12Hz-0.6B-Base`

- 下载地址：https://huggingface.co/Qwen/Qwen3-TTS-12Hz-0.6B-CustomVoice/tree/main
- 存放位置：`软件目录/models/models--Qwen--Qwen3-TTS-12Hz-0.6B-CustomVoice`

### F5-TTS(本地内置)

- 官方中英模型(1.35G)：https://huggingface.co/SWivid/F5-TTS/tree/main/F5TTS_v1_Base
> 存放位置: `软件目录/models/models--SWivid--F5-TTS/F5TTS_v1_Base`

- 日语模型(5.6G)：https://huggingface.co/Jmica/F5TTS/tree/main/JA_21999120
> 存放位置: `软件目录/models/models--Jmica--F5TTS/JA_21999120`

- 法语模型(5.4G)：https://huggingface.co/RASPIAUDIO/F5-French-MixedSpeakers-reduced/tree/main
> 存放位置: `软件目录/models/models--RASPIAUDIO--F5-French-MixedSpeakers-reduced`

- 德语模型(1.35G)：https://huggingface.co/hvoss-techfak/F5-TTS-German/tree/main
> 存放位置: `软件目录/models/models--hvoss-techfak--F5-TTS-German`

- 俄语模型(3.4G)：https://huggingface.co/hotstone228/F5-TTS-Russian/tree/main
> 存放位置: `软件目录/models/models--hotstone228--F5-TTS-Russian`

- 意大利语模型(1.35G)：https://huggingface.co/alien79/F5-TTS-italian/tree/main
> 存放位置: `软件目录/models/models--alien79--F5-TTS-italian`

- 西班牙语模型(5.4G)：https://huggingface.co/jpgallegoar/F5-Spanish/tree/main
> 存放位置: `软件目录/models/models--jpgallegoar--F5-Spanish`

- 印地语模型(2.5G)：https://huggingface.co/SPRINGLab/F5-Hindi-24KHz/tree/main
> 存放位置: `软件目录/models/models--SPRINGLab/F5-Hindi-24KHz`

- 阿拉伯语模型(2.6G)：https://huggingface.co/silma-ai/silma-tts/tree/main
> 存放位置: `软件目录/models/models--silma-ai--silma-tts`


----
----

## 说话人分离模型

### 内置模型: 
- 下载地址：https://modelscope.cn/models/himyworld/videotrans/tree/master/onnx 

在该地址页下载`3dspeaker_speech_eres2net_large_sv_zh-cn_3dspeaker_16k.onnx` 、`nemo_en_titanet_small.onnx`、`seg_model.onnx` 这3个文件
- 存放位置：`软件目录/models/onnx/将下载的3个文件放到此处`
### reverb:

-下载地址：https://huggingface.co/Revai/reverb-diarization-v1
- 存放位置: `软件目录/models/models--Revai--reverb-diarization-v1`
### pyannote
- 下载地址：https://huggingface.co/pyannote/speaker-diarization-3.1
- 存放位置: `软件目录/models/models--pyannote--speaker-diarization-3.1`

### Ali camp++: 
- 下载地址： https://modelscope.cn/models/iic/speech_campplus_speaker-diarization_common
- 存放位置：`软件目录/models/speech_campplus_speaker-diarization_common`

## 分离人声背景模型、降噪模型、标点恢复模型
下载地址：https://modelscope.cn/models/himyworld/videotrans/tree/master/onnx
存放位置：下载该页面所有 .onnx 文件后存放到 `软件目录/models/onnx/` 文件夹内


## 实时语音识别模型
- 下载地址: https://modelscope.cn/models/himyworld/videotrans/resolve/master/realtimestt.zip
- 存放位置: 下载后解压得到一个 onnx 文件夹，将其内所有文件复制到 `软件目录/models/onnx/`



---

## 15. 常见问题排查与故障恢复 (FAQ)

### 15.0 Qwen3-TTS 遇到报错 `CUDA error: device-side assert triggered`
这是启用了CUDA加速时遇到数据超出范围导致的，首先请确保 1.显存充足，2.参考音频时长在3-10s，3.若是`clone`音色，请确保最短语音持续时长大于等于3000ms。
如果排除以上问题后，仍报此错，请升级到 `v4.05-0709`版本


### Q: 升级 4.05/4.06版本后报错`Backend should be defined in the BACKENDS_MAPPING. Offending backend: tensorflow_text`
答：这可能是 transformers 版本升级覆盖导致的旧代码遗留问题，请尝试重新下载此刻的 补丁包再次覆盖试试

### Q: 升级软件如何保存配置文件？
答：配置文件在`软件目录/videotrans`文件夹内的几个json格式文件中，重点是这2个：`params.json/cfg.json`。完整包和补丁包是不含有这些文件的，第一次使用时自动生成，后续会根据你的设置更新，因此可以直接覆盖，会保留你的配置文件，当然你也可以复制这几个json文件到别处做备份

### Q: 能否同时启动多个 sp.exe 实例？

可以，但不建议，因多个实例共享同个`tmp`临时文件夹，并且任意一个实例关闭时，都会尝试清空该临时文件夹，可能导致其他在运行的实例报错。

如果确实需要，建议复制软件到其他文件夹内，然后再启动，例如一个在`D:/aivideo`下， 再复制一份到`D:/aivideo2`下，然后分别启动对应文件夹下的`sp.exe`，这样他们之间就互不影响



### 15.1 启动与客户端基础运行故障

#### Q: 提示 dll 文件丢失或未找到 sp.exe 客户端闪退
检查是否下载的 260MB 的补丁包，第一次使用必须下载 2.7GB 的完整包。 

#### Q: 本地部署的模型或小模型翻译结果中出现提示词或`<TRANSLATE_TEXT>`等xml标签？
本地部署的小模型（如 7B 级参数），其指令跟随能力较弱，容易输出无关文本，请根据使用的渠道，自行精简提示词，如果你使用的是 `兼容AI/本地模型`，对应提示词在`软件目录/videotrans/prompts/srt/localllm.txt`和`软件目录/videotrans/prompts/text/localllm.txt`中，前者是选中`发送完整字幕`时使用的，后者是未选中时使用的，打开txt，精简后修改，本地小模型可能难以理解和遵守复杂提示词，可让AI帮你精简，注意`{}`包裹的是变量，不要修改不要删除，软件会自动替换变量为真实数据

#### Q: 配音后时间轴、时间也被读了出来？
批量为srt字幕配音可接受2种形式的输入，一是没有时间轴的纯文本，二是符合 SRT字幕格式的SRT内容。前者纯文本会连续读出，不进行时间语速处理，二者若同时选中`配音加速/自动加速`会按照时间轴处理配音，达到对齐效果。但注意，如果你输入/导入的配音内容有时间轴，但不符合SRT字幕格式，时间轴也将会被读出。

标准srt格式字幕规范如下：
```
[行号]
[开始时间(2位小时:2位分钟:2位秒,3位毫秒)] --> [结束时间(2位小时:2位分钟:2位秒,3位毫秒)]
[字幕文本]
[空行]
[下一行行号]
[开始时间(2位小时:2位分钟:2位秒,3位毫秒)] --> [结束时间(2位小时:2位分钟:2位秒,3位毫秒)]
[字幕文本]
...
```

并且结束时间需要大于开始时间，下条字幕的开始时间大于或等于上一条字幕的结束时间，例如：
```
1
00:00:01,000 --> 00:00:03,000
文本内容

2
00:00:04,000 --> 00:00:06,000
文本内容
```

#### Q: 双击 `sp.exe` 后，软件无法打开，任务管理器没有反应，或者长时间黑屏？
1.  **加载正常延迟**：基于 PySide6 构建的客户端在首次初始化时需搜索并加载大量本地依赖库，根据硬件性能，启动需等待 **5 秒至 2 分钟**，切勿连续重复双击。
2.  **杀毒软件拦截阻断**：本软件利用 PyInstaller 进行离线绿色打包，未购买昂贵的商业数字签名，易遭腾讯管家、360、火绒或 Windows Defender 误报隔离阻断。请关闭杀毒软件或将软件根目录整体加入**信任白名单**。
3.  **解压路径异常**：检查软件是否被放置在含有**中文、空格、表情或特殊符号**的盘符路径中（例如 `D:\视频 软件\pyVideoTrans` 易引发加载失败），移至浅层全英文数字目录（如 `D:\pyVideoTrans`）即可。
4.  **禁止在压缩包内直接双击**：必须先利用解压软件将其完整释压到硬盘目录下，方可双击 `sp.exe`。

#### Q: 运行或启动时提示缺少 `python310.dll` 报错？
此问题代表您下载的仅仅是体积约为 260MB 的**更新升级补丁包**，而非全量主包。升级包内没有附带 Python 核心运行时。
*   *解决办法*：先去官网下载 `2.6GB+` 的 **完整绿色主程序压缩包**，全量解压后，再下载升级补丁覆盖进去。

#### Q: 软件支持 Windows 7 系统吗？
**完全不支持**。软件依赖的高版本 PyTorch、OnnxRuntime 以及 PySide6 等核心框架均已停止兼容 Windows 7。请使用 Windows 10 或 Windows 11。

#### Q: 处理完一两个长视频任务后，突然发现电脑 C 盘或软件所在盘硬盘空间被彻底占满？
这是由于开启了"视频慢速"或"分离人声背景声"等高强度重构功能产生的大量临时中间缓存碎片。
*   *解决办法*：通常客户端在安全关闭时会自动触发缓存回收。若遭遇中途报错中断导致临时文件未清理，可手动进入软件根目录下的 **`tmp/` 文件夹**，安全清空里面的所有临时切片。

#### Q: 如何快速清空我搞乱的所有 Key、配音和全局配置，让软件完全恢复刚下载的原始状态？
无需重新下载软件，只需进入软件根目录下的 `videotrans/` 文件夹，彻底删除以下四个持久化 JSON 配置文件：
*   `params.json`（存放用户输入的 API 密钥和偏好设置）
*   `cfg.json`（存放高级选项及系统设置）
*   `codec.json`（视频硬解码缓存）
*   `ass.json`（硬字幕样式缓存）
*   *删除后直接双击 sp.exe 即可无痛重建全套出厂配置。*

#### Q: cfg.json 文件损坏导致软件设置全部丢失怎么办？
如果 `cfg.json` 文件内容被意外损坏（如手动编辑出错、意外断电等），软件会在启动时检测到 `json.JSONDecodeError`，并**自动用默认值重写该文件**。这意味着所有用户自定义设置（包括模型列表、音频参数等）将全部丢失。日志文件中会记录此错误。建议定期备份 `videotrans/` 目录下的 JSON 配置文件。

#### Q: 如何清除翻译缓存？
翻译缓存存储在 `tmp/translate_cache/` 目录下，按 MD5 键值缓存。如果发现翻译结果异常（例如使用了错误的缓存），可手动删除该目录下的缓存文件。缓存没有过期时间，相同输入会一直使用缓存。

### 15.2 GPU 加速与 CUDA / 显存报错

#### Q: 已经安装了 CUDA 工具箱，但为什么在执行时控制台仍提示未启用 GPU 加速？
1.  **显卡硬件不兼容**：GPU 加速仅支持 NVIDIA 英伟达显卡（N卡）。AMD 或 Intel 的集成显卡、独立显卡均无法开启 CUDA 加速。
2.  **驱动版本过于老化**：CUDA 12.8 及以上版本对显卡驱动有底线要求，请前往英伟达官网将您的显卡驱动版本更新至最新版。
3.  **cuDNN 缺失**：CUDA 的深度神经网络库 cuDNN 9.x 必须安装，并将其对应的 `bin` 和 `lib` 目录完整追加配置进系统的 `Path` 环境变量。

#### Q: 在执行本地 ASR 或 TTS 时控制台疯狂报错：`Unable to allocate`、`CUDA out of memory`？
此问题代表您的显卡物理显存不足，无法承载当前运算模型。
*   *解决办法（依次调优）*：
    1.  **降低 AI 模型尺寸**：将 ASR 从大型的 `large-v3` 模型降格更换为中型的 `medium`、`small` 或基础 `base` 模型（`large-v3` 基础运行需要不低于 8GB 的闲置显存）。
    2.  **更改计算数据类型**：进入 `高级选项 -> 语音识别参数`，将 `计算数据类型` 强制由 `float32` 改为 `float16`（显卡最适合）或 `int8`（最省空间）。
    3.  **减小搜索深度**：将 `beam_size` 和 `best_of` 从默认的 `5` 调低设为 `1`。
    4.  **关闭上下文感知**：将高级选项中的 `启用上下文感知` 设为 `False`。
    5.  **防止多卡首选卡显存过小**：若系统有集成独显与独立显卡，软件默认使用索引为 0 的显卡。若此显卡极差则会爆显存。请升级软件版本至 v3.98-317 以上，其支持自适应检测并强制调用当前可用显存最大的高性能显卡。

#### Q: BrokenProcessPool 错误是怎么回事？
当本地 AI 推理模型（如 faster-whisper）在处理过程中因 CUDA 显存溢出或底层 C++ 崩溃时，子进程会发生硬崩溃（SegFault）。软件会捕获此错误并显示 `BrokenProcessPool`，错误信息中包含模型名称和 GPU 索引。此时需要：1. 降低模型尺寸或切换为 CPU 模式；2. 关闭 GPU 同时任务数设为 1；3. 重启软件以重建进程池。

#### Q: STT 超时（SttTimeoutError）是什么原因？
faster-whisper 在某些情况下可能在生成字幕后子进程挂起（静默崩溃）。软件会在检测到字幕文件已生成但超过 20 秒仍未返回结果时抛出 `SttTimeoutError`。此时字幕文件仍然可用，但需要重启软件以恢复进程池。常见原因：CUDA 兼容性问题、显存不足、模型损坏。

#### Q: 在执行翻译合成时，任务管理器里显示 GPU 使用率非常低甚至接近 0%，这正常吗？
**完全正常**。因为流水线在 ASR 阶段（第一阶段）会集中占用 GPU 进行语音解码神经网络计算，而后续的文字翻译、TTS 云接口请求、音画速度匹配主要耗费网络和 CPU 核心。仅有在最后的视频压制时可能产生短暂的显卡硬件编解码占用，因此显卡负载呈现波峰波谷变化是符合预期的。

### 15.3 翻译、配音与特定渠道报错

#### Q: index-tts 渠道启动配音时爆出：`Value: 'Same as the voice reference' is not in the list of choices` 类似报错？
此为 `index-tts` 开源库内部的多语言界面字符翻译不一致引发的校验 Bug。
*   *解决办法*：打开您本地部署的 index-tts 项目根目录下的 `webui.py` 文件，全局搜索字符串 `i18n("与音色参考音频相同")`，将其直接替换为英文：`Same as the voice reference`，保存后重启服务即可。

#### Q: 批量使用字幕配音时，即便导入了 SRT 或文本，仍不断弹窗警告 `Import SRT or Fill Text` 提示？
此为历史旧版本 Bug，请前往 pyVideoTrans 官网或 GitHub Release 页面，单独下载最新的 [sp.exe 主执行程序补丁](https://github.com/jianchang512/stt/releases/download/0.0/sp.exe)，直接覆盖替换主目录下同名文件即可解决。

#### Q: 在启动 Azure-TTS 渠道时，控制台提示：`Could not find module Microsoft.CognitiveServices.Speech.core.dll` 报错？
1.  如果您当前使用的是精简版补丁包，请重新下载并解压官方完整包。
2.  若已是完整包，说明您的 Windows 操作系统底层缺少必要的微软 C++ 运行库组件，导致底层 C 库加载失败。请下载并安装 [微软官方VC++全量运行时集合包](https://aka.ms/vs/17/release/vc_redist.x64.exe)，安装后重启电脑。

#### Q: 使用 Edge-TTS 渠道时，频繁发生 403 封禁报错、配音中断或大段生成静音无声片段？
因为 Edge-TTS 属于微软免费公开的并发接口，一旦在短时间内发起高频突发请求，您的外部公网 IP 就会被微软防火墙临时限流拦截。
*   *解决办法*：进入 `高级选项 -> 字幕配音调整`，将 **`EdgeTTS配音渠道配音并发数`（同时配音线程数）设为 1**，将 **`配音后暂停秒` 设置为 5 至 10 秒**，以低频率温和调用，即可彻底避免被封限流。
*   *EdgeTTS 代理问题*：EdgeTTS 在使用代理时可能遇到连接问题。如果遇到 "Please turn off the clear proxy and try again" 错误，可在软件根目录创建 `edgetts-noproxy.txt` 空文件来强制 EdgeTTS 绕过代理。EdgeTTS 在检测到代理错误时也会自动禁用代理并重试。

#### Q: 为什么在新版本的发音语言选择列表中，没有了原本的"自动检测（Auto）"选项？
为了防范多任务流水线的致命崩溃。
*   如果使用 ASR 自动检测，某些 ASR 模型遇到背景声时可能会返回杂乱的语言代码，或者直接不返回代码。然而，后续的字幕翻译大模型、TTS 配音克隆渠道对原语种和目标语种代码有严苛的入参要求。中途一旦获取不到明确的语种参数，整个流水线便会硬报错中断。
*   *解决办法*：在"翻译视频或音频"主功能中，**必须明确指定发音语言**。如果仅仅是想快速转录音频转字幕，请单独使用左侧面板中的"批量语音转字幕"面板，该面板保留了"自动检测"逻辑。

#### Q: 调用大模型（如 DeepSeek、GPT）翻译后，生成的 SRT 内出现了大段空白行，或是直接把 System Prompt 提示词当成翻译塞进了字幕里？
1.  **AI 大模型智能不足**：如果调用了参数规模极小的本地 LLM（如 7B 级小模型），极易发生"指令失控"问题。建议更换为 DeepSeek-V3 官方或 GPT-4o 等旗舰大模型。
2.  **大模型合并了字幕**：在默认状态下，翻译大模型可能会觉得将前后两个短句拼接翻译更连贯，于是自作聪明合并了段落并返回。这会导致 pyVideoTrans 在按照行号对齐翻译时发生指针严重移位，导致后续所有字幕对应关系全部错乱。
3.  *解决办法*：在高级选项中，**取消勾选"发送完整字幕"**，强制采用纯文本逐行提交翻译模式，并在高级选项中将翻译并发数 `trans_thread` 限制为 `1`。

#### Q: 翻译结果为空或全部为空白行怎么办？
翻译渠道返回了空结果。可能原因：
- 使用的 AI 模型不够智能，未按照提示词要求返回规定的格式
- AI模型重新组织合并了相邻的字幕：在原始视频中，说话人的一句长话经常被语音识别系统切成多段较短的字幕。翻译时，AI 会根据目标语言的语法习惯重新组织合并这些句子，合并到字幕后，2行字幕就变成了1行字幕加1个空白行。保留空行是为了**保护时间轴对齐；翻译后的字幕条数、时间节点与原始视频严格对应。如果手动删除空行，可能导致：双语字幕的原文与译文错位； 后续配音的时间轴混乱；无法进行精确的字幕微调。如果确实不需要空行，可以在翻译完成后手动删除。

#### Q: API 地址填写 0.0.0.0 报错怎么办？
软件会自动检测并提示 "API 地址不可是 0.0.0.0，请修改为 127.0.0.1"。请将所有本地服务的 API 地址中的 `0.0.0.0` 替换为 `127.0.0.1`。

#### Q: GPT-SoVITS 报错 `{"detail":"Not Found"}` 是什么原因？
通常有三种原因：
1.  启动了 `api.py` 但在软件中勾选了 `api_v2?`（或反之）——启动的 API 版本与勾选不一致。
2.  填写了 GPT-SoVITS 的 WebUI 地址（7860端口），而非 API 地址（9880端口）。
3.  GPT-SoVITS 服务未启动。

#### Q: 如何输出无损视频？
视频处理中只要涉及重新编码，就必然损失画质，默认生成的视频是有损的，质量可通过 `高级选项--视频输出--视频输出质量、控制输出视频压缩率`进行适当调节。

**当符合以下条件时，将自动进行无损输出**：
- 原始输入视频编码是 `mp4/h.264/yuv420p`（若不符合，则自动重新编码）
- 高级选项中`264/265编码`选择的是`264`（若选265将重新编码）
- 未启用`视频慢速`（若启用则变速处理必然重新编码损失画质）
- 未嵌入`硬字幕`或`硬字幕(双)`（硬字幕需重新编码）

符合以上条件，将不进行任何视频重编码操作，因此可以无损输出。但注意可能出现的问题，若配音后时长大于视频原时长，配音超出部分将强制截断，丢失末尾一些声音，要避免，请选中 音频加速 或 增大语速。

### 15.4 音视频与 FFmpeg 报错

#### Q: 为什么最终翻译合成出来的视频，文件体积超级大，甚至是原视频的数倍？
1.  **视频慢速导致定格帧膨胀**：如果勾选了"视频慢速"功能，FFmpeg 会将视频切片并大幅度降低播放速率。由于降低重编码编码损失，画面被强行重构拉伸，体积会指数级暴增。若非绝对必要，建议关闭"视频自动慢速"，仅通过"音频加速"来适应时长。
2.  **码率/质量控制不当**：进入 `高级选项 -> 视频输出控制`，将 `视频输出质量控制`（CRF）从默认的 23 适当调大到 **25~30** 之间。数值越大体积越小，但画面会产生细微噪点。
3.  **更换 H.265 编码**：在高级选项同个面板中，将视频编码从 264 更改为 **265**（HEVC），可在相同清晰度下直接精简 30%~50% 的物理体积。

#### Q: 执行任务时客户端弹窗报错，提示信息中包含 `ffprobe exec error` 或 `ffmpeg` 相关异常？
这通常是因为**总文件路径过长**或**文件名中夹杂特殊异常符号**。
1.  Windows 命令行（CMD）有 260 个字符的物理路径最大长度限制。如果原视频本身从 YouTube 下载，标题极长且存放在很深的子目录中，命令拼接后便会超出长度限制而崩溃。请将视频移动至浅层盘符根目录（如 `D:/`），并重命名为极简的字母数字。
2.  视频文件名中如果夹杂 `?`、`*`、表情符号、不规则符号等，在传递给 FFmpeg 终端执行时极易产生解析崩塌。请彻底过滤删减文件名中的所有特殊符号。

#### Q: 软件导入视频后，提示检测到视频"不含音轨"或转录结果返回为空？
1.  **视频本身无声音轨**：从一些特殊网站在线下载的视频，画面与声音流是物理分离下载的。若在合并时出错会导致视频中没有 Audio 轨道，可尝试用播放器本地播放确认是否有声音。
2.  **音量过低或环境背景噪音过大**：人声完全被噪音淹没，ASR 引擎由于 VAD 切割过滤，可能判定该段音频无人类语音输入。
3.  **视频编码格式不支持**：某些特殊编码格式（如 AV1）可能导致 FFmpeg 无法正确提取音频流。可尝试先用其他工具将视频转换为标准的 H.264/MP4 格式再导入。

#### Q: 硬件编码器（NVENC/QSV/AMF等）报错怎么办？
软件支持多种硬件编码器：NVENC（NVIDIA）、VideoToolbox（Mac）、QSV（Intel）、AMF（AMD）、VAAPI（Linux）。如果硬件编码失败，软件会**自动回退到软件编码**（libx264/libx265）。如果回退后仍报错，可进入高级选项勾选 `强制软编码视频？` 直接使用软件编码。

### 15.5 其他常见问题

#### Q: 为什么在 webui 网页里克隆出来的效果很好，但在软件里`clone`配音角色时出来的效果很差？
1. 在 webui 里你需要自己提供参考音频，可以提供时长合适、背景清晰、发音准确的参考音频，但 `clone` 模式下会根据字幕时长从原始视频里动态裁切，裁切后的音频片段作为参考音频，这个片段可能时长不合适、有背景噪声、或开头结尾强行中断一句话、或中间有停顿反复等，也就是参考音频质量不可控

#### Q: 是否提供上下文下载，用于提供给AI进行问答训练，例如 llms.txt等？
1.  有整理好的上下文内容llms.txt，访问该网址另存为txt，将内容提供给你的AI即可，[llms.txt](https://pyvideotrans.com/llms.txt)

#### Q: 遇到此类报错`max_workders must be greater then 0`
1. 这是内部bug，请更新到 {$version} 或更新版本

#### Q: 代理设置相关问题
*   **国内访问国内 API 不需要代理**：百度翻译、腾讯翻译、阿里翻译、DeepSeek、智谱AI、字节火山等国内 API 默认不走代理。软件内置了免代理域名列表（`no_proxy`），自动绕过代理。
*   **本地服务不需要代理**：GPT-SoVITS（127.0.0.1:9880）、ChatTTS（127.0.0.1:9966）、F5-TTS（127.0.0.1:7860）等本地服务自动绕过代理。
*   **代理格式**：正确格式为 `http://127.0.0.1:端口号` 或 `socks5://127.0.0.1:端口号`。
*   **关闭代理**：如果不需要代理，请将代理文本框清空并保存。填写了无效代理地址会导致所有网络请求失败。

#### Q: 翻译缓存导致结果异常怎么办？
翻译结果会被缓存到 `tmp/translate_cache/` 目录下，使用 MD5 键值索引。缓存没有过期时间。如果修改了提示词或翻译渠道后发现结果没有变化，可能是缓存导致的。解决方法：删除 `tmp/translate_cache/` 目录下的缓存文件，或勾选主界面的 `清理已生成` 选项。

#### Q: 软件启动后界面语言显示异常怎么办？
修改界面语言后需要**重启软件**才能生效。语言翻译文件位于 `videotrans/language/` 目录下（zh.json、en.json 等）。

#### Q: 任务失败后如何查看详细错误日志？
*   日志文件位于 `logs/` 目录下，按日期命名（如 `20250622.log`）。
*   控制台日志级别为 WARNING，文件日志级别为 DEBUG，文件日志包含更详细的信息。
*   在 GUI 中可点击 "查看错误报告" 按钮查看详细堆栈信息。

#### Q: 你们的盈利模式是什么样的？
答：这是个人开发者基于兴趣创建的开源项目，无盈利目标和商业模式。为尽量延长项目生命周期，有以下几种收益方式用于支付`文档服务器费用/问答站点AI大模型调用费用/开发时在线渠道的API调用费`等。 
- 文档站的少量 Google 广告
- 用户通过 `微信/支付宝二维码/Ko-fi` 的无偿打赏
- 技术群用户的月度捐赠
- GitHub 上用户的打赏

### 15.6 支持的模型与格式参考

**FASTER_MODELS_DICT（faster-whisper模型列表）：**
```python
FASTER_MODELS_DICT= {
    "tiny.en": "Systran/faster-whisper-tiny.en",
    "tiny": "Systran/faster-whisper-tiny",
    "base.en": "Systran/faster-whisper-base.en",
    "base": "Systran/faster-whisper-base",
    "small.en": "Systran/faster-whisper-small.en",
    "small": "Systran/faster-whisper-small",
    "medium.en": "Systran/faster-whisper-medium.en",
    "medium": "Systran/faster-whisper-medium",
    "large-v1": "Systran/faster-whisper-large-v1",
    "large-v2": "Systran/faster-whisper-large-v2",
    "large-v3": "Systran/faster-whisper-large-v3",
    "large": "Systran/faster-whisper-large-v3",
    "distil-large-v2": "Systran/faster-distil-whisper-large-v2",
    "distil-medium.en": "Systran/faster-distil-whisper-medium.en",
    "distil-small.en": "Systran/faster-distil-whisper-small.en",
    "distil-large-v3": "Systran/faster-distil-whisper-large-v3",
    "distil-large-v3.5": "distil-whisper/distil-large-v3.5-ct2",
    "large-v3-turbo": "mobiuslabsgmbh/faster-whisper-large-v3-turbo",
    "turbo": "mobiuslabsgmbh/faster-whisper-large-v3-turbo",
}
```

**其他模型及配置列表：**
```python
# funasr模型
FUNASR_MODEL = ['Fun-ASR-Nano-2512', 'Fun-ASR-MLT-Nano-2512', 'paraformer-zh', 'SenseVoiceSmall']

# deepgram 支持的语音识别模型
DEEPGRAM_MODEL = [
    "nova-3", "whisper-large", "whisper-medium", "whisper-small",
    "whisper-base", "whisper-tiny", "nova-2", "enhanced", "base",
]

# 支持的视频格式
VIDEO_EXTS = ["mp4", "mkv", "mpeg", "avi", "mov", "mts", "webm", "ogg", "ts", "flv","wmv"]

# 支持的音频格式
AUDIO_EXITS = ["mp3", "wav", "aac", "flac", "m4a","ogg","wma"]

# ChatTTS音色值
ChatTTS_VOICE="11,12,16,2222,4444,6653,7869,9999,5,13,14,1111,3333,4099,5099,5555,8888,6666,7777"

# openai-tts音色
OPENAITTS_ROLES = "alloy,ash,ballad,coral,echo,fable,onyx,nova,sage,shimmer,verse"

# x.ai TTS音色
XAITTS_ROLES='eve,ara,rex,sal,leo'

# Xiaomi TTS音色
MITTS_ROLES='mimo_default,default_zh,冰糖,茉莉,苏打,白桦,Mia,Milo,Dean,Chloe,default_en'

# 缺省 gemini 模型
DEFAULT_GEMINI_MODEL = "gemini-3.5-flash,gemini-pro-latest,gemini-flash-latest,gemini-2.5-pro,gemini-2.5-flash,gemini-2.0-flash"

# gemini-tts 音色
GEMINITTS_ROLES = "Zephyr,Puck,Charon,Kore,Fenrir,Leda,Orus,Aoede,Callirrhoe,Autonoe,Enceladus,Iapetus,Umbriel,Algieba,Despina,Erinome,Algenib,Rasalgethi,Laomedeia,Achernar,Alnilam,Schedar,Gacrux,Pulcherrima,Achird,Zubenelgenubi,Vindemiatrix,Sadachbia,Sadaltager,Sulafat"

# gemini-tts 模型
GEMINI_TTS_MODELS="gemini-3.1-flash-tts-preview,gemini-2.5-flash-preview-tts,gemini-2.5-pro-preview-tts"

# whisper.cpp模型
Whisper_cpp_models="ggml-tiny.bin,ggml-base.bin,ggml-small.bin,ggml-medium.bin,ggml-large-v1.bin,ggml-large-v2.bin,ggml-large-v3.bin,ggml-large-v3-turbo.bin"
Whisper_net_models=Whisper_cpp_models

# QwenMT模型
Qwenmt_Model="qwen3.6-plus,qwen3.6-flash,qwen3-max,qwen-mt-turbo,qwen-mt-plus,qwen-mt-flash,qwen-mt-lite,qwen3-asr-flash,qwen3-asr-flash-filetrans"

# QwenTTS模型
Qwentts_Models='qwen3-tts-vd-2026-01-26,qwen3-tts-instruct-flash,qwen3-tts-flash'

# OpenAI TTS模型
Qpenaitts_Model="tts-1,tts-1-hd,gpt-4o-mini-tts"

# OpenAI语音识别API模型
Openairecognapi_Model= "whisper-1,gpt-4o-transcribe,gpt-4o-mini-transcribe,gpt-4o-transcribe-diarize"

# ChatGPT模型
Chatgpt_Model="gpt-5.5,gpt-5.5-pro,gpt-5.4-pro,gpt-5.4,gpt-5.4-mini,gpt-5,gpt-5-mini,gpt-4.1"

# Azure模型
Azure_Model="gpt-5.5,gpt-5.4-mini, gpt-5.4-nano, gpt-5.4, gpt-5.4-pro,gpt-5.1, gpt-5.1-chat"

# 本地大模型兼容模型
Localllm_Model="qwen3.6,deepseek-v4-flash:cloud"

# 智谱AI模型
Zhipuai_Model= "glm-5.1,glm-5, glm-4.7, glm-4.7-flash, glm-4.7-flashx, glm-4.6, glm-4.5-air, glm-4.5-airx, glm-4.5-flash"

# DeepSeek模型
Deepseek_Model="deepseek-v4-pro,deepseek-v4-flash"

# OpenRouter模型
Openrouter_Model="minimax/minimax-m2.7,z-ai/glm-5,qwen/qwen3-max-thinking,moonshotai/kimi-k2.5,google/gemini-3-flash-preview"

# 硅基流动模型
Guiji_Model="Pro/zai-org/GLM-5.1,Pro/zai-org/GLM-5,Pro/moonshotai/Kimi-K2.6,Qwen/Qwen3.6-35B-A3B,MiniMaxAI/MiniMax-M2.5"

# 302.AI模型
Ai302_Models="deepseek-v4-pro,deepseek-v4-flash"

# 字节火山模型
Zijiehuoshan_Model="doubao-seed-2-0-pro-260215,doubao-seed-2-0-lite-260215,doubao-seed-2-0-mini-260215"

# Whisper模型
Whisper_Models="tiny,tiny.en,base,base.en,small,small.en,medium,medium.en,large-v3-turbo,large-v1,large-v2,large-v3,distil-large-v3,distil-large-v3.5"

# OpenAI Whisper模型
Openai_Whisper_Models="tiny,tiny.en,base,base.en,small,small.en,medium,medium.en,large-v3-turbo,large-v1,large-v2,large-v3"

# Minimax模型
MINIMAX_MODELS="MiniMax-M3,MiniMax-M2.7,MiniMax-M2.7-highspeed"

# Minimax TTS模型
MINIMAX_TTS_MODELS="speech-2.8-hd,speech-2.8-turbo,speech-2.6-hd,speech-2.6-turbo,speech-02-hd,speech-02-turbo"

# ElevenLabs TTS模型
ELEVENLABS_TTS_MODELS="eleven_v3,eleven_flash_v2_5,eleven_flash_v2,eleven_multilingual_v2,eleven_multilingual_v1"

# Xiaomi模型
XIAOMI_MODELS='mimo-v2.5-pro,mimo-v2.5,mimo-v2-pro,mimo-v2-omni'

# Xiaomi TTS模型
XIAOMI_TTS_MODELS='mimo-v2.5-tts,mimo-v2-tts'

# Rubberband安装提示
INSTALL_RUBBERBAND_TIPS="""Windows: For Windows systems, please download the file, extract it, and place it in the ffmpeg folder in the current directory. Use a better audio acceleration algorithm\nhttps://breakfastquay.com/files/releases/rubberband-4.0.0-gpl-executable-windows.zip
Darwin: `brew install rubberband`  and  `uv add pyrubberband` Use a better audio acceleration algorithm
Linux: `sudo apt install rubberband-cli libsndfile1-dev` and  `uv add pyrubberband`  Use a better audio acceleration algorithm"""
```

---

## 16. 错误类型与错误消息对照表

软件内部定义了完整的异常体系，帮助定位问题根源。以下是用户可能遇到的主要错误类型及其含义：

### 16.1 异常类层级
```
VideoTransError (基类)
  ├── TranslateSrtError     (视频翻译任务失败)
  ├── DubbingSrtError       (TTS/配音失败)
  ├── SpeechToTextError     (ASR/语音识别失败)
  ├── LLMSegmentError       (LLM重新断句失败)
  ├── FFmpegError           (FFmpeg操作失败)
  ├── DownloadModelsError   (模型下载失败)
  ├── SttTimeoutError       (STT子进程超时)
  ├── StopTask              (任务立即终止，不可恢复)
  └── StopRetry             (停止重试，不可重试)
```

### 16.2 用户常见错误消息与解决方案

| 错误消息 | 可能原因 | 解决方案 |
|:---|:---|:---|
| "API密钥错误" | API密钥不正确或已过期 | 检查密钥是否正确，余额是否充足 |
| "当前密钥没有访问权限" | API密钥缺少相应权限 | 检查API密钥权限设置 |
| "内容太长超出最大允许Token" | 字幕批量过大，超出模型上下文窗口 | 降低每批字幕行数，或增大max_token值 |
| "内容触发AI风控被过滤" | 翻译内容被AI安全系统过滤 | 手动编辑字幕，移除敏感内容 |
| "请求地址格式不正确" | API URL格式错误 | 检查API地址格式（必须是完整URL） |
| "代理设置不正确或代理不可用" | 代理配置错误或代理服务器不可用 | 检查代理设置，或清空代理文本框 |
| "安全连接失败" | SSL证书验证失败或系统时间不正确 | 检查系统时间，关闭代理后重试 |
| "域名解析失败" | DNS解析失败，无法找到服务器 | 检查网络连接，确认域名正确 |
| "连接被拒绝，请确保本地服务已启动" | 本地TTS/ASR服务未运行 | 启动对应的本地服务 |
| "API 地址不可是 0.0.0.0" | 使用了0.0.0.0作为API地址 | 改为 127.0.0.1 |
| "All error for edge-tts" | EdgeTTS完全失败 | 检查网络、限流、代理设置 |
| "This channel needs deployed and started before available" | Gradio/Clone服务未启动 | 启动对应的本地服务 |
| "No reference audio exists and cannot use clone function" | 克隆模式但没有参考音频 | 提供参考音频文件 |
| "No speech was detected" | 音频没有语音或语言选择错误 | 检查音频内容和语言设置 |
| "Whisper.NET setup invalid" | Whisper.net DLL文件缺失 | 安装Whisper.net依赖（uv sync --extra dotnet） |
| "Model not found: ..." | 模型文件缺失 | 下载模型到models/目录 |
| "Insufficient balance" | API账户余额不足 | 为API账户充值 |
| "No valid subtitle file exists" | 翻译后目标SRT文件缺失 | 检查翻译是否成功完成 |
| "连接被重置，网络可能不稳定" | 网络连接不稳定 | 检查网络连接 |
| "连接超时" | 网络请求超时 | 检查网络连接是否稳定 |
| "多次重试连接失败" | 服务暂时不可用 | 稍后重试 |
| "EdgeTTS使用频繁可能触发限流" | EdgeTTS请求频率过高 | 降低并发数，增加暂停秒数 |
| "微软翻译使用频繁可能触发限流" | 微软翻译请求频率过高 | 增加翻译后暂停秒数 |
| "注意：某些国外服务需要科学上网才能访问" | 从国内访问国外API | 配置代理或使用VPN |
| "字幕长度为0，无法继续配音" | 翻译后的字幕文件为空 | 检查翻译结果 |
| "程序内部错误" | 应用代码Bug | 提供完整日志报告 |

### 16.3 不可重试的异常类型
以下异常类型在重试机制中会被直接跳过（不进行重试）：
*   `ConnectionError` / `ProxyError` / `SSLError`
*   `MissingSchema` / `InvalidSchema` / `InvalidURL`
*   所有 `httpx` 异常：`ProxyError`, `ConnectError`, `InvalidURL`, `LocalProtocolError`, `ProtocolError`, `TooManyRedirects`, `UnsupportedProtocol`
*   `StopRetry` / `StopTask`

---

## 17. 主要核心代码片段

```python
@dataclass
class BaseCon:
    # 每个任务唯一的uuid
    uuid: Optional[str] = field(default=None, init=False)
    # 用于其他需要直接代理字符串
    proxy_str: str = ''
    last_down_time:int=0

    def __post_init__(self):
        # 获取代理
        self.proxy_str = self._set_proxy(type='set')

    def _exit(self) -> bool:
        if app_cfg.exit_soft or (self.uuid and self.uuid in app_cfg.stoped_uuid_set):
            return True
        return False

    # 所有窗口和任务信息通过队列交互
    def signal(self, **kwargs):
        # ...

    def _process_callback(self, data):
        # ...

    # 设置、获取代理
    def _set_proxy(self, type='set'):
        # ...

    def _signal_of_process(self, logs_file,status_dict=None):
        # ...

    # 使用新进程执行任务
    def _new_process(self, callback=None, title="", is_cuda=False, kwargs=None):
        _st = time.time()
        kwargs = kwargs or {}
        self.signal(text=f'[{title}] starting...')
        logger.debug(f'[新进程任务 开始:{title}]')

        # 提交任务，并显式传入参数，确保子进程拿到正确的参数
        logs_file = kwargs.get('logs_file',f'{TEMP_ROOT}/{_st}.log')
        device_index = 0
        status_dict={"is_end":False}
        try:
            Path(logs_file).touch()
            threading.Thread(target=self._signal_of_process, args=(logs_file,status_dict), daemon=True).start()
            # 再次判断cuda是否有效，防止预先获取失败
            if is_cuda:
                import torch
                if not torch.cuda.is_available():
                    is_cuda = False

            # 如果使用gpu，则获取可用 device_index
            if is_cuda:
                # 启用了多显卡模式
                if settings.get('multi_gpus'):
                    device_index = get_cudaX()
                if device_index == -1:
                    is_cuda = False
                    kwargs['is_cuda'] = False
                    logger.error(f'已启用CUDA但未检测到可用显卡，强制使用CPU')
                kwargs['device_index'] = max(device_index, 0)
            logger.debug(f'任务参数:{kwargs=}')
            future = GlobalProcessManager.submit_task_cpu(
                callback,
                **kwargs
            ) if not is_cuda else GlobalProcessManager.submit_task_gpu(
                callback,
                **kwargs
            )
            # return Tuple[bool or result , None or error]
            _timeout=0
            while not future.done():
                if app_cfg.exit_soft:
                    return None
                # faster-whisper 在工作完成后退出时，偶发可能静默崩溃，主进程无法捕获，导致永久等待
                # 在退出前预先将识别结果保存到 subtitle_srt 文件中，再返回，此处通过检测文件存在确保崩溃后仍能继续运行
                if kwargs.get('subtitle_srt') and Path(kwargs.get('subtitle_srt')).exists():
                    # 已返回10s仍在循环，子进程可能已崩溃
                    if _timeout>20:
                        status_dict['is_end']=True
                        logger.debug(f'faster已生成识别字幕超过 {_timeout}s 仍在循环，子进程可能已崩溃，强制抛出 SttTimeoutError')
                        raise SttTimeoutError("STT timeout")
                    _timeout+=1
                time.sleep(1)
            data,err = future.result(timeout=10)
            logger.debug(f'[新进程任务 {title}], return')
            status_dict['is_end']=True
            if err or not data:
                raise VideoTransError(err)
            self.signal(text=f'[{title}] end: {int(time.time() - _st)}s')
            return data
        except SttTimeoutError:
            raise
        except BrokenProcessPool as e:
            _model = ''
            _cuda = ''
            if kwargs.get('model_name'):
                _model = ' Model:' + kwargs.get('model_name')
            if is_cuda and device_index > -1:
                _cuda = f" GPU{device_index}"


@dataclass
class BaseTask(BaseCon):
    # 各项配置信息，例如  翻译、配音、识别渠道等
    cfg: TaskCfgBase = field(default_factory=TaskCfgBase, repr=False)
    # 进度记录
    precent: int = 1
    # 需要配音的原始字幕信息 List[dict]
    queue_tts: List = field(default_factory=list, repr=False)
    # 是否已结束
    hasend: bool = False
    # 是否需要语音识别
    should_recogn: bool = False
    # 是否需要字幕翻译
    should_trans: bool = False
    # 是否需要配音
    should_dubbing: bool = False
    # 是否需要人声分离
    should_separate: bool = False
    # 是否需要嵌入配音或字幕
    should_hebing: bool = False

    def __post_init__(self):
        super().__post_init__()
        if self.cfg.uuid:
            self.uuid = self.cfg.uuid

    # 预先处理，例如从视频中拆分音频、人声背景分离、转码等
    def prepare(self):
        pass

    # 语音识别创建原始语言字幕
    def recogn(self):
        pass

    # 说话人识别
    def diariz(self):
        pass

    # 将原始语言字幕翻译到目标语言字幕
    def trans(self):
        pass

    # 根据 queue_tts 进行配音
    def dubbing(self):
        pass

    # 配音加速、视频慢速对齐
    def align(self):
        pass

    # 视频、音频、字幕合并生成结果文件
    def assembling(self):
        pass

    # 删除临时文件，移动或复制，发送成功消息
    def task_done(self):
        pass

"""
仅配音任务：对应 批量为字幕配音 面板
"""
@dataclass
class DubbingSrt(BaseTask):
    pass

"""
仅语音识别
"""
@dataclass
class SpeechToText(BaseTask):
    pass

"""
批量翻译srt字幕面板
"""
@dataclass
class TranslateSrt(BaseTask):
    pass

@dataclass
class BaseTTS(BaseCon):
    pass

@dataclass
class BaseRecogn(BaseCon):
    pass

@dataclass
class BaseTrans(BaseCon):
    pass


class BaseWorker(QThread):
    """
    工作线程基类：统一处理 while 1 循环、队列读取、软退出判断以及异常捕获和上报逻辑。
    """

    def __init__(self, name: str, queue):
        super().__init__()
        self.name = name
        self.queue = queue

    def run(self) -> None:
        while True:
            if app_cfg.exit_soft: return
            try:
                trk = self.queue.get(timeout=1)
            except Empty:
                continue
            if trk.uuid in app_cfg.stoped_uuid_set:
                logger.debug(f'[job] {trk.uuid=}已停止，跳过阶段 {self.name} {trk.cfg=}')
                continue
            try:
                # 执行具体的业务逻辑和队列路由
                self.process_task(trk)
            except Exception as e:
                self.handle_error(e, trk)

    def process_task(self, trk):
        raise NotImplementedError

    def handle_error(self, e, trk):
        """统一的错误处理逻辑"""
        logger.exception(e, exc_info=True)
        # 简单的错误消息
        except_msg = get_msg_from_except(e)
        # 错误堆栈
        detail_back = "\n".join(traceback.format_exception(e)).strip()
        if not except_msg:
            except_msg = detail_back.split("\n")[-1]

        # 获取子类可能自定义的错误前缀 (如识别引擎名称、动作名称)
        prefix = self.get_error_prefix(trk)
        if prefix:
            except_msg = f"{prefix} {except_msg}"
        if trk.uuid not in app_cfg.stoped_uuid_set:
            trk.signal(text=f'{except_msg}\n{detail_back}\n{trk.cfg}', type='error', uuid=trk.uuid)
            send_notification(f'Error:{e}', f'{trk.cfg.basename}')
        trk.set_end()
        self.cleanup_on_error(trk)

    def get_error_prefix(self, trk) -> str:
        return ""

    def cleanup_on_error(self, trk):
        pass


class WorkerPrepare(BaseWorker):
    def __init__(self):
        super().__init__("PrepareVideo", app_cfg.prepare_queue)

    def get_error_prefix(self, trk):
        return tr("yuchulichucuo")

    def process_task(self, trk):
        trk.prepare()
        if trk.should_recogn:
            app_cfg.regcon_queue.put_nowait(trk)
        elif trk.should_trans:
            app_cfg.trans_queue.put_nowait(trk)
        elif trk.should_dubbing:
            app_cfg.dubb_queue.put_nowait(trk)
        elif trk.should_hebing:
            app_cfg.assemb_queue.put_nowait(trk)
        else:
            app_cfg.taskdone_queue.put_nowait(trk)


class WorkerRegcon(BaseWorker):
    def __init__(self):
        super().__init__("SpeechToText", app_cfg.regcon_queue)

    def get_error_prefix(self, trk):
        if trk.cfg.recogn_type is not None:
            return f"{tr('shibiechucuo')}[{get_recogn_type(trk.cfg.recogn_type)}]"
        return tr('shibiechucuo')

    def process_task(self, trk):
        trk.recogn()
        app_cfg.diariz_queue.put_nowait(trk)


class WorkerDiariz(BaseWorker):
    def __init__(self):
        super().__init__("DiarizSpeaker", app_cfg.diariz_queue)

    def process_task(self, trk):
        try:
            # 注意：原代码中 diariz 报错并不阻断流程，而是继续往下走，所以在这里内部 catch
            trk.diariz()
        except Exception as e:
            logger.exception(e, exc_info=True)

        if trk.should_trans:
            app_cfg.trans_queue.put_nowait(trk)
        elif trk.should_dubbing:
            app_cfg.dubb_queue.put_nowait(trk)
        elif trk.should_hebing:
            app_cfg.assemb_queue.put_nowait(trk)
        else:
            app_cfg.taskdone_queue.put_nowait(trk)


class WorkerTrans(BaseWorker):
    def __init__(self):
        super().__init__("TranslationSRT", app_cfg.trans_queue)

    def get_error_prefix(self, trk):
        if trk.cfg.translate_type is not None:
            return f"{tr('fanyichucuo')} [{get_tanslate_type(trk.cfg.translate_type)}]"
        return tr("fanyichucuo")

    def process_task(self, trk):
        trk.trans()
        if trk.should_dubbing:
            app_cfg.dubb_queue.put_nowait(trk)
        elif trk.should_hebing:
            app_cfg.assemb_queue.put_nowait(trk)
        else:
            app_cfg.taskdone_queue.put_nowait(trk)


class WorkerDubb(BaseWorker):
    def __init__(self):
        super().__init__("DubbingSrt", app_cfg.dubb_queue)

    def get_error_prefix(self, trk):
        if trk.cfg.tts_type is not None:
            return f"{tr('peiyinchucuo')} [{get_tts_type(trk.cfg.tts_type)}]"
        return tr("peiyinchucuo")

    def process_task(self, trk):
        trk.dubbing()
        app_cfg.align_queue.put_nowait(trk)


class WorkerAlign(BaseWorker):
    def __init__(self):
        super().__init__("AlignVieoAudioSrt", app_cfg.align_queue)

    def process_task(self, trk):
        trk.align()
        if hasattr(trk, 'recogn2pass'):
            app_cfg.regcon2_queue.put_nowait(trk)
        elif trk.should_hebing:
            app_cfg.assemb_queue.put_nowait(trk)
        else:
            app_cfg.taskdone_queue.put_nowait(trk)


class WorkerRegcon2Pass(BaseWorker):
    def __init__(self):
        super().__init__("SpeechToText2", app_cfg.regcon2_queue)

    def get_error_prefix(self, trk):
        return tr("Secondary speech recognition of dubbing files")

    def process_task(self, trk):
        trk.recogn2pass()
        if trk.should_hebing:
            app_cfg.assemb_queue.put_nowait(trk)
        else:
            app_cfg.taskdone_queue.put_nowait(trk)


class WorkerAssemb(BaseWorker):
    def __init__(self):
        super().__init__("AssembVideoAudioSrt", app_cfg.assemb_queue)

    def get_error_prefix(self, trk):
        return tr("hebingchucuo")

    def process_task(self, trk):
        trk.assembling()
        app_cfg.taskdone_queue.put_nowait(trk)


class WorkerTaskDone(BaseWorker):
    def __init__(self):
        super().__init__("TaskDone", app_cfg.taskdone_queue)

    def process_task(self, trk):
        trk.task_done()

def start_thread():
    gpus.getset_gpu()
    task_nums = 1
    # 存在可用显卡时，进一步判断应该启动几个相关线程
    if app_cfg.NVIDIA_GPU_NUMS > 0:
        try:
            process_max_gpu = int(float(settings.get('process_max_gpu', 0)))
        except (TypeError,ValueError):
            process_max_gpu = 1
        # 如果手动设置了gpu进程数量
        if process_max_gpu > 0:
            task_nums = process_max_gpu
        elif app_cfg.NVIDIA_GPU_NUMS > 1 and bool(settings.get('multi_gpus')):
            # 显卡数量真的大于1 并且 启用了多显卡，
            task_nums = 2 if app_cfg.NVIDIA_GPU_NUMS < 4 else 4
        logger.debug(f'{process_max_gpu=},is_multi_gpus={settings.get("multi_gpus")}')
    logger.debug(f'Concurrent {task_nums=}, process_max_cpu={settings.get("process_max")}')
    worker_config = {
        WorkerPrepare: task_nums,  # 准备工作
        WorkerRegcon: task_nums,  # 语音识别
        WorkerDiariz: task_nums,
        WorkerTrans: 1,
        WorkerDubb: 1,
        WorkerRegcon2Pass: 1,
        WorkerAlign: 1,
        WorkerAssemb: task_nums,
        WorkerTaskDone: 1,
    }

    workers = []

    for worker_cls, count in worker_config.items():
        for i in range(count):
            worker = worker_cls()
            if count > 1:
                worker.name = f"{worker.name}-{i + 1}"
            worker.start()
            workers.append(worker)
    logger.debug(f"start {len(workers)} jobs")
    return workers

# 单视频翻译模式
class Worker(QThread):
    uito = Signal(str, SignMsg)

    def __init__(self, *,
                 parent: Optional[QObject] = None,
                 file: InputFile = None,
                 cfg: Optional[Dict[str, Any]] = None):
        super().__init__(parent=parent)
        self.cfg = cfg
        # 存放处理好的 视频路径等信息
        self.file = file
        self.uuid = None

    def run(self) -> None:

        # 从停止队列中移出，以便重新开始
        app_cfg.rm_uuid(self.file['uuid'])
        logger.debug(f'[单视频翻译模式]:{self.file.name}')
        trk=None
        try:
            self.uuid = self.file['uuid']
            trk = TransCreate(cfg=TaskCfgVTT(**self.cfg | self.file))
            # 原始语言字幕文件
            app_cfg.onlyone_source_sub = trk.cfg.source_sub
            # 目标语言字幕文件
            app_cfg.onlyone_target_sub = trk.cfg.target_sub
            if self._exit(): return
            app_cfg.set_countdown(0)
            trk.prepare()
            if self._exit(): return
            trk.recogn()
            if self._exit(): return
            trk.diariz()
            if self._exit(): return
            self._post(text=Path(trk.cfg.source_sub).read_text(encoding='utf-8'), type='replace_subtitle')

            if float(settings.get('countdown_sec', 0)) > 0:
                app_cfg.set_countdown(86400)
                # 等待修改识别出的字幕
                self._post(text=trk.cfg.source_sub, type='edit_subtitle_source')
                self._post(tr('The subtitle editing interface is rendering'))
                while app_cfg.task_countdown > 0:
                    time.sleep(1)
                    app_cfg.set_countdown(app_cfg.task_countdown - 1)
                    if self._exit(): return

            if trk.should_trans:
                app_cfg.onlyone_trans = True
                if vail_file(trk.cfg.target_sub):
                    self._post(text="已存在翻译文件，跳过")
                else:
                    trk.trans()

            if self._exit(): return

            # 需要配音时
            if trk.should_dubbing:

                self._post(text=Path(trk.cfg.target_sub).read_text(encoding='utf-8'), type='replace_subtitle')
                if float(settings.get('countdown_sec', 0)) > 0:
                    app_cfg.set_countdown(86400)
                    # 传递过去临时目录，用于获取 speaker.json，等待修改待配音的字幕
                    self._post(text=f'{trk.cfg.cache_folder}<|>{trk.cfg.target_language_code}<|>{trk.cfg.tts_type}', type="edit_subtitle_target")
                    self._post(tr('The subtitle editing interface is rendering'))
                    while app_cfg.task_countdown > 0:
                        if self._exit(): return
                        time.sleep(1)
                        app_cfg.set_countdown(app_cfg.task_countdown - 1)

                if not self._exit():
                    trk.dubbing()

                if not trk.ignore_align and float(settings.get('countdown_sec', 0)) > 0:
                    for it in trk.queue_tts:
                        if self._exit(): return
                        # 当前配音时长,0=不存在配音文件
                        it['dubbing_s'] = (len(AudioSegment.from_file(it['filename'])) if vail_file(
                            it['filename']) else 0) / 1000.0

                    # 存入临时目录
                    Path(f'{trk.cfg.cache_folder}/queue_tts.json').write_text(
                        json.dumps(trk.queue_tts, ensure_ascii=False), encoding='utf-8')

                    app_cfg.set_countdown(86400)
                    # 等待修改配音结果或重新配音
                    self._post(text=f"{trk.cfg.cache_folder}<|>{trk.cfg.target_language_code}", type='edit_dubbing')
                    self._post(text=tr('The subtitle editing interface is rendering'))
                    while app_cfg.task_countdown > 0:
                        if self._exit(): return
                        time.sleep(1)
                        app_cfg.set_countdown(app_cfg.task_countdown - 1)

            if not self._exit():
                trk.align()

            if not self._exit():
                trk.recogn2pass()
            if trk.should_recogn2:
                app_cfg.set_countdown(86400)
                # 等待修改二次识别出的字幕
                self._post(text=f'{trk.cfg.target_sub}', type="edit_recogn2_subtitle")
                self._post(text=tr('The subtitle editing interface is rendering'))
                while app_cfg.task_countdown > 0:
                    if self._exit(): return
                    time.sleep(1)
                    app_cfg.set_countdown(app_cfg.task_countdown - 1)

            if not self._exit():
                trk.assembling()

            if not self._exit():
                trk.task_done()
            self._post(text="", type='end')
        except Exception as e:
            logger.exception(f'单视频模式翻译失败{e}',exc_info=True)
            detail_back = (traceback.format_exc()).strip()
            channel=f"[{get_recogn_type(trk.cfg.recogn_type)},  {get_tanslate_type(trk.cfg.translate_type)}, {get_tts_type(trk.cfg.tts_type)}]"
            self._post(text=str(e) + f"{channel}\n{detail_back}\n{trk.cfg if trk else ''}", type='error')

    def _post(self, text='', type='logs'):
        try:
            if self.uuid in app_cfg.stoped_uuid_set: return
            self.uito.emit(self.uuid, SignMsg(**{"text": text, "type": type, 'uuid': self.uuid}))
        except (ValueError,IndexError,TypeError):
            pass

    def _exit(self):
        if app_cfg.exit_soft or app_cfg.current_status != 'ing':
            return True
        return False

# 默认多视频模式
class MultVideo(QThread):
    def __init__(self, *,
                 parent,
                 cfg,
                 input_file_list:List[InputFile]
                 ):
        super().__init__(parent=parent)
        self.cfg = cfg
        # 存放处理好的 视频路径等信息
        self.input_file_list = input_file_list
        self.batch_nums = 0
        try:
            self.batch_nums = int(float(settings.get('batch_nums', 0)))
        except (ValueError,TypeError):
            pass

    def run(self):
        if app_cfg.exit_soft or app_cfg.current_status != 'ing': return
        if self.batch_nums < 1:
            for it in self.input_file_list:
                # 压入识别队列开始执行
                app_cfg.rm_uuid(it['uuid'])
                app_cfg.prepare_queue.put_nowait(TransCreate(cfg=TaskCfgVTT(**self.cfg | it)))
            return

        logger.debug(f'批量翻译视频，每批次{self.batch_nums}个')
        _obj_list_split = [self.input_file_list[i:i + self.batch_nums] for i in range(0, len(self.input_file_list), self.batch_nums)]
        for _it_split in _obj_list_split:
            trk_list = []
            for it in _it_split:
                app_cfg.rm_uuid(it['uuid'])
                trk = TransCreate(cfg=TaskCfgVTT(**self.cfg | it))
                app_cfg.prepare_queue.put_nowait(trk)
                trk_list.append(trk)

            while 1:
                time.sleep(1)
                _this_batch_end = True
                for _trk in trk_list:
                    if not _trk.hasend and _trk.uuid not in app_cfg.stoped_uuid_set:
                        _this_batch_end = False
                        break
                if _this_batch_end:
                    break

# config.py代码片段
from videotrans.configure.signal_hub import SignalHub

IS_FROZEN = True if getattr(sys, 'frozen', False) else False
SYS_TMP = Path(tempfile.gettempdir()).as_posix()
# 程序根目录
ROOT_DIR = Path(sys.executable).parent.as_posix() if IS_FROZEN else Path(__file__).parent.parent.parent.as_posix()
TEMP_ROOT = f'{ROOT_DIR}/tmp'
LOGS_DIR = f'{ROOT_DIR}/logs'
# 会变化，应该通过 config.TEMP_DIR 获取
TEMP_DIR= f'{TEMP_ROOT}/None'
TRANSLATE_CACHE= f'{TEMP_ROOT}/translate_cache'

Path(f"{ROOT_DIR}/models").mkdir(parents=True, exist_ok=True)
Path(f"{ROOT_DIR}/logs").mkdir(parents=True, exist_ok=True)
Path(f"{TRANSLATE_CACHE}").mkdir(parents=True, exist_ok=True)

def _set_env():
    # 环境变量设置
    if IS_FROZEN:
        os.environ['TQDM_DISABLE'] = '1'
    os.environ['no_proxy'] = no_proxy
    os.environ['NO_PROXY'] = no_proxy
    os.environ['KMP_DUPLICATE_LIB_OK'] = 'True'
    os.environ["PYTORCH_ENABLE_MPS_FALLBACK"] = "1"
    os.environ["CUDA_LAUNCH_BLOCKING"] = "1"
    os.environ["CT2_VERBOSE"] = "1"
    os.environ["OMP_NUM_THREADS"] = "1"
    os.environ["HF_HUB_ENABLE_HF_TRANSFER"] = "0"
    os.environ['QT_API'] = 'pyside6'
    os.environ['SOFT_NAME'] = 'pyvideotrans'
    os.environ['MODELSCOPE_CACHE'] = ROOT_DIR + "/models"
    os.environ['HF_HOME'] = ROOT_DIR + "/models"
    os.environ['HF_HUB_CACHE'] = ROOT_DIR + "/models"
    os.environ['HF_TOKEN_PATH'] = ROOT_DIR + "/models/hf_token.txt"
    os.environ['HF_HUB_DISABLE_SYMLINKS_WARNING'] = 'true'
    os.environ['HF_HUB_DOWNLOAD_TIMEOUT'] = "3600"
    os.environ["HF_HUB_DISABLE_XET"] = "1"

    if sys.platform == 'win32' and IS_FROZEN:
        os.environ['PATH'] = f'{ROOT_DIR}/_internal/torch/lib;' + os.environ.get("PATH", "")
    os.environ['PATH'] = ROOT_DIR + os.pathsep + f'{ROOT_DIR}/ffmpeg' + os.pathsep + f'{ROOT_DIR}/ffmpeg/sox' + os.pathsep + os.environ.get(
        "PATH", "")

def push_queue(uuid:str, msg:SignMsg):
    """兼容旧的 push_queue"""
    if app_cfg.exit_soft or uuid in app_cfg.stoped_uuid_set:
        return
    try:
        SignalHub.instance().post(uuid, msg)
    except Exception as e:
        logger.exception(f'push_queue 信号发送错误：{e}', exc_info=True)

@dataclass
class AppCfg:
    # ... (省略具体字段)
    pass

@dataclass
class AppSettings:
    # ... (省略具体字段)
    pass

@dataclass
class AppParams:
    # ... (省略具体字段)
    pass

_set_env()

logger=_set_logs()

app_cfg: AppCfg = AppCfg()
settings: AppSettings = AppSettings()
params: AppParams = AppParams()

HOME_DIR = settings.homedir  # 更新全局 HOME_DIR
Path(HOME_DIR).mkdir(parents=True, exist_ok=True)

defaulelang,_transobj=_init_language()

_proxy = settings.proxy or os.environ.get('HTTPS_PROXY', '')
if _proxy:
    os.environ['HTTPS_PROXY'] = _proxy
    os.environ['HTTP_PROXY'] = _proxy
    app_cfg.proxy=_proxy
    if not settings.proxy:
        settings['proxy'] = _proxy

# 主进程执行
def init_run():
    global TEMP_DIR
    TEMP_DIR = f'{TEMP_ROOT}/{os.getpid()}'
    Path(f"{TEMP_DIR}").mkdir(parents=True, exist_ok=True)
    # 目录创建
    Path(f'{TEMP_ROOT}/translate_cache').mkdir(exist_ok=True, parents=True)
    Path(f'{ROOT_DIR}/models').mkdir(exist_ok=True, parents=True)
    Path(f'{ROOT_DIR}/f5-tts').mkdir(exist_ok=True, parents=True)
```

---

## 18. 官方参考文档链接

*   [使用入门](https://pyvideotrans.com/getstart)
*   [下载软件](https://pyvideotrans.com/downpackage)
*   [MacOSX/Linux安装](https://pyvideotrans.com/deply)
*   [单视频精修模式](https://pyvideotrans.com/danshipin)
*   [高级选项](https://pyvideotrans.com/adv)
*   [语音克隆](https://pyvideotrans.com/multi-role-dubbing)
*   [导入本地已有的字幕或人声](https://pyvideotrans.com/localsrt)
*   [修改提示词](https://pyvideotrans.com/prompt)
*   [最佳配置推荐](https://pyvideotrans.com/bester)
*   [cli命令行模式](https://pyvideotrans.com/cli)
*   [字幕语音画面对齐](https://pyvideotrans.com/subtitle-sound-alignment)
*   [常见问题FAQ](https://pyvideotrans.com/faq)
*   [语音识别渠道说明与介绍](https://pyvideotrans.com/yuyinshibiequdao)
*   [faster-whisper本地](https://pyvideotrans.com/faster)
*   [openai-whisper本地](https://pyvideotrans.com/openaiwhisper)
*   [Qwen-ASR(本地)](https://pyvideotrans.com/qwenasrlocal)
*   [阿里FunASR](https://pyvideotrans.com/funasr)
*   [Huggingface_ASR渠道](https://pyvideotrans.com/huggingface)
*   [字节语音识别大模型极速版](https://pyvideotrans.com/zijierecognmodel)
*   [阿里百炼Qwen3-ASR语音识别](https://pyvideotrans.com/qwen-mt)
*   [OpenAI语音识别API](https://pyvideotrans.com/openairecogn)
*   [Elevenlabs.io语音识别](https://pyvideotrans.com/elevenlabsrecogn)
*   [Parakeet-tdt语音识别](https://pyvideotrans.com/parakeet)
*   [Gemini大模型识别](https://pyvideotrans.com/gemini-recognition)
*   [Deepgram.com语音识别api](https://pyvideotrans.com/deepgram)
*   [faster-whisper-xxl.exe语音识别](https://pyvideotrans.com/xxl)
*   [Whisper.cpp语音识别](https://pyvideotrans.com/whisper-cli)
*   [Whisperx-api语音识别](https://pyvideotrans.com/whisperx-api)
*   [智谱AI GLM-ASR语音识别](https://pyvideotrans.com/zhipu-ai)
*   [STT语音识别API](https://pyvideotrans.com/stt)
*   [VibeVoice-ASR](https://pyvideotrans.com/vibevoice-asr)
*   [自定义语音识别API](https://pyvideotrans.com/recognapi)
*   [Whisper.NET(AMD显卡加速)](https://pyvideotrans.com/whisper_net_setup)
*   [对转录识别结果重新断句](https://pyvideotrans.com/blog/rephrase-llm)
*   [手动下载模型](https://pyvideotrans.com/aboutmodels)
*   [翻译渠道说明与介绍](https://pyvideotrans.com/fanyiqudao)
*   [Microsoft翻译](https://pyvideotrans.com/microsoft)
*   [Google翻译](https://pyvideotrans.com/googletranslate)
*   [M2M100翻译](https://pyvideotrans.com/m2m100)
*   [百度翻译](https://pyvideotrans.com/baidu)
*   [腾讯翻译](https://pyvideotrans.com/tencent)
*   [阿里巴巴机器翻译](https://pyvideotrans.com/alibaba-machine-translation)
*   [DeepL翻译](https://pyvideotrans.com/deepl)
*   [DeepLX翻译](https://pyvideotrans.com/deeplx)
*   [字节火山大模型翻译](https://pyvideotrans.com/zijiehuoshan)
*   [302.AI翻译](https://pyvideotrans.com/302ai)
*   [ChatGPT翻译](https://pyvideotrans.com/openai)
*   [Gemini翻译](https://pyvideotrans.com/gemini-recognition)
*   [LibreTranslate翻译](https://pyvideotrans.com/libretranslate)
*   [AzureGPT翻译](https://pyvideotrans.com/azure)
*   [智谱AI](https://pyvideotrans.com/zhipu-ai)
*   [DeepSeek](https://pyvideotrans.com/deepseek-ai)
*   [Minimaxi AI](https://pyvideotrans.com/minimaxi)
*   [阿里百炼API](https://pyvideotrans.com/qwen-mt)
*   [硅基流动](https://pyvideotrans.com/siliconflow-ai)
*   [OpenRouter.ai](https://pyvideotrans.com/openrouter-ai)
*   [自定义翻译api](https://pyvideotrans.com/transapi)
*   [本地大模型/国产AI接入](https://pyvideotrans.com/localllm)
*   [对接使用GroqCloud](https://pyvideotrans.com/groq)
*   [配音渠道说明与介绍](https://pyvideotrans.com/peiyinqudao)
*   [edge-TTS](https://pyvideotrans.com/edgetts)
*   [Qwen3-TTS](https://pyvideotrans.com/qwen-tts)
*   [OmniVoice-TTS](https://pyvideotrans.com/omnivoice)
*   [VITS/Piper-TTS配音渠道](https://pyvideotrans.com/vitspiper)
*   [GPT-SoVITS](https://pyvideotrans.com/gptsovits)
*   [F5/Spark/index/voxpcm/Dia/Confucius4-TTS](https://pyvideotrans.com/f5tts)
*   [CosyVoice](https://pyvideotrans.com/cosyvoice)
*   [ChatterBox-TTS](https://pyvideotrans.com/chatterbox)
*   [Minimaxi配音](https://pyvideotrans.com/minimaxi)
*   [字节语音合成模型2.0](https://pyvideotrans.com/doubao2tts)
*   [302.AI接入配音](https://pyvideotrans.com/302ai)
*   [ChatTTS](https://pyvideotrans.com/chattts)
*   [FishTTS](https://pyvideotrans.com/fishtts)
*   [Gemini-TTS](https://pyvideotrans.com/gemini-tts)
*   [Kokoro-TTS](https://pyvideotrans.com/kokorotts)
*   [Azure TTS](https://pyvideotrans.com/azuretts)
*   [OpenAi-TTS](https://pyvideotrans.com/openaitts)
*   [Elevenlabs.io](https://pyvideotrans.com/elevenlabstts)
*   [x.ai TTS](https://pyvideotrans.com/xaitts)
*   [xiaomi TTS](https://pyvideotrans.com/mitts)
*   [智谱AI GLM-TTS](https://pyvideotrans.com/zhipu-ai)
*   [自定义TTS-API](https://pyvideotrans.com/ttsapi)
*   [原音色克隆/多角色配音](https://pyvideotrans.com/multi-role-dubbing)
*   [新增目标语言](https://pyvideotrans.com/newlanguage)
*   [优化语音识别精度和断句效果](https://pyvideotrans.com/youhua)
*   [调节VAD更精确控制语音识别结果](https://pyvideotrans.com/vad)
*   [说话人识别](https://pyvideotrans.com/shuohuaren)
*   [优化本地大模型接入](https://pyvideotrans.com/llmbetter)
*   [提高AI渠道翻译字幕的质量](https://pyvideotrans.com/aitranslate)
*   [Windos上配置CUDA和cuDNN](https://pyvideotrans.com/gpu)
*   [为什么翻译后会出现"空白字幕行"？](https://pyvideotrans.com/faq17)
*   [源码部署FunASR报错 paraformer-zh is not registered](https://pyvideotrans.com/blog/paraformer-zh-is-not-registered)
*   [使用参考音频后合成声音后乱糟糟](https://pyvideotrans.com/aittserror)
*   [edge-TTS配音出错](https://pyvideotrans.com/edgetts-error)
*   [常见网络连接错误](https://pyvideotrans.com/httpconnecterror)
*   [Gemini提示安全限制](https://pyvideotrans.com/gemini-safe)
*   [window上安装python3.10](https://pyvideotrans.com/_posts/pythoninstall)
*   [windows上安装CUDA12.6和cuDNN9.8](https://pyvideotrans.com/blog/cudacudnninstall)
*   [如何在 Windows 10 上安装 Miniconda 并配置 AI 软件环境](https://pyvideotrans.com/blog/installconda)
*   [用 uv 轻松玩转 Python 项目：从安装到运行，一步到位](https://pyvideotrans.com/blog/uv)
*   [安装 Visual Studio Community 免费版,解决pip安装失败问题](https://pyvideotrans.com/blog/visualstudiocomm)
*   [英伟达 RTX 5090 装机后无法使用 GPU 加速？别急，这里有解决办法](https://pyvideotrans.com/blog/5090s)
*   [语音转录功能](https://pyvideotrans.com/speech2text)
*   [语音合成功能](https://pyvideotrans.com/text2speech)
*   [翻译字幕功能](https://pyvideotrans.com/translate-srt)
*   [视频翻译功能](https://pyvideotrans.com/translate-video)
*   [提取视频硬字幕为SRT](https://pyvideotrans.com/ocrsp)
*   [Youtube视频下载](https://pyvideotrans.com/youtubedownload)
*   [软件许可协议](https://pyvideotrans.com/law)
*   [隐私政策](https://pyvideotrans.com/yinsizhengce)
*   [文档使用协议](https://pyvideotrans.com/xieyi)
*   [关于我们](https://pyvideotrans.com/guanyu)
*   [联系我们](https://pyvideotrans.com/lianxi)
*   [小额捐赠](https://pyvideotrans.com/about)
*   [技术支持](https://pyvideotrans.com/support)
*   [博客列表](https://pyvideotrans.com/bloglist)
*   [软件技术架构](https://pyvideotrans.com/yuanli)
*   [为什么网站有广告？](https://pyvideotrans.com/whyad)


## 18.1  单视频交互模式

当一次仅选择一个视频进行翻译时，软件会进入交互模式，在每个处理阶段完成后弹出编辑窗口，允许你进行人工校对和微调，以确保最终效果。

> 如果一次选择多个视频，将同时交叉执行，中间不会暂停。
>
> 如果不想弹出编辑窗口，可点击「菜单 → 工具 → 高级选项 → 单视频交互模式暂停时间」，将其改为 0。

---

## 阶段一：语音识别完成后 — 字幕修改窗口

![字幕修改窗口](https://pvtr2.pyvideotrans.com/1784797487309_z01.png)

你可以修改识别出的结果，例如修正错别字等。可以点击播放按钮，播放字幕对应的视频片段

**进阶操作**：如果你想通过第三方工具修改字幕，可以点击「打开字幕文件夹」按钮，找到 `原始语言代码.srt` 文件（例如中文发音就是 `zh-cn.srt`），用外部编辑器修改后保存，然后在软件界面中点击「不保存只继续」按钮，后续将使用你修改过的文件。

---

## 阶段二：字幕翻译完成后 — 发音角色分配窗口

![角色分配窗口](https://pvtr2.pyvideotrans.com/1784797487721_z02.png)

你可以为每个说话人指定一个配音角色，实现多角色配音，也可以单独为每行字幕指定一个配音角色。

可以点击播放按钮，播放字幕对应的视频片段

**进阶操作**：同上，可以通过「打开字幕文件夹」找到翻译后的 SRT 文件（例如 `en.srt`），用外部编辑器修改后保存，再点击「不保存只继续」。

---

## 阶段三：配音完成后 — 校对配音-重新配音面板

当配音结束后、正式合成视频前，会弹出每条字幕和对应配音的校对界面。

![](https://pvtr2.pyvideotrans.com/1784815742609_image.png)

点击播放按钮，预览字幕对应的视频画面和当前字幕配音，但注意：此时配音和视频均未做变速处理，因此二者大概率不会同步，可以根据预览效果调整字幕文本数量，右键重新配音

这个界面主要用于调整时间轴、重新对某条字幕进行配音，例如某些配音渠道支持添加 感情控制符、静音控制、语气控制等，可在此修改字幕文本添加这些符号，然后重新配音。

> **注意**
> - 此处对字幕的修改不会保存到字幕文件中，仅用于重新进行配音，以防止添加的一些控制符加入字幕文件中
> - 可以根据预览效果重新选择是否启用`配音加速`和`视频慢速`

#### 第一步：停止倒计时

进入界面后，顶部会有一个黄色的倒计时按钮（例如「点此停止倒计时(85)」）。

*   **请立即点击这个按钮**，暂停倒计时，给自己充足的时间检查和修改。

#### 第二步：调整时间、字幕、试听、重新配音

每一行代表一句字幕，有6列组成：从左到右依次为：

> 调整时间遵循一个原则：仅利用前后空白区间增大或减小，每次0.1s，不会覆盖相邻片段的时间，避免造成重叠

1.  **行号** 例如`[1]`：第行句字幕
2.  **播放按钮**：点击播放该行字幕对应的视频画面和配音
3.  **字幕开始时间** ：双击单元格开始时间减小0.1s；`Ctrl`+左方向键`减小0.1s`，`Ctrl`+右方向键`增大0.1s`
    *   右键单元格--`开始时间减小0.1s`：让这句话早一点开始（每次提前 0.1 秒）
    *   右键单元格--`开始时间增大0.1s`：让这句话晚一点开始（每次推后 0.1 秒）
    *   **注意：开始时间不能早于上一句话的结束时间**
4.  **字幕结束时间** ：双击单元格结束时间增大0.1s；`Ctrl`+左方向键`减小0.1s`，`Ctrl`+右方向键`增大0.1s`
    *   右键单元格-- `结束时间减小0.1s`：让这句话早一点结束（每次缩短 0.1 秒）
    *   右键单元格-- `结束时间增大0.1s`：让这句话晚一点结束（每次延长 0.1 秒）
    *   **注意：结束时间不能晚于下一句话的开始时间**
5.  **配音时长**：单元格上右键显示`试听`和`重新配音`按钮
    *   **x.xxs \<超出\> x.xxs**：配音太长，字幕时间放不下。程序会自动加速播放配音。如不希望配音变快，请**延长结束时间**或**删减字幕文字**后重配。
	
    *   **x.xxs \<缩短\> x.xxs**：配音比字幕时间短，这是正常的，会有短暂静音。
6.  **字幕：双击可编辑**：右键显示`试听`和`重新配音`按钮，双击可直接编辑字幕文本
    *   **重新配音**：修改文字后**必须**点击此按钮，程序会根据新文字重新生成语音。
    *   **试听配音**：播放当前这句字幕的语音，检查读音或语调。



---

## 阶段四：二次识别后弹出字幕编辑界面

![](https://pvtr2.pyvideotrans.com/1784797490015_z04.png)

如果选中了二次识别、并且有配音、并且未嵌入硬字幕，那么会弹出该界面，可在此修改错别字，然后点击保存并继续。



## 注意事项

*   **保存并继续下一步**：确认无误，保存字幕修改并继续执行。
*   **终止本次任务**：放弃当前操作，关闭窗口。

> 💡 **小贴士**：
> * 如果列表很长，滑动或点击时请耐心等待，程序已优化过，通常反应很快。
> * 如果某行文字被清空，或者配音时长显示为 0s，该条配音将不会被合成。



## 19. 版权与使用条款

### pyVideoTrans 软件许可与服务协议
更新日期：2025年10月21日

欢迎使用 pyVideoTrans（以下简称"本软件"）！本软件是一款免费、开源的本地视频翻译和语音转录工具。在安装、复制或以任何方式使用本软件前，请您务必仔细阅读并充分理解本协议中的所有条款。

您的安装、复制、下载或任何形式的使用行为，即表示您已阅读、理解并无条件接受本协议所有条款的约束。如果您不同意本协议的任何内容，请立即停止使用并从您的设备中彻底删除本软件。

**1. 许可授予与软件性质**

*   开源免费：本软件是一款基于 GPL-v3 开源协议发布的免费软件。您可以从官方渠道（https://github.com/jianchang512/pyvideotrans）或文档站(https://pyvideotrans.com)获取本软件的源代码和Windows预打包版。
*   禁止商业销售：开发者未授权任何实体或个人销售本软件。任何通过付费渠道获取本软件的行为均与开发者无关，开发者对此不承担任何责任。
*   重要提醒：第三方 API 需您自行提供账户和密钥（仅本地存储），产生的费用由第三方收取，与开发者无关，开发者仅在软件中提供API对接技术规范。请查阅各 API 协议以确认商用许可及费用标准。

**2. 数据隐私**

*   本地运行：本软件的核心功能完全在您的本地计算机上运行，不会收集或上传您的任何个人信息、视频文件或操作数据至开发者服务器。
*   第三方服务：当您选择使用集成的第三方API服务（如 Microsoft Azure, OpenAI, Edge TTS等）时，相关数据将直接由您的计算机发送至相应的第三方服务提供商。您的数据处理将受限于该第三方服务商的隐私政策和使用条款。开发者不参与此过程，也不对第三方服务的数据安全和隐私泄露承担任何责任。
*   版本更新与报错信息：软件通过 https://pyvideotrans.com/version.json 这个静态文件获取最新版本号；当你在软件中点击"报告错误"按钮时，会打开 https://bbs.pyvideotrans.com/post 报错提交页面并显示错误信息，在该页面你仍需要再次点击"发布"按钮，才会向开发者提交错误信息，否则错误信息只会保留在本地和你的浏览器缓存中，不会提交。

**3. 免责声明与责任限制**

*   本软件按"原样"提供，不附带任何形式的明示或暗示的保证，包括但不限于对适销性、特定用途适用性及非侵权性的保证。
*   无保证：开发者不保证本软件能够满足您的所有需求，也不保证软件运行不会中断或出现错误。您将承担使用本软件所带来的一切风险。
*   责任限制：在任何情况下，无论基于何种法律理论（无论是合同、侵权或其他），开发者均不对任何因使用或无法使用本软件而导致的任何形式的直接、间接、特殊、偶然或后果性损害承担责任。这包括但不限于：数据丢失、文件损坏、利润损失、业务中断、计算机故障或任何其他商业损害或损失，即便开发者已被告知存在此类损害的可能性。
*   用户责任：您对通过本软件处理的所有内容负全部责任。您必须确保拥有处理这些内容的合法权利，并遵守您所在地区及中华人民共和国的所有适用法律法规，包括但不限于版权法和知识产权法。任何因非法使用本软件而导致的法律后果，均由您自行承担。

**4. 您的义务**

*   数据备份：软件缺陷或不当操作可能导致数据丢失或文件损坏。在使用本软件处理任何重要文件之前，您有绝对责任对您的原始文件和重要数据进行充分备份。
*   合法使用：您承诺不使用本软件进行任何非法活动，包括但不限于侵犯他人版权、传播非法信息等。

**5. 其他条款**

*   协议修改：开发者保留随时修改本协议条款的权利。修改后的协议将在官方渠道公布，恕不另行通知。您继续使用本软件将被视为接受修改后的协议。
*   最终解释权：在法律允许的最大范围内，本协议的最终解释权归本软件开发者所有。

**6. 关于 pyvideotrans 处理产出物的版权归属说明**

1. 工具定位：pyvideotrans 是一款辅助翻译与配音的技术工具。软件本身不对用户处理后的产出物（包括但不限于翻译文本、配音音频、合成视频）主张任何版权。
2. 版权归属原则：产出物的版权归属通常取决于以下两个前提，请您自行评估确认：
   - 原始素材授权：您必须拥有原始输入作品的合法版权或已获得足以支持二次创作/翻译的授权。
   - 第三方服务协议：pyvideotrans 集成了多种大模型（如 Whisper, index-tts ,f5-tts ,DeepSeek等）及第三方 API（如 Edge-TTS, Google Translate 等）。产出物的商用权利受这些服务商的《服务协议》或《开源协议》约束。

   简单来说：如果你拥有原始素材的版权，那么使用本软件处理后你仍然拥有产出物的版权。如果你拥有版权的同时，使用的本地模型或第三方API允许商用，那么产出物你也可以商用。

3. 用户责任：用户在使用本软件过程中，应确保不侵犯任何第三方的知识产权。因原始素材侵权或违反第三方 API 使用规定而产生的法律后果，由用户自行承担。
4. 建议：由于不同模型和 API 的商用条款可能随时间变更（例如某些开源模型仅限非商业研究），建议您在进行商业使用前，详细阅读所选渠道提供商的最新服务条款。

如果您已阅读并同意上述所有条款，请开始使用本软件。否则，请删除本软件。

---

::: danger 防骗声明

- 本软件是一款基于 [GPL-V3 协议](https://www.gnu.org/licenses/gpl-3.0.html) 发布的开源软件。您可以从 [官方GitHub仓库](https://github.com/jianchang512/pyvideotrans) 或 [文档站](/downpackage) 下载和使用源代码或Windows预打包版。

- 【未授权商业销售行为】本开发者未授权任何实体或个人销售本软件（例如淘宝、闲鱼、拼多多等）。任何通过付费渠道获取本软件的行为均与开发者无关，开发者未授权也未从中受益，对此不承担任何责任，如果你是花钱购买并且想退款，请自行找卖家退钱或平台投诉，勿找开发者。

- 【无需登录或认证】下载预打包版或部署源码后就直接可用，无需登录或卡密验证，凡是需要此类操作才可使用的，都不是官方原版，请知悉。

- 【关于第三方API】第三方 API 需您自行提供账户和密钥（仅本地存储），相关费用你需自行在第三方平台充值或购买，与开发者无关，开发者仅在软件中提供API对接的技术规范。

[查看软件使用和许可协议了解更多...](https://pyvideotrans.com/law)

:::



---

# Output Instructions (最终执行指令)

当收到用户提问或错误报告时：

1. **第一句话**：直入主题，明确指出问题的底层核心原因（例如："这是由于显存不足导致的。" 或 "这是因为没有配置网络代理。"）。
2. **解决方案**：提供简单、精准且按步骤编排的操作指南（1. xxx; 2. xxx）。
3.  **参考文档**：如果在知识库中找到了相关的详细文档 URL，请在回复末尾列出，格式为：
   `### 请查阅相关文档：`
   `- [文档标题](URL)`
4. **兜底策略**：如果提取问题无匹配的已知解答，则使用以下模板进行回复：
   "暂无法确定具体原因。请提供软件安装目录下的 `logs/` 文件夹中最新的日志文件（复制底部约30行报错信息）以便分析。"
    如果用户提交的信息中无法确定软件版本号，提醒用户提交软件左上角的版本号数字
5. **禁用知识库字眼**：禁止在最终回复中提及"知识库"、"根据知识库xx节"等任何相关概念。
