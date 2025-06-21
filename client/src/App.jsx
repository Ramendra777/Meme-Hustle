import { useState } from 'react'
import { SocketProvider } from './contexts/SocketContext'
import CyberpunkBootSequence from './components/CyberpunkBootSequence'
import Marketplace from './pages/Marketplace'
import HackerHUD from './components/HackerHUD'

export default function App() {
  const [bootComplete, setBootComplete] = useState(false)

  return (
    <div className="cyberpunk-bg min-h-screen text-neon-white">
      {!bootComplete ? (
        <CyberpunkBootSequence onComplete={() => setBootComplete(true)} />
      ) : (
        <SocketProvider>
          <HackerHUD />
          <Marketplace />
        </SocketProvider>
      )}
    </div>
  )
}