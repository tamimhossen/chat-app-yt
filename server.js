const path = require('path');
const http = require('http');
const express = require('express');
const socetio = require('socket.io');
const formateMessages = require('./utils/messages.js')
const botName = 'Chat Bot'

const app = express();
const server = http.createServer(app)
const io = socetio(server);

//set static folder

app.use(express.static(path.join(__dirname, 'public')));

//run when the client connects
io.on('connection', socket => {
    //welcome current user
    socket.emit('message', formateMessages(botName,'welcome to chat'));

    //broadcast when user connects
    socket.broadcast.emit('message', formateMessages(botName, 'A user has joined the chat'));

    //run when user disconnect
    socket.on('disconnect', () => {
        io.emit('message', formateMessages(botName, 'A user has left the chat'));
    })

    //listen to chatMesage
    socket.on('chatMessage', (msg) => {
        io.emit( 'message', formateMessages('USER', msg))
    })

})

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`server running on ${PORT}`));