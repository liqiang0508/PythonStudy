#!/usr/bin/python
# -*- coding: UTF-8 -*-

# 放在AS项目app文件夹下面 生成so文件
import os
import sys

#删除一个目录下面特定后缀的文件
def removeFile(path,ext):
   for root,dirs,files in os.walk(path):
       for file_name in files:
            if os.path.splitext(file_name)[-1] == ext:
                # print("files:",root,dirs,file_name)
                file_path = os.path.join(root,file_name)
                # print(file_path)
                os.remove(file_path)


cmd = "ndk-build -j NDK_TOOLCHAIN_VERSION=clang "
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

# NDK_DEBUG=1 为debug版本，请执行py后面加NDK_DEBUG=1 
# 默认为release版本
if len(sys.argv) > 1:
    cmd = cmd +" "+ sys.argv[1]

cmd = cmd.replace("\\", "/")
# print(cmd)
#删除上次生成的.a文件 切换debug和release的时候 会用的上次的.a文件 这里就删除一下
removeFile("obj",".a")

os.system(cmd)
os.system("pause")