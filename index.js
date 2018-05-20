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
});


server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});