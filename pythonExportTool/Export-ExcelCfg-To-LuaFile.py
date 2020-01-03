#!/usr/bin/python
# -*- coding: UTF-8 -*-
import os
# from openpyxl import Workbook
# from openpyxl import load_workbook
import shutil
import sys
import xlrd
reload(sys)
sys.setdefaultencoding( "utf-8" )
# print openpyxl.__version__
print("Build start****************************************************")

def mymovefile(srcfile,dstfile):#移动文件
    if not os.path.isfile(srcfile):
        print "%s not exist!"%(srcfile)
    else:
        fpath,fname=os.path.split(dstfile)    #分离文件名和路径
        if len(os.path.split(dstfile))>1 and not os.path.exists(fpath):
            os.makedirs(fpath)                #创建路径
        shutil.move(srcfile,dstfile)          #移动文件
        print "move-------> %s -> %s"%( srcfile,dstfile)

def ExportFileByXlrd(file):
	print("ExportFileByXlrd========>"+file)
	if os.path.exists(file):
		FileName = os.path.split(file)[1]#文件名称 xx.xlsx
		LuaModuleName = os.path.splitext(FileName)[0]
		outFilename = LuaModuleName+".lua"#导出的lua脚本名称  xx.lua

		if os.path.exists(outFilename):
			os.remove(outFilename)
		
		writeStr = "local {}={{}};\n".format(os.path.splitext(FileName)[0])

		workbook = xlrd.open_workbook(file) #读取excel文件
		sheets = workbook.sheets()
		# print sheets

		for sheet in sheets:#遍历所有表格
			MaxCol = sheet.ncols  #获取列表的有效列数
			MaxRow = sheet.nrows  #获取该sheet中的有效行数
			startrow =3 #开始行数
			for row in xrange(startrow,MaxRow):
				for i in xrange(0,MaxCol):
					if row >= startrow:
						key = sheet.cell(1,i).value#字段
						key_type = sheet.cell(2,i).value#字段类型
						ID = sheet.cell(row, 0).value #ID
						value = sheet.cell(row, i).value #ID
						ID = int(ID)
						
						# 1 ID int 1
						if key_type == "string":
							value = "\"{}\"".format(value)
						if key_type == "int":
							value = int(value)
						# print ID,key,key_type,value
						if True:
							# print ID,key,key_type,value
							if key == "ID":
								writeStr = writeStr+"{}[{}]={{}};\n{}[{}].{} = {};\n".format(LuaModuleName,value,LuaModuleName,value,key,value)
							else:
								writeStr = writeStr+"{}[{}].{} = {};\n".format(LuaModuleName,ID,key,value)

		#write
		writeStr = writeStr+"return "+LuaModuleName+";"
		with open(outFilename,"w") as f:
			f.write(writeStr)
			f.close()
		#move
		desPath = "../../TexasPokerLua/src/app/config/"+outFilename
		mymovefile(outFilename,desPath)



'''def ExportFile(file):#导出文件
	print("ExportFile========>"+file)
	if os.path.exists(file):
		FileName = os.path.split(file)[1]#文件名称 xx.xlsx
		LuaModuleName = os.path.splitext(FileName)[0]
		outFilename = LuaModuleName+".lua"#导出的lua脚本名称  xx.lua

		if os.path.exists(outFilename):
			os.remove(outFilename)
		wb = load_workbook(file)
		sheets = wb.worksheets
		writeStr = "local {}={{}};\n".format(os.path.splitext(FileName)[0])

		for sheet in sheets:#遍历所有表格
			MaxCol = sheet.max_column#最大列数
			MaxRow = sheet.max_row#最大行数
			startrow = 4 #开始行数
			for row in sheet.rows:#遍历每一行
				for i  in range(MaxCol):
					if row[i].row >=startrow:
						colIndex = row[i].col_idx-1#
						key = sheet[2][colIndex].value#字段
						key_type = sheet[3][colIndex].value#字段类型
						value = row[i].value#字段对应的值
						ID = row[0].value#id

						if key_type == "string":
							value = "\"{}\"".format(value)
						if True:
							# print ID,key,key_type,value
							if key == "ID":
								writeStr = writeStr+"{}[{}]={{}};\n{}[{}].{} = {};\n".format(LuaModuleName,value,LuaModuleName,value,key,value)
							else:
								writeStr = writeStr+"{}[{}].{} = {};\n".format(LuaModuleName,ID,key,value)


		#write
		writeStr = writeStr+"return "+LuaModuleName+";"
		with open(outFilename,"w") as f:
			f.write(writeStr)
			f.close()
		
		#move
		desPath = "../../TexasPokerLua/src/app/config/"+outFilename
		mymovefile(outFilename,desPath)
	else:
		print(file+"not exists!!!!!!!!")
'''


targeDir = "../tableconvxls"#目标文件夹
for dirpath,dirnames,filenames in os.walk(targeDir):#遍历目录下的所有文件
            for file in filenames:
                    if True:#file.endswith("xls"):#是xlsx后缀的文件
                    	ExportFileByXlrd(os.path.join(targeDir,file)) 

                    	
print("Build success**************************************************")
os.system("pause")

