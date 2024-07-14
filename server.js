// server.js

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files (public directory)
app.use(express.static(path.join(__dirname, 'public')));

// Socket.IO connection
io.on('connection', (socket) => {

    socket.on('sendMessage', (data) => {
        io.emit('messageToStudents', { message: data.message });
    });

    socket.on('bicara', (data) => {
        io.emit('bicaraToStudents', { message: data.message });
    });

    socket.on('tampilkan', (data) => {
        io.emit('tampilkanToStudents', { message: data.message });
    });

    socket.on('hilangkan', (data) => {
        io.emit('hilangkanToStudents', { message: data.message });
    });

    // Handle disconnect
    socket.on('disconnect', () => {
        console.log('Client disconnected: ' + socket.id);
    });
});

// Route for admin page
app.get('/guru', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
