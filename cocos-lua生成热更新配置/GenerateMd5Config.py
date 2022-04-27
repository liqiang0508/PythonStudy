'''
Author: LiQiang
Date: 2022-04-27 09:20:11
LastEditors: LiQiang
LastEditTime: 2022-04-27 09:43:10
FilePath: \srcd:\mogaclient\trunk\client_core\GenerateMd5Config.py
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

			filePath = os.path.join(dirpath, file)
			filePath = filePath.replace("\\","/")
			# path = os.path.normpath(path)
			print("walk path====>",filePath)
			filedata = OrderedDict()
			filedata["filename"]= filePath
			filedata["md5"]= getFileMd5(filePath).upper()
			filedata["size"]= getFileSize(filePath)
			
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

walk("src")
walk("res")

with open("appinfoiii.json","w") as f:
	f.write(json.dumps(data,indent=4))





print("generateLocalConfig End==========================")
os.system("pause")