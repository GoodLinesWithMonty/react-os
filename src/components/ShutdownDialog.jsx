import { useState } from 'react'
import { C, CONFIG, noBorder, raised, sunken } from '../configurations/style.js'
import { SVG_ICONS } from '../configurations/icons.jsx'

const LINKEDIN_URL = 'https://www.linkedin.com/in/fabian-kotalla-9524a22b1/'

export default function ShutdownDialog({ onCancel }) {
  const [selected, setSelected] = useState('shutdown')

  const options = [
    { id: 'shutdown', label: 'Computer herunterfahren', svgId: 'shutdown' },
    { id: 'restart', label: 'Computer neu starten', svgId: 'win_restore' },
  ]

  const handleOk = () => {
    if (selected === 'shutdown') window.open(LINKEDIN_URL)
    onCancel()
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9000,
        background: 'rgba(0,0,0,0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{ background: C.silver, ...raised, width: '360px' }}>
        <div
          style={{
            background: C.navy,
            height: `${CONFIG.WIN_TITLEBAR_H}px`,
            display: 'flex',
            alignItems: 'center',
            padding: '0 6px',
            gap: '6px',
          }}
        >
          <span style={{ width: '14px', height: '14px', display: 'flex' }}>
            {SVG_ICONS['shutdown']}
          </span>
          <span
            style={{ color: C.white, fontWeight: 'bold', fontSize: '12px' }}
          >
            ReactOS beenden
          </span>
        </div>

        <div style={{ padding: '16px', display: 'flex', gap: '16px' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              flexShrink: 0,
              display: 'flex',
            }}
          >
            {SVG_ICONS['reactos_logo']}
          </div>
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: '12px',
                marginBottom: '12px',
                fontWeight: 'bold',
              }}
            >
              Was soll ReactOS tun?
            </div>
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}
            >
              {options.map((opt) => (
                <label
                  key={opt.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: 'default',
                    fontSize: '12px',
                    padding: '4px 6px',
                    background: selected === opt.id ? C.navy : 'transparent',
                    color: selected === opt.id ? C.white : C.black,
                    ...(selected === opt.id ? sunken : {}),
                  }}
                  onClick={() => setSelected(opt.id)}
                >
                  <input
                    type="radio"
                    name="shutdown_opt"
                    checked={selected === opt.id}
                    onChange={() => setSelected(opt.id)}
                    style={{ accentColor: C.navy, flexShrink: 0 }}
                  />
                  <span
                    style={{
                      width: '14px',
                      height: '14px',
                      display: 'flex',
                      flexShrink: 0,
                    }}
                  >
                    {SVG_ICONS[opt.svgId]}
                  </span>
                  {opt.label}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div
          style={{
            borderTop: `1px solid ${C.dark}`,
            padding: '10px 16px',
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '8px',
          }}
        >
          {[
            { label: 'OK', action: handleOk },
            { label: 'Abbrechen', action: onCancel },
            {
              label: 'Hilfe',
              action: () => {},
            },
          ].map((btn) => (
            <button
              key={btn.label}
              onClick={btn.action}
              style={{
                ...noBorder,
                ...raised,
                background: C.silver,
                height: '22px',
                padding: '0 16px',
                minWidth: '72px',
                cursor: 'default',
                outline: 'none',
                fontSize: '12px',
              }}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
