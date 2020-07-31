#!/usr/bin/python
# -*- coding: UTF-8 -*-


from WsSever import *
# from PokerGame import *
from Room import *
import json
roomsInfo = {}#房间信息 {roomid:{room:{Room.....}.....}}
global Server#当前server

def loginfo(msg,roomid):
	room = roomsInfo[roomid]["room"]
	room.LogInfo(msg)


#发送给单个连接
def send_to(server,client,message):
   server.send_message(client,message)

#广播给所有人
def send_to_all(server,message):
   server.send_message_to_all(message)

#广播给房间所有clients
def send_to_all_room(server,message,clients):
   for i in clients:
      client = clients[i]
      server.send_message(client,message)


#主动push给指定房间ID
def push_message_room(message,roomid):
	server = Server.GetServer()
	room = roomsInfo[roomid]["room"]
	clients = room.GetPlayerClient()
	send_to_all_room(server,message,clients)

#收到消息
def message_received(client, server, message):
	
	message = json.loads(message)
	if "uid" in client:
		message["uid"] = client["uid"]

	if "roomid" in client:
		loginfo("message_received=="+json.dumps(message,ensure_ascii=False),client["roomid"])
		roomid = client["roomid"]
		room = roomsInfo[roomid]["room"]
		room.handleMsg(client, server, message)
		return
	funcName = message["funcName"] 
	if funcName == "auth":
		auth(client, server,message)
	if funcName == "chatText":
		chattext(client, server,message)
	if funcName == "enterroom":
		player_join_room(client, server,message)

#验证玩家id
def auth(client, server,data):
	client["uid"] = data['uid']


# 玩家连接到房间
def player_connect_room(client,server):

	pass

# 加入房间
def player_join_room(client,server,data):

	roomid = data['roomid']
	playerid = client["uid"]
	if roomid not in roomsInfo:#房间号没有
		
		loginfo(str(playerid)+"=====join_room =====error "+str(roomid),roomid)
		return
	else:
		client["roomid"] = roomid
		room = roomsInfo[roomid]["room"]
		room.AddPlayerClient(client)#房间添加玩家
		data = json.dumps({"txt":"someone join room","funcName":"chatText"})
		push_message_room(data,roomid)
		
		loginfo(str(playerid)+"=====player_join_room===="+str(roomid),roomid)
	
#离开房间
def player_leave_room(client,server):
	
	if "roomid" in client:
		roomid = client["roomid"]
		room = roomsInfo[roomid]["room"]
		room.RemovePlayerClient(client)#房间移除玩家
		playerid = client["uid"]
		loginfo(str(playerid)+"=====player_leave_room===="+str(roomid),roomid)
		


def StartRoom():
	print "StartRoom"

	roomcfg = {
			   444:{"roomid":444},
			   888:{"roomid":888}
			  }

	
	for roomid in roomcfg:
		# roomcfg[roomid]["room"] = Room(roomcfg[roomid])
		roomsInfo[roomid] = roomcfg[roomid]
		roomsInfo[roomid]["room"] = Room(roomcfg[roomid])



	print "StartRoom===done"


if __name__ == "__main__":

	Server= WsSever("0.0.0.0",9001,player_connect_room,player_leave_room,message_received)
	StartRoom()
	Server.startRun()

