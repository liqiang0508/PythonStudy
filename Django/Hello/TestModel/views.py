from django.shortcuts import render
from django.http import HttpResponse
# Create your views here.

def index(request,year):
	
	# if request.session.get('has_commented', False):
	# 	return HttpResponse("You've already commented.")

	# request.session['has_commented'] = True
	# return HttpResponse('Thanks for your comment!')

	if request.session.get('loginTime', 0)>0:
		print "time--",request.session["loginTime"]
		request.session["loginTime"] = request.session["loginTime"]+1
		return HttpResponse("already login."+year+"loginTime="+str(request.session["loginTime"]))

	request.session["loginTime"] = 1
	return HttpResponse("first login."+year+"loginTime="+str(request.session["loginTime"]))
