---
title: MCP是什么，有什么用，如何使用？
date: 2025-04-02 00:25:14
description: 本文详细介绍了Anthropic提出的“模型上下文协议”（MCP），一个用于提升AI模型与外部数据和工具交互效率及安全性的标准化通信协议。文章首先区分了AI领域中容易混淆的两个“MCP”概念，明确聚焦于Anthropic的Model Context Protocol。随后，深入剖析了AI交互的痛点以及MCP通过结构化JSON通信解决这些问题的方式，阐释了其核心角色（system, user, assistant, tool_use, tool_result）。进一步，文章介绍了MCP的生态系统，包括MCP服务器（强调FastMCP的重要性）、MCP SDK和MCP连接器，并说明了它们如何协同工作。最后，文章总结了MCP的核心优势、最新行业动态，并提供了一个基于FastMCP快速构建天气查询MCP服务器和客户端的入门示例，强调了FastMCP在简化开发方面的优势。

---



### 彻底搞懂 AI 里的 MCP：聚焦 Anthropic 的“模型上下文协议”及其生态

AI 世界日新月异，“MCP”是个容易让人迷糊的术语。先把界限划清楚：

- **MCP 概念 1（多智能体协作）**：有时指“多智能体协作平台”（Multi-Agent Collaboration Platform），比如 AutoGen，让多个 AI 组队干活。很酷，但不是今天的重点。
- **MCP 概念 2（Anthropic 协议）**：这是 Anthropic（Claude 的开发者）推出的正式标准，全称“模型上下文协议”（Model Context Protocol），旨在让 AI 模型（如 Claude）与外部数据和工具高效、安全地交互。

**本文重点**：我们聚焦 Anthropic 的 MCP，带你弄懂它是什么、为什么重要，以及如何用 `MCP` 快速开发！

---

### 第一站：为什么需要 MCP？AI 交互的“痛点”

想象你在用 Claude 干活，任务一复杂，可能就翻车：

- **指令混乱**：背景、步骤、限制混成一团，AI 抓不住重点。
- **上下文丢失**：对话长了，AI 忘了你最初的要求。
- **工具调用不顺**：想让 AI 查天气、读文件，它要么不会用，要么用错。
- **安全风险**：恶意输入（Prompt Injection）可能让 AI 出错。

MCP 是个**标准化的通信协议**，像 AI 和外部世界的“通用语言”，目标是让信息结构清晰、流程顺畅、安全可靠。

---

### 第二站：MCP 的核心：结构化通信

MCP 用 JSON 格式把信息分成明确的部分，每个部分有自己的角色（Role）。官方定义的核心角色包括：

- **system**：全局设定，比如：“你是天气助手，能查实时天气。”
- **user**：用户输入，比如：“北京天气如何？”
- **assistant**：AI 回复，可能包含工具调用（tool_use）。
- **tool_use**：调用工具的指令，比如：`{ "name": "get_weather", "input": { "city": "Beijing" } }`。
- **tool_result**：工具返回的结果，比如：`{ "result": "晴，25°C" }`。

**例子**：查 GitHub 提交的 MCP 交互：

```json
[
  { "role": "system", "content": "你是我的编程助手，能访问 GitHub。" },
  { "role": "user", "content": "查我 GitHub 最新提交。" },
  { "role": "assistant", "content": "调用工具", "tool_use": { "name": "github_latest_commit", "input": { "username": "yourname" } } },
  { "role": "tool_result", "content": { "commit_message": "Fix bug #123", "date": "2025-03-31" } },
  { "role": "assistant", "content": "最新提交：Fix bug #123，2025-03-31。" }
]
```

**小结**：MCP 把混乱输入变成标准化“表格”，AI 处理起来更高效。

---

### 第三站：MCP 生态系统：协议 + 工具

MCP 不止是协议，还有配套工具。三大核心组件是：

#### 1. MCP 服务器 (MCP Server)
- **是什么**：一个遵守 MCP 协议的服务端，像“中转站”，接收和处理 MCP 请求，连接 AI 模型和外部资源。
- **作用**：
  - 解析 MCP 格式的请求，交给模型或工具。
  - 返回标准化的 MCP 响应。
  - 支持自定义工具和数据访问。
- **实现方式**：
  - Anthropic 提供预建服务器（如 Google Drive、Slack）。
  - 开发者可以用 `FastMCP`（Python SDK）快速搭建。
- **关键点**：它是 MCP 的核心枢纽，官方推荐用 `FastMCP` 实现，因为它简化了工具定义和服务器搭建。

#### 2. MCP SDK (Software Development Kit)
- **是什么**：开发者的“工具箱”，支持 Python、TypeScript 等。
- **作用**：提供便捷 API，比如 `FastMCP`，让你轻松构建和发送 MCP 请求。
- **例子**：用 `FastMCP` 定义工具后，自动生成 JSON Schema。

#### 3. MCP 连接器 (MCP Connector)
- **是什么**：一个“适配器”，连接非 MCP 系统。
- **作用**：把外部工具（如数据库）的请求和结果翻译成 MCP 格式。
- **例子**：社区提供了 Postgres、Puppeteer 等连接器。

**工作流程**：
1. 用 SDK（含 `FastMCP`）写应用，发请求。
2. MCP 服务器接收，调用模型或工具。
3. 结果返回给应用。

---

### 第四站：MCP 的好处与最新动态

#### 核心优势
- **可靠性**：结构化减少误解。
- **工具集成**：无缝调用外部资源。
- **安全性**：降低注入风险。
- **可扩展性**：标准协议支持跨系统协作。

#### 最新动态（截至 2025 年 4 月）
- **行业支持**：OpenAI、微软、Google 加入，MCP 或成“AI 的 HTTP”。
- **生态扩展**：Anthropic 2025 年 1 月发布支持远程连接的路线图。
- **社区活跃**：GitHub 上 `modelcontextprotocol` 有上千贡献。

---

### 第五站：新手如何快速上手 MCP 开发？

想用 MCP？以下是基于 `FastMCP` 的入门指南。

#### 准备工作
1. **环境**：Python 3.10+。
2. **安装 SDK**：
   ```bash
   pip install "mcp[cli]" httpx
   ```
3. **工具**：获取 Weather API Key（比如 `weatherapi.com`）。

#### 用 FastMCP 开发 MCP 服务器
目标：建一个天气查询服务器。

1. **代码示例**（`weather_server.py`）：
   ```python
   from mcp.server.fastmcp import FastMCP
   import httpx

   # 初始化 FastMCP 服务器
   mcp = FastMCP("weather_server")

   # 定义天气工具
   @mcp.tool()
   async def get_weather(city: str) -> str:
       """获取指定城市的实时天气"""
       async with httpx.AsyncClient() as client:
           url = f"http://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q={city}"
           response = await client.get(url)
           data = response.json()
           return f"{city} 天气：{data['current']['condition']['text']}，{data['current']['temp_c']}°C"

   # 运行服务器
   if __name__ == "__main__":
       mcp.run()
   ```
   - **说明**：
     - `FastMCP` 是官方推荐的高级框架，自动处理工具注册和 JSON Schema 生成。
     - `@mcp.tool()` 装饰器定义工具，简化开发。

2. **启动服务器**：
   ```bash
   python weather_server.py
   ```

#### 用客户端测试
1. **客户端代码**（`client.py`）：
   ```python
   from mcp import MCPClient

   client = MCPClient(server_url="http://localhost:8000")
   client.add_message(role="system", content="你是天气助手。")
   client.add_message(role="user", content="北京天气如何？")
   client.add_tool("get_weather")
   response = client.send()
   print(response["content"])  # 输出：北京天气：晴，25°C
   ```

2. **运行**：
   - 先跑服务器：`python weather_server.py`
   - 再跑客户端：`python client.py`



---


- **MCP 是什么**：Anthropic 的标准化协议，提升 AI 与外部交互效率。
- **怎么工作**：JSON 结构化通信，配 `FastMCP` 等工具。
- **为什么重要**：可能是 AI 开发的未来标准。
- **现在行动**：用 `FastMCP` 10 分钟跑起服务器！

**为什么用 FastMCP**：官方示例大量使用 `FastMCP`，因为它封装了底层细节，适合快速开发。相比手动 FastAPI 实现，`FastMCP` 更贴近官方风格，也更简单。



### 参考资料

[MCP官方文档](https://modelcontextprotocol.io)
[GitHub MCP](https://github.com/modelcontextprotocol)