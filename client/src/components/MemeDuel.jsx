import { useEffect, useState } from 'react'
import { useSocket } from '../contexts/SocketContext'

export default function MemeDuel({ meme1, meme2 }) {
  const [votes, setVotes] = useState({ [meme1.id]: 0, [meme2.id]: 0 })
  const [timer, setTimer] = useState(30)
  const [winner, setWinner] = useState(null)
  const socket = useSocket()

  useEffect(() => {
    if (!socket) return

    const voteHandler = (data) => {
      setVotes(prev => ({
        ...prev,
        [data.memeId]: prev[data.memeId] + 1
      }))
    }

    socket.on('duelVote', voteHandler)

    return () => {
      socket.off('duelVote', voteHandler)
    }
  }, [socket])

  useEffect(() => {
    if (timer <= 0) {
      const winningMeme = votes[meme1.id] > votes[meme2.id] ? meme1 : meme2
      setWinner(winningMeme)
      return
    }

    const interval = setInterval(() => {
      setTimer(prev => prev - 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [timer, votes, meme1, meme2])

  const handleVote = (memeId) => {
    socket.emit('duelVote', { memeId })
  }

  return (
    <div className="cyberpunk-duel-container neon-purple-border p-6">
      <h2 className="text-neon-yellow glitch" data-text="MEME DUEL">MEME DUEL</h2>
      
      <div className="duel-timer text-neon-pink text-center text-2xl mb-4">
        {timer > 0 ? `00:${timer.toString().padStart(2, '0')}` : 'DUEL OVER'}
      </div>

      {winner ? (
        <div className="winner-announcement">
          <h3 className="text-neon-green">WINNER:</h3>
          <img src={winner.image_url} alt={winner.title} className="w-full max-h-64 object-contain" />
          <p className="text-neon-pink">{winner.title}</p>
          <p className="text-neon-blue">Votes: {votes[winner.id]}</p>
        </div>
      ) : (
        <div className="duel-memes grid grid-cols-2 gap-4">
          <div 
            className="duel-meme cursor-pointer hover:neon-pink-glow"
            onClick={() => handleVote(meme1.id)}
          >
            <img src={meme1.image_url} alt={meme1.title} className="w-full h-48 object-cover" />
            <div className="vote-count text-neon-green text-center mt-2">
              ↑ {votes[meme1.id]}
            </div>
          </div>
          
          <div 
            className="duel-meme cursor-pointer hover:neon-blue-glow"
            onClick={() => handleVote(meme2.id)}
          >
            <img src={meme2.image_url} alt={meme2.title} className="w-full h-48 object-cover" />
            <div className="vote-count text-neon-green text-center mt-2">
              ↑ {votes[meme2.id]}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}