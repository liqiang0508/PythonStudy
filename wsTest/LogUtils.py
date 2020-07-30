#!/usr/bin/python
# -*- coding: UTF-8 -*-

import logging  
import time


class LogUtils:

	def __init__(self,roomid):
		day = time.strftime("%Y-%m-%d", time.localtime()) 
		self.logger = logging.getLogger(__name__+" RoomID=="+str(roomid))
		self.logger.setLevel(level = logging.DEBUG)
		handler = logging.FileHandler("{}-{}.txt".format(day,roomid),encoding="utf-8")
		handler.setLevel(logging.DEBUG)
		formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
		handler.setFormatter(formatter)
		self.logger.addHandler(handler)

	def log(self,msg):
		self.logger.info(msg)