#!/usr/bin/python
# -*- coding: UTF-8 -*-
   
from flask import Flask,render_template
from flask_wtf import FlaskForm#引入FlaskForm类，作为自定义Form类的基类
from wtforms import StringField,SubmitField         #StringField对应HTML中type="text"的<input>元素，SubmitField对应type='submit'的<input>元素
from wtforms.validators import Required#引入验证函数
 
class NameForm(FlaskForm):
    name = StringField('What is your name?',validators=[Required()])
    submit = SubmitField('Submit')



app = Flask(__name__)
app.config['SECRET_KEY'] = 'hard to guess string' 



@app.route("/",methods=['GET','POST'])
def index():
	name = None
	form = NameForm()
	if form.validate_on_submit():#服务器收到没有表单数据的GET请求 ，因此form.validate_on_submit() == False
		name = form.name.data#不执行，跳过
		form.name.data=''#不执行 ，跳过
	return render_template('index.html',name=name,form=form)#把name,form变量传入模板，渲染，返回给客户端


if __name__ == '__main__':
	app.run(host='0.0.0.0',debug = True)