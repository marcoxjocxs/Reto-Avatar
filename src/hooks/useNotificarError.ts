import { useSnackbar } from 'notistack'
import { useCallback } from 'react'
import { ErrorPeticion } from '@/servicios/clienteHttp'

export function useNotificarError() {
  const { enqueueSnackbar } = useSnackbar()

  return useCallback(
    (error: unknown, mensajePorDefecto = 'Ocurrió un error inesperado. Intenta nuevamente.') => {
      const mensaje = error instanceof ErrorPeticion ? error.message : mensajePorDefecto
      enqueueSnackbar(mensaje, { variant: 'error' })
    },
    [enqueueSnackbar],
  )
}
