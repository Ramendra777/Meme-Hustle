import { useState } from 'react'
import { useCyberpunkEffects } from '../hooks/useCyberpunkEffects'

export default function AIVibeAnalysis({ memeId, tags }) {
  const [vibe, setVibe] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { applyGlitch } = useCyberpunkEffects()

  const analyzeVibe = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/memes/${memeId}/vibe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ tags })
      })
      const data = await response.json()
      setVibe(data.vibe)
    } catch (error) {
      console.error('Vibe analysis failed:', error)
      // Fallback vibes
      const fallbackVibes = [
        "NEON NOIR VIBES",
        "SYNTHWAVE DREAMS",
        "CYBERPUNK CHAOS",
        "HACKER MANIFESTO"
      ]
      setVibe(fallbackVibes[Math.floor(Math.random() * fallbackVibes.length)])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="vibe-analysis">
      {vibe ? (
        <div 
          className="vibe-result text-neon-purple text-lg"
          ref={el => el && applyGlitch(el)}
        >
          AI VIBE: {vibe}
        </div>
      ) : (
        <button
          onClick={analyzeVibe}
          disabled={isLoading}
          className="cyberpunk-button small"
        >
          {isLoading ? 'ANALYZING...' : 'GENERATE VIBE ANALYSIS'}
        </button>
      )}
    </div>
  )
}