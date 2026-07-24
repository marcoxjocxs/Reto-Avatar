import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import RefreshIcon from '@mui/icons-material/Refresh'

interface EstadoErrorProps {
  mensaje?: string
  alReintentar?: () => void
}

export function EstadoError({ mensaje = 'Ocurrió un problema al cargar la información.', alReintentar }: EstadoErrorProps) {
  return (
    <Stack alignItems="center" justifyContent="center" spacing={2} sx={{ py: 8 }} role="alert">
      <ErrorOutlineIcon color="error" sx={{ fontSize: 48 }} />
      <Typography variant="h6" textAlign="center">
        {mensaje}
      </Typography>
      {alReintentar && (
        <Button variant="contained" startIcon={<RefreshIcon />} onClick={alReintentar}>
          Reintentar
        </Button>
      )}
    </Stack>
  )
}
