
# -*- coding: utf-8 -*-
# import addressbook_pb2
# from pythonPb.proto import addressbook_pb2
# import pythonPb.proto.addressbook_pb2
from pythonPb.mm import test
from pythonPb.mm import addressbook_pb2
import os
 

address_book = addressbook_pb2.AddressBook()
person = address_book.people.add()

person.id = 1
person.name = "LEE"
person.email = "497232807@qq.com"

phone_number = person.phones.add()
phone_number.type = addressbook_pb2.Person.PhoneType.HOME
phone_number.number = "1234567"

phone_number2 = person.phones.add()
phone_number2.type = addressbook_pb2.Person.PhoneType.WORK
phone_number2.number = "89102151"

phone_number3 = person.phones.add()
phone_number3.type = addressbook_pb2.Person.PhoneType.WORK
phone_number3.number = "6666666"


print("1=====",addressbook_pb2.Person.PhoneType.MOBILE)
print("2=====",addressbook_pb2.Person.MOBILE)
print("3=====",addressbook_pb2.Person.PhoneType.Value("MOBILE"))


# 序列化
serializeToString = address_book.SerializeToString()
print("serializeToString",serializeToString, type(serializeToString))

address_book.ParseFromString(serializeToString)
print("address_book",address_book)

for person in address_book.people:
    for phone_number in person.phones:
        print(phone_number.type,phone_number.number)


test.Say()

os.system("pause")
