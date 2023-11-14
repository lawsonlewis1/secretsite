from flask import Flask, render_template
from flask_socketio import SocketIO

app = Flask(__name__)
app.config["SECRET_KEY"] = "your-secret-key"
socketio = SocketIO(app)


@app.route("/")
def index():
    return render_template("index.html")


@socketio.on("connect")
def handle_connect():
    print("Client connected")

@socketio.on('press')
def press(data):
    socketio.emit('press', data, include_self=False)


@socketio.on("disconnect")
def handle_disconnect():
    print("Client disconnected")


if __name__ == "__main__":
    socketio.run(app)
