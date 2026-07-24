import { QueryClient } from '@tanstack/react-query'
import { ErrorPeticion } from '@/servicios/clienteHttp'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 30,
      // no tiene sentido reintentar un 4xx (404, etc.): el recurso no existe, reintentar no lo cambia
      retry: (intentosPrevios, error) => {
        if (error instanceof ErrorPeticion && error.estadoHttp && error.estadoHttp >= 400 && error.estadoHttp < 500) {
          return false
        }
        return intentosPrevios < 1
      },
      refetchOnWindowFocus: false,
    },
  },
})
