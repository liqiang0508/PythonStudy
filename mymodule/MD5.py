#!/usr/bin/python
# -*- coding: UTF-8 -*-

import hashlib

#获取字符串MD5
def getStrMd5(str):
    myhash = hashlib.md5()# create a md5 object
    myhash.update(str)#encrypt the file
    return myhash.hexdigest()

#获取文件MD5
def getFileMd5(filename):
    if not os.path.isfile(filename):
        return
    myhash = hashlib.md5()# create a md5 object
    f = file(filename,'rb')
    
    while True:
        b = f.read(8096)# get file content.
        if not b :
            break
        myhash.update(b)#encrypt the file
    f.close()
    return myhash.hexdigest()