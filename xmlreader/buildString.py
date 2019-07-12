#!/usr/bin/python
# -*- coding: UTF-8 -*-
# http://www.cnblogs.com/krisirk/p/4978063.html

import xlrd
import xml.dom.minidom as Dom  

import os  
import time # 引入time模块
import shutil

xmlfile = 'strings.xls'
workbook = xlrd.open_workbook(xmlfile) #读取excel文件
# print "There are {} sheets in the workbook".format(workbook.nsheets) #获取excel中表单数量
# Langue = ['EN','CH','TH']
# Langue = []
# Langue = workbook.sheets()[0].row(0)[1:]
# print Langue
print "string have language", workbook.sheets()[0].row(0)
data = workbook.sheets()[0].row(0)  #读取第一行有几种语言
Langue=[]
for l in (data):
	if l.value !='':
		print  data.index(l),l.value
	# if l.
		Langue.append(l.value)

Langue = Langue[1:]#去掉第一个ID
# Langue.pop()
print "after",Langue 
for langue in Langue: #把语言存起来遍历生成xml文件
	print langue
	if langue=='':
		break
	doc = Dom.Document()
	f = open("text_"+langue.lower()+".xml", "w")
	root_node = doc.createElement("Texts")
	root_node.setAttribute("Langue", langue)
	doc.appendChild(root_node)


	for booksheet in workbook.sheets():#循环每个表单
	
    		for row in xrange(1,booksheet.nrows):
    		
    			if booksheet.cell(row, 0).value!='' and booksheet.cell(row, 0).value.find('STR_')!=-1:

    				root_node1 = doc.createElement("Text")
    				root_node1.setAttribute("ID", booksheet.cell(row, 0).value)
    				root_node.appendChild(root_node1) 
    				Text = doc.createTextNode(booksheet.cell(row, 1+Langue.index(langue)).value) 
    				root_node1.appendChild(Text) 

    			
    			else:
    			# print"null",row
    				pass
		
		
       
	f.write(doc.toprettyxml(indent = "\t", newl = "\n", encoding = "utf-8"))
	f.close()


print"build success------------------"

for  L in  Langue:
	
	shutil.copyfile("text_"+L.lower()+".xml","../trunk/Resources/Data/text_"+L.lower()+".xml")        #oldfile和newfile都只能是文件
	shutil.copyfile("text_"+L.lower()+".xml","../trunk//proj.android-studio/app/assets/Data/text_"+L.lower()+".xml")
	print 'copy--'+L.lower()+"_xml to Resources success"
	print 'copy--'+L.lower()+"_xml to android-studio success"


os.system("pause")
