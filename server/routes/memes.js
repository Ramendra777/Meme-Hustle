// server/routes/memes.js
const express = require('express');
const router = express.Router();
const { generateCaptionAndVibe } = require('../utils/geminiClient'); // import this at top

const { supabase } = require('../utils/supabaseClient');

// POST /memes - Create a meme
router.post('/', async (req, res) => {
  const { title, image_url, tags } = req.body;
  const finalImageUrl = image_url || 'https://picsum.photos/200';

  const { data, error } = await supabase.from('memes').insert([
    { title, image_url: finalImageUrl, tags, upvotes: 0, caption: '', vibe: '', owner_id: 'cyberpunk420' }
  ]);

  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data);
});

// POST /memes/:id/bid - Place a bid
router.post('/:id/bid', async (req, res) => {
  const meme_id = req.params.id;
  const { credits } = req.body;
  const user_id = 'cyberpunk420';

  const { data, error } = await supabase.from('bids').insert([{ meme_id, user_id, credits }]);
  if (error) return res.status(500).json({ error: error.message });

  req.app.get('io').emit('bidUpdate', { meme_id, credits, user_id });
  res.status(200).json({ success: true });
});

// POST /memes/:id/vote - Upvote or downvote
router.post('/:id/vote', async (req, res) => {
  const meme_id = req.params.id;
  const { type } = req.body;
  const delta = type === 'up' ? 1 : -1;

  const { error } = await supabase.rpc('increment_upvotes', { meme_id_input: meme_id, delta });
  if (error) return res.status(500).json({ error: error.message });

  req.app.get('io').emit('voteUpdate', { meme_id, delta });
  res.status(200).json({ success: true });
});

// POST /memes/:id/caption - AI caption & vibe
router.post('/:id/caption', async (req, res) => {
  const meme_id = req.params.id;
  const { tags } = req.body;

  const { caption, vibe } = await generateCaptionAndVibe(tags);

  const { error } = await supabase
    .from('memes')
    .update({ caption, vibe })
    .eq('id', meme_id);

  if (error) return res.status(500).json({ error: error.message });
  res.json({ caption, vibe });
});


// GET /leaderboard - Top memes by upvotes
router.get('/leaderboard', async (req, res) => {
  const top = parseInt(req.query.top) || 10;

  const { data, error } = await supabase
    .from('memes')
    .select('*')
    .order('upvotes', { ascending: false })
    .limit(top);

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

module.exports = router;
