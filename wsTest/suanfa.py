#!/usr/bin/python
# -*- coding: UTF-8 -*-
# import logging

# logging.debug("This is a debug log.")
# logging.info("This is a info log.")
# logging.warning("This is a warning log.")
# logging.error("This is a error log.")
# logging.critical("This is a critical log.")

# import WsSever 
import os
def add(x,y,call):
	return call(x+y)


# os.system("WsSever.py")

# print add(1,10,lambda x: x-1)

A = [ [1,1,1,0],
	  [0,0,1,0],
	  [0,0,1,0],
	  [0,0,1,1]

	 ]

print "A-",A[3][2]
temp = []
B = []

def find(arr,x,y,vaule):
	if {"x":x,"y":y} in B:
		return
	else:
		B.append({"x":x,"y":y})

	if(len(arr)-1<x):
		print "X 1超出范围",x,y
		return
		
	if(x<0):
		print "X 2超出范围",x,y
		return
	if(len(arr[0])-1<y):
		print "Y 1超出范围",x,y
		return
	if(y<0):
		print "Y 2超出范围",x,y
		return

	if arr[x][y] == vaule:
		temp.append({"x":x,"y":y})


		find(arr,x,y+1,vaule)#右
		find(arr,x,y-1,vaule)#左

		find(arr,x+1,y,vaule)#上
		find(arr,x+1,y-1,vaule)
		find(arr,x+1,y+1,vaule)

		find(arr,x-1,y,vaule) #下
		find(arr,x-1,y-1,vaule)
		find(arr,x-1,y+1,vaule)

	

	

find(A,0,0,A[0][0])


# for i in xrange(len(A)):
# 	for j in xrange(len(A[0])):
# 		find(A,i,j,1)

print temp
os.system('pause')