import { useState } from 'react'
import { C, raised } from '../configurations/style.js'
import { SVG_ICONS } from '../configurations/icons.jsx'

export default function MenuItem({ item, depth = 0, onClose, onAction }) {
  const [hov, setHov] = useState(false)
  const hasChildren = item.children?.length > 0
  const isSep = item.id?.startsWith('sep') || item.id === 'separator'

  if (isSep)
    return (
      <div
        style={{
          height: '1px',
          background: C.sep,
          margin: '3px 4px',
          borderBottom: `1px solid ${C.white}`,
        }}
      />
    )

  return (
    <div
      style={{ position: 'relative' }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '3px 6px 3px 4px',
          cursor: 'default',
          userSelect: 'none',
          fontSize: '12px',
          whiteSpace: 'nowrap',
          minWidth: '160px',
          color: hov ? C.menuHoverText : C.black,
          background: hov ? C.menuHover : 'transparent',
        }}
        onClick={() => {
          if (!hasChildren) {
            onAction?.(item.id, item.appId, item.url)
            onClose?.()
          }
        }}
      >
        <span
          style={{
            width: '16px',
            height: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          {SVG_ICONS[item.svgId]}
        </span>
        <span style={{ flex: 1 }}>{item.label}</span>
        {hasChildren && <span style={{ fontSize: '9px' }}>▶</span>}
      </div>
      {hasChildren && hov && (
        <div
          style={{
            position: 'absolute',
            top: '-2px',
            left: '100%',
            background: C.silver,
            ...raised,
            zIndex: 1000 + depth,
            padding: '2px 0',
          }}
        >
          {item.children.map((c) => (
            <MenuItem
              key={c.id}
              item={c}
              depth={depth + 1}
              onClose={onClose}
              onAction={onAction}
            />
          ))}
        </div>
      )}
    </div>
  )
}
