#!/usr/bin/python
# -*- coding: UTF-8 -*-
import os
import shutil

def copyFileTree(src,dst): 
	if os.path.exists(dst):
		# print dst+"  delete**** "
		shutil.rmtree(dst)
	else:
		pass
			

	shutil.copytree(src, dst)
	print "copy tree %s -> %s"%( src,dst)

def removeFileInDir(dst,exclude):#排除文件
	for dirpath,dirnames,filenames in os.walk(dst):#压缩目录下的所有文件
            for filename in filenames:
            	   filePath = os.path.join(dirpath,filename)

            	   houzuiName = os.path.splitext(filePath)[1]
                   if houzuiName in exclude:
						
						os.remove(filePath)
                     

curdir = os.getcwd()#编译目录下的py为pyc
cmd = "python  -m compileall " +curdir
os.system(cmd)
print("package success--------------------")



copyFileTree(curdir,"Release")#复制移动到Release文件夹

removeFileInDir("Release",[".py"])  #删除源码
os.system("pause")
