export function extraerIdDeUrl(url: string): number {
  const segmentos = url.split('/').filter(Boolean)
  const ultimo = segmentos[segmentos.length - 1]
  const id = Number(ultimo)
  return Number.isNaN(id) ? 0 : id
}
