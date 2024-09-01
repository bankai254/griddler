const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const ROWS = 50;
const COLS = 80;

let gridState = new Array(ROWS * COLS).fill(false);

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('A user connected: ' + socket.id);

    // Send the current grid state to the new client
    socket.emit('initialState', gridState);

    // Handle cell toggle events
    socket.on('toggleCell', (index) => {
        gridState[index] = !gridState[index];
        socket.broadcast.emit('cellToggled', { index, state: gridState[index] });
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});