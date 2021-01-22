# -*- coding: utf-8 -*-
import json
import time
import tornado
from concurrent.futures import ThreadPoolExecutor
from tornado import gen
from tornado.concurrent import run_on_executor

from MysqlUtils import *


class TestHandler(tornado.web.RequestHandler):
    def data_received(self, chunk):
        pass

    # 线程池
    max_thread_num = 10
    executor = ThreadPoolExecutor(max_workers=max_thread_num)

    @run_on_executor
    def my_func(self):
        # do your thing
        time.sleep(10)
        return "my_func"

    @gen.coroutine
    def get(self):
        res = yield self.my_func()
        self.write(res)
        self.finish()


class MainHandler(tornado.web.RequestHandler):
    def data_received(self, chunk):
        pass

    def get(self):
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
