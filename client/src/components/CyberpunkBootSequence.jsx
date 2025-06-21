// CyberpunkBootSequence.jsx
export default function CyberpunkBootSequence({ onComplete }) {
  const [text, setText] = useState('');
  const lines = [
    "> INITIALIZING MEMEHUSTLE OS 2.0",
    "> LOADING NEON PROTOCOLS...",
    "> SYNTHWAVE DRIVERS ACTIVE",
    "> CONNECTING TO CYBERSPACE...",
    "> WELCOME TO THE MEME MATRIX"
  ];
  
  useEffect(() => {
    let currentLine = 0;
    let currentChar = 0;
    const interval = setInterval(() => {
      if (currentLine < lines.length) {
        if (currentChar <= lines[currentLine].length) {
          setText(lines.slice(0, currentLine).join('\n') + '\n' + 
                 lines[currentLine].slice(0, currentChar));
          currentChar++;
        } else {
          currentLine++;
          currentChar = 0;
        }
      } else {
        clearInterval(interval);
        onComplete();
      }
    }, 50);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="cyberpunk-terminal">
      <pre className="text-neon-green font-mono">{text}</pre>
      <div className="cursor-blink">_</div>
    </div>
  );
}