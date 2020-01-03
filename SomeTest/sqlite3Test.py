import sqlite3
import os


if os.path.exists("test.db"):
	pass
	os.remove("test.db")


conn = sqlite3.connect('test.db')
print "Opened database successfully";
c = conn.cursor()
c.execute('''CREATE TABLE  if not exists COMPANY
       (ID INTEGER PRIMARY KEY     NOT NULL,
       NAME           TEXT    NOT NULL,
       AGE            INT     NOT NULL,
       ADDRESS        CHAR(50),
       SALARY         REAL);''')
print "Table created successfully";

# c.execute("INSERT INTO COMPANY (ID,NAME,AGE,ADDRESS,SALARY) \
#       VALUES (1, 'Paul', 32, 'California', 20000.00 )");

# c.execute("INSERT INTO COMPANY (ID,NAME,AGE,ADDRESS,SALARY) \
#       VALUES (null, 'Allen', 25, 'Texas', 15000.00 )");

result = c.execute("INSERT INTO COMPANY (ID,NAME,AGE,ADDRESS,SALARY) \
	  VALUES (?,?,?,?,? )",(None,"497232807@qq.com",28,"cd",8000));
print result
data = c.execute("SELECT ID,NAME,AGE,ADDRESS,SALARY from COMPANY where ID = 11");
print ("id==11",data.fetchone())

cursor = c.execute("SELECT id, name, address, salary  from COMPANY")
for row in cursor:
   print "ID = ", row[0]
   print "NAME = ", row[1]
   print "ADDRESS = ", row[2]
   print "SALARY = ", row[3], "\n"
conn.commit()
conn.close()

