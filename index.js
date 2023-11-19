const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
  res.sendFile('/index.html');
});

io.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('press', (data) => {
    socket.broadcast.emit('press', data);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

http.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
