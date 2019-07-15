import nonebot

bot = nonebot.get_bot()
info = await bot.send_private_msg(user_id = 497232807, message= "hello")
print(info)