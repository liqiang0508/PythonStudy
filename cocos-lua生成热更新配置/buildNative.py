#!/usr/bin/python
# -*- coding: UTF-8 -*-

# 放在AS项目app文件夹下面 生成so文件
import os
import sys

cmd = "ndk-build NDK_TOOLCHAIN_VERSION=clang "
cmd = cmd + " NDK_PROJECT_PATH=" + os.getcwd()
cmd = cmd + " APP_BUILD_SCRIPT=" + os.path.join(os.getcwd(), "jni\Android.mk ")
cmd = cmd + " NDK_APPLICATION_MK=" + os.path.join(os.getcwd(),
                                                  "jni\Application.mk ")
cmd = cmd + " NDK_MODULE_PATH="
module_path = [
    "..\..\..\cocos2d-x", 
    "..\..\..\cocos2d-x\cocos",
    "..\..\..\cocos2d-x\external",
]
for path in module_path:
    cmd = cmd + os.path.join(os.getcwd(), path) + ";"

# NDK_DEBUG=1 为debug版本，请执行py后面加NDK_DEBUG=1 默认为release版本
if len(sys.argv) > 1:
    cmd = cmd +" "+ sys.argv[1]

cmd = cmd.replace("\\", "/")
# print(cmd)
os.system(cmd)
os.system("pause")