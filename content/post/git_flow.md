---
title: "Git Flow是什么？为什么需要它"
slug: "Git flow"
description: 
date: 2024-09-24T21:36:55+08:00
lastmod: "2024-09-24T21:36:55+08:00"
image: https://img.nightrainmilkyway.cn/img/ResizedImage_2024-09-24_21-39-26_2.webp
math: 
ai: true
summary: Git Flow是一种Git分支管理模型，适用于团队开发，帮助规范分支操作，避免混乱。主要分支包括Master、Develop、Feature、Release和Hotfix。Master保存稳定版本，Develop是开发主线，Feature用于功能开发，Release做上线前测试，Hotfix用于紧急修复。Git Flow通过清晰的分支规则，确保版本控制有序，提高团队协作效率
license: CC BY-NC-SA 4.0
hidden: false
comments: true
draft: false
categories:
  - git
tags:
  - git 
---
## Git Flow是什么？为什么需要它
当同一个项目中的开发人员越来越多时，如果没有制定好规则，放任大家由着自己的习惯随便Commit的话，迟早会造成灾难。
早在2010年的时候，就有人提出了一套流程，或者说一套规则供大家共同遵守（网址：[http:/nvie.com/posts/a-successful-git-branching-model/](http:/nvie.com/posts/a-successful-git-branching-model/))。之后，一些比较优秀的开发流程相继问世，如GitHub Flow、Gitlab Flow 等。这里仅以Git Flow 为例进行介绍。
## 1.分支应用情境
根据Git Flow 的建议，分支主要分为Master分支、Develop分支、Hotfix分支、Release分支以及Feature分支，各分支负责不同的功能，如图11-1所示。其中Master分支和Develop分支又被称为长期分支，因为它们会一直存在于整个Git Flow中，而其他的分支大多会因任务结束而被删除。

![git-flow.png](https://img.nightrainmilkyway.cn/img/git-flow.png)

- Master 分支。Master 分支主要是用来存放稳定、随时可上线的项目版本。这个分支的来源只能是从别的分支合并过来的，开发者不会直接Commit 到这个分支。因为是稳定版本，所以通常会在这个分支的Commit上打上版本号标签。
- Develop分支。Develop分支是所有开发分支中的基础分支，当要新增功能时，所有的Feature 分支都是从这个分支划分出去的。而Feature分支的功能完成后，也会合并到这个分支。
- Hotfix分支。当在线产品发生紧急问题时，会从Master分支划出一个Hotfx分支进行修复。Hotfix分支修复完成之后，会合并回Master分支，同时合并一份到Develop分支。
为什么要合并回Develop分支？因为如果不这样做，等到Develop分支完成且合并回Master分支时，之前的问题就会再次出现。
那为什么一开始不从Develop分支划分出去修？因为Develop分支的功能可能尚在开发中，这时如果硬要从这里切出去修复再合并回Master分支，只会造成更大的灾难。
- Release分支。当认为Develop分支足够成熟时，就可以把Develop分支合并到Release分支,在其中进行上线前的最后测试。测试完成后，Release分支将会同时合并到Master 及Develop这两个分支中。Master分支是上线版本，而合并回Develop分支，是因为可能在Release分支上还会测到并修正一些问题，所以需要与Develop分支同步，以免之后的版本再度出现同样的问题。
- Feature分支。如果要新增功能，就要使用Feature分支了。Feature分支都是从Develop分
支划分出来的，完成之后会合并回Develop分支。

## 附录

### 参考文献
[Git Flow - 菜鸟教程](https://www.runoob.com/git/git-flow.html)


### 版权信息

本文原载于 [nightrainmilkyway.cn](https://nightrainmilkyway.cn)，遵循 CC BY-NC-SA 4.0 协议，复制请保留原文出处。