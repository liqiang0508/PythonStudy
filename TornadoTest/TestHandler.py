# -*- coding: utf-8 -*-

import time
import tornado
from concurrent.futures import ThreadPoolExecutor
from tornado import gen
from tornado.concurrent import run_on_executor




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



