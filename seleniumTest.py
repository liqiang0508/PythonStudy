#!/usr/bin/python
# -*- coding: UTF-8 -*-
from selenium import webdriver
from selenium.webdriver.common.keys import Keys


from lxml import etree

browser = webdriver.Chrome()

browser.get('https://www.baidu.com/')
data = browser.page_source
selector = etree.HTML(data)
title = selector.xpath("//title/text()")
print title[0]

content = browser.find_element_by_id("kw")
content.send_keys("LOL")
btnSearch = browser.find_element_by_id("su")
btnSearch.send_keys(Keys.ENTER)


#qq mial login
'''browser.get('https://mail.qq.com/cgi-bin/loginpage')
# 新开一个窗口，通过执行js来新开一个窗口
# js = 'window.open("https://mail.qq.com/cgi-bin/loginpage");'
# browser.execute_script(js)
mail = "497232807@qq.com"
pas = "liqiang123"
browser.switch_to.frame("login_frame")
browser.find_element_by_class_name("switch_btn").click()

qqNum = browser.find_element_by_id("u")
qqNum.clear()
qqNum.send_keys(mail)

password = browser.find_element_by_id("p")
password.clear()
password.send_keys(pas)
password.send_keys(Keys.ENTER)'''



# 关闭当前页面，如果只有一个页面，会关闭浏览器
# driver.close()

# 关闭浏览器
# browser.quit()
