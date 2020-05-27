#!/usr/bin/python
# -*- coding: UTF-8 -*-
import pymysql
import json



# 打开数据库连接

conn=pymysql.connect(
    host='localhost',
    port=3306,
    user='root',
    password='123456',
    db='hello',
    charset='utf8'
)



def MySqlSelectAll(sql):
	cursor=conn.cursor(cursor=pymysql.cursors.DictCursor)
	rows=cursor.execute(sql)  # 返回结果是受影响的行数
	data = cursor.fetchall()
	# # 关闭游标
	cursor.close()
	return data

def MySqlSelectOne(sql):
	cursor=conn.cursor(cursor=pymysql.cursors.DictCursor)
	rows=cursor.execute(sql)  # 返回结果是受影响的行数
	data = cursor.fetchone()
	# # 关闭游标
	cursor.close()
	return data



print MySqlSelectOne("select * from userinfo")
print MySqlSelectOne("SELECT VERSION()")
conn.close()