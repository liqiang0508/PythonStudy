# -*- coding: utf-8 -*-
import time
import os
import base64
import requests
localtime = time.localtime(time.time())
print "本地时间为 :", localtime

print os.path.join("an/","2")
print os.getcwd()



url = "http://honour-texaspoker.com/cslmanager/serverstate"
responce = requests.get(url)
print responce,base64.b64decode(responce.text)

print("*"*22)