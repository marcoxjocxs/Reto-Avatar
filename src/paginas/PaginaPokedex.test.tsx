import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { renderizarConProveedores } from '@/utilidades/pruebas/renderizarConProveedores'
import type { PokemonDetalle, ResultadoPaginado } from '@/modelos/pokemon'
import { PaginaPokedex } from './PaginaPokedex'

const { obtenerPaginaPokedexMock } = vi.hoisted(() => ({ obtenerPaginaPokedexMock: vi.fn() }))

vi.mock('@/servicios/servicioPokedex', async (importarOriginal) => ({
  ...(await importarOriginal<typeof import('@/servicios/servicioPokedex')>()),
  obtenerPaginaPokedex: obtenerPaginaPokedexMock,
}))

vi.mock('@/servicios/servicioEspecies', () => ({
  obtenerCatalogoEspecies: vi.fn().mockResolvedValue([
    { id: 1, nombre: 'bulbasaur', url: '' },
    { id: 4, nombre: 'charmander', url: '' },
  ]),
}))

function crearPokemonDePrueba(sobrescrituras: Partial<PokemonDetalle> = {}): PokemonDetalle {
  return {
    id: 1,
    nombre: 'Bulbasaur',
    nombreTecnico: 'bulbasaur',
    numeroPokedex: 1,
    imagenUrl: 'https://ejemplo.test/artwork.png',
    imagenRespaldoUrl: 'https://ejemplo.test/sprite.png',
    tipos: ['grass', 'poison'],
    altura: 0.7,
    peso: 6.9,
    habilidades: ['Overgrow'],
    estadisticas: [
      { nombre: 'hp', valor: 45, valorMaximo: 255 },
      { nombre: 'attack', valor: 49, valorMaximo: 255 },
    ],
    descripcion: 'Descripción de prueba.',
    genero: 'Pokémon semilla',
    habitat: 'grassland',
    color: 'green',
    forma: 'quadruped',
    tasaCrecimiento: 'medium-slow',
    felicidadBase: 70,
    gruposHuevo: ['monster'],
    generacion: 'generation-i',
    esLegendario: false,
    esMitico: false,
    cadenaEvolucionUrl: null,
    variedades: [],
    ...sobrescrituras,
  }
}

function crearResultadoPaginado(elementos: PokemonDetalle[]): ResultadoPaginado<PokemonDetalle> & { esAproximado: boolean } {
  return { elementos, total: elementos.length, pagina: 1, totalPaginas: 1, limite: 12, esAproximado: false }
}

beforeEach(() => {
  obtenerPaginaPokedexMock.mockReset()
})

afterEach(() => {
  vi.clearAllMocks()
})

describe('PaginaPokedex', () => {
  it('muestra el estado de carga mientras se obtienen los datos', async () => {
    obtenerPaginaPokedexMock.mockReturnValue(new Promise(() => {}))
    renderizarConProveedores(<PaginaPokedex />, '/pokedex')

    expect(await screen.findAllByLabelText(/Cargando/i)).not.toHaveLength(0)
  })

  it('renderiza el listado de Pokémon obtenidos', async () => {
    obtenerPaginaPokedexMock.mockResolvedValue(crearResultadoPaginado([crearPokemonDePrueba()]))
    renderizarConProveedores(<PaginaPokedex />, '/pokedex')

    expect(await screen.findByText('Bulbasaur')).toBeInTheDocument()
  })

  it('muestra un estado de error amigable cuando falla la consulta', async () => {
    obtenerPaginaPokedexMock.mockRejectedValue(new Error('fallo de red'))
    renderizarConProveedores(<PaginaPokedex />, '/pokedex')

    expect(await screen.findByRole('alert')).toHaveTextContent(/no se pudo cargar/i)
  })

  it('actualiza el filtro de nombre al escribir en la búsqueda global', async () => {
    const usuario = userEvent.setup()
    obtenerPaginaPokedexMock.mockResolvedValue(crearResultadoPaginado([crearPokemonDePrueba()]))
    renderizarConProveedores(<PaginaPokedex />, '/pokedex')

    await screen.findByText('Bulbasaur')
    obtenerPaginaPokedexMock.mockClear()

    const campoBusqueda = screen.getByPlaceholderText(/Buscar Pokémon por nombre/i)
    await usuario.type(campoBusqueda, 'char')

    await waitFor(() => {
      const ultimaLlamada = obtenerPaginaPokedexMock.mock.calls.at(-1)
      expect(ultimaLlamada?.[1]).toMatchObject({ nombre: 'char' })
    })
  })
})
