import { useEffect, useState } from 'react'
import { sunken } from '../configurations/style.js'

export default function Clock() {
  const [now, setNow] = useState(new Date())
  const [showDate, setShowDate] = useState(false)
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])
  const pad = (n) => String(n).padStart(2, '0')
  const days = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa']
  const months = [
    'Jan',
    'Feb',
    'Mär',
    'Apr',
    'Mai',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Okt',
    'Nov',
    'Dez',
  ]
  const timeStr = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`
  const dateStr = `${days[now.getDay()]}, ${pad(now.getDate())}. ${months[now.getMonth()]} ${now.getFullYear()}`
  return (
    <div
      style={{
        ...sunken,
        padding: '2px 8px',
        fontSize: '12px',
        cursor: 'default',
        userSelect: 'none',
        whiteSpace: 'nowrap',
        textAlign: 'center',
      }}
      onClick={() => setShowDate((v) => !v)}
      title="Klicken für Datum"
    >
      {showDate ? dateStr : timeStr}
    </div>
  )
}
