import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import type { PokemonDetalle } from '@/modelos/pokemon'
import { TarjetaEsqueleto } from '@/componentes/TarjetaEsqueleto'
import { MAXIMO_POKEMON_COMPARADOR } from '@/contextos/comparadorStore'
import { TarjetaPokemon } from './TarjetaPokemon'

interface GrillaPokemonProps {
  pokemones: PokemonDetalle[]
  cargando: boolean
  cantidadEsqueletos: number
  nombresComparador: string[]
  nombresFavoritos: string[]
  alVerDetalle: (pokemon: PokemonDetalle) => void
  alAlternarComparador: (pokemon: PokemonDetalle) => void
  alAlternarFavorito: (pokemon: PokemonDetalle) => void
}

export function GrillaPokemon({
  pokemones,
  cargando,
  cantidadEsqueletos,
  nombresComparador,
  nombresFavoritos,
  alVerDetalle,
  alAlternarComparador,
  alAlternarFavorito,
}: GrillaPokemonProps) {
  if (cargando) {
    return (
      <Box role="status" aria-label="Cargando Pokémon">
        <Grid container spacing={2.5}>
          {Array.from({ length: cantidadEsqueletos }).map((_, indice) => (
            <Grid key={indice} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <TarjetaEsqueleto />
            </Grid>
          ))}
        </Grid>
      </Box>
    )
  }

  return (
    <Grid container spacing={2.5}>
      {pokemones.map((pokemon) => (
        <Grid key={pokemon.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <TarjetaPokemon
            pokemon={pokemon}
            estaEnComparador={nombresComparador.includes(pokemon.nombreTecnico)}
            puedeAgregarAlComparador={nombresComparador.length < MAXIMO_POKEMON_COMPARADOR}
            esFavorito={nombresFavoritos.includes(pokemon.nombreTecnico)}
            alVerDetalle={alVerDetalle}
            alAlternarComparador={alAlternarComparador}
            alAlternarFavorito={alAlternarFavorito}
          />
        </Grid>
      ))}
    </Grid>
  )
}
