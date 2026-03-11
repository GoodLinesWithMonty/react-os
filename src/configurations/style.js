export const CONFIG = {
  GRID_W: 80,
  GRID_H: 90,
  GRID_PAD_X: 16,
  GRID_PAD_Y: 16,
  TASKBAR_H: 32,
  WIN_TITLEBAR_H: 22,
}

export const C = {
  bg: '#008080',
  silver: '#c0c0c0',
  white: '#ffffff',
  dark: '#808080',
  darker: '#404040',
  black: '#000000',
  navy: '#000080',
  menuHover: '#000080',
  menuHoverText: '#ffffff',
  sep: '#808080',
  titleActive: '#000080',
  titleActiveText: '#ffffff',
  titleInactive: '#808080',
  titleInactiveText: '#c0c0c0',
}

export const raised = {
  borderTop: `2px solid ${C.white}`,
  borderLeft: `2px solid ${C.white}`,
  borderBottom: `2px solid ${C.darker}`,
  borderRight: `2px solid ${C.darker}`,
}

export const sunken = {
  borderTop: `2px solid ${C.darker}`,
  borderLeft: `2px solid ${C.darker}`,
  borderBottom: `2px solid ${C.white}`,
  borderRight: `2px solid ${C.white}`,
}

export const noBorder = {
  borderTop: 'none',
  borderRight: 'none',
  borderBottom: 'none',
  borderLeft: 'none',
}
