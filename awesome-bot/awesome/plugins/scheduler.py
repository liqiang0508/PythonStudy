from datetime import datetime
import time
import nonebot
import pytz
from aiocqhttp.exceptions import Error as CQHttpError
import getCityWeater

@nonebot.scheduler.scheduled_job('cron', hour='8')
async def _():
	bot = nonebot.get_bot()
	now = datetime.now(pytz.timezone('Asia/Shanghai'))
	try:
		message = getCityWeater.GetWeatherByCode(getCityWeater.GetCityCode(str("成都")))
		await bot.send_group_msg(group_id = 876746591,message = message)#973201419
		# await bot.send_group_msg(group_id = 973201419,message = message)
		await bot.send_private_msg(user_id = 497232807, message= message)
	except CQHttpError:
		pass



@nonebot.scheduler.scheduled_job('cron', hour='0-23')
async def A():
	bot = nonebot.get_bot()
	now = datetime.now(pytz.timezone('Asia/Shanghai'))
	try:
		message = "现在是"+str(time.localtime().tm_hour)+"点整"
		await bot.send_private_msg(user_id = 497232807, message= message)
		await bot.send_group_msg(group_id = 876746591,message = message)
	except CQHttpError:
		pass