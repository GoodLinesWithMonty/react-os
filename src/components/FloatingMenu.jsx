import { useEffect, useRef } from 'react'
import { C, CONFIG, raised } from '../configurations/style.js'
import MenuItem from './MenuItem.jsx'

export default function FloatingMenu({
  x,
  y,
  items,
  onClose,
  onAction,
  maxW = 200,
  zIndex = 3000,
}) {
  const ref = useRef(null)

  useEffect(() => {
    const h = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose()
    }
    setTimeout(() => document.addEventListener('mousedown', h), 0)
    return () => document.removeEventListener('mousedown', h)
  }, [onClose])

  const safeX = Math.min(x, window.innerWidth - maxW - 4)
  const safeY = Math.min(y, window.innerHeight - CONFIG.TASKBAR_H - 180)

  return (
    <div
      ref={ref}
      style={{
        position: 'fixed',
        left: safeX,
        top: safeY,
        background: C.silver,
        ...raised,
        zIndex,
        padding: '2px 0',
        minWidth: `${maxW}px`,
      }}
    >
      {items.map((item) => (
        <MenuItem
          key={item.id}
          item={item}
          onClose={onClose}
          onAction={onAction}
        />
      ))}
    </div>
  )
}
