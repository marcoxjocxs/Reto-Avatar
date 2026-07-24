import { useQuery } from '@tanstack/react-query'
import { obtenerCatalogoEspecies } from '@/servicios/servicioEspecies'
import { CLAVES_CONSULTA } from '@/servicios/servicioPokedex'

export function useCatalogoEspecies() {
  return useQuery({
    queryKey: CLAVES_CONSULTA.catalogo,
    queryFn: ({ signal }) => obtenerCatalogoEspecies(signal),
    staleTime: Infinity,
  })
}
