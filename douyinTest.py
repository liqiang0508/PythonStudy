# -*- coding:utf-8 -*-
import requests
import os
from lxml import etree

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

url = ["http://v.douyin.com/BJt9WW/","http://v.douyin.com/Be8gym/"]

headers = {'User-Agent':'Mozilla/5.0 (iPad; CPU OS 11_0 like Mac OS X) AppleWebKit/604.1.34 (KHTML, like Gecko) Version/11.0 Mobile/15A5341f Safari/604.1'}

# for i in url:
# 	responce = requests.get(i,headers = headers)
# 	# print responce.text
# 	selector = etree.HTML(responce.text)
# 	videoSrc = selector.xpath("//video[@id = 'theVideo']")
# 	videoTitle = selector.xpath("//div[@class = 'user-title']/text()")[0]

# 	videoUrl = videoSrc[0].get("src")
# 	downFile(videoUrl,videoTitle+".mp4")

params = {
    "sec_uid": 60144115810,
    "count": "21",
    "max_cursor": 0,
    "aid": "1128",
    "_signature": "KxKEBQAAdm4iXv4Qy.mlMCsShB",
    "dytk": "e62405ff5b871469a183c14f5ac38d12"
  }
personurl = "https://www.iesdouyin.com/web/api/v2/aweme/post/?sec_uid=MS4wLjABAAAA2GCR89JCncmoSWfCekzL4-WT4t76wTbzCpB4j-73ASE&count=21&max_cursor=0&aid=1128&_signature=KxKEBQAAdm4iXv4Qy.mlMCsShB" #"http://v.douyin.com/BJadQe/"
responce = requests.get(personurl,headers = headers)
print responce.text
# selector = etree.HTML(responce.text)
# videoSrc = selector.xpath("//li[@id = 'item gowork']")
# print videoSrc
os.system('pause')