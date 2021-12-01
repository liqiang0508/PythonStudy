
#!/usr/bin/python
# -*- coding: UTF-8 -*-
'''
Description: 
Author: li qiang
Date: 2021-03-31 09:36:09
LastEditTime: 2021-09-24 16:25:27
'''

import sys
import os


if len(sys.argv)!= 2:
    print("please input lua fileName")
else:
    fileName = sys.argv[1]

print(fileName)
source_Str = "local ComponentNode = require(\"app.views.base.ComponentNode\")\n\
local {0} = class(\"{0}\", ComponentNode)\n\
function {0}:start()\n\
\n\
    self.mChild = {{}}\n\
    UITool:getChildrenObj(self.mChild, self.node.nodeNames, self)\n\
    self:event()\n\
    self:initUI()\n\

\n\
end\n\
\n\
function {0}:event()\n\
\n\
    self.mEventHelp = self:createEventHelp()\n\
    self.mEventHelp:registerEvent({{}})\n\
    self.mEventHelp:registerSocketEvent({{}})\n\
\n\
end\n\
\n\
function {0}:initUI()\n\
\n\
   \
\n\
end\n\
\
return {0}"


source_Str = source_Str.format(fileName)
 
with open(fileName+".lua","w") as f:
    f.write(source_Str)

print("generate=="+fileName+"===successs")
os.system("pause")