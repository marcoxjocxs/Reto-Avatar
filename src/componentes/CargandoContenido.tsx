import CircularProgress from '@mui/material/CircularProgress'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

interface CargandoContenidoProps {
  mensaje?: string
  minAltura?: number | string
}

export function CargandoContenido({ mensaje = 'Cargando…', minAltura = 200 }: CargandoContenidoProps) {
  return (
    <Stack alignItems="center" justifyContent="center" spacing={1.5} sx={{ minHeight: minAltura, py: 4 }}>
      <CircularProgress aria-label={mensaje} />
      <Typography variant="body2" color="text.secondary">
        {mensaje}
      </Typography>
    </Stack>
  )
}
