#!/usr/bin/python
# -*- coding: UTF-8 -*-

import RequestsManager
from lxml import etree

url = "http://www.doutula.com/search?keyword=下班"

htmldata = RequestsManager.getHtmlData(url)
# random_picture
selector = etree.HTML(htmldata.text)

pic = selector.xpath("//div[@class = 'random_picture']/a")

print len(pic)

first  = pic[0]

picurl = first.xpath("img[@ referrerpolicy='no-referrer']")
picurl = picurl[0].get("data-backup")
print first.get("href"),picurl