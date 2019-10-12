import requests
import json
import os
headers1 = {'User-Agent':'Mozilla/6.0 (Windows; U; Windows NT 6.12; en-US; rv:1.9.1.7) Gecko/20091202 Firefox/3.5.6','Connection': 'close'} 

def generateSignature(value):
    p = os.popen('node fuck-byted-acrawler.js %s' % value)
    return (p.readlines()[0]).strip()
# print '2', generateSignature(60144115810)
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



def downFileFromDic(data,index):

    if index>len(data)-1:
        return 
    name = data[index]["name"]
    url = data[index]["url"]
    print("downFileFromDic---",url)
    with open(name,"wb") as f:
        try:
            responce = requests.get(url,headers = headers1, timeout = 5)
            f.write(responce.content)
            responce.close()
            s = requests.session()
            s.keep_alive = False
            index = index+1
            downFileFromDic(data,index)
            print "Save Success---"+url
        except Exception as e:
            print "downFile error---",url
            downFileFromDic(data,index)


headers = {
            'Referer': 'https://www.iesdouyin.com/share/user/60144115810?u_code=hf6aacgm&sec_uid=MS4wLjABAAAA2GCR89JCncmoSWfCekzL4-WT4t76wTbzCpB4j-73ASE&timestamp=1563179135',
            'Origin': 'https://www.iesdouyin.com',
            'User-Agent': 'Mozilla/5.0 (Linux; U; Android 4.3; en-us; SM-N900T Build/JSS15J) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30',
            'Content-Type': 'application/json',
            }

data = '{"user":{"user_unique_id":"6733433706118645255"},"header":{"app_id":1243,"app_name":"douyin_reflow","os_name":"android","os_version":"4.3","traffic_type":"wap","headers":"{\\"href\\":\\"https://www.iesdouyin.com/share/user/60144115810?u_code=hf6aacgm&sec_uid=MS4wLjABAAAA2GCR89JCncmoSWfCekzL4-WT4t76wTbzCpB4j-73ASE&timestamp=1563179135\\",\\"host\\":\\"www.iesdouyin.com\\",\\"pathname\\":\\"/share/user/60144115810\\",\\"protocol\\":\\"https:\\",\\"user_agent\\":\\"Mozilla/5.0 (Linux; U; Android 4.3; en-us; SM-N900T Build/JSS15J) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30\\",\\"screen_resolution\\":\\"360*640\\"}"},"events":[{"event":"page_view","params":"{\\"page_url\\":\\"https://www.iesdouyin.com/share/user/60144115810?u_code=hf6aacgm&sec_uid=MS4wLjABAAAA2GCR89JCncmoSWfCekzL4-WT4t76wTbzCpB4j-73ASE&timestamp=1563179135\\",\\"page_name\\":\\"reflow_user\\"}"}]}'

# s=requests.session()
response = requests.post('https://mcs.snssdk.com/v1/json', headers=headers, data=data)
# cookies = requests.utils.dict_from_cookiejar(response.cookies)
#print("cookie=",response.cookies)
print(response.headers)
jsonData = json.loads(response.text)
if jsonData["e"] == 0:
    print("ok")

    headers = {
    # 'cookie': 'tt_webid=6733433706118645255; _ba=BA0.2-20190715-5199e-QqB6RFRD55LGCyF6rutq; _ga=GA1.2.112943905.1567749701; _gid=GA1.2.1759399160.1570588785',
    'accept-encoding': 'gzip, deflate, br',
    'accept-language': 'zh-CN,zh;q=0.9',
    'user-agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.80 Mobile Safari/537.36',
    'accept': 'application/json',
    'referer': 'https://www.iesdouyin.com/share/user/54518826830?u_code=hf6aacgm&sec_uid=MS4wLjABAAAA2GCR89JCncmoSWfCekzL4-WT4t76wTbzCpB4j-73ASE&timestamp=1563179135',
    'authority': 'www.iesdouyin.com',
    'x-requested-with': 'XMLHttpRequest',
}

    params = (
    ('sec_uid', '54518826830'),
    ('count', '21'),
    ('max_cursor', '0'),
    ('aid', '1128'),
    ('_signature', "sX6C6RAa7O64Mvj8NS6qwLF-gv"),#generateSignature(60144115810)),
    ('dytk', 'd74940fb4dd26876281585dc9a957016'),
)

    response = requests.get('https://www.iesdouyin.com/web/api/v2/aweme/like/', headers=headers, params=params)
    # url = "https://www.iesdouyin.com/web/api/v2/aweme/post/?user_id=110677980134&sec_uid=&count=21&max_cursor=0&aid=1128&_signature=lyp9DxAZysOeZgcaPYgmG5cqfR&dytk=061ae6e81229e178146aa674327eba89"
    # responce1 = requests.get(url,headers = headers1)
    Data = json.loads(response.text)
    DownDic = []
    # print("Data=",Data) 
    aweme_list = Data["aweme_list"]
    if len(aweme_list)==0:
        print("aweme_list is null")
    for data in aweme_list:
        # print("data-----",data)
        name = "video/"+data["desc"]+".mp4"#data["desc"]
        downurl = data["video"]["download_addr"]["url_list"][0]
        downurl = downurl.replace("play","playwm")
        # print(name,downurl)
        DownDic.append({"name":name,"url":downurl})
        # downFile(downurl,"video/"+name+".mp4")
    # print("DownDic",DownDic)
    downFileFromDic(DownDic,0)




