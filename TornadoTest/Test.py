# -*- coding: utf-8 -*-
import os

print os.getcwd()
UPLOADPATH = "static/uploadfile"  # 上传文件夹名称
path = os.path.join(UPLOADPATH, "666.png").replace("\\", "/")
print ("==", path)
print (path)
