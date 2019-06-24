#!/usr/bin/python
# -*- coding: UTF-8 -*-
from selenium import webdriver
from selenium.webdriver.common.keys import Keys

browser = webdriver.Chrome()
browser.get('https://mail.qq.com/cgi-bin/loginpage')


browser.switch_to.frame("login_frame")
# browser.find_element_by_id("switcher_plogin").click()
browser.find_element_by_class_name("switch_btn").click()
 
browser.find_element_by_id("u").clear()
browser.find_element_by_id("u").send_keys("497232807@qq.com")
browser.find_element_by_id("p").clear()
browser.find_element_by_id("p").send_keys("liqiang123")

browser.find_element_by_id("p").send_keys(Keys.ENTER)
# qqNum = browser.find_element_by_id( "u")
# password= browser.find_element_by_id("p")
# qqNum.sendkeys("49723287@qq.com")
# 关闭当前页面，如果只有一个页面，会关闭浏览器
# driver.close()

# 关闭浏览器
# browser.quit()