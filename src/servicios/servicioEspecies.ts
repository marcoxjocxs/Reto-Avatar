import { RUTAS_API } from '@/constantes/rutasApi'
import type { RespuestaListaApi } from '@/modelos/apiPokeApi'
import type { EspecieIndice } from '@/modelos/pokemon'
import { extraerIdDeUrl } from '@/utilidades/extraerIdDeUrl'
import { clienteHttp } from './clienteHttp'

// PokéAPI tiene ~1300 especies; este límite es holgado a propósito.
const LIMITE_CATALOGO_COMPLETO = 4000

// Trae solo id/nombre/url de todas las especies, sin detalle pesado: sirve para
// buscar por nombre y para intersectar con los filtros de agrupación sin descargar
// el detalle completo de cada Pokémon.
export async function obtenerCatalogoEspecies(senal?: AbortSignal): Promise<EspecieIndice[]> {
  const { data } = await clienteHttp.get<RespuestaListaApi>(RUTAS_API.especies, {
    params: { limit: LIMITE_CATALOGO_COMPLETO, offset: 0 },
    signal: senal,
  })

  return data.results.map((especie) => ({
    id: extraerIdDeUrl(especie.url),
    nombre: especie.name,
    url: especie.url,
  }))
}
