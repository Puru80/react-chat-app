require('dotenv').config();

const express = require('express');
const http = require("http");
const {Server} = require("socket.io");
const PORT = 8080;
const cors = require('cors');

const register = require('./routes/register');
const connectDB = require("./db/connect");

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/v1/users', register);

const server = http.createServer(app);

const socketIO = new Server(server, {
    cors: {
        origin: "*"
    }
});

const users = [];
const messages = [];

socketIO.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);

    socket.emit("initialMessages", messages);

    socket.on("newUser", (data) => {
        data.socketId = socket.id;
        users.push(data);
        socketIO.emit("user list", users);
        socket.emit("initialMessages", messages);
    });

    socket.on('reconnect_user', (data) => {
        data.socketId = socket.id;

        if (users.find(user => user.sessionId === data.sessionId)) {
            return;
        }

        console.log('Reconnect user: ', data)

        users.push(data);
        socketIO.emit("user list", users);
    });

    socket.on('message', (data) => {
        console.log('Message: ', data);
        messages.push(data);
        socketIO.emit('messageResponse', data);
    });

    socket.on("typing", (data) => {

        if (data.isTyping) {
            let user = users.find(user => user.sessionId === data.sessionId);
            console.log('User: ', user)
            socket.broadcast.emit("typingResponse", {userName: user.userName})
        } else {
            socket.broadcast.emit("typingResponse", {userName: ''})
        }

    });

    socket.on('disconnect', () => {
        // users = users.filter(user => user.socketId !== socket.id);

        socketIO.emit("newUserResponse", users.filter(user => user.socketId !== socket.id));

        socket.disconnect();

        console.log(`🔥: ${socket.id} user disconnected`);
    });

});

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        server.listen(PORT, () => {
            console.log(`Server listening on ${PORT}`);
        });
    } catch (error) {
        console.error(error);
    }
}

start();
