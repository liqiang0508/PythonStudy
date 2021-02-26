# -*- coding: utf-8 -*-
# 聊天界面
import datetime
import tornado.websocket


class ChatHandler(tornado.web.RequestHandler):
    def data_received(self, chunk):
        pass

    def get(self):
        self.render('Chat.html')


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
