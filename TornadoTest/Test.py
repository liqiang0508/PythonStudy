# -*- coding: utf-8 -*-
import os
import time
import math

print os.getcwd()
UPLOADPATH = "static/uploadfile"  # 上传文件夹名称
path = os.path.join(UPLOADPATH, "666.png").replace("\\", "/")
print ("==", path)
print (path)

print "insert into users(name,age) values ('%s',29)" % (str(math.ceil(time.time())))

print math.ceil(time.time())
