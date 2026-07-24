import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

type ModoColor = 'light' | 'dark'

interface ModoColorContextoValor {
  modoColor: ModoColor
  alternarModoColor: () => void
}

const CLAVE_ALMACENAMIENTO = 'modo-color-preferido'

const ModoColorContexto = createContext<ModoColorContextoValor | undefined>(undefined)

function obtenerModoInicial(): ModoColor {
  const guardado = localStorage.getItem(CLAVE_ALMACENAMIENTO)
  if (guardado === 'light' || guardado === 'dark') return guardado
  const prefiereOscuro = window.matchMedia?.('(prefers-color-scheme: dark)').matches
  return prefiereOscuro ? 'dark' : 'light'
}

export function ModoColorProveedor({ children }: { children: ReactNode }) {
  const [modoColor, setModoColor] = useState<ModoColor>(obtenerModoInicial)

  useEffect(() => {
    localStorage.setItem(CLAVE_ALMACENAMIENTO, modoColor)
  }, [modoColor])

  const valor = useMemo<ModoColorContextoValor>(
    () => ({
      modoColor,
      alternarModoColor: () => setModoColor((actual) => (actual === 'light' ? 'dark' : 'light')),
    }),
    [modoColor],
  )

  return <ModoColorContexto.Provider value={valor}>{children}</ModoColorContexto.Provider>
}

export function useModoColor(): ModoColorContextoValor {
  const contexto = useContext(ModoColorContexto)
  if (!contexto) {
    throw new Error('useModoColor debe usarse dentro de ModoColorProveedor')
  }
  return contexto
}
