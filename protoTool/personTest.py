'''
Description: 
Author: li qiang
Date: 2021-05-12 11:43:47
LastEditTime: 2021-05-12 12:29:30
'''
# -*- coding: utf-8 -*-
import addressbook_pb2
import os

address_book = addressbook_pb2.AddressBook()
person = address_book.people.add()

person.id = 1
person.name = "LEE"
person.email = "497232807@qq.com"

phone_number = person.phones.add()
phone_number.type = addressbook_pb2.Person.PhoneType.MOBILE
phone_number.number = "1234567"

print("1=====",addressbook_pb2.Person.PhoneType.MOBILE)
print("2=====",addressbook_pb2.Person.MOBILE)
print("3=====",addressbook_pb2.Person.PhoneType.Value("MOBILE"))


# 序列化
serializeToString = address_book.SerializeToString()
print(serializeToString, type(serializeToString))

address_book.ParseFromString(serializeToString)
print(address_book)

os.system("pause")
