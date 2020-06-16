
#encoding:utf-8
#!/usr/bin/env python


import WsSever
import json
roomsInfo = {}
connections = []

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


def auth(client, server,data):
	# print "auth----------", data
	client["uid"] = data['uid']

def chattext(client, server,data):
	print "chattext----------", client["uid"],client["roomid"]
	playerid = client["uid"]
	WsSever.send_to_all_room(server,str(playerid)+" say: "+data["txt"],roomsInfo[client["roomid"]])

def player_connect_room(client,server):
	pass

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


def player_leave_room(client,server):
	roomid = client['roomid']
	playerid = client['uid']
	print playerid,"leave_room"
	del roomsInfo[roomid][playerid]





