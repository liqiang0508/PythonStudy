'''
Descripttion: 
version: 
Author: liqiang
email: 497232807@qq.com
Date: 2021-12-22 19:48:11
LastEditTime: 2021-12-22 21:18:47
'''
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
# protoc --js_out=library=allPb,binary:. message.proto body.proto
# protoc.exe --js_out=import_style=commonjs,binary:. ZH_IM.proto
CMD = "protoc.exe  --js_out=library=allPb,binary:.  proto/*.proto" 
os.system(CMD)

srcFile = "allPb.js"
dstFile = "js/allPb.js"
moveFile(srcFile, dstFile)

print("buildJs   success================================")
os.system("pause")
