import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import CloseIcon from '@mui/icons-material/Close'
import { ImagenConRespaldo } from '@/componentes/ImagenConRespaldo'
import { ChipTipo } from '@/componentes/ChipTipo'
import { obtenerColorTipo } from '@/constantes/coloresTipos'
import type { PokemonDetalle } from '@/modelos/pokemon'
import { useComparadorStore } from '@/contextos/comparadorStore'

interface TarjetaComparacionProps {
  pokemon: PokemonDetalle
  colorSerie: string
}

export function TarjetaComparacion({ pokemon, colorSerie }: TarjetaComparacionProps) {
  const retirarPokemon = useComparadorStore((estado) => estado.retirarPokemon)
  const colorTipo = obtenerColorTipo(pokemon.tipos[0] ?? 'normal')

  return (
    <Card variant="outlined" sx={{ borderTopWidth: 4, borderTopColor: colorSerie, height: '100%' }}>
      <CardContent>
        <Stack direction="row" justifyContent="flex-end">
          <Tooltip title="Retirar de la comparación">
            <IconButton
              size="small"
              aria-label={`Retirar ${pokemon.nombre} de la comparación`}
              onClick={() => retirarPokemon(pokemon.nombreTecnico)}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
        <Stack alignItems="center" sx={{ backgroundColor: `${colorTipo}18`, borderRadius: 2, p: 1 }}>
          <ImagenConRespaldo src={pokemon.imagenUrl} srcRespaldo={pokemon.imagenRespaldoUrl} alt={pokemon.nombre} alto={140} />
        </Stack>
        <Typography variant="h6" textAlign="center" sx={{ mt: 1 }}>
          {pokemon.nombre}
        </Typography>
        <Stack direction="row" justifyContent="center" spacing={1} sx={{ my: 1, flexWrap: 'wrap', gap: 0.5 }}>
          {pokemon.tipos.map((tipo) => (
            <ChipTipo key={tipo} tipo={tipo} />
          ))}
        </Stack>
        <Stack direction="row" justifyContent="space-around" sx={{ mt: 1 }}>
          <Stack alignItems="center">
            <Typography variant="caption" color="text.secondary">Altura</Typography>
            <Typography variant="body2" fontWeight={600}>{pokemon.altura} m</Typography>
          </Stack>
          <Stack alignItems="center">
            <Typography variant="caption" color="text.secondary">Peso</Typography>
            <Typography variant="body2" fontWeight={600}>{pokemon.peso} kg</Typography>
          </Stack>
        </Stack>
        <Stack sx={{ mt: 1.5 }}>
          <Typography variant="caption" color="text.secondary">Habilidades</Typography>
          <Typography variant="body2">{pokemon.habilidades.join(', ')}</Typography>
        </Stack>
      </CardContent>
    </Card>
  )
}
