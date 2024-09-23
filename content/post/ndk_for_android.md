---
title: "Zerotermux折腾日记(3)-Arch linux上跑NDK"
description: 
date: 2024-08-10T21:23:21+08:00
image: https://img.nightrainmilkyway.cn/img/1723296375281.webp
math: 
license: CC BY-NC-SA 4.0
hidden: false
comments: true
draft: false
categories:
  - termux
  - NDK
  - Android
tags:
  - termux
  - NDK
  - zerotermux
  - Arch_linux
---

## 前言

在Arch Linux上跑NDK，其实和Ubuntu上跑NDK没什么区别，因为Arch Linux的包管理器是pacman，而Ubuntu的包管理器是apt，两者都是基于Debian的包管理器，所以安装NDK的方法是一样的。


在Arch Linux上安装NDK非常简单，只需要在终端中输入以下命令即可：

```bash
sudo pacman -S ndk
```

安装完成后，可以在终端中输入以下命令来验证NDK是否安装成功：

```bash
ndk-build --version
```
## 如果按照前面操作的话，不出所料应该是报错的，因为Arch Linux的包管理器中没有ndk这个包，所以我们需要手动下载NDK。

## 下载NDK

在Android开发者网站上下载NDK，下载地址为：https://developer.android.com/ndk/downloads

选择适合自己系统的版本进行下载，下载完成后解压到任意目录即可

## 配置环境变量

将NDK的路径添加到环境变量中，这样就可以在终端中直接使用ndk-build命令了。

在终端中输入以下命令来编辑环境变量：

```bash
sudo nano /etc/profile
```
 ## 正文

 正常情况在linux上安装上这样，但在termux上安装linux，本质上还是模拟，arm架构能跑动就奇怪了，
 NDK是没有arm架构的，真的没有办法了吗？

## 解决方案

https://github.com/zongou/android-sndk.git

...待续



## 附录

### 参考文献

### 版权信息

本文原载于 [nightrainmilkyway.cn](https://nightrainmilkyway.cn)，遵循 CC BY-NC-SA 4.0 协议，复制请保留原文出处。
