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

// Zegar
let timerInterval = null;
let remainingTime = 30; // Initial time in seconds

function startTimer() {
    timerInterval = setInterval(() => {
        remainingTime--;

        if (remainingTime <= 0) {
            clearInterval(timerInterval);
            io.emit('timerExpired', { msg: "Czas minął!" });
        } else {
            io.emit('timerUpdate', { time: remainingTime });
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
    remainingTime = 30; // Reset the timer
}

io.on('connection', (socket) => {
    console.log('a player connected');

    socket.on('message', (message) => {
        console.log(message);

        if (message && message.type === 'startTimer') {
            startTimer();
        } else if (message && message.type === 'stopTimer') {
            stopTimer();
        }
    });

    socket.on('disconnect', () => {
        console.log('a player disconnected');
        stopTimer(); // Stop the timer when a player disconnects
    });
});