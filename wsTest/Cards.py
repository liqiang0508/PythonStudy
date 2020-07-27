# -*- coding: UTF-8 -*-
# 一副牌的管理
import random
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

class Cards:
	cards =[]#一副牌的数据
	removeCards = []#移除的的牌的数据

	def __init__(self):
		self.cards = copy.deepcopy(CardData)
		random.shuffle(self.cards)

	def dealCard(self,cardnum):#发几张牌
		cards = ""
		for i in range(0,cardnum):
			card = self.GetRandCard()
			cards = cards + card

		return cards

	def GetRandCard(self):#随机拿一张牌
		index = random.randint(0,len(self.cards)-1)
		card = self.cards.pop(index)
		card = str(card["suit"])+card["rank"]
		self.removeCards.append(card)
		return card

	def preNext(self):#准备下一把的数据 把移除的数据加回去
		self.cards = self.cards + self.removeCards
		self.removeCards = []

b = Cards()
print b.dealCard(5)
print len(b.cards),len(b.removeCards)
b.preNext()
print len(b.cards),len(b.removeCards)