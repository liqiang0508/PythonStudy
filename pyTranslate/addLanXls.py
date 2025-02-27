
#!/usr/bin/python
# -*- coding: UTF-8 -*-

import os
import sys
import translators as ts
import pandas as pd
# https://github.com/UlionTse/translators

#xls文件批量翻译一个语言

#翻译文本
def translate(text, fromLan,toLan,translator):
    res = ts.translate_text(text,translator=translator,from_language=fromLan,to_language=toLan)
    return res

#翻译xls 默认从en到addLan
def translateXls(addLan,xlsFile,translator):
    df = pd.read_excel(xlsFile)
    lanData = [] #添加列的数据
    colName = df.columns.to_list()
    #遍历每一行第三列数据(en字符串)
    for index, row in df.iterrows():
        en_value = row[3]
        translate_value = translate(en_value, "en", addLan,translator)
        print(f"translate {en_value}==>{addLan}:{translate_value}")
        lanData.append(translate_value)
  
    #重复列名修改 不要.1的后缀
    column_mapping = {col: col.split('.')[0] for col in df.columns}
    df.rename(columns=column_mapping, inplace=True)
    
    #判断是否有对应addlan的列,没有就添加
    if addLan not in colName:  
        # colName.append(addLan)
        df.insert(len(colName), addLan, lanData)
    else:
        df[addLan] = lanData

    df.to_excel(xlsFile,engine="openpyxl",index=False)


# 获取输入的参数作为翻译的语言
args = sys.argv
#需要添加的语言
addLan = args[1]
#翻译服务
translateService = "baidu"
if(len(args)==3):
    translateService = args[2]
#遍历当前文件夹下面的xls文件
current_directory = os.getcwd()
# 遍历当前文件夹下的所有文件和文件夹
for root, dirs, files in os.walk(current_directory):
    for file in files:
        # 检查文件扩展名是否为 .xls
        if file.endswith('.xls'):
            print("translateXls:",file)
            translateXls(addLan,file,translateService)



os.system("pause")




