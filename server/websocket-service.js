const app = require('express')();
const http = require('http').createServer(app);
const { TeamsList } = require('./team-list');
const io = require('socket.io')(http, {
    cors: { origin: "*" }
});

let players = [];


io.on('connection', (socket) => {
    console.log('a player connected');

    socket.on('message', (message) =>     {
        console.log(message);
        io.emit('message', `${message}`);
    });

    socket.on('disconnect', (socket) => {
        console.log('a player disconnected');
    });
});

http.listen(6969, () => console.log('listening on http://localhost:6969') );