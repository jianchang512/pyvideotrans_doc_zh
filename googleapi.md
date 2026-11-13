---
title: Cloudflare 中创建一个 Worker 来反代 Google翻译API
date: 2024-01-22 14:33:00
description: 自备一个域名，然后使用 Cloudflare 提供的 Worker 服务来反向代理 Google 翻译 API，可以免魔法使用Google翻译API
---
> 自备一个域名，然后使用 Cloudflare 提供的 Worker 服务来反向代理 Google 翻译 API，可以免魔法使用Google翻译API。

## 在 Cloudflare 中创建一个 Worker 来反代该 API

以下是详细步骤：

1. **打开 Cloudflare 控制台**：访问 https://dash.cloudflare.com/

2. **创建一个 Worker**：
   
   登录后，在左侧面板中选择 "Workers"，然后点击 "创建"， 创建一个新的 Worker 服务。

   ![](https://pvtr2.pyvideotrans.com/images/428a26fc7fba2849daf9671ceb3f6882.jpg)

3. **为你的 Worker 起个名称**，然后点击 保存。

   ![](https://pvtr2.pyvideotrans.com/images/38580f55d1044a40b0d3f3d9ffbca8d0.jpg)
   **保存后，继续右下角点击完成**

![](https://pvtr2.pyvideotrans.com/images/550732eaacaae0eed501062db8c40dcd.jpg)
   

4. **编辑代码**：

   完成上述步骤后，右上方点击 "编辑代码" 进入代码编辑页。删除默认代码，并用以下代码替换，然后点击右上角的 “部署”按钮进行部署。
   
   > 此代码已对翻译结果做解析，将直接返回组装后的结果文本
   > 
   > 成功代码类似
   > 
   > {code:0,msg:"ok",text:"这里是翻译结果文本"}
   > 
   > 失败结果：
   > {code:1,msg:"失败原因"}

   ![](https://pvtr2.pyvideotrans.com/images/dd482a349bcde786c98227a611b9bc6f.jpg)

```
   
export default {
  async fetch(request, env, ctx) {
    let url = new URL(request.url);
    if(url.pathname.startsWith('/')){
      url.hostname="translate.googleapis.com"; 
      let new_request = new Request(url, request)
      let response=await fetch(new_request)
      if(response.status!==200){
        return new Response(JSON.stringify({code:1,msg:response.text}), {
          status: 200, 
          headers: {
            'content-type': 'application/json',
          },
        });
      }


      let jsonData = await response.json();
      let str=jsonData[0].map(it=>{
        return it[0]
      })

      let data={code:0,msg:"ok",text:str.join('')}

      return new Response(JSON.stringify(data), {
        status: 200, 
        headers: {
          'content-type': 'application/json', 
        },
      });
    }
    return await env.ASSETS.fetch(request);
  },
};

```

5. **获取路由 URL 地址**：

   部署成功后，点击左侧返回，然后依次点击“设置”--“触发器”
   ![](https://pvtr2.pyvideotrans.com/images/3ad225424ebd3fd84e4a5de6b5b47e86.jpg)
   
   ![](https://pvtr2.pyvideotrans.com/images/33dd79a23f12924d9f14c89db9c769ed.jpg)

    点击上方的 "添加自定义域" 绑定自己的域名。强烈建议这样做，因为 `workers.dev` 域名在国内已被墙，无法直接使用。通过绑定自定义域名，便可以免去使用科学上网工具。


## 在视频翻译软件中使用

打开左上角设置菜单--自定义翻译API，填写你的api地址和密钥(随意即可),然后测试下


> ![](https://pvtr2.pyvideotrans.com/images/4bcff733fdcd14be3b9f56ffa3d1541d.jpg)

没问题后，翻译渠道里选择“TransAPI” 就可以愉快的免费使用Google翻译api可。

> ![](https://pvtr2.pyvideotrans.com/images/8eb685c9a5cd1ccfeb049cf7f83eb1f2.jpg)