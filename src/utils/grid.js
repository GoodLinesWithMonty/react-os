import { CONFIG } from '../configurations/style.js'

export function snapToGrid(x, y) {
  const col = Math.round((x - CONFIG.GRID_PAD_X) / CONFIG.GRID_W)
  const row = Math.round((y - CONFIG.GRID_PAD_Y) / CONFIG.GRID_H)
  return {
    x: CONFIG.GRID_PAD_X + col * CONFIG.GRID_W,
    y: CONFIG.GRID_PAD_Y + row * CONFIG.GRID_H,
  }
}
