#!/usr/bin/python
# -*- coding: UTF-8 -*-

import base64
import os
# with open("bg.jpg", 'rb') as f:
#     base64_data = base64.b64encode(f.read())
#     s = base64_data.decode()
#     data = 'data:image/jpeg;base64,'+s
#     print data



def PicToBase64(pathname):
	for dirpath,dirnames,filenames in os.walk(pathname):#压缩目录下的所有文件
            for files in filenames:
                    if files.endswith("png") or files.endswith("jpg")  :
                    	filePath = os.path.join(dirpath, files)
                    	print "PicToBase64==="+filePath
                    	with open(filePath,"rb") as f:
								base64_data = base64.b64encode(f.read())
								s = base64_data.decode()
								data = 'data:image/jpeg;base64,'+s
								f.close()
								with open(filePath,"wb") as f1:
										f1.write(data)
										f1.close() 

PicToBase64("Texture")