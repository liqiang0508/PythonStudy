#!/usr/bin/python
# -*- coding: UTF-8 -*-
import requests
import re 
from requests.cookies import RequestsCookieJar
import json

url = 'http://openapi.tuling123.com/openapi/api/v2'
# UA = "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 BIDUBrowser/8.7 Safari/537.36"
headers = { 
            "Referer":"http://ai.baidu.com/tech/ocr/webimage",
            "User-Agent":"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.90 Safari/537.36"
            }

body = {
        "reqType":0,
        "perception": {
            "inputText": {
                "text": "LOL"
            }
        },
        "userInfo": {
            "apiKey": "0e7cf3d4d8ac48daa67a66e06dc86db2",
            "userId": "10020"
        }
    }

# print  json.dumps(body)

# print data['results'][0]['values']['url'],data.has_key("results")

def GetAIResponce(text):
    body = {
        "reqType":0,
        "perception": {
            "inputText": {
                "text": text
            }
        },
        "userInfo": {
            "apiKey": "0e7cf3d4d8ac48daa67a66e06dc86db2",
            "userId": "1000"
        }
    }
    r = requests.post(url,data = json.dumps(body))
    r.encoding='utf-8'   #编码
    data = r.json()
    print ("GetAIResponce",data)
    return data["results"][0]["values"]["text"]

# GetAIResponce("hello")