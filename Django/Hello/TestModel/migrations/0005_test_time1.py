# -*- coding: utf-8 -*-
# Generated by Django 1.11.14 on 2018-07-25 09:52
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('TestModel', '0004_test_time'),
    ]

    operations = [
        migrations.AddField(
            model_name='test',
            name='time1',
            field=models.DateTimeField(auto_now=True),
        ),
    ]