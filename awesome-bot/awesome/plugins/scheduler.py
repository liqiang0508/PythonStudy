from datetime import datetime

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
		await bot.send_group_msg(group_id = 876746591,message = message)
		await bot.ssend_private_msg(user_id = 497232807, message= message)
	except CQHttpError:
		pass