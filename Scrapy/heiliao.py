#!/usr/bin/python
# -*- coding: UTF-8 -*-

import requests
from lxml import etree
import os
import re


headers = {'User-Agent':'Mozilla/6.0 (Windows; U; Windows NT 6.12; en-US; rv:1.9.1.7) Gecko/20091202 Firefox/3.5.6','Connection': 'close'} 


# article
def downFile(Url,SaveName):
    # Url = Url.replace("https","http")
    print("downFile",Url)
    with open(SaveName,"wb") as f:
        try:
            responce = requests.get(Url, headers=headers,timeout = 5)
            f.write(responce.content)
            responce.close()
            s = requests.session()
            s.keep_alive = False
            print "Save Success---"+Url
        except Exception as e:
            print "downFile error",Url
            time.sleep(1)
            downFile(Url,SaveName)

def getVideo(url):
	htmldata = requests.get(url)
	selector = etree.HTML(htmldata.text)
	videos = selector.xpath("//video")
	title = selector.xpath("//title/text()")
	print len(videos)
	print title[0]
	for video in videos:
		video_src= video.get("src")
		print video_src

def GetOnePage(pageindex):
	url = "https://zzzttt.me/page/"+str(pageindex)+"/"
	htmldata = requests.get(url)
	selector = etree.HTML(htmldata.text)
	articles = selector.xpath("//article")
	for article in  articles:

		link = article.xpath("a")
		print link[0].get("href")




# GetOnePage(1)
getVideo("https://zzzttt.me/archives/6.html")