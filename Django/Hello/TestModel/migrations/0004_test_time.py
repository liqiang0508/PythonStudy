# -*- coding: utf-8 -*-
# Generated by Django 1.11.14 on 2018-07-25 09:38
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('TestModel', '0003_auto_20180725_1453'),
    ]

    operations = [
        migrations.AddField(
            model_name='test',
            name='time',
            field=models.DateField(auto_now=True),
        ),
    ]