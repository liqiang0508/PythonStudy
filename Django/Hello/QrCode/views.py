#!/usr/bin/python
# -*- coding: UTF-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
import pyqrcode
from django.utils.six import BytesIO
from django.http import HttpResponse
# Create your views here.(.+)
def index(request,str):
    # print(str)
    img = pyqrcode.create(str.encode("utf-8"))    
    img =img.png('famous-joke.png', scale=10)
    with open("famous-joke.png", 'rb') as f:
        image_data = f.read()
    response = HttpResponse(image_data, content_type="image/jpg")  #将二维码数据返回到页面
    return response

# import pyqrcode
# qr = pyqrcode.create('adadada')