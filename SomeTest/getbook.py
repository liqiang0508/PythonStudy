import requests
import re
from lxml import etree
headers = {'User-Agent':'Mozilla/6.0 (Windows; U; Windows NT 6.12; en-US; rv:1.9.1.7) Gecko/20091202 Firefox/3.5.6','Connection': 'close'} 
url = "https://book.douban.com/review/10288829/"

htmldata = requests.get(url,headers = headers)

selector = etree.HTML(htmldata.text)
content = selector.xpath('//div[@class = "review-content clearfix"]')

print content[0].xpath('string(.)')