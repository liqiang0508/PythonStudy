# -*- coding: utf-8 -*-
import urllib

import tornado
import json
import hashlib

from tornado import gen

import reply
import receive

APPID = "wxb781d732550afa4f"
appsecret = "76417792d3d4dce05f9e1c19f5512c13"

# 调试地址  https://mp.weixin.qq.com/debug/cgi-bin/sandbox?t=sandbox/login
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
        print("handle/GET func: hashcode, signature: ", hashcode, signature)
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

# wx网页登录流程  https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/Wechat_webpage_authorization.html
class AuthHandler(tornado.web.RequestHandler):

    def get(self):
        print("wx auth****")
        server = "http://lee.free.vipnps.vip/get_code"  # 回调code 的地址
        state = "adadafa21"  #重定向后会带上state参数，开发者可以填写a-zA-Z0-9的参数值，最多128字节
        server = urllib.quote_plus(server)
        # https://open.weixin.qq.com/connect/oauth2/authorizeappid=wxf0e81c3bee622d60&redirect_uri=http://nba.bluewebgame.com/oauth_response.php&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect
        url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid={}&redirect_uri={}&response_type=code&scope=snsapi_userinfo&state={}#wechat_redirect".format(
            APPID, server,state)
        self.redirect(url)


class TokenHandler(tornado.web.RequestHandler):

    # @tornado.web.asynchronous
    # @tornado.gen.engine
    def get(self):  # 重定向获取code
        code = self.get_argument("code", None)
        if code is not None:
            userinfo = yield self.get_token(code)  # 获取token
            print("userinfo==", userinfo)
            if userinfo is not None:
                self.render("home.html", userinfo=userinfo)

            else:
                self.write("get code error3")

        else:
            self.write("get code error4")

    @gen.coroutine
    def get_token(self, code):  # 获取tocken
        # https: // api.weixin.qq.com / sns / oauth2 / access_token?appid = APPID & secret = SECRET & code = CODE & grant_type = authorization_cod
        url = "https://api.weixin.qq.com/sns/oauth2/access_token?appid={}&secret={}&code={}&grant_type=authorization_code".format(
            APPID, appsecret, code)

        client = tornado.httpclient.AsyncHTTPClient()
        response = yield tornado.gen.Task(client.fetch, url)
        print("get_token response", response.body)
        body = json.loads(response.body)

        openid = body["openid"]
        access_token = body["access_token"]
        refresh_token = body["refresh_token"]

        token = yield self.check_token(access_token, openid)
        # token["errcode"] = 1
        print("errcode", token)
        if int(token["errcode"]) == 0:  # token没有过期
            userinfo = yield self.get_userinfo(openid, access_token)  # 获取个人信息
            raise gen.Return(userinfo)
        else:  # 过期了
            print("token 过期了")
            refreshData = yield self.refresh_token(refresh_token)  # 刷新token
            access_token = refreshData["access_token"]

            userinfo = yield self.get_userinfo(openid, access_token)  # 获取个人信息
            raise gen.Return(userinfo)

        self.finish()

        # {
        #     "access_token": "ACCESS_TOKEN",
        #     "expires_in": 7200,
        #     "refresh_token": "REFRESH_TOKEN",
        #     "openid": "OPENID",
        #     "scope": "SCOPE"
        # }

    @gen.coroutine
    def refresh_token(self, refrsh_token):  # 刷新token
        url = "https://api.weixin.qq.com/sns/oauth2/refresh_token?appid={}&grant_type=refresh_token&refresh_token={} ".format(
            APPID, refrsh_token)
        client = tornado.httpclient.AsyncHTTPClient()
        response = yield tornado.gen.Task(client.fetch, url)
        response = json.loads(response.body)
        raise gen.Return(response)

        # {
        #     "access_token": "ACCESS_TOKEN",
        #     "expires_in": 7200,
        #     "refresh_token": "REFRESH_TOKEN",
        #     "openid": "OPENID",
        #     "scope": "SCOPE"
        # }

    @gen.coroutine
    def check_token(self, token, openid):  # 检测token是否过期
        url = "https://api.weixin.qq.com/sns/auth?access_token={}&openid={}".format(token, openid)
        client = tornado.httpclient.AsyncHTTPClient()
        response = yield tornado.gen.Task(client.fetch, url)
        response = json.loads(response.body)
        raise gen.Return(response)

    @gen.coroutine
    def get_userinfo(self, openid, access_token):  # 获取WX用户信息
        # https: // api.weixin.qq.com / sns / userinfo?access_token = ACCESS_TOKEN & openid = OPENID & lang = zh_CN

        url = "https://api.weixin.qq.com/sns/userinfo?access_token={}&openid={}&lang=zh_CN".format(access_token, openid)
        client = tornado.httpclient.AsyncHTTPClient()
        response = yield tornado.gen.Task(client.fetch, url)
        response = json.loads(response.body)
        raise gen.Return(response)

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
