#!/usr/bin/python
# -*- coding: UTF-8 -*-

# 上传cocos热更新的flask脚本

from flask import Flask, render_template, request,redirect,url_for,send_from_directory
from werkzeug.utils import secure_filename

import logging
import os
import ziputils
import json
from flask_cors import CORS

import dbManager

app = Flask(__name__)

UPLOAD_FOLDER = os.getcwd()+"/uploadfiles"
if not os.path.exists(UPLOAD_FOLDER):
	os.makedirs(UPLOAD_FOLDER)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


@app.route('/hello')
def Hello():
    data = dbManager.MySqlSelectAll("select name from userinfo")
    return json.dumps(data)

@app.route('/ip')
def getip():
    return request.remote_addr

@app.route('/')
def Home():
    # app.logger.info('info log')
    # app.logger.warning('warning log')
    return render_template('uploadFile.html')

@app.route('/error')
def error():
    return"ERROR"

@app.route('/upload')
def upload():
   return render_template('uploadFile.html')

@app.route('/uploaded/?<string:filename>')
def uploaded(filename):
   return render_template('uploaded.html',message = "upload success",filename =filename )

@app.route('/uploaderFile', methods = ['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
      f = request.files['file']
       # 获取数据并转化成字典
      
      filekey =  request.form['filekey']
      if filekey!="Casino888":
        return redirect(url_for('error'))

      app.logger.info("upload_file--"+f.filename)
      filename = secure_filename(f.filename)
      saveFilePath = os.path.join(app.config['UPLOAD_FOLDER'],filename)
      f.save(saveFilePath)
      # session['filenames'] = [filename]
      folderName = os.path.splitext(f.filename)[0]
      houzuiName = os.path.splitext(f.filename)[1]
      if houzuiName== ".zip":

        ziputils.ZipExtral(app.config['UPLOAD_FOLDER']+"/"+f.filename,app.config['UPLOAD_FOLDER']+"/"+folderName) 
      return redirect(url_for('uploaded',filename = filename))
    else:
      return render_template('uploadFile.html')

@app.route('/uploaderConfig', methods = ['GET', 'POST'])
def upload_cfg():
    if request.method == 'POST':
      f = request.files['file']
      cfgkey =  request.form['cfgkey']
      if cfgkey!="Casino888":
		    return redirect(url_for('error'))
        
      app.logger.info("upload_cfg--"+f.filename)
      filename = secure_filename(f.filename)
      saveFilePath = os.path.join(app.config['UPLOAD_FOLDER'],filename)
      f.save(saveFilePath)
      return redirect(url_for('uploaded',filename = filename))
    else:
      return render_template('uploadFile.html')

@app.route('/uploads/<path:filename>')
def get_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

if __name__ == '__main__':
   app.debug = True
   handler = logging.FileHandler('flask.log')

   logging_format = logging.Formatter('%(asctime)s - %(levelname)s - %(filename)s - %(funcName)s - %(lineno)s - %(message)s')

   handler.setFormatter(logging_format)
   app.logger.addHandler(handler)
   CORS(app, supports_credentials=True)#跨域
   app.run(host='0.0.0.0',debug = False,ssl_context=(
        "CA/ca-cert.pem",
        "CA/ca-key.pem"))
   # app.run(host='0.0.0.0',debug = False)