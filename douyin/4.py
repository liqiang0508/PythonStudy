#!/usr/bin/python
# -*- coding: UTF-8 -*-
import requests
import json
import os
import re
import time
from selenium import webdriver
import random
from prt_cmd_color import *
import sys

sys.setrecursionlimit(sys.maxint) #设置为一百万


headers1 = {'User-Agent':'Mozilla/6.0 (Windows; U; Windows NT 6.12; en-US; rv:1.9.1.7) Gecko/20091202 Firefox/3.5.6','Connection': 'close'} 

def getheaders():
    user_agent_list = ['Mozilla/5.0 (Windows NT 6.2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/28.0.1464.0 Safari/537.36',
                       'Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.16 Safari/537.36',
                       'Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.3319.102 Safari/537.36',
                       'Mozilla/5.0 (X11; CrOS i686 3912.101.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.116 Safari/537.36',
                       'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.93 Safari/537.36',
                       'Mozilla/5.0 (Windows NT 6.2; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1667.0 Safari/537.36',
                       'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:17.0) Gecko/20100101 Firefox/17.0.6',
                       'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/28.0.1468.0 Safari/537.36',
                       'Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2224.3 Safari/537.36',
                       'Mozilla/5.0 (X11; CrOS i686 3912.101.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.116 Safari/537.36'
    
    ]
    UserAgent=random.choice(user_agent_list)
    return UserAgent


headers = {
    'content-type': 'application/json',
    'user-agent': getheaders()
}



params = {
    'user_id':'86044891889',
    'sec_uid': '',
    'count':'21',
    'max_cursor': 0,
    'aid':'1128',
    '_signature': '0M2EpxASjXXZgf6yrkCKktDNhL',
    'dytk':'3905df2f69a6a6561a9da86e08b69e20'
}
opt = webdriver.ChromeOptions()
opt.headless = True
drive = webdriver.Chrome(options=opt)
# 86044891889
# 60144115810 me
uid = "86044891889"
uri = "https://www.iesdouyin.com/share/user/"+uid

    
def getsign():
    try:
        responce =  requests.get(uri, headers=headers,timeout = 5)
        dy_src =responce.text
        tac_start = dy_src.find("tac=")
        tac_end = dy_src.find("</script>", tac_start)
        tac = dy_src[tac_start:tac_end]
            #print("获取到的tac:", tac)
        f = open("./tac.js", "w")
        f.write(tac)
        f.close()
        responce.close()
        drive.get("file:///C:/Users/Administrator/Downloads/douyin_signature-master/get_sign.html")
        sign = drive.find_element_by_xpath("/html/body").text
        return sign
    except Exception as e:
        return None

def downFileFromDic(data,index):

    if index>len(data)-1:
        return 

    name = data[index]["name"]
    url = data[index]["url"]
    if os.path.exists(name):
        printYellow("exists---"+url)
        return
    print("StartDown--",url)
    with open(name,"wb") as f:
        try:
            # print("Start down===",url)
            responce = requests.get(url,headers = headers1, timeout = 5)
            f.write(responce.content)
            responce.close()
            s = requests.session()
            s.keep_alive = False
            index = index+1
            f.close()
            downFileFromDic(data,index)
            printGreen("Save Success---"+url)
        except Exception as e:
            f.close()
            printRed("downFile error---"+url)
            downFileFromDic(data,index)


def getLike(max_cursor,sign):
    with open("max_cursor","w") as f:
        f.write(str(max_cursor))
        f.close()
    params["max_cursor"] = max_cursor
    if sign==None:
        tempsign = getsign()
        if tempsign!=None:
            params["_signature"] = tempsign
    # print("getLike--",sign)
    try:
        response = requests.get('https://www.iesdouyin.com/web/api/v2/aweme/like/',timeout = 5, headers=headers, params=params)
    except Exception as e:
        getLike(max_cursor,None)
        return 
    # print("response===",response.text)
    jsonData = json.loads(response.text)
    Data = json.loads(response.text)
    DownDic = []
    aweme_list = Data["aweme_list"]
    has_more = Data["has_more"]
    
    if len(aweme_list)==0:
        # print("aweme_list is null---")
        # print("response===",response.text)
        getLike(max_cursor,getsign())
        return
    for data in aweme_list:
        # print("data-----",data)
        desc = data["desc"]
        Id = data["aweme_id"]
        desc = re.sub('[\/:*?"<>|]','-',desc)#去掉非法字符   #只要字符串中的中文，字母，数字
       

        name = "video/"+Id+desc+".mp4"#data["desc"]
        downurl = data["video"]["download_addr"]["url_list"][0]
        downurl = downurl.replace("play","playwm")
        # print(name,downurl)
        DownDic.append({"name":name,"url":downurl})
        # downFile(downurl,"video/"+name+".mp4")
    # print("DownDic",DownDic)

    downFileFromDic(DownDic,0)
    if has_more==True:
        time.sleep(0.5)
        getLike(Data["max_cursor"],sign)


getLike(1567489461000,None)
os.system("pause")
#NB. Original query string below. It seems impossible to parse and
#reproduce query strings 100% accurately so the one below is given
#in case the reproduced version is not "correct".
# response = requests.get('https://www.iesdouyin.com/web/api/v2/aweme/post/?sec_uid=MS4wLjABAAAA2GCR89JCncmoSWfCekzL4-WT4t76wTbzCpB4j-73ASE&count=21&max_cursor=0&aid=1128&_signature=0dRYahAXjFPYmCJ.7wPz-NHUWH&dytk=e62405ff5b871469a183c14f5ac38d12', headers=headers)
