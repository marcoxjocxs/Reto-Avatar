import axios from 'axios'
import { TIEMPO_ESPERA_PETICION_MS, urlBaseApi } from '@/configuracion/entorno'

export const clienteHttp = axios.create({
  baseURL: urlBaseApi,
  timeout: TIEMPO_ESPERA_PETICION_MS,
})

export class ErrorPeticion extends Error {
  readonly estadoHttp?: number

  constructor(message: string, estadoHttp?: number) {
    super(message)
    this.name = 'ErrorPeticion'
    this.estadoHttp = estadoHttp
  }
}

clienteHttp.interceptors.response.use(
  (respuesta) => respuesta,
  (error) => {
    // una cancelación no es un error real: se deja pasar tal cual para que
    // axios.isCancel() y TanStack Query la sigan reconociendo más adelante
    if (axios.isCancel(error)) {
      return Promise.reject(error)
    }
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNABORTED') {
        return Promise.reject(new ErrorPeticion('La solicitud tardó demasiado tiempo. Intenta nuevamente.'))
      }
      if (!error.response) {
        return Promise.reject(new ErrorPeticion('No se pudo conectar con el servidor. Verifica tu conexión.'))
      }
      if (error.response.status === 404) {
        return Promise.reject(new ErrorPeticion('El recurso solicitado no existe.', 404))
      }
      return Promise.reject(
        new ErrorPeticion('Ocurrió un error al comunicarse con PokéAPI.', error.response.status),
      )
    }
    return Promise.reject(new ErrorPeticion('Ocurrió un error inesperado.'))
  },
)
