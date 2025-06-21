// server.js
const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*"
  }
});

io.on('connection', (socket) => {
  console.log('New cyberpunk connected');
  
  socket.on('placeBid', (bidData) => {
    // Process bid and broadcast update
    io.emit('bidUpdate', {
      memeId: bidData.memeId,
      amount: bidData.amount,
      user: bidData.userId
    });
  });
  
  socket.on('disconnect', () => {
    console.log('Cyberpunk disconnected');
  });
});

httpServer.listen(3001, () => {
  console.log('Cyberpunk server running on port 3001');
});