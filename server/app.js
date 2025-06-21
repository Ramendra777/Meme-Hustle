const express = require('express')
const cors = require('cors')
const routes = require('./routes')

const app = express()

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173'
}))
app.use(express.json())

// Routes
app.use('/api', routes)

module.exports = app