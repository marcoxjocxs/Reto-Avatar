import { useMemo } from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import BarChartIcon from '@mui/icons-material/BarChart'
import Stack from '@mui/material/Stack'
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import type { PokemonDetalle } from '@/modelos/pokemon'
import { obtenerColorTipo, traducirTipo } from '@/constantes/coloresTipos'

interface GraficoTiposPokedexProps {
  pokemones: PokemonDetalle[]
}

export function GraficoTiposPokedex({ pokemones }: GraficoTiposPokedexProps) {
  const datos = useMemo(() => {
    const conteo = new Map<string, number>()
    for (const pokemon of pokemones) {
      for (const tipo of pokemon.tipos) {
        conteo.set(tipo, (conteo.get(tipo) ?? 0) + 1)
      }
    }
    return Array.from(conteo.entries())
      .map(([tipo, cantidad]) => ({ tipo, nombre: traducirTipo(tipo), cantidad }))
      .sort((a, b) => b.cantidad - a.cantidad)
  }, [pokemones])

  return (
    <Accordion variant="outlined" defaultExpanded>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel-grafico-tipos-contenido">
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <BarChartIcon color="action" />
          <Typography variant="subtitle1" fontWeight={600}>
            Distribución por tipo en la página actual
          </Typography>
        </Stack>
      </AccordionSummary>
      <AccordionDetails id="panel-grafico-tipos-contenido">
        {datos.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            No hay datos suficientes para graficar.
          </Typography>
        ) : (
          <Box sx={{ width: '100%', height: 280 }}>
            <ResponsiveContainer>
              <BarChart data={datos} margin={{ top: 8, right: 16, left: -16, bottom: 8 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="nombre" tick={{ fontSize: 12 }} interval={0} angle={-30} textAnchor="end" height={60} />
                <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                <Tooltip
                  formatter={(valor) => [`${valor} Pokémon`, 'Cantidad']}
                  contentStyle={{ borderRadius: 8 }}
                />
                <Bar dataKey="cantidad" radius={[6, 6, 0, 0]}>
                  {datos.map((entrada) => (
                    <Cell key={entrada.tipo} fill={obtenerColorTipo(entrada.tipo)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Box>
        )}
      </AccordionDetails>
    </Accordion>
  )
}
