# -*- coding: utf-8 -*-
import time
import os
import base64
import requests
import re
import sys
import random
import string
import hashlib
import sqlite3

localtime = time.localtime(time.time())
print ("localtime :", localtime)

print (os.path.join("an/", "2"))
print (os.getcwd())


# from module import moduleA, moduleB
# from module import *

# url = "http://honour-texaspoker.com/cslmanager/serverstate"
# responce = requests.get(url)
# print responce,base64.b64decode(responce.text)

# print("*" * 22)

# users = {'foo@bar.tld': {'password': 'secret'}}
# print(users.has_key('name'))
# print "a {1} {0}".format("ddd", "aaa")
# print(os.path.basename("a:/b/1.png"))
# print(os.path.splitext("a:/b/1.png"))

# a = "369-9xadaw"
# pattern = re.compile(r'\d+')
# print pattern.findall(a)
# print re.search("\d+", a).group()
# print("{0} {1} {0}".format("hello", "or"))
# print int("13")


def getStrMd5(str):
    myhash = hashlib.md5()  # create a md5 object
    myhash.update(str)  #encrypt the file
    return myhash.hexdigest()


def ranstr(num):
    result = ""
    # salt = ''.join(random.sample(string.ascii_letters + string.digits, num))
    for i in range(0, num):
        salt = random.choice(string.ascii_letters + string.digits)
        result = result + salt
    return result


# moduleA.SayHello()
# moduleB.SayHello()
# for i in range(1,8):
# 	time.sleep(2)
# 	print i
# print sys.maxsize
# print sys.maxint
# print "".join(random.sample('zyxwvutsrqponmlkjihgfedcba',25)).upper()
# value = ranstr(25).upper()
# print("value=====", value)

# filename = "adwda/p/a.zip"
# path = os.path.splitext(filename)[0]
# houzui = os.path.splitext(filename)[1]
# print path, houzui
# a = "ada\wa"
# print a

# b = [1, 4, 96]
# print 1 in b, b.index(4)

# print 8 ^ 8 ^ 0
# a = "3694"
# print a[0:2]

# b = [1, 2, 4]
# print b

# del b[2]
# print b

# p = "1,2,3"
# print p.split(",")
# print(".".join(reversed("123")))
# b = [1, 2, 3, 4]

# for x in xrange(0, len(b)):
#     print x, b[x]

# a = -2
# a = a if a >= 0 else -a
# print(a)
# print(len(
#     "https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=246653379193569&height=200&width=200&ext=1604906771&hash=AeR9soxw4SdX8JJJtho"
# ))
# a = 2
# x = lambda x: x + 2
# print x(2), a
os.system('pause')
# os.system('explorer E:\github')
# os.system("explorer "+ "../")
# timestamp = time.time()
# # time = int(time)
# print timestamp,base64.b64encode(str(timestamp)).upper()
# print (getStrMd5(str(timestamp))).upper()
