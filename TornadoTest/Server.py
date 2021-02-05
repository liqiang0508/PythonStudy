# -*- coding: utf-8 -*-
import tornado.ioloop
import tornado.web
from tornado.options import define, options, parse_command_line

from TestHandler import *
from UpLoadFileHandler import *
from WebSocketTest import *
from MysqlHandle import  *

define("port", default=8888, help=" running port number")  # 启动的端口号


def write_error(self, state, **kw):
    self.write("Page not find  " + str(state))


if __name__ == "__main__":

    if not os.path.exists(UPLOADPATH):  # 不存在
        os.makedirs(UPLOADPATH)

    parse_command_line()
    setting = {
        "template_path": os.path.join(os.path.dirname(__file__), "templates"),
        "static_path": os.path.join(os.path.dirname(__file__), "static"),
        "debug": True
    }
    app = tornado.web.Application(
        handlers=[
            (r'/', MysqlHandler),
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
