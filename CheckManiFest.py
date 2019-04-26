#!/usr/bin/python
# -*- coding: UTF-8 -*-


import os
import json


def isJson(jsonstr):
    try:
        json_object = json.loads(jsonstr)
    except ValueError, e:
        return False
    return True


OUT = os.getcwd()
for dirpath,dirnames,filenames in os.walk(OUT):#
            for file in filenames:
                    if file.endswith(".manifest"):
                        print "walk......",os.path.join(dirpath, file)
                        path = os.path.join(dirpath, file)
                        f = open(os.path.join(dirpath, file),"r")
                        data = f.read()
                        f.close()
                        if  isJson(data):
                            print path+"----is Json"
                        else:
                            print path+"******is not Json"


os.system("pause")