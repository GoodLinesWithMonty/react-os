export function buildDesktopCtxItems(snapActive) {
  return [
    {
      id: 'arrange',
      label: 'Symbole anordnen',
      svgId: 'arrange',
      children: [{ id: 'by_name', label: 'Nach Name', svgId: 'sort_name' }],
    },
    {
      id: 'snap_grid',
      label: 'Am Raster ausrichten',
      svgId: snapActive ? 'snap_on' : 'snap_off',
    },
    { id: 'sep1' },
    { id: 'refresh', label: 'Aktualisieren', svgId: 'refresh' },
  ]
}
