import { RUTAS_API } from '@/constantes/rutasApi'
import type { CadenaEvolucionApi, PokemonApi, PokemonSpeciesApi } from '@/modelos/apiPokeApi'
import type { CadenaEvolucion, PokemonDetalle } from '@/modelos/pokemon'
import { conReintento } from '@/utilidades/conReintento'
import { ErrorPeticion, clienteHttp } from './clienteHttp'
import { transformarCadenaEvolucion, transformarPokemonDetalle } from './transformadores'

// Ojo: /pokemon no siempre comparte nombre con la especie (tatsugiri -> tatsugiri-curly,
// dudunsparce -> dudunsparce-two-segment), así que /pokemon/{nombreEspecie} da 404 en esos
// casos. Por eso se pide la especie primero y se usa la URL real de su variedad is_default.
export async function obtenerPokemonDetalle(
  nombreOId: string | number,
  senal?: AbortSignal,
): Promise<PokemonDetalle> {
  const especie = await conReintento(() =>
    clienteHttp
      .get<PokemonSpeciesApi>(RUTAS_API.especiePorNombre(String(nombreOId)), { signal: senal })
      .then((r) => r.data),
  )

  const variedadPredeterminada = especie.varieties.find((v) => v.is_default) ?? especie.varieties[0]
  if (!variedadPredeterminada) {
    throw new ErrorPeticion('Este Pokémon no tiene variedades disponibles.')
  }

  const pokemon = await conReintento(() =>
    clienteHttp
      .get<PokemonApi>(variedadPredeterminada.pokemon.url, { signal: senal })
      .then((r) => r.data),
  )

  return transformarPokemonDetalle(pokemon, especie)
}

export async function obtenerCadenaEvolucion(url: string, senal?: AbortSignal): Promise<CadenaEvolucion> {
  const { data } = await conReintento(() => clienteHttp.get<CadenaEvolucionApi>(url, { signal: senal }))
  return transformarCadenaEvolucion(data)
}
