import requests
import re
headers = {'User-Agent':'Mozilla/9.0 (Windows; U; Windows NT 7.1; en-US; rv:1.9.1.8) Gecko/20091201 Firefox/3.5.6','Connection': 'close'} 

def Upload(url,file,data):
    if data ==None:
        data = {}
    requests.post(url, files=file,headers=headers,data=data)


download_url = "http://music.163.com/song/media/outer/url?id=29732222.mp3"

def downFile(Url,SaveName):
    with open(SaveName,"wb") as f:
        responce = requests.get(Url, headers=headers)
        f.write(responce.content)
        responce.close()
        print "Save Success---"+Url


def GetSoundName(url):
    name = re.search("id=(\d*.mp3)",url)
    return name.group(1)

def getHtmlData(url):
    responce = requests.get(url,headers=headers,timeout = 500)
    return responce

# downFile(download_url,GetSoundName(download_url))