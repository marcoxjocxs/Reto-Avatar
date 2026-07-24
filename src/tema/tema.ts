import { createTheme, type ThemeOptions } from '@mui/material/styles'
import { esES } from '@mui/material/locale'

const opcionesComunes: ThemeOptions = {
  shape: { borderRadius: 14 },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 700 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 10 },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: { backgroundImage: 'none' },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontWeight: 600 },
      },
    },
  },
}

export function crearTemaAplicacion(modo: 'light' | 'dark') {
  const esOscuro = modo === 'dark'

  return createTheme(
    {
      ...opcionesComunes,
      palette: {
        mode: modo,
        primary: {
          main: esOscuro ? '#FFCB05' : '#D93025',
          contrastText: esOscuro ? '#1A1A1A' : '#FFFFFF',
        },
        secondary: {
          main: '#3B4CCA',
        },
        background: {
          default: esOscuro ? '#0F1115' : '#F4F6F8',
          paper: esOscuro ? '#171A21' : '#FFFFFF',
        },
      },
    },
    esES,
  )
}
