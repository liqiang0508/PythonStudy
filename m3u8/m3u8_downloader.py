#!/usr/bin/python
# -*- coding: UTF-8 -*-
import os
import requests
import re
import json
import sys
import shutil

from Crypto.Cipher import AES
reload(sys)
sys.setdefaultencoding( "utf-8" )
url = "https://meiju4.qhqsnedu.com/20190119/UyraFzjz/index.m3u8"#"https://zk.wb699.com/2019/03/06/aLdpUIBeHC48HGTk/playlist.m3u8"

headers = {'User-Agent':'Mozilla/6.0 (Windows; U; Windows NT 6.12; en-US; rv:1.9.1.7) Gecko/20091202 Firefox/3.5.6','Connection': 'close'} 



def downFile(Url,SaveName,key):
    # Url = Url.replace("https","http")
    # print("downFile",Url,key)
    with open(SaveName,"wb") as f:
        try:
            responce = requests.get(Url, headers=headers,timeout = 500,verify=False)
            if len(key):
                 cryptor = AES.new(key, AES.MODE_CBC, key)  
                 f.write(cryptor.decrypt(responce.content))
            else:
                f.write(responce.content)
            responce.close()
            s = requests.session()
            s.keep_alive = False
            # print "Save Success---"+Url
        except Exception as e:
            print "downFile error",Url
            downFile(Url,SaveName,key)
def getHtmlData(url):
    responce = None
    try:
        responce = requests.get(url, headers=headers,timeout = 500,verify=False)
    except Exception as e:
        print "getHtmlData error",url

    return responce

 # 复制文件
def copyFile(srcfile,dstfile):
    if not os.path.isfile(srcfile):
        print "%s not exist!"%(srcfile)
    else:
        fpath,fname=os.path.split(dstfile)    #分离文件名和路径
        if not os.path.exists(fpath):
            os.makedirs(fpath)                #创建路径
        shutil.copyfile(srcfile,dstfile)      #复制文件

def merge_file(path,fileName):
    print "merge_file==",path
    # os.chdir(path)
    # cmd = "hebing.bat"
    # os.system(cmd)
    # os.system('del /Q *.ts')
    # os.chdir("../../")
    # os.rename("new.tmp", fileName)

def downUrl(url,fileName):
    print "start down=========",fileName
    # desc = re.sub('[\/:*?"<>|]','-',desc)#去掉非法字符   #只要字符串中的中文，字母，数字
    fileName = fileName.replace("/","")
    download_path = os.getcwd() + "\download\\"+fileName

    if not os.path.exists(download_path):
        try:
            os.mkdir(download_path)

        except Exception as e:
            fileName = re.sub('[\/:*?"<>|]','-',fileName)
            download_path = os.getcwd() + "\download\\"+fileName
            os.mkdir(download_path)
        
    copyFile("download/hebing.bat","download/"+fileName+"/hebing.bat")
    key = ""
    responce = requests.get(url,headers=headers,verify=False)
    all_content = responce.text
    if "#EXTM3U" not in all_content:
        print("非M3U8的链接")
        return 
    
    if "EXT-X-STREAM-INF" in all_content:  # 第一层
        file_line = all_content.split("\n")
        for line in file_line:
            if '.m3u8' in line:
                baseurl = url[0:url.find("com")+3]
                m3u8url = baseurl  + line # 拼出第二层m3u8的URL
                print "m3u8url-",m3u8url
                m3u8data = getHtmlData(m3u8url).text
                
                file_line = m3u8data.split("\n")
                for line in file_line:
                    if "EXT-X-KEY"  in line:
                        method_pos = line.find("METHOD")
                        comma_pos = line.find(",")
                        method = line[method_pos:comma_pos].split('=')[1]
                        # print "Decode Method：", method
            
                        uri_pos = line.find("URI")
                        quotation_mark_pos = line.rfind('"')
                        key_path = line[uri_pos:quotation_mark_pos].split('"')[1]
            
                        key_url =  key_path # 拼出key解密密钥URL
                        # print "key_url",key_url
                        res = requests.get(key_url,headers=headers,verify=False)
                        key = res.content
                        # print "key：" , key


                         

                    if '.ts' in line or ".js" in line:
                        filename = os.path.split(line)[1]
                        if ".js" in filename:#修改js位为ts
                            filename = filename.replace("js","ts")
                        # print "line",line,filename
                        if not os.path.exists(os.path.join(download_path,filename)):
                            downFile(line,os.path.join(download_path,filename),key)
        

    else:#第一层直接就是数据
        file_line = all_content.split("\n")
        for line in file_line:
            if "EXT-X-KEY"  in line:
                method_pos = line.find("METHOD")
                comma_pos = line.find(",")
                method = line[method_pos:comma_pos].split('=')[1]
                # print "Decode Method：", method
            
                uri_pos = line.find("URI")
                quotation_mark_pos = line.rfind('"')
                key_path = line[uri_pos:quotation_mark_pos].split('"')[1]
            
                key_url =  key_path # 拼出key解密密钥URL
                # print "key_url",key_url
                res = requests.get(key_url)
                key = res.content
                # print "key：" , key

            if '.ts' in line or ".js" in line:
                url1 = url.rsplit("/", 1)[0] + "/" + line # 
                filename = os.path.split(line)[1]
                # print "m3u8url22-",url1,filename
                if not os.path.exists(os.path.join(download_path,filename)):
                    downFile(url1,os.path.join(download_path,filename),key)#下载ts或者js文件
    
    merge_file(download_path,fileName+".mp4")
    print "start End=========",fileName

# url = "http://youku.bjhanyizheng.com/20190221/Sr2Zsip3/index.m3u8"
# downUrl(url,"6730")


def getPage(index):
    print "getPage==",index
    url = "http://api.bjxkhc.com/index.php/app/ios/vod/index?size=18&page={}&id=17&desc=hits&ztid=0".format(index)
    movedatas = getHtmlData(url)
    jsondata = json.loads(movedatas.text)
    # print jsondata
    if jsondata["code"] == 0:
        moveList = jsondata["data"]
        for i in (moveList):
            movieName = i["name"]
            id = i["id"]
            m3u8url = "http://api.bjxkhc.com/index.php/app/ios/vod/show?uid=1506082&token=d03b49592ce8ba8b0b614c0e2fff6121&id={}".format(id)
            m3u8urldata = getHtmlData(m3u8url)
            purl = json.loads(m3u8urldata.text)
            zu = purl["data"]["zu"]
            #print movieName
            for ji in zu:
               for i in ji["ji"]:
                    purl = i["purl"]
                    print movieName,purl
                    # downUrl(purl,movieName)
    else:
        print "page data error=",index
   
for i in xrange(30):
     getPage(i)   


os.system("pause")