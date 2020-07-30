#!/usr/bin/python
# -*- coding: UTF-8 -*-

import random
import threading
import time
import copy



CardData = [
		{"suit":0,"rank":"2"},
		{"suit":0,"rank":"3"},
		{"suit":0,"rank":"4"},
		{"suit":0,"rank":"5"},
		{"suit":0,"rank":"6"},
		{"suit":0,"rank":"7"},
		{"suit":0,"rank":"8"},
		{"suit":0,"rank":"9"},
		{"suit":0,"rank":"A"},#10
		{"suit":0,"rank":"B"},#j
		{"suit":0,"rank":"C"},#Q
		{"suit":0,"rank":"D"},#K
		{"suit":0,"rank":"E"},#A

		{"suit":1,"rank":"2"},
		{"suit":1,"rank":"3"},
		{"suit":1,"rank":"4"},
		{"suit":1,"rank":"5"},
		{"suit":1,"rank":"6"},
		{"suit":1,"rank":"7"},
		{"suit":1,"rank":"8"},
		{"suit":1,"rank":"9"},
		{"suit":1,"rank":"A"},#10
		{"suit":1,"rank":"B"},#j
		{"suit":1,"rank":"C"},#Q
		{"suit":1,"rank":"D"},#K
		{"suit":1,"rank":"E"},#A

		{"suit":2,"rank":"2"},
		{"suit":2,"rank":"3"},
		{"suit":2,"rank":"4"},
		{"suit":2,"rank":"5"},
		{"suit":2,"rank":"6"},
		{"suit":2,"rank":"7"},
		{"suit":2,"rank":"8"},
		{"suit":2,"rank":"9"},
		{"suit":2,"rank":"A"},#10
		{"suit":2,"rank":"B"},#j
		{"suit":2,"rank":"C"},#Q
		{"suit":2,"rank":"D"},#K
		{"suit":2,"rank":"E"},#A

		{"suit":3,"rank":"2"},
		{"suit":3,"rank":"3"},
		{"suit":3,"rank":"4"},
		{"suit":3,"rank":"5"},
		{"suit":3,"rank":"6"},
		{"suit":3,"rank":"7"},
		{"suit":3,"rank":"8"},
		{"suit":3,"rank":"9"},
		{"suit":3,"rank":"A"},#10
		{"suit":3,"rank":"B"},#j
		{"suit":3,"rank":"C"},#Q
		{"suit":3,"rank":"D"},#K
		{"suit":3,"rank":"E"},#A
]


from enum import Enum
class Vip(Enum):
    MONDAY = 0
    TUESDAY = 1
    WEDNESDAY = 2
    THURSDAY = 3
    FRIDAY = 4
    SATURDAY = 5
    SUNDAY = 6


class PokerGame:
	def __init__(self, roomid):
		self.roomid = roomid
		self.initData(roomid)

	def initData(self,roomid):
		print("开始新一局")
		
		self.playerInfos = {}
		self.pokerData = copy.deepcopy(CardData)
		self.dealCards = {}
		self.bankerCards= ""
		self.State = 0;
		random.shuffle(self.pokerData)  #随机打乱顺序

		self.DealCard()


    
	def dealCardToPos(self,index,carNum):
		cards = ""
		for i in range(0,carNum):
			card = self.GetRandCard()
			cards = cards + card

		return cards


	def GetRandCard(self):
		index = random.randint(0,len(self.pokerData)-1)
		card = self.pokerData.pop(index)
		card = str(card["suit"])+card["rank"]
		return card

	def DealCard(self):
		print("发牌")
		bankercard = self.dealCardToPos(1002,1)
		self.bankerCards = bankercard
		for i in xrange(4):
			card = self.dealCardToPos(i,1)
			self.dealCards[i] = card

		s = threading.Timer(2,self.gameResult,())
		s.start()

	def player_sit_down(self,seatNum,uid):
		playerdata = {"uid":uid}
		self.playerInfos[seatNum] = playerdata

	def gameResult(self):
		print("结算")
		for i in self.dealCards:
			cards = self.dealCards[i]
			cards = self.str2rank(cards)
			rank = cards[0]["rank"]

			banerrank = self.str2rank(self.bankerCards)[0]["rank"]
			# print banerrank ,rank

			if ord(banerrank)>ord(rank):
				print "庄家>",i
			elif ord(banerrank)<ord(rank):
				print "庄家<",i
			else:
				print "庄家==",i

		s = threading.Timer(4,self.initData,(self.roomid,))
		s.start()



	def str2rank(self,str_):
		cards = []
		length = len(str_)
		for i in xrange(length/2):
			cards.append({"suit":str_[2*i],"rank":str_[2*i+1]})
		return cards



		
	def setServer(self,s):
		self.server = s



	@staticmethod
	def LOL(a):
		print a


# p = PokerGame(444)


