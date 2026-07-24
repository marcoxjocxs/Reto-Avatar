export const RUTAS_API = {
  especies: '/pokemon-species',
  especiePorNombre: (nombre: string) => `/pokemon-species/${nombre}`,
  pokemonPorNombre: (nombre: string) => `/pokemon/${nombre}`,
  cadenaEvolucion: (id: number | string) => `/evolution-chain/${id}`,
  tipo: (nombre: string) => `/type/${nombre}`,
  generacion: (nombre: string) => `/generation/${nombre}`,
  color: (nombre: string) => `/pokemon-color/${nombre}`,
  habitat: (nombre: string) => `/pokemon-habitat/${nombre}`,
  forma: (nombre: string) => `/pokemon-shape/${nombre}`,
  grupoHuevo: (nombre: string) => `/egg-group/${nombre}`,
  // listas completas, para construir los selects de filtros sin inventar slugs a mano
  listaTipos: '/type',
  listaColores: '/pokemon-color',
  listaHabitats: '/pokemon-habitat',
  listaFormas: '/pokemon-shape',
  listaGruposHuevo: '/egg-group',
  listaGeneraciones: '/generation',
} as const
