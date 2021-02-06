# -*- coding: utf-8 -*-
import tornado
import json
import hashlib
import reply
import receive

APPID = "wxb781d732550afa4f"
appsecret = "76417792d3d4dce05f9e1c19f5512c13"


class WxHandler(tornado.web.RequestHandler):
    def data_received(self, chunk):
        pass

    def get(self):
        signature = self.get_argument("signature",None)
        timestamp = self.get_argument("timestamp",None)
        nonce = self.get_argument("nonce",None)
        echostr = self.get_argument("echostr",None)
        if signature==None:
            self.write("hello, this is handle view")
            return

        token = "201162" #请按照公众平台官网\基本配置中信息填写
        listData= [token, timestamp, nonce]
        listData.sort()
        sha1 = hashlib.sha1()
        map(sha1.update, listData)
        hashcode = sha1.hexdigest()
        print "handle/GET func: hashcode, signature: ", hashcode, signature
        if hashcode == signature:
            print("yes")
            self.write(echostr) 
        else:
            print("No")
            self.write("")

    def post(self):
        webData = self.request.body
        print("body=",webData)

        recMsg = receive.parse_xml(webData)
        if isinstance(recMsg, receive.Msg):
            toUser = recMsg.FromUserName
            fromUser = recMsg.ToUserName
            if recMsg.MsgType == 'text':
                content = recMsg.Content
                replyMsg = reply.TextMsg(toUser, fromUser, content)
                self.write(replyMsg.send()) 
            if recMsg.MsgType == 'image':
                mediaId = recMsg.MediaId
                replyMsg = reply.ImageMsg(toUser, fromUser, mediaId)
                self.write(replyMsg.send())
            else:#暂不处理
                self.write(reply.Msg().send())
       

class AuthHandler(tornado.web.RequestHandler):

    def get(self):
        url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid={}&redirect_uri={}&response_type=code&scope=snsapi_userinfo#wechat_redirect".format(APPID,"http%3A%2F%2Flee.free.vipnps.vip%2Fhome")
        self.redirect(url)
    
