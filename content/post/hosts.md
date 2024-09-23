---
title: "修改 hosts 文件理解 DNS"
description: 
date: 2024-09-23T10:08:44+08:00
image: https://img.nightrainmilkyway.cn/img/122622935_p0 (1).png
math: 
license: MIT
hidden: false
comments: true
draft: false
categories:
  - hosts
tags:
  - hosts
  - DNS
---
## hosts 是什么？

相信大家都看过流浪地球 2，其中有这么一个情节，`重启世界根服务器`，那么这个根服务器到底是什么呢？这里就不得不提及域名解析系统的发展史了
![f44d30758a58254024433c.png](https://img.nightrainmilkyway.cn/img/f44d30758a58254024433c.png)

在很早很早以前，域名解析系统还没有建立起来，全球的网络主机还很少的时候，IP 地址的映射主要靠的就是各主机里的 hosts 文件来实现，那时候的 hosts 文件保存着互联网上所有主机地址的映射。而 hosts 文件的更新是由一个专门来维护 hosts 文件的站点来实现。也就是说那时根本就不需要也没有 DNS 服务器这东西，用自己主机上的 hosts 文件就可以找到对方的 IP 地址然后建立连接了

但是后来随着互联网的规模不断扩大，`hosts`文件的维护也越来越困难，毕竟全球的网络主机都需要通过这个负责维护 hosts 更新站点来更新，hosts 所存放的解析记录数量级不断增加，单单只是检索就要花不少时间

当我们打开这个`hosts`文件之后可以发现里面有一下内容

Windows 目录是: `C:\Windows\System32\drivers\etc\hosts`

Linux 目录是: `/etc/hosts`

```
127.0.0.1       localhost
::1     localhost ip6-localhost ip6-loopback
ff02::1 ip6-allnodes
ff02::2 ip6-allrouters
20.205.243.166　　github.com
```

可以看第 5 行前面是 IP 后面是域名一一对应，是不是突然就明白了这个`hosts`文件的作用

## DNS 是什么

![v2-c3392cab45f8241c0369ec6457000df8_1440w.webp](https://img.nightrainmilkyway.cn/img/v2-c3392cab45f8241c0369ec6457000df8_1440w.webp)