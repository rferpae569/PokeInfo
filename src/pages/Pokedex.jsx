import { useEffect, useState } from "react";
import { getPokemons } from "../services/pokeapi";

export default function Pokedex() {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    getPokemons(12).then(setPokemons);
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">Pokédex</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {pokemons.map((p, index) => (
          <div key={index} className="border p-4 rounded shadow bg-white">
            <h3 className="capitalize font-semibold">{p.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
