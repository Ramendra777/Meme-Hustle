// CyberpunkMemeForm.jsx
export default function CyberpunkMemeForm({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [tags, setTags] = useState('');

  return (
    <div className="cyberpunk-box neon-pink-border p-6">
      <h2 className="text-neon-pink glitch" data-text="CREATE MEME">CREATE MEME</h2>
      <div className="cyberpunk-input-group">
        <label className="text-neon-blue">TITLE</label>
        <input 
          type="text" 
          className="cyberpunk-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      {/* Other form fields */}
      <button 
        className="cyberpunk-button"
        onClick={() => onSubmit({ title, imageUrl, tags })}
      >
        UPLOAD MEME
      </button>
    </div>
  );
}