'''
Author: LiQiang
Date: 2022-04-27 09:20:11
LastEditors: LiQiang
LastEditTime: 2022-04-27 09:24:05
FilePath: \srcd:\mogaclient\trunk\client_core\GenerateLocalConfig.py
Description: 

Copyright (c) 2022 by 用户/公司名, All Rights Reserved. 
'''
print("generateLocalConfig Start==========================")


import os
import hashlib
import json
from collections import OrderedDict

IgnorFile = ["CT_main.strings","EN_main.strings","appinfoiii.json","NO_main.strings"]

IgnorDir = ["res\\config","res\\Default"]

def getFileMd5(filename):
    if not os.path.isfile(filename):
        return
    myhash = hashlib.md5()# create a md5 object
    f = open(filename,'rb')
    
    while True:
        b = f.read(8096)# get file content.
        if not b :
            break
        myhash.update(b)#encrypt the file
    f.close()
    return myhash.hexdigest()

def getFileSize(filePath):
	return os.path.getsize(filePath)

def walk(path):
	for dirpath,dirnames,filenames in os.walk(path):#
		# print dirpath
		for file in filenames:
			if dirpath in IgnorDir:
				continue
			if file in IgnorFile:
				continue

			path = os.path.join(dirpath, file)
			# print "walk......",path,getFileMd5(path).upper()
			path = path.replace("\\","/")
			filedata = OrderedDict()
			filedata["filename"]= path
			filedata["md5"]= getFileMd5(path).upper()
			filedata["size"]= getFileSize(path)
			
			data["files"].append(filedata)

scriptVersion = 0
configPath = "src/app/gameii/appinfoiii.json"
if os.path.exists(configPath):
	with open(configPath,"r") as f:
		filedata = f.read()
		jsondata = json.loads(filedata)
		scriptVersion = jsondata['scriptVersion']
		print(scriptVersion)
	

data = OrderedDict()
data["scriptVersion"] = int(scriptVersion)+1
data["files"] = []

walk("srcc")
walk("res")

with open("appinfoiii.json","w") as f:
	f.write(json.dumps(data,indent=4))





print("generateLocalConfig End==========================")