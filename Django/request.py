#!/usr/bin/python
# -*- coding: UTF-8 -*-
import requests
r = requests.get('http://127.0.0.1:8000/')
print r.text

url = "http://127.0.0.1:8000/upload/"
data = None
# files = { 'img':open('123.txt', 'rb') }
# r = requests.post(url, data, files=files)
# print r

# 上传文件
def postFile(url,file,data):
	files = {'img':open(file, 'rb') }
	r = requests.post(url, data, files=files)
	print r 

# f = open("2333",'a')
# for x in xrange(1,10):
	
# 	f.write(str(x)+"\n")
	
# # f.writelines("dada999")
# f.close()


postFile(url,"2333",{"user":"LEE"})
