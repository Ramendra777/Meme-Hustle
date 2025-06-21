const { generateMemeCaption, generateVibeAnalysis } = require('../services/geminiService')
const supabase = require('../services/supabaseService')

module.exports = {
  createMeme: async (req, res) => {
    try {
      const { title, image_url, tags } = req.body
      
      // Create basic meme
      const { data: meme, error } = await supabase.createMeme({
        title,
        image_url: image_url || 'https://picsum.photos/400/300?grayscale',
        tags: Array.isArray(tags) ? tags : tags.split(',').map(t => t.trim()),
        upvotes: 0,
        owner_id: req.user?.id || 'anonymous'
      })

      if (error) throw error

      // Generate AI caption
      const caption = await generateMemeCaption(meme.tags)
      await supabase.updateMeme(meme.id, { caption })

      res.json({ ...meme, caption })
    } catch (error) {
      console.error('Meme creation error:', error)
      res.status(500).json({ error: 'Failed to create meme' })
    }
  },

  getMeme: async (req, res) => {
    try {
      const { id } = req.params
      const { data: meme, error } = await supabase.getMemeById(id)

      if (error) throw error
      if (!meme) return res.status(404).json({ error: 'Meme not found' })

      res.json(meme)
    } catch (error) {
      console.error('Meme fetch error:', error)
      res.status(500).json({ error: 'Failed to fetch meme' })
    }
  },

  generateCaption: async (req, res) => {
    try {
      const { id } = req.params
      const { data: meme, error } = await supabase.getMemeById(id)

      if (error) throw error
      if (!meme) return res.status(404).json({ error: 'Meme not found' })

      const caption = await generateMemeCaption(meme.tags)
      await supabase.updateMeme(id, { caption })

      res.json({ caption })
    } catch (error) {
      console.error('Caption generation error:', error)
      res.status(500).json({ error: 'Failed to generate caption' })
    }
  },

  generateVibe: async (req, res) => {
    try {
      const { id } = req.params
      const { tags } = req.body

      const { data: meme, error } = await supabase.getMemeById(id)
      if (error) throw error
      if (!meme) return res.status(404).json({ error: 'Meme not found' })

      const vibe = await generateVibeAnalysis(tags || meme.tags)
      await supabase.updateMeme(id, { vibe })

      res.json({ vibe })
    } catch (error) {
      console.error('Vibe analysis error:', error)
      res.status(500).json({ error: 'Failed to analyze vibe' })
    }
  }
}