---
title: "CuprumTurbo Scheduler V20 性能前瞻"
slug: "Custom Block"
description: 
date: 2024-11-24T19:42:21+08:00
lastmod: "2024-11-24T19:42:21+08:00"
image: https://img.nightrainmilkyway.cn/img/119764162_p0.png
math: 
ai: false
license: CC BY-NC-SA 4.0
hidden: false
comments: true
categories:
  - CuprumTurbo Scheduler 
tags:
  - CuprumTurbo Scheduler
---
## CuprumTurbo Scheduler V20 性能前瞻
## 叠甲
GitHub地址：https://github.com/chenzyadb/CuprumTurbo-Scheduler
CuprumTurbo Scheduler 作者为@chenzyadb

# V20相对于V19的改动

与V19版本相比新版本引入了setProperty,这个东西有什么用呢？
简单翻译一下,就是设置属性

![](https://img.nightrainmilkyway.cn/img/202411241845647.png)

那么在CT中有什么用呢？

诶，以往的配置文件结构中，各个模块的功能是分开的，比如`CpuGovernor，ThreadSchedOpt，MtkGpuGovernor `各个模块之间的参数和模式都是预设好的，模块之间是相互独立的，现在你可以简单理解为动态调整属性

举个例子，CPU频率加速,触发条件包含tap swipe gesture heavyload jank bigJank,分别在 点击屏幕 滑动屏幕 手势操作 重负载 掉帧 严重掉帧 时触发.在v19中这些条件对应的boots和extraMargind的值是固定,而在v20中你可以通过setProperty来动态调整这些参数,boots,extraMargin,gpuFreq,ddr,都可以通过setProperty来调整,相对的配置文件也超过了1000行

![](https://img.nightrainmilkyway.cn/img/202411241855728.png)
![](https://img.nightrainmilkyway.cn/img/202411241859005.png)


比较容易理解的例子就是,当cpu温度过高时，降低powelinmit,来达到限制功耗的目的，最早在V18中出现过，V19就改了

# 测试

测试环境:红米K60 Ulatr,HyperOS 1.0.22,CTv20 Alpha

游戏:当然是原神啦

内容：且试身手琳尼试用 5分钟 连续挑战打怪

PS:感觉这样对比会更好一点，起码相对跑图来说.

这是一张拼接过的图，很大，建议保存下拉看
![](https://img.nightrainmilkyway.cn/img/202411241915158.png)

## 功耗对比
相对于V19,功耗可能有些下降，你问问我为什么这么说，我也不知道，我只是感觉到了

![](https://img.nightrainmilkyway.cn/img/202411241837146.jpg)
不得不说还是内核态更好一点jank都少

可能你也发现了，第一列和第六七列分别为官调和V20，功耗都是最低的，为什么呢，要不是一开始调度没跑起来，我都以为是V20了，
经过仔细观察，得益于官调锁？GPU频率350左右，奶奶滴玩阴的是吧
![](https://img.nightrainmilkyway.cn/img/202411241837288.jpg)

看CT这边
![](https://img.nightrainmilkyway.cn/img/202411241837115.jpg)

只能说 6 
然后就得到了第一列这个极低功耗下的结果，当然功耗也来到了5.3w
![](https://img.nightrainmilkyway.cn/img/202411241937146.jpg)
![](https://img.nightrainmilkyway.cn/img/202411241837387.jpg)

## CPU频率曲线&Cycles
![](https://img.nightrainmilkyway.cn/img/202411241837251.jpg)
![](https://img.nightrainmilkyway.cn/img/202411241837058.jpg)
![](https://img.nightrainmilkyway.cn/img/202411241837320.jpg)
![](https://img.nightrainmilkyway.cn/img/202411241837180.jpg)

## 总结
![](https://img.nightrainmilkyway.cn/img/202411241942386.jpg)

# 结语
