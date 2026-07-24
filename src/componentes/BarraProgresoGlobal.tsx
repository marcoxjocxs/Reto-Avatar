import { useIsFetching } from '@tanstack/react-query'
import Fade from '@mui/material/Fade'
import LinearProgress from '@mui/material/LinearProgress'
import Box from '@mui/material/Box'

export function BarraProgresoGlobal() {
  const cantidadPeticionesActivas = useIsFetching()

  return (
    <Fade in={cantidadPeticionesActivas > 0} unmountOnExit>
      <Box
        role="status"
        aria-label="Cargando información"
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: (tema) => tema.zIndex.tooltip + 1,
        }}
      >
        <LinearProgress
          sx={{
            height: 3,
            '& .MuiLinearProgress-bar': {
              backgroundImage: 'linear-gradient(90deg, #EE8130, #F7D02C, #6390F0)',
            },
            backgroundColor: 'transparent',
          }}
        />
      </Box>
    </Fade>
  )
}
