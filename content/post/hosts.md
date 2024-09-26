---
title: "修改hosts文件理解dns - (上)"
description: 
date: 2024-09-23T10:08:44+08:00
image: https://img.nightrainmilkyway.cn/img/122622935_p0 (1).png
math: 
license: CC BY-NC-SA 4.0
hidden: false
comments: true
ai: true
summary: 本文介绍了 hosts 文件和 DNS（域名系统）的功能与历史。早期互联网中，hosts 文件用于映射 IP 地址与主机名，但随着网络规模的扩大，这种方法变得不再有效，因此引入了 DNS。DNS 将人类可读的域名转换为机器可识别的 IP 地址，类似于电话簿的功能。文章还探讨了域名篡改和 DNS 污染的问题，说明了在解析过程中可能出现的安全隐患，以及如何通过配置文件来管理域名解析。


draft: false
categories:
  - hosts
tags:
  - hosts
  - DNS
---
## hosts 是什么？


相信大家都看过流浪地球 2，其中有这么一个情节，`重启世界根服务器`，那么这个根服务器到底是什么呢？这里就不得不提及域名解析系统的发展史了
![272.jpg](https://img.nightrainmilkyway.cn/img/272.jpg)
在很早很早以前，域名解析系统还没有建立起来，全球的网络主机还很少的时候，IP 地址的映射主要靠的就是各主机里的 hosts 文件来实现，那时候的 hosts 文件保存着互联网上所有主机地址的映射。而 hosts 文件的更新是由一个专门来维护 hosts 文件的站点来实现。也就是说那时根本就不需要也没有 DNS 服务器这东西，用自己主机上的 hosts 文件就可以找到对方的 IP 地址然后建立连接了

但是后来随着互联网的规模不断扩大，`hosts`文件的维护也越来越困难，毕竟全球的网络主机都需要通过这个负责维护 hosts 更新站点来更新，hosts 所存放的解析记录数量级不断增加，单单只是检索就要花不少时间 [修改hosts文件理解DNS - （下）](./../dns)

当我们打开这个`hosts`文件之后可以发现里面有一下内容

Windows 目录是: `C:\Windows\System32\drivers\etc\hosts`

Linux 目录是: `/etc/hosts`

```c
127.0.0.1       localhost
::1     localhost ip6-localhost ip6-loopback
ff02::1 ip6-allnodes
ff02::2 ip6-allrouters
20.205.243.166　　github.com
61.91.161.217	www.google.com
61.91.161.217	google.com
61.91.161.217	gcr.io
61.91.161.217	www.gcr.io
61.91.161.217	com.google
61.91.161.217	admin.google.com
61.91.161.217	accounts.google.com
61.91.161.217	accounts.google.cn
```

看到第一行就是我们所熟悉的`127.0.0.1　　localhost`，就是在hosts中定义的

可以看第 5 行前面是 IP 后面是域名一一对应，是不是突然就明白了这个`hosts`文件的作用

## DNS 是什么

DNS（Domain Name System，域名系统），将人类可读的域名（例如 www.example.com）转换为机器用于相互通信的IP地址（例如 192.0.2.1 或 2001:db8::1）的一种分布式数据库。打个比方来说，DNS就像一个电话簿，IP相当于电话号码，域名相当于联系人

{{< notice tip >}}
这几条可以看出一个 IP 地址可以同时对应多个域名，这也就是为什么平时在地址栏上输入 google.com或www.google.com都可以访问 google 了。而https://是浏览器自动帮你加上去的，平时我们访问不了 google 的原因是，google 的域名 在本机转化为 IP 地址后经过中国大陆的防火长城，被防火长城检测到与黑名单内的关键词匹配（如：Google、Facebook、twitter等都在黑名单内），然后就会伪装成目标域名的解析服务器返回虚假的查询结果。关键的是通常的域名查询没有任何认证机制，而且域名的查询一般是基于无连接不可靠的 UDP 协议，所以浏览器只能接受最先到达的格式正确结果，并把之后的所有结果丢弃。所以这也就访问不了啦，这种情况就是所谓的 DNS 缓存污染，也称为 DNS 缓存投毒（这个真形象…）[参考文献-从修改hosts文件科学上网中理解DNS（上）](https://famousczm.github.io/2017/05/07/%E4%BB%8E%E4%BF%AE%E6%94%B9hosts%E6%96%87%E4%BB%B6%E7%A7%91%E5%AD%A6%E4%B8%8A%E7%BD%91%E4%B8%AD%E7%90%86%E8%A7%A3DNS%EF%BC%88%E4%B8%8A%EF%BC%89/)
{{< /notice >}}



一个域名背后可以有多个I地址。当域名解析服务器在解析域名记录的“值”中包含多个IP地址时，LDNS会返回所有IP地址，但返回I地址的顺序是随机的。浏览器默认选取第一个返回的 IP地址作为解析结果，其解析流程如下。
1. 网站访问者通过浏览器向Local DNS（简称LDNS）发送解析请求。
 2. LDNS将解析请求逐级转发（递归）至权威DNS。
3. 权威DNS在收到解析请求后，将所有I地址以随机顺序返回LDNS。
4. LDNS将所有IP地址返回浏览器。
5. 网站访问者的浏览器随机访问其中一个I地址，通常（不是绝对）选取第一个返回的IP地址。在没有做反向代理的情况下，如果返回的IP地址有多个，那么访问到这些IP地址的机会一般是均等的。

![v2-c3392cab45f8241c0369ec6457000df8_1440w.webp](https://img.nightrainmilkyway.cn/img/v2-c3392cab45f8241c0369ec6457000df8_1440w.webp)

在DNS解析的描述过程中，浏览器首先通过本地的DNS服务（LDNS）发送第一个
解析请求，然后由LDNS返回IP地址，访问对应的服务器所提供的互联网服务。
这样就带来了一个问题：如果LDNS返回的不是公网的域名解析服务解析出的IP地址，
而是经过本地篡改的呢？

### 域名篡改
域名会被篡改吗？或域名解析服务器在解析域名后返回的IP地址会被篡改吗？
在回答上述问题前，我们先查看Linux系统中有关DNS的配置文件。

{{< notice info >}}
`/etc/hosts`：记录hostname对应的IP地址
`/etc/resolv.conf`：设置DNS服务器的IP地址
`/etc/host.conf`：指定域名解析的顺序，是先从hosts 解析还是先从DNS解析
{{< /notice >}}



LDNS 优先解析hosts 文件（Windows 路径是`C：\Windows\System32\driversletclhosts`）,在hosts文件中，改变域名指向的I地址，我们将不会访问到原来的公网主机。示例如下：


```sh
[root@linuxido ~]# ping linuxido.com({})
```

→在修改前，对城名执行ping命令

```shell
PING linuxido.com (123.56.94.254) 56(84) bytes of data.
64 bytes from 123.56.94.254 (123.56.94.254): icmp _seq=1 ttl=53 time=25.6 ms
[root@linuxido ~l# dig +short linuxido.com
```
→使用dig命令解析域名
```shell
123.56.94.254
##→修改域名对应的IP地址
[root@linuxido~]# echo '120.120.120.120 linuxido.com' >> /etc/hosts

[root@linuxido~]# ping linuxido.com
```
→修改后，再对域名执行ping命今
```
PING linuxido.com (120.120.120.120) 56(84) bytes of data.
并→可以看到ping命令失败，无法ping通120.120.120.120
```
→使用host命令解析城名，可以看到依然是公网IP地址
```
[root@linuxido~l# host linuxido.com
linuxido.com has address 123.56.94.254[root@linuxido ~]# nslookup linuxido.com Server:
Address:
8.8.8.8
8.8.8.8#53
Non-authoritative answer:
Name:
linuxido.com Address: 123.56.94.254
[root@linuxido ~]# dig linuxido.com
linuxido.com.
599
IN
A
123.56.94.254
```
##一修改hosts 文件后，dig命令解析的城名依然是公网IP地址。找寻A的记录，它是不经过LDNS
iSERVER:8.8.8.8#53（8.8.8.8)
##→本机的DNS地址设置为8.8.8.8，DNS的默认端口是53
如果没有修改 hosts 文件，在什么情况下可能出现DNS返回错误的IP 地址呢？域名劫持是最可能出现的情况。域名劫持就是通过攻击或伪造域名解析服务器的方式，把目标网站域名解析到错误的 I地址，从而使用户访问一些非法、恶意网站。因此，我们需要使用域名解工具查看访问域名是都真正对应IP地址

### DNS污染

{{< notice tip >}}
网域服务器缓存污染（英语：DNS cache pollution）、DNS污染或DNS劫持，是一种破坏域名系统查询解析的行为。[1]通常有计算机程序自动执行DNS劫持攻击导致DNS服务器缓存了错误记录的现象。而域名服务器缓存投毒（DNS cache poisoning）和DNS缓存投毒指由计算机程序执行的DNS劫持攻击。污染一词可能取自域名系统域名解析之特性，若递归DNS解析器查询上游时收到错误回复，所有下游也会受影响 [参考文献（3）-域名服务器缓存污染](https://zh.m.wikipedia.org/wiki/%E5%9F%9F%E5%90%8D%E6%9C%8D%E5%8A%A1%E5%99%A8%E7%BC%93%E5%AD%98%E6%B1%A1%E6%9F%93)
{{< /notice >}}


## hosts是如何实现科学上网的

这里以GitHub为例

```c
20.205.243.166　　github.com
```

GitHub站点毕竟在国外，当dns请求时返回最快的那一个IP，但是想要访问就肯定要走大陆宽带，防火长城就会返回一个假的结果，那么hosts为什么能直接连上GitHub呢，这里就不得不提及域名解析的优先级了，`hosts > DNS`，在DNS域名解析系统建立起来之后hosts被弃用，但仍然保留在Linux，Windows系统内，而且优先级一般大于dns解析结果，从而能够建立连接

当然，如果想流畅的访问GitHub单单只是修改hosts效果并不明显，可以搭配[FastGithub](https://github.com/WangGithubUser/FastGitHub)合法的工具访问
![20.205.243.166.png](https://img.nightrainmilkyway.cn/img/20.205.243.166.png)

## 附录

### 参考文献
[参考文献（1）-从修改hosts文件科学上网中理解DNS（上）](https://famousczm.github.io/2017/05/07/%E4%BB%8E%E4%BF%AE%E6%94%B9hosts%E6%96%87%E4%BB%B6%E7%A7%91%E5%AD%A6%E4%B8%8A%E7%BD%91%E4%B8%AD%E7%90%86%E8%A7%A3DNS%EF%BC%88%E4%B8%8A%EF%BC%89/)

[参考文献（2）-Linux从入门到精通 第八章 Linux网络与安全]()

[参考文献（3）-域名服务器缓存污染](https://zh.m.wikipedia.org/wiki/%E5%9F%9F%E5%90%8D%E6%9C%8D%E5%8A%A1%E5%99%A8%E7%BC%93%E5%AD%98%E6%B1%A1%E6%9F%93)
### 版权信息

本文原载于 [nightrainmilkyway.cn](https://nightrainmilkyway.cn)，遵循 CC BY-NC-SA 4.0 协议，复制请保留原文出处。