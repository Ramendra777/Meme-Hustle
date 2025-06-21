import { useState, useEffect } from 'react'

const cyberpunkUsers = [
  { id: 'neon_hacker', name: 'Neon Hacker', credits: 5000 },
  { id: 'glitch_witch', name: 'Glitch Witch', credits: 7500 },
  { id: 'synth_samurai', name: 'Synth Samurai', credits: 3000 },
  { id: 'cyberpunk420', name: 'Cyberpunk420', credits: 10000 }
]

export default function useMockAuth() {
  const [currentUser, setCurrentUser] = useState(null)
  const [users, setUsers] = useState(cyberpunkUsers)

  const login = (userId) => {
    const user = users.find(u => u.id === userId)
    if (user) {
      setCurrentUser(user)
      localStorage.setItem('cyberpunkUser', userId)
    }
  }

  const logout = () => {
    setCurrentUser(null)
    localStorage.removeItem('cyberpunkUser')
  }

  const updateCredits = (amount) => {
    if (!currentUser) return
    
    setUsers(prev => prev.map(u => 
      u.id === currentUser.id ? { ...u, credits: u.credits + amount } : u
    ))
    setCurrentUser(prev => ({ ...prev, credits: prev.credits + amount }))
  }

  useEffect(() => {
    const savedUser = localStorage.getItem('cyberpunkUser')
    if (savedUser) {
      login(savedUser)
    } else {
      // Auto-login first user for demo purposes
      login(cyberpunkUsers[0].id)
    }
  }, [])

  return { 
    currentUser, 
    users, 
    login, 
    logout, 
    updateCredits,
    isAuthenticated: !!currentUser 
  }
}