from flask import Flask, render_template, request,redirect,url_for,send_from_directory
from werkzeug.utils import secure_filename


import os
import ziputils
app = Flask(__name__)

UPLOAD_FOLDER = os.getcwd()+"/uploadfiles"
if not os.path.exists(UPLOAD_FOLDER):
	os.makedirs(UPLOAD_FOLDER)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


@app.route('/')
def Home():
    return 'upload file!'

@app.route('/hello/')
def hello_world():
    return 'Hello World!'

@app.route('/upload')
def upload():
   return render_template('upload.html')

@app.route('/uploaded/?<string:filename>')
def uploaded(filename):
   return render_template('uploaded.html',message = "upload success",filename =filename )

@app.route('/uploader', methods = ['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
      f = request.files['file']
      app.logger.info("upload_file--"+f.filename)
      filename = secure_filename(f.filename)
      saveFilePath = os.path.join(app.config['UPLOAD_FOLDER'],filename)
      f.save(saveFilePath)
      # session['filenames'] = [filename]
      houzuiName = os.path.splitext(f.filename)[1]
      if houzuiName== ".zip":
        ziputils.ZipExtral(app.config['UPLOAD_FOLDER']+"/"+f.filename,app.config['UPLOAD_FOLDER']) 
      return redirect(url_for('uploaded',filename = filename))
    else:
      return render_template('upload.html')

@app.route('/uploads/<path:filename>')
def get_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

if __name__ == '__main__':
   app.run(host='0.0.0.0',debug = True)