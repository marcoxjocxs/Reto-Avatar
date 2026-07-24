import { Component, type ErrorInfo, type ReactNode } from 'react'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

interface LimiteErrorProps {
  children: ReactNode
}

interface LimiteErrorEstado {
  tieneError: boolean
}

export class LimiteError extends Component<LimiteErrorProps, LimiteErrorEstado> {
  state: LimiteErrorEstado = { tieneError: false }

  static getDerivedStateFromError(): LimiteErrorEstado {
    return { tieneError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Error no controlado en la aplicación:', error, info)
  }

  render() {
    if (this.state.tieneError) {
      return (
        <Stack alignItems="center" justifyContent="center" spacing={2} sx={{ minHeight: '100vh', p: 4 }}>
          <Typography variant="h5">Algo salió mal.</Typography>
          <Typography variant="body2" color="text.secondary" textAlign="center">
            Ocurrió un error inesperado en la aplicación. Intenta recargar la página.
          </Typography>
          <Button variant="contained" onClick={() => window.location.reload()}>
            Recargar
          </Button>
        </Stack>
      )
    }

    return this.props.children
  }
}
