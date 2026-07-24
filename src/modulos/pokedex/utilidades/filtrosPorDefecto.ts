import type { FiltrosPokedex } from '@/modelos/pokemon'

export const filtrosPokedexPorDefecto: FiltrosPokedex = {
  nombre: '',
  tipo: '',
  color: '',
  habitat: '',
  generacion: '',
  forma: '',
  grupoHuevo: '',
  alturaMin: null,
  alturaMax: null,
  pesoMin: null,
  pesoMax: null,
  estadisticaPrincipal: '',
  estadisticaMinima: null,
  esLegendario: null,
  esMitico: null,
}

export function contarFiltrosActivos(filtros: FiltrosPokedex): number {
  return Object.entries(filtros).filter(([clave, valor]) => {
    if (clave === 'estadisticaMinima' && !filtros.estadisticaPrincipal) return false
    return valor !== '' && valor !== null
  }).length
}
