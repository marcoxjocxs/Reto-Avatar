import { describe, expect, it } from 'vitest'
import { formatearNombrePokemon, transformarEstadisticas, transformarPokemonDetalle } from './transformadores'
import type { PokemonApi, PokemonSpeciesApi } from '@/modelos/apiPokeApi'

function crearPokemonApiDePrueba(sobrescrituras: Partial<PokemonApi> = {}): PokemonApi {
  return {
    id: 1,
    name: 'bulbasaur',
    height: 7,
    weight: 69,
    sprites: {
      front_default: 'https://ejemplo.test/sprite.png',
      other: { 'official-artwork': { front_default: 'https://ejemplo.test/artwork.png' } },
    },
    stats: [
      { base_stat: 45, effort: 0, stat: { name: 'hp', url: '' } },
      { base_stat: 49, effort: 0, stat: { name: 'attack', url: '' } },
    ],
    types: [{ slot: 1, type: { name: 'grass', url: '' } }],
    abilities: [{ ability: { name: 'overgrow', url: '' }, is_hidden: false, slot: 1 }],
    species: { name: 'bulbasaur', url: '' },
    ...sobrescrituras,
  }
}

function crearEspecieApiDePrueba(sobrescrituras: Partial<PokemonSpeciesApi> = {}): PokemonSpeciesApi {
  return {
    id: 1,
    name: 'bulbasaur',
    base_happiness: 70,
    capture_rate: 45,
    color: { name: 'green', url: '' },
    egg_groups: [{ name: 'monster', url: '' }],
    evolution_chain: { url: 'https://pokeapi.co/api/v2/evolution-chain/1/' },
    flavor_text_entries: [
      { flavor_text: 'Descripción en inglés.', language: { name: 'en', url: '' }, version: { name: 'red', url: '' } },
      { flavor_text: 'Descripción en español.', language: { name: 'es', url: '' }, version: { name: 'red', url: '' } },
    ],
    genera: [{ genus: 'Seed Pokémon', language: { name: 'en', url: '' } }],
    generation: { name: 'generation-i', url: '' },
    growth_rate: { name: 'medium-slow', url: '' },
    habitat: { name: 'grassland', url: '' },
    is_legendary: false,
    is_mythical: false,
    shape: { name: 'quadruped', url: '' },
    varieties: [{ is_default: true, pokemon: { name: 'bulbasaur', url: '' } }],
    ...sobrescrituras,
  }
}

describe('formatearNombrePokemon', () => {
  it('convierte nombres técnicos con guiones a un formato legible', () => {
    expect(formatearNombrePokemon('mr-mime')).toBe('Mr Mime')
    expect(formatearNombrePokemon('bulbasaur')).toBe('Bulbasaur')
  })
})

describe('transformarEstadisticas', () => {
  it('mapea las estadísticas crudas de la API al modelo de dominio', () => {
    const resultado = transformarEstadisticas([{ base_stat: 45, effort: 0, stat: { name: 'hp', url: '' } }])
    expect(resultado).toEqual([{ nombre: 'hp', valor: 45, valorMaximo: 255 }])
  })
})

describe('transformarPokemonDetalle', () => {
  it('combina pokemon y especie en el modelo de dominio, prefiriendo la descripción en español', () => {
    const resultado = transformarPokemonDetalle(crearPokemonApiDePrueba(), crearEspecieApiDePrueba())

    expect(resultado.nombre).toBe('Bulbasaur')
    expect(resultado.nombreTecnico).toBe('bulbasaur')
    expect(resultado.altura).toBeCloseTo(0.7)
    expect(resultado.peso).toBeCloseTo(6.9)
    expect(resultado.tipos).toEqual(['grass'])
    expect(resultado.descripcion).toBe('Descripción en español.')
    expect(resultado.esLegendario).toBe(false)
    expect(resultado.imagenUrl).toBe('https://ejemplo.test/artwork.png')
  })

  it('usa la descripción en inglés como respaldo cuando no hay una en español', () => {
    const especieSinEspanol = crearEspecieApiDePrueba({
      flavor_text_entries: [
        { flavor_text: 'English only.', language: { name: 'en', url: '' }, version: { name: 'red', url: '' } },
      ],
    })

    const resultado = transformarPokemonDetalle(crearPokemonApiDePrueba(), especieSinEspanol)
    expect(resultado.descripcion).toBe('English only.')
  })
})
