#!/usr/bin/python
# -*- coding: UTF-8 -*-
# 获取妹子图片
import requests
# import RequestsManager
from lxml import etree
import os
import re
import time


HomeDir = "ScrapyGirls"
headers = {'User-Agent':'Mozilla/6.0 (Windows; U; Windows NT 6.12; en-US; rv:1.9.1.7) Gecko/20091202 Firefox/3.5.6','Connection': 'close'} 


def getHtmlData(url):
    responce = requests.get(url,headers=headers,timeout = 5)
    return responce

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
            prin("Save Success---"+Url)
        except Exception as e:
            print("downFile error",Url)
            time.sleep(1)
            downFile(Url,SaveName)
        
        

def getNameFromUrl(url):
    return os.path.basename(url)

# url = "https://www.keke2345.com/gaoqing/cn/YouWu/2019/0312/31881.html"



#获取一页的图片
def getOnePageImage(url):
    # print "getOnePageImage",url
    try:
        htmldata = getHtmlData(url)
        htmldata.encoding = "gb2312"
        selector = etree.HTML(htmldata.text)
        title = selector.xpath("//title/text()")
        images = selector.xpath('//div[@class = "content"]/img')

        dirName = re.search("\d+",os.path.basename(url))
        print("dirname",dirName.group())
        dirName = HomeDir+"/"+ dirName.group()
        if os.path.exists(dirName):#存在文件夹
            pass
        else:#不存在
            os.makedirs(dirName)

        for image in images:
            src = image.get("src")
            fileName = getNameFromUrl(src)
            if not os.path.exists(dirName+"/"+fileName):#不存在
                downFile(src,dirName+"/"+fileName)
            else:#存在
                if get_FileSize(dirName+"/"+fileName)==0:
                    os.remove(dirName+"/"+fileName)
                    downFile(src,dirName+"/"+fileName)
                
        htmldata.close()
    except Exception as e:
        print("getOnePageImage error",url)
        getOnePageImage(url)
   
   
'''获取文件的大小,结果保留两位小数，单位为MB'''
def get_FileSize(filePath):
    filePath = unicode(filePath,'utf8')
    fsize = os.path.getsize(filePath)
    fsize = fsize/float(1024*1024)
    return round(fsize,2)

def getPages(url):
    try:
        htmldata = getHtmlData(url)
        htmldata.encoding = "gb2312"
        selector = etree.HTML(htmldata.text)
        title = selector.xpath("//title/text()")
        images = selector.xpath('//div[@class = "content"]/img')
        getOnePageImage(url)

        pages= selector.xpath('//div[@class = "page"]/a')
        for page in pages:
            if page.get("href")!=None:
           
                url = os.path.dirname(url)+"/"+page.get("href")
                print("page",url)
                getOnePageImage(url)
        htmldata.close()
    except Exception as e:
        print("getPages error",url)
        getPages(url)
    
    
# getPages(url)
# https://www.keke234.com/gaoqing/list_5_1.html   5_735

# HomeUrl = "https://www.keke234.com/gaoqing/list_5_1.html"
# htmldata = RequestsManager.getHtmlData(HomeUrl)
# htmldata.encoding = "gb2312"
# selector = etree.HTML(htmldata.text)
# girls = selector.xpath('//div[@class ="t"]')
# print "girls",len(girls)
# for girl in girls:
#     if len(girl.xpath("a"))>0:
#         fisturl = girl.xpath("a")[0].get("href")
#         print "fisturl", fisturl
#         # getPages(fisturl)
# https://www.keke234.com/gaoqing/list_5_52.html
def Getmain(startindex,endindex):
    for i in range(startindex,endindex):
        url = "https://www.keke2345.com/gaoqing/list_5_"+str(i)+".html"
        print(url)
        # with open("CurPage","w") as f:
        #     f.write(url)
        HomeUrl = url
        try:
            htmldata = getHtmlData(HomeUrl)
            htmldata.encoding = "gb2312"
            selector = etree.HTML(htmldata.text)
            girls = selector.xpath('//div[@class ="t"]')
            print ("girls",len(girls))
            for girl in girls:
                if len(girl.xpath("a"))>0:
                    fisturl = girl.xpath("a")[0].get("href")
                    print ("fisturl", fisturl)
                    getPages(fisturl)
            htmldata.close()
        except Exception as e:
            print ("get HomeUrl error",HomeUrl)
           
           
           
# 5-233
# https://www.keke2345.com/gaoqing/list_5_2.html
url = "https://www.keke2345.com/gaoqing/list_5_1.html"
htmldata = getHtmlData(url)
htmldata.encoding = "gb2312"
selector = etree.HTML(htmldata.text)
pagesNum = selector.xpath('//span[@class ="pageinfo"]/strong')
maxPage = pagesNum[0].text
Getmain(1,int(maxPage))
   
   
# getOnePageImage("https://www.keke234.com/gaoqing/cn/xiuren/2019/0221/31663_6.html")



os.system("pause")