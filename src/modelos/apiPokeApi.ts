import type { RecursoNombrado } from './pokemon'

export interface RespuestaListaApi {
  count: number
  next: string | null
  previous: string | null
  results: RecursoNombrado[]
}

export interface SpriteOtros {
  ['official-artwork']?: {
    front_default: string | null
  }
  home?: {
    front_default: string | null
  }
}

export interface SpritesApi {
  front_default: string | null
  other?: SpriteOtros
}

export interface EstadisticaApi {
  base_stat: number
  effort: number
  stat: RecursoNombrado
}

export interface TipoSlotApi {
  slot: number
  type: RecursoNombrado
}

export interface HabilidadSlotApi {
  ability: RecursoNombrado
  is_hidden: boolean
  slot: number
}

export interface PokemonApi {
  id: number
  name: string
  height: number
  weight: number
  sprites: SpritesApi
  stats: EstadisticaApi[]
  types: TipoSlotApi[]
  abilities: HabilidadSlotApi[]
  species: RecursoNombrado
}

export interface FlavorTextEntryApi {
  flavor_text: string
  language: RecursoNombrado
  version: RecursoNombrado
}

export interface GenusEntryApi {
  genus: string
  language: RecursoNombrado
}

export interface PokemonSpeciesApi {
  id: number
  name: string
  base_happiness: number | null
  capture_rate: number
  color: RecursoNombrado | null
  egg_groups: RecursoNombrado[]
  evolution_chain: { url: string } | null
  flavor_text_entries: FlavorTextEntryApi[]
  genera: GenusEntryApi[]
  generation: RecursoNombrado | null
  growth_rate: RecursoNombrado | null
  habitat: RecursoNombrado | null
  is_legendary: boolean
  is_mythical: boolean
  shape: RecursoNombrado | null
  varieties: { is_default: boolean; pokemon: RecursoNombrado }[]
}

export interface EslabonEvolucionApi {
  species: RecursoNombrado
  evolution_details: {
    min_level: number | null
    trigger: RecursoNombrado | null
  }[]
  evolves_to: EslabonEvolucionApi[]
}

export interface CadenaEvolucionApi {
  id: number
  chain: EslabonEvolucionApi
}

export interface GrupoConEspeciesApi {
  name: string
  pokemon_species: RecursoNombrado[]
}

export interface TipoConPokemonApi {
  name: string
  pokemon: { pokemon: RecursoNombrado; slot: number }[]
}
