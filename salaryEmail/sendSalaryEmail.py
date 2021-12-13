#!/usr/bin/python
# -*- coding: UTF-8 -*-
# http://www.cnblogs.com/krisirk/p/4978063.html

from email.header import Header
from email.utils import formataddr
from email.mime.text import MIMEText
import smtplib
import xlrd
import xml.dom.minidom as Dom
import os
import json
import sys
reload(sys)
sys.setdefaultencoding('utf8')


CONFIG_FILE = "CONFIG.json"  # 配置文件

sendEmail = '发件人邮箱账号'     # 发件人邮箱账号
sendKey = '发件人邮箱密码'     # 发件人邮箱密码
sendTitle = "发件人显示"  # 发件人显示
htmlDir = "html"  # 生成测试html文件目录

def sendMail(touserMail, content, title):
    ret = True
    try:
        msg = MIMEText(content, 'html', 'utf-8')  # 填写邮件内容
        # 括号里的对应发件人邮箱昵称、发件人邮箱账号
        msg['From'] = formataddr([sendTitle, sendEmail])
        # 括号里的对应收件人邮箱昵称、收件人邮箱账号
        msg['To'] = formataddr(["FK", touserMail])
        msg['Subject'] = title                # 邮件的主题，也可以说是标题

        server = smtplib.SMTP_SSL("smtp.qq.com", 465)  # 发件人邮箱中的SMTP服务器，端口是25
        server.login(sendEmail, sendKey)  # 括号中对应的是发件人邮箱账号、邮箱密码
        # 括号中对应的是发件人邮箱账号、收件人邮箱账号、发送邮件
        server.sendmail(sendEmail, [touserMail, ], msg.as_string())
        server.quit()  # 关闭连接
    except Exception:  # 如果 try 中的语句没有执行，则会执行下面的 ret=False
        ret = False
    return ret


def parseConfig():
    if os.path.exists(CONFIG_FILE):
        f = open(CONFIG_FILE)
        config = json.load(f)
        f.close()
        return config
    else:
        return None

if os.path.exists(htmlDir) == False:
    os.mkdir(htmlDir)

config = parseConfig()
if config:
    sendEmail = config["sendEmail"]
    sendKey = config["sendKey"]
    sendTitle = config["sendTitle"]
    excelFile = sys.argv[1]
    isTest = False if len(sys.argv) > 2 else True

    if os.path.exists(excelFile) == False:
        print ("excelFile is not exist")
        os.system("pause")
    else:
        workbook = xlrd.open_workbook(excelFile)  # 读取excel文件
        sheets = workbook.sheets()

        for booksheet in sheets:  # 循环每个表单
            for row in xrange(1, booksheet.nrows):
                sheetName = booksheet.name
                sendHtml = "<meta charset='UTF-8'>"
                name = booksheet.cell(row, 0).value
                email = booksheet.cell(row, 1).value

                for i in xrange(0, booksheet.ncols):
                    value = booksheet.cell(row, i).value
                    key = booksheet.cell(0, i).value
                    text = ""
                    if value == "":
                        text = "{} <br>".format(key)
                    else:
                        if key.startswith("<b>"):
                            value = "<b>{}</b>".format(value)
                        text = "{}: {} <br>".format(key, value)
                    # print "text:",text
                    sendHtml = sendHtml + text
                    fileName = '{}.html'.format(name).decode("utf-8")
                    with open(htmlDir+"/"+fileName, 'w') as f:
                        f.write(sendHtml)
                        f.close()
                if isTest == False:
                    print ("send mail to {} {}".format(email, name).decode("utf-8"))
                    sendMail(email, sendHtml, sheetName)
                else:
                    print ("generate {}.html".format(name).decode("utf-8"))
else:
    print ("CONFIG.json is  error")
    os.system("pause")


# table = workbook.sheets()[0]
# Nrows =  table.nrows  #获取该sheet中的有效行数
# Ncols =  table.ncols  #获取列表的有效列数
# sheetNames = workbook.sheet_names()#sheet name[]


os.system("pause")
