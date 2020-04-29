from flask import Flask, redirect, url_for,request,session
from flask import render_template
from flask import jsonify
from flask_cors import CORS

import sqlite3
app = Flask(__name__)
# app.secret_key='123456789'

@app.route('/')
def hello_world():
    return 'Hello World  Flask Test! '
@app.route('/hello')
def hello():
    return 'Hello Flask Test'

      
if __name__ == '__main__':
	CORS(app, supports_credentials=True)
	app.run(host='127.0.0.1',port=8080,debug = False)