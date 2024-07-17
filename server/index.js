const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');

const {addUser,removeUser,getUser,getUsersInRoom}=require('./users.js')
const router = require('./router');

const PORT = process.env.PORT || 5000;
const app = express();
const server = http.createServer(app);

// Configure CORS middleware for Express app
app.use(cors());
// Route for socket.io or any other routes
app.use(router);
const io = socketio(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    // console.log("We have a new connection!!!")
    socket.on('joins', ({ name, room },callback) => {
        // console.log(name, room);
        const {error,user}=addUser({id:socket.id,name,room});

        if(error){
            return callback(error);
        }
        socket.emit('message',{user:'admin',text:`${user.name}, welcome to the room ${user.room}`});

        // broadcast sends message to everyone in the room not only a specific user
        socket.broadcast.to(user.room).emit('message',{user:'admin',text:`${user.name}, has joined!`})
        socket.join(user.room);  // user is now inside a room

        io.to(user.room).emit('roomData',{room:user.room,users:getUsersInRoom(user.room)});
        callback();
    });

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);
        if (!user) {
            // Handle the case when user is undefined
            return callback('User not found');
        }
        io.to(user.room).emit('message', { user: user.name, text: message });
        io.to(user.room).emit('roomData', { room:user.room ,users:getUsersInRoom(user.room) });
        callback();
    });
    
    socket.on('disconnect', () => {
        const user=removeUser(socket.id);
        if(user){
            io.to(user.room).emit('message',{user:'admin',text:`${user.name}, has left!`})
        }
    });
});

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));
