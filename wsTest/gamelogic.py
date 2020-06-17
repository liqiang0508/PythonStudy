
#encoding:utf-8
#!/usr/bin/env python


from WsSever import *
import json
roomsInfo = {}#房间信息 {roomid:{playerid:{client.....}.....}}
global Server#当前server

#发送给单个连接
def send_to(server,client,message):
   server.send_message(client,message)

#广播给所有人
def send_to_all(server,message):
   server.send_message_to_all(message)

#广播给房间所有人
def send_to_all_room(server,message,clients):
   for i in clients:
      client = clients[i]
      server.send_message(client,message)


#主动push给指定房间ID
def push_message_room(message,roomid):
	server = Server.GetServer()
	clients = roomsInfo[roomid]
	send_to_all_room(server,message,clients)

#收到消息
def message_received(client, server, message):
	
	print "message_received=============",message
	message = json.loads(message)
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

def chattext(client, server,data):
	global Server1
	playerid = client["uid"]
	send_to_all_room(server,str(playerid)+" say: "+data["txt"],roomsInfo[client["roomid"]])

# 玩家连接到房间
def player_connect_room(client,server):

	pass

# 加入房间
def player_join_room(client,server,data):

	roomid = data['roomid']
	if roomid not in roomsInfo:
		roomsInfo[roomid] = {}
		playerid = client["uid"]
		roomsInfo[roomid][playerid] = client
	else:
		playerid = client["uid"]
		roomsInfo[roomid][playerid] = client

	client["roomid"] = roomid

	push_message_room("有人进入聊天室",roomid)
	# WsSever.push_message("Hey all, a new client has joined us")

#离开房间
def player_leave_room(client,server):
	roomid = client['roomid']
	playerid = client['uid']
	print playerid,"leave_room"
	del roomsInfo[roomid][playerid]




if __name__ == "__main__":
	   global Server
	   Server= WsSever("0.0.0.0",9001,player_connect_room,player_leave_room,message_received)
	   Server.startRun()
