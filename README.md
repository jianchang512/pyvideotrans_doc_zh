# pyVideoTrans 中文文档

- [pyVideoTrans项目仓库](https://github.com/jianchang512/pyvideotrans)
- [pyVideoTrans文档站](https://pyvideotrans.com)


---

**pyVideoTrans**致力于无缝地将视频从一种语言转换为另一种语言，包含语音识别、字幕翻译、多角色配音及音画同步等全套流程。支持本地离线部署与多种主流在线 API。

<img width="1730" height="957" alt="image" src="https://github.com/user-attachments/assets/07b9c144-6043-4780-8522-bcf0eb7ca910" />

---

## ✨ 核心功能

> [技术架构与原理](architecture.md)

- **全自动视频翻译**: 一键完成：语音识别(ASR) → 字幕翻译 → 语音合成(TTS) → 视频合成。
- **️语音转录 / 字幕生成**: 批量将音视频转为 SRT 字幕，支持 **说话人分离**，区分不同角色。
- **️多角色 AI 配音**: 支持根据不同说话人分配不同的 AI 配音角色。
- **声音克隆**: 集成 **F5-TTS, CosyVoice, GPT-SoVITS** 等模型，支持零样本声音克隆。
- **强大的模型支持**:
  - **ASR**: Faster-Whisper (本地), OpenAI Whisper, 阿里 Qwen, 字节火山, Azure, Google 等。
  - **LLM 翻译**: DeepSeek, ChatGPT, Claude, Gemini, MiniMax, Ollama (本地), 阿里百炼等。
  - **TTS**: Edge-TTS (免费), OpenAI, Azure, Minimaxi, ChatTTS, ChatterBox 等。
- **️交互式编辑**: 支持在识别、翻译、配音的每个阶段暂停并人工校对，确保精准度。
- **️实用工具集**: 包含人声分离、视频/字幕合并、音画对齐、文稿匹配等辅助工具。
- **命令行模式 (CLI)**: 支持无头模式运行，方便服务器部署或批处理。
- **Web 界面 (WebUI)**: 基于浏览器的界面，适合远程访问或局域网部署。


##  致谢 

- [vitepress](https://vitepress.dev/)