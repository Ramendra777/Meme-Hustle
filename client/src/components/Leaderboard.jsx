import { useEffect, useState } from 'react'
import { useCyberpunkEffects } from '../hooks/useCyberpunkEffects'

export default function Leaderboard() {
  const [topMemes, setTopMemes] = useState([])
  const { applyGlitch } = useCyberpunkEffects()

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/leaderboard?top=10`)
        const data = await response.json()
        setTopMemes(data)
      } catch (error) {
        console.error('Failed to fetch leaderboard:', error)
        // Fallback data
        setTopMemes([
          { id: 1, title: 'Doge HODL', upvotes: 420, image_url: 'https://picsum.photos/200?random=1' },
          { id: 2, title: 'Neon Stonks', upvotes: 350, image_url: 'https://picsum.photos/200?random=2' }
        ])
      }
    }

    fetchLeaderboard()
  }, [])

  return (
    <div className="cyberpunk-leaderboard neon-blue-border p-6">
      <h2 
        className="text-neon-pink mb-4 text-2xl" 
        ref={el => el && applyGlitch(el)}
      >
        TRENDING MEMES
      </h2>
      
      <div className="leaderboard-grid">
        {topMemes.map((meme, index) => (
          <div key={meme.id} className="leaderboard-item">
            <div className="rank text-neon-yellow">#{index + 1}</div>
            <img 
              src={meme.image_url} 
              alt={meme.title} 
              className="meme-thumbnail"
            />
            <div className="meme-info">
              <h3 className="text-neon-blue">{meme.title}</h3>
              <div className="upvotes text-neon-green">
                ↑ {meme.upvotes} VIBES
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}