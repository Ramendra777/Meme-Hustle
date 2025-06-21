module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('New cyberpunk connected:', socket.id)

    socket.on('placeBid', async (bidData) => {
      try {
        // Save bid to database
        const { data, error } = await supabase
          .from('bids')
          .insert([{
            meme_id: bidData.memeId,
            user_id: bidData.userId,
            credits: bidData.amount
          }])
          .select()

        if (error) throw error

        // Broadcast bid update
        io.emit('bidUpdate', {
          memeId: bidData.memeId,
          amount: bidData.amount,
          user: bidData.userId,
          timestamp: new Date().toISOString()
        })
      } catch (error) {
        console.error('Bid error:', error)
      }
    })

    socket.on('vote', async (voteData) => {
      try {
        // Update vote count in database
        const { data: meme } = await supabase
          .from('memes')
          .select('upvotes')
          .eq('id', voteData.memeId)
          .single()

        const newVotes = voteData.type === 'up' ? meme.upvotes + 1 : meme.upvotes - 1

        await supabase
          .from('memes')
          .update({ upvotes: newVotes })
          .eq('id', voteData.memeId)

        // Broadcast vote update
        io.emit('voteUpdate', {
          memeId: voteData.memeId,
          upvotes: newVotes
        })
      } catch (error) {
        console.error('Vote error:', error)
      }
    })

    socket.on('disconnect', () => {
      console.log('Cyberpunk disconnected:', socket.id)
    })
  })
}