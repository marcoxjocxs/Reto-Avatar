import { useCallback, useMemo, useState } from 'react'
import { useSnackbar } from 'notistack'
import Stack from '@mui/material/Stack'
import { EncabezadoPokedex } from '@/modulos/pokedex/componentes/EncabezadoPokedex'
import { TarjetasIndicadores } from '@/modulos/pokedex/componentes/TarjetasIndicadores'
import { GraficoTiposPokedex } from '@/modulos/pokedex/componentes/GraficoTiposPokedex'
import { PanelFiltros } from '@/modulos/pokedex/componentes/PanelFiltros'
import { GrillaPokemon } from '@/modulos/pokedex/componentes/GrillaPokemon'
import { PaginacionPokedex } from '@/modulos/pokedex/componentes/PaginacionPokedex'
import { DetallePokemonPanel } from '@/modulos/pokedex/componentes/DetallePokemonPanel'
import { EstadoVacio } from '@/componentes/EstadoVacio'
import { EstadoError } from '@/componentes/EstadoError'
import { useFiltrosPokedexUrl } from '@/modulos/pokedex/hooks/useFiltrosPokedexUrl'
import { usePaginaPokedex } from '@/modulos/pokedex/hooks/usePaginaPokedex'
import { useCatalogoEspecies } from '@/modulos/pokedex/hooks/useCatalogoEspecies'
import { MAXIMO_POKEMON_COMPARADOR, useComparadorStore } from '@/contextos/comparadorStore'
import { useFavoritosStore } from '@/contextos/favoritosStore'
import type { PokemonDetalle } from '@/modelos/pokemon'

export function PaginaPokedex() {
  const { filtros, pagina, limite, establecerFiltros, limpiarFiltros, establecerPagina, establecerLimite } =
    useFiltrosPokedexUrl()
  const { data, isLoading, isFetching, isError, refetch } = usePaginaPokedex(filtros, pagina, limite)
  const { data: catalogo } = useCatalogoEspecies()
  const { enqueueSnackbar } = useSnackbar()

  const nombresSeleccionados = useComparadorStore((estado) => estado.nombresSeleccionados)
  const agregarAlComparador = useComparadorStore((estado) => estado.agregarPokemon)
  const retirarDelComparador = useComparadorStore((estado) => estado.retirarPokemon)

  const nombresFavoritos = useFavoritosStore((estado) => estado.nombresFavoritos)
  const alternarFavorito = useFavoritosStore((estado) => estado.alternarFavorito)

  const [nombreSeleccionado, setNombreSeleccionado] = useState<string | null>(null)

  const tiposEncontrados = useMemo(() => {
    if (!data) return null
    return new Set(data.elementos.flatMap((p) => p.tipos)).size
  }, [data])

  const manejarVerDetalle = useCallback((pokemon: PokemonDetalle) => {
    setNombreSeleccionado(pokemon.nombreTecnico)
  }, [])

  const manejarAlternarComparador = useCallback(
    (pokemon: PokemonDetalle) => {
      if (nombresSeleccionados.includes(pokemon.nombreTecnico)) {
        retirarDelComparador(pokemon.nombreTecnico)
        return
      }
      if (nombresSeleccionados.length >= MAXIMO_POKEMON_COMPARADOR) {
        enqueueSnackbar(`Ya alcanzaste el máximo de ${MAXIMO_POKEMON_COMPARADOR} Pokémon en el comparador.`, { variant: 'warning' })
        return
      }
      agregarAlComparador(pokemon.nombreTecnico)
      enqueueSnackbar(`${pokemon.nombre} se agregó al comparador.`, { variant: 'success' })
    },
    [nombresSeleccionados, agregarAlComparador, retirarDelComparador, enqueueSnackbar],
  )

  const manejarAlternarFavorito = useCallback(
    (pokemon: PokemonDetalle) => {
      alternarFavorito(pokemon.nombreTecnico)
    },
    [alternarFavorito],
  )

  const manejarSorpresa = useCallback(() => {
    if (!catalogo || catalogo.length === 0) return
    const aleatorio = catalogo[Math.floor(Math.random() * catalogo.length)]
    if (aleatorio) setNombreSeleccionado(aleatorio.nombre)
  }, [catalogo])

  return (
    <Stack spacing={3}>
      <EncabezadoPokedex
        valorBusqueda={filtros.nombre}
        sorpresaDeshabilitada={!catalogo || catalogo.length === 0}
        alBuscar={(texto) => establecerFiltros({ nombre: texto })}
        alPresionarSorpresa={manejarSorpresa}
      />

      <TarjetasIndicadores
        totalEspecies={catalogo?.length ?? null}
        tiposEncontrados={tiposEncontrados}
        pokemonEnPagina={data?.elementos.length ?? null}
        pokemonEnComparador={nombresSeleccionados.length}
      />

      <GraficoTiposPokedex pokemones={data?.elementos ?? []} />

      <PanelFiltros filtros={filtros} alCambiarFiltros={establecerFiltros} alLimpiarFiltros={limpiarFiltros} />

      {isError && <EstadoError mensaje="No se pudo cargar el listado de Pokémon." alReintentar={() => refetch()} />}

      {!isError && data && data.elementos.length === 0 && !isLoading && (
        <EstadoVacio
          descripcion="No hay Pokémon que coincidan con los filtros seleccionados."
          textoAccion="Limpiar filtros"
          alPresionarAccion={limpiarFiltros}
        />
      )}

      {!isError && (isLoading || (data && data.elementos.length > 0)) && (
        <GrillaPokemon
          pokemones={data?.elementos ?? []}
          cargando={isLoading}
          cantidadEsqueletos={limite}
          nombresComparador={nombresSeleccionados}
          nombresFavoritos={nombresFavoritos}
          alVerDetalle={manejarVerDetalle}
          alAlternarComparador={manejarAlternarComparador}
          alAlternarFavorito={manejarAlternarFavorito}
        />
      )}

      {!isError && data && data.elementos.length > 0 && (
        <PaginacionPokedex
          pagina={pagina}
          totalPaginas={data.totalPaginas}
          limite={limite}
          total={data.total}
          esAproximado={data.esAproximado}
          deshabilitado={isFetching}
          alCambiarPagina={establecerPagina}
          alCambiarLimite={establecerLimite}
        />
      )}

      <DetallePokemonPanel
        nombreTecnico={nombreSeleccionado}
        abierto={Boolean(nombreSeleccionado)}
        alCerrar={() => setNombreSeleccionado(null)}
      />
    </Stack>
  )
}
