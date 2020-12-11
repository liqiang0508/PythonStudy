#!/usr/bin/python
# -*- coding: UTF-8 -*-

import os
import shutil
print(__file__)
print("copyAssetsToIos")


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


sourcefolder = "unpackage/resources/__UNI__37FA08B"
targetfolder = "AiosProject/HBuilder-Hello/HBuilder-Hello/Pandora/apps/__UNI__37FA08B"
copyFileTree(sourcefolder,targetfolder)

print("copyAssetsToIos--------------end")

os.system("pause")