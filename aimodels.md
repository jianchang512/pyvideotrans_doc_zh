---
title: AI大模型商家介绍
date: 2024-01-22 14:33:00
description: 国内 AI 技术也在飞速发展,这些国内 AI 服务的 API 接口完全兼容 OpenAI SDK，这意味着你可以**无需修改任何代码，即可无缝替换** OpenAI。例如 Deepseek、阿里百炼、智谱 AI、百川智能、硅基流动等
---
相比传统翻译，使用 AI 作为翻译渠道具有显著优势。OpenAI ChatGPT、Gemini、Claude 在翻译质量上表现出色，但它们需要 VPN，且付费需要国外信用卡支付，使用门槛较高，对国内用户来说并不友好。

值得庆幸的是，国内 AI 技术也在飞速发展,这些国内 AI 服务的 API 接口完全兼容 OpenAI SDK，这意味着你可以**无需修改任何代码，即可无缝替换** OpenAI。例如 Deepseek、阿里百炼、智谱 AI、百川智能、硅基流动等。

你只需要将 **API URL**、**SK (API Key)**、**模型名字** 这 3 项关键信息填写到软件的  **菜单 -- 翻译设置 -- OpenAI ChatGPT API**  中，即可立即开始使用。

无需复杂的配置，即使是零基础的小白也能轻松上手！


![image.png](https://pvtr2.pyvideotrans.com/img/20250208162853-0.webp)


##  Deepseek 深度求索

> 这是 Deepseek的官方 API 服务，不过近期不稳定

![image.png](https://pvtr2.pyvideotrans.com/img/20250208162853-1.webp)
官网地址：https://www.deepseek.com

API KEY(SK)获取地址: https://platform.deepseek.com/api_keys

API URL:  https://api.deepseek.com/v1

可用模型： deepseek-chat :即v3模型  、  deepseek-reasoner即R1推理模型



## 智谱AI

官网地址: https://bigmodel.cn

API KEY(SK)获取地址: https://bigmodel.cn/usercenter/proj-mgmt/apikeys

API URL:https://open.bigmodel.cn/api/paas/v4

可用模型： glm-4-plus、glm-4-air、glm-4-air-0111 、glm-4-airx、glm-4-long 、glm-4-flashx 、glm-4-flash

> 注意：glm-4-flash 是免费模型，无需任何花费，其他模型为收费，需保证账号内有余额

![image.png](https://pvtr2.pyvideotrans.com/img/20250208162854-2.webp)

## 百川智能

官网地址: https://www.baichuan-ai.com

API KEY(SK)获取地址: https://platform.baichuan-ai.com/console/apikey

API URL: https://api.baichuan-ai.com/v1

可用模型：Baichuan4-Turbo 、Baichuan4-Air、Baichuan4、Baichuan3-Turbo、Baichuan3-Turbo-128k、Baichuan2-Turbo

![image.png](https://pvtr2.pyvideotrans.com/img/20250208162854-3.webp)

## 月之暗面  Kimi

官网：https://www.moonshot.cn

API KEY(SK)获取地址: https://platform.moonshot.cn/console/api-keys

API URL: https://api.moonshot.cn/v1

可用模型： moonshot-v1-8k、moonshot-v1-32k 、moonshot-v1-128k	

![image.png](https://pvtr2.pyvideotrans.com/img/20250208162854-4.webp)

##  零一万物

官网：https://lingyiwanwu.com

API KEY获取地址: https://platform.lingyiwanwu.com/apikeys

API URL: https://api.lingyiwanwu.com/v1

可用模型： yi-lightning

![image.png](https://pvtr2.pyvideotrans.com/img/20250208162854-5.webp)


##  阿里百炼

> 阿里百炼是AI模型集市，提供了所有阿里系模型及其他厂家模型，包括 Deepseek-r1

官网地址：https://bailian.console.aliyun.com

API KEY(SK)获取地址: https://bailian.console.aliyun.com/?apiKey=1#/api-key

API URL: https://dashscope.aliyuncs.com/compatible-mode/v1

可用模型： 众多，具体查看 https://bailian.console.aliyun.com/#/model-market

![image.png](https://pvtr2.pyvideotrans.com/img/20250208162855-6.webp)

##  硅基流动

> 又是一个类似阿里百炼的AI集市,提供了国内主流模型，包括 deepseek-r1

官网地址：https://siliconflow.cn

API KEY(SK)获取地址: https://cloud.siliconflow.cn/account/ak

API URL: https://api.siliconflow.cn/v1

可用模型： 众多，具体查看 https://cloud.siliconflow.cn/models?types=chat

注意：硅基流动提供了 `Qwen/Qwen2.5-7B-Instruct` 免费模型，无需花费可直接使用

![image.png](https://pvtr2.pyvideotrans.com/img/20250208162855-7.webp)

##  字节火山方舟

> 类似阿里百炼的AI集市，除了汇集豆包系列模型，还有一些第三方模型,包括 deepseek-r1

官网：https://www.volcengine.com/product/ark

API KEY(SK)获取地址: https://console.volcengine.com/ark/region:ark+cn-beijing/apiKey

API URL: https://ark.cn-beijing.volces.com/api/v3

MODELS： 众多，具体查看 https://console.volcengine.com/ark/region:ark+cn-beijing/model?vendor=Bytedance&view=LIST_VIEW

注意：字节火山方舟对OpenAI SDK 的兼容性有点奇葩，不可直接填写模型名，需要提前在火山方舟控制台创建推理点，在推理点中选择要使用的模型，然后将推理点id填写到需要模型的地方，即软件中，如果觉得麻烦可以忽略，除了价格略低，并无其他优势。
查看如何创建推理点 https://www.volcengine.com/docs/82379/1099522


![image.png](https://pvtr2.pyvideotrans.com/img/20250208162855-8.webp)


## 其他兼容 OpenAI API 的使用方法

本文仅列出部分AI使用方法，其他只要兼容 OpenAI API的服务均可使用类似方法，只要确定 **API 接口地址** 和 **SK** 以及 **模型名称** 即可。

注意 API URL 一般以 **/v1**结尾。