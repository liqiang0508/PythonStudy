'''
Descripttion: 
version: 
Author: liqiang
email: 497232807@qq.com
Date: 2021-12-22 19:48:11
LastEditTime: 2022-07-21 15:57:30
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
# pbjs -t static-module -w commonjs -o proto.js *.proto
# CMD = "protoc.exe  --js_out=library=allPb,binary:.  proto/*.proto" 
pbFile = "gameProto.js"
CMD = "pbjs -t static-module -w commonjs -o "+pbFile+" proto/*.proto"
CMD2 = "pbts -o Proto.d.ts " + pbFile
os.system(CMD)
os.system(CMD2)

with open(pbFile,"r") as f:
    data = f.read()
    data = data.replace("protobufjs/minimal","./protobuf")
    f.close()
    with open(pbFile,"w") as f:
        f.write(data)
        f.close()

dstFile = "js/"+pbFile
moveFile(pbFile, dstFile)

print("buildJs   success================================")
os.system("pause")
