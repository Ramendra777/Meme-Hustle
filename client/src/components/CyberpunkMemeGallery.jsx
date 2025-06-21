// CyberpunkMemeGallery.jsx
import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';
import BidButton from '../components/BidButton';

const socket = io('http://localhost:3001'); // Adjust if deployed

export default function CyberpunkMemeGallery({ memes: initialMemes }) {
  const [memes, setMemes] = useState(initialMemes);

  useEffect(() => {
    socket.on('bidUpdate', ({ meme_id, credits, user_id }) => {
      setMemes((prevMemes) =>
        prevMemes.map((meme) =>
          meme.id === meme_id
            ? { ...meme, latestBid: `${user_id} bid ${credits} credits!` }
            : meme
        )
      );
    });

    socket.on('voteUpdate', ({ meme_id, delta }) => {
      setMemes((prevMemes) =>
        prevMemes.map((meme) =>
          meme.id === meme_id
            ? { ...meme, upvotes: meme.upvotes + delta }
            : meme
        )
      );
    });

    return () => {
      socket.off('bidUpdate');
      socket.off('voteUpdate');
    };
  }, []);

  const handleGenerateAI = async (meme) => {
    try {
      const res = await axios.post(`http://localhost:3001/api/memes/${meme.id}/caption`, {
        tags: meme.tags || [],
      });
      const updated = res.data;
      setMemes((prev) =>
        prev.map((m) => (m.id === meme.id ? { ...m, ...updated } : m))
      );
    } catch (err) {
      console.error('AI caption failed:', err);
    }
  };

  const handleVote = async (memeId, type) => {
    try {
      await axios.post(`http://localhost:3001/api/memes/${memeId}/vote`, { type });
    } catch (err) {
      console.error('Vote failed:', err);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {memes.map((meme) => (
        <div key={meme.id} className="cyberpunk-card hover:glitch">
          <img src={meme.image_url} alt={meme.title} className="w-full h-48 object-cover" />
          <div className="p-4">
            <h3 className="text-neon-pink">{meme.title}</h3>
            <p className="text-sm text-green-400 mt-1">
              {meme.latestBid || 'No bids yet'}
            </p>
            <div className="flex justify-between items-center mt-2">
              <span className="text-neon-blue">↑ {meme.upvotes}</span>
              <BidButton memeId={meme.id} />
            </div>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => handleVote(meme.id, 'up')}
                className="bg-green-700 hover:bg-green-800 text-white px-2 py-1 text-xs rounded"
              >
                Upvote
              </button>
              <button
                onClick={() => handleVote(meme.id, 'down')}
                className="bg-red-700 hover:bg-red-800 text-white px-2 py-1 text-xs rounded"
              >
                Downvote
              </button>
            </div>
            <button
              onClick={() => handleGenerateAI(meme)}
              className="mt-2 px-2 py-1 bg-blue-700 text-white text-xs rounded hover:bg-blue-800"
            >
              Generate Caption
            </button>
            <p className="text-yellow-300 text-xs mt-1 italic">
              Caption: {meme.caption || 'No caption yet'}
            </p>
            <p className="text-blue-300 text-xs italic">
              Vibe: {meme.vibe || 'No vibe yet'}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}