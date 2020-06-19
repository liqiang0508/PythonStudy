# import logging

# logging.debug("This is a debug log.")
# logging.info("This is a info log.")
# logging.warning("This is a warning log.")
# logging.error("This is a error log.")
# logging.critical("This is a critical log.")

# import WsSever 
import os
import threading,time
import json

def func(a):
    print time.time(),"Hello Timer!",a

print int(time.time())
s = threading.Timer(2,func,("test222",))
s.start()
print time.time()


def add(x,y,call):
	return call(x+y)

a = 6
del a
# os.system("WsSever.py")

print add(1,10,lambda x: x-1)

data = {"name":"lee","age":27}
print json.dumps(data)

print type(dict()),type({})
os.system('pause')