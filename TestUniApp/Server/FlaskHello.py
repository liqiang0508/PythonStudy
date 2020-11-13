#!/usr/bin/python
# -*- coding: UTF-8 -*-
from flask import Flask, redirect, url_for,request,session
from flask import render_template
from flask import jsonify
from flask_cors import CORS
import json
import sqlite3

from time import sleep
# from wsgiref.simple_server import make_server
from gevent.pywsgi import WSGIServer


app = Flask(__name__)
# app.secret_key='123456789'



@app.route('/testsleep')
def test_sleep():
    sleep( 10 )
    return 'Hi, You wait for about 10 seconds, right?'
	
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
	app.run(host='0.0.0.0',port=8080,debug = False,ssl_context=(
        "CA/ca-cert.pem",
        "CA/ca-key.pem"))
 
	# server = make_server("", 8080, app)
	# server.serve_forever()
	
	# http_server = WSGIServer(('0.0.0.0', 8080), app,keyfile='CA/ca-key.pem',certfile='CA/ca-cert.pem')
	# http_server.serve_forever()

	
