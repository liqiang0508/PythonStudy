#!/usr/bin/python
# -*- coding: UTF-8 -*-
import os
import shutil
#把 zipFolder指定文件夹压缩成saveZipName
def zipFolder(saveZipName,zipFolder,pwd):#压缩文件

	cmd = "7za.exe a    "+saveZipName+" "+zipFolder +"  -mx=9 -mm=LZMA"
	if pwd:
		cmd = cmd +" -p"+pwd
	print cmd
	os.system(cmd)

#解压zip
def extralFolder(zippath,savefoler,pwd):#解压zip
	
	# savefoler = os.path.join( os.getcwd(),savefoler)
	if not os.path.exists(savefoler):
		os.makedirs(savefoler)

	cmd = "7za.exe x -o"+savefoler+" "+zippath

	if pwd:
		cmd = cmd +" -p"+pwd
	print cmd
	os.system(cmd)



targetZip = "test7.zip"
if os.path.exists(targetZip):
	os.remove(targetZip)

# 7za.exe a 666.zip .\123\*
zipFolder(targetZip,".\\123\\*","1234")


testdir = "abc"
if os.path.exists(testdir):
	shutil.rmtree(testdir)
extralFolder(targetZip,testdir,"1234")

os.system("pause")