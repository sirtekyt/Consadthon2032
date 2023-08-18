const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 5000 });

wss.on('connection', (ws) => {
    console.log('Client connected');

    ws.on('message', (message) => {
        console.log(`Received: ${message}`);
        // Echo the received message back to the client
        ws.send(`You sent: ${message}`);
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});