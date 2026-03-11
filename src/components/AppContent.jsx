import { SVG_ICONS } from '../configurations/icons.jsx'
import { C, noBorder, raised, sunken } from '../configurations/style.js'

export default function AppContent({ appId }) {
  const box = { padding: '12px', fontSize: '12px' }
  const currentYear = new Date().getFullYear()

  if (appId === 'about')
    return (
      <div
        style={{
          ...box,
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          alignItems: 'center',
          paddingTop: '24px',
        }}
      >
        <div style={{ width: '48px', height: '48px', display: 'flex' }}>
          {SVG_ICONS['about']}
        </div>
        <div style={{ fontSize: '16px', fontWeight: 'bold' }}>ReactOS</div>
        <div style={{ color: C.dark, textAlign: 'center' }}>
          Version 1.0
          <br />
          Ein Windows 95 inspiriertes Portfolio
          <br />
          gebaut mit React
        </div>
        <div
          style={{
            marginTop: '8px',
            ...sunken,
            padding: '8px 16px',
            background: C.white,
            width: '80%',
            textAlign: 'center',
          }}
        >
          © {currentYear} · Fabian Kotalla
        </div>
      </div>
    )

  if (appId === 'notepad')
    return (
      <textarea
        style={{
          width: '100%',
          height: '100%',
          ...noBorder,
          outline: 'none',
          resize: 'none',
          fontFamily: "'Courier New', monospace",
          fontSize: '13px',
          padding: '4px',
          background: C.white,
          boxSizing: 'border-box',
        }}
        defaultValue="Willkommen im Editor!"
      />
    )

  if (appId === 'computer')
    return (
      <div style={box}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '8px',
          }}
        >
          {[
            { label: 'C: Festplatte', svgId: 'drive_hdd' },
            { label: 'D: CD-ROM', svgId: 'drive_cd' },
            { label: 'A: Diskette', svgId: 'drive_floppy' },
            { label: 'Z: Netzwerk', svgId: 'drive_network' },
          ].map((d) => (
            <div
              key={d.label}
              style={{
                ...raised,
                background: C.silver,
                padding: '8px',
                display: 'flex',
                gap: '6px',
                alignItems: 'center',
                cursor: 'default',
              }}
            >
              <span
                style={{
                  width: '20px',
                  height: '20px',
                  display: 'flex',
                  flexShrink: 0,
                }}
              >
                {SVG_ICONS[d.svgId]}
              </span>
              <span style={{ fontSize: '11px' }}>{d.label}</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: '12px', color: C.dark, fontSize: '11px' }}>
          ReactOS 1.0 · 640 KB RAM verfügbar
        </div>
      </div>
    )

  if (appId === 'files')
    return (
      <div style={{ ...box, display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
        {['Dokumente', 'Bilder', 'Musik', 'Downloads'].map((f) => (
          <div
            key={f}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              cursor: 'default',
              width: '60px',
            }}
          >
            <span style={{ width: '28px', height: '28px', display: 'flex' }}>
              {SVG_ICONS['folder']}
            </span>
            <span style={{ fontSize: '11px', textAlign: 'center' }}>{f}</span>
          </div>
        ))}
      </div>
    )

  if (appId === 'trash')
    return (
      <div style={{ ...box, color: C.dark, fontStyle: 'italic' }}>
        Der Papierkorb ist leer.
      </div>
    )

  return (
    <div style={box}>Applikation "{appId}" ist noch nicht implementiert.</div>
  )
}
