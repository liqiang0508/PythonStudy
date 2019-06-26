#!/usr/bin/python
# -*- coding: UTF-8 -*-
from lxml import etree
import re
import os
import RequestsManager
URL = "https://www.dytt8.net/"

htmldata = RequestsManager.getHtmlData(URL)
htmldata.encoding = "gb2312"
selector = etree.HTML(htmldata.text)
title = selector.xpath("//title/text()")
print "title-",title[0].encode('gb2312')

co_content8 = selector.xpath('//div[@class = "co_content8"]')

tables = co_content8[0].xpath('ul/table/tr')
print len(tables)


if os.path.exists("movie.txt"):
  os.remove("movie.txt")
for tr in tables:
  name = tr.xpath('string(.)').replace("\r\n","")
  # print name
  with open("movie.txt","a+") as f:
    f.write(name.encode('gb2312')+'\n')
 

# url = "https://www.csis.org/events/role-center-state-relations-achieving-indias-renewable-energy-target"
# htmldata = RequestsManager.getHtmlData(url)
# selector = etree.HTML(htmldata.text)
# data = selector.xpath('//article[@role = "article"]')
# print data[0].xpath("string(.)").replace("\r\n","")

os.system("pause")