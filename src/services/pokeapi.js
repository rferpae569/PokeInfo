// Obtiene un pokemon específico (por id o nombre)
export async function getPokemon(pokemon) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  if (!res.ok) return null;
  return await res.json();
}
