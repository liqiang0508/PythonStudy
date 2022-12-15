# -*- coding: UTF-8 -*-
import datetime
from flask import Flask, redirect, url_for, request, session
from flask import render_template
from flask import jsonify
from flask_cors import CORS
import json
import sqlite3
from gevent import pywsgi
import moyu

app = Flask(__name__)


# app.secret_key='123456789'
#你好
@app.route('/')
def hello_world():
    year = datetime.datetime.now().year
    data = moyu.getValidHoliday(year)
    #return "222"
    return render_template("index.html", data=data)


@app.route('/hello', methods=['GET'])
def hello():
    obj = {"name": "Lee", "age": 28}
    return json.dumps(obj)


@app.route('/post', methods=['POST'])
def post():
    postData = request.get_data()
    # print(postData)
    return postData


@app.errorhandler(404)
def page_not_found(error):
    return 'This page does not exist', 404


if __name__ == '__main__':
    # CORS(app, supports_credentials=True)
    # app.run(host='0.0.0.0',port=8089,debug = True)
    server = pywsgi.WSGIServer(('0.0.0.0', 8444), app)
    server.serve_forever()
