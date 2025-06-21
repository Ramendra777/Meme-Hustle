import { useState, useEffect } from 'react'
import { useSocket } from '../contexts/SocketContext'
import useMockAuth from '../hooks/useMockAuth'
import CyberpunkMemeForm from '../components/CyberpunkMemeForm'
import CyberpunkMemeGallery from '../components/CyberpunkMemeGallery'
import Leaderboard from '../components/Leaderboard'
import AIVibeAnalysis from '../components/AIVibeAnalysis'
import MemeDuel from '../components/MemeDuel'

export default function Marketplace() {
  const { currentUser } = useMockAuth()
  const [memes, setMemes] = useState([])
  const [showDuel, setShowDuel] = useState(false)
  const socket = useSocket()

  useEffect(() => {
    const fetchMemes = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/memes`)
        const data = await response.json()
        setMemes(data)
      } catch (error) {
        console.error('Failed to fetch memes:', error)
        // Fallback data
        setMemes([
          {
            id: 1,
            title: 'Doge HODL',
            image_url: 'https://picsum.photos/400/300?random=1',
            tags: ['crypto', 'doge'],
            upvotes: 69,
            caption: 'TO THE MOON!'
          },
          {
            id: 2,
            title: 'Neon Stonks',
            image_url: 'https://picsum.photos/400/300?random=2',
            tags: ['stonks', 'moon'],
            upvotes: 42,
            caption: 'BRRR BRRR BRRR'
          }
        ])
      }
    }

    fetchMemes()

    if (socket) {
      socket.on('bidUpdate', handleBidUpdate)
      socket.on('voteUpdate', handleVoteUpdate)
    }

    return () => {
      if (socket) {
        socket.off('bidUpdate', handleBidUpdate)
        socket.off('voteUpdate', handleVoteUpdate)
      }
    }
  }, [socket])

  const handleBidUpdate = (update) => {
    setMemes(prev => prev.map(meme => 
      meme.id === update.memeId 
        ? { ...meme, currentBid: update.amount } 
        : meme
    ))
  }

  const handleVoteUpdate = (update) => {
    setMemes(prev => prev.map(meme => 
      meme.id === update.memeId 
        ? { ...meme, upvotes: update.upvotes } 
        : meme
    ))
  }

  const handleCreateMeme = async (memeData) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/memes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...memeData,
          owner_id: currentUser.id
        })
      })
      const newMeme = await response.json()
      setMemes(prev => [newMeme, ...prev])
    } catch (error) {
      console.error('Failed to create meme:', error)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-neon-pink text-3xl glitch" data-text="MEMEHUSTLE">MEMEHUSTLE</h1>
            <button 
              onClick={() => setShowDuel(!showDuel)}
              className="cyberpunk-button yellow"
            >
              {showDuel ? 'BACK TO MARKET' : 'START MEME DUEL'}
            </button>
          </div>

          {showDuel ? (
            <MemeDuel 
              meme1={memes[0]} 
              meme2={memes[1]} 
            />
          ) : (
            <>
              <CyberpunkMemeForm onSubmit={handleCreateMeme} />
              <CyberpunkMemeGallery memes={memes} />
            </>
          )}
        </div>

        <div className="space-y-8">
          <div className="cyberpunk-terminal p-4">
            <h3 className="text-neon-green mb-2">USER STATS</h3>
            <p className="text-neon-blue">CREDITS: {currentUser?.credits}</p>
            <p className="text-neon-purple">MEMES: {memes.filter(m => m.owner_id === currentUser?.id).length}</p>
          </div>

          <Leaderboard />

          <div className="cyberpunk-box p-4">
            <h3 className="text-neon-yellow mb-2">AI VIBE ANALYZER</h3>
            <AIVibeAnalysis 
              memeId={memes[0]?.id} 
              tags={memes[0]?.tags} 
            />
          </div>
        </div>
      </div>
    </div>
  )
}