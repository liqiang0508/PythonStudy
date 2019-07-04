# -*- coding: utf-8 -*-
import django.utils.timezone as timezone
from django import forms
from django.contrib.admin import widgets
# from django.contrib.postgres.forms.ranges import DateRangeField, RangeWidget
import datetime

from Message.models import Message

BIRTH_YEAR_CHOICES = ('1980', '1981', '1982')

class Info(forms.ModelForm):
    time = forms.SplitDateTimeField(widget=widgets.AdminSplitDateTime()) 
    data = forms.CharField(widget=forms.Textarea( attrs={'rows': 10,
                                  'cols': 80,
                                  }))#输入控件
    # def clean_time(self):
    # 	return self.cleaned_data[time]

    class Meta:
        model = Message
        fields = ( 'data','time',)
    # q = forms.DateTimeField(widget=forms.DateTimeInput())

    # name = forms.CharField(label='Your name')
    # url = forms.URLField(initial='Your website')
    # comment = forms.CharField(initial='Your comment')
    # day = forms.DateField(initial=datetime.date.today)
    # captcha_answer = forms.IntegerField(label='2 + 2', label_suffix=' =')

    # CHOICES = (('1', 'First',), ('2', 'Second',))
    # choice_field = forms.ChoiceField(widget=forms.RadioSelect, choices=CHOICES)

    # DAY = forms.DateField(widget=widgets.AdminDateWidget)
    # DAY1 = forms.DateField(widget=widgets.AdminTimeWidget)
    # date_range = DateRangeField(widget=RangeWidget(AdminDateWidget()))
    # DAY2 = forms.DateField(widget=widgets.AdminSplitDateTime())
   

class AlbumForm(forms.Form):
	releasedate = forms.DateField(widget=widgets.AdminSplitDateTime())

    # class Meta:
    #     model = Album
    #     fields = ['artist', 'releasedate']
 
