---
title: 使用AI模型翻译字幕
date: 2025-01-05 14:37:57
description: 本文将手把手教你如何操作，让你充分利用国产AI大模型，提升视频翻译的质量和效率！
---

> 已经在使用AI做视频翻译，想要更上一层楼？ 想要翻译质量更高，成本更低？那么，是时候了解一下国内顶级的AI大模型了！
> 
> **Deepseek V3/R1、Qwen2.5** 这些国产AI，在翻译方面表现出色，而且价格比国外大模型更有优势。 更棒的是，我们可以通过阿里百炼和硅基流动这两个“大模型集市”，用一个API Key就能轻松调用它们，并将它们无缝集成到视频翻译软件中。

本文将手把手教你如何操作，让你充分利用国产AI大模型，提升视频翻译的质量和效率！


## 一、阿里百炼：海量模型，总有一款适合你！

阿里百炼就像一个 AI 模型超市，汇集了阿里通义千问系列等众多优秀模型。最大的优势在于，价格很便宜，运行稳定。

1.  **登录阿里百炼平台:**  
    访问  https://bailian.console.aliyun.com 并登录。

2.  **浏览模型并复制名称:**  
    在模型列表中，你可以看到各种可用的 AI 模型，以及它们的价格信息。 `qwen-max-latest` 和 `qwen2.5-72b-instruct` 模型目前翻译效果不错。


![image.png](https://pvtr2.pyvideotrans.com/img/20250205152710-0.webp)

点击你感兴趣的模型的“查看详情”，找到并复制它的 **模型名称**。

![image.png](https://pvtr2.pyvideotrans.com/img/20250205152711-1.webp)

3.  **创建并复制 API Key:**  
    访问 API Key 管理页面  https://bailian.console.aliyun.com/?apiKey=1#/api-key  并创建一个新的 API Key。  复制这个 Key，后面会用到。

![image.png](https://pvtr2.pyvideotrans.com/img/20250205152711-2.webp)

4.  **配置视频翻译软件：**  
    回到你的视频翻译软件，菜单中找到 **翻译设置-->OpenAI ChatGPT API** 设置页面，进行如下修改：

    *   **API URL:**  填写 `https://dashscope.aliyuncs.com/compatible-mode/v1`
    *   **SK:**  粘贴你刚才从阿里百炼复制的 API Key。
    *   **填写所有可用模型：**  填写你从阿里百炼复制的模型名称。
    *   **选择模型：**  在下拉框中选择你想使用的模型名称。

![image.png](https://pvtr2.pyvideotrans.com/img/20250205152712-3.webp)

5.  **保存并测试：**  
    点击“保存”，然后测试一下翻译功能，看看是否一切正常。
	

## 二、探索硅基流动：又一个宝藏大模型平台

硅基流动和阿里百炼类似，也是一个大模型集市，提供多种选择。

1.  **登录硅基流动平台:** 
 
    访问  https://cloud.siliconflow.cn/models  并登录。

![image.png](https://pvtr2.pyvideotrans.com/img/20250205152712-4.webp)

    这里推荐 `Qwen2.5-72b` 模型，它在稳定性和价格之间取得了很好的平衡，翻译效果也很棒。

![image.png](https://pvtr2.pyvideotrans.com/img/20250205152713-5.webp)

点击模型名称，在弹出的详情页中复制 **模型名称**。

![image.png](https://pvtr2.pyvideotrans.com/img/20250205152714-6.webp)


2.  **创建并复制 API Key:**

![image.png](https://pvtr2.pyvideotrans.com/img/20250205152714-7.webp)

3.  **配置视频翻译软件：**  
    同样，回到视频翻译软件,菜单中找到 **翻译设置-->OpenAI ChatGPT API** 设置页面：

    *   **API URL:** 填写 `https://api.siliconflow.cn/v1`
    *   **SK:** 粘贴你从硅基流动复制的 API Key。
    *   **填写所有可用模型：** 填写你复制的模型名称，如果想使用多个模型，可以用英文逗号分隔。
	*   **选择模型：**  在下拉框中选择你想使用的模型名称。

4.  **保存并测试:**
![image.png](https://pvtr2.pyvideotrans.com/img/20250205152715-8.webp)


## 三、直连 Deepseek 官方渠道 (近期不稳定，暂不可用)

如果想体验原汁原味的 Deepseek 模型，可以试试官方渠道：

1.  **注册并获取 API Key:**  
    首先，前往 Deepseek 开放平台  https://platform.deepseek.com  .

2.  **配置视频翻译软件：**  
    打开视频翻译软件，菜单中找到 **翻译设置-->OpenAI ChatGPT API**，我们稍作修改就能用上Deepseek：

    *   **API URL:**  在 "API URL" 文本框中，填写 `https://api.deepseek.com/v1`。  
    *   **SK:** 在 "SK" 文本框中，粘贴你刚才在 Deepseek 平台创建的 API Key。

3.  **选择模型：**
    * 在`填写所有可用模型`文本框内输入 `deepseek-chat,deepseek-reasoner`
    * 在`选择模型`下拉框中选中你想要使用的模型`deepseek-chat`。

    > **小贴士：** `deepseek-chat` 是 V3 模型，适合日常翻译。`deepseek-reasoner` 是 R1 模型，更擅长逻辑推理，但速度可能稍慢。

    点击“保存”，大功告成！

![image.png](https://pvtr2.pyvideotrans.com/img/20250205152715-9.webp)



## 四、选择你的翻译引擎

完成配置后，在视频翻译软件的 **翻译渠道** 选项中，选择 **OpenAI ChatGPT** 就能使用啦!

![image.png](https://pvtr2.pyvideotrans.com/img/20250205152715-10.webp)

## 总结：


*   **阿里百炼:**  价格便宜，很多模型都有免费额度，包括 Deepseek V3 和 R1。 稳定性也较高，强烈推荐！
    *   API URL: `https://dashscope.aliyuncs.com/compatible-mode/v1`
*   **硅基流动:** 又一个不错的选择，模型丰富。
    *   API URL: `https://api.siliconflow.cn/v1`

*   **Deepseek 官方渠道:** 建议使用 `deepseek-chat` 模型，翻译效果不错。 但要注意 Deepseek API 平台近期可能不太稳定无法使用。
    *   API URL：`https://api.deepseek.com/v1`

现在就开始尝试，用更优质、更经济的国产AI大模型，解锁你的视频翻译新姿势！
