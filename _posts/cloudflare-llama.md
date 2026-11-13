---
title: 在cloudflare上体验大模型
date: 2025-01-05 14:37:57
description: 想体验大模型的魅力，又苦于本地电脑性能不足？通常，我们会在本地使用像 `ollama` 这样的工具部署模型，但受限于电脑资源，往往只能运行 1.5b (15亿), 7b (70亿), 14b (140亿) 等较小规模的模型。想要部署 700 亿参数的大模型，对本地硬件来说是巨大的挑战。
---

想体验大模型的魅力，又苦于本地电脑性能不足？通常，我们会在本地使用像 `ollama` 这样的工具部署模型，但受限于电脑资源，往往只能运行 1.5b (15亿), 7b (70亿), 14b (140亿) 等较小规模的模型。想要部署 700 亿参数的大模型，对本地硬件来说是巨大的挑战。

现在，可以借助 Cloudflare 的 Workers AI 在线部署 70b 这样的大模型，并通过外网访问。它的接口兼容 OpenAI，这意味着你可以像使用 OpenAI 的 API 一样使用它。唯一的缺点是每日免费额度有限，超出部分会产生费用。如果你有兴趣，不妨尝试一下！

## 准备工作：登录 Cloudflare 并绑定域名

> 如果你还没有自己的域名，Cloudflare 会提供一个免费的账号域名。但需要注意的是，这个免费域名在国内可能无法直接访问，你可能需要使用一些“魔法”才能访问。

首先，打开  Cloudflare 官网 (https://dash.cloudflare.com) 并登录你的账号。

## 步骤一：创建 Workers AI

1.  **找到 Workers AI：** 在 Cloudflare 控制台的左侧导航栏中，找到“AI” -> “Workers AI”，然后点击“从 Worker 模板创建”。

    ![image.png](https://pvtr2.pyvideotrans.com/img/20250108142459-0.webp)

2.  **创建 Worker：** 接着点击 “创建 Worker”。

    ![image.png](https://pvtr2.pyvideotrans.com/img/20250108142500-1.webp)

3.  **填写 Worker 名称：** 输入一个由英文字母组成的字符串，这个字符串将作为你 Worker 的默认账号域名。


![image.png](https://pvtr2.pyvideotrans.com/img/20250108142500-2.webp)


![image.png](https://pvtr2.pyvideotrans.com/img/20250108142501-3.webp)


4.  **部署：** 点击右下角的“部署”按钮，完成 Worker 的创建。

## 步骤二：修改代码，部署 Llama 3.3 70b 大模型

1. **进入代码编辑：** 部署完成后，你会看到如下图所示的界面。点击“编辑代码”。

   ![image.png](https://pvtr2.pyvideotrans.com/img/20250108142501-4.webp)

2.  **清空代码：** 删除编辑器中所有预设的代码。

    ![image.png](https://pvtr2.pyvideotrans.com/img/20250108142502-5.webp)

3.  **粘贴代码：** 将以下代码复制粘贴到代码编辑器中：

    >  这里我们使用的是 `llama-3.3-70b-instruct-fp8-fast` 模型，它拥有 700 亿参数。
    >
    > 你也可以在 [Cloudflare 模型页面](https://developers.cloudflare.com/workers-ai/models/) 找到其他模型进行替换，例如 Deepseek 开源模型。但目前 `llama-3.3-70b-instruct-fp8-fast` 是规模最大、效果最好的模型之一。
![image.png](https://pvtr2.pyvideotrans.com/img/20250108142502-6.webp)


    ```javascript
    const API_KEY='123456';
    export default {
      async fetch(request, env) {

        let url = new URL(request.url);
        const path = url.pathname;

        const authHeader = request.headers.get("authorization") || request.headers.get("x-api-key");
        const apiKey = authHeader?.startsWith("Bearer ")  ? authHeader.slice(7)  : null;
                            
        if (API_KEY && apiKey !== API_KEY) {

          return new Response(JSON.stringify({
            error: {
                message: "Invalid API key. Use 'Authorization: Bearer your-api-key' header",
                type: "invalid_request_error",
                param: null,
                code: "invalid_api_key"
            }
          }), {
              status: 401,
              headers: {
                  "Content-Type": "application/json",
              }
          });
        }

        if (path === "/v1/chat/completions") {
          const requestBody = await request.json();
           // messages - chat style input
		  const {message}=requestBody
		  let chat = {
			messages: message
		  };
          let response = await env.AI.run('@cf/meta/llama-3.3-70b-instruct-fp8-fast', requestBody);
        
          let resdata={
            choices:[{"message":{"content":response.response}}]
          }    
          return Response.json(resdata);
        }  
       
      }
    };
    ```
4.  **部署代码：** 粘贴代码后，点击“部署”按钮。

![image.png](https://pvtr2.pyvideotrans.com/img/20250108142503-7.webp)


## 步骤三：绑定自定义域名

1.  **返回设置：** 点击左侧的返回按钮，回到 Worker 的管理页面，找到“设置” -> “域和路由”。

![image.png](https://pvtr2.pyvideotrans.com/img/20250108142503-8.webp)


2.  **添加自定义域：** 点击“添加域”，然后选择“自定义域”并输入你已经绑定到 Cloudflare 的子域名。

![image.png](https://pvtr2.pyvideotrans.com/img/20250108142504-9.webp)


## 步骤四：在兼容 OpenAI 的工具中使用

添加自定义域名后，你就可以在任何兼容 OpenAI API 的工具中使用这个大模型了。

*   **API Key：**  是你代码中设置的 `API_KEY`，默认为 `123456`。
*   **API 地址：**  `https://你的自定义域名/v1`

得益于 Cloudflare 强大的 GPU 资源，使用起来会非常流畅。

## 注意事项

*   **免费额度：**  Cloudflare Workers AI 每天提供 10k 的免费 token 用量，超出部分会产生费用。
*  **费用详情：** 你可以在  Cloudflare 官方定价页面 (https://developers.cloudflare.com/workers-ai/platform/pricing/) 查看详细的费用信息。


![image.png](https://pvtr2.pyvideotrans.com/img/20250108142504-10.webp)

