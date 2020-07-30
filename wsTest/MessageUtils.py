#!/usr/bin/python
# -*- coding: UTF-8 -*-
class MessageUtils:
	
	@classmethod
	def GetInStance(self):
		if not hasattr(MessageUtils, "_instance"):
			MessageUtils._instance = MessageUtils()
		return MessageUtils._instance


   	def SayHello(self):
   		print "Hello"
		
   	def HandleMeaasge(self,msg):
   		pass


MessageUtils.GetInStance().SayHello()