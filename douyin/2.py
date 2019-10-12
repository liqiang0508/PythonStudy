#!/usr/bin/python
# -*- coding: UTF-8 -*-
import requests
import json
import os
import re
import time

headers1 = {'User-Agent':'Mozilla/6.0 (Windows; U; Windows NT 6.12; en-US; rv:1.9.1.7) Gecko/20091202 Firefox/3.5.6','Connection': 'close'} 

headers = {
    'cookie': 'tt_webid=6733433706118645255; _ba=BA0.2-20190715-5199e-QqB6RFRD55LGCyF6rutq; _ga=GA1.2.112943905.1567749701; _gid=GA1.2.1759399160.1570588785',
    'accept-encoding': 'gzip, deflate, br',
    'accept-language': 'zh-CN,zh;q=0.9',
    'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 7_1_2 like Mac OS X) AppleWebKit/537.51.2 (KHTML, like Gecko) Version/7.0 Mobile/11D257 Safari/9537.53',
    'accept': 'application/json',
    'referer': 'https://www.iesdouyin.com/share/user/86044891889?u_code=hf6aacgm&sec_uid=MS4wLjABAAAAjv8upm2SuISms_dgqQ9YxRbAAiBODeZOtdqINHNlh8E&timestamp=1570600011&utm_source=copy&utm_campaign=client_share&utm_medium=android&share_app_name=douyin',
    'authority': 'www.iesdouyin.com',
    'x-requested-with': 'XMLHttpRequest',
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
    

def downFileFromDic(data,index):

    if index>len(data)-1:
        return 

    name = data[index]["name"]
    url = data[index]["url"]
    if os.path.exists(name):
        return
    print("downFileFromDic---",name)

    with open(name,"wb") as f:
        try:
            responce = requests.get(url,headers = headers1, timeout = 5)
            f.write(responce.content)
            responce.close()
            s = requests.session()
            s.keep_alive = False
            index = index+1
            f.close()
            downFileFromDic(data,index)
            print "Save Success---"+name
        except Exception as e:
            f.close()
            print "downFile error---",name
            downFileFromDic(data,index)


def getLike(max_cursor):
    params["max_cursor"] = max_cursor
    response = requests.get('https://www.iesdouyin.com/web/api/v2/aweme/like/', headers=headers, params=params)
    # print("response===",response.text)
    jsonData = json.loads(response.text)
    Data = json.loads(response.text)
    DownDic = []
    aweme_list = Data["aweme_list"]
    has_more = Data["has_more"]
    if len(aweme_list)==0:
        print("aweme_list is null---")
        print("response===",response.text)
        return
    for data in aweme_list:
        # print("data-----",data)
        desc = data["desc"]

        desc = re.sub('[\/:*?"<>|]','-',desc)#去掉非法字符   #只要字符串中的中文，字母，数字
       

        name = "video/"+desc+".mp4"#data["desc"]
        downurl = data["video"]["download_addr"]["url_list"][0]
        downurl = downurl.replace("play","playwm")
        # print(name,downurl)
        DownDic.append({"name":name,"url":downurl})
        # downFile(downurl,"video/"+name+".mp4")
    # print("DownDic",DownDic)

    downFileFromDic(DownDic,0)
    if has_more==True:
        time.sleep(0.5)
        getLike(Data["max_cursor"])


getLike(0)

#NB. Original query string below. It seems impossible to parse and
#reproduce query strings 100% accurately so the one below is given
#in case the reproduced version is not "correct".
# response = requests.get('https://www.iesdouyin.com/web/api/v2/aweme/post/?sec_uid=MS4wLjABAAAA2GCR89JCncmoSWfCekzL4-WT4t76wTbzCpB4j-73ASE&count=21&max_cursor=0&aid=1128&_signature=0dRYahAXjFPYmCJ.7wPz-NHUWH&dytk=e62405ff5b871469a183c14f5ac38d12', headers=headers)
