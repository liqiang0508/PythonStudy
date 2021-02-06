# -*- coding: utf-8 -*-
import tornado
import json


class HomeHandler(tornado.web.RequestHandler):
  

    def get(self):
       self.render("home.html")
