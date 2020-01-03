import requests
import json
headers = {'User-Agent':'Mozilla/6.0 (Windows; U; Windows NT 6.12; en-US; rv:1.9.1.7) Gecko/20091202 Firefox/3.5.6','Connection': 'close'} 

def getExpressType(num):
  url = "http://www.kuaidi100.com/autonumber/autoComNum?text="+str(num)
  responce = requests.get(url,headers = headers)
  jsonData = json.loads(responce.text)
  comcode = jsonData["auto"][0]["comCode"]
  if comcode:
    return comcode
  else:
    return None
  
def getExpressInfo(comcode,num):
  url = "http://www.kuaidi100.com/query?type="+str(comcode)+"&postid="+str(num)
  print url 
  responce = requests.get(url,headers = headers)
  jsonData = json.loads(responce.text)
  # print jsonData
  data = jsonData["data"]
  for v in data:
    print v["time"],v["context"]
# print(getExpressType(4302693161075))

getExpressInfo(getExpressType("78117308354817"),"78117308354817")