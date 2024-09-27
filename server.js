const path = require('path');
const http = require('http');
const express = require('express');
const socetio = require('socket.io');

const app = express();
const server = http.createServer(app)
const io = socetio(server);

//set static folder

app.use(express.static(path.join(__dirname, 'public')));

//run when the client connects
io.on('connection', socket => {
    console.log('New WS Connection');

    //welcome current user
    socket.emit('message', 'welcome to chat');

    //broadcast when user connects
    socket.broadcast.emit('message', 'A user has joined the chat');

    //run when user disconnect
    socket.on('disconnect', () => {
        io.emit('message', 'A user has left the chat');
    })

    //listen to chatMesage
    socket.on('chatMessage', (msg) => {
        io.emit( 'message', msg)
    })

})

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`server running on ${PORT}`));