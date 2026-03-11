import { useState, useCallback } from 'react'
import { DESKTOP_ICONS } from './configurations/desktop.js'
import { C, CONFIG } from './configurations/style.js'
import { APP_REGISTRY } from './configurations/apps.js'
import { snapToGrid } from './utils/grid.js'
import FloatingMenu from './components/FloatingMenu.jsx'
import AppWindow from './components/AppWindow.jsx'
import DesktopIcon from './components/DesktopIcon.jsx'
import Taskbar from './components/Taskbar.jsx'
import { buildDesktopCtxItems } from './utils/desktopCtxMenu.js'

let _zTop = 100

function nextZ() {
  return ++_zTop
}

export default function ReactOS() {
  const [icons, setIcons] = useState(DESKTOP_ICONS)
  const [snapActive, setSnapActive] = useState(true)
  const [desktopCtx, setDesktopCtx] = useState(null)
  const [windows, setWindows] = useState([])
  const [focusedId, setFocusedId] = useState(null)

  const clampIcon = (x, y) => ({
    x: Math.max(0, Math.min(x, window.innerWidth - CONFIG.GRID_W)),
    y: Math.max(
      0,
      Math.min(y, window.innerHeight - CONFIG.TASKBAR_H - CONFIG.GRID_H)
    ),
  })

  const handleDragMove = useCallback((id, nx, ny) => {
    const { x, y } = clampIcon(nx, ny)
    setIcons((prev) => prev.map((ic) => (ic.id === id ? { ...ic, x, y } : ic)))
  }, [])

  const handleDragEnd = useCallback(
    (id, nx, ny) => {
      const { x, y } = clampIcon(nx, ny)
      const final = snapActive ? snapToGrid(x, y) : { x, y }
      setIcons((prev) =>
        prev.map((ic) => (ic.id === id ? { ...ic, ...final } : ic))
      )
    },
    [snapActive]
  )

  const handleDesktopCtxAction = useCallback((actionId) => {
    if (actionId === 'snap_grid') {
      setSnapActive((prev) => {
        if (!prev)
          setIcons((ics) =>
            ics.map((ic) => ({ ...ic, ...snapToGrid(ic.x, ic.y) }))
          )
        return !prev
      })
    }
    if (actionId === 'by_name') {
      setIcons((prev) =>
        [...prev]
          .sort((a, b) => {
            const ta = APP_REGISTRY[a.appId]?.title || ''
            const tb = APP_REGISTRY[b.appId]?.title || ''
            return ta.localeCompare(tb)
          })
          .map((ic, i) => ({
            ...ic,
            x: CONFIG.GRID_PAD_X,
            y: CONFIG.GRID_PAD_Y + i * CONFIG.GRID_H,
          }))
      )
    }
  }, [])

  const launchApp = useCallback(
    (appId) => {
      const app = APP_REGISTRY[appId]
      if (!app) return

      if (app.url) {
        window.open(app.url, '_blank')
        return
      }

      const existing = windows.find((w) => w.appId === appId)
      if (existing) {
        setWindows((prev) =>
          prev.map((w) =>
            w.id === existing.id ? { ...w, minimized: false, z: nextZ() } : w
          )
        )
        setFocusedId(existing.id)
        return
      }

      const id = `win_${appId}_${Date.now()}`
      const cx = Math.max(
        40,
        (window.innerWidth - app.defaultW) / 2 + Math.random() * 40 - 20
      )
      const cy = Math.max(
        40,
        (window.innerHeight - app.defaultH - CONFIG.TASKBAR_H) / 2 +
          Math.random() * 40 -
          20
      )
      const newWin = {
        id,
        appId,
        title: app.title,
        x: cx,
        y: cy,
        w: app.defaultW,
        h: app.defaultH,
        minimized: false,
        maximized: false,
        z: nextZ(),
      }
      setWindows((prev) => [...prev, newWin])
      setFocusedId(id)
    },
    [windows]
  )

  const winActions = {
    focus: useCallback((id) => {
      setFocusedId(id)
      setWindows((prev) =>
        prev.map((w) =>
          w.id === id ? { ...w, minimized: false, z: nextZ() } : w
        )
      )
    }, []),

    minimize: useCallback((id) => {
      setWindows((prev) =>
        prev.map((w) => (w.id === id ? { ...w, minimized: true } : w))
      )
      setFocusedId((prev) => (prev === id ? null : prev))
    }, []),

    maximize: useCallback((id) => {
      setWindows((prev) =>
        prev.map((w) =>
          w.id === id ? { ...w, maximized: !w.maximized, z: nextZ() } : w
        )
      )
      setFocusedId(id)
    }, []),

    restore: useCallback((id) => {
      setWindows((prev) =>
        prev.map((w) =>
          w.id === id
            ? { ...w, minimized: false, maximized: false, z: nextZ() }
            : w
        )
      )
      setFocusedId(id)
    }, []),

    close: useCallback((id) => {
      setWindows((prev) => prev.filter((w) => w.id !== id))
      setFocusedId((prev) => (prev === id ? null : prev))
    }, []),

    move: useCallback((id, x, y) => {
      setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, x, y } : w)))
    }, []),

    resize: useCallback((id, nw, nh) => {
      setWindows((prev) =>
        prev.map((w) => (w.id === id ? { ...w, w: nw, h: nh } : w))
      )
    }, []),
  }

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        background: C.bg,
        overflow: 'hidden',
        position: 'relative',
        backgroundImage:
          'radial-gradient(circle, rgba(0,0,0,0.15) 1px, transparent 1px)',
        backgroundSize: '8px 8px',
      }}
      onContextMenu={(e) => {
        e.preventDefault()
        setDesktopCtx({ x: e.clientX, y: e.clientY })
      }}
      onClick={() => setDesktopCtx(null)}
    >
      {icons.map((icon) => (
        <DesktopIcon
          key={icon.id}
          icon={icon}
          onDragMove={handleDragMove}
          onDragEnd={handleDragEnd}
          onOpen={launchApp}
        />
      ))}

      {[...windows]
        .sort((a, b) => a.z - b.z)
        .map((win) => (
          <AppWindow
            key={win.id}
            win={win}
            isFocused={win.id === focusedId}
            onFocus={winActions.focus}
            onMove={winActions.move}
            onResize={winActions.resize}
            onMinimize={winActions.minimize}
            onMaximize={winActions.maximize}
            onClose={winActions.close}
          />
        ))}

      {desktopCtx && (
        <FloatingMenu
          x={desktopCtx.x}
          y={desktopCtx.y}
          items={buildDesktopCtxItems(snapActive)}
          onClose={() => setDesktopCtx(null)}
          onAction={handleDesktopCtxAction}
          zIndex={4000}
        />
      )}

      <Taskbar
        windows={windows}
        focusedId={focusedId}
        winActions={winActions}
        onLaunchApp={launchApp}
      />
    </div>
  )
}
