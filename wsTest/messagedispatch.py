
#encoding:utf-8
#!/usr/bin/env python


import WsSever

def message_received(client, server, message):
	print "message_received=============",client['uid'],message
	# server.send_message_to_all(message)
	WsSever.send_to_all(server,message)