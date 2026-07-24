export function obtenerImagenPokemon(id: number, sprites?: {
  front_default: string | null
  other?: { ['official-artwork']?: { front_default: string | null } }
}): { imagenUrl: string; imagenRespaldoUrl: string } {
  const artworkOficial = sprites?.other?.['official-artwork']?.front_default
  const spriteBase = sprites?.front_default
  const respaldoGenerico = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`

  return {
    imagenUrl: artworkOficial || spriteBase || respaldoGenerico,
    imagenRespaldoUrl: spriteBase || respaldoGenerico,
  }
}
