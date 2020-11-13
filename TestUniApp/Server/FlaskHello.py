#!/usr/bin/python
# -*- coding: UTF-8 -*-
from flask import Flask, redirect, url_for,request,session
from flask import render_template
from flask import jsonify
from flask_cors import CORS
import json
import sqlite3
app = Flask(__name__)
# app.secret_key='123456789'

@app.route('/')
def hello_world():
    return render_template('hello.html')

@app.route('/hello',methods=['GET'])
def hello():
	obj = {"name":"Lee","age":28}
	return json.dumps(obj)

@app.route('/post',methods=['POST'])
def post():
	postData = request.get_data()#获取原始json数据 字符串
	jsonData = request.get_json()#json数据  对象
	return jsonData
      
if __name__ == '__main__':
	CORS(app, supports_credentials=True)
	app.run(host='0.0.0.0',port=8080,debug = True)