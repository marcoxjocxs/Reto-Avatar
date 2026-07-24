import type {
  CadenaEvolucionApi,
  EslabonEvolucionApi,
  PokemonApi,
  PokemonSpeciesApi,
} from '@/modelos/apiPokeApi'
import type { CadenaEvolucion, EslabonEvolucion, EstadisticaPokemon, PokemonDetalle } from '@/modelos/pokemon'
import { extraerIdDeUrl } from '@/utilidades/extraerIdDeUrl'
import { obtenerImagenPokemon } from '@/utilidades/imagenRespaldo'

const VALOR_MAXIMO_ESTADISTICA = 255

function capitalizar(texto: string): string {
  return texto.charAt(0).toUpperCase() + texto.slice(1)
}

export function formatearNombrePokemon(nombreTecnico: string): string {
  return nombreTecnico
    .split('-')
    .map(capitalizar)
    .join(' ')
}

function obtenerDescripcion(entradas: PokemonSpeciesApi['flavor_text_entries']): string {
  const enEspanol = entradas.find((entrada) => entrada.language.name === 'es')
  const enIngles = entradas.find((entrada) => entrada.language.name === 'en')
  const seleccionada = enEspanol ?? enIngles
  if (!seleccionada) return 'Descripción no disponible.'
  return seleccionada.flavor_text.replace(/[\f\n\r\t\v]/g, ' ').trim()
}

function obtenerGenero(generos: PokemonSpeciesApi['genera']): string {
  const enEspanol = generos.find((g) => g.language.name === 'es')
  const enIngles = generos.find((g) => g.language.name === 'en')
  return (enEspanol ?? enIngles)?.genus ?? ''
}

export function transformarEstadisticas(stats: PokemonApi['stats']): EstadisticaPokemon[] {
  return stats.map((s) => ({
    nombre: s.stat.name,
    valor: s.base_stat,
    valorMaximo: VALOR_MAXIMO_ESTADISTICA,
  }))
}

export function transformarPokemonDetalle(
  pokemon: PokemonApi,
  especie: PokemonSpeciesApi,
): PokemonDetalle {
  const { imagenUrl, imagenRespaldoUrl } = obtenerImagenPokemon(pokemon.id, pokemon.sprites)

  return {
    id: pokemon.id,
    nombre: formatearNombrePokemon(pokemon.name),
    // nombre de la especie, no de la variedad: es el único que siempre resuelve en /pokemon-species/{nombre}
    nombreTecnico: especie.name,
    numeroPokedex: especie.id,
    imagenUrl,
    imagenRespaldoUrl,
    tipos: pokemon.types.map((t) => t.type.name),
    altura: pokemon.height / 10,
    peso: pokemon.weight / 10,
    habilidades: pokemon.abilities.map((a) => formatearNombrePokemon(a.ability.name)),
    estadisticas: transformarEstadisticas(pokemon.stats),
    descripcion: obtenerDescripcion(especie.flavor_text_entries),
    genero: obtenerGenero(especie.genera),
    habitat: especie.habitat?.name ?? null,
    color: especie.color?.name ?? null,
    forma: especie.shape?.name ?? null,
    tasaCrecimiento: especie.growth_rate?.name ?? null,
    felicidadBase: especie.base_happiness,
    gruposHuevo: especie.egg_groups.map((g) => g.name),
    generacion: especie.generation?.name ?? null,
    esLegendario: especie.is_legendary,
    esMitico: especie.is_mythical,
    cadenaEvolucionUrl: especie.evolution_chain?.url ?? null,
    variedades: especie.varieties.map((v) => v.pokemon),
  }
}

function aplanarCadena(eslabon: EslabonEvolucionApi, etapas: EslabonEvolucion[][], profundidad: number) {
  const id = extraerIdDeUrl(eslabon.species.url)
  const detalle = eslabon.evolution_details[0]

  const nodo: EslabonEvolucion = {
    nombre: formatearNombrePokemon(eslabon.species.name),
    id,
    imagenUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
    minNivel: detalle?.min_level ?? null,
    disparador: detalle?.trigger?.name ?? null,
  }

  if (!etapas[profundidad]) {
    etapas[profundidad] = []
  }
  etapas[profundidad].push(nodo)

  eslabon.evolves_to.forEach((siguiente) => aplanarCadena(siguiente, etapas, profundidad + 1))
}

export function transformarCadenaEvolucion(cadena: CadenaEvolucionApi): CadenaEvolucion {
  const etapas: EslabonEvolucion[][] = []
  aplanarCadena(cadena.chain, etapas, 0)
  return { etapas }
}
