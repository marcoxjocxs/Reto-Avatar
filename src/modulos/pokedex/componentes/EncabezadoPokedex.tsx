import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'
import ShuffleIcon from '@mui/icons-material/Shuffle'
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon'
import { BotonModoColor } from '@/componentes/BotonModoColor'
import { useDebounce } from '@/hooks/useDebounce'

interface FormularioBusqueda {
  busqueda: string
}

interface EncabezadoPokedexProps {
  valorBusqueda: string
  sorpresaDeshabilitada?: boolean
  alBuscar: (texto: string) => void
  alPresionarSorpresa: () => void
}

export function EncabezadoPokedex({
  valorBusqueda,
  sorpresaDeshabilitada = false,
  alBuscar,
  alPresionarSorpresa,
}: EncabezadoPokedexProps) {
  const { register, watch } = useForm<FormularioBusqueda>({ defaultValues: { busqueda: valorBusqueda } })
  const textoBuscado = watch('busqueda')
  const textoConDebounce = useDebounce(textoBuscado, 400)

  useEffect(() => {
    if (textoConDebounce !== valorBusqueda) {
      alBuscar(textoConDebounce ?? '')
    }
    // no reaccionar a cambios de valorBusqueda/alBuscar, solo al texto con debounce
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [textoConDebounce])

  return (
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      justifyContent="space-between"
      alignItems={{ xs: 'stretch', md: 'center' }}
      spacing={2}
      sx={{ mb: 3 }}
    >
      <Stack direction="row" alignItems="center" spacing={2}>
        <Avatar sx={{ bgcolor: 'primary.main', width: 48, height: 48 }}>
          <CatchingPokemonIcon />
        </Avatar>
        <Stack>
          <Typography variant="h4" component="h1" fontWeight={700}>
            Pokédex
          </Typography>
        </Stack>
      </Stack>

      <Stack direction="row" spacing={1} alignItems="center" sx={{ width: { xs: '100%', md: 'auto' } }}>
        <TextField
          {...register('busqueda')}
          size="small"
          placeholder="Buscar Pokémon por nombre…"
          aria-label="Buscar Pokémon por nombre"
          sx={{ flexGrow: { xs: 1, md: 0 }, minWidth: { xs: 0, sm: 260 } }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            },
          }}
        />
        <Tooltip title="Pokémon sorpresa">
          <span>
            <IconButton
              onClick={alPresionarSorpresa}
              disabled={sorpresaDeshabilitada}
              aria-label="Ver un Pokémon aleatorio"
              color="primary"
            >
              <ShuffleIcon />
            </IconButton>
          </span>
        </Tooltip>
        {/* En móvil el tema ya se controla desde la barra superior; aquí solo duplicaría el botón */}
        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          <BotonModoColor />
        </Box>
      </Stack>
    </Stack>
  )
}
