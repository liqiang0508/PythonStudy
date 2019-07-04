# from django.urls import path

from . import views
from django.conf.urls import url
app_name = 'QrCode'
urlpatterns = [
    url(r'(.+)', views.index),
]