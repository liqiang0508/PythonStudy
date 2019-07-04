from __future__ import unicode_literals

from django.db import models


# Create your models here.

class Test(models.Model):
	name = models.CharField(max_length=20)
	age = models.IntegerField()
	time = models.DateField(auto_now=True)
	when = models.DateTimeField()
	# def __unicode__(self):  
	# 	return self.name

