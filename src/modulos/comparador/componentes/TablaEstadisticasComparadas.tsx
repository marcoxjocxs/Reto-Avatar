import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import Stack from '@mui/material/Stack'
import type { PokemonDetalle } from '@/modelos/pokemon'
import { traducirEstadistica } from '@/constantes/etiquetasEstadisticas'

interface TablaEstadisticasComparadasProps {
  pokemones: PokemonDetalle[]
  coloresSerie: string[]
}

export function TablaEstadisticasComparadas({ pokemones, coloresSerie }: TablaEstadisticasComparadasProps) {
  const nombresEstadisticas = pokemones[0]?.estadisticas.map((e) => e.nombre) ?? []

  return (
    <TableContainer component={Paper} variant="outlined">
      <Table size="small" aria-label="Tabla comparativa de estadísticas base">
        <TableHead>
          <TableRow>
            <TableCell>Estadística</TableCell>
            {pokemones.map((pokemon, indice) => (
              <TableCell key={pokemon.id} align="center" sx={{ color: coloresSerie[indice], fontWeight: 700 }}>
                {pokemon.nombre}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {nombresEstadisticas.map((nombreEstadistica) => {
            const valores = pokemones.map(
              (pokemon) => pokemon.estadisticas.find((e) => e.nombre === nombreEstadistica)?.valor ?? 0,
            )
            const valorMaximo = Math.max(...valores)

            return (
              <TableRow key={nombreEstadistica}>
                <TableCell component="th" scope="row">
                  {traducirEstadistica(nombreEstadistica)}
                </TableCell>
                {valores.map((valor, indice) => (
                  <TableCell key={pokemones[indice]!.id} align="center">
                    <Stack direction="row" spacing={0.5} justifyContent="center" alignItems="center">
                      <span>{valor}</span>
                      {valor === valorMaximo && valorMaximo > 0 && (
                        <EmojiEventsIcon fontSize="small" color="warning" aria-label="Estadística más alta" />
                      )}
                    </Stack>
                  </TableCell>
                ))}
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
