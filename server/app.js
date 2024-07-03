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
let messages = [];

socketIO.on('connection', (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  socket.emit("initialMessages", messages);

  socket.on("newUser", (data) => {
    users.push(data);
    socketIO.emit("newUserResponse", users);
    socket.emit("initialMessages", messages);
  });

  socket.on('message', (data) => {
    console.log('Data: ', data);
    messages.push(data);
    socketIO.emit('messageResponse', data);
  });

  socket.on("typing", (isTyping) => {

    if(isTyping) {
      let user = users.find(user => user.socketId === socket.id);
      console.log('User: ', user)
      socket.broadcast.emit("typingResponse", {userName: user.userName})
    } else {
        socket.broadcast.emit("typingResponse", {userName: ''})
    }

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