import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface EstadoFavoritos {
  nombresFavoritos: string[]
  alternarFavorito: (nombre: string) => void
  esFavorito: (nombre: string) => boolean
}

export const useFavoritosStore = create<EstadoFavoritos>()(
  persist(
    (set, get) => ({
      nombresFavoritos: [],
      alternarFavorito: (nombre) => {
        const actuales = get().nombresFavoritos
        const yaExiste = actuales.includes(nombre)
        set({
          nombresFavoritos: yaExiste ? actuales.filter((n) => n !== nombre) : [...actuales, nombre],
        })
      },
      esFavorito: (nombre) => get().nombresFavoritos.includes(nombre),
    }),
    { name: 'favoritos-pokemon' },
  ),
)
