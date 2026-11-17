---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "pyVideoTrans"
  text: "视频翻译 / 语音转录 / 文字配音 / 翻译字幕"
  tagline: 一键将视频从一种语言翻译为另一种语言，开源免费
  actions:
    - theme: brand
      text: 下载软件
      link: /downpackage
    - theme: alt
      text: 使用文档
      link: /getstart
    - theme: alt
      text: 问答报错
      link: https://bbs.pyvideotrans.com

features:
  - icon: 🎬
    title: 全自动视频翻译
    details: 一键完成语音识别 → 字幕翻译 → AI 配音 → 视频合成，自动生成带有目标语言字幕和配音的全新视频。
  - icon: 🧬
    title: 语音转录/文字配音/翻译字幕
    details: 配有批量语音转录、字幕配音、翻译SRT字幕功能。
  - icon: 🎙️
    title: 多种 AI 模型支持
    details: 集成 Faster-Whisper、F5-TTS、Qwen3-ASR、Edge-TTS 等 30+ 种渠道，支持本地离线与在线 API，自由组合搭配。
  - icon: 🌐
    title: 桌面软件与浏览器及命令行三模式
    details: 桌面 GUI + WebUI 网页界面 + CLI 命令行，适配本地使用、远程访问、服务器部署、Docker 容器化等多种场景。
  - icon: 🛠️
    title: 无最低硬件要求
    details: 有无英伟达显卡均可运行，笔记本、台式机都可跑。若有英伟达显卡支持开启 CUDA加速
  - icon: 💰
    title: 开源免费长期维护
    details: 完全开源（GPL-V3），无功能限制，无需登录注册，自 2023-10 月发布维护至今
---


:::details 问: 软件是否收费或需订阅？
答: 本软件开源、免费，不收取任何费用，无需注册登录或授权码，源码安装或下载 Windows 预打包版本后即可直接使用。
[查看本软件使用和许可协议](/law)
:::

:::details 问: 是否有额度、时长、功能等限制？
答: 软件本身无任何限制，支持 `本地模型、免费API、付费API` 等多种渠道，如果使用前两种(本地模型/免费API)，无需任何花费，如果使用 付费API(如 DeepSeek/Gemini)，你需自行在相应平台充值并获取密钥，将密钥填写在软件中，费用由对应厂商直接收取，软件仅提供技术对接方案。
:::

:::details 问: 翻译结果能否上传到 Youtube 等平台？版权如何解决？
答: 完全可以，上传到哪由你自行决定。至于视频内容本身是否拥有版权、是否允许二次发布，属你与权利人之间的事项，软件不涉及也无从判断。

软件集成部分开源模型(如 Whisper/OmniVoice/Qwen3-ASR 等)，若有用到，请自行搜索查看对应模型开发商的开源协议和商用条款。

:::

:::details 问: 全都免费，那你们如何盈利？
答: 这是基于兴趣创建的个人开源项目，无商业模式及盈利计划，如你所见，仅在文档网站放置部分Google广告及赞助链接，用于支持文档服务器及测试token开销。欢迎赞助，一定的赞助能帮助项目更长久维护。[捐赠链接](/about)
:::

---

::: danger ⚠️ 防骗声明

- 本软件基于 [GPL-V3 协议](https://www.gnu.org/licenses/gpl-3.0.html) 开源发布，可从 [官方 GitHub](https://github.com/jianchang512/pyvideotrans) 或 [文档站](/downpackage) 免费获取。

- **未授权任何商业销售**：淘宝、闲鱼、拼多多等平台上的付费版本均非官方渠道，开发者未授权也未从中受益。如需退款请自行联系卖家或在对应平台投诉。

- **无需登录或卡密**：下载即用，任何要求登录或输入各类验证码的均非官方原版。

- **第三方 API 费用**：软件本身免费，但使用第三方 API（如 ChatGPT、DeepSeek 等）需自行申请密钥并承担费用，与开发者无关。

[查看完整软件使用和许可协议 →](/law)

:::

---


### 软件界面

![](https://pvtr2.pyvideotrans.com/1794901542042_image.png)

![](https://pvtr2.pyvideotrans.com/1785392967672_3.png)

![](https://pvtr2.pyvideotrans.com/1785392967384_2.png)

![](https://pvtr2.pyvideotrans.com/1785392968033_4.png)

---

### 效果演示

*演示中翻英（左原片 / 右翻译）*

<div class="videowrap">
<video loading="lazy" src="https://pvtr2.pyvideotrans.com/480zh.mp4" controls></video>
<video loading="lazy" src="https://pvtr2.pyvideotrans.com/480en.mp4" controls></video>
</div>




---
