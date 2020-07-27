# -*- coding: UTF-8 -*-
# 单个牌类
class Card:
	_rank= -1#点数   2...9 10 11 12 13 14
	rank = -1#点数   2...9  ABCDE
	suit = -1#花色   0 1 2 3  == 黑 红 方 梅
	def __init__(self,suit,rank):
		self.initData(suit,rank)


	def initData(self,suit,rank):
		self.rank = rank
		self.suit = suit
		self.justpoint()

	def print1(self):
		print("suit=" +str(self.suit)+" rank="+str(self.rank)+" _rank="+str(self._rank))

	def justpoint(self):#计算牌的点数  1..9..10..14

		num =  ord(str(self.rank))
		if num>=48 and num<=57:
			self._rank = num-48
		if num>=65 and num<=69:
			self._rank = num-55

	def initCardWithStr(self,s):
		
		self.initData(s[0],s[1])




b = Card(1,"A")
b.initCardWithStr("19")
b.print1()

# print ord("1"),ord("9"),ord("A"),ord("E")
a = "123B65"


for x in xrange(len(a)/2):
	# print a[x*2],a[x*2+1]
	card  = Card(a[x*2],a[x*2+1])
	card.print1()