# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# Create your models here.
import django.utils.timezone as timezone
class Message(models.Model):
    time = models.DateTimeField()
    data = models.TextField()
    
    # def __str__(self):  
    #     return self.time