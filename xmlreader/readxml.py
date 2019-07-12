#!/usr/bin/python
# -*- coding: UTF-8 -*-
# http://www.cnblogs.com/krisirk/p/4978063.html

import xlrd
import xml.dom.minidom as Dom  

import smtplib
from email.mime.text import MIMEText
from email.utils import formataddr
my_sender='497232807@qq.com'    # 发件人邮箱账号
my_pass = 'cuhaopnnncepbgfg'              # 发件人邮箱密码
my_user='497232807@qq.com'      # 收件人邮箱账号，我这边发送给自己


def mail(touserMail,content,title):
    ret=True
    try:
        msg=MIMEText(content,'plain','utf-8') #填写邮件内容
        msg['From']=formataddr(["title",my_sender])  # 括号里的对应发件人邮箱昵称、发件人邮箱账号
        msg['To']=formataddr(["FK",touserMail])              # 括号里的对应收件人邮箱昵称、收件人邮箱账号
        msg['Subject']= title                # 邮件的主题，也可以说是标题
 
        server=smtplib.SMTP_SSL("smtp.qq.com", 465)  # 发件人邮箱中的SMTP服务器，端口是25
        server.login(my_sender, my_pass)  # 括号中对应的是发件人邮箱账号、邮箱密码
        server.sendmail(my_sender,[touserMail,],msg.as_string())  # 括号中对应的是发件人邮箱账号、收件人邮箱账号、发送邮件
        server.quit()  # 关闭连接
    except Exception:  # 如果 try 中的语句没有执行，则会执行下面的 ret=False
        ret=False
    return ret

xmlfile = 'Test.xlsx'
workbook = xlrd.open_workbook(xmlfile) #读取excel文件

table = workbook.sheets()[0]
Nrows =  table.nrows  #获取该sheet中的有效行数
Ncols =  table.ncols  #获取列表的有效列数



# for i in xrange(0,Ncols):
# 	print i

for booksheet in workbook.sheets():#循环每个表单
	for row in xrange(1,booksheet.nrows):
		text = ""
		for i in xrange(2,Ncols):
			rowTitle = booksheet.cell(0, i).value
			num = booksheet.cell(row, i).value
			text = text+rowTitle+":"+str(num)+"\n"
	
		print "send to "+booksheet.cell(row,0).value+"--->"+booksheet.cell(row,1).value
		print text,mail("497232807@qq.com",text,"5月工资")
