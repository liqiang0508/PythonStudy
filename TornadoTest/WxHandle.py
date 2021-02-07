# -*- coding: utf-8 -*-
import tornado
import json
import hashlib

from tornado import gen

import reply
import receive

APPID = "wxb781d732550afa4f"
appsecret = "76417792d3d4dce05f9e1c19f5512c13"


class WxHandler(tornado.web.RequestHandler):
    def data_received(self, chunk):
        pass

    def get(self):
        signature = self.get_argument("signature", None)
        timestamp = self.get_argument("timestamp", None)
        nonce = self.get_argument("nonce", None)
        echostr = self.get_argument("echostr", None)
        if signature == None:
            self.write("hello, this is handle view")
            return

        token = "201162"  # 请按照公众平台官网基本配置中信息填写
        listData = [token, timestamp, nonce]
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
        # print("body=", webData)

        recMsg = receive.parse_xml(webData)
        print("recMsg==", recMsg.__dict__)
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
            else:  # 暂不处理
                self.write(reply.Msg().send())


class AuthHandler(tornado.web.RequestHandler):

    def get(self):
        print("wx auth****")
        url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid={}&redirect_uri={}&response_type=code&scope=snsapi_userinfo#wechat_redirect".format(
            APPID, "http%3A%2F%2Flee.free.vipnps.vip%2Fget_token")
        self.redirect(url)


class TokenHandler(tornado.web.RequestHandler):

    @tornado.web.asynchronous
    @tornado.gen.engine
    def get(self):  # 重定向获取code
        code = self.get_argument("code", None)
        if code is not None:
            info = yield self.get_token(code)  # 获取token

            if info is not None:
                self.write("get code error")

            else:
                self.write("get code error")

        else:
            self.write("get code error")

        self.finish()

    @gen.coroutine
    def get_token(self, code):  # 获取tocken
        # https: // api.weixin.qq.com / sns / oauth2 / access_token?appid = APPID & secret = SECRET & code = CODE & grant_type = authorization_cod
        url = "https://api.weixin.qq.com/sns/oauth2/access_token?appid={}&secret={}&code={}&grant_type=authorization_code".format(
            APPID, appsecret, code)

        client = tornado.httpclient.AsyncHTTPClient()
        response = yield tornado.gen.Task(client.fetch, url)
        body = json.loads(response.body)

        openid = body["openid"]
        access_token = body["access_token"]
        userinfo = yield self.get_userinfo(openid, access_token)  # 获取个人信息
        raise gen.Return(userinfo)

        # {
        #     "access_token": "ACCESS_TOKEN",
        #     "expires_in": 7200,
        #     "refresh_token": "REFRESH_TOKEN",
        #     "openid": "OPENID",
        #     "scope": "SCOPE"
        # }

    @gen.coroutine
    def get_userinfo(self, openid, access_token):  # 获取WX用户信息
        # https: // api.weixin.qq.com / sns / userinfo?access_token = ACCESS_TOKEN & openid = OPENID & lang = zh_CN

        url = "https://api.weixin.qq.com/sns/userinfo?access_token={}&openid={}&lang=zh_CN".format(openid, access_token)
        client = tornado.httpclient.AsyncHTTPClient()
        response = yield tornado.gen.Task(client.fetch, url)
        raise gen.Return(response)

        userinfo = json.loads(response.body)
        # return userinfo

        # {
        #     "openid": " OPENID",
        #     "nickname": NICKNAME,
        #     "sex": "1",
        #     "province": "PROVINCE",
        #     "city": "CITY",
        #     "country": "COUNTRY",
        #     "headimgurl": "https://thirdwx.qlogo.cn/mmopen/g3MonUZtNHkdmzicIlibx6iaFqAc56vxLSUfpb6n5WKSYVY0ChQKkiaJSgQ1dZuTOgvLLrhJbERQQ4eMsv84eavHiaiceqxibJxCfHe/46",
        #     "privilege": ["PRIVILEGE1" "PRIVILEGE2"],
        #     "unionid": "o6_bmasdasdsad6_2sgVt7hMZOPfL"
        # }
