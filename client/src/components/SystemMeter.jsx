export default function SystemMeter({ label, value, max = 100 }) {
  return (
    <div className="system-meter">
      <div className="meter-header">
        <span className="label">{label}</span>
        <span className="value">{value}%</span>
      </div>
      <div className="meter-bar">
        <div 
          className="fill" 
          style={{ width: `${(value/max)*100}%` }}
        ></div>
      </div>
    </div>
  )
}