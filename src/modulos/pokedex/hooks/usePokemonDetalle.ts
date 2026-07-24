import { useQuery } from '@tanstack/react-query'
import { obtenerPokemonDetalle } from '@/servicios/servicioPokemon'

export function usePokemonDetalle(nombre: string | null) {
  return useQuery({
    queryKey: ['pokemon-detalle', nombre],
    queryFn: ({ signal }) => obtenerPokemonDetalle(nombre as string, signal),
    enabled: Boolean(nombre),
    staleTime: 1000 * 60 * 10,
  })
}
