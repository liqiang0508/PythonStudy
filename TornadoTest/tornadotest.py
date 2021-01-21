# -*- coding: utf-8 -*-
import tornado.ioloop
import tornado.web
import tornado.websocket
import os
import datetime
import time

from tornado.concurrent import run_on_executor
from concurrent.futures import ThreadPoolExecutor

from tornado.options import define, options, parse_command_line
from tornado import gen

define("port", default=8888, help=" running port number")  # 启动的端口号

UPLOADPATH = "static\uploadfile"  # 上传文件夹名称


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
        self.write("Hello, Tornado")

    def write_error(self, status_code, **kwargs):
        pass
        # if status_code == 404:
        #     self.write("Page not find")


# 聊天界面
class ChatHandler(tornado.web.RequestHandler):
    def data_received(self, chunk):
        pass

    def get(self):
        self.render('ws.html')


class PoemPageHandler(tornado.web.RequestHandler):
    def data_received(self, chunk):
        pass

    def post(self):
        noun1 = self.get_argument('noun1')
        noun2 = self.get_argument('noun2')
        verb = self.get_argument('verb')
        noun3 = self.get_argument('noun3')
        self.render('poem.html', roads=noun1, wood=noun2, made=verb,
                    difference=noun3)


# 文件上传测试
class UpLoadFile(tornado.web.RequestHandler):

    def data_received(self, chunk):
        pass

    def get(self):
        self.render('UpLoadFile.html')

    # @tornado.web.asynchronous 如果是耗时的操作 要加上 然后最后调用finish
    def post(self):
        file_metas = self.request.files["uploadFile"]  # 获取上传文件信息
        file_key = self.get_argument("file_key")  # 获取提交的file_key字段
        save_path = ""
        for meta in file_metas:  # 循环文件信息
            file_name = meta['filename']  # 获取文件的名称
            save_path = os.path.join(UPLOADPATH, file_name)
            print("upload_file===", save_path)
            with open(save_path, 'wb') as up:  # os拼接文件保存路径，以字节码模式打开
                up.write(meta['body'])
                up.close()
        self.redirect("upload_success?path=" + save_path)
        # self.finish()
        # self.redirect("https://www.baidu.com/")


# 文件成功上传
class UpLoadFileSuccess(tornado.web.RequestHandler):

    def data_received(self, chunk):
        pass

    def get(self):
        path = self.get_argument('path')
        self.render('UpLoadFileSuccess.html', filePath=path)


# #websocket
class WebSocketHandler(tornado.websocket.WebSocketHandler):
    def data_received(self, chunk):
        pass

    users = set()  # 用来存放在线用户的容器

    def check_origin(self, origin):
        """重写同源检查 解决跨域问题"""
        return True

    def open(self):
        """新的websockets连接后被调动"""
        # print("on_open")
        self.users.add(self)  # 建立连接后添加用户到容器中
        for user in self.users:  # 向已在线用户发送消息
            user.write_message(
                u"[%s]-[%s]-进入聊天室" % (self.request.remote_ip, datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")))

    def on_close(self):
        # print("on_close")
        self.users.remove(self)  # 用户关闭连接后从容器中移除用户
        for user in self.users:
            user.write_message(
                u"[%s]-[%s]-离开聊天室" % (self.request.remote_ip, datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")))

    def on_message(self, message):
        """接收到客户端消息时被调用"""
        # print("on_message==", message)
        for user in self.users:  # 向在线用户广播消息
            user.write_message(u"[%s]-[%s]-说：%s" % (
                self.request.remote_ip, datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"), message))


def write_error(self, state, **kw):
    self.write("Page not find  " + str(state))


if __name__ == "__main__":

    if not os.path.exists(UPLOADPATH):  # 不存在
        os.makedirs(UPLOADPATH)

    parse_command_line()

    setting = {
        "template_path": os.path.join(os.path.dirname(__file__), "templates"),
        "static_path": os.path.join(os.path.dirname(__file__), "static"),
        "debug": False

    }

    app = tornado.web.Application(
        handlers=[
            (r'/', MainHandler),
            (r'/upload', UpLoadFile),
            (r'/upload_success', UpLoadFileSuccess),
            (r'/chat', ChatHandler),
            (r'/ws', WebSocketHandler),
            (r'/test', TestHandler)
        ],
        **setting
    )
    tornado.web.RequestHandler.write_error = write_error  # Error_handler

    http_server = tornado.httpserver.HTTPServer(app)
    http_server.listen(options.port)
    tornado.ioloop.IOLoop.current().start()
