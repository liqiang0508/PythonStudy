#!/usr/bin/python
# -*- coding: UTF-8 -*-
# excel 导出lua脚本
import os

import shutil
import xlrd
import json

print("Build start****************************************************")


def MoveFile(srcfile, dstfile):  # 移动文件
    if not os.path.isfile(srcfile):
        print("%s not exist!" % srcfile)
    else:
        fpath, fname = os.path.split(dstfile)  # 分离文件名和路径
        if len(os.path.split(dstfile)) > 1 and not os.path.exists(fpath):
            os.makedirs(fpath)  # 创建路径
        shutil.move(srcfile, dstfile)  # 移动文件
        print("move-------> %s -> %s" % (srcfile, dstfile))


# 根据类型对数据处理
def convertValueByType(type, value):
    if type == "i":
        value = int(value)

    if type == "s":
        value = "///" + value + "///"
    return value


def export2Lua(path):
    if os.path.exists(path):
        fileName = os.path.split(file)[1]  # 文件名称 xx.xls
        luaModuleName = os.path.splitext(fileName)[0]
        outFilename = luaModuleName + "Config.lua"  # 导出的lua脚本名称  xx.lua
        if os.path.exists(outFilename):
            os.remove(outFilename)

        writeStr = "local {}={{}}\n".format("DJConfig")
        writeStr = writeStr + "local _Config = {\n"

        workbook = xlrd.open_workbook(path)  # 读取excel文件
        sheets = workbook.sheets()
        sheet = sheets[0]
        MaxCol = sheet.ncols  # 获取列表的有效列数
        MaxRow = sheet.nrows  # 获取该sheet中的有效行数
        startRow = 11  # 开始行数
        length = 0
        for row in range(startRow, MaxRow):
            rowData = {}
            length = length + 1
            for i in range(0, MaxCol):
                key_type = sheet.cell(10, i).value  # 字段类型
                value = sheet.cell(row, i).value  # 字段值

                if key_type != "_" and value != "":  # 字段有值并且不是注释
                    valueType = key_type[0]  # 字段类型
                    if valueType in ["i", "s", "f", "#"] and key_type[1] != "[":  # 不是数组

                        if value != "":  # int数据转成int
                            value = convertValueByType(valueType, value)

                        if valueType == "#" and value != "":  # 是对象
                            data = key_type[1:].split(".")  # #ItemOnline.{iID:iNum}
                            values = value.split(":")
                            key = data[0]
                            keys = data[1][1:-1].split(":")

                            rowData[key] = {}
                            for i in values:
                                index = values.index(i)
                                _key = keys[index][1:]
                                rowData[key][_key] = i

                        if value != "" and valueType != "#":  # 不是对象
                            key = key_type[1:]
                            rowData[key] = value

                    if key_type[1] == "[":  # 是数组
                        if key_type[0] != "#":  # 不是对象数组
                            key = key_type.split(".")
                            key = key[len(key) - 1]
                            rowData[key] = [value]
                        else:  # 对象数组  #[.Test.{sname:iage}
                            key = key_type.split(".")
                            keyName = key[1]  # 获取保存的的key  Test
                            key = key[len(key) - 1]  # 获取保存对象的key
                            keys = key[1:-1].split(":")  # {sname:iage}
                            rowData[keyName] = []

                            values = value.split(",")
                            dataArray = {}
                            for value in values:
                                valueA = value.split(":")
                                for i in valueA:
                                    index = valueA.index(i)
                                    _key = keys[index][1:]  # key
                                    keyValue = valueA[index]  # keyValue
                                    key_type = keys[index][0]  # 值的类型
                                    keyValue = convertValueByType(key_type, keyValue)
                                    # print("keyValue==", keyValue)
                                    dataArray[_key] = keyValue
                                rowData[keyName].append(dataArray)
                        # print("对象数组")

            # 每一行数据处理
            rowStr1 = json.dumps(rowData)
            rowStr1 = rowStr1.replace("\"", "")
            rowStr1 = rowStr1.replace("[", "{")
            rowStr1 = rowStr1.replace("]", "}")
            rowStr1 = rowStr1.replace(":", "=")
            rowStr1 = rowStr1.replace(" ", "")
            rowStr1 = rowStr1.replace("///", "\"")
            rowStr = "[id_" + str(rowData["ID"]) + "]=" + rowStr1 + ","
            writeStr = writeStr + rowStr + "\n"

        writeStr = writeStr + "}\n"

        # commonFunction
        commFunStr = ""
        with open("commonFun.txt", "r") as F:
            commFunStr = F.read()
            F.close()
        commFunStr = commFunStr % (length, luaModuleName, luaModuleName)
        writeStr = writeStr + commFunStr
        # write
        writeStr = writeStr + "\nreturn " + "DJConfig;"
        outFilename = saveDir+"/"+outFilename
        with open(outFilename, "w") as f:
            f.write(writeStr)
            f.close()


targetDir = "sheets"  # 目标文件夹
saveDir = "sheetsLua"  # 导出lua的目录
if os.path.exists(saveDir):
    os.removedirs(saveDir)
os.makedirs(saveDir)

for dirPath, dirNames, filenames in os.walk(targetDir):  # 遍历目录下的所有文件
    for file in filenames:
        path = os.path.join(targetDir, file)
        if file.endswith("xls"):  # 是xlsx后缀的文件
            export2Lua(path)
            print("Export2Lua========>" + path)
        else:
            print("Error %s is not .xls" % (path))

print("Build success**************************************************")
os.system("pause")
