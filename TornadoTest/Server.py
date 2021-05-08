# -*- coding: utf-8 -*-
import tornado.ioloop
import tornado.web
from tornado.httpclient import AsyncHTTPClient
from tornado.options import define, options, parse_command_line

from TestHandler import *
from UpLoadFileHandler import *
from WebSocketTest import *
from WxHandle import *

from HomeHandler import *

# Server.py --port=8000  命令行启动自定义端口号
define("port", default=8080, help=" running port number")  # 启动的端口号


class Hello(tornado.web.RequestHandler):

    async def get(self):
        data = await self.doFun()
        print("data==", data)
        response = self.request.remote_ip+" code = "+str(data.code)
        self.write(response)
        self.finish()
        # self.redirect("http://www.baidu.com")

    async def doFun(self):
        http_client = AsyncHTTPClient()
        try:
            response = await http_client.fetch("http://www.baidu.com")
        except Exception as e:
            print("Error: %s" % e)
        else:
            return response
            print(response.code)



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
            (r'/', Hello),
            (r'/upload', UpLoadFile),
            (r'/upload_success', UpLoadFileSuccess),
            (r'/chat', ChatHandler),
            (r'/ws', WebSocketHandler),
            (r'/test', TestHandler),
            (r'/wx', WxHandler),
            (r'/home', HomeHandler),
            (r'/get_code', TokenHandler),
            (r'/auth', AuthHandler)

        ],
        **setting
    )
    tornado.web.RequestHandler.write_error = write_error  # Error_handler
    # //https://github.com/FiloSottile/mkcert 信任自签证书
    http_server = tornado.httpserver.HTTPServer(app,ssl_options={
           "certfile": "key/key.pem",
           "keyfile":  "key/key-key.pem",
       })
    # http_server = tornado.httpserver.HTTPServer(app)
    http_server.listen(options.port)
    tornado.ioloop.IOLoop.current().start()
