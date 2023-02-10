#!/usr/bin/python
# -*- coding: UTF-8 -*-

import os
import shutil


# 移动文件
def moveFile(srcfile, dstfile):
    if not os.path.isfile(srcfile):
        print ("%s not exist!" % (srcfile))
    else:
        fpath, fname = os.path.split(dstfile)  # 分离文件名和路径
        if not os.path.exists(fpath):
            os.makedirs(fpath)  # 创建路径
        shutil.move(srcfile, dstfile)


CMD = "protoc.exe  --descriptor_set_out proto/proto.pb  proto/*.proto"
os.system(CMD)

srcFile = "proto/proto.pb"
dstFile = "lua/proto.pb"
moveFile(srcFile, dstFile)

print("build_proto_lua   success================================")
os.system("pause")
