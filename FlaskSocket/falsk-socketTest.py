from flask import Flask, render_template
from flask_socketio import SocketIO, emit
from flask import request

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

@app.route('/')
def index():
    return render_template('index.html')


@socketio.on('connect')
def test_connect():
	sid =  request.sid
	print('-------test_connect------'+sid)
    # emit('my response', {'data': 'Connected'})

@socketio.on('disconnect')
def test_disconnect():
    print('Client disconnected')

@socketio.on('message')
def handle_message(message):
    print('received message: ' + message)

@socketio.on('btn')
def handle_btn(message):
	sid = request.sid
	print('------handle_btn:'+ message+":")

@socketio.on('json')
def handle_json(json):
    print('handle_json: ' + str(json))

@socketio.on('my event')
def handle_my_custom_event(json):
	sid =  request.sid
	print('----handle_my_custom_event-------: ' + str(json))

if __name__ == '__main__':
    socketio.run(app)