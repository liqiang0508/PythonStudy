#!/usr/bin/python
# -*- coding: UTF-8 -*-
import xxtea
text = "Hello World! 你好，中国！"
key = "1234567890"
encrypt_data = xxtea.encrypt(text, key)
decrypt_data = xxtea.decrypt(encrypt_data, key)
print(encrypt_data);
print(decrypt_data);
with open("HelloWorld.png","rb") as f:
	data = f.read()
	print data

	dataen =  xxtea.encrypt(data, key)#加密
	with open("HelloWorldEN.png","wb") as f1:
		f1.write(dataen)


	datade = xxtea.decrypt(dataen, key)#解密
	with open("HelloWorldDE.png","wb") as f2:
		f2.write(datade)

# print(text == decrypt_data);