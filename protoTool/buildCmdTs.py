#!/usr/bin/python
# -*- coding: UTF-8 -*-

import os
import shutil

# cmdFile = "cmd.cfg"
# writeStr = "export let CMD = {} as any \nexport let CMD2PB = {} as any\n"

# 移动文件
def moveFile(srcfile, dstfile):
    if not os.path.isfile(srcfile):
        print ("%s not exist!" % (srcfile))
    else:
        fpath, fname = os.path.split(dstfile)  # 分离文件名和路径
        if not os.path.exists(fpath):
            os.makedirs(fpath)  # 创建路径
        shutil.move(srcfile, dstfile)

 # 复制文件
def copyFile(srcfile,dstfile):
    if not os.path.isfile(srcfile):
        print("%s not exist!"%(srcfile))
    else:
        fpath,fname=os.path.split(dstfile)    #分离文件名和路径
        if not os.path.exists(fpath):
            os.makedirs(fpath)                #创建路径
        shutil.copyfile(srcfile,dstfile)      #复制文件
        # print "copy file %s -> %s"%( srcfile,dstfile)

def exportConfig(fileName,path,targetPath):
    print("fileName",fileName)
    cmd_name = "CMD_"+fileName.upper()
    cmd2pb_name = "CMD2PB_"+fileName.upper()
    writeStr = "export let {}:{{[key:string]:number}}= {{}} \n".format(cmd_name)
    writeStr = writeStr + "export let {}:{{[key:number]:{{name:string,mainID:number,aID:number,pak:string,file:string}}}} = {{}}\n".format(cmd2pb_name)   
    with open(path,"r+") as f:
        while True:
            text_line = f.readline()
            if text_line:
                if "#" not in text_line and len(text_line)>1:
                    text_line = text_line.replace("\t","")
                    text_line = text_line.replace("\n","")
                    text_line = text_line.replace(" ","")
                    text_line = text_line.split(",")
                    print(text_line)
                    name = text_line[0] #自定义协议名称
                    mainID = text_line[1]# 主id
                    aID =  text_line[2] #子id
                    isSend =   text_line[3] # 是否发送  发(0)/收(1)
                    fileName = text_line[4] #proto 文件
                    if len(text_line) == 6:
                        pak = text_line[5] #使用的message
                    else:
                        pak = ""
                    writeStr = writeStr +"//{}\n".format(name)
                    id = int(mainID)*100000+int(aID)*10 + int(isSend)
                    writeStr = writeStr + "{}.{}={}\n".format(cmd_name,name,id)
                    writeStr = writeStr + "{}[{}]={{name:\"{}\", mainID:{},aID:{},pak:\"{}\", file:\"{}\" }}\n".format(cmd2pb_name,id,name,mainID,aID,pak,fileName)
                    # print(text_line)
            else:
                break 


    with open(targetPath,"w") as f:
        f.write(writeStr)
        f.close()

# srcFile = "cmdDef.ts"
# dstFile = "ts/cmdDef.ts"
# projectFile = "../assets/hiGame/core/cmdDef.ts"
# #移动cmdDef.ts--》ts/cmdDef.ts
# moveFile(srcFile, dstFile)
# #复制ts/cmdDef.ts--》../assets/hiGame/core/cmdDef.ts
# copyFile(dstFile, projectFile)

cmdDir = "cmd" #cmd文件夹
outDir = "cmd_ts"
for dirPath, dirNames, filenames in os.walk(cmdDir):  # 遍历目录下的所有xls文件
    for file in filenames:
        path = os.path.join(cmdDir, file)
        outPath = os.path.join(outDir, file)
        outPath = outPath.replace(".cfg", "Cmd.ts")
        name = file.split(".")[0]
        # print(path,outPath,name)
        exportConfig(name,path,outPath)



print("build success===========================")
os.system("pause")