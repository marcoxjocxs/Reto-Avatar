import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const MAXIMO_POKEMON_COMPARADOR = 3

interface EstadoComparador {
  nombresSeleccionados: string[]
  agregarPokemon: (nombre: string) => void
  retirarPokemon: (nombre: string) => void
  limpiarComparacion: () => void
  estaSeleccionado: (nombre: string) => boolean
}

export const useComparadorStore = create<EstadoComparador>()(
  persist(
    (set, get) => ({
      nombresSeleccionados: [],
      agregarPokemon: (nombre) => {
        const actuales = get().nombresSeleccionados
        if (actuales.includes(nombre) || actuales.length >= MAXIMO_POKEMON_COMPARADOR) return
        set({ nombresSeleccionados: [...actuales, nombre] })
      },
      retirarPokemon: (nombre) => {
        set({ nombresSeleccionados: get().nombresSeleccionados.filter((n) => n !== nombre) })
      },
      limpiarComparacion: () => set({ nombresSeleccionados: [] }),
      estaSeleccionado: (nombre) => get().nombresSeleccionados.includes(nombre),
    }),
    { name: 'comparador-pokemon' },
  ),
)
