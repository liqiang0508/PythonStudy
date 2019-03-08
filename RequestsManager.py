import requests
import re
headers = {'User-Agent':'Mozilla/9.0 (Windows; U; Windows NT 6.1; en-US; rv:1.9.1.7) Gecko/20091201 Firefox/3.5.6'} 

def Upload(url,file,data):
    if data ==None:
        data = {}
    requests.post(url, files=file,headers=headers,data=data)


download_url = "http://music.163.com/song/media/outer/url?id=29732222.mp3"

def downFile(Url,SaveName):
    with open(SaveName,"wb") as f:
        f.write(requests.get(Url, headers=headers).content)
        print "Save Success---"+Url

def GetSoundName(url):
    name = re.search("id=(\d*.mp3)",url)
    return name.group(1)


# downSond(download_url,GetSoundName(download_url))