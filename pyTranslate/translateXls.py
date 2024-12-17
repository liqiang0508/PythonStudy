import os
import pandas as pd
import translators as ts

# https://github.com/UlionTse/translators

def translate(text, lan):
    res = ts.translate_text(text, translator='google',from_language="zh",to_language=lan)
    return res

#翻译语言映射
lanMap = {
    "es_mx": "es",
    "tha": "th"
}

def translateXls(xlsFile):
    print("translateXls==========>",xlsFile)
    workbook = pd.read_excel(xlsFile,sheet_name=None)  # 读取excel文件
    for sheet_name, sheet_df in workbook.items():
        booksheets = sheet_df.columns
        title = booksheets.values.tolist()
        Langue = title[3:]
        # print("Langue",Langue)
        # 遍历所有 sheet 每一行
        for row in range(0, sheet_df.shape[0]):
            zh_value = str(sheet_df.iloc[row, 2])
            # print("zh_value",zh_value)
            for langue in Langue:
                if langue == "zh":
                    continue
                if(langue.find(".")>-1): #id 和id重复了
                    langue = langue.split(".")[0]
                index= title.index(langue)
                tolanguage = langue in lanMap and lanMap[langue] or langue
                translate_value = translate(zh_value, tolanguage)
                print(f"translate {zh_value}==>{langue}:",translate_value)
                sheet_df.iloc[row, index] = translate_value
        sheet_df.to_excel(xlsFile,engine="openpyxl",index=False)  

    
targeDir =  os.getcwd()
for dirpath,dirnames,filenames in os.walk(targeDir):#遍历目录下的所有文件
            for file in filenames:
                    if file.endswith("xls"):#是xlsx后缀的文件
                        translateXls(file)
                       
    
os.system("pause")
