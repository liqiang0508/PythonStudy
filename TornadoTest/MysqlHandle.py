# -*- coding: utf-8 -*-
import tornado
from MysqlUtils import *
import json
class MysqlHandler(tornado.web.RequestHandler):
    def data_received(self, chunk):
        pass

    def get(self):
        argument = self.get_argument('code',"0")#获取get参数 url?xx=？&xx=?
        print("argument==",argument)
        res = self.save_data()
        if res:
            data = self.get_data()
            jsonData = json.dumps(data, indent=8)
            self.write(jsonData)
        else:
            self.write("error")

    def get_data(self):
        data = MySqlSelectAll("select * from users")
        return data

    def save_data(self):
        b = MySqlInsert("insert into users(name,age) values ('liqiang',29)")
        return b