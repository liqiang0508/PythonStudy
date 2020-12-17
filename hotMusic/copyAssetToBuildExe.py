#!/usr/bin/python
# -*- coding: UTF-8 -*-

import os
import shutil
print(__file__)
print("copyAssetsToEXE")


#复制src目录下面所有的文件到 dst目录下面 
def copyFileTree(src,dst ): 
	if os.path.exists(dst):
		print dst+"  delete**** "
		shutil.rmtree(dst)
	else:
		pass
			

	shutil.copytree(src, dst)
	print "copy tree %s -> %s"%( src,dst)
	# return

def copy_File(src,dst):
	shutil.copyfile(src,dst)

sourcefolder = "unpackage/dist/build/h5/static"
targetfolder = "../electronTest/static"
copyFileTree(sourcefolder,targetfolder)

sourcefolder = "unpackage/dist/build/h5/index.html"
targetfolder = "../electronTest/index.html"
copy_File(sourcefolder,targetfolder)

print("copyAssetsToEXE--------------end")

os.system("pause")