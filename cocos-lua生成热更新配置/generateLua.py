#!/usr/bin/python
# -*- coding: UTF-8 -*-
import sys

templateStr = "local {0} = class( \"{0}\", require(\"app.core.BaseLayer\") )\n\
{0}.CsbFile = \"{0}.csb\"\n\
{0}.AimType = 1;\n\
{0}.HasBlackBg = true;\n\
\n\
function {0}:ctor()\n\
    self.super.ctor(self);\n\
    self.rootLayer = self:bGetCsbNode();\n\
    self:initUI()\n\
end\n\
\n\
function {0}:initUI()\n\
end\n\
\n\
function {0}.create()\n\
    local tLayer = {0}.new();\n\
    return tLayer;\n\
end\n\
\n\
return {0};"


if len(sys.argv) == 2:
    filename = sys.argv[1]

    print("generate====",filename)
    with open(filename+".lua","wb+") as f:
        f.write(templateStr.format(filename))
        f.close()
else:
    print("please input lua filename.  example: xxxx  no include .lua")