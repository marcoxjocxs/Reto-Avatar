export const etiquetasEstadisticas: Record<string, string> = {
  hp: 'PS',
  attack: 'Ataque',
  defense: 'Defensa',
  'special-attack': 'At. especial',
  'special-defense': 'Def. especial',
  speed: 'Velocidad',
}

export function traducirEstadistica(nombre: string): string {
  return etiquetasEstadisticas[nombre] ?? nombre
}
