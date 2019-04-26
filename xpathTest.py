#!/usr/bin/python
# -*- coding: UTF-8 -*-
from lxml import etree
import re
import os
html = "<html>\
 <head>\
  <base href='http://example.com/' />\
  <title>Example website</title>\
 </head>\
 <body>\
  <div class='images'>\
   <a href='image1.html'>Name: My image 1 <br /><img src='image1_thumb.jpg' /></a>\
   <a href='image2.html'>Name: My image 2 <br /><img src='image2_thumb.jpg' /></a>\
   <a href='image3.html'>Name: My image 3 <br /><img src='image3_thumb.jpg' /></a>\
   <a href='image4.html'>Name: My image 4 <br /><img src='image4_thumb.jpg' /></a>\
   <a href='image5.html'>Name: My image 5 <br /><img src='image5_thumb.jpg' /></a>\
  </div>\
 </body>\
</html>"

selector = etree.HTML(html)
title = selector.xpath("//title/text()")
print title,title[0]

image = selector.xpath('//div[@class = "images"]/a')
print image
for a in image:
    print a,a.text,a.get("href"),a.xpath("img")[0].get("src")

p = "56989awadad45454-"

pattern = re.compile("(\d+)-")
result  = pattern.findall(p)
print result
os.system("pause")