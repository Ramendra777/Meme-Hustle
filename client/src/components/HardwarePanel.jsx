// client/src/components/HardwarePanel.jsx
export default function HardwarePanel() {
  return (
    <div className="cyberpunk-hardware-panel neon-blue-border p-4">
      <div className="panel-row flex justify-between">
        <span className="text-neon-green">SYSTEM STATUS</span>
        <span className="text-neon-pink">[ONLINE]</span>
      </div>
      <div className="panel-row flex justify-between">
        <span className="text-neon-green">MEME PROTOCOL</span>
        <span className="text-neon-pink">v2.4.1</span>
      </div>
      <div className="meter mt-2">
        <div className="meter-bar" style={{ width: '78%' }}></div>
      </div>
    </div>
  )
}