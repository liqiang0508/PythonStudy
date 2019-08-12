import sqlite3
import os

global conn

def connect(dbname):
	global conn
	conn = sqlite3.connect(dbname)

def Execute(dbname,sql):
	connect(dbname)
	global conn
	data = conn.execute(sql)
	conn.commit()
	return data

def Closedb():
	global conn
	conn.close()
def GetConnect():
	global conn
	return conn
# connect("123.db")
# Execute('123.db','''CREATE TABLE if not exists WORKER
# 	(ID INTEGER PRIMARY KEY     NOT NULL,
# 	NAME           TEXT    NOT NULL,
# 	AGE            INT     NOT NULL,
# 	ADDRESS        CHAR(50),
# 	SALARY         REAL); ''')



# Closedb()
