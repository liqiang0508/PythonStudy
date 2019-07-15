#!/usr/bin/python
# -*- coding: UTF-8 -*-
import requests

# 获得莉莉机器人的请求
def get_response(msg):
    print(msg)
    apiUrl = 'http://i.itpk.cn/api.php'
    data = {
        'question':msg,
    }
    try:
        r = requests.get(apiUrl, params=data)
        print(r.url)   # 查看生产的get请求
        text = r.text#.encode('utf-8')[3:].decode('utf-8')   # 去TEXT文本BOM开头
        return text
    except Exception as e:
        print(e)
        return
        
text = get_response("笑话")
print(text)
