import Chip from '@mui/material/Chip'
import { alpha } from '@mui/material/styles'
import { obtenerColorTipo, traducirTipo } from '@/constantes/coloresTipos'

interface ChipTipoProps {
  tipo: string
  tamano?: 'small' | 'medium'
}

export function ChipTipo({ tipo, tamano = 'small' }: ChipTipoProps) {
  const color = obtenerColorTipo(tipo)

  return (
    <Chip
      label={traducirTipo(tipo)}
      size={tamano}
      sx={{
        backgroundColor: alpha(color, 0.18),
        color,
        border: `1px solid ${alpha(color, 0.5)}`,
      }}
    />
  )
}
