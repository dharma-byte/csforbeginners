// server.js
const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 8080 });
console.log("WebSocket server running on ws://localhost:8080");

server.on('connection', socket => {
    console.log('Client connected');

    socket.on('message', message => {
        console.log(`Received: ${message}`);
        socket.send(`Echo: ${message}`);
    });

    socket.on('close', () => console.log('Client disconnected'));
});
