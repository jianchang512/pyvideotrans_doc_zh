---
title: 将edge-tts部署在服务器并提供中转api
date: 2025-01-05 14:37:57
description: 大家都知道微软 Edge 浏览器有一个强大的大声朗读功能，它支持几十种语言，每种语言都可选择不同的角色进行发音，效果相当出色。
---

大家都知道微软 Edge 浏览器有一个强大的大声朗读功能，它支持几十种语言，每种语言都可选择不同的角色进行发音，效果相当出色。

基于此，有开发者创建了一个名为 `edge-tts` 的 Python 包。这个包允许在程序中使用微软的 TTS 服务，为文字或字幕进行配音。例如，视频翻译软件 pyVideoTrans 就集成了 `edge-tts`，用户可以在配音渠道中直接选择它。

然而，令人遗憾的是，国内用户对微软 TTS 的滥用现象较为严重，甚至有人将其用于商业配音销售。这导致微软对国内的访问进行了限制。如果使用过于频繁，可能会出现 403 错误，只有切换 IP 或连接稳定的国外 VPN 才能继续使用。

那么，是否可以使用国外服务器搭建一个简单的中转服务供自己使用呢？这样做不仅可以提高稳定性，还能使接口兼容 OpenAI TTS，从而可以直接在 OpenAI SDK 中使用。

答案是肯定的。我最近抽空制作了一个 Docker 镜像，它可以很方便地在服务器上拉取并启动。

启动后，该服务接口完全兼容 OpenAI，只需将 API 地址更改为 `http://部署服务器ip:7899/v1`，即可无缝替代 OpenAI TTS。此外，它还可以在视频翻译软件中直接使用。

> 以下将详细介绍如何部署和使用：
> 
> 第一步：购买并开通一台美国服务器
> 
> 第二步：在防火墙中放行 7899 端口
> 
> 第三步：连接终端登录服务器
> 
> 第四步：安装 Docker
> 
> 第五步：拉取 edge-tts-api 镜像并启动 API 服务

**如果你已有服务器且已安装Docker，可直到跳到第五步拉取镜像**


## 第一步：购买并开通一台美国服务器

> 建议选择美国地区的服务器，因为限制较少或没有限制。服务器操作系统可选择 Linux 系列，以下以 Debian 12 为例，并以我个人使用的野草云为例。选择它的原因很简单：便宜且相对稳定，作为配音中转来说足够了。

如果你已经拥有欧美地区的 Linux 服务器，可以跳过本节，直接阅读下一节内容。如果没有，请继续往下阅读。

[打开此链接到野草云网站，在顶部导航栏选择 `产品服务 -> 美国 AMD VPS`](https://my.yecaoyun.com/aff.php?aff=4382) 。

![image.png](https://en.pyvideotrans.com/img/20241221155630-0.webp)

然后，选择顶部四个配置中的任意一个，应该都足够使用。

![image.png](https://en.pyvideotrans.com/img/20241221155631-1.webp)

我个人使用的是 29 元/月的配置。

点击“立即购买”按钮，进入配置页面。在这里，选择服务器操作系统为 `Debian 12`，设置服务器密码，其他保持默认即可。

![image.png](https://en.pyvideotrans.com/img/20241221155631-2.webp)

付款完成后，等待几分钟，服务器创建并启动成功后，接下来需要设置防火墙，开放 7899 端口。只有放开此端口，你才能连接到服务进行配音。

## 第二步：在防火墙中放行 7899 端口

> 如果你打算使用域名并配置 Nginx 反向代理，则无需放行端口。如果不太熟悉这些，为了简单起见，建议直接放行端口。

不同服务器和面板的防火墙设置界面各不相同。以下以我使用的野草云面板为例，其他面板可以参考。如果你知道如何放行端口，可以跳过此节，直接阅读下一节。

首先，在“我的产品与服务”中，点击刚刚开通的产品，进入产品信息和管理页面。

![image.png](https://en.pyvideotrans.com/img/20241221155632-3.webp)


![image.png](https://en.pyvideotrans.com/img/20241221155632-4.webp)

在此页面中，你可以找到服务器的 IP 地址和密码等信息。

![image.png](https://en.pyvideotrans.com/img/20241221155633-5.webp)

找到“附加工具”下的“防火墙”，点击打开。

![image.png](https://en.pyvideotrans.com/img/20241221155633-6.webp)

然后放行 7899 端口，如下图所示：

![image.png](https://en.pyvideotrans.com/img/20241221155634-7.webp)

## 第三步：连接终端登录服务器

> 如果你已经知道如何连接终端，或者有 Xshell 等其他 SSH 终端，可以跳过此步骤，直接阅读下一节。

在产品信息页面，找到 `Xterm.js Console` 并点击。然后按照下图所示操作：


![image.png](https://en.pyvideotrans.com/img/20241221155634-8.webp)


![image.png](https://en.pyvideotrans.com/img/20241221155635-9.webp)

出现上图时，按几下回车。

在显示 `Login:` 时，在其后输入 `root`，然后按回车。
![image.png](https://en.pyvideotrans.com/img/20241221155635-10.webp)


接着会出现 `Password:`，此时需要粘贴你复制的密码（如果忘记了，可以在产品信息页面找到）。

**注意：粘贴时不要使用 `Ctrl+V` 或右键粘贴，这可能会导致输入多余的空格或换行，造成密码错误。**

![image.png](https://en.pyvideotrans.com/img/20241221155635-11.webp)


按住 `Shift` 键 + `Insert` 键进行粘贴密码，防止密码正确却无法登录，然后按回车。

![image.png](https://en.pyvideotrans.com/img/20241221155636-12.webp)


登录成功后如下图所示。

![image.png](https://en.pyvideotrans.com/img/20241221155636-13.webp)


## 第四步：安装 Docker

> 如果你的服务器已经安装了 Docker 或知道如何安装，可以跳过此步骤。

依次执行以下 5 条命令，注意每条命令执行成功后再执行下一条。这些命令仅适用于 `Debian 12` 系列服务器。

在 `[root@xxxxxx~]#` 后，右键粘贴以下命令，粘贴后按回车键执行。

![image.png](https://en.pyvideotrans.com/img/20241221155637-14.webp)

命令 `sudo apt update && sudo apt install -y apt-transport-https ca-certificates curl gnupg`

命令2： `curl -fsSL https://download.docker.com/linux/debian/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg`

命令3：`echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/debian $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null`

命令4：`sudo apt update &&  sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin`

命令5：启动 Docker 服务。 `sudo systemctl start docker &&  sudo systemctl enable docker && sudo usermod -aG docker $USER`



![image.png](https://en.pyvideotrans.com/img/20241221155637-15.webp)

此命令可以右键粘贴，粘贴后按回车键。

## 第五步：拉取 edge-tts-api 镜像并启动 API 服务

输入以下命令，将自动拉取镜像并启动服务。启动成功后，你就可以在视频翻译软件或其他支持 OpenAI TTS 的工具中使用它了。

`docker run -p 7899:7899 jianchang512/edge-tts-api:latest`

![image.png](https://en.pyvideotrans.com/img/20241221155637-16.webp)

连续按 `Ctrl+C` 可以停止该服务。

> 注意，这条命令会在前台运行。如果关闭终端窗口，服务将会停止。
>
> 可以改用下面的命令，将在后台启动服务，执行后可以放心地关闭终端。
>
> `docker run -d -p 7899:7899 jianchang512/edge-tts-api:latest`

![image.png](https://en.pyvideotrans.com/img/20241221155638-17.webp)

如果没有报错，则表示启动成功。可以在浏览器中打开 `http://你的ip:7899/v1/audio/speech` 进行验证。如果出现类似下图的结果，则表示启动成功。



![image.png](https://en.pyvideotrans.com/img/20241221155638-18.webp)

## 在视频翻译软件中使用

请将软件升级到 v3.40 方可使用，升级下载地址 https://pyvideotrans.com/downpackage 

打开菜单，进入 **TTS设置->OpenAI TTS** 将接口地址更改为  **http://你的ip:7899/v1**

**SK** 可以随意填写，不为空即可。在角色列表中，用英文逗号分隔，填写你想要使用的角色。

![image.png](https://pvtr2.pyvideotrans.com/img/20241221155638-19.webp)

## 可用角色

以下是可用的角色列表。请注意，文字语言和角色必须匹配。

![image.png](https://pvtr2.pyvideotrans.com/img/20241221155639-20.webp)

```
中文发音角色：
    zh-HK-HiuGaaiNeural
    zh-HK-HiuMaanNeural
    zh-HK-WanLungNeural
    zh-CN-XiaoxiaoNeural
    zh-CN-XiaoyiNeural
    zh-CN-YunjianNeural
    zh-CN-YunxiNeural
    zh-CN-YunxiaNeural
    zh-CN-YunyangNeural
    zh-CN-liaoning-XiaobeiNeural
    zh-TW-HsiaoChenNeural
    zh-TW-YunJheNeural
    zh-TW-HsiaoYuNeural
    zh-CN-shaanxi-XiaoniNeural

英语角色：
    en-AU-NatashaNeural
    en-AU-WilliamNeural
    en-CA-ClaraNeural
    en-CA-LiamNeural
    en-HK-SamNeural
    en-HK-YanNeural
    en-IN-NeerjaExpressiveNeural
    en-IN-NeerjaNeural
    en-IN-PrabhatNeural
    en-IE-ConnorNeural
    en-IE-EmilyNeural
    en-KE-AsiliaNeural
    en-KE-ChilembaNeural
    en-NZ-MitchellNeural
    en-NZ-MollyNeural
    en-NG-AbeoNeural
    en-NG-EzinneNeural
    en-PH-JamesNeural
    en-PH-RosaNeural
    en-SG-LunaNeural
    en-SG-WayneNeural
    en-ZA-LeahNeural
    en-ZA-LukeNeural
    en-TZ-ElimuNeural
    en-TZ-ImaniNeural
    en-GB-LibbyNeural
    en-GB-MaisieNeural
    en-GB-RyanNeural
    en-GB-SoniaNeural
    en-GB-ThomasNeural
    en-US-AvaMultilingualNeural
    en-US-AndrewMultilingualNeural
    en-US-EmmaMultilingualNeural
    en-US-BrianMultilingualNeural
    en-US-AvaNeural
    en-US-AndrewNeural
    en-US-EmmaNeural
    en-US-BrianNeural
    en-US-AnaNeural
    en-US-AriaNeural
    en-US-ChristopherNeural
    en-US-EricNeural
    en-US-GuyNeural
    en-US-JennyNeural
    en-US-MichelleNeural
    en-US-RogerNeural
    en-US-SteffanNeural

日语角色：
    ja-JP-KeitaNeural
    ja-JP-NanamiNeural

韩语角色：
    ko-KR-HyunsuNeural
    ko-KR-InJoonNeural
    ko-KR-SunHiNeural

法语角色：
    fr-BE-CharlineNeural
    fr-BE-GerardNeural
    fr-CA-ThierryNeural
    fr-CA-AntoineNeural
    fr-CA-JeanNeural
    fr-CA-SylvieNeural
    fr-FR-VivienneMultilingualNeural
    fr-FR-RemyMultilingualNeural
    fr-FR-DeniseNeural
    fr-FR-EloiseNeural
    fr-FR-HenriNeural
    fr-CH-ArianeNeural
    fr-CH-FabriceNeural

德语角色：
    de-AT-IngridNeural
    de-AT-JonasNeural
    de-DE-SeraphinaMultilingualNeural
    de-DE-FlorianMultilingualNeural
    de-DE-AmalaNeural
    de-DE-ConradNeural
    de-DE-KatjaNeural
    de-DE-KillianNeural
    de-CH-JanNeural
    de-CH-LeniNeural

西班牙语角色：
    es-AR-ElenaNeural
    es-AR-TomasNeural
    es-BO-MarceloNeural
    es-BO-SofiaNeural
    es-CL-CatalinaNeural
    es-CL-LorenzoNeural
    es-ES-XimenaNeural
    es-CO-GonzaloNeural
    es-CO-SalomeNeural
    es-CR-JuanNeural
    es-CR-MariaNeural
    es-CU-BelkysNeural
    es-CU-ManuelNeural
    es-DO-EmilioNeural
    es-DO-RamonaNeural
    es-EC-AndreaNeural
    es-EC-LuisNeural
    es-SV-LorenaNeural
    es-SV-RodrigoNeural
    es-GQ-JavierNeural
    es-GQ-TeresaNeural
    es-GT-AndresNeural
    es-GT-MartaNeural
    es-HN-CarlosNeural
    es-HN-KarlaNeural
    es-MX-DaliaNeural
    es-MX-JorgeNeural
    es-NI-FedericoNeural
    es-NI-YolandaNeural
    es-PA-MargaritaNeural
    es-PA-RobertoNeural
    es-PY-MarioNeural
    es-PY-TaniaNeural
    es-PE-AlexNeural
    es-PE-CamilaNeural
    es-PR-KarinaNeural
    es-PR-VictorNeural
    es-ES-AlvaroNeural
    es-ES-ElviraNeural
    es-US-AlonsoNeural
    es-US-PalomaNeural
    es-UY-MateoNeural
    es-UY-ValentinaNeural
    es-VE-PaolaNeural
    es-VE-SebastianNeural

阿拉伯语角色：
    ar-DZ-AminaNeural
    ar-DZ-IsmaelNeural
    ar-BH-AliNeural
    ar-BH-LailaNeural
    ar-EG-SalmaNeural
    ar-EG-ShakirNeural
    ar-IQ-BasselNeural
    ar-IQ-RanaNeural
    ar-JO-SanaNeural
    ar-JO-TaimNeural
    ar-KW-FahedNeural
    ar-KW-NouraNeural
    ar-LB-LaylaNeural
    ar-LB-RamiNeural
    ar-LY-ImanNeural
    ar-LY-OmarNeural
    ar-MA-JamalNeural
    ar-MA-MounaNeural
    ar-OM-AbdullahNeural
    ar-OM-AyshaNeural
    ar-QA-AmalNeural
    ar-QA-MoazNeural
    ar-SA-HamedNeural
    ar-SA-ZariyahNeural
    ar-SY-AmanyNeural
    ar-SY-LaithNeural
    ar-TN-HediNeural
    ar-TN-ReemNeural
    ar-AE-FatimaNeural
    ar-AE-HamdanNeural
    ar-YE-MaryamNeural
    ar-YE-SalehNeural
 
 
孟加拉语角色：
    bn-BD-NabanitaNeural
    bn-BD-PradeepNeural
    bn-IN-BashkarNeural
    bn-IN-TanishaaNeural

捷克语角色
    cs-CZ-AntoninNeural
    cs-CZ-VlastaNeural

荷兰语角色：
    nl-BE-ArnaudNeural
    nl-BE-DenaNeural
    nl-NL-ColetteNeural
    nl-NL-FennaNeural
    nl-NL-MaartenNeural

希伯来语角色：
    he-IL-AvriNeural
    he-IL-HilaNeural

印地语角色：
    hi-IN-MadhurNeural
    hi-IN-SwaraNeural

匈牙利语角色：
    hu-HU-NoemiNeural
    hu-HU-TamasNeural

印尼语角色：
    id-ID-ArdiNeural
    id-ID-GadisNeural

意大利语角色：
    it-IT-GiuseppeNeural
    it-IT-DiegoNeural
    it-IT-ElsaNeural
    it-IT-IsabellaNeural

哈萨克语角色：
    kk-KZ-AigulNeural
    kk-KZ-DauletNeural
    
马来语角色：
    ms-MY-OsmanNeural
    ms-MY-YasminNeural

波兰语角色：
    pl-PL-MarekNeural
    pl-PL-ZofiaNeural

葡萄牙语角色：
    pt-BR-ThalitaNeural
    pt-BR-AntonioNeural
    pt-BR-FranciscaNeural
    pt-PT-DuarteNeural
    pt-PT-RaquelNeural

俄语角色：
    ru-RU-DmitryNeural
    ru-RU-SvetlanaNeural

瑞典语角色：
    sw-KE-RafikiNeural
    sw-KE-ZuriNeural
    sw-TZ-DaudiNeural
    sw-TZ-RehemaNeural

泰国语角色：
    th-TH-NiwatNeural
    th-TH-PremwadeeNeural

土耳其语角色：
    tr-TR-AhmetNeural
    tr-TR-EmelNeural

乌克兰语角色：
    uk-UA-OstapNeural
    uk-UA-PolinaNeural

越南语角色：
    vi-VN-HoaiMyNeural
    vi-VN-NamMinhNeural

```


## 在 OpenAI sdk 中使用

需要安装 openai 库 `pip install openai`

```
from openai import OpenAI

client = OpenAI(api_key='12314', base_url='http://你的ip:7899/v1')
with  client.audio.speech.with_streaming_response.create(
                    model='tts-1',
                    voice='zh-CN-YunxiNeural',
                    input='你好啊，亲爱的朋友们',
                    speed=1.0                    
                ) as response:
    with open('./test.mp3', 'wb') as f:
       for chunk in response.iter_bytes():
            f.write(chunk)

```

## 直接使用 requests 调用

```
import requests
res=requests.post('http://你的ip:7899/v1',data={"voice":"zh-CN-YunxiNeural",
                    "input":"你好啊，亲爱的朋友们",
                    speed=1.0 })
with open('./test.mp3', 'wb') as f:
    f.write(res.content)

```
