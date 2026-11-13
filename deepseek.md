---
title: 免费体验 671B 满血版 Deepseek-r1
date: 2024-01-22 14:33:00
description: 想免费体验 671B 满血版 Deepseek-r1 网页加 API 调用？市面上选择不多
---
想免费体验 671B 满血版 Deepseek-r1 网页加 API 调用？市面上选择不多！

-  deepseek.com官方，网页版免费并且效果最佳，无免费api额度，并且当前已暂停充值。
-  字节火山方舟/硅基流动等：提供 R1 满血版和 API，但没有免费额度。
-  百度智能云千帆 ModelBuilder：限时免费提供 R1 满血版和 API，可惜接口不兼容 OpenAI，使用不方便。
-  302.ai及其他云服务商，基本都是提供网页版部分免费额度，但不提供api免费额度

综合体验下来，目前真正有足够免费额度，且提供满血 R1 及兼容 OpenAI API 调用的，我只找到了：**腾讯云Ti平台** 和 **阿里云百炼**。


>   
> 
> | 平台                                                        | 网页版免费体验 | API 免费调用 | API兼容OpenAI | 备注   |
> | --------------------------------------------------------- | ------- | -------- | ----------- | ---- |
> | 字节火山方舟                                              | ✅       | 付费        | ✅           | api需付费/网页体验部分免费额度  |
> | 硅基流动                                               | ❌       | 付费        | ✅           | 需付费  |
> | 302.AI                                               | 部分免费额度       | 付费        | ❌           | 需付费  |
> | 百度智能云千帆 ModelBuilder                                      | ✅       |  ✅        | ❌           | 限时免费 |
> | 腾讯云大模型                                                    | ✅       | ✅        | ✅           | 免费到 2-26日 |
> | 阿里云百炼                                                     | ✅       | ✅        | ✅           | 免费100万token |
> 
> 


## 阿里云百炼

**开通流程及 API 使用说明**

**一、服务开通**

1.  **注册与登录：** 访问 阿里云百炼控制台  https://bailian.console.aliyun.com  ，注册阿里云账号并登录。
2.  **实名认证：** 按照提示完成实名认证。
3.  **API Key 创建：** 进入  API Key 管理页面，创建新的 API Key   https://bailian.console.aliyun.com/?apiKey=1 

**二、API 资源与限制**

1.  **免费额度：**   100 万 Token 的免费调用额度。
2.  **调用限制：**
    *   每分钟调用次数上限：60 次
    *   每分钟最大 Token 消耗量：100,000

**三、OpenAI 兼容 API**

为了方便开发者使用，阿里云百炼提供了与 OpenAI API 兼容的接口：

*   **API URL:** `https://dashscope.aliyuncs.com/compatible-mode/v1`
*   **API Key (SK):** 使用您在“API Key 管理页面”创建的 API Key。
*   **可用模型：** `deepseek-r1`、`deepseek-v3`

## 腾讯云大模型知识引擎

**开通流程及 API 使用说明**

**一、服务开通**

1.  **账号注册与登录：** 访问  腾讯云控制台   https://console.cloud.tencent.com  ，注册腾讯云账号并登录。
2.  **实名认证：**  https://console.cloud.tencent.com/developer/auth  根据页面提示完成实名认证流程。
3.  **大模型知识引擎服务开通：**
    *   进入  大模型知识引擎服务页面   https://console.cloud.tencent.com/lkeap   
    *   按照页面指引开通“大模型知识引擎”服务。

![image.png](https://pvtr2.pyvideotrans.com/img/20250208231500-0.webp)
4.  **API Key 创建：**
    *   进入大模型知识引擎控制台。
    *   在 API 密钥管理页面创建新的 API Key。

![image.png](https://pvtr2.pyvideotrans.com/img/20250208231501-1.webp)

![image.png](https://pvtr2.pyvideotrans.com/img/20250208231501-2.webp)


5.  **API Key 复制：** 复制已创建的 API Key。

![image.png](https://pvtr2.pyvideotrans.com/img/20250208231501-3.webp)

**二、OpenAI 兼容 API**

腾讯云大模型提供兼容 OpenAI API 的接口：

*   **API URL:** `https://api.lkeap.cloud.tencent.com/v1`
*   **API Key (SK):** 使用您在上一步复制的 API Key。
*   **可用模型：** `deepseek-r1`、`deepseek-v3`

**三、在线体验**

您可以通过以下地址在线体验 DeepSeek 系列模型：

https://console.cloud.tencent.com/tione/v2/aimarket/detail/deepseek_series?detailTab=deep_seek_v1&regionId=4 

首次访问可能需要申请模型使用权限。
![image.png](https://pvtr2.pyvideotrans.com/img/20250208231502-4.webp)

**四、免费额度及有效期**

*   **免费期限：** 截止至北京时间 2025 年 2 月 25 日 23:59:59。
*   **收费说明：** 免费期结束后，将按照实际用量进行收费。
  ![image.png](https://pvtr2.pyvideotrans.com/img/20250208231502-5.webp)