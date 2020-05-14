#!/usr/bin/python
# -*- coding: UTF-8 -*-
import xxtea
import os

import struct 
text = "Hello World! 你好，中国！"
key = "1234567890"
encrypt_data = xxtea.encrypt(text, key)
decrypt_data = xxtea.decrypt(encrypt_data, key)
# print(encrypt_data);
# print(decrypt_data);
# with open("HelloWorld.png","rb") as f:
# 	data = f.read()
# 	print data

# 	dataen =  xxtea.encrypt(data, key)#加密
# 	with open("HelloWorldEN.png","wb") as f1:
# 		f1.write(dataen)


# 	datade = xxtea.decrypt(dataen, key)#解密
# 	with open("HelloWorldDE.png","wb") as f2:
# 		f2.write(datade)

def encryptPic(pathname,encrykey):#加密目录下的图片
	for dirpath,dirnames,filenames in os.walk(pathname):#压缩目录下的所有文件
            for files in filenames:
                    if files.endswith("png") or files.endswith("jpg")  :
                    	filePath = os.path.join(dirpath, files)
                    	print filePath
                    	with open(filePath,"rb") as f:
                    		data = f.read()
                    		dataEncrypt =  xxtea.encrypt(data, encrykey)#加密
                    		f.close()
                    		with open(filePath,"wb") as f1:
                    			f1.write(dataEncrypt)
                    			f1.close()

_DELTA = 0x9E3779B9  

def _long2str(v, w):  
    n = (len(v) - 1) << 2  
    if w:  
        m = v[-1]  
        if (m < n - 3) or (m > n): return ''  
        n = m  
    s = struct.pack('<%iL' % len(v), *v)  
    return s[0:n] if w else s  
  
def _str2long(s, w):  
    n = len(s)  
    m = (4 - (n & 3) & 3) + n  
    s = s.ljust(m, "\0")  
    v = list(struct.unpack('<%iL' % (m >> 2), s))  
    if w: v.append(n)  
    return v  
  
def encrypt(str, key):  
    if str == '': return str  
    v = _str2long(str, True)  
    k = _str2long(key.ljust(16, "\0"), False)  
    n = len(v) - 1  
    z = v[n]  
    y = v[0]  
    sum = 0  
    q = 6 + 52 // (n + 1)  
    while q > 0:  
        sum = (sum + _DELTA) & 0xffffffff  
        e = sum >> 2 & 3  
        for p in xrange(n):  
            y = v[p + 1]  
            v[p] = (v[p] + ((z >> 5 ^ y << 2) + (y >> 3 ^ z << 4) ^ (sum ^ y) + (k[p & 3 ^ e] ^ z))) & 0xffffffff  
            z = v[p]  
        y = v[0]  
        v[n] = (v[n] + ((z >> 5 ^ y << 2) + (y >> 3 ^ z << 4) ^ (sum ^ y) + (k[n & 3 ^ e] ^ z))) & 0xffffffff  
        z = v[n]  
        q -= 1  
    return _long2str(v, False)  
  
def decrypt(str, key):  
    if str == '': return str  
    v = _str2long(str, False)  
    k = _str2long(key.ljust(16, "\0"), False)  
    n = len(v) - 1  
    z = v[n]  
    y = v[0]  
    q = 6 + 52 // (n + 1)  
    sum = (q * _DELTA) & 0xffffffff  
    while (sum != 0):  
        e = sum >> 2 & 3  
        for p in xrange(n, 0, -1):  
            z = v[p - 1]  
            v[p] = (v[p] - ((z >> 5 ^ y << 2) + (y >> 3 ^ z << 4) ^ (sum ^ y) + (k[p & 3 ^ e] ^ z))) & 0xffffffff  
            y = v[p]  
        z = v[n]  
        v[0] = (v[0] - ((z >> 5 ^ y << 2) + (y >> 3 ^ z << 4) ^ (sum ^ y) + (k[0 & 3 ^ e] ^ z))) & 0xffffffff  
        y = v[0]  
        sum = (sum - _DELTA) & 0xffffffff  
    return _long2str(v, True)  

# print(text == decrypt_data);
targetFolder = "enceyptPic"#目标目录
# encryptPic(targetFolder,"test123")


def encryptPicII(pathname,encrykey):#加密目录下的图片
	for dirpath,dirnames,filenames in os.walk(pathname):#压缩目录下的所有文件
            for files in filenames:
                    if files.endswith("png") or files.endswith("jpg")  :
                    	filePath = os.path.join(dirpath, files)
                    	print filePath
                    	with open(filePath,"rb") as f:
                    		data = f.read()
                    		dataEncrypt =  encrypt(data, encrykey)#加密
                    		f.close()
                    		with open(filePath,"wb") as f1:
                    			f1.write(dataEncrypt)
                    			f1.close()
# 测试图片加解密
# with open("HelloWorld.png","rb") as f:
# 	data = f.read()
# 	f.close()
# 	enCryptata = encrypt(data,"test123")
# 	with open("HelloWorld1.png","wb") as f1:
# 		f1.write(enCryptata)
# 		f1.close()
# 	deCrypyData = decrypt(enCryptata,"test123")
# 	with open("HelloWorld2.png","wb") as f2:
# 		f2.write(deCrypyData)
# 		f2.close()



# 测试lua脚本解密
luafile = 'main.luac'
with open(luafile,"rb+") as f:
	data = f.read()
	print data
	data = data.replace("Awdada96jYgjkjd","")
	data = decrypt(data,"Awdada96jYgjkjd")
	# print data
	# data = data.replace("Awdada96jYgjkjd","")
	# print data
	# deCryptData = decrypt(data,"SYSTEM_EVENT_EVT_USER_LOGIN")
	# print deCryptData
	# with open("main1.lua","wb+") as f1:
	# 	f1.write(data)
	# 	f1.close()





a = "adadaww"
# print a.replace("ww","ee")
