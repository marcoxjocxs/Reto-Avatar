import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { DisenioPrincipal } from '@/componentes/DisenioPrincipal'
import { CargandoContenido } from '@/componentes/CargandoContenido'

const PaginaPokedex = lazy(() =>
  import('@/paginas/PaginaPokedex').then((m) => ({ default: m.PaginaPokedex })),
)
const PaginaComparador = lazy(() =>
  import('@/paginas/PaginaComparador').then((m) => ({ default: m.PaginaComparador })),
)

export function AppRutas() {
  return (
    <Suspense fallback={<CargandoContenido mensaje="Cargando página…" minAltura="100vh" />}>
      <Routes>
        <Route element={<DisenioPrincipal />}>
          <Route index element={<Navigate to="/pokedex" replace />} />
          <Route path="/pokedex" element={<PaginaPokedex />} />
          <Route path="/comparador" element={<PaginaComparador />} />
          <Route path="*" element={<Navigate to="/pokedex" replace />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
