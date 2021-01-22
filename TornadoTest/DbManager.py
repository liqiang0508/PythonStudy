#!/usr/bin/python
# -*- coding: UTF-8 -*-
# 数据库管理
import pymysql
from dbutils.pooled_db import PooledDB

# 打开数据库连接

# conn=pymysql.connect(
#     host='localhost',
#     port=3306,
#     user='root',
#     password='123456',
#     db='hello',
#     charset='utf8'
# )
pool = PooledDB(pymysql, 5, host='localhost', user='root', passwd='123456', db='testdb', port=3306,
                charset="utf8")  # 5为连接池里的最少连接数


def MySqlSelectAll(sql):
    conn = pool.connection()  # 以后每次需要数据库连接就是用connection（）函数获取连接就好了
    cursor = conn.cursor(cursor=pymysql.cursors.DictCursor)
    rows = cursor.execute(sql)  # 返回结果是受影响的行数
    data = cursor.fetchall()
    # # 关闭游标
    cursor.close()
    conn.close()
    return data


def MySqlSelectOne(sql):
    conn = pool.connection()  # 以后每次需要数据库连接就是用connection（）函数获取连接就好了
    cursor = conn.cursor(cursor=pymysql.cursors.DictCursor)
    rows = cursor.execute(sql)  # 返回结果是受影响的行数
    data = cursor.fetchone()
    # # 关闭游标
    cursor.close()
    conn.close()
    return data


def MySqlInsert(sql):
    conn = pool.connection()  # 以后每次需要数据库连接就是用connection（）函数获取连接就好了
    cursor = conn.cursor()
    b = True  # 是否插入成功
    try:
        # 执行sql语句
        cursor.execute(sql)
        # 提交到数据库执行
        conn.commit()
    except:
        # Rollback in case there is any error
        conn.rollback()
        b = False

    cursor.close()
    conn.close()
    return b

# b = MySqlInsert("insert into users(name,age) values ('liking',29)")
# if b:
#     print "插入ok1"
# else:
#     print "插入 error1"
# #
# print MySqlSelectAll("select * from users")
