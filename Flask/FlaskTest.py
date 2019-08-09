# -*- coding:utf-8 -*-
from flask import Flask, redirect, url_for,request,session
from flask import render_template
from flask import jsonify

import sqlite3
app = Flask(__name__)
app.secret_key='123456789'

DBNAME = "UsersTable.db"
conn = sqlite3.connect(DBNAME)
conn.execute(''' CREATE TABLE if not exists  users
  (ID INTEGER PRIMARY KEY     NOT NULL,
  EMAIL           TEXT    NOT NULL,
  PWD            TEXT     NOT NULL);''')
conn.close()


@app.route('/')
def hello_world():
    return 'Hello World!'
@app.route('/hello')
def hello():
    return 'Hello '

@app.route('/user/<username>')
def show_user_profile(username):
    # show the user profile for that user
    return 'User %s' % username

@app.route('/post/<int:post_id>')
def show_post(post_id):
    # show the post with the given id, the id is an integer
    return 'Post %d' % post_id

@app.route('/template')
@app.route('/template/<name>')
def template(name=None):
    return render_template('hello.html', name=name)
@app.route('/json')
def Jsontest():
	return jsonify({'test': 'good'})


@app.route('/success/<name>')
def success(name):
 
   return 'welcome %s' % name
  
@app.route('/logout',methods = ['POST', 'GET'])
def logout():
  session.pop("email",None);
  session.pop("pwd",None);
  return redirect(url_for('login'))

@app.route('/register',methods = ['POST', 'GET'])
def register():
  if request.method == 'GET':
    return render_template('register.html')
  else:
    email = request.form.get('email')
    pwd = request.form.get('pwd')
    conn = sqlite3.connect(DBNAME)
    conn.execute(''' INSERT INTO users (ID,EMAIL,PWD) VALUES(?,?,?)''', (None,email,pwd))
    conn.commit()
    conn.close()
    return redirect(url_for("login"))


@app.route('/logined',methods = ['POST', 'GET'])
def logined():
  try:
    email =  session["email"]
    pwd =  session["pwd"]
  except Exception as e:
    return render_template('login.html')
  
  return render_template('logined.html',email = email,pwd = pwd)

@app.route('/login',methods = ['POST', 'GET'])
def login():
   if request.method == 'GET':
      return render_template('login.html')
   else:
      email = request.form.get('email')
      pwd = request.form.get('pwd')
      session["email"] = email
      session["pwd"] = pwd
      print("pwd===",email,pwd)
      conn = sqlite3.connect(DBNAME)
      result = conn.execute(''' SELECT ID,EMAIL,PWD From users WHERE email = ? and pwd = ?''',(email,pwd) )
      # conn.commit()
      
      if result.fetchone()!=None:
        return redirect(url_for("logined"))
      else:
        print("login error")
        return render_template('login.html',errmsg = u"密码账号错误")
      conn.close()

      
if __name__ == '__main__':
    app.run(host='0.0.0.0',port=8080,debug = True)