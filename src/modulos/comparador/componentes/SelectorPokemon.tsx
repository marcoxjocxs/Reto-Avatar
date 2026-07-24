import { useMemo } from 'react'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import CircularProgress from '@mui/material/CircularProgress'
import { useSnackbar } from 'notistack'
import { useCatalogoEspecies } from '@/modulos/pokedex/hooks/useCatalogoEspecies'
import { formatearNombrePokemon } from '@/servicios/transformadores'
import { MAXIMO_POKEMON_COMPARADOR, useComparadorStore } from '@/contextos/comparadorStore'

interface OpcionPokemon {
  nombreTecnico: string
  etiqueta: string
}

export function SelectorPokemon() {
  const { data: catalogo, isLoading } = useCatalogoEspecies()
  const { enqueueSnackbar } = useSnackbar()
  const nombresSeleccionados = useComparadorStore((estado) => estado.nombresSeleccionados)
  const agregarPokemon = useComparadorStore((estado) => estado.agregarPokemon)

  const opciones = useMemo<OpcionPokemon[]>(
    () => (catalogo ?? []).map((especie) => ({ nombreTecnico: especie.nombre, etiqueta: formatearNombrePokemon(especie.nombre) })),
    [catalogo],
  )

  const comparadorCompleto = nombresSeleccionados.length >= MAXIMO_POKEMON_COMPARADOR

  return (
    <Autocomplete
      options={opciones}
      loading={isLoading}
      disabled={comparadorCompleto}
      getOptionLabel={(opcion) => opcion.etiqueta}
      getOptionDisabled={(opcion) => nombresSeleccionados.includes(opcion.nombreTecnico)}
      isOptionEqualToValue={(opcion, valor) => opcion.nombreTecnico === valor.nombreTecnico}
      value={null}
      onChange={(_evento, opcion) => {
        if (!opcion) return
        if (nombresSeleccionados.includes(opcion.nombreTecnico)) {
          enqueueSnackbar('Ese Pokémon ya está en la comparación.', { variant: 'warning' })
          return
        }
        agregarPokemon(opcion.nombreTecnico)
      }}
      renderInput={(parametros) => (
        <TextField
          {...parametros}
          label={comparadorCompleto ? `Máximo ${MAXIMO_POKEMON_COMPARADOR} Pokémon alcanzado` : 'Buscar Pokémon para comparar'}
          placeholder="Escribe un nombre…"
          slotProps={{
            input: {
              ...parametros.InputProps,
              endAdornment: (
                <>
                  {isLoading && <CircularProgress color="inherit" size={18} />}
                  {parametros.InputProps.endAdornment}
                </>
              ),
            },
          }}
        />
      )}
    />
  )
}
