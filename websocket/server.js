const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 3000 });
console.log("WebSocket server started at ws://localhost:3000");

server.on('connection', socket => {
    console.log("Client connected");

    let count = 1;
    const interval = setInterval(() => {
        if (count <= 200) {
            socket.send(count.toString());
            console.log("Sent:", count);
            count++;
        } else {
            clearInterval(interval);
            socket.send("Done!");
            socket.close();
        }
    }, 1000); // 1000 ms = 1 second

    socket.on('close', () => {
        console.log("Client disconnected");
        clearInterval(interval); // Cleanup if client disconnects early
    });
});
