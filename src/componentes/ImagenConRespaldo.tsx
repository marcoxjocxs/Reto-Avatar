import { useState } from 'react'
import Box from '@mui/material/Box'
import ImageNotSupportedOutlinedIcon from '@mui/icons-material/ImageNotSupportedOutlined'

interface ImagenConRespaldoProps {
  src: string
  srcRespaldo?: string
  alt: string
  alto?: number | string
}

export function ImagenConRespaldo({ src, srcRespaldo, alt, alto = 160 }: ImagenConRespaldoProps) {
  const [intento, setIntento] = useState<'principal' | 'respaldo' | 'fallido'>('principal')

  if (intento === 'fallido') {
    return (
      <Box
        sx={{
          height: alto,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'text.disabled',
        }}
        role="img"
        aria-label={`Imagen no disponible para ${alt}`}
      >
        <ImageNotSupportedOutlinedIcon fontSize="large" />
      </Box>
    )
  }

  return (
    <Box
      component="img"
      src={intento === 'principal' ? src : srcRespaldo}
      alt={alt}
      loading="lazy"
      onError={() => setIntento((actual) => (actual === 'principal' && srcRespaldo ? 'respaldo' : 'fallido'))}
      sx={{
        height: alto,
        width: '100%',
        objectFit: 'contain',
        display: 'block',
      }}
    />
  )
}
