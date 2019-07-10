"""Hello URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin
from django.conf.urls import include
from django.contrib.auth import urls as auth_urls
# from django.urls import include, path
from . import view,testdb
from django.contrib.auth import urls as auth_urls
# import TestModel
urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^$', view.hello),
    url(r'^testdb$', testdb.testdb),
    url(r'^RexTest/(?P<ID>\d+)$', testdb.RexTest),
    url(r'^upload/$', testdb.upload),
    url(r'TestModel/', include('TestModel.urls')),
    url(r'Message/', include('Message.urls'),name='message1'),
    # url(r'^accounts/', include('users.urls')),
    url(r'^qrcode/', include('QrCode.urls'),name='qrcode'),

]
