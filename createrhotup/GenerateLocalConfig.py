#!/usr/bin/python
# -*- coding: UTF-8 -*-
print("generateLocalConfig Start==========================")


import os
import hashlib
import json
import shutil
import ziputils
from collections import OrderedDict

IgnorFile = ["CT_main.strings","EN_main.strings","appinfoiii.json","NO_main.strings"]

IgnorDir = ["res\\config","res\\Default"]

#复制 src目录下面所有的文件到 dst目录下面 
def copyFileTree(src,dst ): 
	if os.path.exists(dst):
		print dst+"  delete**** "
		shutil.rmtree(dst)
	else:
		pass
			

	shutil.copytree(src, dst)
	print "copy tree %s -> %s"%( src,dst)

def moveFile(srcfile,dstfile):
	if not os.path.isfile(srcfile):
		print "%s not exist!"%(srcfile)
	else:
		fpath,fname=os.path.split(dstfile)    #分离文件名和路径
		if not os.path.exists(fpath):
			os.makedirs(fpath)                #创建路径
		shutil.move(srcfile,dstfile) 
 # 复制文件
def copyFile(srcfile,dstfile):
    if not os.path.isfile(srcfile):
        print "%s not exist!"%(srcfile)
    else:
        fpath,fname=os.path.split(dstfile)    #分离文件名和路径
        if not os.path.exists(fpath):
            os.makedirs(fpath)                #创建路径
        shutil.copyfile(srcfile,dstfile)      #复制文件

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

def BuildRes():
	print("BuildRes Start**************")
	projectPath = os.getcwd()
	key = "e2ededca-352b-49"
	os.system("CocosCreator.exe  --build platform=ios;debug=false;xxteaKey="+key+" --path "+projectPath)
	print("BuildRes end**************")




scriptVersion = 0
if os.path.exists("appinfoiii.json"):
	with open("appinfoiii.json","r") as f:
		filedata = f.read()
		jsondata = json.loads(filedata)
		scriptVersion = jsondata['scriptVersion']
		print scriptVersion
	
BuildRes()
data = OrderedDict()
scriptVersion = scriptVersion+1
data["scriptVersion"] = scriptVersion
data["files"] = []

os.chdir("build/jsb-default")
walk("src")
walk("res")
os.chdir("../../")
with open("appinfoiii.json","w") as f:
	f.write(json.dumps(data,indent=4))

copyFile("appinfoiii.json","assets/resources/appinfoiii.json")
copyFile("main.js","build/jsb-default/main.js")
copyFileTree("build/jsb-default/src","hotupversion/Script_"+str(scriptVersion)+"/src")
copyFileTree("build/jsb-default/res","hotupversion/Script_"+str(scriptVersion)+"/res")

copyFile("appinfoiii.json","hotupversion/Script_"+str(scriptVersion)+"/appinfoiii.json")

# compress
resdir = "hotupversion/Script_"+str(scriptVersion)+"/res"
quality = "20-50"#压缩比
main = "pngquant.exe"
for dirpath,dirnames,filenames in os.walk(resdir):#压缩目录下的所有文件
            for file in filenames:
                    if file.endswith("png"):
                        # print "compressing......",os.path.join(dirpath, file)
                        cmd = main + " -f --ext .png --quality "+quality+" "+os.path.join(dirpath, file)
                        os.popen(cmd)


# zip
zipdir = "hotupversion/"+"Script_"+str(scriptVersion)
os.chdir(zipdir)
ziputils.ZipInit("Script_"+str(scriptVersion)+".zip")
ziputils.AddFile("res")
ziputils.AddFile("src")
ziputils.ZipEnd()

# move
moveFile("Script_"+str(scriptVersion)+".zip","../Script_"+str(scriptVersion)+".zip")

os.chdir("../../")
BuildRes()
print("generateLocalConfig  Script_"+str(scriptVersion)+"/res+   End==========================")
os.system('pause')