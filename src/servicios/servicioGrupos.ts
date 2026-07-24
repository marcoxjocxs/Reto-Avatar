import { RUTAS_API } from '@/constantes/rutasApi'
import type { GrupoConEspeciesApi, RespuestaListaApi, TipoConPokemonApi } from '@/modelos/apiPokeApi'
import type { RecursoNombrado } from '@/modelos/pokemon'
import { conReintento } from '@/utilidades/conReintento'
import { clienteHttp } from './clienteHttp'

// Estos endpoints de agrupación devuelven directamente la lista de especies miembro,
// así que evitan tener que traer el detalle de las ~1300 especies para filtrar.
async function obtenerNombresDesdeGrupo(ruta: string, senal?: AbortSignal): Promise<Set<string>> {
  const { data } = await conReintento(() =>
    clienteHttp.get<GrupoConEspeciesApi>(ruta, { signal: senal }),
  )
  return new Set(data.pokemon_species.map((especie) => especie.name))
}

export function obtenerEspeciesPorColor(color: string, senal?: AbortSignal) {
  return obtenerNombresDesdeGrupo(RUTAS_API.color(color), senal)
}

export function obtenerEspeciesPorHabitat(habitat: string, senal?: AbortSignal) {
  return obtenerNombresDesdeGrupo(RUTAS_API.habitat(habitat), senal)
}

export function obtenerEspeciesPorForma(forma: string, senal?: AbortSignal) {
  return obtenerNombresDesdeGrupo(RUTAS_API.forma(forma), senal)
}

export function obtenerEspeciesPorGrupoHuevo(grupoHuevo: string, senal?: AbortSignal) {
  return obtenerNombresDesdeGrupo(RUTAS_API.grupoHuevo(grupoHuevo), senal)
}

export function obtenerEspeciesPorGeneracion(generacion: string, senal?: AbortSignal) {
  return obtenerNombresDesdeGrupo(RUTAS_API.generacion(generacion), senal)
}

export async function obtenerEspeciesPorTipo(tipo: string, senal?: AbortSignal): Promise<Set<string>> {
  const { data } = await conReintento(() =>
    clienteHttp.get<TipoConPokemonApi>(RUTAS_API.tipo(tipo), { signal: senal }),
  )
  return new Set(data.pokemon.map((p) => p.pokemon.name))
}

// Catálogos completos para los selects de filtros: se traen tal cual los expone PokéAPI,
// así los slugs (los "valor" que se mandan en la URL) nunca quedan inventados a mano.
async function obtenerLista(ruta: string, senal?: AbortSignal): Promise<RecursoNombrado[]> {
  const { data } = await conReintento(() =>
    clienteHttp.get<RespuestaListaApi>(ruta, { params: { limit: 100 }, signal: senal }),
  )
  return data.results
}

export function obtenerListaTipos(senal?: AbortSignal) {
  return obtenerLista(RUTAS_API.listaTipos, senal)
}

export function obtenerListaColores(senal?: AbortSignal) {
  return obtenerLista(RUTAS_API.listaColores, senal)
}

export function obtenerListaHabitats(senal?: AbortSignal) {
  return obtenerLista(RUTAS_API.listaHabitats, senal)
}

export function obtenerListaFormas(senal?: AbortSignal) {
  return obtenerLista(RUTAS_API.listaFormas, senal)
}

export function obtenerListaGruposHuevo(senal?: AbortSignal) {
  return obtenerLista(RUTAS_API.listaGruposHuevo, senal)
}

export function obtenerListaGeneraciones(senal?: AbortSignal) {
  return obtenerLista(RUTAS_API.listaGeneraciones, senal)
}
