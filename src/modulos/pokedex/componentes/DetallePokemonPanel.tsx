import Drawer from '@mui/material/Drawer'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Divider from '@mui/material/Divider'
import Chip from '@mui/material/Chip'
import Grid from '@mui/material/Grid'
import CloseIcon from '@mui/icons-material/Close'
import StarIcon from '@mui/icons-material/Star'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import { ChipTipo } from '@/componentes/ChipTipo'
import { ImagenConRespaldo } from '@/componentes/ImagenConRespaldo'
import { BarraEstadistica } from '@/componentes/BarraEstadistica'
import { GraficoRadarEstadisticas } from '@/componentes/GraficoRadarEstadisticas'
import { EstadoError } from '@/componentes/EstadoError'
import { CargandoContenido } from '@/componentes/CargandoContenido'
import { obtenerColorTipo } from '@/constantes/coloresTipos'
import { usePokemonDetalle } from '../hooks/usePokemonDetalle'
import { useCadenaEvolucion } from '../hooks/useCadenaEvolucion'
import { CadenaEvolutiva } from './CadenaEvolutiva'

const ETIQUETAS_TASA_CRECIMIENTO: Record<string, string> = {
  slow: 'Lento',
  medium: 'Medio',
  fast: 'Rápido',
  'medium-slow': 'Medio-lento',
  'slow-then-very-fast': 'Lento y luego muy rápido',
  'fast-then-very-slow': 'Rápido y luego muy lento',
}

interface DetallePokemonPanelProps {
  nombreTecnico: string | null
  abierto: boolean
  alCerrar: () => void
}

export function DetallePokemonPanel({ nombreTecnico, abierto, alCerrar }: DetallePokemonPanelProps) {
  const { data: pokemon, isLoading, isError, refetch } = usePokemonDetalle(nombreTecnico)
  const { data: cadena } = useCadenaEvolucion(pokemon?.cadenaEvolucionUrl ?? null)
  const colorPrincipal = obtenerColorTipo(pokemon?.tipos[0] ?? 'normal')

  return (
    <Drawer
      anchor="right"
      open={abierto}
      onClose={alCerrar}
      aria-labelledby="titulo-detalle-pokemon"
      slotProps={{ paper: { sx: { width: { xs: '100%', sm: 440 } } } }}
    >
      <Box sx={{ p: 3 }}>
        <Stack direction="row" justifyContent="flex-end">
          <IconButton onClick={alCerrar} aria-label="Cerrar panel de detalle">
            <CloseIcon />
          </IconButton>
        </Stack>

        {isLoading && <CargandoContenido mensaje="Cargando detalle del Pokémon…" minAltura={320} />}

        {isError && <EstadoError mensaje="No se pudo cargar el detalle de este Pokémon." alReintentar={() => refetch()} />}

        {pokemon && !isLoading && !isError && (
          <Stack spacing={3}>
            <Stack
              alignItems="center"
              sx={{ backgroundColor: `${colorPrincipal}18`, borderRadius: 3, p: 2 }}
            >
              <ImagenConRespaldo src={pokemon.imagenUrl} srcRespaldo={pokemon.imagenRespaldoUrl} alt={pokemon.nombre} alto={200} />
            </Stack>

            <Stack>
              <Typography variant="caption" color="text.secondary">
                N.º {String(pokemon.numeroPokedex).padStart(3, '0')}
              </Typography>
              <Typography id="titulo-detalle-pokemon" variant="h4" component="h2" fontWeight={700}>
                {pokemon.nombre}
              </Typography>
              {pokemon.genero && (
                <Typography variant="body2" color="text.secondary">
                  {pokemon.genero}
                </Typography>
              )}
              <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                {pokemon.tipos.map((tipo) => (
                  <ChipTipo key={tipo} tipo={tipo} tamano="medium" />
                ))}
                {pokemon.esLegendario && (
                  <Chip icon={<StarIcon />} label="Legendario" color="warning" size="small" />
                )}
                {pokemon.esMitico && (
                  <Chip icon={<AutoAwesomeIcon />} label="Mítico" color="secondary" size="small" />
                )}
              </Stack>
            </Stack>

            <Typography variant="body1">{pokemon.descripcion}</Typography>

            <Grid container spacing={2}>
              <Grid size={6}>
                <Typography variant="caption" color="text.secondary">Altura</Typography>
                <Typography variant="body1">{pokemon.altura} m</Typography>
              </Grid>
              <Grid size={6}>
                <Typography variant="caption" color="text.secondary">Peso</Typography>
                <Typography variant="body1">{pokemon.peso} kg</Typography>
              </Grid>
              <Grid size={6}>
                <Typography variant="caption" color="text.secondary">Hábitat</Typography>
                <Typography variant="body1" sx={{ textTransform: 'capitalize' }}>{pokemon.habitat ?? 'Desconocido'}</Typography>
              </Grid>
              <Grid size={6}>
                <Typography variant="caption" color="text.secondary">Color</Typography>
                <Typography variant="body1" sx={{ textTransform: 'capitalize' }}>{pokemon.color ?? 'Desconocido'}</Typography>
              </Grid>
              <Grid size={6}>
                <Typography variant="caption" color="text.secondary">Forma</Typography>
                <Typography variant="body1" sx={{ textTransform: 'capitalize' }}>{pokemon.forma ?? 'Desconocida'}</Typography>
              </Grid>
              <Grid size={6}>
                <Typography variant="caption" color="text.secondary">Generación</Typography>
                <Typography variant="body1" sx={{ textTransform: 'capitalize' }}>
                  {pokemon.generacion?.replace('generation-', 'Gen. ').toUpperCase() ?? 'Desconocida'}
                </Typography>
              </Grid>
              <Grid size={6}>
                <Typography variant="caption" color="text.secondary">Tasa de crecimiento</Typography>
                <Typography variant="body1">
                  {pokemon.tasaCrecimiento ? ETIQUETAS_TASA_CRECIMIENTO[pokemon.tasaCrecimiento] ?? pokemon.tasaCrecimiento : 'Desconocida'}
                </Typography>
              </Grid>
              <Grid size={6}>
                <Typography variant="caption" color="text.secondary">Felicidad base</Typography>
                <Typography variant="body1">{pokemon.felicidadBase ?? 'Desconocida'}</Typography>
              </Grid>
              <Grid size={12}>
                <Typography variant="caption" color="text.secondary">Grupos de huevo</Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" gap={0.5} sx={{ mt: 0.5 }}>
                  {pokemon.gruposHuevo.map((grupo) => (
                    <Chip key={grupo} label={grupo} size="small" sx={{ textTransform: 'capitalize' }} />
                  ))}
                </Stack>
              </Grid>
            </Grid>

            <Divider />

            <Stack>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Habilidades
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" gap={0.5}>
                {pokemon.habilidades.map((habilidad) => (
                  <Chip key={habilidad} label={habilidad} variant="outlined" size="small" />
                ))}
              </Stack>
            </Stack>

            <Divider />

            <Stack spacing={1.5}>
              <Typography variant="subtitle1" fontWeight={600}>
                Estadísticas base
              </Typography>
              {pokemon.estadisticas.map((estadistica) => (
                <BarraEstadistica
                  key={estadistica.nombre}
                  nombre={estadistica.nombre}
                  valor={estadistica.valor}
                  valorMaximo={estadistica.valorMaximo}
                  color={colorPrincipal}
                />
              ))}
              <GraficoRadarEstadisticas
                series={[{ nombre: pokemon.nombre, color: colorPrincipal, estadisticas: pokemon.estadisticas }]}
                altura={240}
              />
            </Stack>

            {pokemon.variedades.length > 1 && (
              <>
                <Divider />
                <Stack>
                  <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                    Variedades disponibles
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap" gap={0.5}>
                    {pokemon.variedades.map((variedad) => (
                      <Chip key={variedad.name} label={variedad.name} size="small" sx={{ textTransform: 'capitalize' }} />
                    ))}
                  </Stack>
                </Stack>
              </>
            )}

            {cadena && (
              <>
                <Divider />
                <Stack>
                  <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                    Cadena evolutiva
                  </Typography>
                  <CadenaEvolutiva cadena={cadena} idActual={pokemon.id} />
                </Stack>
              </>
            )}
          </Stack>
        )}
      </Box>
    </Drawer>
  )
}
