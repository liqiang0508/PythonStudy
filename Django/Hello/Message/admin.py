# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin

# Register your models here.

from Message.models import Message

class Messageadmin(admin.ModelAdmin):
    list_display = ( 'data','time')
admin.site.register(Message,Messageadmin)