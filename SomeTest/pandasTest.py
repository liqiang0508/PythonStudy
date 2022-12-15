# '''
# Author: liqiang
# Date: 2022-12-15 15:16:10
# LastEditors: liqiang
# LastEditTime: 2022-12-15 15:16:11
# FilePath: \srcc:\Users\Admin\Desktop\pandas.py
# Description:

# Copyright (c) 2022 by superZ, All Rights Reserved.
# '''
import pandas as pd

mydataset = {
  'sites': ["Google", "Runoob", "Wiki"],
  'number': [1, 2, 3]
}

myvar = pd.DataFrame(mydataset)
print(myvar)
myvar.index.name = 'id'
myvar.to_excel("666.xlsx")

myvar.loc[0,"sites"] = "changed"
myvar.to_excel("666.xlsx")
myvar.to_json("666.json")
myvar.to_csv("666.csv")
print(myvar)


