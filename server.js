require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let data = { message: "Ayo Belajar" };

app.use(express.static('public')); // Menggunakan folder 'public' untuk file statis

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/guru', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'guru.html'));
});

app.get('/config', (req, res) => {
  res.json({ websocketUrl: process.env.WEBSOCKET_URL });
});

wss.on('connection', (ws) => {
  ws.send(JSON.stringify(data));

  ws.on('message', (message) => {
    data = JSON.parse(message);
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(data));
      }
    });
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
