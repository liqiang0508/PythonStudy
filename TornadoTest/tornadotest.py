# -*- coding: utf-8 -*-
import tornado.ioloop
import tornado.web
import tornado.websocket
import os

UPLOADPATH = "uploadfile"#上传文件夹名称

class MainHandler(tornado.web.RequestHandler):
    def get(self):
        self.write("Hello, Torenado")
        

    def write_error(self, status_code, **kwargs):
        self.write("Gosh darnit, user! You caused a %d error." % status_code)



class PoemPageHandler(tornado.web.RequestHandler):
    def post(self):
        noun1 = self.get_argument('noun1')
        noun2 = self.get_argument('noun2')
        verb = self.get_argument('verb')
        noun3 = self.get_argument('noun3')
        self.render('poem.html', roads=noun1, wood=noun2, made=verb,
                difference=noun3)
        

#文件上传测试
class UpLoadFile(tornado.web.RequestHandler):

    def get(self):
    	 self.render('UpLoadFile.html')

    def post(self):
    	file_metas = self.request.files["uploadFile"]               #获取上传文件信息
        for meta in file_metas:                                 #循环文件信息
            file_name = meta['filename']                        #获取文件的名称  
            savePath =  os.path.join(UPLOADPATH,file_name)  
            print("uploadfile===",savePath)                                 
            with open(savePath,'wb') as up:            #os拼接文件保存路径，以字节码模式打开
                up.write(meta['body'])
                up.close()
        self.redirect("uploadsuccess?path="+savePath)

#文件成功上传
class UpLoadFileSuccess(tornado.web.RequestHandler):

    def get(self):
         path = self.get_argument('path')
    	 self.render('UpLoadFileSuccess.html',filePath = path)

#websocket
class WebScocketHandler(tornado.websocket.WebSocketHandler) :
    def check_origin(self, origin) :
        '''重写同源检查 解决跨域问题'''
        return True

    def open(self) :
        '''新的websocket连接后被调动'''
        print("on_open")
        self.write_message('Welcome')

    def on_close(self) :
        print("on_close")
        '''websocket连接关闭后被调用'''

    def on_message(self, message) :
        '''接收到客户端消息时被调用'''
        print("on_message")
        self.write_message('new message :' + message)  # 向客服端发送


if __name__ == "__main__":

    if os.path.exists(UPLOADPATH) == False:#不存在
    	os.makedirs(UPLOADPATH)

    app = tornado.web.Application(
        handlers=[(r'/', MainHandler),(r'/upload', UpLoadFile),(r'/uploadsuccess', UpLoadFileSuccess),(r'/ws', WebScocketHandler)],
        template_path = os.path.join(os.path.dirname(__file__), "templates"),
        static_path = os.path.join(os.path.dirname(__file__), "static"),
        debug = True
    )

    http_server = tornado.httpserver.HTTPServer(app)
    http_server.listen(8888)
    tornado.ioloop.IOLoop.current().start()