import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { traducirEstadistica } from '@/constantes/etiquetasEstadisticas'

interface BarraEstadisticaProps {
  nombre: string
  valor: number
  valorMaximo: number
  color?: string
}

export function BarraEstadistica({ nombre, valor, valorMaximo, color }: BarraEstadisticaProps) {
  const porcentaje = Math.min(100, (valor / valorMaximo) * 100)

  return (
    <Box sx={{ width: '100%' }}>
      <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.5 }}>
        <Typography variant="caption" color="text.secondary">
          {traducirEstadistica(nombre)}
        </Typography>
        <Typography variant="caption" fontWeight={700}>
          {valor}
        </Typography>
      </Stack>
      <LinearProgress
        variant="determinate"
        value={porcentaje}
        aria-label={`${traducirEstadistica(nombre)}: ${valor} de ${valorMaximo}`}
        sx={{
          height: 8,
          borderRadius: 4,
          backgroundColor: 'action.hover',
          '& .MuiLinearProgress-bar': { borderRadius: 4, backgroundColor: color ?? 'primary.main' },
        }}
      />
    </Box>
  )
}
