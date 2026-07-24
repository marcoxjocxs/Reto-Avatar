import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Badge from '@mui/material/Badge'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import Grid from '@mui/material/Grid'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select, { type SelectChangeEvent } from '@mui/material/Select'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import FilterListIcon from '@mui/icons-material/FilterList'
import ClearIcon from '@mui/icons-material/Clear'
import type { FiltrosPokedex } from '@/modelos/pokemon'
import { traducirTipo } from '@/constantes/coloresTipos'
import { opcionesEstadistica } from '@/constantes/opcionesFiltros'
import {
  traducirColor,
  traducirForma,
  traducirGeneracion,
  traducirGrupoHuevo,
  traducirHabitat,
} from '@/constantes/traduccionesFiltros'
import { useCatalogosFiltros } from '../hooks/useCatalogosFiltros'
import { contarFiltrosActivos } from '../utilidades/filtrosPorDefecto'

interface PanelFiltrosProps {
  filtros: FiltrosPokedex
  alCambiarFiltros: (filtros: Partial<FiltrosPokedex>) => void
  alLimpiarFiltros: () => void
}

const TODOS = '__todos__'

function valorSelectOTodos(valor: string) {
  return valor === '' ? TODOS : valor
}

export function PanelFiltros({ filtros, alCambiarFiltros, alLimpiarFiltros }: PanelFiltrosProps) {
  const filtrosActivos = contarFiltrosActivos(filtros)
  const { tipos, colores, habitats, formas, gruposHuevo, generaciones } = useCatalogosFiltros()

  const manejarCambioSelect =
    (clave: keyof FiltrosPokedex) => (evento: SelectChangeEvent) => {
      const valor = evento.target.value
      alCambiarFiltros({ [clave]: valor === TODOS ? '' : valor } as Partial<FiltrosPokedex>)
    }

  const manejarCambioBooleano =
    (clave: keyof FiltrosPokedex) => (evento: SelectChangeEvent) => {
      const valor = evento.target.value
      const traducido = valor === TODOS ? null : valor === 'si'
      alCambiarFiltros({ [clave]: traducido } as Partial<FiltrosPokedex>)
    }

  const manejarCambioNumero =
    (clave: keyof FiltrosPokedex) => (evento: React.ChangeEvent<HTMLInputElement>) => {
      const texto = evento.target.value
      alCambiarFiltros({ [clave]: texto === '' ? null : Number(texto) } as Partial<FiltrosPokedex>)
    }

  return (
    <Accordion variant="outlined" defaultExpanded sx={{ mb: 3 }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel-filtros-contenido">
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <Badge badgeContent={filtrosActivos} color="primary">
            <FilterListIcon />
          </Badge>
          <Typography variant="subtitle1" fontWeight={600}>
            Filtros
          </Typography>
        </Stack>
      </AccordionSummary>
      <AccordionDetails id="panel-filtros-contenido">
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <FormControl fullWidth size="small">
              <InputLabel id="filtro-tipo-label">Tipo</InputLabel>
              <Select
                labelId="filtro-tipo-label"
                label="Tipo"
                value={valorSelectOTodos(filtros.tipo)}
                onChange={manejarCambioSelect('tipo')}
              >
                <MenuItem value={TODOS}>Todos</MenuItem>
                {tipos.map((tipo) => (
                  <MenuItem key={tipo.name} value={tipo.name}>
                    {traducirTipo(tipo.name)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <FormControl fullWidth size="small">
              <InputLabel id="filtro-color-label">Color</InputLabel>
              <Select
                labelId="filtro-color-label"
                label="Color"
                value={valorSelectOTodos(filtros.color)}
                onChange={manejarCambioSelect('color')}
              >
                <MenuItem value={TODOS}>Todos</MenuItem>
                {colores.map((color) => (
                  <MenuItem key={color.name} value={color.name}>
                    {traducirColor(color.name)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <FormControl fullWidth size="small">
              <InputLabel id="filtro-habitat-label">Hábitat</InputLabel>
              <Select
                labelId="filtro-habitat-label"
                label="Hábitat"
                value={valorSelectOTodos(filtros.habitat)}
                onChange={manejarCambioSelect('habitat')}
              >
                <MenuItem value={TODOS}>Todos</MenuItem>
                {habitats.map((habitat) => (
                  <MenuItem key={habitat.name} value={habitat.name}>
                    {traducirHabitat(habitat.name)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <FormControl fullWidth size="small">
              <InputLabel id="filtro-generacion-label">Generación</InputLabel>
              <Select
                labelId="filtro-generacion-label"
                label="Generación"
                value={valorSelectOTodos(filtros.generacion)}
                onChange={manejarCambioSelect('generacion')}
              >
                <MenuItem value={TODOS}>Todas</MenuItem>
                {generaciones.map((gen) => (
                  <MenuItem key={gen.name} value={gen.name}>
                    {traducirGeneracion(gen.name)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <FormControl fullWidth size="small">
              <InputLabel id="filtro-forma-label">Forma</InputLabel>
              <Select
                labelId="filtro-forma-label"
                label="Forma"
                value={valorSelectOTodos(filtros.forma)}
                onChange={manejarCambioSelect('forma')}
              >
                <MenuItem value={TODOS}>Todas</MenuItem>
                {formas.map((forma) => (
                  <MenuItem key={forma.name} value={forma.name}>
                    {traducirForma(forma.name)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <FormControl fullWidth size="small">
              <InputLabel id="filtro-grupo-huevo-label">Grupo de huevo</InputLabel>
              <Select
                labelId="filtro-grupo-huevo-label"
                label="Grupo de huevo"
                value={valorSelectOTodos(filtros.grupoHuevo)}
                onChange={manejarCambioSelect('grupoHuevo')}
              >
                <MenuItem value={TODOS}>Todos</MenuItem>
                {gruposHuevo.map((grupo) => (
                  <MenuItem key={grupo.name} value={grupo.name}>
                    {traducirGrupoHuevo(grupo.name)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <FormControl fullWidth size="small">
              <InputLabel id="filtro-legendario-label">Legendario</InputLabel>
              <Select
                labelId="filtro-legendario-label"
                label="Legendario"
                value={filtros.esLegendario === null ? TODOS : filtros.esLegendario ? 'si' : 'no'}
                onChange={manejarCambioBooleano('esLegendario')}
              >
                <MenuItem value={TODOS}>Todos</MenuItem>
                <MenuItem value="si">Sí</MenuItem>
                <MenuItem value="no">No</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <FormControl fullWidth size="small">
              <InputLabel id="filtro-mitico-label">Mítico</InputLabel>
              <Select
                labelId="filtro-mitico-label"
                label="Mítico"
                value={filtros.esMitico === null ? TODOS : filtros.esMitico ? 'si' : 'no'}
                onChange={manejarCambioBooleano('esMitico')}
              >
                <MenuItem value={TODOS}>Todos</MenuItem>
                <MenuItem value="si">Sí</MenuItem>
                <MenuItem value="no">No</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 6, sm: 3 }}>
            <TextField
              fullWidth
              size="small"
              type="number"
              label="Altura mín. (m)"
              value={filtros.alturaMin ?? ''}
              onChange={manejarCambioNumero('alturaMin')}
              slotProps={{ htmlInput: { min: 0, step: 0.1 } }}
            />
          </Grid>
          <Grid size={{ xs: 6, sm: 3 }}>
            <TextField
              fullWidth
              size="small"
              type="number"
              label="Altura máx. (m)"
              value={filtros.alturaMax ?? ''}
              onChange={manejarCambioNumero('alturaMax')}
              slotProps={{ htmlInput: { min: 0, step: 0.1 } }}
            />
          </Grid>
          <Grid size={{ xs: 6, sm: 3 }}>
            <TextField
              fullWidth
              size="small"
              type="number"
              label="Peso mín. (kg)"
              value={filtros.pesoMin ?? ''}
              onChange={manejarCambioNumero('pesoMin')}
              slotProps={{ htmlInput: { min: 0, step: 0.1 } }}
            />
          </Grid>
          <Grid size={{ xs: 6, sm: 3 }}>
            <TextField
              fullWidth
              size="small"
              type="number"
              label="Peso máx. (kg)"
              value={filtros.pesoMax ?? ''}
              onChange={manejarCambioNumero('pesoMax')}
              slotProps={{ htmlInput: { min: 0, step: 0.1 } }}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <FormControl fullWidth size="small">
              <InputLabel id="filtro-estadistica-label">Estadística principal</InputLabel>
              <Select
                labelId="filtro-estadistica-label"
                label="Estadística principal"
                value={valorSelectOTodos(filtros.estadisticaPrincipal)}
                onChange={manejarCambioSelect('estadisticaPrincipal')}
              >
                <MenuItem value={TODOS}>Ninguna</MenuItem>
                {opcionesEstadistica.map((estadistica) => (
                  <MenuItem key={estadistica.valor} value={estadistica.valor}>
                    {estadistica.etiqueta}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <TextField
              fullWidth
              size="small"
              type="number"
              label="Valor mínimo"
              disabled={!filtros.estadisticaPrincipal}
              value={filtros.estadisticaMinima ?? ''}
              onChange={manejarCambioNumero('estadisticaMinima')}
              slotProps={{ htmlInput: { min: 0, max: 255 } }}
            />
          </Grid>
        </Grid>

        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            startIcon={<ClearIcon />}
            onClick={alLimpiarFiltros}
            disabled={filtrosActivos === 0}
            aria-label="Limpiar todos los filtros"
          >
            Limpiar filtros
          </Button>
        </Box>
      </AccordionDetails>
    </Accordion>
  )
}
