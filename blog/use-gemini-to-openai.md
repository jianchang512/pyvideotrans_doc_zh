---
title: Gemini API兼容OpenAI接口：教你如何在兼容应用中免费配置使用
date: 2025-05-09 18:33:00
description: Gemini 还兼容 OpenAI 的 API 接口规范。这意味着，你可以在许多支持 OpenAI API 的应用中，通过简单的配置修改，就能无缝切换到 Gemini。这一点可能很多朋友还不了解。下面，我将以 **pyVideoTrans** 这款工具为例，演示如何将其配置为使用 Gemini API。
---

# Gemini API兼容OpenAI接口：教你如何在兼容应用中免费配置使用


Gemini 系列大模型或许是被低估的。无论在模型能力、免费额度，还是服务稳定性等方面，它都丝毫不逊色于其他主流模型。特别是其开发者后台 **Google AI Studio**，不仅界面友好，操作便捷，而且提供了非常慷慨的免费使用额度。正因如此，Gemini 已成为我目前主力使用的大模型。

值得一提的是，Gemini 还兼容 OpenAI 的 API 接口规范。这意味着，你可以在许多支持 OpenAI API 的应用中，通过简单的配置修改，就能无缝切换到 Gemini。这一点可能很多朋友还不了解。

下面，我将以 **pyVideoTrans** 这款工具为例，演示如何将其配置为使用 Gemini API。

## 免费注册Google账号，获取 Gemini API KEY

1.  首先，你需要一个 Google 账号。如果你还没有，可以通过手机号免费注册。整个过程无需任何费用，但请注意，你需要具备科学上网环境才能访问相关服务。
2.  注册并登录 Google 账号后，请访问 Google AI Studio：[https://aistudio.google.com/](https://aistudio.google.com/)
3.  Google AI Studio 对部分国家/地区存在访问限制。如果你看到如下提示页面，说明你当前的“梯子”节点所在地区受限。请尝试切换到其他国家/地区的节点，直到可以正常访问为止。
    ![显示该界面，说明使用的梯子节点不被允许访问，请切换其他国家节点](https://pvtr2.pyvideotrans.com/1746785010704_image.png)
4.  成功访问后，你会看到类似下图的界面，这表示你可以开始使用 Google AI Studio 了。
    ![看到该界面，说明可用](https://pvtr2.pyvideotrans.com/1746785078147_image.png)
5.  接下来，我们需要获取 API Key。如下图所示，点击页面右上角的 `Get API key` 按钮。如果之前没有创建过，系统可能会引导你先创建一个项目，然后生成 API Key。请按照提示操作即可。
    ![按此复制api key，如果不存在key，按说明创建](https://pvtr2.pyvideotrans.com/1746785301133_image.png)

## 将信息填写到 pyVideoTrans的OpenAI API及兼容AI中

1.  打开 pyVideoTrans，找到 **菜单--翻译设置--OpenAI API 及兼容 AI** 的配置部分。
2.  将 Gemini 的 OpenAI 兼容 API 地址 `https://generativelanguage.googleapis.com/v1beta/openai/` 填入 `API URL` 输入框中。
3.  将上一步复制的 Gemini API KEY 粘贴到 `SK` 输入框中。
4.  在下方的 `填写所有可用模型` 文本框中，输入你希望使用的 Gemini 模型名称。你可以从 Google AI Studio 的界面中找到这些模型名称（例如 `gemini-2.5-flash-preview-04-17,gemini-2.5-pro-preview-05-06,gemini-2.0-flash`）。如果需要添加多个模型，请用英文逗号 `,` 分隔。
    ![如图复制想使用的模型名字](https://pvtr2.pyvideotrans.com/1746786351243_image.png)
5.  然后，从模型列表中选择你希望当前使用的那个 Gemini 模型。
    ![填写后的效果](https://pvtr2.pyvideotrans.com/1746786534548_image.png)
6.  完成以上填写后，点击“保存”按钮。
7.  **测试连接**：如果你已经在 pyVideoTrans 的主界面设置了有效的网络代理，或者你的计算机已经配置了全局代理（系统代理），此时可以点击“测试”按钮。如果测试通过且没有报错，说明配置成功，Gemini API 已经可以在 pyVideoTrans 中正常使用了。

## 出现网络连接报错怎么办？

如果点击“测试”后出现网络连接相关的错误提示，问题很可能出在网络代理配置上。

1.  请先确保配置已保存。
2.  然后，检查你所使用的科学上网工具：
    *   **是否开启了“自动配置系统代理”或“全局代理”模式？** 如果没有，尝试开启它，然后再次测试。
    *   **手动配置代理：** 如果不想或不能开启全局代理，你可以在科学上网工具中找到其提供的本地 HTTP 代理地址和端口号。通常格式为 `http://IP地址:端口号`。将这个地址完整填写到 pyVideoTrans 主界面的“网络代理”文本框中。例如，某些工具默认的本地代理地址可能是 `http://127.0.0.1:10808`。
 ![代理地址形式一般是http://127.0.0.1开头，后接英文冒号和端口号](https://pvtr2.pyvideotrans.com/1746787092585_image.png)

> 大多数科学上网工具都会提供一个本地代理的 IP 地址和端口号。其中，IP 地址通常是 `127.0.0.1`（代表本机），你需要找到该工具对应的具体端口号。然后将完整的 `http://127.0.0.1:端口号` 填入 pyVideoTrans 的网络代理设置中。

### 以下是一些常见科学工具的端口号示例：

- 如果你的工具默认端口是 `10808`，则代理地址为 `http://127.0.0.1:10808`。
 ![不同科学工具提供的默认端口不同，这个工具端口号默认是10808](https://pvtr2.pyvideotrans.com/1746786952726_image.png)


- 如果你的工具默认端口是 `7890`，则代理地址为 `http://127.0.0.1:7890`。
![这个工具默认端口是7890，那么需要填写http://127.0.0.1:7890](https://pvtr2.pyvideotrans.com/1746787289965_image.png)


正确配置代理后，再次测试连接，应该就能成功使用 Gemini API 了。

