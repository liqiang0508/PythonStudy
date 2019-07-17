import requests

from lxml import etree
import re
import os
# url = "http://v1-dy.ixigua.com/9f8e7db84ea96d2386df5b1e280ea141/5d2d4bcc/video/m/2203fdc36d15fc04a82a08659a483d605ab116100e2c00001075e088ab20/?rc=MzdsOTptaHY7aTMzO2kzM0ApQHRoaGR1KUk2OTczMzQzMzg4NDQzNDVvQGg2dilAZzN3KUBmM3UpcHpiczFoMXB6QCk1NGRuaXNyZmVpcm9fLS0vLTBzcy1vI2p0Omk2Qy4uLjY0LS40Ni0zNDYtOiNvIzphLW8jOmAtcCM6YGJiXmZeX3RiYl5gNS46"
# url ="https://aweme.snssdk.com/aweme/v1/playwm/?s_vid=93f1b41336a8b7a442dbf1c29c6bbc567651bebbedf969a7e152e63e40c6cf7d68d347f0387ec600dbc937fc1028935c7178e102277e9d5aebfae3fe11f4343b&line=0"
HEADERS = {
    'accept-encoding': 'gzip, deflate, br',
    'accept-language': 'zh-CN,zh;q=0.9',
    'pragma': 'no-cache',
    'accept': 'application/json',
    ':authority': 'www.iesdouyin.com',
    'x-requested-with': 'XMLHttpRequest',
    'cache-control': 'no-cache',
    'upgrade-insecure-requests': '1',
    'user-agent': "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1",
}
# HEADERS['user-agent'] = 'Aweme/63013 CFNetwork/978.0.7 Darwin/18.6.0'

def getRealUrl(url):
	responce = requests.get(url,headers = HEADERS)
	print ("getRealUrl--",responce.url)
	return  responce.url
def getVideoUrl(url):
	pass
def downvideo(url,name):
	with open(name,"wb") as f:
		responce = requests.get(url,headers = HEADERS)
		f.write(responce.content)
		responce.close()

sign = os.popen("node fuck-byted-acrawler.js   60144115810 ").read()
print "sign-",sign
url = getRealUrl("https://www.douyin.com/web/api/v2/aweme/post/?user_id=60144115810&sec_uid=&count=21&max_cursor=0&aid=1128&_signature="+sign+"&dytk=e62405ff5b871469a183c14f5ac38d12")
htmldata = requests.get(url)
print htmldata.text


# selector = etree.HTML(data)
# title = selector.xpath("//title/text()")

# iframe = selector.xpath('//iframe')
# # video = iframe[0].xpath('//video[@class = "video-player"]')
# print("video==",data)
# downvideo(getRealUrl("http://v.douyin.com/BJt9WW/"),"jinmao.mp4")