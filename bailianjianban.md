---
title: 阿里百炼大模型集市
date: 2024-01-22 14:33:00
description: 随着人工智能技术的飞速发展，视频翻译的门槛已大大降低，即使实现完全本地离线、零成本的方案也并非难事
---
![](https://pvtr2.pyvideotrans.com/img/bailian.png)

随着人工智能技术的飞速发展，视频翻译的门槛已大大降低，即使实现完全本地离线、零成本的方案也并非难事。

然而，本地部署方案最大的挑战在于部署复杂和受限于硬件性能，模型往往较小，翻译质量也难以达到最优。`pyvideotrans` 完整版提供了本地和在线 API 两种方案，虽然功能强大，但对于新手来说，光是下载就可能成为一道难题——不含模型的安装包就高达 1.9GB，加上模型后体积更是飙升至 5GB 以上。

为了解决这些问题，继 `302.ai` 简版之后，我们又推出了阿里百炼简版。此版本无需下载模型，对硬件配置也无特殊要求。您只需在阿里云百炼开通服务，获取 API KEY，即可快速体验视频翻译的便捷。

简版功能包括视频翻译、语音识别、字幕配音和字幕翻译，满足日常基本需求。

与完整版不同，简版功能均依赖于平台的 API 服务。在平台提供的免费额度用尽后，您需要为继续使用付费。但考虑到其便捷的部署和更高的翻译质量，以及API服务日益降低的价格，对于追求效率的用户而言，这无疑是值得的。

当然，如果您完全不考虑付费选项，仍然可以继续使用功能全面的 `pyvideotrans` 完整版。


> **百炼简版下载地址** 
>
> 百度网盘：https://pan.baidu.com/s/1XsAt8Vt1_IccOKt0QAvC_g?pwd=6rgd
>
> Github:  https://github.com/jianchang512/pyvideotrans/releases/download/v3.36/pyvideotrans-ali-bailian-3.88.7z


## 完整版和百炼简版对比表格：

| 特性          | `pyvideotrans` 完整版                                   | `pyvideotrans` 百炼简版                                 |
| ----------- | ------------------------------------------------------ | ---------------------------------------------------- |
| **软件体积**    | 不含模型 1.9GB，含模型 5GB+                                  | 130MB                                                |
| **使用容易度**  | 配置复杂，自定义性高                                        | 使用简单，填写 API KEY 即可                                |
| **是否需要 VPN** | Gemini、ChatGPT、Google 渠道需要                          | 不需要                                                 |
| **使用成本**    | 可完全免费，完全本地离线使用                                | 需要开通阿里云百炼服务，免费额度消耗完毕后需付费                             |
| **功能**        | 功能强大，除简版全部功能外，还支持更多其他功能                       | 仅支持视频翻译、语音识别、语音合成、字幕翻译                             |
| **配音角色**    | 支持较多，可通过 API 支持更多第三方 TTS 服务                     | 阿里百炼模型仅支持中英德意泰语言，内置 edge-tts 可支持更多其他语言             |

## 如何选择版本：

*   **`pyvideotrans` 完整版适合：** 
    *   希望完全免费使用。
    *   具备一定的动手能力，愿意折腾。
    *   能够使用 VPN。
    *   想要深入了解和掌握更多细节功能。

*   **`pyvideotrans` 百炼简版适合：**
    *   不想在部署和配置上花费过多精力，只想简单使用。
    *   愿意为 API 服务付费。
    *   不熟悉或不希望使用 VPN。



> 以下是如何开通阿里云百炼和阿里云OSS的操作说明，以及在软件中的填写说明


## 一：创建阿里云百炼 API KEY

1. 首先需要有阿里云账号并经过实名认证 

  到此注册登录并实名认证 https://www.aliyun.com
 
2. 获取 阿里百炼的 API KEY

在登录后，直接打开该地址，直到 API KEY 获取页面 https://bailian.console.aliyun.com/?apiKey=1#/api-key

如图直接创建

![image.png](https://pvtr2.pyvideotrans.com/img/20241219154333-0.webp)

创建后查看复制就可以了

![image.png](https://pvtr2.pyvideotrans.com/img/20241219154334-1.webp)

多数模型都是有免费额度的

## 二：创建 阿里云OSS Bucket

> 为什么还需要这个玩意呢？因为阿里云的 语音识别API 不支持直接上传音视频文件，必须要把音视频的网络URL地址传递给它，然后它在服务器上通过该url下载音视频进行识别。
>
> 不至于为此专门自己搭建个服务器吧，最简单的方式就是直接使用阿里云OSS，上传到OSS中，并传给API一个内网地址，还能避免产生下载流量。


**1. 登录阿里云后，打开网址开通OSS服务**

直接打开该地址  https://oss.console.aliyun.com/overview
如果没有开通过，会提示你开通

**2. 开通后界面如下，开始创建一个 Bucket**

如下图点击 `创建Bucket`

![image.png](https://pvtr2.pyvideotrans.com/img/20241219154334-2.webp)

**注意必须选择 华北2(北京) 区域，才可内网使用**

![image.png](https://pvtr2.pyvideotrans.com/img/20241219154335-3.webp)

其他保持默认即可。

**3. 开启 公共读 权限**

这个必须要开启，否则无法访问

创建成功后，点击左上角`Bucket列表`，找到刚刚创建的名称，点击进入该Bucket的管理界面

![image.png](https://pvtr2.pyvideotrans.com/img/20241219154335-4.webp)

进入后如下图所示，点击`阻止公共访问`

![image.png](https://pvtr2.pyvideotrans.com/img/20241219154336-5.webp)

点击后如图，默认是开启状态，将它关闭。

![image.png](https://pvtr2.pyvideotrans.com/img/20241219154337-6.webp)

![image.png](https://pvtr2.pyvideotrans.com/img/20241219154337-7.webp)

确认关闭后，继续点击 “读写权限”，然后点击“设置”，再选中“公共读”
注意这里需要先点击“设置”，才可选择“公共读”


![image.png](https://pvtr2.pyvideotrans.com/img/20241219154337-8.webp)

选择“公共读”后弹出提示点击“继续修改”

![image.png](https://pvtr2.pyvideotrans.com/img/20241219154338-9.webp)

然后保存即可


![image.png](https://pvtr2.pyvideotrans.com/img/20241219154338-10.webp)

> 不必担心它提醒的产生额外流量费用，因为在 华北2(北京) 节点是内网访问，而且所上传的文件仅在语音识别阶段由内网访问使用，当你在视频翻译工作完毕后，可随时删掉已上传的所有文件。


## 三：获取访问 AccessKey

要上传文件到OSS，需要 AccessKey

在创建完OSS后，直接打开该地址 https://ram.console.aliyun.com/profile/access-keys

按下图选择，不用理会它的建议。

![image.png](https://pvtr2.pyvideotrans.com/img/20241219154338-11.webp)

进入页面后，点击左侧的 “创建 AccessKey”


![image.png](https://pvtr2.pyvideotrans.com/img/20241219154339-12.webp)

然后可能会验证手机号，验证通过后会显示自动创建好的 AccessKey ID 和 AccessKey Secret

![image.png](https://pvtr2.pyvideotrans.com/img/20241219154339-13.webp)



![image.png](https://pvtr2.pyvideotrans.com/img/20241219154339-14.webp)

记住这2串信息。


## 四：将阿里百炼信息填写到软件中

以上创建的 OSS Bucekt 名称、百炼的API KEY、 AccessKey ID 和 AccessKey Secret 填写到软件中，如下图所示。


![image.png](https://pvtr2.pyvideotrans.com/img/20241219154340-15.webp)


## 软件中用到的阿里百炼模型

1. 语音识别阶段，即将音视频中说话声转为字幕阶段，使用的是`SenseVoiceSmall`模型，可支持二十多种语言，有一定的免费额度
2. 在语音合成，即根据字幕配音阶段，使用的是 `CosyVoice` `Sambert` 及`edge-tts` 三者的结合，其中`edge-tts`是微软的免费语音合成服务，`CosyVoice` `Sambert` 是阿里百炼的语音合成模型，有一定免费额度。
3. 在字幕翻译阶段，使用的是通义千问大模型 `qwen-plus-1125,qwen-plus-1127,qwen-turbo-1101,qwen-max,qwen-max-latest,qwen-plus,qwen2.5-72b-instruct` 。以数字结尾的模型有免费额度，其他没有

## 注意事项

1. 如果用到视频翻译或音视频转字幕功能，必须开通OSS并填写Bucket名称和AccessKey，否则无法使用
2. 如果其他功能均正常，但音视频转字幕即语音识别功能出错，那么很可能是因为没有创建OSS，或没有开启Bucket的公共读权限。
3. 视频翻译软件本身是免费下载和使用的，第三方api产生的费用与软件无关。