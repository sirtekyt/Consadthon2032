const app = require('express')();
const http = require('http').createServer(app);
const { TeamsList } = require('./team-list');
const io = require('socket.io')(http, {
    cors: { origin: "*" }
});

let players = [];


io.on('connection', (socket) => {
    console.log('a player connected');
    // Add the connected player to the list
    // Send the updated list of players to all clients
    socket.on('message', (message) => {
        console.log(message);
        if (message && message.type === 'joinTeam') {
            players.push({socketId: socket.id, username: message.username, team: message.team});
            io.emit('updatePlayers', players);

            socket.emit('startGame', { msg: "Przekierowanie do lobby", result: 1 });
        }
    });

    socket.on('disconnect', (socket) => {
        console.log('a player disconnected');
        // Remove the disconnected player from the list
        players = players.filter(player => player.socketId !== socket.id);
        // Send the updated list of players to all clients
        io.emit('updatePlayers', players);
    });
});

http.listen(6969, () => console.log('listening on http://localhost:6969') );