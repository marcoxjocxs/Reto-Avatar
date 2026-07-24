export interface RecursoNombrado {
  name: string
  url: string
}

export interface EstadisticaPokemon {
  nombre: string
  valor: number
  valorMaximo: number
}

export interface PokemonResumen {
  id: number
  nombre: string
  imagenUrl: string
  tipos: string[]
}

export interface PokemonDetalle {
  id: number
  nombre: string
  nombreTecnico: string
  numeroPokedex: number
  imagenUrl: string
  imagenRespaldoUrl: string
  tipos: string[]
  altura: number
  peso: number
  habilidades: string[]
  estadisticas: EstadisticaPokemon[]
  descripcion: string
  genero: string
  habitat: string | null
  color: string | null
  forma: string | null
  tasaCrecimiento: string | null
  felicidadBase: number | null
  gruposHuevo: string[]
  generacion: string | null
  esLegendario: boolean
  esMitico: boolean
  cadenaEvolucionUrl: string | null
  variedades: RecursoNombrado[]
}

export interface EslabonEvolucion {
  nombre: string
  id: number
  imagenUrl: string
  minNivel: number | null
  disparador: string | null
}

export interface CadenaEvolucion {
  etapas: EslabonEvolucion[][]
}

export interface EspecieIndice {
  id: number
  nombre: string
  url: string
}

export interface FiltrosPokedex {
  nombre: string
  tipo: string
  color: string
  habitat: string
  generacion: string
  forma: string
  grupoHuevo: string
  alturaMin: number | null
  alturaMax: number | null
  pesoMin: number | null
  pesoMax: number | null
  estadisticaPrincipal: string
  estadisticaMinima: number | null
  esLegendario: boolean | null
  esMitico: boolean | null
}

export interface ResultadoPaginado<T> {
  elementos: T[]
  total: number
  pagina: number
  totalPaginas: number
  limite: number
}
