
#encoding:utf-8
#!/usr/bin/env python
from flask import Flask, render_template,request
from flask_socketio import SocketIO
from flask_cors import CORS
import random
async_mode = None
app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
CORS(app, supports_credentials=True, resources=r'/*')
socketio = SocketIO(app)
 
@app.route('/')
def index():
    return render_template('test.html')
 
 # 连接
@socketio.on('connect')
def test_connect():
    print "connect==========",request

#消息
@socketio.on('message')
def handle_message(message):
    print('received message======: ' + message)
    socketio.send({'data': 369})

#断开连接
@socketio.on('disconnect')
def test_disconnect():
    print('Client disconnected')


# @socketio.on('server_response')
# def test_connect1():
#     t = "server_response-data"
#     socketio.emit('server_response',
#                       {'data': t})


 
if __name__ == '__main__':
	socketio.run(app, debug=True,host='0.0.0.0',port=5000)
