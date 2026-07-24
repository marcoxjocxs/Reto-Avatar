import { act, renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { crearEnvoltorioDePruebas } from '@/utilidades/pruebas/renderizarConProveedores'
import { useFiltrosPokedexUrl } from './useFiltrosPokedexUrl'

describe('useFiltrosPokedexUrl', () => {
  it('aplica un filtro y reinicia la página a 1', () => {
    const { result } = renderHook(() => useFiltrosPokedexUrl(), {
      wrapper: crearEnvoltorioDePruebas('/pokedex?pagina=3'),
    })

    act(() => {
      result.current.establecerFiltros({ tipo: 'fire' })
    })

    expect(result.current.filtros.tipo).toBe('fire')
    expect(result.current.pagina).toBe(1)
  })

  it('limpia los filtros aplicados conservando el límite por página', () => {
    const { result } = renderHook(() => useFiltrosPokedexUrl(), {
      wrapper: crearEnvoltorioDePruebas('/pokedex?tipo=fire&color=red&limite=24'),
    })

    expect(result.current.filtros.tipo).toBe('fire')

    act(() => {
      result.current.limpiarFiltros()
    })

    expect(result.current.filtros.tipo).toBe('')
    expect(result.current.filtros.color).toBe('')
    expect(result.current.limite).toBe(24)
  })
})
