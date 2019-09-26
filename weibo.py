# -*- coding:utf-8 -*-
import requests
import json

url = "https://m.weibo.cn/api/container/getIndex?type=uid&value=2593832737&containerid=1076032593832737&page=1"

headers = {'User-Agent':'Mozilla/5.0 (iPad; CPU OS 11_0 like Mac OS X) AppleWebKit/604.1.34 (KHTML, like Gecko) Version/11.0 Mobile/15A5341f Safari/604.1'}

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

def getWeiBoReq(uid,page):
	url = "https://m.weibo.cn/api/container/getIndex?type=uid&value={}&containerid=107603{}&page={}"
	url = url.format(uid,uid,page)
	print "url=="+url
	repsonce = requests.get(url,headers = headers)
	print ("repsonce.text=",repsonce.status_code)
	if repsonce.status_code!= 200:
		return 3
	data = json.loads(repsonce.text)
	blogsCards = data['data']['cards']
	# print len(blogsCards)
	if len(blogsCards)>0:
		for i in (blogsCards):
			# print "page----------"+str(page)+i["mblog"]["text"]
			if "page_info" in i["mblog"]:
				videourl = i["mblog"]["page_info"]["media_info"]["stream_url_hd"]
				text = i["mblog"]["text"]
				print "==="+videourl
			# 	if i["mblog"]["page_info"]["media_info"]!=None:
			# 		print "stream_url_hd==",i["mblog"]["page_info"]["media_info"]["stream_url_hd"]
		return 1
	else:
		return 0;

getWeiBoReq(5033795713,1)
# done = False
# index = 1
# while done!=True :
# 	res = getWeiBoReq(2593832737,index)
# 	index = index+1
# 	if res != 1:
# 		done = True
