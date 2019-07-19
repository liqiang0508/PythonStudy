from flask import Flask, redirect, url_for,request,session
from flask import render_template
from flask import jsonify
app = Flask(__name__)
app.secret_key='123456789'
@app.route('/')
def hello_world():
    return 'Hello World!'
@app.route('/hello/')
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

@app.route('/logined',methods = ['POST', 'GET'])
def logined():
  email =  session["emil"]
  pwd =  session["pwd"]
  return render_template('logined.html',email = email,pwd = pwd)

@app.route('/login',methods = ['POST', 'GET'])
def login():
   if request.method == 'GET':
      return render_template('login.html')
   else:
      email = request.form.get('email')
      pwd = request.form.get('pwd')
      session["emil"] = email
      session["pwd"] = pwd
      print("pwd===",email,pwd)
      # return render_template('logined.html',email = email,pwd = pwd)
      return redirect(url_for("logined"))
if __name__ == '__main__':
    app.run(host='0.0.0.0',debug = True)