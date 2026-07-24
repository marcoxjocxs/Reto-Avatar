import Box from '@mui/material/Box'
import {
  Legend,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import type { EstadisticaPokemon } from '@/modelos/pokemon'
import { traducirEstadistica } from '@/constantes/etiquetasEstadisticas'

interface SeriePokemon {
  nombre: string
  color: string
  estadisticas: EstadisticaPokemon[]
}

interface GraficoRadarEstadisticasProps {
  series: SeriePokemon[]
  altura?: number
}

export function GraficoRadarEstadisticas({ series, altura = 300 }: GraficoRadarEstadisticasProps) {
  const primeraSerie = series[0]?.estadisticas ?? []
  const datos = primeraSerie.map((estadistica, indice) => {
    const fila: Record<string, string | number> = {
      estadistica: traducirEstadistica(estadistica.nombre),
    }
    series.forEach((serie) => {
      fila[serie.nombre] = serie.estadisticas[indice]?.valor ?? 0
    })
    return fila
  })

  return (
    <Box sx={{ width: '100%', height: altura }}>
      <ResponsiveContainer>
        <RadarChart data={datos} outerRadius="75%">
          <PolarGrid />
          <PolarAngleAxis dataKey="estadistica" tick={{ fontSize: 12 }} />
          <PolarRadiusAxis angle={30} domain={[0, 255]} tick={{ fontSize: 10 }} />
          {series.map((serie) => (
            <Radar
              key={serie.nombre}
              name={serie.nombre}
              dataKey={serie.nombre}
              stroke={serie.color}
              fill={serie.color}
              fillOpacity={0.25}
            />
          ))}
          <Tooltip contentStyle={{ borderRadius: 8 }} />
          {series.length > 1 && <Legend />}
        </RadarChart>
      </ResponsiveContainer>
    </Box>
  )
}
