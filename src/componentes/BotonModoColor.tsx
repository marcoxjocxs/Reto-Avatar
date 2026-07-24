import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import { useModoColor } from '@/contextos/ModoColorContexto'

export function BotonModoColor() {
  const { modoColor, alternarModoColor } = useModoColor()
  const esOscuro = modoColor === 'dark'

  return (
    <Tooltip title={esOscuro ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}>
      <IconButton
        onClick={alternarModoColor}
        aria-label={esOscuro ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
        color="inherit"
      >
        {esOscuro ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Tooltip>
  )
}
