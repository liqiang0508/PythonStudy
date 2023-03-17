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

 # 复制文件
def copyFile(srcfile,dstfile):
    if not os.path.isfile(srcfile):
        print ("%s not exist!"%(srcfile))
    else:
        fpath,fname=os.path.split(dstfile)    #分离文件名和路径
        if not os.path.exists(fpath):
            os.makedirs(fpath)                #创建路径
        shutil.copyfile(srcfile,dstfile)      #复制文件
        # print "copy file %s -> %s"%( srcfile,dstfile)

protoDir = "proto" #proto文件夹
outDir = "js"
dirList  = os.listdir(protoDir)
# print("dirList",dirList)
for dirName in dirList:
    path = os.path.join(os.getcwd(),dirName)
    # print(dirName,path)
    fileName = "pb_"+dirName
    pbFile = fileName+".js"
    tsFile = fileName+".d.ts"
    CMD = "pbjs  --dependency protobufjs/minimal.js   --target static-module  --wrap  es6  --force-long --force-message --no-verify --no-convert --no-delimited --no-beautify --no-service -o {}  proto/{}/*.proto".format(pbFile,dirName)
    CMD2 = "pbts  --name {} --no-comments -o {}  {}".format(fileName,tsFile,pbFile)
    os.system(CMD)
#---no-verify --no-convert --no-delimited --no-beautify --no-service  
    with open(pbFile,"r") as f:
        data = f.read()
        data = data.replace("const $root = $protobuf.roots[\"default\"] || ($protobuf.roots[\"default\"] = {});","const $root = {};")
        data = data.replace("$protobuf.","$protobuf.default.")
        # data = data.replace("/minimal","/minimal.js")
        f.close()
        with open(pbFile,"w") as f:
            f.write(data)
            f.close()
       
    os.system(CMD2)
   
    destDir = outDir + "/" + dirName
    if os.path.exists(destDir):
        shutil.rmtree(destDir)
    os.makedirs(destDir)
    dstFile = destDir+"/"+pbFile   
    moveFile(pbFile, dstFile)

    dstFile = destDir+ "/"+tsFile   
    moveFile(tsFile, dstFile)

# os.system("XCOPY  js  ..\\assets\hiGame\game  /Y /e")
print("Success================================")
os.system("pause")

