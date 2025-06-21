// src/pages/Leaderboard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Leaderboard() {
  const [memes, setMemes] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await axios.get('http://localhost:3001/api/memes/leaderboard?top=10');
        setMemes(res.data);
      } catch (err) {
        console.error('Failed to fetch leaderboard:', err);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-6 text-center neon-glow">🏆 Meme Leaderboard</h1>
      <ul className="space-y-4 max-w-3xl mx-auto">
        {memes.map((meme, index) => (
          <li key={meme.id} className="bg-gradient-to-r from-purple-700 to-pink-600 p-4 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xl font-bold text-yellow-300">#{index + 1}</p>
                <p className="text-lg">{meme.title}</p>
              </div>
              <div className="text-pink-200 text-right">
                <p className="text-sm">🔥 {meme.upvotes} upvotes</p>
                <p className="text-xs italic">{meme.vibe || 'No vibe set'}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
