import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep'
import { SelectorPokemon } from '@/modulos/comparador/componentes/SelectorPokemon'
import { TarjetaComparacion } from '@/modulos/comparador/componentes/TarjetaComparacion'
import { TablaEstadisticasComparadas } from '@/modulos/comparador/componentes/TablaEstadisticasComparadas'
import { usePokemonesComparados } from '@/modulos/comparador/hooks/usePokemonesComparados'
import { GraficoRadarEstadisticas } from '@/componentes/GraficoRadarEstadisticas'
import { EstadoVacio } from '@/componentes/EstadoVacio'
import { EstadoError } from '@/componentes/EstadoError'
import { CargandoContenido } from '@/componentes/CargandoContenido'
import { useComparadorStore } from '@/contextos/comparadorStore'

const PALETA_SERIES = ['#D93025', '#3B4CCA', '#7AC74C']

export function PaginaComparador() {
  const { pokemones, estaCargando, hayError } = usePokemonesComparados()
  const nombresSeleccionados = useComparadorStore((estado) => estado.nombresSeleccionados)
  const limpiarComparacion = useComparadorStore((estado) => estado.limpiarComparacion)

  return (
    <Stack spacing={3}>
      <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ sm: 'center' }} spacing={2}>
        <Stack>
          <Typography variant="h4" component="h1" fontWeight={700}>
            Comparador de Pokémon
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Selecciona entre 2 y 3 Pokémon para comparar sus atributos.
          </Typography>
        </Stack>
        <Button
          variant="outlined"
          color="error"
          startIcon={<DeleteSweepIcon />}
          onClick={limpiarComparacion}
          disabled={nombresSeleccionados.length === 0}
        >
          Limpiar comparación
        </Button>
      </Stack>

      <Card variant="outlined">
        <CardContent>
          <SelectorPokemon />
        </CardContent>
      </Card>

      {hayError && <EstadoError mensaje="No se pudo cargar la información de uno o más Pokémon." />}

      {!hayError && estaCargando && <CargandoContenido mensaje="Cargando Pokémon seleccionados…" minAltura={240} />}

      {!hayError && !estaCargando && nombresSeleccionados.length === 0 && (
        <EstadoVacio
          titulo="Aún no has seleccionado Pokémon"
          descripcion="Usa el buscador para agregar entre 2 y 3 Pokémon y comenzar la comparación."
        />
      )}

      {!hayError && !estaCargando && pokemones.length >= 1 && (
        <Grid container spacing={2.5}>
          {pokemones.map((pokemon, indice) => (
            <Grid key={pokemon.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <TarjetaComparacion pokemon={pokemon} colorSerie={PALETA_SERIES[indice] ?? '#6B7280'} />
            </Grid>
          ))}
        </Grid>
      )}

      {!hayError && !estaCargando && pokemones.length === 1 && (
        <EstadoVacio
          titulo="Agrega al menos un Pokémon más"
          descripcion="Selecciona un segundo Pokémon para poder comparar."
        />
      )}

      {!hayError && !estaCargando && pokemones.length >= 2 && (
        <>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Estadísticas base
              </Typography>
              <GraficoRadarEstadisticas
                series={pokemones.map((pokemon, indice) => ({
                  nombre: pokemon.nombre,
                  color: PALETA_SERIES[indice] ?? '#6B7280',
                  estadisticas: pokemon.estadisticas,
                }))}
                altura={340}
              />
            </CardContent>
          </Card>

          <TablaEstadisticasComparadas pokemones={pokemones} coloresSerie={PALETA_SERIES} />
        </>
      )}
    </Stack>
  )
}
