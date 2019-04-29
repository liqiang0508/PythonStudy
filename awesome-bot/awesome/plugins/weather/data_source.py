
import getCityWeater


async def get_weather_of_city(city: str) -> str:
    # 这里简单返回一个字符串
    # 实际应用中，这里应该调用返回真实数据的天气 API，并拼接成天气预报内容
	print("get_weather_of_city----------------",city)
	if getCityWeater.GetCityCode(city)!=None:
		return f'{city}的天气是:\n'+getCityWeater.GetWeatherByCode(getCityWeater.GetCityCode(str(city)))
	else:
		return "要查询的城市名称不能为空呢，请重新输入"