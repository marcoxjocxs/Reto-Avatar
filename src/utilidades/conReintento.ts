import axios from 'axios'
import { LIMITE_INTENTOS_PETICION } from '@/configuracion/entorno'
import { ErrorPeticion } from '@/servicios/clienteHttp'

function esErrorNoReintentable(error: unknown): boolean {
  if (axios.isCancel(error)) return true
  // un 4xx (404, 400, etc.) es un fallo del cliente: reintentar no lo va a arreglar
  if (error instanceof ErrorPeticion && error.estadoHttp && error.estadoHttp >= 400 && error.estadoHttp < 500) {
    return true
  }
  return false
}

export async function conReintento<T>(
  tarea: () => Promise<T>,
  intentosRestantes = LIMITE_INTENTOS_PETICION,
): Promise<T> {
  try {
    return await tarea()
  } catch (error) {
    if (esErrorNoReintentable(error) || intentosRestantes <= 0) {
      throw error
    }
    return conReintento(tarea, intentosRestantes - 1)
  }
}
