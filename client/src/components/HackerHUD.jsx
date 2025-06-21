// HackerHUD.jsx
import { useState } from 'react';

export default function HackerHUD() {
  const [stats, setStats] = useState({
    usersOnline: Math.floor(Math.random() * 1000),
    memesTraded: Math.floor(Math.random() * 5000),
    creditsCirculating: Math.floor(Math.random() * 1000000)
  });
  
  return (
    <div className="fixed top-0 left-0 right-0 cyberpunk-hud p-4">
      <div className="flex justify-between">
        <div className="hud-stat">
          <span className="text-neon-blue">USERS ONLINE</span>
          <span className="text-neon-pink">{stats.usersOnline}</span>
        </div>
        <div className="hud-stat">
          <span className="text-neon-blue">MEMES TRADED</span>
          <span className="text-neon-pink">{stats.memesTraded}</span>
        </div>
        <div className="hud-stat">
          <span className="text-neon-blue">CREDITS CIRCULATING</span>
          <span className="text-neon-pink">{stats.creditsCirculating}</span>
        </div>
      </div>
    </div>
  );
}