# import logging

# logging.debug("This is a debug log.")
# logging.info("This is a info log.")
# logging.warning("This is a warning log.")
# logging.error("This is a error log.")
# logging.critical("This is a critical log.")


def add(x,y,call):
	return call(x+y)


print add(1,10,lambda x: x-1)