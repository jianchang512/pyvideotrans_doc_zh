---
title: Qwen-TTS 配音渠道使用
date: 2025-07-19 14:33:00
description: Qwen-TTS是一项先进的语音合成技术，它可以将文字转换成听起来非常真实、自然的人声。它的一大亮点是能够根据文本内容自动调整语音的节奏和情感，让配音听起来不再"机械化"。更酷的是，除了标准中英文，它还支持北京话、上海话（吴语）和四川话三种方言，为您的视频内容增添更多趣味和地道的感觉
---

# 配音渠道：Qwen-TTS

> Qwen-TTS 是阿里通义千问团队推出的先进语音合成技术，能够将文字转换成非常真实、自然的人声。它的一大亮点是能根据文本内容自动调整语音的节奏和情感。
>
> 支持的语言：中文、英文、日文、韩文、德文、法文、俄文、葡萄牙文、西班牙文和意大利文

pyVideoTrans 支持 2 种形式的 Qwen3-TTS：
- **本地内置版（离线版）**：软件内置，无需联网，固定使用 0.6B 模型
- **阿里百炼 API（在线版）**：通过阿里云 API 调用，需联网和 API Key

---

## 一、Qwen3-TTS 本地内置（离线版）

### 前置条件

| 条件 | 说明 |
|------|------|
| pyVideoTrans 版本 | ≥ v4.04 |
| 模型大小 | 约 5GB（首次使用自动下载） |
| 硬件 | 建议有 NVIDIA 显卡（GPU 加速） |


### 下载模型（首次使用自动下载）

第一次使用将自动下载 Base 和 CustomVoice 两套模型，合计大约 5GB，请耐心等待。

#### 手动下载方法（可选）

如果自动下载太慢，可手动下载：

1. 打开软件目录下的 `models` 文件夹，新建 2 个文件夹：
   - `models--Qwen--Qwen3-TTS-12Hz-0.6B-Base`
   - `models--Qwen--Qwen3-TTS-12Hz-0.6B-CustomVoice`

2. 打开 [Base 模型下载页](https://huggingface.co/Qwen/Qwen3-TTS-12Hz-0.6B-Base/tree/main)，将所有文件和文件夹下载后放到 `软件目录/models/models--Qwen--Qwen3-TTS-12Hz-0.6B-Base` 文件夹内

3. 打开 [CustomVoice 模型下载页](https://huggingface.co/Qwen/Qwen3-TTS-12Hz-0.6B-CustomVoice/tree/main)，同样下载所有文件和文件夹到 `软件目录/models/models--Qwen--Qwen3-TTS-12Hz-0.6B-CustomVoice` 文件夹内

### 切换到 1.7B 尺寸模型：合成速度更慢，效果更好

**实际是使用 1.7B 模型文件覆盖 0.6B 模型文件，即可使用替换**

1. 打开该地址 [https://huggingface.co/Qwen/Qwen3-TTS-12Hz-1.7B-Base/tree/main]，下载所有文件，覆盖到  `软件目录/models/models--Qwen--Qwen3-TTS-12Hz-0.6B-Base` 文件夹内
2. 打开该地址 [https://huggingface.co/Qwen/Qwen3-TTS-12Hz-1.7B-CustomVoice/tree/main] ，下载所有文件和文件夹到 `软件目录/models/models--Qwen--Qwen3-TTS-12Hz-0.6B-CustomVoice` 文件夹内



### 配置参考音频

适用于基于一段 3~10 秒的参考音频来克隆声音。

**操作路径**：菜单 → 工具 → TTS设置 → Qwen-tts(本地)

填写参考音频和该音频对应文字内容，一行一组。

#### 参考音频格式

```
音频文件名#音频对应的文字内容
```

#### 参考音频示例

```
n10.wav#你说四大皆空，却为何紧闭双眼，你若挣开眼睛看看我，我不相信，你两眼空空
```

将 `n10.wav` 音频文件放在软件目录下的 `f5-tts` 文件夹内，然后在 `#` 号后填写音频对应说话文本。

![](https://pvtr2.pyvideotrans.com/1770875840273_image.png)

![](https://pvtr2.pyvideotrans.com/1770875857868_image.png)


----
----

::: danger 新手或不熟悉阿里百炼的用户，不建议使用
阿里百炼的API非常混乱，所选地域不同(如华北2、新加坡、华东等)可使用的模型不同，需要配置的API地址也不同；
API KEY 分地域，不同地域的不通用；
更改所选模型，可能需要更换调用端口；
不同模型可使用的音色不相同；
使用中会遇到很多莫名其妙问题。
:::

## 二、阿里百炼 API/Qwen3-TTS （在线版）

> qwen3-tts 模型支持 10 种语言和多种中文方言
> 模型名称：`qwen3-tts-flash`
> [点此查看 qwen3-tts 具体音色](https://help.aliyun.com/zh/model-studio/qwen-tts-voice-list)

### 第一步：获取并配置 API KEY

1. 点击此链接访问阿里云百炼平台：[https://bailian.console.aliyun.com/?tab=model#/api-key](https://bailian.console.aliyun.com/?tab=model#/api-key)

![](https://pvtr2.pyvideotrans.com/1752918657802_image.png)

2. 登录您的阿里云账户（若无账户，按提示注册一个即可）
3. 在 API-KEY 管理页面，点击「创建 API-KEY」，系统会自动生成一串以 `sk-` 开头的字符，这就是您的 API KEY，请**复制**这串字符，回到 pyVideoTrans 软件，在顶部菜单栏找到 `TTS设置 → Qwen TTS`
![](https://pvtr2.pyvideotrans.com/1752918572496_image.png)

4. 点击页面右上角`业务空间`，复制当前所用业务空间ID，回到 pyVideoTrans，粘贴到 `TTS设置 → Qwen TTS`的业务空间ID中
![](https://pvtr2.pyvideotrans.com/1783523420003_image.png)


5. 在弹出的「Qwen3 TTS」配置窗口中，将 API KEY 粘贴到「API KEY」输入框中。点击「测试」按钮试听效果，如果能听到声音说明配置成功。最后点击「保存」。

![](https://pvtr2.pyvideotrans.com/1752918603143_image.png)

### 第二步：在视频翻译中使用 Qwen3-TTS

配置完成后，在主界面的「配音渠道」下拉菜单中选择「Qwen3 TTS」，在旁边的「配音角色」菜单中选择您喜欢的音色。

- **Cherry**：标准女声
- **Sunny**：四川话配音
- **Dylan**：北京话
- 更多音色见下方列表

![](https://pvtr2.pyvideotrans.com/1752918616233_image.png)

### 第三步：在批量配音和多角色配音中使用

Qwen-TTS 的强大功能同样适用于批量处理任务：

- **批量为字幕配音**：在「批量为字幕配音」界面，下方「配音渠道」中选择「Qwen TTS」和您想要的角色
- **字幕多角色配音**：在「字幕多角色配音」功能区为不同角色分配 Qwen-TTS 的不同音色

![](https://pvtr2.pyvideotrans.com/1752918636303_image.png)

---

## 三、可用音色列表

以下是 Qwen3-TTS 支持的所有音色（在线版）：

| 中文名 | 英文代码 | 类型 |
|--------|----------|------|
| 芊悦(Cherry) | Cherry | 标准女声 |
| 苏瑶(Serena) | Serena | 标准女声 |
| 晨煦(Ethan) | Ethan | 标准男声 |
| 千雪(Chelsie) | Chelsie | 标准女声 |
| 茉兔(Momo) | Momo | 标准女声 |
| 十三(Vivian) | Vivian | 标准女声 |
| 月白(Moon) | Moon | 标准女声 |
| 四月(Maia) | Maia | 标准女声 |
| 凯(Kai) | Kai | 标准男声 |
| 不吃鱼(Nofish) | Nofish | 标准男声 |
| 萌宝(Bella) | Bella | 童声 |
| 詹妮弗(Jennifer) | Jennifer | 英文女声 |
| 甜茶(Ryan) | Ryan | 英文男声 |
| 卡捷琳娜(Katerina) | Katerina | 俄语女声 |
| 艾登(Aiden) | Aiden | 英文男声 |
| 沧明子(Eldric Sage) | Eldric Sage | 英文男声 |
| 乖小妹(Mia) | Mia | 标准女声 |
| 沙小弥(Mochi) | Mochi | 标准女声 |
| 燕铮莺(Bellona) | Bellona | 标准女声 |
| 田叔(Vincent) | Vincent | 标准男声 |
| 萌小姬(Bunny) | Bunny | 标准女声 |
| 阿闻(Neil) | Neil | 标准男声 |
| 墨讲师(Elias) | Elias | 标准男声 |
| 徐大爷(Arthur) | Arthur | 标准男声 |
| 邻家妹妹(Nini) | Nini | 标准女声 |
| 诡婆婆(Ebona) | Ebona | 标准女声 |
| 小婉(Seren) | Seren | 标准女声 |
| 顽屁小孩(Pip) | Pip | 童声 |
| 少女阿月(Stella) | Stella | 标准女声 |
| 博德加(Bodega) | Bodega | 标准男声 |
| 索尼莎(Sonrisa) | Sonrisa | 标准女声 |
| 阿列克(Alek) | Alek | 标准男声 |
| 多尔切(Dolce) | Dolce | 标准女声 |
| 素熙(Sohee) | Sohee | 韩语女声 |
| 小野杏(Ono Anna) | Ono Anna | 日语女声 |
| 莱恩(Lenn) | Lenn | 标准男声 |
| 埃米尔安(Emilien) | Emilien | 法语男声 |
| 安德雷(Andre) | Andre | 标准男声 |
| 拉迪奥·戈尔(Radio Gol) | Radio Gol | 标准男声 |
| 上海-阿珍(Jada) | Jada | 上海话女声 |
| 北京-晓东(Dylan) | Dylan | 北京话男声 |
| 南京-老李(Li) | Li | 南京话男声 |
| 陕西-秦川(Marcus) | Marcus | 陕西话男声 |
| 闽南-阿杰(Roy) | Roy | 闽南话男声 |
| 天津-李彼得(Peter) | Peter | 天津话男声 |
| 四川-晴儿(Sunny) | Sunny | 四川话女声 |
| 四川-程川(Eric) | Eric | 四川话男声 |
| 粤语-阿强(Rocky) | Rocky | 粤语男声 |
| 粤语-阿清(Kiki) | Kiki | 粤语女声 |

---

## 常见问题

### 1. 本地版首次下载模型很慢

首次使用将自动下载约 4GB 模型文件，请耐心等待。


### 2. API 版报错 `AuthenticationError`

API KEY 无效或过期，请重新登录阿里云百炼平台获取新的 API KEY。

### 3. 配音效果不自然

- 尝试更换不同的音色
- 在本地版中尝试填写语音风格指导词
- 确保参考音频质量良好（发音清晰、无噪音）
