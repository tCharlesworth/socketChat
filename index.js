var express = require('express');
var http = require('http');
var socketIO = require('socket.io');

var app = express();
const PORT = 3000;

var server = http.createServer(app);
var io = socketIO(server);


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('User Connected');

  socket.emit('chatMessage', {name: 'Server', msg: 'Welcome to the server!'});

  socket.on('newChatMessage', (chat) => {
    console.log('message received', chat);
    io.emit('chatMessage', chat);
  });

  socket.on('newName', (data) => {
    if(data.name) {
      socket.broadcast.emit('chatMessage', {name: 'Server', msg: `${data.name} has changed their name to ${data.newName}`});
    } else {
      socket.broadcast.emit('chatMessage', {name: 'Server', msg: `Welcome ${data.newName}`});
    }
  });


  socket.on('disconnect', () => {
    console.log('User disconnected');
    socket.broadcast.emit('chatMessage', {name: 'Server', msg: `A user has disconnected.`});
  });
});


server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});