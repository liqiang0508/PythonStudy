from django.http import HttpResponse
from django.shortcuts import render
from django.core.mail import send_mail
def hello(request):
    # send_mail('Subject here', 'Here is the message.', '497232807@qq.com',
    # ['497232807@qq.com'], fail_silently=False)
    # return HttpResponse("Hello django ! ")
    context          = {}
    context['hello'] = 'Hello World!'
    return render(request, 'hello.html', context)