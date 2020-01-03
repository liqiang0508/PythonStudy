from datetime import date,datetime
from apscheduler.schedulers.blocking import BlockingScheduler
# import wx
sched = BlockingScheduler()

def my_job(text):
    print(text)
    # wx.sendMessageToUser(user_id=497232807, message='你好～')



# 在2009年11月6日执行
sched.add_job(my_job, 'cron', day = "*", hour = "14",minute = "*",second = "1-59", args=['text'])

sched.start()