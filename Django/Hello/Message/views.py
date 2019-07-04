# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.http import HttpResponse
from django.shortcuts import render,render_to_response
from .form import Info,AlbumForm
from Message.models import Message
# Create your views here.

def index(request):
    # return HttpResponse('Messgae-------!')

	
	if request.method == 'POST':
		# time = request.POST["id_time"]
		commitdata = request.POST.get("data")
		

		form_ = Info(request.POST)
		if form_.is_valid():
			# 如果提交数据合法，调用表单的 save 方法将用户数据保存到数据库
			
			isSaved =  request.session.get("saved",False)
			if isSaved==False:#没提交
				# Info.objects.filter(data=commitdata)
				try:#一样的数据有没有
					ret = Message.objects.get(data=commitdata)
					return HttpResponse('already saved')
				except Message.DoesNotExist:
					form_.save()
				
				
					
				request.session["saved"]=True
				return render(request, 'success.html')
			else:
				return HttpResponse('already saved')
			
		else:
			return render(request, 'info.html', context={'form': form_})
			# return HttpResponse('save error')

	form_ = Info()
	request.session["saved"]=False
	return render(request, 'info.html', context={'form': form_})

    # form = AlbumForm()
    # return render(request, 'create_album.html', {'form': form})