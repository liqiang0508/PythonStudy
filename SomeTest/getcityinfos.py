#!/usr/bin/python
# -*- coding: UTF-8 -*-


import requests
from lxml import etree
import re
import json
from collections import OrderedDict
import os

headers = {'User-Agent':'Mozilla/6.0 (Windows; U; Windows NT 6.12; en-US; rv:1.9.1.7) Gecko/20091202 Firefox/3.5.6','Connection': 'close'} 

	
def GetHtmlData(url):
	response = requests.get(url,headers = headers )
	response.encoding = 'gb2312'
	return response.text

def GetArea(href,index):
	baseurl = "http://www.stats.gov.cn/tjsj/tjbz/tjyqhdmhcxhfdm/2019/{}"
	data = GetHtmlData(baseurl.format(href))
	selector = etree.HTML(data)
	print "GetArea--" ,baseurl.format(href),index
	countytrs = selector.xpath("//tr[@class='countytr']/td/a")

	tempdata = []
  
	for x in xrange(len(countytrs)):
		href = countytrs[x].get("href")
		citycode = countytrs[x].xpath("string(.)")
		if citycode.isdigit():
			cityname = countytrs[x+1].xpath("string(.)").encode('utf-8')
			# print "GetArea--",href,citycode,cityname
			tempdata.append({"name":cityname,"Value":citycode})
	

	AreaData.append(tempdata)

	
	


def GetCity(code,index):
	baseurl = "http://www.stats.gov.cn/tjsj/tjbz/tjyqhdmhcxhfdm/2019/{}"
	# print baseurl
	data = GetHtmlData(baseurl.format(code))
	# print "GetCity===",baseurl.format(code)
	selector = etree.HTML(data)
	cityinfos = selector.xpath("//tr[@class='citytr']/td/a")
	
	tempdata = []
	for x in xrange(len(cityinfos)):
		href = cityinfos[x].get("href")
		citycode = cityinfos[x].xpath("string(.)")
		if citycode.isdigit():
			cityname = cityinfos[x+1].xpath("string(.)").encode('utf-8')
			print "GetCity--",href,citycode,cityname
			tempdata.append({"name":cityname,"Value":citycode})
			GetArea(href,index)
	CityData.append(tempdata)
	


	

# 获取省份信息
def GetPronces():
		  
	url = "http://www.stats.gov.cn/tjsj/tjbz/tjyqhdmhcxhfdm/2019/index.html"
	response = requests.get(url,headers = headers)
	response.encoding = 'gb2312'
	selector = etree.HTML(response.text)
	privonces = selector.xpath("//tr[@class='provincetr']/td/a")

	# i = 0
	
	for i in xrange(3):
		href = privonces[i].get("href")
		provicesName = privonces[i].xpath("string(.)")
		provicescode = re.search("\d+",href).group()
		provicescode = provicescode+"0100000000"
		provicesName = provicesName.encode('utf-8')
		print "GetPronces==",provicesName,provicescode
		ProviceData.append({"name":provicesName,"Value":provicescode})
		GetCity(href,i)

	with open("Provice.json","w") as f:
		f.write(json.dumps(ProviceData,ensure_ascii=False,indent = 4))

	with open("city.json","w") as f:
		f.write(json.dumps(CityData,ensure_ascii=False,indent = 4))

	with open("area.json","w") as f:
		f.write(json.dumps(AreaData,ensure_ascii=False,indent = 4))




ProviceData = []
CityData = []
AreaData = []
GetPronces()

privonces = None
citys = None
area = None

with open("Provice.json","r") as f:
	privonces = f.read()
	privonces = json.loads(privonces)
	f.close()

with open("city.json","r") as f:
	citys = f.read()
	citys = json.loads(citys)
	f.close()

with open("area.json","r") as f:
	area = f.read()
	area = json.loads(area)
	f.close()


# print "data--",privonces[2]["name"],citys[2][0]["name"],area[2][0][0]["name"]

os.system('pause')
# provicescode = re.match("\d+",name)
# print provicescode.group()