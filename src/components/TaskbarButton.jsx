import { useState } from 'react'
import { APP_REGISTRY } from '../configurations/apps.js'
import { C, noBorder, raised, sunken } from '../configurations/style.js'
import { SVG_ICONS } from '../configurations/icons.jsx'
import FloatingMenu from './FloatingMenu.jsx'
import { TASKBAR_WINDOW_MENU } from '../configurations/taskbar.js'

export default function TaskbarButton({
  win,
  isFocused,
  onFocus,
  onMinimize,
  onMaximize,
  onClose,
  onRestore,
}) {
  const [ctxMenu, setCtxMenu] = useState(null)
  const app = APP_REGISTRY[win.appId] || {}

  const handleAction = (actionId) => {
    if (actionId === 'tbw_minimize') onMinimize(win.id)
    if (actionId === 'tbw_maximize') onMaximize(win.id)
    if (actionId === 'tbw_restore') onRestore(win.id)
    if (actionId === 'tbw_close') onClose(win.id)
  }

  const handleClick = () => {
    if (win.minimized) {
      onRestore(win.id)
    } else if (isFocused) {
      onMinimize(win.id)
    } else {
      onFocus(win.id)
    }
  }

  return (
    <>
      <button
        onClick={handleClick}
        onContextMenu={(e) => {
          e.preventDefault()
          e.stopPropagation()
          setCtxMenu({ x: e.clientX, y: e.clientY })
        }}
        style={{
          ...noBorder,
          ...(isFocused && !win.minimized ? sunken : raised),
          background: C.silver,
          height: '22px',
          padding: '0 8px',
          maxWidth: '150px',
          minWidth: '80px',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          cursor: 'default',
          outline: 'none',
          fontSize: '11px',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          opacity: win.minimized ? 0.7 : 1,
        }}
      >
        <span
          style={{
            width: '14px',
            height: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          {app.svgId && SVG_ICONS[app.svgId] ? SVG_ICONS[app.svgId] : null}
        </span>
        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {win.title}
        </span>
      </button>

      {ctxMenu && (
        <FloatingMenu
          x={ctxMenu.x}
          y={ctxMenu.y - 130}
          items={TASKBAR_WINDOW_MENU(win.id)}
          onClose={() => setCtxMenu(null)}
          onAction={handleAction}
          zIndex={9999}
        />
      )}
    </>
  )
}
