require('dotenv').config()
const { createServer } = require('http')
const { Server } = require('socket.io')
const app = require('./app')

const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:5173'
  }
})

// Socket.IO setup
require('./services/socketService')(io)

const PORT = process.env.PORT || 3001
httpServer.listen(PORT, () => {
  console.log(`Cyberpunk server running on port ${PORT}`)
})