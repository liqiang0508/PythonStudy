#!/usr/bin/python
# -*- coding: UTF-8 -*-
import argparse


parser = argparse.ArgumentParser()
parser.add_argument('-i',help = "douyin player ID")
parser.add_argument('-s',help = "short url")
parser.add_argument('-l',help = "get player like video")
parser.add_argument('-p',help = "get player post video")
parser.add_argument('-v', action='version', version='version 1.0')
#

args = parser.parse_args()
print args
# if "i" in args:
# 	print "iiii"