#!/usr/bin/python
# -*- coding: UTF-8 -*-
import datetime
import sys
import chinese_calendar
import os


def get_countDay(date, name):
    d2 = datetime.datetime(date.year, date.month, date.day)
    d1 = datetime.datetime.now()
    interval = d2 - d1  # 两日期差距
    if interval.days < 0:
        return None
    else:
        return "离{}年{}还剩{}天".format(date.year, name, interval.days)


def get_holidays(year=None, include_weekends=True):
    """
    获取某一年的所有节假日，默认当年
    :param year: which year
    :param include_weekends: False for excluding Saturdays and Sundays
    :return: list
    """
    if not year:
        year = datetime.datetime.now().year
    else:
        year = year
    start = datetime.date(year, 1, 1)
    end = datetime.date(year, 12, 31)
    holidays = chinese_calendar.get_holidays(start, end, include_weekends)
    return holidays


def getValidHoliday(year):
    all_holidays = get_holidays(year, False)
    holiday = {}
    for time in all_holidays:
        is_holiday, english_name = chinese_calendar.get_holiday_detail(time)
        chinses_name = chinese_calendar.Holiday(english_name).chinese
        if chinses_name not in holiday:
            holiday[chinses_name] = time
    num = 0
    resTxt = {}
    resTxt["days"] = []
    resTxt["title"] = "你好，摸鱼人，工作再累，一定不要忘记摸鱼哦 ! 有事没事起身去茶水间去廊道去天台走走，别老在工位上坐着。多喝点水，钱是老板的，但命是自己的!"
    for name in holiday:
        text = get_countDay(holiday[name], name)
        if text:
            resTxt["days"].append(text)
            num = num + 1
    if num==0:
        return getValidHoliday(year+1)
    else:
        return resTxt



# year = datetime.datetime.now().year
# if len(sys.argv) == 2:
#     year = int(sys.argv[1])
# print("你好，摸鱼人，工作再累，一定不要忘记摸鱼哦 ! 有事没事起身去茶水间去廊道去天台走走，别老在工位上坐着。多喝点水，钱是老板的，但命是自己的!\n")
# getValidHoliday(year)
# os.system("pause")
