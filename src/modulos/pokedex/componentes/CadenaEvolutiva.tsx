import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import Box from '@mui/material/Box'
import type { CadenaEvolucion } from '@/modelos/pokemon'
import { ImagenConRespaldo } from '@/componentes/ImagenConRespaldo'

interface CadenaEvolutivaProps {
  cadena: CadenaEvolucion
  idActual: number
}

const ETIQUETAS_DISPARADOR: Record<string, string> = {
  'level-up': 'subir de nivel',
  trade: 'intercambio',
  'use-item': 'usar objeto',
  shed: 'condiciones especiales',
}

export function CadenaEvolutiva({ cadena, idActual }: CadenaEvolutivaProps) {
  if (cadena.etapas.length <= 1) {
    return (
      <Typography variant="body2" color="text.secondary">
        Este Pokémon no tiene evoluciones registradas.
      </Typography>
    )
  }

  return (
    <Stack direction="row" flexWrap="wrap" alignItems="center" gap={1.5} useFlexGap>
      {cadena.etapas.map((etapa, indiceEtapa) => (
        <Stack key={indiceEtapa} direction="row" alignItems="center" gap={1.5}>
          <Stack direction="row" flexWrap="wrap" gap={1}>
            {etapa.map((eslabon) => (
              <Stack
                key={eslabon.id}
                alignItems="center"
                sx={{
                  p: 1,
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: eslabon.id === idActual ? 'primary.main' : 'divider',
                  backgroundColor: eslabon.id === idActual ? 'action.selected' : 'transparent',
                  minWidth: 96,
                }}
              >
                <Box sx={{ width: 72, height: 72 }}>
                  <ImagenConRespaldo src={eslabon.imagenUrl} alt={eslabon.nombre} alto={72} />
                </Box>
                <Typography variant="caption" fontWeight={600}>
                  {eslabon.nombre}
                </Typography>
                {eslabon.minNivel && (
                  <Typography variant="caption" color="text.secondary">
                    Nv. {eslabon.minNivel}
                  </Typography>
                )}
              </Stack>
            ))}
          </Stack>
          {indiceEtapa < cadena.etapas.length - 1 && (
            <Stack alignItems="center" sx={{ color: 'text.disabled' }}>
              <ArrowForwardIcon />
              {cadena.etapas[indiceEtapa + 1]?.[0]?.disparador && (
                <Typography variant="caption" sx={{ maxWidth: 80, textAlign: 'center' }}>
                  {ETIQUETAS_DISPARADOR[cadena.etapas[indiceEtapa + 1]![0]!.disparador ?? ''] ??
                    cadena.etapas[indiceEtapa + 1]![0]!.disparador}
                </Typography>
              )}
            </Stack>
          )}
        </Stack>
      ))}
    </Stack>
  )
}
