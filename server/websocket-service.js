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
        socket.emit('startGame', 'Hello from server!');
        if (message && message.type === 'joinTeam') {
            socket.emit('startGame', {msg: "Przekierowanie do lobby", result: 1});
        }
    });

    socket.on('disconnect', (socket) => {
        console.log('a player disconnected');
    });
});

http.listen(6969, () => console.log('listening on http://localhost:6969') );