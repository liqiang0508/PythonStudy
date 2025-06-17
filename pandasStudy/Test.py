import pandas as pd

data = {'Site':['Google', 'Runoob', 'Wiki'], 'Age':[10, 12, 13]}

df = pd.DataFrame(data)

print (df)
print ("********************************************")
df.to_excel("data.xlsx")
#获取site等于Google的行
index = df["Site"] == "Google"
googleRow = df[index]
print(googleRow)
df.at[index, "网址"] = 'https://www.Google.com'  # 新增一列 网址
print(df)
df.to_excel("data.xlsx")

print ("********************************************")
googleRow = df.query("Site == 'Google'")
print(googleRow)

# print ("********************************************")
# df.loc[index, "Site"] = "Baidu"
# print(df)
# # print(df["Site"])

# for col in df.columns:
    # print("col:", col, type(df[col]), df[col].sum())
    # print(df[col])