
#encoding:utf-8
#!/usr/bin/env python

# https://github.com/Pithikos/python-websocket-server
# pip install websocket-server
from websocket_server import WebsocketServer

import logging  
import time

class WsSever:

   def new_client(self,client, server):
      # client['id'] = 1000
      print self.server.clients
      print("New client connected and was given id %d" % client['id'])
      server.send_message_to_all("Hey all, a new client has joined us")


   # Called for every client disconnecting
   def client_left(self,client, server):
      print("Client(%d) disconnected" % client['id'])
      self.logger.info("Client(%d) leave" % (client['id']))
     

   # Called when a client sends a message
   def message_received(self,client, server, message):
      if len(message) > 200:
         message = message[:200]+'..'
      print("Client(%d) said: %s" % (client['id'], message))
      self.logger.info("Client(%d) said: %s" % (client['id'], message))
      server.send_message_to_all(message)

   def __init__(self, host,port):

      day = time.strftime("%Y-%m-%d", time.localtime()) 
      self.logger = logging.getLogger(__name__)
      self.logger.setLevel(level = logging.DEBUG)
      handler = logging.FileHandler("{}-{}.txt".format(day,port))
      handler.setLevel(logging.INFO)
      formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
      handler.setFormatter(formatter)
      self.logger.addHandler(handler)

      self.port = port
      self.server = WebsocketServer(port = port,host = host)
      self.server.set_fn_new_client(self.new_client)
      self.server.set_fn_client_left(self.client_left)
      self.server.set_fn_message_received(self.message_received)
      self.server.run_forever()
            
  


if __name__ == "__main__":
   t = WsSever(host = "0.0.0.0",port = 9001)


