# Download the helper library from https://www.twilio.com/docs/python/install
# from twilio.rest import Client
import os
import requests
import json
# hua qian 
# Your Account Sid and Auth Token from twilio.com/console
# DANGER! This is insecure. See http://twil.io/secure
account_sid = 'ACebc305e176f2ffa0e9f1afb2081b5068'
auth_token = '81accc3b5a6825e627a984c160db64aa'


def SendSms(text,fromnum,tonum):
	client = Client(account_sid, auth_token)

	message = client.messages.create(
		body= text,
		from_='+17605635176',
		to=tonum
		)
	return message
# m = SendSms("2222,","w","+8613980628432")
# print(m.sid)
proxies = { "http": "http://10.10.1.10:3128", "https": "http://10.10.1.10:1080", }
url = "https://wx-mini.pagoda.com.cn/api/v1/category/-1/16/2954"
responce = requests.get(url, verify=False)
data = json.loads( responce.text)
print(data)

for i in data['data']:
	print i

filepath = unicode("a.png",'utf8')
fsize = os.path.getsize(filepath)
fsize = fsize/float(1024*1024)
print(round(fsize,2)) 