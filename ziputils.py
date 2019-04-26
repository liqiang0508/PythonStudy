#!/usr/bin/python
# -*- coding: UTF-8 -*-
import os 
import sys
import zipfile


global azip 
# 初始化一个zip文件
def ZipInit(targetzip):
	global azip
	azip = zipfile.ZipFile(targetzip, 'w')
	
	
	# 添加文件
def AddFile(srcfile):
	global azip
	if os.path.isfile(srcfile):#文件
		azip.write(srcfile)
	
	if os.path.isdir(srcfile):#文件夹
		azip.write(srcfile) #移动目录
		
		for dirpath,dirnames,filenames in os.walk(srcfile):#压缩目录下的所有文件
			for file in filenames:
					# print "file-",file
					# print 
					azip.write(os.path.join(dirpath, file))
	

# 压缩完毕
def ZipEnd():
	global azip
	if azip:
		azip.close()
	else:
		print "zip not init---please init first"

# 解压
def ZipExtral(targetzip,destpath):
	global azip
	azip = zipfile.ZipFile(targetzip)
	for file in azip.namelist():
		azip.extract(file,destpath)
	

# ZipInit("tes1t.zip")
# AddFile("en.js")
# AddFile("ch.js")
# ZipEnd()







