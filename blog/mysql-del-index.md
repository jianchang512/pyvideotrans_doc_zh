---
title: 记一次惊心动魄的MySQL大表索引删除之旅：从卡死到表损坏再到终极迁移
date: 2025-06-23 14:33:00
description: MySQL大表索引删除之旅：从卡死到表损坏再到终极迁移,涉及到了  DDL卡死、表引擎的致命缺陷、表损坏与修复、索引统计信息异常 等一系列问题。
---


就在昨天，我遇到了一个堪称教科书级别的数据库问题。我需要在一个拥有 **6000万行数据** 的大表上删除一个索引，本以为一个简单的 `ALTER TABLE` 命令就能搞定，没想到却由此开启了一段惊心动魄、长达数小时的排查与修复之旅。

整个过程涉及到了 **DDL卡死、表引擎的致命缺陷、表损坏与修复、索引统计信息异常** 等一系列问题。我将整个过程复盘记录下来，希望能给未来的自己提个醒，也希望能帮助每一位可能遇到类似困境的同学。

**故事的主角：** 一张名为 `wa_xinghao` 的表，数据量 6000万+。

### 第一幕：风平浪静下的暗流——`ALTER TABLE` 为何卡住了？

一切始于这条命令：
```sql
ALTER TABLE `wa_xinghao` DROP INDEX `product_id-s1`;
```
执行后，终端就卡住了，没有任何反应。与此同时，我发现应用中所有与这张表相关的查询都变得极慢，甚至超时。我的第一反应是：**锁住了！**

我立刻打开新的数据库连接，执行 `SHOW FULL PROCESSLIST;` 进行诊断。

通常，`ALTER` 卡住最常见的原因是 `Waiting for table metadata lock`，即有其他长事务或查询占着表的元数据锁。但这次，我看到的 `State` 却是：

**`copy to tmp table`**

这个状态让我心头一凉。它意味着 MySQL 正在执行最原始、最耗时的表重建操作：创建一个带新结构（没有了那个索引）的临时表，然后把 6000 万行数据一行一行地拷贝过去。在此期间，原表会被长时间锁定。对于6000万的数据量，这无疑是一场灾难。

### 第二幕：深挖根源——为什么是 `COPY` 而不是 `INPLACE`？

我使用的是 MySQL 5.7，它早就支持 `DROP INDEX` 的 Online DDL (`INPLACE` 算法)，不应该退化成 `COPY` 才对。为了验证，我尝试强制指定算法：

```sql
ALTER TABLE `wa_xinghao` DROP INDEX `product_id-s1`, ALGORITHM=INPLACE, LOCK=NONE;
```

结果，MySQL 毫不留情地给了我一个错误：
**`ERROR 1845 (0A000): ALGORITHM=INPLACE is not supported for this operation. Try ALGORITHM=COPY.`**

这下问题明确了：由于某种原因，MySQL 认为对这张表无法执行 `INPLACE` 操作。我立刻执行 `SHOW CREATE TABLE wa_xinghao;` 查看表结构，真相大白：

```sql
) ENGINE=MyISAM ...
```

**根源找到了！是 `MyISAM` 存储引擎，我一直想当然的认为是 InnoDB 引擎，因为该数据库一眼看下去全都是 InnoDB 引擎！**

![](https://pvtr2.pyvideotrans.com/1750608440301_image.png)


`MyISAM` 是一个古老的、非事务性的引擎，它存在诸多致命缺陷，其中之一就是**对 DDL 操作的支持非常薄弱**。它几乎没有“在线”操作的概念，大部分 `ALTER` 操作都会导致锁表和表重建。

### 第三幕：一波未平一波又起——表损坏与漫长的修复

在定位到问题后，我无法忍受长时间的锁表，于是做了一个现在看来非常危险的决定：我 `KILL` 掉了那个正在 `copy to tmp table` 的 `ALTER` 进程。

短暂的平静后，新的噩梦来了。当我尝试对这张表做任何操作（哪怕是 `SELECT`）时，都收到了一个新错误：

**`ERROR 1194 (HY000): Table 'wa_xinghao' is marked as crashed and should be repaired`**

是的，由于强行中断了对底层文件的修改，`MyISAM` 表“不负众望”地损坏了。这是 `MyISAM` 引擎非崩溃安全的典型表现。

唯一的出路就是修复它：
```sql
REPAIR TABLE `wa_xinghao`;
```
然后，我又进入了新一轮的漫长等待。通过 `SHOW PROCESSLIST;`，我看到状态变成了：

**`Repair by sorting`**

这个状态表示 MySQL 正在通过排序的方式重建索引文件 (`.MYI`)。对于 6000 万行数据和多个索引，这是一个极其消耗 CPU 和 I/O 的过程。我能做的只有耐心等待，并祈祷服务器不要被拖垮。这一次，我**绝对不敢再 `KILL` 它了**。

### 第四幕：雨过天晴后的一个“小彩蛋”——诡异的索引基数

在经历了数小时的煎熬后，表终于修复成功了！

在检查表结构时，我无意中发现了一个有趣的现象：


![](https://pvtr2.pyvideotrans.com/1750608244114_image.png)


如上图所示，`sn` 和 `sn2` 这两个索引的**基数（Cardinality）** 竟然比主键 `PRIMARY` 的基数还要大！这在逻辑上是不可能的，因为主键是绝对唯一的，其基数应该等于总行数。

**原因揭秘：**
1.  **基数是估算值**：MySQL 为了性能，是通过随机抽样来估算基数的，本身就存在误差。
2.  **统计信息已过时**：最主要的原因是，在经历了“崩溃-修复”这个混乱的过程后，表的统计信息没有被及时更新，导致数据陈旧且不准确。

**解决方案**很简单，手动强制更新统计信息：
```sql
ANALYZE TABLE `wa_xinghao`;
```
执行完毕后，基数恢复正常。

### 最终章：浴火重生——拥抱 InnoDB

这次惊心动魄的经历，让我下定决心彻底告别 `MyISAM`。我的最终目标是：**在删除多余索引的同时，将表引擎转换为 `InnoDB`。**

直接执行 `ALTER TABLE ... ENGINE=InnoDB` 同样会触发锁表的表重建，不可取。最佳实践有两种：

#### 方案一：在线操作的王者 `pt-online-schema-change`

Percona Toolkit 中的这个工具是处理大表 DDL 的行业标准。它通过创建“幽灵表”+触发器同步增量数据的方式，可以在不锁表、对业务影响极小的情况下完成表结构的变更。

```bash
# 一条命令，同时完成“删索引”和“转引擎”两大任务
pt-online-schema-change \
  --alter "DROP INDEX `product_id-s1`, ENGINE=InnoDB" \
  h=your_host,D=your_database,t=wa_xinghao,u=your_user,p=your_password \
  --execute
```

#### 方案二：手动离线操作（需要停机窗口）

如果业务允许短暂的停机维护，可以采用“先迁移数据，后建索引”的思路，速度极快。
1.  **创建无索引的 InnoDB 新表 `wa_xinghao_new`。**
2.  **快速导出数据到文件**：`SELECT ... INTO OUTFILE ... FROM wa_xinghao;`
3.  **快速加载数据到新表**：`LOAD DATA INFILE ... INTO TABLE wa_xinghao_new;`
4.  **在新表上在线创建所需索引**：`ALTER TABLE wa_xinghao_new ADD INDEX ...;`
5.  **在停机窗口内，原子重命名**：`RENAME TABLE wa_xinghao TO wa_xinghao_old, wa_xinghao_new TO wa_xinghao;`

### 反思

这次经历虽然坎坷，但收获巨大。我总结了以下几点核心教训：

1.  **引擎是根本**：在对大表做任何操作前，**先看 `ENGINE`**！不同的引擎，行为天差地别。
2.  **告别 `MyISAM`**：对于任何有写入、更新和高可用性要求的业务，请立即、马上将 `MyISAM` 迁移到 `InnoDB`。`MyISAM` 的非崩溃安全和表级锁就是埋在系统里的定时炸弹。
3.  **敬畏 `KILL` 命令**：不要轻易 `KILL` 一个正在对 `MyISAM` 表进行写操作的 DDL 进程，否则你将大概率收获一个损坏的表。
4.  **善用专业工具**：对于大表 DDL，`pt-online-schema-change` 或 `gh-ost` 不是“可选项”，而是“必需品”。
5.  **理解状态信息**：`SHOW PROCESSLIST` 中的 `State` 是排查问题的金钥匙。`copy to tmp table` 和 `Repair by sorting` 都告诉了我们底层正在发生什么。

