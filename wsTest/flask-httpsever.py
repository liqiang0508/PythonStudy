#!/usr/bin/python
# -*- coding: UTF-8 -*-
from flask import Flask, redirect, url_for,request,session
from flask import render_template
from flask import jsonify
from flask_cors import CORS
from gevent import pywsgi
import json


app = Flask(__name__)
# app.secret_key='123456789'

def object2json(obj):
	return  json.dumps(obj)

@app.route('/',methods = ['GET'])
def getdata():
	# print('请求方式为------->', request.method)
	args = request.args or "no args"
	# print('args参数是------->', args)
	form = request.form.get('name') or 'no form'
	# print('form参数是------->', form)
	return jsonify(args=args, form=form)


@app.route('/req',methods = ['POST'])
def postdata():
	datas =  request.get_json()
	print "name==",datas["name"]
	return 'Hello Flask Test'

@app.route('/hello')
def hello():
    return 'Hello Flask Test'

@app.route('/chat')
def chat():
    return render_template('chat.html')
      
if __name__ == '__main__':
	CORS(app, supports_credentials=True)
	app.run(host='0.0.0.0',port=8080,debug = True)
	# server = pywsgi.WSGIServer(('0.0.0.0', 8081), app)
	# server.serve_forever()
