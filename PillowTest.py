#!/usr/bin/python
# -*- coding: UTF-8 -*-

import os
from PIL import Image, ImageDraw, ImageFont
from PIL import ImageGrab,ImageFilter,ImageColor
#image = Image.new(mode='RGBA', size=(50, 50),)
 
# image = Image.new("RGB",(50,50),"white")
# draw_table = ImageDraw.Draw(im=image)
# draw_table.text(xy=(0, 0), text=u'仰', fill='#ff0000', font=ImageFont.truetype('font.ttf', 50))
 
# # image.show()  # 直接显示图片
# image.save('满月.png', 'PNG')  # 保存在当前路径下，格式为PNG
# image.close()



def CaptureScrren(saveFileName):#截屏
#get current screen copy
	image = ImageGrab.grab()

#display image size
	print("Current screen shot size :",image.size)

#display image mode
	print("Screen shot picture mode :", image.mode)

#save picture to /tmp/screen-grab-1.bmp
	image.save(saveFileName)

#show picture
# image.show()
CaptureScrren("p.png")

im = Image.open("p.png")
width, height = im.size
# 宽高
print(im.size, width, height)

dst_image = im.filter(ImageFilter.BLUR)
dst_image.save("p1.png")

# for i  in range(width):
# 	for j in range(height):
# 		r,g,b = im.getpixel((i, j))
# 		im.putpixel((i, j), (0,g,b))
# im.save("p11.png")

os.system("pause")