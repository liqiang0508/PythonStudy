#!/usr/bin/python
# -*- coding: UTF-8 -*-

import os
import shutil

cmdFile = "cmd.cfg"
writeStr = "cc.exports.CMD = CMD or{}\n\
CMD = CMD or{}\n\
cc.exports.CMD2PB = CMD2PB or {}\n\
CMD2PB = CMD2PB or {}\n"

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
                writeStr = writeStr + "CMD2PB[CMD.{}] ={{ name= \"{}\", pak = \"{}\", file = \"{}\" }}\n".format(name,name,pak,fileName)
                # print(text_line)
        else:
            break 


with open("cmd.lua","w") as f:
    f.write(writeStr)
    f.close()

srcFile = "cmd.lua"
dstFile = "lua/cmd.lua"
moveFile(srcFile, dstFile)

print("build cmd.lua success")
os.system("pause")