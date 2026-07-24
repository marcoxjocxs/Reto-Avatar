import Stack from '@mui/material/Stack'
import Pagination from '@mui/material/Pagination'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import { opcionesElementosPorPagina } from '@/constantes/opcionesFiltros'

interface PaginacionPokedexProps {
  pagina: number
  totalPaginas: number
  limite: number
  total: number
  esAproximado: boolean
  deshabilitado?: boolean
  alCambiarPagina: (pagina: number) => void
  alCambiarLimite: (limite: number) => void
}

export function PaginacionPokedex({
  pagina,
  totalPaginas,
  limite,
  total,
  esAproximado,
  deshabilitado = false,
  alCambiarPagina,
  alCambiarLimite,
}: PaginacionPokedexProps) {
  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      justifyContent="space-between"
      alignItems="center"
      spacing={2}
      sx={{ mt: 3 }}
    >
      <Typography variant="body2" color="text.secondary">
        {esAproximado ? 'Aproximadamente ' : ''}
        {total.toLocaleString('es')} resultados · Página {pagina} de {totalPaginas}
      </Typography>

      <Pagination
        page={pagina}
        count={totalPaginas}
        onChange={(_evento, valor) => alCambiarPagina(valor)}
        color="primary"
        shape="rounded"
        siblingCount={1}
        disabled={deshabilitado}
      />

      <FormControl size="small" sx={{ minWidth: 140 }} disabled={deshabilitado}>
        <InputLabel id="etiqueta-elementos-pagina">Por página</InputLabel>
        <Select
          labelId="etiqueta-elementos-pagina"
          label="Por página"
          value={limite}
          onChange={(evento) => alCambiarLimite(Number(evento.target.value))}
        >
          {opcionesElementosPorPagina.map((opcion) => (
            <MenuItem key={opcion} value={opcion}>
              {opcion} por página
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  )
}
