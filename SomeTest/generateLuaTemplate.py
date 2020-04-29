import os
import sys


srcLua = 'local {0} = class(\"{0}\", require(\"app.core.BaseLayer\"))\n\
{0}.CsbFile = "{0}.csb"\n\
{0}.AimType = 1;\n\
{0}.HasBlackBg = true;\n\
\n\
function {0}:ctor(data)\n\
    self.super.ctor(self);\n\
    self.root_panel = self:bGetCsbNode():getChildByName("root_Panel");\n\
    self:initUI();\n\
\n\
end\n\
\n\
function {0}:initUI()\n\
\n\
    local btn_close = self.root_panel:getChildByName("bg"):getChildByName("btn_close")\n\
    ua.darkButton(btn_close, function()\n\
        self:bClose()\n\
    end )\n\
\n\
\n\
end\n\
\n\
function {0}.create()\n\
    return {0}.new()\n\
end\n\
\n\
return {0}'

arg = sys.argv[1]
print "Start Generate---------------------------------------"+arg+".lua"
code = srcLua.format(arg)

with open(arg+".lua","w") as f:
	f.write(code)
	f.close()


print "Start Generate*************************************end"+arg+".lua"

os.system("pause")