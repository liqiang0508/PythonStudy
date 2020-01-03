#!/usr/bin/python
# -*- coding: UTF-8 -*-
import requests
import time
from lxml import etree
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
headers = {'User-Agent':'Mozilla/6.0 (Windows; U; Windows NT 6.12; en-US; rv:1.9.1.7) Gecko/20091202 Firefox/3.5.6','Connection': 'close'} 

url = "http://v.douyin.com/BJt9WW/"
opt = webdriver.ChromeOptions()
opt.headless = True
drive = webdriver.Chrome(options=opt)

data = drive.get(url)
# current_url = drive.current_url

# print current_url

# htmldata = requests.get(current_url,headers = headers)
# selector = etree.HTML(htmldata.text)
# title = selector.xpath("//title/text()")
playbtn = drive.find_element_by_class_name("play-btn")


playbtn.click()
video = drive.find_element_by_class_name("player")
usertitle = drive.find_element_by_class_name("desc")
src = video.get_attribute("src")

print src
print usertitle.text

drive.quit()