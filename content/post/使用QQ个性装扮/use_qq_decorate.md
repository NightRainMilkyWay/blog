---
title: 使用QQ装扮
description: 
date: 2024-08-07T01:06:31+08:00
image: post/使用QQ个性装扮/98661043_p0.jpg
math: 
license: 
hidden: false
comments: true
draft: false
categories:
  - QQ装扮
tags:
  - 百变气泡
  - 主题
---

## 事前准备

1.有root权限
 - [ ] mt管理器
 
2.无root权限
 - [ ] 提前注入好文件提取的QQ
 - [ ] mt管理器

---
## root篇

首先打开装扮商店，找一个免费的主题或气泡
点击分享复制链接例如https://zb.vip.qq.com/mall/item-detail?appid=3&itemid=`3614`&_nav_titleclr=000000&_nav_txtclr=000000

**3614**就是主题ID可以在`/data/user/0/com.tencent.mobileqq/app_theme_810/`找到

![](post/使用QQ个性装扮/ResizedImage_2024-08-07_01-31-34_1874.png)

需要将原主题包里面的文件替换即可，压缩包那一个也需要替换，强制停止QQ后重启生效

类似的气泡ID也是一样的方法获取，例如https://zb.vip.qq.com/mall/item-detail?appid=2&itemid=`6390`&_nav_titleclr=000000&_nav_txtclr=000000

**6390**就是这个气泡ID在`/data/user/0/com.tencent.mobileqq/files/files/vas_material_folder/bubble_dir/`可以找到
![](post/使用QQ个性装扮/ResizedImage_2024-08-07_01-27-03_2196.png)
打开文件替换粘贴下面的内容
```json
{"animation_sets":{"bubbleframe_anim":{"count":"16","repeat":"3","time":"100","zip_name":"bubbleframe","zoom_point":["64","56"]}},"animations":{"stc1":{"align":"TL","alpha":"false","count":"16","cycle_count":"3","rect":["0","0","128","112"],"time":"100","type":"static","zip_name":"voice"}},"bubbleframe_animation":{"animation_set":"bubbleframe_anim"},"color":"0xFFe99ddd","id":13909,"key_animations":[{"align":"TL","animation":"stc1","count":"16","cycle_count":"3","key_word":["麻薯","小兔","变色","好萌","你","我","他","她"],"rect":["0","0","128","112"],"time":"100","version":1596179687,"zip_name":"voice"}],"link_color":"0xFF007eff","loopList":["2053641","2083075","2082103","2069692","2059096","2070015","2081859","2082557","2087018"],"name":"颜文字-麻薯小兔","version":1596179687,"voice_animation":{"align":"TL","animation":"stc1","count":"16","rect":["0","0","128","112"],"time":"100"},"zoom_point":["64","56"]}
```
下面这一串就是气泡ID，把你想要的气泡样式填进去就可以，强制停止后重启生效

```json
["2053641","2083075","2082103","2069692","2059096","2070015","2081859","2082557","2087018"]
```

## 非root篇

之前提到过文件提前，可以无root权限访问data目录是的，非root用户的目录就变成了下面这样
```
app_theme_810/
# 主题路径

files/files/vas_material_folder/bubble_dir/
#气泡路径
```
怎么添加呢，看图,选择添加本地目录，文件选择器点左上角三横，选择QQ，点击使用目录返回即可添加访问，其余步骤和上面一样，
![](post/使用QQ个性装扮/ResizedImage_2024-08-07_01-39-34_1774.png)

