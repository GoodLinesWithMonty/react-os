import { useState } from 'react'
import { C, noBorder, raised } from '../configurations/style.js'

export default function TitleButton({ label, title, onClick, danger }) {
  const [hov, setHov] = useState(false)
  return (
    <button
      title={title}
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        ...noBorder,
        ...raised,
        width: '16px',
        height: '14px',
        background: hov && danger ? '#cc0000' : C.silver,
        cursor: 'default',
        fontSize: '9px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        padding: 0,
        color: hov && danger ? C.white : C.black,
      }}
    >
      {label}
    </button>
  )
}
