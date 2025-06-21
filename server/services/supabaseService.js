const { createClient } = require('@supabase/supabase-js')
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)

module.exports = {
  // Memes
  createMeme: async (memeData) => {
    const { data, error } = await supabase
      .from('memes')
      .insert([memeData])
      .select()
    return { data, error }
  },

  getMemeById: async (id) => {
    const { data, error } = await supabase
      .from('memes')
      .select('*')
      .eq('id', id)
      .single()
    return { data, error }
  },

  updateMeme: async (id, updates) => {
    const { data, error } = await supabase
      .from('memes')
      .update(updates)
      .eq('id', id)
      .select()
    return { data, error }
  },

  // Bids
  createBid: async (bidData) => {
    const { data, error } = await supabase
      .from('bids')
      .insert([bidData])
      .select()
    return { data, error }
  },

  getBidsForMeme: async (memeId) => {
    const { data, error } = await supabase
      .from('bids')
      .select('*')
      .eq('meme_id', memeId)
      .order('credits', { ascending: false })
    return { data, error }
  },

  // Leaderboard
  getTopMemes: async (limit = 10) => {
    const { data, error } = await supabase
      .from('memes')
      .select('*')
      .order('upvotes', { ascending: false })
      .limit(limit)
    return { data, error }
  },

  // Tags
  getMemesByTag: async (tag) => {
    const { data, error } = await supabase
      .from('memes')
      .select('*')
      .contains('tags', [tag])
    return { data, error }
  }
}