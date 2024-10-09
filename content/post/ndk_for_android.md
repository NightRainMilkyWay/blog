---
title: "Zerotermux折腾日记(3)-Arch linux上跑NDK"
description: 
date: 2024-08-10T21:23:21+08:00
image: https://img.nightrainmilkyway.cn/img/1723296375281.webp
math: 
license: CC BY-NC-SA 4.0
hidden: false
ai: true
summary: 在这篇文章中，我记录了如何在Termux上使用Arch Linux运行NDK，重点是通过脚本测试C和C++编译器的执行，确保成功生成并验证了适用于ARM架构的二进制文件
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
上篇文章讲了如何在`termux`上快速安装`arch linux`，然后就可以玩一些好玩的，Google发行的NDK并不支持ARM架构

## 下载NDK
![Screenshot_2024-09-24-19-54-23-824_com.microsoft.emmx-edit.jpg](https://img.nightrainmilkyway.cn/img/Screenshot_2024-09-24-19-54-23-824_com.microsoft.emmx-edit.jpg)
在Android开发者网站上下载NDK，下载地址为：https://developer.android.com/ndk/downloads
然后解压到root目录下
```
unzip android-ndk-r27b-linux.zip
```

然后安装`zip`工具链并新建一个test目录
```sh
pacman -S zip &&
mkdir test && cd test && touch test.sh
```

并填入以下内容
```sh
#!/bin/sh
set -eu

TEST_DIR="$(dirname "$(realpath "$0")")"

## ndk clang resource dir, get by command: <ndk_root>/toolchains/llvm/prebuilt/linux-x86_64/bin/clang --print-resource-dir
RESOURCE_DIR="${TEST_DIR}/../android-ndk-r27b/toolchains/llvm/prebuilt/linux-x86_64/lib/clang/18/"

## ndk sysroot, typically <ndk_root>/toolchains/llvm/prebuilt/linux-x86_64/sysroot/
SYSROOT="${TEST_DIR}/../android-ndk-r27b/toolchains/llvm/prebuilt/linux-x86_64/sysroot/"

## Android target triple
TARGET=aarch64-linux-android21

if command -v clang; then
	CLANG=clang
elif command -v zig; then
	CLANG="zig cc"
else
	print "Cannot find clang or zig\n" >&2
	exit 1
fi

## These options are needed for llvmbox
# -isystem "${SYSROOT}/usr/include/c++/v1" \
# -isystem "${SYSROOT}/usr/include" \
# -isystem "${SYSROOT}/usr/include/aarch64-linux-android"

mkdir -p "${TEST_DIR}/output"

echo "Test C compiler..."
${CLANG} \
	-B "${TEST_DIR}/bin" \
	-resource-dir "${RESOURCE_DIR}" \
	--sysroot="${SYSROOT}" \
	--target="${TARGET}" \
	-xc - \
	"$@" \
	-o "${TEST_DIR}/output/hello-c" \
	<<-EOF
		#include <stdio.h>

		int main() {
		  printf("%s\n", "Hello, C!");
		  return 0;
		}
	EOF

echo "Test C++ compiler..."
${CLANG} \
	-B "${TEST_DIR}/bin" \
	-resource-dir "${RESOURCE_DIR}" \
	--sysroot="${SYSROOT}" \
	--target="${TARGET}" \
	-xc++ -lc++ - \
	"$@" \
	-o "${TEST_DIR}/output/hello-cpp" \
	<<-EOF
		#include <iostream>
		using namespace std;

		int main() {
		  cout << "Hello, C++!\n";
		  return 0;
		}
	EOF

if command -v file >/dev/null; then
	file "${TEST_DIR}/output/hello-c" "${TEST_DIR}/output/hello-cpp"
fi


```

{{< notice tip >}}
项目引用[Android SDK](https://github.com/zongou/android-sndk/blob/main/android-toolchain.sh)

{{< /notice  >}}
![android-sndk.png](https://img.nightrainmilkyway.cn/img/android-sndk.png)
### 测试
在`test`目录下执行`sh test.sh`，会打印出以下日志
```sh
/bin/clang                                
Test C compiler...                                        
Test C++ compiler...                                
/root/test//output/hello-c:
ELF 64-bit LSB pie executable, ARM aarch64, version 1 (SYSV), dynamically linked, interpreter /system/bin/linker64, BuildID[xxHash]=10df539d438a8009, not stripped   
/root/test//output/hello-cpp: ELF 64-bit LSB pie executable, ARM aarch64, version 1 (SYSV), dynamically linked, interpreter /system/bin/linker64, BuildID[xxHash]=8ce9c24e480bcc9d, not stripped   
```



## 附录

### 参考文献
[NDK下载链接](https://developer.android.google.cn/ndk/downloads?hl=zh-cn)

[Android SDK](https://github.com/zongou/android-sndk/blob/main/android-toolchain.sh)
### 版权信息


本文原载于 [nightrainmilkyway.cn](https://nightrainmilkyway.cn)，遵循 CC BY-NC-SA 4.0 协议，复制请保留原文出处。
