#!/usr/bin/python
# -*- coding: UTF-8 -*-
# http://www.cnblogs.com/krisirk/p/4978063.html

import xlrd
import xml.dom.minidom as Dom  

import smtplib
from email.mime.text import MIMEText
from email.utils import formataddr
from email.header import Header
my_sender='497232807@qq.com'    # 发件人邮箱账号
my_pass = 'ghwnvmpyewszbijd'              # 发件人邮箱密码
my_user='497232807@qq.com'      # 收件人邮箱账号，我这边发送给自己
import sys
reload(sys)
sys.setdefaultencoding('utf8')

def mail(touserMail,content,title):
    ret=True
    try:
        msg=MIMEText(content,'html','utf-8') #填写邮件内容
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
# Nrows =  table.nrows  #获取该sheet中的有效行数
# Ncols =  table.ncols  #获取列表的有效列数

sheet_names = workbook.sheet_names()#sheet name[]
# print("sheet_names==",sheet_names)
# print sheet_names[0]#第一个sheet

# for i in xrange(0,Ncols):
# 	print i
html = "<table border='1'>\
    <tr>\
        <th>Header 1</th>\
        <th>Header 2</th>\
    </tr>\
    <tr>\
        <td>row 1, cell 1</td>\
        <td>row 1, cell 2</td>\
    </tr>\
    <tr>\
        <td>row 2, cell 1</td>\
        <td>row 2, cell 2</td>\
    </tr>\
</table>"




for booksheet in workbook.sheets():#循环每个表单
    for row in xrange(1,booksheet.nrows):
        text = ""
        header = ""
        tableContent = ""
        group = booksheet.name
        for i in xrange(0,booksheet.ncols):
            rowTitle = booksheet.cell(0, i).value
            content = booksheet.cell(row, i).value
            name = booksheet.cell(0, i).value
            text = text+rowTitle+":"+str(content)+"\n"
            # print name,content
            header = header+"<th>"+name+"</th>"
            tableContent = tableContent+"<td>"+str(content)+"</td>"
        html = "<table border='1' cellpadding = 5>\
        <tr>\
        %s\
        <tr>\
        <tr>\
        %s\
        </tr>\
        </table>"
        html = html%(header,tableContent)
        # print name
        # print "send to "+group+booksheet.cell(row,0).value+"--->"+booksheet.cell(row,1).value+" text-->"+text.replace("\n"," ")
        print text,mail("497232807@qq.com",html,"5月工资")
