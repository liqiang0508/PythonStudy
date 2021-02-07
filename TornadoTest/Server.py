# -*- coding: utf-8 -*-
import tornado.ioloop
import tornado.web
from tornado.options import define, options, parse_command_line

from TestHandler import *
from UpLoadFileHandler import *
from WebSocketTest import *
from WxHandle import *

from HomeHandler import *

define("port", default=80, help=" running port number")  # 启动的端口号


class Hello(tornado.web.RequestHandler):
    @gen.coroutine
    # @tornado.gen.engine
    def get(self):
        # client = tornado.httpclient.AsyncHTTPClient()
        # client.fetch("https://www.baidu.com",callback=self.on_response)

        # client = tornado.httpclient.AsyncHTTPClient()
        # response = yield tornado.gen.Task(client.fetch,"https://www.baidu.com")
        # print(response.code)
        # self.write(str(response.code))
        # self.finish()

        data = yield self.say()
        print("data==", data)
        self.write(str(data))
        self.finish()

    @gen.coroutine
    def say(self):
        client = tornado.httpclient.AsyncHTTPClient()
        response = yield tornado.gen.Task(client.fetch, "https://www.baidu.com")
        print("response==", response.code)
        data = yield self.Add(response.code)
        raise gen.Return(data)

    def Add(self, num):
        raise gen.Return(num + 2)

    def on_response(self, response):
        print(response)
        self.write(response.code)
        self.finish()


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
            (r'/', Hello),
            (r'/', WxHandler),
            (r'/upload', UpLoadFile),
            (r'/upload_success', UpLoadFileSuccess),
            (r'/chat', ChatHandler),
            (r'/ws', WebSocketHandler),
            (r'/test', TestHandler),
            (r'/wx', WxHandler),
            (r'/home', HomeHandler),
            (r'/get_token', TokenHandler),
            (r'/auth', AuthHandler)

        ],
        **setting
    )
    tornado.web.RequestHandler.write_error = write_error  # Error_handler

    http_server = tornado.httpserver.HTTPServer(app)
    http_server.listen(options.port)
    tornado.ioloop.IOLoop.current().start()
