export async function getPokemons(limit = 10) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
  const data = await res.json();
  return data.results;
}
