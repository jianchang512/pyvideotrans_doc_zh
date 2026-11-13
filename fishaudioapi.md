---
title: Fish.audio API 配音渠道
date: 2024-01-22 14:33:00
description: 从 v4.16 起增加了 fish.audio 配音渠道
---

# Fish.audio 配音渠道

从 v4.16 起增加了 fish.audio 配音渠道


## 使用方法

0. 首先 [注册fish.audio网站并登陆](https://fish.audio/?aff=KSOYHGBR4IOFC)
1. 到 [fish.audio网站控制台](https://fish.audio/zh-CN/app/api-keys/) 创建 API 密钥
2. 填写到软件 `菜单--TTS设置---Fish.audio` 的 api key 文本框内
3. 并在此界面选择要使用的模型，支持`s2.1-pro,s2-pro,s2.1-pro-free,drama-3`, 除 `s2.1-pro-free`外，其他必须在 [fish.audio 控制台开通plus或pro会员才可使用](https://fish.audio/zh-CN/app/team/?tab=plans)  . `s2.1-pro-free`模型仅可创建5分钟左右的配音


## 更新配音角色

由于 fish.audio 角色众多，累计数万，软件已为每个语言内置100个配音角色(按评分倒序)，如果你想使用自己创建的音色，请在 [fish.audio 我的声音库中自行创建](https://fish.audio/zh-CN/app/my-voices/) 然后到软件的菜单--TTS设置---Fish.audio，点击`更新我的声音`，软件会拉取`我的声音库中你创建的声音`并添加到对应语言配音角色顶部。

![](https://pvtr2.pyvideotrans.com/1791991938129_image.png)


如果你想为每个语言增加其他配音角色，请打开`软件/videotrans/voicejson/fishaudio.json`，找到某个语言对应的区块，例如中文
```
 "zh": {
        "testnverguo": "0e80d0e46742480d9ed89784ce7c8e99",
        "王琨声音模型10.17t1": "4f201abba2574feeae11e5ebf737859e",
        "蒋介石": "918a8277663d476b95e2c4867da0f6a6",
        "麦当劳": "4066d617322e41abb30ed70eaeaf273f",
        "郑翔洲": "ca8fb681ce2040958c15ede5eef86177",
        "AD学姐": "7f92f8afb8ec43bf81429cc1c9199cb1",
        "丁真": "54a5170264694bfc8e9ad98df7bd89c3",
        "女大学生": "5c353fdb312f4888836a9a5680099ef0",
        "影视解说": "39ea63baf6c0480cb8148dc7955db78e",
	}
```

你可以在 `"zh":` 下一行增加一行，格式为 `"随便定义在软件中显示的名称":"必须填写复制的模型id",`，然后保存重新启动软件，即可在软件中使用

![](https://pvtr2.pyvideotrans.com/1791992263348_image.png)
