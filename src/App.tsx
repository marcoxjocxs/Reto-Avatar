import { BrowserRouter } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { SnackbarProvider } from 'notistack'
import { LimiteError } from '@/aplicacion/LimiteError'
import { ModoColorProveedor, useModoColor } from '@/contextos/ModoColorContexto'
import { queryClient } from '@/configuracion/queryClient'
import { crearTemaAplicacion } from '@/tema/tema'
import { AppRutas } from '@/rutas/AppRutas'

function AplicacionConTema() {
  const { modoColor } = useModoColor()
  const tema = crearTemaAplicacion(modoColor)

  return (
    <ThemeProvider theme={tema}>
      <CssBaseline />
      <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} autoHideDuration={4000}>
        <BrowserRouter>
          <AppRutas />
        </BrowserRouter>
      </SnackbarProvider>
    </ThemeProvider>
  )
}

function App() {
  return (
    <LimiteError>
      <QueryClientProvider client={queryClient}>
        <ModoColorProveedor>
          <AplicacionConTema />
        </ModoColorProveedor>
      </QueryClientProvider>
    </LimiteError>
  )
}

export default App
