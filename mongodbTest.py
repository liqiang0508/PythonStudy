#!/usr/bin/python
# -*- coding: UTF-8 -*-
import pymongo

myclient = pymongo.MongoClient("mongodb://localhost:27017/")

mydb = myclient["runoob"]



#判断有没有这个db
dblist = myclient.database_names()
if "runoob" in dblist:
  print("have db！")

mycol = mydb["site"]#查询所有数据
for x in mycol.find():
  print(x)


mydb = myclient["hhh"]#创建一个db 只有插入数据才显示
mycol = mydb["sites"]
mydict = { "name": "RUNOOB", "alexa": "10000", "url": "https://www.runoob.com" }
x = mycol.insert_one(mydict) #插入数据
print "x",x

# mycol.delete_many({}) #删除数据