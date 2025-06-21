const express = require('express')
const router = express.Router()
const { createClient } = require('@supabase/supabase-js')
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)

router.get('/', async (req, res) => {
  try {
    const top = parseInt(req.query.top) || 10
    
    const { data, error } = await supabase
      .from('memes')
      .select('*')
      .order('upvotes', { ascending: false })
      .limit(top)

    if (error) throw error

    res.json(data)
  } catch (error) {
    console.error('Leaderboard error:', error)
    res.status(500).json({ error: 'Failed to fetch leaderboard' })
  }
})

module.exports = router