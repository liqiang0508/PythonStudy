#encoding:utf-8
#!/usr/bin/env python

# https://github.com/Pithikos/python-websocket-server
# pip install websocket-server
from websocket_server import WebsocketServer

import logging  
import time


clientGroup = {}#保存下所有的连接


# Called for every client connecting (after handshake)
def new_client(client, server):
	client['id'] = 1000
	clientGroup[client['id']] = client
	print clientGroup
	print("New client connected and was given id %d" % client['id'])
	server.send_message_to_all("Hey all, a new client has joined us")


# Called for every client disconnecting
def client_left(client, server):
	print("Client(%d) disconnected" % client['id'])
	del clientGroup[client['id']]
	print clientGroup


# Called when a client sends a message
def message_received(client, server, message):
	if len(message) > 200:
		message = message[:200]+'..'
	print("Client(%d) said: %s" % (client['id'], message))
	logger.info("Client(%d) said: %s" % (client['id'], message))
	server.send_message(client,message)


def CreateWs(port):

	server = WebsocketServer(port)
	server.set_fn_new_client(new_client)
	server.set_fn_client_left(client_left)
	server.set_fn_message_received(message_received)
	server.run_forever()


day = time.strftime("%Y-%m-%d", time.localtime()) 
logger = logging.getLogger(__name__)
logger.setLevel(level = logging.DEBUG)
handler = logging.FileHandler("{}.txt".format(day))
handler.setLevel(logging.INFO)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
handler.setFormatter(formatter)
logger.addHandler(handler)

if __name__ == "__main__":
	CreateWs(9001)
# PORT=9001
# server = WebsocketServer(PORT)
# server.set_fn_new_client(new_client)
# server.set_fn_client_left(client_left)
# server.set_fn_message_received(message_received)
# server.run_forever()



# logger.info("Start print log")
# logger.debug("Do something")
# logger.warning("Something maybe fail.")
# logging.info("Finish")