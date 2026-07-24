import { useQuery, useQueryClient } from '@tanstack/react-query'
import type { FiltrosPokedex } from '@/modelos/pokemon'
import { obtenerPaginaPokedex } from '@/servicios/servicioPokedex'

export function usePaginaPokedex(filtros: FiltrosPokedex, pagina: number, limite: number) {
  const queryClient = useQueryClient()

  return useQuery({
    queryKey: ['pagina-pokedex', filtros, pagina, limite],
    queryFn: ({ signal }) => obtenerPaginaPokedex(queryClient, filtros, pagina, limite, signal),
    placeholderData: (datosAnteriores) => datosAnteriores,
  })
}
