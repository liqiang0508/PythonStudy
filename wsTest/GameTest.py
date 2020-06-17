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





class PokerGame:
	def __init__(self, roomid):
		self.initData(roomid)

	def initData(self,roomid):
		self.roomid = roomid
		self.playerInfos = {}
		self.pokerData = copy.deepcopy(CardData)
		self.dealCards = {}
		self.bankerCards= ""
		random.shuffle(self.pokerData)
		self.DealCard()

    
	def dealCardToPos(self,index,carNum):
		cards = ""
		for i in range(0,carNum):
			card = self.GetRandCard()
			# cards.append(card)
			cards = cards + card

		return cards


	def GetRandCard(self):
		index = random.randint(0,len(self.pokerData)-1)
		card = self.pokerData.pop(index)
		card = str(card["suit"])+card["rank"]
		return card

	def DealCard(self):
		bankercard = self.dealCardToPos(1002,1)
		self.bankerCards = bankercard
		for i in xrange(4):
			card = self.dealCardToPos(i,1)
			self.dealCards[i] = card
		time.sleep(2)
		self.gameResult()
		

	def player_sit_down(self,seatNum,uid):
		playerdata = {"uid":uid}
		self.playerInfos[seatNum] = playerdata

	def gameResult(self):
		for i in self.dealCards:
			cards = self.dealCards[i]
			cards = self.str2rank(cards)
			rank = cards[0]["rank"]

			banerrank = self.str2rank(self.bankerCards)[0]["rank"]
			print banerrank ,rank

			if ord(banerrank)>ord(rank):
				print "庄家>",i
			elif ord(banerrank)<ord(rank):
				print "庄家<",i
			else:
				print "庄家==",i

		time.sleep(2)
		print "**********"
		print self.bankerCards

		print self.dealCards
		print "**********"
		self.initData(self.roomid)

	def str2rank(self,str_):
		cards = []
		length = len(str_)
		for i in xrange(length/2):
			cards.append({"suit":str_[2*i],"rank":str_[2*i+1]})
		return cards


p = PokerGame(200)
# p.DealCard()
# p.gameResult()

# print "********"
# # # print p.str2rank("2B")
# print p.bankerCards

# print p.dealCards

# a = "36492B3948"

# print len(a)/2

# for i in xrange(len(a)/2):

# 	print  i, a[2*i],a[2*i+1]


# print ord("0"),ord("9")

# print ord("A"),ord("E")
