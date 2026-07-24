import { memo } from 'react'
import { motion } from 'framer-motion'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import { alpha } from '@mui/material/styles'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { ImagenConRespaldo } from '@/componentes/ImagenConRespaldo'
import { ChipTipo } from '@/componentes/ChipTipo'
import { obtenerColorTipo } from '@/constantes/coloresTipos'
import { traducirEstadistica } from '@/constantes/etiquetasEstadisticas'
import type { PokemonDetalle } from '@/modelos/pokemon'

interface TarjetaPokemonProps {
  pokemon: PokemonDetalle
  estaEnComparador: boolean
  puedeAgregarAlComparador: boolean
  esFavorito: boolean
  alVerDetalle: (pokemon: PokemonDetalle) => void
  alAlternarComparador: (pokemon: PokemonDetalle) => void
  alAlternarFavorito: (pokemon: PokemonDetalle) => void
}

function TarjetaPokemonBase({
  pokemon,
  estaEnComparador,
  puedeAgregarAlComparador,
  esFavorito,
  alVerDetalle,
  alAlternarComparador,
  alAlternarFavorito,
}: TarjetaPokemonProps) {
  const colorPrincipal = obtenerColorTipo(pokemon.tipos[0] ?? 'normal')
  const estadisticasDestacadas = pokemon.estadisticas.slice(0, 2)

  return (
    <Card
      component={motion.div}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.18 }}
      variant="outlined"
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderColor: alpha(colorPrincipal, 0.4),
        borderTopWidth: 4,
        borderTopColor: colorPrincipal,
        transition: 'box-shadow 0.2s ease',
        '&:hover': { boxShadow: 4 },
      }}
    >
      <CardActionArea
        onClick={() => alVerDetalle(pokemon)}
        aria-label={`Ver detalle de ${pokemon.nombre}`}
        sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
      >
        <Stack sx={{ backgroundColor: alpha(colorPrincipal, 0.08), px: 2, pt: 2 }}>
          <ImagenConRespaldo src={pokemon.imagenUrl} srcRespaldo={pokemon.imagenRespaldoUrl} alt={pokemon.nombre} />
        </Stack>
        <CardContent sx={{ width: '100%', flexGrow: 1 }}>
          <Typography variant="caption" color="text.secondary">
            N.º {String(pokemon.numeroPokedex).padStart(3, '0')}
          </Typography>
          <Typography variant="h6" component="h3" gutterBottom>
            {pokemon.nombre}
          </Typography>
          <Stack direction="row" spacing={1} sx={{ mb: 1.5, flexWrap: 'wrap', gap: 0.5 }}>
            {pokemon.tipos.map((tipo) => (
              <ChipTipo key={tipo} tipo={tipo} />
            ))}
          </Stack>
          <Stack direction="row" spacing={2} sx={{ mb: 1.5 }}>
            <Typography variant="body2" color="text.secondary">
              Altura: {pokemon.altura} m
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Peso: {pokemon.peso} kg
            </Typography>
          </Stack>
          <Stack direction="row" spacing={2}>
            {estadisticasDestacadas.map((estadistica) => (
              <Typography key={estadistica.nombre} variant="caption" color="text.secondary">
                {traducirEstadistica(estadistica.nombre)}: {estadistica.valor}
              </Typography>
            ))}
          </Stack>
        </CardContent>
      </CardActionArea>
      <Stack direction="row" justifyContent="flex-end" sx={{ px: 1, pb: 1 }}>
        <Tooltip title={esFavorito ? 'Quitar de favoritos' : 'Marcar como favorito'}>
          <IconButton
            size="small"
            aria-label={esFavorito ? `Quitar ${pokemon.nombre} de favoritos` : `Marcar ${pokemon.nombre} como favorito`}
            onClick={() => alAlternarFavorito(pokemon)}
          >
            {esFavorito ? <FavoriteIcon color="error" fontSize="small" /> : <FavoriteBorderIcon fontSize="small" />}
          </IconButton>
        </Tooltip>
        <Tooltip
          title={
            estaEnComparador
              ? 'Retirar del comparador'
              : puedeAgregarAlComparador
                ? 'Agregar al comparador'
                : 'Comparador completo (máximo 3)'
          }
        >
          <span>
            <IconButton
              size="small"
              aria-label={estaEnComparador ? `Retirar ${pokemon.nombre} del comparador` : `Agregar ${pokemon.nombre} al comparador`}
              onClick={() => alAlternarComparador(pokemon)}
              disabled={!estaEnComparador && !puedeAgregarAlComparador}
              color={estaEnComparador ? 'primary' : 'default'}
            >
              {estaEnComparador ? <RemoveCircleOutlineIcon fontSize="small" /> : <AddCircleOutlineIcon fontSize="small" />}
            </IconButton>
          </span>
        </Tooltip>
      </Stack>
    </Card>
  )
}

export const TarjetaPokemon = memo(TarjetaPokemonBase)
