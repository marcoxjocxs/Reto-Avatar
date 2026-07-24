import { useQuery } from '@tanstack/react-query'
import { obtenerCadenaEvolucion } from '@/servicios/servicioPokemon'

export function useCadenaEvolucion(url: string | null) {
  return useQuery({
    queryKey: ['cadena-evolucion', url],
    queryFn: ({ signal }) => obtenerCadenaEvolucion(url as string, signal),
    enabled: Boolean(url),
    staleTime: 1000 * 60 * 30,
  })
}
