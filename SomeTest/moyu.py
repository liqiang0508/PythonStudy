import datetime
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


b = get_holidays(2022, False)
days = {}
for i in b:
    on_holiday, english_name = chinese_calendar.get_holiday_detail(i)
    holiday_name = chinese_calendar.Holiday(english_name).chinese  # 劳动节
    # print(i,on_holiday,holiday_name)
    if holiday_name not in days:
        days[holiday_name] = i

print("你好，摸鱼人，工作再累，一定不要忘记摸鱼哦 ! 有事没事起身去茶水间去廊道去天台走走，别老在工位上坐着。多喝点水，钱是老板的，但命是自己的!\n")
for i in days:
    b = get_countDay(days[i], i)
    if b:
        print(b)

os.system("pause")
