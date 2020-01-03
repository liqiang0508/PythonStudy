#!/usr/bin/python
# -*- coding: UTF-8 -*-
import requests
import re 
from requests.cookies import RequestsCookieJar
import base64
import json

import os
import sys

# print sys.version 
# print sys.version_info
version_info = sys.version_info
print  (version_info.major)
if version_info == 2:
    reload(sys)
    sys.setdefaultencoding( "utf-8" )
else:
    import importlib
    importlib.reload(sys)


headers = { 
            "Referer":"http://ai.baidu.com/tech/ocr/webimage",
            "User-Agent":"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.90 Safari/537.36"
            }

def GetWeatherByCode(code):

    print ("http://wthrcdn.etouch.cn/weather_mini?citykey="+code)
    r = requests.get("http://wthrcdn.etouch.cn/weather_mini?citykey="+code,headers=headers)
    r.encoding='utf-8'   #编码
    datas = r.json()
    datas = datas["data"]
    resultStr =  datas['city']+" "+datas['wendu']+"°c"+" "+datas["ganmao"]+"\n"
    for d in datas["forecast"]:
        # print d["date"]
        resultStr = resultStr+d["date"]+":"+d['low']+"-"+d['high']+" "+d['type']+"\n"

    return resultStr

def GetCityCode(CityName):
    print ("http://toy1.weather.com.cn/search?cityname="+CityName)
    r = requests.get("http://toy1.weather.com.cn/search?cityname="+CityName,headers=headers)
    r.encoding='utf-8'   #编码
    datas = r.text
    datas = datas[1:-1]

    try:
        result = json.loads(datas)
        b = str(result[0])
        rr = re.compile(r'\d+')
        rr.findall(b)
        # print "GetCityCode",rr.findall(b)
        return  rr.findall(b)[0]
    except Exception as e:
        return None
    
    



if __name__ == '__main__':
    argvs = len(sys.argv)
    if argvs == 2:
        city = sys.argv[1]
        # city = city.decode('gb2312')
        print (GetWeatherByCode(GetCityCode(str(city))))
    else:
        print ("city is null")
        print (GetWeatherByCode(GetCityCode(str("成都"))))
    

# os.system("pause")

