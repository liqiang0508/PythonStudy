'''
Descripttion: 
version: 
Author: liqiang
email: 497232807@qq.com
Date: 2021-12-22 19:48:46
LastEditTime: 2021-12-24 15:52:07
'''
#!/usr/bin/python
# -*- coding: UTF-8 -*-

import os
import shutil

cmdFile = "cmd.cfg"
writeStr = "//@ts-nocheck\n"
writeStr = writeStr + "var CMD={};\n"
writeStr = writeStr + "var CMD2PB={};\n"

# 移动文件
def moveFile(srcfile, dstfile):
    if not os.path.isfile(srcfile):
        print ("%s not exist!" % (srcfile))
    else:
        fpath, fname = os.path.split(dstfile)  # 分离文件名和路径
        if not os.path.exists(fpath):
            os.makedirs(fpath)  # 创建路径
        shutil.move(srcfile, dstfile)
        
with open(cmdFile,"r+") as f:
    while True:
        text_line = f.readline()
        if text_line:
            if "#" not in text_line and len(text_line)>1:
                text_line = text_line.replace("\t","")
                text_line = text_line.replace("\n","")
                text_line = text_line.split(",")
                name = text_line[0]
                number = text_line[1]
                fileName = text_line[2]
                pak = text_line[3]
                writeStr = writeStr + "CMD.{} = {}\n".format(name,number)
                writeStr = writeStr + "CMD2PB[CMD.{}]={{ name:\"{}\", pak:\"{}\", file:\"{}\" }}\n".format(name,name,pak,fileName)
                # print(text_line)
        else:
            break 

writeStr = writeStr + "\nglobalThis.CMD = CMD\n"
writeStr = writeStr + "globalThis.CMD2PB = CMD2PB\n"
with open("cmdDef.ts","w") as f:
    f.write(writeStr)
    f.close()

srcFile = "cmdDef.ts"
dstFile = "ts/cmdDef.ts"
moveFile(srcFile, dstFile)

print("build cmdDef.ts success================")
os.system("pause")