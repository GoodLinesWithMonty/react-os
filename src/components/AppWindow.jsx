import { APP_REGISTRY } from '../configurations/apps.js'
import { C, CONFIG, raised, sunken } from '../configurations/style.js'
import { SVG_ICONS } from '../configurations/icons.jsx'
import AppContent from './AppContent.jsx'
import TitleButton from './TitleButton.jsx'

export default function AppWindow({
  win,
  isFocused,
  onFocus,
  onMove,
  onResize,
  onMinimize,
  onMaximize,
  onClose,
}) {
  const app = APP_REGISTRY[win.appId] || {}

  // Title-Bar Drag
  const handleTitleMouseDown = (e) => {
    if (e.button !== 0 || win.maximized) return
    e.preventDefault()
    onFocus(win.id)
    const startX = e.clientX - win.x
    const startY = e.clientY - win.y

    const onMove_ = (e2) => {
      const nx = Math.max(
        0,
        Math.min(e2.clientX - startX, window.innerWidth - win.w)
      )
      const ny = Math.max(
        0,
        Math.min(
          e2.clientY - startY,
          window.innerHeight - CONFIG.TASKBAR_H - CONFIG.WIN_TITLEBAR_H
        )
      )
      onMove(win.id, nx, ny)
    }
    const onUp = () => {
      document.removeEventListener('mousemove', onMove_)
      document.removeEventListener('mouseup', onUp)
    }
    document.addEventListener('mousemove', onMove_)
    document.addEventListener('mouseup', onUp)
  }

  // Resize (bottom-right corner)
  const handleResizeMouseDown = (e) => {
    if (e.button !== 0 || win.maximized) return
    e.preventDefault()
    e.stopPropagation()
    const startX = e.clientX
    const startY = e.clientY
    const startW = win.w
    const startH = win.h

    const onR = (e2) => {
      const nw = Math.max(200, startW + e2.clientX - startX)
      const nh = Math.max(120, startH + e2.clientY - startY)
      onResize(win.id, nw, nh)
    }
    const onUp = () => {
      document.removeEventListener('mousemove', onR)
      document.removeEventListener('mouseup', onUp)
    }
    document.addEventListener('mousemove', onR)
    document.addEventListener('mouseup', onUp)
  }

  if (win.minimized) return null

  const isMax = win.maximized
  const style = isMax
    ? {
        position: 'fixed',
        left: 0,
        top: 0,
        width: '100vw',
        height: `calc(100vh - ${CONFIG.TASKBAR_H}px)`,
        zIndex: win.z,
      }
    : {
        position: 'fixed',
        left: win.x,
        top: win.y,
        width: win.w,
        height: win.h,
        zIndex: win.z,
      }

  const titleBg = isFocused ? C.titleActive : C.titleInactive
  const titleText = isFocused ? C.titleActiveText : C.titleInactiveText

  return (
    <div
      style={{
        ...style,
        background: C.silver,
        ...raised,
        display: 'flex',
        flexDirection: 'column',
      }}
      onMouseDown={() => onFocus(win.id)}
    >
      <div
        onMouseDown={handleTitleMouseDown}
        style={{
          height: `${CONFIG.WIN_TITLEBAR_H}px`,
          background: titleBg,
          display: 'flex',
          alignItems: 'center',
          padding: '0 3px',
          gap: '4px',
          cursor: isMax ? 'default' : 'move',
          userSelect: 'none',
          flexShrink: 0,
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
        <span
          style={{
            flex: 1,
            color: titleText,
            fontSize: '12px',
            fontWeight: 'bold',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
          }}
        >
          {win.title}
        </span>
        <TitleButton
          label="─"
          title="Minimieren"
          onClick={(e) => {
            e.stopPropagation()
            onMinimize(win.id)
          }}
        />
        <TitleButton
          label={isMax ? '❐' : '□'}
          title={isMax ? 'Wiederherstellen' : 'Maximieren'}
          onClick={(e) => {
            e.stopPropagation()
            onMaximize(win.id)
          }}
        />
        <TitleButton
          label="✕"
          title="Schließen"
          onClick={(e) => {
            e.stopPropagation()
            onClose(win.id)
          }}
          danger
        />
      </div>

      <div
        style={{
          height: '18px',
          background: C.silver,
          borderBottom: `1px solid ${C.dark}`,
          display: 'flex',
          alignItems: 'center',
          padding: '0 4px',
          gap: '12px',
          fontSize: '12px',
          flexShrink: 0,
        }}
      >
        {['Datei', 'Bearbeiten', 'Ansicht', 'Hilfe'].map((m) => (
          <span
            key={m}
            style={{ padding: '0 3px', cursor: 'default' }}
            onMouseEnter={(e) => {
              e.target.style.background = C.menuHover
              e.target.style.color = C.white
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'transparent'
              e.target.style.color = C.black
            }}
          >
            {m}
          </span>
        ))}
      </div>

      <div
        style={{ flex: 1, overflow: 'auto', background: C.white, ...sunken }}
      >
        <AppContent appId={win.appId} />
      </div>

      <div
        style={{
          height: '18px',
          background: C.silver,
          ...sunken,
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          padding: '0 6px',
          fontSize: '11px',
          color: C.dark,
        }}
      >
        Bereit
      </div>

      {!isMax && (
        <div
          onMouseDown={handleResizeMouseDown}
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: '14px',
            height: '14px',
            cursor: 'se-resize',
            background: `linear-gradient(135deg, transparent 50%, ${C.dark} 50%)`,
          }}
        />
      )}
    </div>
  )
}
