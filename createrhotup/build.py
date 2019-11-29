#!/usr/bin/python
# -*- coding: UTF-8 -*-
import os
print("build Start**************")

projectPath = os.getcwd()
key = "e2ededca-352b-49"
os.system("CocosCreator.exe  --build platform=android;debug=false;xxteaKey="+key+" --path "+projectPath)



print("build End**************")
os.system("pause")