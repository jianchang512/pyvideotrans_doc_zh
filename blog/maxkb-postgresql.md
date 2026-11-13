---
title: Ubuntu 开发环境搭建实战：PostgreSQL + pgvector + 最新 Node.js 
date: 2025-04-15 15:33:00
description: 本文详细介绍了在Ubuntu系统上搭建一个包含PostgreSQL、pgvector扩展和最新Node.js (使用fnm管理)的开发环境。重点解决了PostgreSQL通过PGDG仓库安装、pgvector扩展系统级安装与数据库内启用的区别及常见错误“extension vector is not available”，以及如何利用fnm快速安装和管理Node.js版本。内容涵盖了安装步骤、数据库操作、错误排查及解决方法，为开发者提供了高效搭建相关开发环境的实战指南。

---


# Ubuntu 开发环境搭建实战：PostgreSQL + pgvector + 最新 Node.js (fnm)

**前言**

最近在 Ubuntu 上搭建MaxKB开发版本，需要用到 PostgreSQL 数据库、向量搜索能力（通过 pgvector 扩展）以及最新 Node.js 环境的项目。过程中遇到了一些典型的“坑”，但也找到了解决方法。为了巩固学习，也为了方便遇到类似问题的朋友，我把整个过程整理成了这篇笔记。希望它能帮你节省一些调试时间！

**目标环境：**

*   操作系统：Ubuntu (本文命令基于 APT 包管理器)
*   数据库：PostgreSQL (特定版本， 17)
*   数据库扩展：pgvector (用于向量相似性搜索)
*   运行时：最新版 Node.js (通过 fnm 管理)

## 第一部分：安装 PostgreSQL (推荐使用 PGDG 仓库)

Ubuntu 默认源的 PostgreSQL 可能不是最新版。为了能使用较新版本（比如本文后续需要的 v17）并及时获得更新，推荐使用 PostgreSQL Global Development Group (PGDG) 官方 APT 仓库。

1.  **导入 GPG 密钥 & 添加仓库:**
    ```bash
    # 安装依赖
    sudo apt update
    sudo apt install curl ca-certificates gnupg -y

    # 导入密钥
    curl https://www.postgresql.org/media/keys/ACCC4CF8.asc | gpg --dearmor | sudo tee /etc/apt/trusted.gpg.d/postgresql-archive-keyring.gpg >/dev/null

    # 添加仓库 (将自动检测 Ubuntu 版本)
    sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
    ```

2.  **更新包列表 & 安装 PostgreSQL:**
    ```bash
    sudo apt update
    # 安装特定版本 (例如 PostgreSQL 17)
    sudo apt install postgresql-17 postgresql-contrib-17 -y
    # 如果想装最新稳定版，去掉版本号即可: sudo apt install postgresql postgresql-contrib
    ```
    `postgresql-contrib` 包含一些有用的扩展和工具。

3.  **验证安装 & 服务状态:**
    ```bash
    sudo systemctl status postgresql@17-main.service
    # 如果服务名不同，尝试: sudo systemctl status postgresql
    ```
    确保服务正在运行 (`active (running)`)。

## 第二部分：连接 PostgreSQL & 创建数据库 (及常见错误)

1.  **连接数据库:**
    使用默认的 `postgres` 超级用户连接。
    ```bash
    sudo -u postgres psql
    ```
    成功后会看到 `postgres=#` 提示符。

2.  **创建数据库 (例如 `maxkb`):**
    ```sql
    CREATE DATABASE maxkb;
    ```
    **注意：** SQL 语句在 `psql` 中必须以**分号 (`;`)** 结尾！

3.  **常见错误：`FATAL: database "X" does not exist`**
    如果你执行 `CREATE DATABASE maxkb` (没有分号) 后，立刻尝试用 `\c maxkb` 连接，就会遇到这个错误。
    **原因：** 没有分号，`CREATE DATABASE` 命令根本没被发送到服务器执行。`\c` 是 `psql` 的元命令，它会立即执行，此时数据库确实还不存在。
    **解决：** 确保 `CREATE DATABASE` 命令以分号结尾并看到 `CREATE DATABASE` 的确认信息后，再执行 `\c maxkb`。

4.  **连接到新数据库:**
    ```sql
    \c maxkb
    ```
    提示符会变为 `maxkb=#`。

5.  **(推荐) 创建专用用户:**
    为了安全，最好为应用创建独立用户。
    ```sql
    -- 在 postgres=# 或 maxkb=# 提示符下执行
    CREATE USER maxkb_user WITH PASSWORD 'your_strong_password';
    ALTER DATABASE maxkb OWNER TO maxkb_user;
    -- 或者授予权限：GRANT ALL PRIVILEGES ON DATABASE maxkb TO maxkb_user;
    \q -- 退出 psql
    ```

## 第三部分：安装 pgvector 扩展 (关键步骤)

我们需要在 `maxkb` 数据库中使用向量搜索。

1.  **尝试启用扩展 (通常会失败):**
    在 `maxkb=#` 提示符下：
    ```sql
    CREATE EXTENSION vector;
    ```

2.  **典型错误：`ERROR: extension "vector" is not available`**
    ```
    ERROR:  extension "vector" is not available
    DETAIL:  Could not open extension control file "/usr/share/postgresql/17/extension/vector.control": No such file or directory.
    HINT:  The extension must first be installed on the system where PostgreSQL is running.
    ```
    **原因：** `CREATE EXTENSION` 只是在数据库*内部启用*一个扩展，前提是这个扩展的**系统级文件**（如 `.so`, `.sql`, `.control`）必须**已经安装**在 PostgreSQL 服务器能找到的地方（错误信息中的 `DETAIL` 指明了路径）。

3.  **解决方案：系统级安装 pgvector**

    *   **方法一：使用 APT 安装 (推荐)**
        这是最简单、最推荐的方式。
        ```bash
        sudo apt update
        # 包名通常是 postgresql-<版本号>-pgvector
        sudo apt install postgresql-17-pgvector -y

        # 安装后重启 PostgreSQL 服务
        sudo systemctl restart postgresql@17-main.service
        ```

    *   **方法二：从源代码编译 (如果 APT 没有或需要特定版本)**
        a.  **安装依赖 (解决 `postgres.h` 丢失问题):** 这是编译 PostgreSQL 扩展的**必需**步骤！
            ```bash
            sudo apt update
            # 包名通常是 postgresql-server-dev-<版本号>
            sudo apt install postgresql-server-dev-17 -y
            ```
        b.  **下载并编译 pgvector 源代码:**
            ```bash
            # 假设源代码在 /tmp/pgvector
            git clone --branch v0.7.0 https://github.com/pgvector/pgvector.git /tmp/pgvector # 可选指定版本
            cd /tmp/pgvector
            make clean # 清理旧编译 (可选)
            make # 编译
            sudo make install # 安装到 PostgreSQL 目录
            ```
        c.  **重启 PostgreSQL 服务:**
            ```bash
            sudo systemctl restart postgresql@17-main.service
            ```

4.  **再次尝试启用扩展:**
    系统级安装完成后，**重新连接**到 `maxkb` 数据库 (`sudo -u postgres psql -d maxkb`)，然后再次执行：
    ```sql
    CREATE EXTENSION vector;
    ```
    这次应该会显示 `CREATE EXTENSION`，表示成功！

## 第四部分：安装最新 Node.js (使用 fnm)

我们需要最新版的 Node.js，`fnm` (Fast Node Manager) 是一个很棒的选择，它快速且易于管理多版本。

1.  **安装 fnm:**
    ```bash
    curl -fsSL https://fnm.vercel.app/install | bash
    ```

2.  **激活 fnm (关键！):**
    安装脚本会修改你的 shell 配置，需要重新加载或开新终端使其生效。
    ```bash
    # 对于 Bash (默认)
    source ~/.bashrc
    # 或者关闭当前终端，打开一个新终端
    ```

3.  **使用 fnm 安装 Node.js (例如 v22):**
    ```bash
    fnm install 22
    # 或者安装最新 LTS: fnm install --lts
    # 或者安装最新 Current: fnm install node
    ```

4.  **验证安装:**
    ```bash
    node -v  # 应显示 v22.x.x
    npm -v   # 应显示对应的 npm 版本 10.x.x
    ```



这次环境搭建之旅涵盖了 PostgreSQL 的安装配置、数据库操作、棘手的扩展安装问题（区分系统级安装和数据库级启用是关键！），以及使用现代工具 `fnm` 管理 Node.js 版本。主要经验教训：

*   使用官方或推荐的软件源（如 PGDG for PostgreSQL）。
*   仔细阅读错误信息，`DETAIL` 和 `HINT` 通常包含重要线索。
*   理解 PostgreSQL 扩展的工作方式：先系统安装，再数据库启用。
*   编译 C 扩展需要对应的开发包 (`-dev` 或 `-devel`)。
*   注意 `psql` 中的分号！
*   使用版本管理器（如 `fnm` 或 `nvm`）管理 Node.js 是明智的选择。
*   安装版本管理器后，记得重新加载 Shell 配置或打开新终端。

