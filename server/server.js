const express = require('express');
const cors = require('cors');
const { createServer } = require('http');
const { Server } = require('socket.io');
const memeRoutes = require('./routes/memes'); // Make sure this file exists
const leaderboardRoutes = require('./routes/leaderboard'); // Create if missing

const app = express();
const httpServer = createServer(app);

// Enable JSON parsing
app.use(express.json());

// Enable CORS for frontend
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// Mount routes
app.use('/api/memes', memeRoutes);
app.use('/api/leaderboard', leaderboardRoutes);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('New cyberpunk connected');
  
  socket.on('placeBid', (bidData) => {
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
