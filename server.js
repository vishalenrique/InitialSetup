var express = require("express");
var http = require("http");
var socketIo = require("socket.io");
var axios = require("axios");
var port = process.env.PORT || 4001;

var index = require("./newIndex");

var app = express();
app.use(index);
var server = http.createServer(app);
var io = socketIo(server); // < Interesting!

io.on("connection", socket => {
    console.log("New client connected"), setInterval(() => getApiAndEmit(socket),3000);
    socket.on("disconnect", () => console.log("Client disconnected"));
  });

var getApiAndEmit = socket => {
      socket.emit("FromAPI", 'Message'); // Emitting a new message. It will be consumed by the client
  };


server.listen(port, () => console.log(`Listening on port ${port}`));


// var express = require('express');
// var http = require('http')
// var socketio = require('socket.io');

// var app = express();
// var server = http.Server(app);
// var websocket = socketio(server);
// server.listen(3000, () => console.log('listening on *:3000'));

// // The event will be called when a client is connected.
// websocket.on('channel1', (message) => {
//     console.log('Data recieved from server', message); //this will console 'channel 2'
//   } );