---
title: 如何使用一行 ffmpeg 命令实现视频水平或垂直翻转？
date: 2026-06-25 15:33:00
description: 最近有多个朋友询问如何水平或垂直翻转视频，其实只需要一行简单的命令就能搞定
---

最近有多个朋友询问如何水平或垂直翻转视频，其实只需要一行简单的命令就能搞定。


![](https://pvtr2.pyvideotrans.com/1782363908105_shuiping.gif)

**第一步：找到 ffmpeg.exe**
进入 `pyvideotrans` 软件目录下的 `ffmpeg` 文件夹。
*(如果没有该软件，打开 [FFmpeg.7z下载地址见底部](https://www.gyan.dev/ffmpeg/builds/ffmpeg-release-full.7z)，解压后进入 `ffmpeg.exe` 所在的文件夹)*。

![](https://pvtr2.pyvideotrans.com/1782363366373_image.png)

**第二步：打开命令行**
在文件夹顶部的地址栏内，输入字母 `cmd` 并回车，会打开一个黑色的命令行窗口。

![](https://pvtr2.pyvideotrans.com/1782363386538_image.png)

**第三步：输入翻转命令**
为了避免手动输入复杂的视频路径，我们可以利用“鼠标拖拽”来完成。请在黑色窗口中依次操作：

![](https://pvtr2.pyvideotrans.com/1782363415160_image.png)


1. 输入 `ffmpeg -i ` （注意 `-i` 后面要打一个空格）。
2. 用鼠标将你要处理的视频，直接拖拽到这个黑色窗口里。
3. 接着继续输入命令：
   - 如果要**水平翻转**（左右），输入：` -vf hflip -c:a copy 输出视频.mp4`
   - 如果要**垂直翻转**（上下），输入：` -vf vflip -c:a copy 输出视频.mp4`
   *(注意：`-vf` 前面要打一个空格，`输出视频.mp4` 这个名字你可以自己随便起)*。
4. 按下回车键，等待命令执行完成。翻转后的视频就会保存在当前文件夹中了。

---
**附：完整命令格式参考**

* **水平翻转：** `ffmpeg -i [拖拽原视频文件] -vf hflip -c:a copy [输出视频名.mp4]`
  （示例：`ffmpeg -i 1.mp4 -vf hflip -c:a copy 1-out.mp4`）
  
* **垂直翻转：** `ffmpeg -i [拖拽原视频文件] -vf vflip -c:a copy [输出视频名.mp4]`
  （示例：`ffmpeg -i 1.mp4 -vf vflip -c:a copy 1-out.mp4`）

![](https://pvtr2.pyvideotrans.com/1782363024286_image.png)

> 小技巧: `-i` 前加一个`-y`变成 `ffmpeg -y -i `可直接覆盖已存在的输出视频，利于反复执行覆盖