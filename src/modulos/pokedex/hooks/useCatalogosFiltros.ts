import { useQueries } from '@tanstack/react-query'
import {
  obtenerListaColores,
  obtenerListaFormas,
  obtenerListaGeneraciones,
  obtenerListaGruposHuevo,
  obtenerListaHabitats,
  obtenerListaTipos,
} from '@/servicios/servicioGrupos'

const staleTime = Infinity

export function useCatalogosFiltros() {
  const resultados = useQueries({
    queries: [
      { queryKey: ['catalogo-filtro', 'tipo'], queryFn: ({ signal }) => obtenerListaTipos(signal), staleTime },
      { queryKey: ['catalogo-filtro', 'color'], queryFn: ({ signal }) => obtenerListaColores(signal), staleTime },
      { queryKey: ['catalogo-filtro', 'habitat'], queryFn: ({ signal }) => obtenerListaHabitats(signal), staleTime },
      { queryKey: ['catalogo-filtro', 'forma'], queryFn: ({ signal }) => obtenerListaFormas(signal), staleTime },
      {
        queryKey: ['catalogo-filtro', 'grupoHuevo'],
        queryFn: ({ signal }) => obtenerListaGruposHuevo(signal),
        staleTime,
      },
      {
        queryKey: ['catalogo-filtro', 'generacion'],
        queryFn: ({ signal }) => obtenerListaGeneraciones(signal),
        staleTime,
      },
    ],
  })

  const [tipos, colores, habitats, formas, gruposHuevo, generaciones] = resultados

  return {
    tipos: tipos.data ?? [],
    colores: colores.data ?? [],
    habitats: habitats.data ?? [],
    formas: formas.data ?? [],
    gruposHuevo: gruposHuevo.data ?? [],
    generaciones: generaciones.data ?? [],
  }
}
