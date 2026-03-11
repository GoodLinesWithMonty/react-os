import { CONFIG } from './style.js'

export const DESKTOP_ICONS = [
  {
    id: 'di_computer',
    appId: 'computer',
    x: CONFIG.GRID_PAD_X,
    y: CONFIG.GRID_PAD_Y,
  },
  {
    id: 'di_trash',
    appId: 'trash',
    x: CONFIG.GRID_PAD_X,
    y: CONFIG.GRID_PAD_Y + CONFIG.GRID_H,
  },
  {
    id: 'di_portfolio',
    appId: 'portfolio',
    x: CONFIG.GRID_PAD_X,
    y: CONFIG.GRID_PAD_Y + CONFIG.GRID_H * 2,
  },
  {
    id: 'di_files',
    appId: 'files',
    x: CONFIG.GRID_PAD_X,
    y: CONFIG.GRID_PAD_Y + CONFIG.GRID_H * 3,
  },
]
