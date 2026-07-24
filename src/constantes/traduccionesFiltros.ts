const traduccionesColor: Record<string, string> = {
  black: 'Negro',
  blue: 'Azul',
  brown: 'Marrón',
  gray: 'Gris',
  green: 'Verde',
  pink: 'Rosa',
  purple: 'Morado',
  red: 'Rojo',
  white: 'Blanco',
  yellow: 'Amarillo',
}

const traduccionesHabitat: Record<string, string> = {
  cave: 'Cueva',
  forest: 'Bosque',
  grassland: 'Pradera',
  mountain: 'Montaña',
  rare: 'Raro',
  'rough-terrain': 'Terreno agreste',
  sea: 'Mar',
  urban: 'Urbano',
  'waters-edge': 'Orilla del agua',
}

const traduccionesForma: Record<string, string> = {
  ball: 'Bola',
  squiggle: 'Serpentina',
  fish: 'Pez',
  arms: 'Brazos',
  blob: 'Amorfo',
  upright: 'Erguido',
  legs: 'Piernas',
  quadruped: 'Cuadrúpedo',
  wings: 'Alado',
  tentacles: 'Tentáculos',
  heads: 'Cabezas',
  humanoid: 'Humanoide',
  'bug-wings': 'Insecto alado',
  armor: 'Armadura',
}

const traduccionesGrupoHuevo: Record<string, string> = {
  monster: 'Monstruo',
  water1: 'Agua 1',
  bug: 'Bicho',
  flying: 'Volador',
  ground: 'Tierra',
  fairy: 'Hada',
  plant: 'Planta',
  humanshape: 'Humanoide',
  water3: 'Agua 3',
  mineral: 'Mineral',
  indeterminate: 'Indeterminado',
  water2: 'Agua 2',
  ditto: 'Ditto',
  dragon: 'Dragón',
  'no-eggs': 'Sin huevos',
}

const numerosRomanos: Record<string, string> = {
  i: 'I', ii: 'II', iii: 'III', iv: 'IV', v: 'V',
  vi: 'VI', vii: 'VII', viii: 'VIII', ix: 'IX', x: 'X',
}

function capitalizar(texto: string): string {
  return texto.charAt(0).toUpperCase() + texto.slice(1)
}

// respaldo para valores que la API llegue a agregar y que aún no estén en el diccionario
function conRespaldo(diccionario: Record<string, string>) {
  return (slug: string) => diccionario[slug] ?? capitalizar(slug.replace(/-/g, ' '))
}

export const traducirColor = conRespaldo(traduccionesColor)
export const traducirHabitat = conRespaldo(traduccionesHabitat)
export const traducirForma = conRespaldo(traduccionesForma)
export const traducirGrupoHuevo = conRespaldo(traduccionesGrupoHuevo)

export function traducirGeneracion(slug: string): string {
  const numero = slug.replace('generation-', '')
  const romano = numerosRomanos[numero]
  return romano ? `Generación ${romano}` : capitalizar(slug.replace(/-/g, ' '))
}
