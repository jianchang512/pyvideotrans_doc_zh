---
title: 翻译渠道
date: 2025-06-22
description: 翻译渠道用于将语音识别生成的原始字幕翻译为目标语言字幕
---

# 翻译渠道（字幕翻译）

翻译渠道的功能是把原始语言的字幕翻译成其他语言，比如把中文字幕变成英文字幕，或者反过来。它能调用各种翻译服务，将语音识别生成的字幕精准、快速地翻译成你想要的目标语言。![](https://pvtr2.pyvideotrans.com/1787031240204_image.png)

> 部分翻译服务需要你提供 API 地址、密钥（SK）等信息。你可以在软件顶部的菜单栏中找到「翻译设置」选项，轻松完成配置。
>
> [翻译结果可能出现空白字幕行或大堆文本，具体原因点击查看](/faq17)，解决方法：`菜单 → 工具 → 高级选项 → 字幕翻译 → 传统翻译渠道每批字幕行数/AI翻译每批字幕行 → 都设为 1`

---

## 免费翻译渠道

这类渠道通常免费，但可能存在网络限制或使用频率限制。

*   **[Google 翻译](/googletranslate)**：翻译质量可靠。不过，在中国大陆地区使用需要"科学上网"。
*   **[Microsoft 翻译](/microsoft)**：微软出品，无需特殊网络环境即可使用。但短时间内请求次数太多时可能会暂时不可用。

## 本地翻译模型

*   **[M2M100 本地模型](/m2m100)**：本地模型翻译，第一次使用在线下载模型。下载地址 https://modelscope.cn/models/himyworld/videotrans/files
*   **Hy-MT2-1.8B 本地模型**：腾讯的文字翻译模型，第一次使用在线下载模型。下载地址 https://huggingface.co/tencent/Hy-MT2-1.8B/tree/main
	
	*只要CUDA可用，无论是否选中`启用CUDA加速`，都将优先尝试使用*
	
	> 如果首次下载模型失败，可打开该地址，下载所有文件覆盖到`软件目录/models/models--tencent--Hy-MT2-1.8B`
	>
	> 默认使用 1.8B 小尺寸的模型，如果你想使用 7B/30B 更大的模型，请手动到该地址 https://huggingface.co/tencent/Hy-MT2-7B/tree/main  下载所有文件放到 `软件目录/models/models--tencent--Hy-MT2-1.8B` 文件夹内覆盖

---

## 需要申请 API Key 的专业翻译服务

这些是专业的机器翻译平台，通常需要注册账户、创建应用并获取密钥（API Key）才能使用。它们的服务更稳定，翻译质量也更有保障。

*   **[百度翻译](/baidu)**：百度官方提供的翻译服务。你需要访问[百度翻译开放平台](https://fanyi-api.baidu.com/)，创建自己的应用，并获取 AppID 和密钥。请注意，该服务仅限中国大陆 IP 使用。
*   **[腾讯翻译](/tencent)**：腾讯云旗下的机器翻译服务。你需要登录[腾讯云](https://cloud.tencent.com/product/tmt)，开通相关服务并创建访问密钥（SecretID 和 SecretKey）。同样，此服务也仅限中国大陆 IP 使用。
*   **[阿里机器翻译](/alibaba-machine-translation)**：来自阿里云的专业翻译服务。你需要前往阿里云官网开通服务。
*   **[DeepL 翻译](/deepl)**：以高质量和自然的翻译效果而闻名。你需要在其[官网](https://www.deepl.com)注册并使用国际信用卡开通服务。

---

## AI 大模型翻译渠道

利用前沿的人工智能模型进行翻译，翻译结果更智能、更贴近人类语言习惯。

*   **[DeepSeek](/deepseek-ai)**：一家专注于大模型研发的公司。你需要前往其开放平台申请 API 密钥。
*   **[字节火山大模型](/zijiehuoshan)**：由字节跳动火山引擎提供。你需要前往其官网开通服务并创建推理点。
*   **[智谱 AI](/zhipu-ai)**：国内领先的 AI 公司。你需要访问[智谱 AI 开放平台](https://open.bigmodel.cn/)申请 API 密钥。
*   **[阿里百炼 API](/qwen-mt)**：阿里云推出的大模型服务平台。你需要前往[阿里百炼平台](https://www.aliyun.com/product/bailian)申请 API 密钥。
*   **[硅基流动 (SiliconFlow)](/siliconflow-ai)**：专注于 AI 技术服务的公司。你需要访问其官网申请 SK 密钥。
*   **[302.AI 翻译](/302ai)**：访问 `302.ai` 网站申请 appkey 即可使用。
*   **[infistar.cc 翻译](https://infistar.cc/register?aff=9H6H7RR9&ref_source=link)**：AI 聚合平台，一个key使用160+模型。
*   **api-route**：AI聚合平台 https://www.api-route.com
*   **[OpenRouter.ai](/openrouter-ai)**：一个集成了多种 AI 模型的平台。你需要前往其官网申请 SK 密钥。
*   **[OpenAI (ChatGPT)](/openai)**：大名鼎鼎的 ChatGPT，翻译效果出众。你可以使用 OpenAI 官方模型，也可以配置兼容的第三方或中转 API。
*   **[Gemini 翻译](/gemini-recognition)**：Google 出品的强大 AI 模型。你需要前往 Google AI 平台申请 Gemini 的 API 密钥，国内使用需要科学上网。
*   **[AzureGPT 翻译](/azure)**：微软 Azure 云平台提供的 AI 翻译服务，你需要开通 Azure 服务。
* MinimaxAI | 在 翻译设置--MinimaxAI--选择使用的模型 |

---

## 自行部署与定制

适合有一定技术能力的开发者，可以让你拥有更高的自由度和控制权。

*   **[DeepLX 翻译](/deeplx)**：一个可以让你免费使用 DeepL 服务的项目，需要你自己在本地或服务器上进行部署。
*   **[LibreTranslate 翻译](/libretranslate)**：一款开源的机器翻译软件，你需要自行部署才能使用。
*   **[兼容 AI/本地模型翻译](/localllm)**：如果你在自己的电脑或服务器上部署了 AI 大模型（需兼容 OpenAI 的接口），可以在这里填写 API 地址直接调用。
*   **[LiteLLM](https://docs.litellm.ai/docs)**：需本地部署使用的多渠道代理API。
*   **[自定义翻译 API](/transapi)**：如果你具备编程能力，可以编写自己的翻译 API。只要按照指定的格式返回数据，就可以无缝集成到我们的软件中。
