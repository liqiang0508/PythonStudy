import os


def zipFolder(savefile,zipFolder,pwd):

	

	cmd = "7za.exe a -r   "+savefile+" "+zipFolder +"  -mx=9 -mm=LZMA2"
	if pwd:
		cmd = cmd +" -p"+pwd
	print cmd
	os.system(cmd)



# zipFolder("test7.zip","../html/easyui","123")
# zipFolder("test7.7z","../html/easyui","123")
# zipFolder("test7.zip","*.png","123")