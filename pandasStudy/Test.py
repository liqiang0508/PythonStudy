import pandas as pd

data = {'Site':['Google', 'Runoob', 'Wiki'], 'Age':[10, 12, 13]}

df = pd.DataFrame(data)

print (df)
print ("********************************************")

#获取site等于Google的行
# googleRow = df.query("Site == 'Google'")
index = df["Site"] == "Google"
googleRow = df[index]
#修改某个值
df.at[index, "网址"] = 'https://www.Google.com'  # 新增一列 网址
print(df)

print ("********************************************")
#找打age大于12的行 并把age+2
df.loc[df["Age"] > 12, "Age"] = df["Age"] + 2
print(df)

df.to_excel("data.xlsx")

