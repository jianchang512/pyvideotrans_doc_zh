---
title: vibevoice-asr语音识别使用
date: 2026-01-22 14:33:00
description: 最近微软发布的  VibeVoice-ASR 语音识别模型效果非常惊艳，自带说话人识别。但官方原版对硬件要求极高（需要20G+显存，基本上要 RTX 3090/4090 才能跑），而且配置复杂，让很多想尝鲜的朋友望而却步。
---


最近微软发布的 **VibeVoice-ASR** 语音识别模型效果非常惊艳，自带说话人识别。但官方原版对硬件要求极高（需要20G+显存，基本上要 RTX 3090/4090 才能跑），而且配置复杂，让很多想尝鲜的朋友望而却步。

为了更容易使用，简单做了一点修改，以便在低显存设备上运行！

1.  **超低门槛**：显存占用降低 70%，普通 12G/14G 显存即可运行。
2.  **云端白嫖**：电脑配置不够？没关系！提供 Google Colab 脚本，**免费**在云端运行。
3.  **集成到pyVideoTrans**：视频翻译配音软件 v3.95+ 版本已原生支持。

---

## 第一步：准备工作

1.  **升级软件**：请确保你的 `pyVideoTrans` 已经更新到 **v3.95** 或更高版本,如果已是，仍建议再次下载补丁包覆盖。（这是硬性要求，旧版本不支持哦）。
2.  **获取模型运行地址**：你可以选择**云端运行（推荐，免费且无需配置电脑）**或**本地运行**(本地建议使用MacOSX或Linux，win下未测试)。

---

## 第二步：启动 VibeVoice 模型

### 方案 A：Google Colab 云端运行
只要你能访问 Google，推荐使用此方法，不用消耗自己电脑的性能。

1.  **打开运行脚本**：下方是笔记本链接：
    👉 VibeVoice Colab 一键运行脚本 ( `https://colab.research.google.com/drive/1FnsoTQsH9iTWpuJVY_T-0ZO-E91C74it?usp=sharing` )

2.  **修改运行时类型**（关键步骤）：
    *   点击右上角的 **“连接”** 按钮右侧的小三角。
    *   选择 **“更改运行时类型”**。
    *   在硬件加速器中选中 **`T4 GPU`**，然后点击保存。
![](https://pvtr2.pyvideotrans.com/1769527651405_image.png)



3.  **一键运行**：
    *   点击菜单栏下方的 **“全部运行”** 按钮（或者按 `Ctrl+F9`）。
    *   脚本会自动安装环境和下载模型，请耐心等待几分钟。

![](https://pvtr2.pyvideotrans.com/1769527716396_image.png)


4.  **获取 API 地址**：
    *   当页面最底部显示 `Running on public URL: https://xxxx.gradio.live` 时，表示启动成功。
    *   **复制这个以 `.gradio.live` 结尾的网址**，这就是我们需要填入软件的地址。

![](https://pvtr2.pyvideotrans.com/1769527774730_image.png)



### 方案 B：本地部署（适合 Linux/Mac 高手）
如果你是 Linux/Mac 用户且显存在10G以上，可以参考 `https://github.com/jianchang512/VibeVoice/blob/main/docs/vibevoice-asr.md` 自行部署。启动命令为：
`python demo/vibevoice_asr_gradio_demo.py --model_path microsoft/VibeVoice-ASR --attn_implementation sdpa --share`

启动后默认地址通常为 `http://127.0.0.1:7860`。

> Win10/11 理论上也应该可以，不过因显存不足未测试

---

## 第三步：在 pyVideoTrans 中配置

拿到 API 地址后，回到我们的翻译软件中进行简单的设置。

1.  打开 `pyVideoTrans` 软件。
2.  在顶部菜单栏找到 **“语音识别设置(R)”** -> 选择 **“自定义语音识别API”**。

3.  **填写配置信息（看图操作）**：
    *   **API 地址**：粘贴刚才在 Colab 中复制的 `https://xxxx.gradio.live` 地址（或者是本地的 http://127.0.0.1:7860）。
    *   **密钥密码**：这里有一个**特殊暗号**！你可以在这里随便填字符，但**必须包含** `vibevoice-asr` 这段文字。
        *   *正确示范*：`my-vibevoice-asr-key` 或 `test-vibevoice-asr`
        *   *错误示范*：`123456` (软件无法识别这是 VibeVoice 接口)


![](https://pvtr2.pyvideotrans.com/1769528406065_acaa.png)




4.  点击 **“测试”** 按钮。如果提示“连接成功”或返回了测试数据，点击 **“保存修改”**。

---

## 第四步：开始使用

现在，你已经拥有了目前最强梯队的语音识别能力！

1.  在软件主界面，导入你要处理的视频或音频。
2.  在 **“选择语音识别模型”** 的下拉菜单中，选择 **“自定义语音识别API”**。
3.  点击开始运行，软件就会自动通过云端的 VibeVoice 模型为你生成精准的字幕啦！

---

### 常见问题 (Q&A)

**Q: Colab 运行报错或者断开了怎么办？**
A: Colab 的免费 GPU 有使用时长限制，如果断开，请重新刷新网页，重复“全部运行”的步骤，并获取新的 `.gradio.live` 链接填入软件。

**Q: 识别速度快吗？**
A: VibeVoice 的速度非常快，且经过我们的量化优化，在 T4 GPU 上也能实现接近实时的转录速度。不过软件是整个音频发送转录，完毕后再整个显示，并未实现流式。

**Q: 为什么我测试时提示错误？**
A: 请检查两点：1. API 地址后面不要多复制空格；2. 密钥里是否包含了 `vibevoice-asr` 这个关键词。

---
*本项目修改版仓库地址：https://github.com/jianchang512/VibeVoice*