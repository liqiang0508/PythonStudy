# -*- coding: utf-8 -*-
# python xml数据处理

import xml.etree.ElementTree as ET
from xml.dom import minidom
from xml.etree import ElementTree
from xml.etree.ElementTree import Element, SubElement, Comment, tostring

# 解析xml字符串
def parseXmlString(string_data):
    data = ET.fromstring(str)
    return data


# 打印xml
def prettify(elem):
    """Return a pretty-printed XML string for the Element.
    """
    rough_string = ElementTree.tostring(elem, 'utf-8')
    reparsed = minidom.parseString(rough_string)
    return reparsed.toprettyxml(indent="  ")


str = "<xml title='Enemy Behind'>\
 <ToUserName><![CDATA[公众号]]></ToUserName>\
 <FromUserName><![CDATA[粉丝号]]></FromUserName>\
 <CreateTime>1460537339</CreateTime>\
 <MsgType><![CDATA[text]]></MsgType>\
 <Content><![CDATA[欢迎开启公众号开发者模式]]></Content>\
 <MsgId>6272960105994287618</MsgId>\
</xml>"
# data = parseXmlString(str)
#
# print data.find("CreateTime").text
# print data.findtext("CreateTime")
# print data.get("title")  # 获取属性
# print prettify(data)
#
# #创建
#
# top = Element('xml')
#
# comment = Comment('Generated for PyMOTW')
# top.append(comment)
#
# child = SubElement(top, 'child')
# child.text = 'This child contains text.'
#
# child_with_tail = SubElement(top, 'child_with_tail')
# child_with_tail.text = 'This child has regular text.'
# child_with_tail.tail = "And  \' tail text."
#
# child_with_entity_ref = SubElement(top, 'child_with_entity_ref')
# child_with_entity_ref.text = 'This & that'
#
# print prettify(top)
# root = tree.getroot()
