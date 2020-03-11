#!/usr/bin/python
# -*- coding: UTF-8 -*-
import requests
from lxml import etree

from selenium import webdriver
import time
from selenium.webdriver.common.keys import Keys

import re
import os
import sys
headers = {'User-Agent':'Mozilla/9.0 (Windows; U; Windows NT 7.1; en-US; rv:1.9.1.8) Gecko/20091201 Firefox/3.5.6','Connection': 'close'} 

def downFile(Url,SaveName):

    with open(SaveName,"wb") as f:
        responce = requests.get(Url, headers=headers,verify = False)
        f.write(responce.content)
        responce.close()
        print "Save Success---"+Url


def GetSoundName(url):
    name = re.search("id=(\d*.mp3)",url)
    return name.group(1)

def getHtmlData(url):
    responce = requests.get(url,headers=headers,timeout = 500)
    return responce


# url = "http://www.aigei.com/view/71736-32901932.html"
url = sys.argv[1]
folder = re.search("(\d+)-(\d+)",url)
dirName = folder.group()
print dirName
if not os.path.exists(dirName):
	os.makedirs(dirName)


htmldata = getHtmlData(url)
selector = etree.HTML(htmldata.text)
title = selector.xpath("//title/text()")
print title[0]

lis = selector.xpath('//ul[@class="unit-content-main"]')

for i in lis:
	imgurl = i.xpath('li/img')[0].get("src")
	imgname = i.xpath('li/b[@class = "trans-title"]/text()')
	imgname =  imgname[0].strip()
	print imgname
	# print imgurl,dirName+"/"+imgname+".png"
	downFile(imgurl,dirName+"/"+imgname+".png")

os.system("pause")