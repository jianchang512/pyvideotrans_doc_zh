import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vitepress'

export default defineConfig({
	
	ignoreDeadLinks: true,
	cleanUrls:true,
    sitemap: {
		hostname: 'https://pyvideotrans.com',
		lastmodDateOnly:true,
		transformItems: (items) => {
		  // 添加新选项或修改/过滤现有选项
		  items=items.map(it=>{
			it['changefreq']='daily'
			return it
		  })
		  
		  return items
		}
	},
  head: [
  	['meta', {name:'google-adsense-account', content:'ca-pub-3406672479111316'} ], 
  	['meta', {name:'keywords', content:'pyVideoTrans,pyVideoTrans官网,pyVideoTrans文档,pyVideoTrans下载,pyVideoTrans翻译软件'} ], 
    ['link', { rel: 'stylesheet', href: '/styles/custom.css?v=9'}],
	
	[
	  'script',
	  {
	    async:"",
		crossorigin:"anonymous",
		src:"/trans.js?v=20260814-1",
	  }
	],
	[
		'script',
		{
			async:"",
			crossorigin:"anonymous",
			src:"https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3406672479111316"
		}
	], 
	[
		'script',
		{
			async:"",
			src:"https://fundingchoicesmessages.google.com/i/pub-3406672479111316?ers=1"
		}
	], 
	
	[
		'script',
		{
			async:"",
			crossorigin:"anonymous",
			src:"https://www.googletagmanager.com/gtag/js?id=G-REESJ8DJBE"
		}
	]
  ], 

  title: "pyVideoTrans官网-开源免费视频翻译配音软件 pyvideotrans.com pyvideotrans github github.com/jianchang512/pyvideotrans",
  description: "pyVideoTrans视频翻译软件：是一款将视频从一种语言翻译到另一种语言发音和字幕的开源软件,是开源免费使用简单的视频翻译配音软件，pyVideoTrans官网，pyvideotrans.com ,github.com/jianchang512/pyvideotrans 本软件通过识别视频中的说话声音来进行翻译和处理，与视频中原有的字幕无关。只要视频里有人类说话的声音，就可以进行处理，无论视频是否包含字幕。",
  lastUpdated:true,
  markdown: {
    image:{
			lazyLoading: true
		},
    theme: "one-dark-pro",
    lineNumbers: true, // 显示代码行数
  },
  themeConfig: {
	logo:"https://pvtr2.pyvideotrans.com/images/logo.png",
	siteTitle:"pyVideoTrans",
	outlineTitle: 'Title', // 大纲标题
	outline: 'deep', // 大纲显示层级：number：只显示 | [number, number]：指定层级范围显示 | 	'deep'：全部显示 | false：不显示
    nav: [
				  { text: '首页', link: '/' },
				  { text: '文档', link: '/getstart' },
				  { text: '下载', link:'/downpackage'},
				  { text: '问答', link:'https://bbs.pyvideotrans.com'},
				  { text: '赞助', link:'/about'},
				  { text: '资源', items:[
					  {text:"预览 WebUI",link:"https://huggingface.co/spaces/mortimerme/pyvideotrans"},
					  {text:"博客列表",link:"/bloglist"},
					  {text:"Win版FFmpeg",link:"https://www.gyan.dev/ffmpeg/builds/#git-master-builds"},
					  {text:"安装uv",link:"https://docs.astral.sh/uv/getting-started/installation/"},
					  {text:"CUDA 12.8",link:"https://developer.nvidia.com/cuda-12-8-1-download-archive"},
					  {text:"cuDNN 9",link:"https://developer.nvidia.com/cudnn-9-11-0-download-archive?target_os=Windows&target_arch=x86_64"},
					  {text:"faster-whisper",link:"https://huggingface.co/collections/Systran/faster-whisper"},
					  {text:"Visual Studio",link:"https://visualstudio.microsoft.com/zh-hans/free-developer-offers/"},
					  {text:"sherpa-onnx",link:"https://k2-fsa.github.io/sherpa/onnx/"},
					  {text:"python3.10",link:"https://www.python.org/downloads/release/python-31020/"},
					  {text:"硬字幕提取",link:"https://pyvideotrans.com/ocrsp"},
				  ]},
				  { text: 'English', link:'https://en.pyvideotrans.com'},
		],
	search: {
		provider: 'local',
		options: {
			appId: "WTORNCA1LD",
			apiKey: "d877f2feafb115eb526d349a521be0d0",
			indexName: "pyvideotrans"
		}
    },

    sidebar: [
      {
        text: '基础使用',
		collapsed: false,
        items: [
          { text: 'Windows版下载', link: '/downpackage' },
          { text: 'MacOS/Linux安装', link: '/deply' },
          { text: '使用文档', link: '/getstart' },		  		  
		  { text: '单视频模式', link: '/danshipin' }, // 说话人识别		  

		          

		  { text: "语音识别所有渠道",link:"/yuyinshibiequdao"}, 
		  { text: "字幕翻译所有渠道",link:"/fanyiqudao"}, 
		  { text: "文字配音所有渠道",link:"/peiyinqudao"}, 
		  
		  { text: '语音克隆', link: '/multi-role-dubbing' },		  
		  { text: "导入本地字幕或人声",link:"/localsrt"}, 

		  { text: '最佳配置推荐', link: '/bester' },		  
          { text: '短视频优化', link: '/duanshipin' },
		  
		    
		  
		  { text: '手动下载模型', link: '/aboutmodels' },
		  { text: '常见问题FAQ', link: '/faq' }
        ]
      },
	  
	  {
        text: '语音识别渠道',
		collapsed: true,
        items: [
		  { text: '全部语音识别渠道说明', link: '/yuyinshibiequdao' },
		  { text: 'faster-whisper(本地内置)', link: '/faster' },
		  { text: 'openai-whisper(本地内置)', link: '/openaiwhisper' },
          { text: 'Qwen-ASR(本地内置)', link: '/qwenasrlocal' },         
          { text: '阿里FunASR(本地内置)', link: '/funasr' },         
          { text: '字节语音识别大模型极速版', link: '/zijierecognmodel' },
		  { text: 'Whisper.cpp语音识别',link:'/whisper-cli'},
          { text: '阿里百炼Qwen3-ASR语音识别', link: '/qwen-mt' },
          { text: 'OpenAI语音识别API', link: '/openairecogn' },
          { text: 'Elevenlabs.io语音识别', link: '/elevenlabsrecogn' },
          { text: 'Parakeet-tdt语音识别', link: '/parakeet' },
          { text: 'Deepgram.com语音识别', link: '/deepgram' },
          { text: 'faster-whisper-xxl.exe语音识别', link: '/xxl' },
		  { text: "Whisperx-api语音识别",link:"/whisperx-api"},
          { text: '智谱AI GLM-ASR语音识别', link: '/zhipu-ai' },
          { text: 'STT语音识别API', link: '/stt' },
          { text: '自定义语音识别API', link: '/recognapi' },
          { text: 'Whisper.NET(AMD显卡加速)', link: '/whisper_net_setup' },
  		  { text: "说话人识别",link:"/shuohuaren"}
        ]
      },
	  
	  {
		text:"字幕翻译渠道",
		collapsed: true,
		items:[
			{ text: '全部字幕翻译渠道说明', link: '/fanyiqudao' },

			{ text: 'Microsoft翻译(免费)', link: '/microsoft' },
			{ text: 'Google翻译(免费)', link: '/googletranslate' },
			{ text: 'M2M100翻译(本地内置)', link: '/m2m100' },
			{ text: 'DeepSeek', link: '/deepseek-ai' },
			{ text: '百度翻译', link: '/baidu' },          
			{ text: '腾讯翻译', link: '/tencent' },          
			{ text: '阿里巴巴机器翻译', link: '/alibaba-machine-translation' },          
			{ text: 'DeepL翻译', link: '/deepl' },
			{ text: 'DeepLX翻译', link: '/deeplx' },
			{ text: '字节火山大模型翻译', link: '/zijiehuoshan' },          
			{ text: '302.AI翻译', link: '/302ai' },
			{ text: 'ChatGPT翻译', link: '/openai' },          
			{ text: 'Gemini翻译', link: '/gemini-recognition' },          
			{ text: 'LibreTranslate翻译(本地API)', link: '/libretranslate' },          
			{ text: 'AzureGPT翻译', link: '/azure' },          
			{ text: '智谱AI', link: '/zhipu-ai' },
			{ text: 'Minimaxi AI', link: '/minimaxi' },
			{ text: '阿里百炼API', link: '/qwen-mt' },
			{ text: '硅基流动', link: '/siliconflow-ai' },
			{ text: 'OpenRouter.ai', link: '/openrouter-ai' },
			{ text: '自定义翻译api', link: '/transapi' },
			{ text: '本地大模型/国产AI接入', link: '/localllm' }
		]
	  },
	  {
		text:"文字配音渠道",
		collapsed: true,
		items:[			
			{ text: '全部配音渠道说明', link: '/peiyinqudao' },
			{ text: 'Edge-TTS(免费)', link: '/edgetts' },
			{ text: 'Qwen3-TTS(本地内置)', link: '/qwen-tts' },
			{ text: 'Audio.cpp(本地)', link: '/audiocpp' },
			{ text: 'VITS/Piper-TTS(本地内置)', link: '/vitspiper' },
			{ text: 'OmniVoice-TTS(本地API)', link: '/omnivoice' },
			{ text: 'GPT-SoVITS(本地API)', link: '/gptsovits' },
			{ text: 'IndexTTS/VoxCPM/FireRedTTS3', link: '/gradiowin' },
			{ text: 'CosyVoice3', link: '/cosyvoice' },
			{ text: 'ChatterBox(本地内置)', link: '/chatterbox' },
			{ text: 'Minimaxi配音', link: '/minimaxi' },
			{ text: '字节语音合成模型2.0', link: '/doubao2tts' },
			{ text: '302.AI接入配音', link: '/302ai' },
			{ text: 'ChatTTS', link: '/chattts' },
			{ text: 'FishTTS', link: '/fishtts' },
			{ text: 'Gemini-TTS', link: '/gemini-tts' },
			{ text: 'Kokoro-TTS', link: '/kokorotts' },
			{ text: 'Azure TTS', link: '/azuretts' },
			{ text: 'OpenAi-TTS', link: '/openaitts' },
			{ text: 'Elevenlabs.io', link: '/elevenlabstts' },
			{ text: 'x.ai TTS', link: '/xaitts' },
			{ text: 'xiaomi TTS', link: '/mitts' },
			{ text: '智谱AI GLM-TTS', link: '/zhipu-ai' },
			{ text: '自定义TTS-API', link: '/ttsapi' }
			
		]
	  },
	  
	  
	  
	   {
        text: '常见问题',
		collapsed: true,
        items: [
			{ text: "新增目标语言",link:"/newlanguage"},	

			{ text: '高级选项', link: '/adv' },		  
		    { text: '修改提示词', link: '/prompt' },	
		    { text: '字幕语音画面对齐', link: '/subtitle-sound-alignment' },
			{ text: "优化断句效果",link:"/youhua"},
			{ text: "调节VAD精确控制语音识别",link:"/vad"},
			{ text: '优化本地大模型接入', link: '/llmbetter' },		
			{ text: '提高AI渠道翻译字幕的质量', link: '/aitranslate' },
			
			{ text: '说话人识别', link: '/shuohuaren' }, // 说话人识别			

			{ text: '为什么翻译后会出现“空白字幕行”？', link: '/faq17' },
			{ text: '使用参考音频后合成声音后乱糟糟', link: '/aittserror' },
			
			{ text: 'Windos上配置CUDA和cuDNN', link: '/gpu' },
			{ text: '源码部署FunASR报错 paraformer-zh is not registered', link: '/blog/paraformer-zh-is-not-registered' },
		]
	  },
	  
	  
	  
	   {
		text:"其他功能",
		collapsed: true,
		items:[
			{ text: 'CLI命令行', link: '/cli' },
			{ text: 'WebUI界面', link: '/webui' },
			
		    { text: '语音转录功能', link: '/speech2text' },
		    { text: '文字配音功能', link: '/text2speech' },
		    { text: '翻译字幕功能', link: '/translate-srt' },	

			{
				text:"提取视频硬字幕为SRT",
				link:"/ocrsp"
			},
			{
				text:"Youtube视频下载",
				link:"/youtubedownload"
			},
			
		]
	  },
	   {
		text:"关于本项目",
		collapsed: false,
		items:[
			{ text: '模型下载地址', link:'/aboutmodels'},
			{ text: '软件技术架构', link:'/yuanli'},
			{ text: '渠道扩展与二开指南', link:'/pyvideotrans-Channel-expansion-secondary-development'},
			{ text: '音画字幕对齐原理', link:'/blog/Synchronize'},
			{ text: '博客列表', link:'/bloglist'},
			
			{ text: '技术支持', link:'/support'},
			{ text: '小额捐赠', link:'/about'},
			
			{ text: '软件许可协议', link: '/law' },
			{ text: '文档使用协议', link: '/xieyi' },
			{ text: '隐私政策', link: '/yinsizhengce' },
			{ text: '联系我们', link: '/lianxi' },
			{ text: '关于我们', link: '/guanyu' },
			
			{ text: '为什么网站有广告？', link: '/whyad' },
		]
	  }
	 ],
    
	socialLinks: [
      { icon: 'github', link: 'https://github.com/jianchang512' }
    ],
	footer: {
				 message: '<a   href="/guanyu">关于我们</a> | <a   href="/lianxi">联系我们</a> | <a   href="/yinsizhengce">隐私政策</a> | <a   href="/xieyi">网站使用协议</a> | <a  href="/law">软件许可协议</a> |  <a  href="/whyad">为什么网站有广告？</a> | <a   href="https://github.com/jianchang512/pyvideotrans">GitHub</a>',
      copyright: 'Copyright © 2019-present pyvideotrans.com'
				}
  }
})
