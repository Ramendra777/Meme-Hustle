const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.json({
    status: 'OPERATIONAL',
    version: '2.4.1',
    subsystems: {
      database: 'ONLINE',
      ai: 'ONLINE',
      websocket: 'ONLINE'
    }
  })
})

module.exports = router