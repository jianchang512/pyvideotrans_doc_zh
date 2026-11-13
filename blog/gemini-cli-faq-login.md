---
title: Gemini CLI 完全上手指南：告别 Claude Code，解决网络与登录难题
date: 2025-06-28 15:40:00
description: 本文将作为一份详尽的指南，帮助你全面了解 `gemini-cli`，并着重解决中国用户在安装和使用过程中可能遇到的网络、登录和配置问题。它与 Anthropic 的 Claude Code 的相比， `gemini-cli` 可能是更适合你的选择。
---


近期，Google 推出了其开源的 AI 终端代理工具——`gemini-cli`。这款工具将强大的 Gemini 2.5 Pro 模型直接带入开发者的命令行。


本文将作为一份详尽的指南，帮助你全面了解 `gemini-cli`，并着重解决中国用户在安装和使用过程中可能遇到的网络、登录和配置问题。

## Gemini CLI vs. Claude Code：为何更适合中文用户？

在 `gemini-cli` 问世之前，Claude Code 是许多开发者在终端中的首选 AI 助手。然而，对于中文用户而言，Claude Code 的使用体验一直存在一些难以忽视的障碍。

`gemini-cli` 的出现，可以说彻底改变了这一局面。它不仅在功能和性能上与 Claude Code 不相上下，甚至在多个关键方面展现出巨大优势：

*   **对中文用户更友好**：最核心的一点是，由于 Claude 所在公司CEO的极度反华立场，Claude Code 在网络访问和账户注册上对中国地区存在诸多限制，尤其是使用中文对话，有极大可能招来封号，甚至刚刚注册充值就喜迎封号套餐。
*   **免费且慷慨的Pro模型访问权**：通过 Google 个人账户登录，用户可以免费获得每天高达1000次的 Gemini 2.5 Pro 模型请求额度。 相比之下，Claude Code 的高性能模型通常需要付费订阅。

对于追求高效、稳定且不受地域限制的中文开发者来说，`gemini-cli` 无疑是当下更具吸引力的选择。

## 安装与启动

在开始之前，请确保你的电脑已经安装了 `Node.js` (版本推荐 v20+)。

你可以通过 `npx` 命令快速启动，无需全局安装，这也是官方推荐的测试方式：
```bash
npx https://github.com/google-gemini/gemini-cli
```
或者，你也可以选择全局安装：
```bash
npm install -g @google/gemini-cli

gemini
```
首次启动时，`gemini-cli` 会引导你选择主题颜色和认证方式, 选择使用 Google账号登录，不要使用 API key，原因见后。

## 核心“排坑”指南：解决常见错误与问题

以下部分汇集了用户在使用 `gemini-cli` 时最常遇到的问题，并提供了经过验证的详细解决方案。

### 问题一：网络问题导致的登录失败或中断

**症状**：执行 `gemini` 命令后，长时间卡在 `Waiting for auth...`，或者在浏览器完成 Google 授权后终端自动退出，没有任何提示。使用调试模式 (`gemini -d`) 可能会看到 `ETIMEDOUT` (连接超时) 的错误。

**根源**：这是典型的网络问题。由于众所周知的原因，直接访问 Google 服务会失败。`gemini-cli` 默认不会读取系统的全局代理设置，需要为其所在的终端会话单独配置代理。

**解决方案**：

1.  **开启代理工具的 TUN 模式**：这是最直接有效的方法之一。TUN 模式可以接管系统的网络流量，确保终端的网络请求也能通过代理。许多中文用户分享，开启此模式后，登录问题迎刃而解。

2.  **在终端中设置临时代理**：如果你的代理工具不支持 TUN 模式，或者你不想开启全局代理，可以在终端中为当前会话设置环境变量。

    *   **Windows (PowerShell)**：
        ```PowerShell
        $env:HTTP_PROXY="http://127.0.0.1:端口号"
        $env:HTTPS_PROXY="http://127.0.0.1:端口号"
        ```
        *请将“端口号”替换为你代理软件的实际 HTTP 代理端口。*

    *   **macOS / Linux (Bash/Zsh)**：
        ```bash
        export HTTPS_PROXY="http://127.0.0.1:端口号"
        ```

    设置完成后，在该终端窗口中再次运行 `gemini` 即可正常进行登录授权。

### 问题二：Google 登录报错（Workspace 账户或缺少项目配置）

**症状**：
*   **报错A (Workspace)**: `Failed to login. Ensure your Google account is not a Workspace account...`
*   **报错B (缺少环境变量)**: `GOOGLE_CLOUD_PROJECT environment variable not found.`

**根源**：这两种报错通常关联出现。使用 Google 账户（无论是个人账户还是 Workspace 账户）进行登录时，`gemini-cli` 都需要关联一个 Google Cloud 项目来进行额度管理和 API 调用。

**解决方案**：

1.  **登录 Google Cloud 控制台并创建项目**：
    *   访问 [Google Cloud 控制台](https://console.cloud.google.com/)。
    *   如果你没有任何项目，系统通常会自动为你创建一个名为 `My First Project` 的项目。你也可以自行创建一个新项目。

2.  **获取项目ID并设置环境变量**：
    *   在控制台顶部的项目选择器中，找到你的项目，并复制其 **ID** (通常是一串包含字母和数字的字符串)。
    *   在终端中设置 `GOOGLE_CLOUD_PROJECT` 环境变量。
        *   **Windows (PowerShell)**:
            ```PowerShell
            $env:GOOGLE_CLOUD_PROJECT="你的项目ID"
            ```
        *   **macOS / Linux (Bash/Zsh)**:
            ```bash
            export GOOGLE_CLOUD_PROJECT="你的项目ID"
            ```

3.  **启用相关 API 服务**：这是至关重要的一步，否则会遇到权限不足 (Permission Denied, 403) 的错误。
    *   在 Google Cloud 控制台的搜索框中，搜索 “Gemini”。
    *   找到并启用 **Gemini for Google Cloud API** (也可能叫 **Cloud AI Companion API**)。 有些教程建议启用搜索到的所有三个相关库以确保万无一失。

4.  **重新登录**：
    *   完成以上步骤后，重新启动 `gemini-cli`。
    *   如果遇到 Workspace 账户的报错，可以尝试在 `gemini-cli` 中输入 `/auth` 命令，手动选择 “Login with Google Workspace” 选项进行登录。

## 关键技巧与“巨坑”提醒

**认证方式决定可用模型和费用**：

这是一个非常关键的区别！
*   **Google 账户登录**：这是获取**免费** `Gemini 2.5 Pro` 模型和每日 1000 次慷慨额度的正确方式。
*   **API Key 登录**：使用从 Google AI Studio 生成的 API Key，很可能会被降级到 `Gemini 2.5 Flash` 模型，或者会因为不具备 Pro 权限而报错。 此外，使用 API Key 的调用是**付费**的，并且更容易遇到 429 (请求速率过快) 的错误。

**结论**：对于绝大多数用户，请务必选择 **Google 账户登录** 方式。

## 提升体验的实用技巧

掌握以下几个常用指令，能让你的 `gemini-cli` 使用体验大大提升：

*   **会话管理**：网络不稳时，随时保存当前对话，避免心血白费。
    *   `/chat save [标签]`：保存当前会话，并指定一个标签。
    *   `/chat list`：列出所有已保存的会話。
    *   `/chat resume [标签]`：恢复指定的会话。

*   **上下文管理 (记忆功能)**：
    *   **GEMINI.md 文件**：在项目根目录或用户主目录下的 `~/.gemini/` 中创建一个 `GEMINI.md` 文件。你可以在里面写入自定义指令、代码风格规范、项目背景等，`gemini-cli` 会在每次交互时自动加载这些信息作为长期记忆。
    *   `/memory add [上下文内容]`：将一段内容添加到当前会话的记忆中。
    *   `/memory show`：查看当前已加载的记忆内容。
    *   `/memory refresh`：重新从 `GEMINI.md` 文件加载上下文。

*   **统计信息**：
    *   `/stats`：查看你的 API 调用统计，了解额度使用情况。


