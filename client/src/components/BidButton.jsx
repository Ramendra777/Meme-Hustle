// BidButton.jsx
export default function BidButton({ memeId }) {
  const [bidAmount, setBidAmount] = useState(100);
  const [showBidInput, setShowBidInput] = useState(false);
  
  const handleBid = () => {
    // Send bid via WebSocket
    socket.emit('placeBid', { memeId, amount: bidAmount, userId: 'cyberpunk420' });
    setShowBidInput(false);
  };

  return (
    <div className="relative">
      <button 
        className="cyberpunk-button yellow"
        onClick={() => setShowBidInput(!showBidInput)}
      >
        BID
      </button>
      
      {showBidInput && (
        <div className="cyberpunk-popup absolute right-0 bottom-full mb-2">
          <input 
            type="number" 
            value={bidAmount}
            onChange={(e) => setBidAmount(e.target.value)}
            className="cyberpunk-input small"
          />
          <button 
            className="cyberpunk-button small"
            onClick={handleBid}
          >
            CONFIRM
          </button>
        </div>
      )}
    </div>
  );
}