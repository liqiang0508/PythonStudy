#!/usr/bin/python
# -*- coding: UTF-8 -*-
import random
import string
import xml
import hashlib
import time

print string.ascii_letters
print string.digits


print random.choice([0, 1, 2])

stringA = "appid=wxd930ea5d5a258f4f&body=test&device_info=1000&mch_id=10000100&nonce_str=ibuaiVcKdpRxkhJA"
stringSignTemp = stringA+"&key=192006250b4c09247ec02edce69f6a2d"  # 注：key为商户平台设置的密钥key

# sign=MD5(stringSignTemp).toUpperCase()="9A0A8659F005D6984697E2CA0A9CF3B7" #注：MD5签名方式


def getStrMd5(str):
    myhash = hashlib.md5()  # create a md5 object
    myhash.update(str)  # encrypt the file
    return myhash.hexdigest()


s = getStrMd5(stringSignTemp)


print s.upper(), int(time.time())

# 获得当前时间时间戳
now = int(time.time())
# 转换为其他日期格式,如:"%Y-%m-%d %H:%M:%S"
timeArray = time.localtime(now)
print(timeArray)
otherStyleTime = time.strftime("%Y-%m-%d %H:%M:%S", timeArray)
print(otherStyleTime)


print "{}adda{}".format("LOL", "LOL@")
print("adda%s" % "pp")
