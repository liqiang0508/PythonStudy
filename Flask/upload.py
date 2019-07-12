from flask import Flask, render_template, request
from werkzeug import secure_filename
import os
app = Flask(__name__)

UPLOAD_FOLDER = os.getcwd()+"/uploadfiles"
if not os.path.exists(UPLOAD_FOLDER):
	os.makedirs(UPLOAD_FOLDER)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/hello2')
def hello_world():
    return 'Hello World!'

@app.route('/upload')
def upload():
   return render_template('upload.html')
	
@app.route('/uploader', methods = ['GET', 'POST'])
def upload_file():
   if request.method == 'POST':
      f = request.files['file']
      filename = secure_filename(f.filename)
      f.save(os.path.join(app.config['UPLOAD_FOLDER'],filename))
      return 'file uploaded successfully'
		
if __name__ == '__main__':
   app.run(debug = True)