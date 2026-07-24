import { useEffect, useState } from 'react'

export function useDebounce<T>(valor: T, retrasoMs = 400): T {
  const [valorDiferido, setValorDiferido] = useState(valor)

  useEffect(() => {
    const temporizador = setTimeout(() => setValorDiferido(valor), retrasoMs)
    return () => clearTimeout(temporizador)
  }, [valor, retrasoMs])

  return valorDiferido
}
