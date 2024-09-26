---
title: "修改hosts文件理解DNS - （下）"
slug: "Dns"
description: 
date: 2024-09-26T19:37:23+08:00
lastmod: "2024-09-26T19:37:23+08:00"
image: https://img.nightrainmilkyway.cn/img/ResizedImage_2024-09-24_21-39-25_1.webp
math: 
ai: true
summary: DNS系统从最早的HOSTS.TXT文件集中管理演变为分布式、层次化的系统。Paul Mockapetris于1983年提出了DNS协议。随着互联网发展，引入了顶级域名、DNSSEC等，保障安全性与全球可靠性。通过Anycast技术，全球13组根服务器实例分布于各地，保证了高效稳定的域名解析服务
license: CC BY-NC-SA 4.0
hidden: false
comments: true
draft: false
categories:
  - DNS
tags:
  - DNS
---

## 域名解析系统发展史

### 早期互联网和主机文件（HOSTS.TXT）

在DNS出现之前，互联网的域名解析依赖于一个中心化的文件：HOSTS.TXT。这个文件由斯坦福研究所（SRI）的Network Information Center (NIC) 维护，列出了每个域名对应的IP地址。每台计算机必须手动下载并更新这个文件才能进行域名解析。

随着互联网的发展和联网设备数量的增加，这种方法逐渐显得低效和不可扩展。尤其是随着互联网向全球化发展，HOSTS.TXT文件变得过大且更新频繁，无法满足需求。

为了应对早期域名解析方案的局限性，Paul Mockapetris在1983年提出了DNS系统的概念并编写了最初的DNS协议规范（RFC 882 和 RFC 883，后被更完善的RFC 1034 和 RFC 1035替代）。DNS的核心思想是通过一个分布式、层级化的系统来进行域名解析，解决了HOSTS.TXT文件集中管理带来的扩展性问题

[![v2-ed152d58f9c04e9a19e4a053c30dae38_1440w.png](https://img.nightrainmilkyway.cn/img/v2-ed152d58f9c04e9a19e4a053c30dae38_1440w.png)](https://img.nightrainmilkyway.cn/img/v2-ed152d58f9c04e9a19e4a053c30dae38_1440w.png)

### 域名空间的扩展 (1980年代后期)

随着DNS的推出，顶级域名（TLDs）逐渐被引入，并按照不同的用途分类：

通用顶级域名（gTLDs）：如 .com（商业组织）、.org（非营利组织）、.edu（教育机构）、.net（网络相关）。

国家顶级域名（ccTLDs）：如 .cn（中国）、.uk（英国）等，专门为各国或地区保留。

{{< notice tip >}}
域名系统采用层次化结构，其中每一级用“.”符号分隔。根据域名的层级关系，域名可以分为顶级域名（TLD）、二级域名、三级域名等多级域名。下面详细介绍域名的层级划分：

* 顶级域名 (TLD)

顶级域名是域名结构的最高层级，位于域名最右边。TLD通常由ICANN（互联网名称与数字地址分配机构）管理。顶级域名分为以下几类：

通用顶级域名 (gTLDs)： 这些是最常见的顶级域名，用于特定用途或类型的网站：

.com：最初为商业机构设计，现在广泛用于各种网站。

.org：用于非营利组织，但也被许多其他组织采用。

.net：最初为网络服务提供商设计，现在广泛使用。

.edu：用于美国的教育机构。

.gov：用于美国政府部门。

.mil：用于美国军事机构。
国家顶级域名 (ccTLDs)： 每个国家或地区都有专门的顶级域名，以两个字母代码表示。常见的 ccTLD 包括：

.cn：中国

.uk：英国

*  二级域名

二级域名是位于顶级域名之下的下一级域名，通常是组织或企业的名字，用来标识特定的组织、公司或个人。例如：

在www.example.com中，example是二级域名。

在www.google.cn中，google是二级域名。


二级域名通常由域名持有者根据其需求自定义，它们可以是企业名称、品牌、服务类型或其他识别符

* 三级域名及多级域名

三级域名是位于二级域名之下的域名。三级及多级域名通常用于区分子站点、服务或功能。例如：

www：是一个常见的三级域名，表示网页服务（World Wide Web
mail.google.com：mail是三级域名，表示谷歌的邮件服务（Gmail）

{{< /notice >}}

![v2-19057161c905080d05210161b0772ae1_1440w.webp](https://img.nightrainmilkyway.cn/img/v2-19057161c905080d05210161b0772ae1_1440w.webp)

### DNSSEC 的引入 (1990年代末 - 2000年代)

虽然DNS系统设计得非常灵活，但随着互联网的快速发展，安全问题逐渐显现。DNS系统缺乏对解析数据真实性的验证机制，容易受到攻击，如DNS欺骗（DNS Spoofing）和中间人攻击。

为了解决这些问题，DNSSEC（Domain Name System Security Extensions，域名系统安全扩展）在1990年代末提出，并在2000年代开始逐渐推广。DNSSEC通过对DNS记录进行数字签名，确保解析结果的真实性和完整性，防止恶意篡改。

### 根域名服务器的全球部署

DNS的根域名服务器是DNS体系中最顶层的服务器，最初只在美国部署。但为了提高DNS的可靠性和性能，根域名服务器逐渐被扩展到全球范围内。目前有13组根域名服务器，由不同的组织和公司管理，这些服务器分布在多个国家和地区，通过Anycast技术保证全球用户能够快速访问。
![下载 (1).jpeg](https://img.nightrainmilkyway.cn/img/%E4%B8%8B%E8%BD%BD%20(1).jpeg)


{{< notice tip >}}
#### 为什么DNS根服务器只能有13台？

DNS协议的限制：DNS系统最早的设计是在1980年代，那个时候的互联网协议（如IPv4）和硬件性能都相对有限。DNS查询时使用的是UDP数据包，最大包大小为512字节。在这个限制下，返回给客户端的DNS查询结果列表必须足够小，以免超出512字节的限制

根服务器IP地址的数量：在DNS系统中，客户端查询根域名时需要获取根域名服务器的IP地址列表。DNS解析器通过“根提示文件”（root hints file）来获取所有根服务器的IP地址信息。13个根服务器的IP地址列表恰好能适应这个512字节的限制。

{{< /notice >}}

### 国际化域名 (IDN) 的引入

随着全球互联网用户数量的增长，尤其是非英语国家用户的增加，使用仅支持ASCII字符的域名系统逐渐显得不足。为了支持更多的语言字符，国际化域名（IDN）在2000年代引入，允许使用非拉丁字符的域名（如中文、阿拉伯文、韩文等）

## 附录

### 参考文献
[为什么全球域名根服务器只能有13台？加一台给中国很难吗？](https://zhuanlan.zhihu.com/p/361668909?utm_id=0)
### 版权信息

本文原载于 [nightrainmilkyway.cn](https://nightrainmilkyway.cn)，遵循 CC BY-NC-SA 4.0 协议，复制请保留原文出处。