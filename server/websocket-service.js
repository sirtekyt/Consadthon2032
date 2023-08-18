const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 5000 });
const { TeamsList } = require('./team-list');

wss.on('connection', (ws) => {
    console.log('Client connected');

    ws.on('message', (message) => {
        try {
            const parsedMessage = JSON.parse(message);
            console.log(message);

            // Echo the received message back to the client
            ws.send(message);

            if (parsedMessage.type === 'joinTeam') {
                TeamsList[parsedMessage.team].push(ws);

                const response = {
                    msg: 'Success',
                    error: false,
                    team: parsedMessage.team,
                };

                ws.send(JSON.stringify(response));
            }

        } catch (e) {
            console.error(e);
        }
    });
let timerInterval;

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

function startTimer() {
    if (!timerInterval) {
        let seconds = 0;

        timerInterval = setInterval(() => {
            seconds++;
            const response = {
                type: 'timerUpdate',
                time: seconds
            };

            broadcastMessage(JSON.stringify(response));
        }, 1000);
    }
}

function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    const response = {
        type: 'timerStopped'
    };
    broadcastMessage(JSON.stringify(response));
}