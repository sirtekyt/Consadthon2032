const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 5000 });

const teams = {
    A: [],
    B: [],
    C: [],
}

wss.on('connection', (ws) => {
    console.log('Client connected');

    ws.on('message', (message) => {
        try {
            const parsedMessage = JSON.parse(message);

            // Echo the received message back to the client
            ws.send(message);

            if (parsedMessage.type === 'joinTeam') {
                teams[parsedMessage.team].push(ws);

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


    ws.on('close', () => {
        console.log('Client disconnected');
    });
});