# -*- coding: utf-8 -*-
# Generated by Django 1.11.14 on 2018-07-25 09:55
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('TestModel', '0006_auto_20180725_1754'),
    ]

    operations = [
        migrations.AlterField(
            model_name='test',
            name='timestr',
            field=models.DateTimeField(),
        ),
    ]
