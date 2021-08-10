#!/usr/bin/python
# -*- coding: UTF-8 -*-
import requests
from lxml import etree
import re
import json
from collections import OrderedDict
import os
import sys
import time
reload(sys)
sys.setdefaultencoding('utf-8')

headers = {'User-Agent':'Mozilla/8.0 (Windows; U; Windows NT 6.12; en-US; rv:1.9.1.7) Gecko/20091202 Firefox/3.5.6'} 

httpsession = requests.session()
def GetHtmlData(url):
	response = httpsession.get(url,headers = headers )
	response.encoding = 'gb2312'
	response.close()
	return response.text

def GetArea(href,index,cityData):
	# print "GetArea",len(AreaData),index
	# if len(AreaData)<=index:
	AreaData.append([])

	baseurl = "http://www.stats.gov.cn/tjsj/tjbz/tjyqhdmhcxhfdm/2019/{}"
	url = baseurl.format(href)
	data = GetHtmlData(url)
	selector = etree.HTML(data)
	# print "GetArea****" ,index
	countytrs = selector.xpath("//tr[@class='countytr']/td/a")

	tempdata = []
  	if len(countytrs)==0:
  		countytrs = selector.xpath("//tr[@class='towntr']/td/a")

	cityData["children"] = []
	for x in xrange(len(countytrs)):
		href = countytrs[x].get("href")
		citycode = countytrs[x].xpath("string(.)")
		if citycode.isdigit():
			cityname = countytrs[x+1].xpath("string(.)").encode("utf-8")
			print "GetArea===========",citycode,cityname
			tempdata.append({"name":cityname,"Value":citycode})
			cityData["children"].append({"label":cityname,"value":citycode})
	
	if len(tempdata)>0:
		AreaData[index].append(tempdata)

	# print "区域长度======",len(AreaData)
	


def GetCity(code,index):
	baseurl = "http://www.stats.gov.cn/tjsj/tjbz/tjyqhdmhcxhfdm/2019/{}"
	# print baseurl
	data = GetHtmlData(baseurl.format(code))
	# print "GetCity===",baseurl.format(code)
	selector = etree.HTML(data)
	cityinfos = selector.xpath("//tr[@class='citytr']/td/a")
	
	tempdata = []
	JsonData[index]["children"] = []
	for x in xrange(len(cityinfos)):
		href = cityinfos[x].get("href")
		citycode = cityinfos[x].xpath("string(.)")
		if citycode.isdigit():
			cityname = cityinfos[x+1].xpath("string(.)").encode("utf-8")
			print "GetCity***************",citycode,cityname
			tempdata.append({"name":cityname,"Value":citycode})
			cityData = {"value":citycode,"label":cityname}
			# time.sleep(1)
			time.sleep(1.5)
			GetArea(href,index,cityData)
			JsonData[index]["children"].append(cityData)

	CityData.append(tempdata)
	


	

# 获取省份信息
def GetPronces():
		  
	url = "http://www.stats.gov.cn/tjsj/tjbz/tjyqhdmhcxhfdm/2019/index.html"
	response = httpsession.get(url,headers = headers)
	response.encoding = 'gb2312'
	response.close()
	selector = etree.HTML(response.text)
	privonces = selector.xpath("//tr[@class='provincetr']/td/a")

	# i = 0
	print "GetPronces len",len(privonces)
	for i in xrange(len(privonces)):
		href = privonces[i].get("href")
		provicesName = privonces[i].xpath("string(.)")
		provicescode = re.search("\d+",href).group()
		provicescode = provicescode+"0100000000"
		provicesName = provicesName.encode("utf-8")
		print "GetPronces-------------------",provicesName,provicescode
		ProviceData.append({"name":provicesName,"Value":provicescode})
		JsonData.append({"value":provicescode,"label":provicesName})
		time.sleep(2)
		GetCity(href,i)
		# if i>=1:
		# 	break
	# GetCity("50.html",21)


	AreaData1 = [x for x in AreaData if x]
	with open("Provice.json","w") as f:
		f.write(json.dumps(ProviceData,ensure_ascii=False,indent = 4))
		f.close()

	with open("city.json","w") as f:
		f.write(json.dumps(CityData,ensure_ascii=False,indent = 4))
		f.close()

	with open("area.json","w") as f:
		f.write(json.dumps(AreaData1,ensure_ascii=False,indent = 4))
		f.close()
	
	with open("jsondata.json","w") as f:
		f.write(json.dumps(JsonData,ensure_ascii=False,indent = 4))
		f.close()




ProviceData = []
CityData = []
AreaData = []
JsonData = []
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


# print "data--",privonces[21]["name"],citys[21][0]["name"],area[21][0][0]['name']

# print (json.dumps(area[21][0],ensure_ascii=False,indent = 4))

# os.system('pause')
# provicescode = re.match("\d+",name)
# print provicescode.group()