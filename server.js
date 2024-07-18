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
        io.emit('bicaraToStudents');
    });

    socket.on('tampilkan', (data) => {
        io.emit('tampilkanToStudents');
    });

    socket.on('hilangkan', (data) => {
        io.emit('hilangkanToStudents');
    });
    socket.on('tambah', (data) => {
        io.emit('tambah');
    });

    socket.on('kurang', (data) => {
        io.emit('kurang');
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

app.get('/b1', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'baca1.html'));
});

app.get('/b2', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'baca2.html'));
});

app.get('/b3', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'baca3.html'));
});

app.get('/m1', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'm1.html'));
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
