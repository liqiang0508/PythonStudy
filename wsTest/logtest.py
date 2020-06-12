# import logging

# logging.debug("This is a debug log.")
# logging.info("This is a info log.")
# logging.warning("This is a warning log.")
# logging.error("This is a error log.")
# logging.critical("This is a critical log.")

# import WsSever 
import os
def add(x,y,call):
	return call(x+y)


os.system("WsSever.py")

print add(1,10,lambda x: x-1)


os.system('pause')