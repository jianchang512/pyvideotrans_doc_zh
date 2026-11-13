---
title: 自定义 tts api
date: 2024-01-22 14:33:00
description: 内置支持的第三方 API 接口，可对接任意 TTS 服务
---

> **自定义 TTS API 渠道**
>
> 自定义 TTS API 渠道允许你对接任意第三方 TTS 服务。只要你的 API 接口符合规定的协议格式，就可以在视频翻译软件中使用。

**适用场景：**
- 已有自建的 TTS 服务
- 使用第三方 TTS 中转服务
- 需要对接特殊的语音合成接口

**从 v4.11 起，除了支持以前的 `application/x-www-form-urlencoded` 请求接口外，还额外支持基于 Gradio WebUI 的 API接口**


##  方法一(必须写代码)：基于 application/x-www-form-urlencoded 的 POST 请求接口

::: details  点击查看方法一的详细使用


### 请求方式

- 方法：`POST`
- Content-Type：`application/x-www-form-urlencoded`

### 请求参数

| 参数名 | 类型 | 说明 |
|--------|------|------|
| `text` | string | 需要合成的文本 |
| `language` | string | 文字所属语言代码（如 `zh-cn`, `en`, `ja`, `ko` 等） |
| `voice` | string | 配音角色名称 |
| `rate` | string | 语速调整值，格式为 `0` 或 `+数字%` 或 `-数字%`，代表在正常速度基础上进行加减速的百分比 |
| `ostype` | string | 操作系统类型：`win32`、`mac` 或 `linux` |
| `extra` | string | 额外参数（可在软件中配置） |

如果所选音色是某个参考音频或 `clone`，会以`file`字段名向接口发送参考音频二进制数据

### 支持的语言代码

```
zh-cn, zh-tw, en, ja, ko, ru, de, fr, tr, th, vi, ar, hi, hu, es, pt, it
```

### 响应格式

返回 JSON 格式数据：

```json
{
    "code": 0,
    "msg": "ok",
    "data": "https://example.com/audio.mp3"
}
```

**字段说明：**

| 字段 | 说明 |
|------|------|
| `code` | 状态码：`0` 表示成功，`>0` 表示失败 |
| `msg` | 状态信息：成功时为 `ok`，失败时为错误原因 |
| `data` | 成功时返回 MP3 文件的完整 URL 地址，失败时为空 |

### data 字段支持的格式

API 返回的 `data` 字段支持以下几种格式：

1. **URL 地址**：以 `http` 开头的完整 URL，软件会自动下载音频文件
2. **Base64 数据**：以 `data:audio` 开头的 Base64 编码音频数据
3. **Hex 编码音频**：JSON 对象中包含 `audio` 字段，值为 Hex 编码的音频数据



### 在视频翻译软件中使用

#### 第一步：配置 API 地址

1. 打开软件，进入 **菜单 → TTS设置 → 自定义 TTS API**
2. 在 **API 地址** 中填写你的接口地址
3. 如果有额外参数，在 **extra** 字段中填写

#### 第二步：测试连接

1. 点击 **测试** 按钮
2. 如果返回成功，说明接口配置正确
3. 保存设置

#### 第三步：使用配音

1. 回到主界面
2. 在 **配音渠道** 中选择 `自定义 TTS API`
3. 选择目标语言和配音角色
4. 开始配音

### 实现示例

以下是一个简单的 Python Flask 实现示例：

```python
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/tts', methods=['POST'])
def tts():
    text = request.form.get('text', '')
    language = request.form.get('language', '')
    voice = request.form.get('voice', '')
    rate = request.form.get('rate', '0')
    
    # 在这里调用你的 TTS 服务
    # audio_url = your_tts_service(text, voice, rate)
    
    return jsonify({
        "code": 0,
        "msg": "ok",
        "data": audio_url  # 返回音频文件的 URL
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
```

### 注意事项

- API 地址必须以 `http://` 或 `https://` 开头
- 返回的 JSON 格式必须严格符合协议要求
- 音频文件必须是 MP3 格式
- 如果返回 URL，必须是可直接访问的完整地址
- 建议 API 服务部署在本地（如 `127.0.0.1`）以获得最佳性能

### 常见问题

| 问题 | 解决方案 |
|------|----------|
| API URL error | 检查地址格式是否正确 |
| Connection refused | 确保 API 服务正在运行 |
| 返回数据格式错误 | 检查 JSON 格式是否符合协议 |
| 无法下载音频 | 检查返回的 URL 是否可访问 |

:::

----

## 方法二：通过 Gradio WebUI 自定义接入任意声音克隆 TTS

很多优秀的开源 TTS（如 Index-TTS、F5-TTS、CosyVoice 等）都提供了基于 **Gradio** 的 WebUI 界面。`pyVideoTrans(v4.11)` 起已支持**通用 Gradio API 接入通道**。

---

### ⚠️ 接入前必读（核心前提）
1. **界面必须是 Gradio 开发的**（页面底部会有 `Use via API` 或`通过API使用`字样）。
2. 该模型在 WebUI 中 **必须支持声音克隆（参考音频克隆）** 功能。

---

### 接入实操步骤（以 Index-TTS 2.5 为例）

> **演示前提**：假设你已经成功启动了 Index-TTS 2.5 的 WebUI 网页（其他 TTS 的操作逻辑完全相同）。

---

### 第一步：打开 WebUI 页面底部的 API 文档

1. 浏览器打开 TTS 的 WebUI 界面，滚动页面到**最底部**。
2. 找到并点击右下角的小字 **`Use via API`**（或 `通过API使用`）。

![](https://pvtr2.pyvideotrans.com/1787238479223_4.png)

> 💡 **提示**：如果页面底部完全找不到 `API` 字样，说明该 WebUI 启动时禁用了 API。如果自己不会改，可以将该 WebUI 的启动源码（通常是 `app.py` 或 `webui.py`）发给 AI，让 AI 帮你开启 API 功能。

---

### 第二步：找到“语音克隆”接口与核心参数

点击后会进入 API 说明页面。页面中可能会列出多个接口，我们需要找到**负责生成克隆音频**的那个接口（英文界面可借助浏览器右键翻译）。

![](https://pvtr2.pyvideotrans.com/1787239885726_image.png)

![](https://pvtr2.pyvideotrans.com/1787239901626_image.png)

![](https://pvtr2.pyvideotrans.com/1787239918168_image.png)


**API接口可能非常多，在Index-TTS2.5中只有下面这个才是语音克隆接口**

![](https://pvtr2.pyvideotrans.com/1787238503237_1.png)

*`=`号左侧是参数名，右侧是参数值*

在这个接口下，我们需要找出软件对接所需的**关键参数**。通常第一个参数和标注了 **`Required`（必填）** 的参数是必须配置的：

![](https://pvtr2.pyvideotrans.com/1787238513089_1.png)

下拉查看参数说明列表：

![](https://pvtr2.pyvideotrans.com/1787238591829_image.png)

#### 📝 参数类型与规则通俗讲解：
* **`api_name`（接口名称，必填）**：即告诉软件调用哪个功能端点。拉到该功能说明的最下方即可看到，例如 Index-TTS 2.5 是 `/gen_single`，也就是 `API name` 后对应的这个值。

![](https://pvtr2.pyvideotrans.com/1787238976830_image.png)

* **配音文本参数（必填）**：通常叫 `text` 或 `tts_text`等。index-tts 2.5中是`text`
* **参考音频参数（必填）**：通常叫 `prompt`、`ref_audio`、`prompt_audio`、`prompt_wav` 等, index-tts2.5中叫`prompt`。
* **参考音频文本（选填/视模型而定）**：通常叫 `prompt_text` 或 `ref_text`。Index-TTS 2.5 不需要，但大部分模型都是需要的。
* **语言/枚举类参数（注意 `Literal` 标记）**：如果参数后面写着 `Literal[...]`，表示**单选参数**，它的值必须**完全等于**方括号里列出的其中一个选项（区分大小写）。

![](https://pvtr2.pyvideotrans.com/1787240104963_image.png)

  * 比如 `lang_choice: Literal['ZH', 'EN', 'JA', 'AR', 'ES']`，代表只能填 `ZH`、`EN`、`JA`、`AR`、`ES` 指定语言代码。
  * 比如 `emo_control_method: Literal['Same as the voice reference', ...]`，我们选用第一项 `Same as the voice reference`（代表语气跟随参考音频）。

---

### 第三步：创建并编写 `gradio_api.txt` 配置文件

接下来，我们需要把上面找到的参数告诉 pyVideoTrans。

1. 进入 pyvideotrans 软件根目录（即 `sp.exe`或`sp.py` 所在的文件夹）。
2. 在该目录下**新建一个文本文档**，命名为 **`gradio_api.txt`**。
![](https://pvtr2.pyvideotrans.com/1787240893068_image.png)
3. 打开该文件，按 **`参数名=参数值`** 的格式逐行填写（一行一个），类似下图。
![](https://pvtr2.pyvideotrans.com/1787240977190_image.png)


#### ⚠️ 重点：动态替换占位符（固定格式）
因为字幕翻译配音时，**配音文本**和**参考音频**是每句/每个人物动态变化的，因此这些项的值要填写为软件专用的“代号”：

| 参数作用 | 右侧固定填写的值（代号） | 说明 |
| :--- | :--- | :--- |
| **配音目标文本** | `tts_text` | 软件会自动替换为每行字幕文字 |
| **参考音频文件** | `tts_audio` | 软件会自动替换为所选角色的克隆音频路径 |
| **参考音频对应的文字** | `tts_audio_text` | 某些模型需要，自动替换为参考音频的台词 。如果模型不需要，则不要填写该行参数|

以 **Index-TTS 2.5** 为例，我们在 `gradio_api.txt` 中填入以下内容：

```ini
emo_control_method=Same as the voice reference
prompt=tts_audio
text=tts_text
lang_choice=ZH
emo_ref_path=tts_audio
api_name=/gen_single
```

![](https://pvtr2.pyvideotrans.com/1787239384505_image.png)

填写完成后，**保存并关闭**文件。

---

### 第四步：在软件中填入 WebUI 地址

1. 打开 `pyvideotrans` 软件。
2. 点击顶部菜单栏：**设置** -> **TTS设置** -> **自定义TTS API**。
3. 在地址栏中填入你的 WebUI 运行地址（例如 `http://127.0.0.1:7860/`），点击保存。

![](https://pvtr2.pyvideotrans.com/1787239459880_image.png)

---

### 第五步：开始配音与角色选择

配置完成后，在软件主界面的配音渠道中选择自定义接口：

1. 在主界面**角色列表**中选择你的参考音频（或选择 `clone` 音色），软件在合成时就会自动调用你配置好的 Gradio TTS 接口进行声音克隆。

![](https://pvtr2.pyvideotrans.com/1787239513520_image.png)

2. 如需添加更多克隆音色，可点击软件顶部菜单：**设置** -> **TTS设置** -> **设置参考音频** 进行添加和管理。

![](https://pvtr2.pyvideotrans.com/1787240254575_image.png)


----

## 几个示例
> 均根据官方自带 webui.py 创建，如果ui有变更，将失效
>
> 若有问题请附带官方demo地址或api端点参数截图评论

### index-tts 2.5 gradio_api.txt填写如下
```
emo_control_method=Same as the voice reference
prompt=tts_audio
text=tts_text
lang_choice=ZH
emo_ref_path=tts_audio
api_name=/gen_single

```

### F5-TTS  gradio_api.txt填写如下
```
gen_text_input=tts_text
ref_audio_input=tts_audio
ref_text_input=tts_audio_text
remove_silence=false
randomize_seed=false
seed_input=0
api_name=/basic_tts
```

### omnivoice gradio_api.txt填写如下
```
text=tts_text
lang=Auto
ref_aud=tts_audio
ref_text=tts_audio_text
instruct=
du=0
api_name=/_clone_fn
```

### qwen3-tts gradio_api.txt填写如下
```
ref_audio=tts_audio
ref_text=tts_audio_text
target_text=tts_text
language=Auto
use_xvector_only=false         
model_size=1.7B
api_name=/generate_voice_clone

```

