# -*- coding: utf-8 -*-
import time
import os
import base64
import requests
import re
localtime = time.localtime(time.time())
print "本地时间为 :", localtime

print os.path.join("an/","2")
print os.getcwd()
import sqlite3



# url = "http://honour-texaspoker.com/cslmanager/serverstate"
# responce = requests.get(url)
# print responce,base64.b64decode(responce.text)

print("*"*22)

users = {'foo@bar.tld': {'password': 'secret'}}
print(users.has_key('name'))
print "a {1} {0}".format("ddd","aaa")
print(os.path.basename("a:/b/1.png"))
print(os.path.splitext("a:/b/1.png"))

a = "369-9xadaw"
pattern = re.compile(r'\d+')
print pattern.findall(a)
print re.search("\d+",a).group()
print("{0} {1} {0}".format("hello","or"))