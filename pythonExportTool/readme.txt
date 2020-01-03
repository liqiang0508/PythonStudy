说明：导出tableconvxls文件夹下面所有xlsx文件 到lua配置

使用：1 使用打包后的exe， 点击Export-ExcelCfg-To-LuaFile.exe

2 使用py源码 ，需要安装python环境，

进入cmd  运行 pip install openpyxl 安装openpyxl库



打包：如过exe不能满足需要。需要修改源码，打包成exe使用，或者直接修改运行源码

安装打包exe环境：pip intsall pyinstaller

运行打包命令:pyinstaller -F Export-ExcelCfg-To-LuaFile.py -i 1.ico


dist目录下面会生成对应exe,再把生成的exe复制替换原来的exe
  