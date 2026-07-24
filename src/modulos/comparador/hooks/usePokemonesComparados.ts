import { useQueries } from '@tanstack/react-query'
import { obtenerPokemonDetalle } from '@/servicios/servicioPokemon'
import { useComparadorStore } from '@/contextos/comparadorStore'

export function usePokemonesComparados() {
  const nombresSeleccionados = useComparadorStore((estado) => estado.nombresSeleccionados)

  const resultados = useQueries({
    queries: nombresSeleccionados.map((nombre) => ({
      queryKey: ['pokemon-detalle', nombre],
      queryFn: () => obtenerPokemonDetalle(nombre),
      staleTime: 1000 * 60 * 10,
    })),
  })

  return {
    pokemones: resultados.map((r) => r.data).filter((p) => p !== undefined),
    estaCargando: resultados.some((r) => r.isLoading),
    hayError: resultados.some((r) => r.isError),
  }
}
