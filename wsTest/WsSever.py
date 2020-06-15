#encoding:utf-8
#!/usr/bin/env python

# https://github.com/Pithikos/python-websocket-server
# pip install websocket-server
from websocket_server import WebsocketServer

import logging  
import time
import messagedispatch
#发送给单个连接
def send_to(server,client,message):

   server.send_message_to_all(client,message)

#广播给所有人
def send_to_all(server,message):

   server.send_message_to_all(message)

#有新连接
def new_client(client, server):

   # print("New client connected and was given id %d" % client['id'])
   server.send_message_to_all("Hey all, a new client has joined us")
   SetPlayerUid(724001)
   logger.info("Client(%d) connected" % (client['uid']))

#连接后客户端请求下设置uid
def SetPlayerUid(id):

   # print "SetPlayerUid----------",id
   server.clients[len(server.clients)-1]["uid"] = id
   # print server.clients
   
# Called for every client disconnecting
def client_left(client, server):

   # print("Client(%d) disconnected" % client['uid'])
   logger.info("Client(%d) disconnected" % (client['uid']))

  

# Called when a client sends a message
def message_received(client, server, message):

   # print("Client(%d) said: %s" % (client['uid'], message))
   logger.info("message_received(%d) said: %s" % (client['uid'], message))
   message = "Client(%d) said: %s" % (client['uid'], message)
   messagedispatch.message_received(client, server, message)

  


if __name__ == "__main__":
   # t = WsSever(host = "0.0.0.0",port = 9001)
   port = 9001
   day = time.strftime("%Y-%m-%d", time.localtime()) 
   logger = logging.getLogger(__name__)
   logger.setLevel(level = logging.DEBUG)
   handler = logging.FileHandler("{}-{}.txt".format(day,port))
   handler.setLevel(logging.DEBUG)
   formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
   handler.setFormatter(formatter)
   logger.addHandler(handler)

   server = WebsocketServer(host = "0.0.0.0",port = port,loglevel=logging.INFO)
   server.set_fn_new_client(new_client)
   server.set_fn_client_left(client_left)
   server.set_fn_message_received(message_received)
   server.run_forever()


