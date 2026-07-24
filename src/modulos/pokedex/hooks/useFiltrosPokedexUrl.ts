import { useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import type { FiltrosPokedex } from '@/modelos/pokemon'
import { filtrosPokedexPorDefecto } from '../utilidades/filtrosPorDefecto'

const CLAVES_NUMERICAS: (keyof FiltrosPokedex)[] = ['alturaMin', 'alturaMax', 'pesoMin', 'pesoMax', 'estadisticaMinima']
const CLAVES_BOOLEANAS: (keyof FiltrosPokedex)[] = ['esLegendario', 'esMitico']

export function useFiltrosPokedexUrl() {
  const [parametros, establecerParametros] = useSearchParams()

  const filtros = useMemo<FiltrosPokedex>(() => {
    const resultado: FiltrosPokedex = { ...filtrosPokedexPorDefecto }

    for (const clave of Object.keys(filtrosPokedexPorDefecto) as (keyof FiltrosPokedex)[]) {
      const valorCrudo = parametros.get(clave)
      if (valorCrudo === null) continue

      if (CLAVES_NUMERICAS.includes(clave)) {
        const numero = Number(valorCrudo)
        ;(resultado[clave] as number | null) = Number.isNaN(numero) ? null : numero
      } else if (CLAVES_BOOLEANAS.includes(clave)) {
        ;(resultado[clave] as boolean | null) = valorCrudo === 'true'
      } else {
        ;(resultado[clave] as string) = valorCrudo
      }
    }

    return resultado
  }, [parametros])

  const pagina = Number(parametros.get('pagina') ?? '1') || 1
  const limite = Number(parametros.get('limite') ?? '12') || 12

  const establecerFiltros = useCallback(
    (nuevosFiltros: Partial<FiltrosPokedex>) => {
      establecerParametros((previos) => {
        const siguientes = new URLSearchParams(previos)
        for (const [clave, valor] of Object.entries(nuevosFiltros)) {
          if (valor === '' || valor === null || valor === undefined) {
            siguientes.delete(clave)
          } else {
            siguientes.set(clave, String(valor))
          }
        }
        siguientes.set('pagina', '1')
        return siguientes
      })
    },
    [establecerParametros],
  )

  const limpiarFiltros = useCallback(() => {
    establecerParametros((previos) => {
      const siguientes = new URLSearchParams()
      const limiteActual = previos.get('limite')
      if (limiteActual) siguientes.set('limite', limiteActual)
      return siguientes
    })
  }, [establecerParametros])

  const establecerPagina = useCallback(
    (nuevaPagina: number) => {
      establecerParametros((previos) => {
        const siguientes = new URLSearchParams(previos)
        siguientes.set('pagina', String(nuevaPagina))
        return siguientes
      })
    },
    [establecerParametros],
  )

  const establecerLimite = useCallback(
    (nuevoLimite: number) => {
      establecerParametros((previos) => {
        const siguientes = new URLSearchParams(previos)
        siguientes.set('limite', String(nuevoLimite))
        siguientes.set('pagina', '1')
        return siguientes
      })
    },
    [establecerParametros],
  )

  return { filtros, pagina, limite, establecerFiltros, limpiarFiltros, establecerPagina, establecerLimite }
}
