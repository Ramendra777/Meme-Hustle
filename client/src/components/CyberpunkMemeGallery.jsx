// CyberpunkMemeGallery.jsx
export default function CyberpunkMemeGallery({ memes }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {memes.map(meme => (
        <div key={meme.id} className="cyberpunk-card hover:glitch">
          <img src={meme.imageUrl} alt={meme.title} className="w-full h-48 object-cover" />
          <div className="p-4">
            <h3 className="text-neon-pink">{meme.title}</h3>
            <div className="flex justify-between items-center mt-2">
              <span className="text-neon-blue">↑ {meme.upvotes}</span>
              <BidButton memeId={meme.id} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}