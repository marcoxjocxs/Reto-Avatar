import type { QueryClient } from '@tanstack/react-query'
import type { EspecieIndice, FiltrosPokedex, PokemonDetalle, ResultadoPaginado } from '@/modelos/pokemon'
import { obtenerCatalogoEspecies } from './servicioEspecies'
import {
  obtenerEspeciesPorColor,
  obtenerEspeciesPorForma,
  obtenerEspeciesPorGeneracion,
  obtenerEspeciesPorGrupoHuevo,
  obtenerEspeciesPorHabitat,
  obtenerEspeciesPorTipo,
} from './servicioGrupos'
import { obtenerPokemonDetalle } from './servicioPokemon'

// Tope de candidatos que se exploran en detalle cuando hay filtros de altura/peso/
// estadística/legendario/mítico (dependen de /pokemon, no de /pokemon-species).
// Limitación conocida: con este tope no se garantiza cubrir el 100% de coincidencias
// si no hay otros filtros de agrupación activos que reduzcan antes el conjunto.
const LIMITE_EXPLORACION_DETALLE = 150

export const CLAVES_CONSULTA = {
  catalogo: ['catalogo-especies'] as const,
  grupo: (clave: string, valor: string) => ['grupo-filtro', clave, valor] as const,
  detalle: (nombre: string) => ['pokemon-detalle', nombre] as const,
}

const buscadoresPorGrupo: Record<string, (valor: string, senal?: AbortSignal) => Promise<Set<string>>> = {
  tipo: obtenerEspeciesPorTipo,
  color: obtenerEspeciesPorColor,
  habitat: obtenerEspeciesPorHabitat,
  generacion: obtenerEspeciesPorGeneracion,
  forma: obtenerEspeciesPorForma,
  grupoHuevo: obtenerEspeciesPorGrupoHuevo,
}

function tieneFiltrosDeDetalle(filtros: FiltrosPokedex): boolean {
  return (
    filtros.alturaMin !== null ||
    filtros.alturaMax !== null ||
    filtros.pesoMin !== null ||
    filtros.pesoMax !== null ||
    (filtros.estadisticaPrincipal !== '' && filtros.estadisticaMinima !== null) ||
    filtros.esLegendario !== null ||
    filtros.esMitico !== null
  )
}

function cumpleFiltrosDeDetalle(pokemon: PokemonDetalle, filtros: FiltrosPokedex): boolean {
  if (filtros.alturaMin !== null && pokemon.altura < filtros.alturaMin) return false
  if (filtros.alturaMax !== null && pokemon.altura > filtros.alturaMax) return false
  if (filtros.pesoMin !== null && pokemon.peso < filtros.pesoMin) return false
  if (filtros.pesoMax !== null && pokemon.peso > filtros.pesoMax) return false
  if (filtros.esLegendario !== null && pokemon.esLegendario !== filtros.esLegendario) return false
  if (filtros.esMitico !== null && pokemon.esMitico !== filtros.esMitico) return false

  if (filtros.estadisticaPrincipal && filtros.estadisticaMinima !== null) {
    const estadistica = pokemon.estadisticas.find((e) => e.nombre === filtros.estadisticaPrincipal)
    if (!estadistica || estadistica.valor < filtros.estadisticaMinima) return false
  }

  return true
}

async function resolverCandidatos(
  queryClient: QueryClient,
  filtros: FiltrosPokedex,
  senal?: AbortSignal,
): Promise<EspecieIndice[]> {
  const catalogo = await queryClient.fetchQuery({
    queryKey: CLAVES_CONSULTA.catalogo,
    queryFn: () => obtenerCatalogoEspecies(senal),
    staleTime: Infinity,
  })

  const filtrosAgrupadosActivos = (Object.keys(buscadoresPorGrupo) as (keyof typeof buscadoresPorGrupo)[])
    .map((clave) => ({ clave, valor: filtros[clave as keyof FiltrosPokedex] as string }))
    .filter((f) => f.valor)

  const conjuntos = await Promise.all(
    filtrosAgrupadosActivos.map((f) =>
      queryClient.fetchQuery({
        queryKey: CLAVES_CONSULTA.grupo(f.clave, f.valor),
        queryFn: () => buscadoresPorGrupo[f.clave]!(f.valor, senal),
        staleTime: 1000 * 60 * 30,
      }),
    ),
  )

  const nombreBuscado = filtros.nombre.trim().toLowerCase()

  return catalogo.filter((especie) => {
    if (nombreBuscado && !especie.nombre.includes(nombreBuscado)) return false
    return conjuntos.every((conjunto) => conjunto.has(especie.nombre))
  })
}

// Resuelve una página combinando filtros de agrupación (rápidos) con filtros de
// detalle (progresivos, ver LIMITE_EXPLORACION_DETALLE) cuando corresponde.
export async function obtenerPaginaPokedex(
  queryClient: QueryClient,
  filtros: FiltrosPokedex,
  pagina: number,
  limite: number,
  senal?: AbortSignal,
): Promise<ResultadoPaginado<PokemonDetalle> & { esAproximado: boolean }> {
  const candidatos = await resolverCandidatos(queryClient, filtros, senal)
  const offset = (pagina - 1) * limite

  if (!tieneFiltrosDeDetalle(filtros)) {
    const paginaCandidatos = candidatos.slice(offset, offset + limite)
    const elementos = await Promise.all(
      paginaCandidatos.map((especie) =>
        queryClient.fetchQuery({
          queryKey: CLAVES_CONSULTA.detalle(especie.nombre),
          queryFn: () => obtenerPokemonDetalle(especie.nombre, senal),
          staleTime: 1000 * 60 * 10,
        }),
      ),
    )

    return {
      elementos,
      total: candidatos.length,
      pagina,
      totalPaginas: Math.max(1, Math.ceil(candidatos.length / limite)),
      limite,
      esAproximado: false,
    }
  }

  const explorables = candidatos.slice(0, LIMITE_EXPLORACION_DETALLE)
  const detalles = await Promise.all(
    explorables.map((especie) =>
      queryClient.fetchQuery({
        queryKey: CLAVES_CONSULTA.detalle(especie.nombre),
        queryFn: () => obtenerPokemonDetalle(especie.nombre, senal),
        staleTime: 1000 * 60 * 10,
      }),
    ),
  )

  const coincidencias = detalles.filter((pokemon) => cumpleFiltrosDeDetalle(pokemon, filtros))
  const elementos = coincidencias.slice(offset, offset + limite)

  return {
    elementos,
    total: coincidencias.length,
    pagina,
    totalPaginas: Math.max(1, Math.ceil(coincidencias.length / limite)),
    limite,
    esAproximado: candidatos.length > LIMITE_EXPLORACION_DETALLE,
  }
}
