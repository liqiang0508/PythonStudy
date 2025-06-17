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
# df.loc[3, "网址"] = 'https://www.Google.com'  # 新增一列 网址

print(df)

print ("********************************************")
#找打age大于12的行 并把age+2
df.loc[df["Age"] > 12, "Age"] = df["Age"] + 2
print(df)
df.to_excel("data.xlsx")  # 保存到Excel文件
print ("********************************************")

# # 示例数据
# left = pd.DataFrame({'ID': [1, 2, 3], 'Name': ['Alice', 'Bob', 'Charlie']})
# right = pd.DataFrame({'ID': [1, 2, 4], 'Age': [24, 27, 22]})
# # 使用 merge 进行内连接
# result = pd.merge(left, right, on='ID', how='inner')
# print(result)



# 示例数据
# df1 = pd.DataFrame({'A': [1, 2, 3]})
# df2 = pd.DataFrame({'A': [4, 5, 6]})
# # 行合并
# # objs	需要合并的 DataFrame 列表
# # axis	合并的轴，0 表示按行合并，1 表示按列合并
# # ignore_index	是否忽略索引，重新生成索引（默认为 False）
# # keys	为合并的对象提供层次化索引
# result = pd.concat([df1, df2], axis=0, ignore_index=True)
# print(result)


# 示例数据
# left = pd.DataFrame({'A': [1, 2, 3]}, index=[1, 2, 3])
# right = pd.DataFrame({'B': [4, 5, 6]}, index=[1, 2, 4])

# # 使用 join 进行连接
# result = left.join(right, how='outer')
# print(result)