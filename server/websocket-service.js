const app = require('express')();
const http = require('http').createServer(app);
// const { TeamsList } = require('./team-list');
const io = require('socket.io')(http, {
    cors: { origin: "*" }
});

let players = [];
let playersScores = [

];
let teams = {}; // Object to hold teams and their scores
let userClickCount = 0;

io.on('connection', (socket) => {
    console.log('a player connected');
    // Add the connected player to the list
    // Send the updated list of players to all clients
    socket.on('message', (message) => {
        console.log(message);
        console.log('players connected:', players.length)

        if (message && message.type === 'joinTeam') {
            const { username, team } = message;
            if (!teams[team]) {
                teams[team] = { score: 0, players: [] };
            }
            teams[team].players.push({ socketId: socket.id, username });

            socket.emit('startGame', { msg: "Przekierowanie do lobby", result: 1 });
        }

        // jezeli admin (cockpit)
        if (message && message.type === 'gameStart') {
            const teamId = message.teamId;
            io.emit('gameStart', { msg: "Gra się rozpoczyna", result: 2, teamId: teamId });
        }

        if (message && message.type === 'click' && message.msg === 'gameStart') {
            const team = message.team;
            if (teams[team]) {
                teams[team].score++;

            }
            // wysylamy update tylko cockpit wiec socket a nie io
            io.emit('teamScoreUpdate', teams);
        }

    });

    socket.on('disconnect', (socket) => {
        console.log('a player disconnected');
        // Remove the disconnected player from the team
        for (const team in teams) {
            teams[team].players = teams[team].players.filter(player => player.socketId !== socket.id);
        }
        io.emit('updatePlayers', teams);
    });
});

http.listen(6969, () => console.log('listening on http://localhost:6969') );

// // Zegar
// let timerInterval = null;
// let remainingTime = 30; // Initial time in seconds
//
// function startTimer() {
//     timerInterval = setInterval(() => {
//         remainingTime--;
//
//         if (remainingTime <= 0) {
//             clearInterval(timerInterval);
//             io.emit('timerExpired', { msg: "Czas minął!" });
//         } else {
//             io.emit('timerUpdate', { time: remainingTime });
//         }
//     }, 1000);
// }
//
// function stopTimer() {
//     clearInterval(timerInterval);
//     remainingTime = 30; // Reset the timer
// }
//
// io.on('connection', (socket) => {
//     console.log('a player connected');
//
//     socket.on('message', (message) => {
//         console.log(message);
//
//         if (message && message.type === 'startTimer') {
//             startTimer();
//         } else if (message && message.type === 'stopTimer') {
//             stopTimer();
//         }
//     });
//
//     socket.on('disconnect', () => {
//         console.log('a player disconnected');
//         stopTimer(); // Stop the timer when a player disconnects
//     });
// });