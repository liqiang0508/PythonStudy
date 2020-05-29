#!/usr/bin/python
# -*- coding: UTF-8 -*-

import requests
from lxml import etree
import os
import re
from selenium import webdriver

# headers = {'User-Agent':'Mozilla/6.0 (Windows; U; Windows NT 6.12; en-US; rv:1.9.1.7) Gecko/20091202 Firefox/3.5.6','Connection': 'close'} 

headers = { 'User-Agent':'Mozilla/5.0 (Linux; U;Android 4.3; en-us; SM-N900T Build/JSS15J)AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30'}

# browser = webdriver
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
	# driver.get(url)
	# driver.implicitly_wait(3)
	# video = driver.find_element_by_class_name("dplayer-video-current")
	# src = video.get_attribute("src")
	# print src
	# driver.quit()
	# downFile(src,"1.mp4")
	htmldata = requests.get(url,headers = headers)
	selector = etree.HTML(htmldata.text)
	videos = selector.xpath("//video")
	title = selector.xpath("//title/text()")
	# print len(videos)
	# print title[0]
	for i in  range(len(videos)):

		video_src= videos[i].get("src")
		print title[0],video_src
		downFile(video_src,title[0]+str(i)+".mp4")

def GetOnePage(pageindex):
	url = "https://zzzttt.me/page/"+str(pageindex)+"/"
	htmldata = requests.get(url)
	selector = etree.HTML(htmldata.text)
	articles = selector.xpath("//article")
	for article in  articles:

		link = article.xpath("a")
		if len(link)>=1:
			
			href = link[0].get("href")
			# print href
			getVideo(href)



# opt = webdriver.ChromeOptions()
# opt.headless = True
# driver = webdriver.Chrome(options=opt)
# driver.implicitly_wait(5)
# driver.get("https://www.baidu.com/")

for i in range(30):
	GetOnePage(i)
# getVideo("https://zzzttt.me/archives/6.html")