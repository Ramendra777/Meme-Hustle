export default function CyberpunkError({ message, onRetry }) {
  return (
    <div className="cyberpunk-error neon-red-border p-4 mb-4">
      <div className="flex justify-between items-center">
        <div className="text-neon-red flex items-center">
          <span className="mr-2">⚠️</span>
          {message}
        </div>
        {onRetry && (
          <button 
            onClick={onRetry}
            className="cyberpunk-button small red"
          >
            RETRY
          </button>
        )}
      </div>
    </div>
  )
}