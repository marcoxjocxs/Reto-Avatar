import { beforeEach, describe, expect, it } from 'vitest'
import { MAXIMO_POKEMON_COMPARADOR, useComparadorStore } from './comparadorStore'

beforeEach(() => {
  useComparadorStore.getState().limpiarComparacion()
})

describe('useComparadorStore', () => {
  it('agrega un Pokémon al comparador', () => {
    useComparadorStore.getState().agregarPokemon('pikachu')
    expect(useComparadorStore.getState().nombresSeleccionados).toEqual(['pikachu'])
  })

  it('evita agregar el mismo Pokémon dos veces', () => {
    useComparadorStore.getState().agregarPokemon('pikachu')
    useComparadorStore.getState().agregarPokemon('pikachu')
    expect(useComparadorStore.getState().nombresSeleccionados).toEqual(['pikachu'])
  })

  it(`no permite superar el máximo de ${MAXIMO_POKEMON_COMPARADOR} Pokémon`, () => {
    useComparadorStore.getState().agregarPokemon('pikachu')
    useComparadorStore.getState().agregarPokemon('charizard')
    useComparadorStore.getState().agregarPokemon('bulbasaur')
    useComparadorStore.getState().agregarPokemon('squirtle')

    expect(useComparadorStore.getState().nombresSeleccionados).toHaveLength(MAXIMO_POKEMON_COMPARADOR)
    expect(useComparadorStore.getState().nombresSeleccionados).not.toContain('squirtle')
  })

  it('retira un Pokémon seleccionado', () => {
    useComparadorStore.getState().agregarPokemon('pikachu')
    useComparadorStore.getState().retirarPokemon('pikachu')
    expect(useComparadorStore.getState().nombresSeleccionados).toEqual([])
  })

  it('limpia toda la comparación', () => {
    useComparadorStore.getState().agregarPokemon('pikachu')
    useComparadorStore.getState().agregarPokemon('charizard')
    useComparadorStore.getState().limpiarComparacion()
    expect(useComparadorStore.getState().nombresSeleccionados).toEqual([])
  })
})
