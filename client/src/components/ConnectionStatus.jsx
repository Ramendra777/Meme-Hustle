import { useEffect, useState } from 'react'

export default function ConnectionStatus() {
  const [status, setStatus] = useState('CHECKING...')
  const [ping, setPing] = useState(0)

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const start = Date.now()
        const res = await fetch(`${import.meta.env.VITE_API_URL}/health`)
        const data = await res.json()
        setPing(Date.now() - start)
        setStatus(data.status === 'OPERATIONAL' ? 'SYNCED' : 'DEGRADED')
      } catch {
        setStatus('OFFLINE')
      }
    }

    checkHealth()
    const interval = setInterval(checkHealth, 30000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className={`connection-status ${status.toLowerCase()}`}>
      <span className="label">NETWORK:</span>
      <span className="value">{status}</span>
      {status !== 'OFFLINE' && (
        <span className="ping">{ping}ms</span>
      )}
    </div>
  )
}