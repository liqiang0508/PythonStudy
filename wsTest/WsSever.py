#encoding:utf-8
#!/usr/bin/env python

# https://github.com/Pithikos/python-websocket-server
# pip install websocket-server
from websocket_server import WebsocketServer

import logging  
import time
import gamelogic

class WsSever:

   def __init__(self, host,port,connectCall,leftCall,messageCall):
     
     
      day = time.strftime("%Y-%m-%d", time.localtime()) 
      self.logger = logging.getLogger(__name__)
      self.logger.setLevel(level = logging.DEBUG)
      handler = logging.FileHandler("{}-{}.txt".format(day,port))
      handler.setLevel(logging.DEBUG)
      formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
      handler.setFormatter(formatter)
      self.logger.addHandler(handler)

      self.Server = WebsocketServer(host = host,port = port,loglevel=logging.INFO)
      self.Server.set_fn_new_client(connectCall)
      self.Server.set_fn_client_left(leftCall)
      self.Server.set_fn_message_received(messageCall)
      
     
   def startRun(self):
      self.Server.run_forever()

   def GetServer(self):
      return self.Server
  
     




