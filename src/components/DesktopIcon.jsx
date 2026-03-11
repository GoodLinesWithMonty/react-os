import { APP_REGISTRY } from '../configurations/apps.js'
import { useRef, useState } from 'react'
import { SVG_ICONS } from '../configurations/icons.jsx'
import { C, CONFIG } from '../configurations/style.js'

export default function DesktopIcon({ icon, onDragMove, onDragEnd, onOpen }) {
  const [selected, setSelected] = useState(false)
  const dragging = useRef(false)
  const app = APP_REGISTRY[icon.appId] || {}

  const handleMouseDown = (e) => {
    if (e.button !== 0) return
    e.preventDefault()
    e.stopPropagation()
    const sx = e.clientX,
      sy = e.clientY,
      ox = icon.x,
      oy = icon.y
    dragging.current = false

    const mv = (e2) => {
      dragging.current = true
      onDragMove(icon.id, ox + e2.clientX - sx, oy + e2.clientY - sy)
    }
    const up = (e2) => {
      document.removeEventListener('mousemove', mv)
      document.removeEventListener('mouseup', up)
      if (dragging.current)
        onDragEnd(icon.id, ox + e2.clientX - sx, oy + e2.clientY - sy)
    }
    document.addEventListener('mousemove', mv)
    document.addEventListener('mouseup', up)
  }

  return (
    <div
      style={{
        position: 'absolute',
        left: icon.x,
        top: icon.y,
        width: `${CONFIG.GRID_W - 8}px`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '4px',
        cursor: 'default',
        userSelect: 'none',
        zIndex: selected ? 10 : 1,
      }}
      onMouseDown={handleMouseDown}
      onClick={(e) => {
        e.stopPropagation()
        if (!dragging.current) setSelected((v) => !v)
      }}
      onDoubleClick={(e) => {
        e.stopPropagation()
        onOpen(icon.appId)
      }}
    >
      <div
        style={{
          width: '32px',
          height: '32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: selected ? 0.7 : 1,
          outline: selected ? '1px dotted #fff' : 'none',
          outlineOffset: '2px',
        }}
      >
        {SVG_ICONS[app.svgId]}
      </div>
      <div
        style={{
          fontSize: '11px',
          color: '#fff',
          textAlign: 'center',
          textShadow: selected ? 'none' : '1px 1px 1px #000',
          background: selected ? C.navy : 'transparent',
          padding: '1px 3px',
          lineHeight: '1.2',
          maxWidth: '72px',
          wordBreak: 'break-word',
        }}
      >
        {app.title || icon.appId}
      </div>
    </div>
  )
}
