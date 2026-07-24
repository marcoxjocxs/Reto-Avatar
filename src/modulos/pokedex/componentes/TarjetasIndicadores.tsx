import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Skeleton from '@mui/material/Skeleton'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon'
import CategoryIcon from '@mui/icons-material/Category'
import VisibilityIcon from '@mui/icons-material/Visibility'
import CompareArrowsIcon from '@mui/icons-material/CompareArrows'
import type { ReactNode } from 'react'

interface IndicadorProps {
  etiqueta: string
  valor: number | null
  icono: ReactNode
  color: string
}

function TarjetaIndicador({ etiqueta, valor, icono, color }: IndicadorProps) {
  return (
    <Card variant="outlined" sx={{ height: '100%' }}>
      <CardContent>
        <Stack direction="row" spacing={2} alignItems="center">
          <Stack
            sx={{
              width: 48,
              height: 48,
              borderRadius: 2,
              backgroundColor: `${color}22`,
              color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {icono}
          </Stack>
          <Stack>
            <Typography variant="body2" color="text.secondary">
              {etiqueta}
            </Typography>
            {valor === null ? (
              <Skeleton variant="text" width={48} height={32} />
            ) : (
              <Typography variant="h5" fontWeight={700}>
                {valor.toLocaleString('es')}
              </Typography>
            )}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}

interface TarjetasIndicadoresProps {
  totalEspecies: number | null
  tiposEncontrados: number | null
  pokemonEnPagina: number | null
  pokemonEnComparador: number
}

export function TarjetasIndicadores({
  totalEspecies,
  tiposEncontrados,
  pokemonEnPagina,
  pokemonEnComparador,
}: TarjetasIndicadoresProps) {
  return (
    <Grid container spacing={2.5}>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <TarjetaIndicador
          etiqueta="Especies totales"
          valor={totalEspecies}
          icono={<CatchingPokemonIcon />}
          color="#D93025"
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <TarjetaIndicador etiqueta="Tipos encontrados" valor={tiposEncontrados} icono={<CategoryIcon />} color="#3B4CCA" />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <TarjetaIndicador
          etiqueta="En esta página"
          valor={pokemonEnPagina}
          icono={<VisibilityIcon />}
          color="#7AC74C"
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <TarjetaIndicador
          etiqueta="En comparador"
          valor={pokemonEnComparador}
          icono={<CompareArrowsIcon />}
          color="#F7D02C"
        />
      </Grid>
    </Grid>
  )
}
