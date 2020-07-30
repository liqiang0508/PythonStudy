# -*- coding: UTF-8 -*-
# 一个房间

from Log import*
import json
class Room:

	roomid = 0 #房间id

	playerGroup = {}#保存玩家连接

	log = None
	def __init__(self,data):
		self.roomid = data["roomid"]
		self.log = Log(self.roomid)
		
	def LogInfo(self,msg):
		self.log.log(msg)

	def handleMsg(self,client, server, message):
		
		funcName = message["funcName"] 
		print "Room handleMsg==",message
		if funcName == "chatText":
			self.chattext(client, server,message)

	def AddPlayerClient(self,client):
		playerid = client['uid']
		self.playerGroup[playerid] = client

	def GetPlayerClient(self):
		return self.playerGroup

	def chattext(self,client, server,data):
		playerid = client["uid"]
		self.send_to_all(server,data["txt"])

	#发送给指定id
	def send_to(self,server,playerid,message):
	   client = self.playerGroup[playerid]
	   server.send_message(client,message)

	#发送给单个连接
	def send_to(self,server,client,message):
	   server.send_message(client,message)

	#广播给房间所有人
	def send_to_all(self,server,message):
	   clients = self.GetPlayerClient()
	   for i in clients:
	      client = clients[i]
	      server.send_message(client,message)

