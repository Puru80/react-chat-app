const express = require('express');
const http = require("http");
const { Server } = require("socket.io");
const PORT = 8080;

const app = express();

const server = http.createServer(app);

const socketIO = new Server(server, {
  cors: {
    origin: "*"
  }
});

let users = [];

socketIO.on('connection', (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  socket.on("newUser", (data) => {
    users.push(data);
    socketIO.emit("newUserResponse", users);
  });

  socket.on('message', (data) => {
    console.log('Data: ', data);
    socketIO.emit('messageResponse', data);
  });

  socket.on("typing", (data) => {
    if(data.socketId === undefined) {
      console.log('Typing But Undefined: ', data)
      return;
    }

    console.log('Typing: ', data)
    let user = users.find(user => user.socketId === data.socketId);
    console.log('User: ', user)
    socket.broadcast.emit("typingResponse", {userName: user.userName});
  });

  socket.on('disconnect', () => {
    users = users.filter(user => user.socketId !== socket.id);
    socketIO.emit("newUserResponse", users);

    socket.disconnect();

    console.log(`🔥: ${socket.id} user disconnected`);
  });

});

app.get("/api", (req, res) => {
  res.json({
    message: "Hello world",
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});