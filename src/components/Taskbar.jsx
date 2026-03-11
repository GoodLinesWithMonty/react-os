import { useEffect, useRef, useState } from 'react'
import { C, CONFIG, noBorder, raised, sunken } from '../configurations/style.js'
import { SVG_ICONS } from '../configurations/icons.jsx'
import { START_MENU_ITEMS } from '../configurations/startMenu.js'
import MenuItem from './MenuItem.jsx'
import TaskbarButton from './TaskbarButton.jsx'
import ShutdownDialog from './ShutdownDialog.jsx'
import Clock from './Clock.jsx'

export default function Taskbar({
  windows,
  focusedId,
  winActions,
  onLaunchApp,
}) {
  const [startOpen, setStartOpen] = useState(false)
  const [shutdownOpen, setShutdownOpen] = useState(false)
  const startRef = useRef(null)

  useEffect(() => {
    const h = (e) => {
      if (startRef.current && !startRef.current.contains(e.target))
        setStartOpen(false)
    }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])

  const handleStartAction = (actionId, appId) => {
    if (actionId === 'shutdown') {
      setStartOpen(false)
      setShutdownOpen(true)
      return
    }
    if (appId) onLaunchApp(appId)
  }

  return (
    <>
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          height: `${CONFIG.TASKBAR_H}px`,
          background: C.silver,
          borderTop: `2px solid ${C.white}`,
          display: 'flex',
          alignItems: 'center',
          padding: '0 4px',
          gap: '4px',
          zIndex: 5000,
        }}
      >
        {/* Start Button */}
        <div ref={startRef} style={{ position: 'relative' }}>
          <button
            onClick={() => setStartOpen((v) => !v)}
            style={{
              ...noBorder,
              ...(startOpen ? sunken : raised),
              background: C.silver,
              height: '24px',
              padding: '0 10px',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              cursor: 'default',
              outline: 'none',
              fontWeight: 'bold',
              fontSize: '12px',
            }}
          >
            <span
              style={{
                width: '16px',
                height: '16px',
                display: 'flex',
                flexShrink: 0,
              }}
            >
              {SVG_ICONS['reactos_logo']}
            </span>
            Start
          </button>

          {startOpen && (
            <div
              style={{
                position: 'absolute',
                bottom: '100%',
                left: 0,
                background: C.silver,
                ...raised,
                zIndex: 6000,
                padding: '2px 0',
                display: 'flex',
              }}
            >
              {/* Seitliche Leiste */}
              <div
                style={{
                  width: '20px',
                  background: C.navy,
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                  padding: '4px 0',
                }}
              >
                <span
                  style={{
                    color: C.white,
                    fontSize: '11px',
                    fontWeight: 'bold',
                    writingMode: 'vertical-rl',
                    transform: 'rotate(180deg)',
                    letterSpacing: '1px',
                  }}
                >
                  ReactOS
                </span>
              </div>
              <div style={{ padding: '2px 0' }}>
                {START_MENU_ITEMS.map((item) => (
                  <MenuItem
                    key={item.id}
                    item={item}
                    onClose={() => setStartOpen(false)}
                    onAction={handleStartAction}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        <div
          style={{
            width: '2px',
            height: '24px',
            borderLeft: `1px solid ${C.darker}`,
            borderRight: `1px solid ${C.white}`,
          }}
        />

        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            gap: '3px',
            overflow: 'hidden',
          }}
        >
          {windows.map((win) => (
            <TaskbarButton
              key={win.id}
              win={win}
              isFocused={win.id === focusedId}
              onFocus={winActions.focus}
              onMinimize={winActions.minimize}
              onMaximize={winActions.maximize}
              onRestore={winActions.restore}
              onClose={winActions.close}
            />
          ))}
        </div>

        <div
          style={{
            ...sunken,
            height: '24px',
            display: 'flex',
            alignItems: 'center',
            padding: '0 6px',
            gap: '6px',
            flexShrink: 0,
          }}
        >
          <span style={{ width: '14px', height: '14px', display: 'flex' }}>
            {SVG_ICONS['volume']}
          </span>
          <Clock />
        </div>
      </div>
      {shutdownOpen && (
        <ShutdownDialog onCancel={() => setShutdownOpen(false)} />
      )}
    </>
  )
}
