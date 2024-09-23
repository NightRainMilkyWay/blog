---
title: "Zerotermux折腾日记(2)-Arch linux安装git"
description: 
date: 2024-08-10T20:58:28+08:00
image: https://img.nightrainmilkyway.cn/img/1723295107649.webp
math: 
license: CC BY-NC-SA 4.0
hidden: false
comments: true
draft: false
categories:
  - termux
  - git
tags:
  - termux
  - git
  - zerotermux
  - Arch_linux
---

## 安装git
```bash
pacman -S  git
```
### 配置git
```bash
git config --global user.name "Your Name"
git config --global user.email "youremail@example.com"
```
### 测试git
```bash
git --version
```
### 克隆仓库
```bash
git clone https://github.com/yourusername/yourrepository.git
```
### 提交代码
```bash
git add .
git commit -m "your commit message"
git push origin master
```
### 拉取代码
```bash
git pull origin master
```

## 使用ssh连接github

### 生成ssh密钥
```bash
ssh-keygen -t rsa -C "youremail@example.com"
```
### 添加ssh密钥到ssh-agent
```bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_rsa
```
### 添加ssh密钥到github
```bash
cat ~/.ssh/id_rsa.pub
```
### 测试ssh连接
```bash
ssh -T git@github.com
```
### 克隆仓库
```bash
git clone git@github.com:yourusername/yourrepository.git
```


## git常用命令及注释

```bash
git init # 初始化仓库
git add . # 添加所有文件到暂存区
git commit -m "commit message" # 提交暂存区文件到仓库区
git push origin master # 将本地分支推送到远程仓库
git pull origin master # 从远程仓库拉取最新代码
git status # 查看仓库状态
git log # 查看提交历史
git diff # 查看暂存区与工作区差异
git reset --hard HEAD # 回滚到最新提交
git checkout -- file # 撤销工作区修改
git branch # 查看分支
git branch <branch-name> # 创建分支
git checkout <branch-name> # 切换分支
git merge <branch-name> # 合并分支
git remote -v # 查看远程仓库信息
git remote add origin <repository-url> # 添加远程仓库
git remote remove origin # 删除远程仓库
git remote set-url origin <repository-url> # 修改远程仓库地址
git remote update origin --prune # 更新远程仓库信息
git remote show origin # 查看远程仓库详细信息
```


## 附录

### 参考文献

### 版权信息

本文原载于 [nightrainmilkyway.cn](https://nightrainmilkyway.cn)，遵循 CC BY-NC-SA 4.0 协议，复制请保留原文出处。
