import type { ReactElement, ReactNode } from 'react'
import { render } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { SnackbarProvider } from 'notistack'
import { crearTemaAplicacion } from '@/tema/tema'
import { ModoColorProveedor } from '@/contextos/ModoColorContexto'

export function crearEnvoltorioDePruebas(rutaInicial = '/') {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  })
  const tema = crearTemaAplicacion('light')

  return function EnvoltorioDePruebas({ children }: { children: ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>
        <ModoColorProveedor>
          <ThemeProvider theme={tema}>
            <CssBaseline />
            <SnackbarProvider>
              <MemoryRouter initialEntries={[rutaInicial]}>{children}</MemoryRouter>
            </SnackbarProvider>
          </ThemeProvider>
        </ModoColorProveedor>
      </QueryClientProvider>
    )
  }
}

export function renderizarConProveedores(ui: ReactElement, rutaInicial = '/') {
  return render(ui, { wrapper: crearEnvoltorioDePruebas(rutaInicial) })
}
