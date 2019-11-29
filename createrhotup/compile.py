#!/usr/bin/python
# -*- coding: UTF-8 -*-
import os
print("compile Start**************")

projectPath = os.getcwd()

os.system("CocosCreator.exe  --compile platform=android;debug=false  --path "+projectPath)



print("compile End**************")
os.system("pause")