import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import SearchOffIcon from '@mui/icons-material/SearchOff'

interface EstadoVacioProps {
  titulo?: string
  descripcion?: string
  textoAccion?: string
  alPresionarAccion?: () => void
}

export function EstadoVacio({
  titulo = 'No se encontraron resultados',
  descripcion = 'Intenta ajustar los filtros o la búsqueda.',
  textoAccion,
  alPresionarAccion,
}: EstadoVacioProps) {
  return (
    <Stack alignItems="center" justifyContent="center" spacing={1.5} sx={{ py: 8 }}>
      <SearchOffIcon sx={{ fontSize: 48, color: 'text.disabled' }} />
      <Typography variant="h6" textAlign="center">
        {titulo}
      </Typography>
      <Typography variant="body2" color="text.secondary" textAlign="center">
        {descripcion}
      </Typography>
      {textoAccion && alPresionarAccion && (
        <Button variant="outlined" onClick={alPresionarAccion}>
          {textoAccion}
        </Button>
      )}
    </Stack>
  )
}
