#!/usr/bin/python
# -*- coding: UTF-8 -*-
import urllib
import socket
import hashlib
import random
import string

# 获取网络上的文件
def GetNetFile(url,savename,callback):
    if callback:
        urllib.urlretrieve(url,savename,callback)
    else:
        urllib.urlretrieve(url,savename)

#获取电脑名
def getMyComputerName():
    myname = socket.getfqdn(socket.gethostname(  ))
    return myname

#获取ip
def getMyIp():
    myname = socket.getfqdn(socket.gethostname(  ))
    return socket.gethostbyname(myname)

#获取mac
def get_mac_address(): 
    mac=uuid.UUID(int = uuid.getnode()).hex[-12:] 
    return ":".join([mac[e:e+2] for e in range(0,11,2)])

# 获取文件md5           
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

# 获取字符串md5 
def getStrMd5(str):
    myhash = hashlib.md5()# create a md5 object
    myhash.update(str)#encrypt the file
    return myhash.hexdigest()

#修改json文件里面的一个key
def ChangeJsonFileData(fileName,key,data):
    originFile = open(fileName,"r")
    origindata = originFile.read()
    originFile.close()
    origindata_ = json.loads(origindata)
    if origindata_[key]:
        origindata_[key] = data
        f = open(fileName,"w")
        f.write(json.dumps((origindata_)))
        f.close()

    else:
        print "json no"+key

#判断是否是josn
def isJson(jsonstr):
    try:
        json_object = json.loads(jsonstr)
    except ValueError, e:
        return False
    return True
    
#获取随机位数字符串
def getRandStr(num):
    return "".join(random.sample(string.ascii_letters+string.digits,num))



print getRandStr(2)