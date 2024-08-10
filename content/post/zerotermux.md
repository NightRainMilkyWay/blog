---
title: Zerotermux折腾日记(1)-安装arch Linux
description: 
date: 2024-08-10T00:42:16+08:00
image: https://img.nightrainmilkyway.cn/img/1723221912885.webp
math: 
license: 
hidden: false
comments: true
draft: false
categories:
  - ""
  - termux
tags:
  - termux
  - zerotermux
  - Arch_linux
---
## 开始
`termux`作为一个能在Android上运行的终端模拟器，能够模拟Linux环境，重点是不需要root也可以使用，只不过局限性不是很大

## 换源&安装tome脚本

#### 换清华源
国内网络环境确实很差，官方源可能连不上，这里换源加速
```sh
sed -i 's@^\(deb.*stable main\)$@#\1\ndeb https://mirrors.tuna.tsinghua.edu.cn/termux/termux-packages-24 stable main@' $PREFIX/etc/apt/sources.list && apt update && apt upgrade
```

#### 安装tome一键脚本
```sh
awk -f <(curl -L l.tmoe.me/2.awk)
# 备用地址
awk -f <(curl -L gitee.com/mo2/linux/raw/2/2.awk)

```

> 在出现 您要继续吗? Do you want to continue? 之类的选项时：[Y/n]直接按回车，[y/N]输入y再回车
![1723222504923.jpg](https://img.nightrainmilkyway.cn/img/1723222504923.jpg)

前面直接回车即可，直到出现选项输入 `y`时，输入小写的 `y`即可，然后等待到出现图形化界面

![1723222504686.jpg](https://img.nightrainmilkyway.cn/img/1723222504686.jpg)

- DNS 推荐选择：[240c::6666](CFIEC)

- 一言：推荐选择，增加观赏性

- 时区(Timezone)：Asia/Shanghai 回车

- 共享目录：用于在容器中访问宿主文件，默认即可
#### 选择一个Linux发行版安装

> 如果有root权限建议安装`chroot`，没有root权限选择`proot`
推荐使用 `Ubuntu , arch`

![1723222504804.jpg](https://img.nightrainmilkyway.cn/img/1723222504804.jpg)
选择arm64发行版列表

![1723222504999.jpg](https://img.nightrainmilkyway.cn/img/1723222504999.jpg)
![1723222505079.jpg](https://img.nightrainmilkyway.cn/img/1723222505079.jpg)

默默等待安装，中途会出现是否安装 `zsh`建议安装，`tool`如果有桌面需求可以安装，建议 `xfce`

## Pacman 包管理
在 `archlinux` 上安装的软件都通过 `Pacman` 来进行管理。

为了使用 `Pacman` 额外的命令需要先安装 `pacman-contribextra / aur。`

安装 `pacman-contrib` ：



```bash
sudo pacman -S pacman-contrib
```

可以把 Pacman 理解为一个软件管理器（软件管家？），可以进行软件的安装、删除、查询等：


```bash
sudo pacman -S package_name # 安装软件包
pacman -Ss # 在同步数据库中搜索包，包括包的名称和描述
sudo pacman -Syu # 升级系统。 -y:标记刷新、-yy：标记强制刷新、-u：标记升级动作（一般使用 -Syu 即可）
sudo pacman -Rns package_name # 删除软件包，及其所有没有被其他已安装软件包使用的依赖包
sudo pacman -R package_name # 删除软件包，保留其全部已经安装的依赖关系
pacman -Qi package_name # 检查已安装包的相关信息。-Q：查询本地软件包数据库
pacman -Qdt # 找出孤立包。-d：标记依赖包、-t：标记不需要的包、-dt：合并标记孤立包
sudo pacman -Rns $(pacman -Qtdq) # 删除孤立包
sudo pacman -Fy # 更新命令查询文件列表数据库
pacman -F some_command # 当不知道某个命令属于哪个包时，用来在远程软件包中查询某个命令属于哪个包（即使没有安装）
pactree package_name # 
```

## linux终端基本命令

```bash
ls /some_path # 查看某个文件夹下的文件与子文件夹。/ 代表根目录，是 Linux 最顶端的路径，以此开头则为绝对路径
pwd # 查看当前终端所在路径
cat /home/testuser/testfile # 以输出流方式查看某个文件
cd /home/testuser # 切换目录命令。将当前终端切换到某一个路径下
cp ./a.py ./b.py # 复制命令。将当前路径下的 a.py 复制一份并命名为 b.py。./ 代表当前文件夹所在路径，以此开头则为相对路径
cp -r ./a ./b # 复制整体文件夹
rm b.py # 删除命令。删除 b.py
mv a.py b.py # 移动（重命名）命令。将 a.py 更名为 b.py
mkdir my_folder # 新建名为 my_folder 的文件夹
sudo some_command # 使普通用户以 root 权限执行某些命令
```

### 终端美化

安装 lolcat：


```bash
sudo pacman -S lolcat
```

通过管道符（|）将其它命令（如 neofetch）的输出传递给 lolcat：

```bash
neofetch | lolcat
```

![1723223723218.jpg](https://img.nightrainmilkyway.cn/img/1723223723218.jpg)