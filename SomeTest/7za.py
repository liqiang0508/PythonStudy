#!/usr/bin/python
# -*- coding: UTF-8 -*-
import os


def zipFolder(savefile, zipFolder, pwd):  #压缩文件

    cmd = "7za.exe a -r   " + savefile + " " + zipFolder + "  -mx=9 -mm=LZMA"
    if pwd:
        cmd = cmd + " -p" + pwd
    print cmd
    os.system(cmd)


def extralFolder(zippath, savefoler, pwd):  #解压zip

    # savefoler = os.path.join( os.getcwd(),savefoler)

    cmd = "7za.exe x -o" + savefoler + " " + zippath

    if pwd:
        cmd = cmd + " -p" + pwd
    print cmd
    os.system(cmd)


# zipFolder("test7.zip","../html/easyui","123")
# zipFolder("test7.7z","../html/easyui","123")
# zipFolder("test8.7z","Script_8","123")
# zipFolder("test7.zip","*.png","123")

path1 = "test7.zip"

extralFolder(path1, "abc", "123")
