module.exports = {
  theme: {
    extend: {
      colors: {
        'neon-pink': '#ff00ff',
        'neon-blue': '#00f0ff',
        'neon-purple': '#9d00ff',
        'neon-yellow': '#fff01f',
        'cyber-dark': '#0a0a12',
      },
      animation: {
        'glitch': 'glitch 1s linear infinite',
        'pulse-neon': 'pulse-neon 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        glitch: {
          '0%': { textShadow: '0.05em 0 0 #ff00ff, -0.05em -0.025em 0 #00f0ff' },
          '14%': { textShadow: '0.05em 0 0 #ff00ff, -0.05em -0.025em 0 #00f0ff' },
          '15%': { textShadow: '-0.05em -0.025em 0 #ff00ff, 0.025em 0.025em 0 #00f0ff' },
          '49%': { textShadow: '-0.05em -0.025em 0 #ff00ff, 0.025em 0.025em 0 #00f0ff' },
          '50%': { textShadow: '0.025em 0.05em 0 #ff00ff, 0.05em 0 0 #00f0ff, 0 -0.05em 0 #9d00ff' },
          '99%': { textShadow: '0.025em 0.05em 0 #ff00ff, 0.05em 0 0 #00f0ff, 0 -0.05em 0 #9d00ff' },
          '100%': { textShadow: '-0.025em 0 0 #ff00ff, -0.025em -0.025em 0 #00f0ff' },
        },
        'pulse-neon': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5', boxShadow: '0 0 10px #ff00ff' },
        }
      }
    }
  }
}