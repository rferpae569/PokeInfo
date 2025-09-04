import { useEffect, useState } from "react";
import { getPokemon } from "../services/pokeapi";
import leagues from "../data/leagues.json";

export default function Leagues() {
  const [pokemonSprites, setPokemonSprites] = useState({});

  useEffect(() => {
    async function fetchSprites() {
      const sprites = {};
      for (const league of leagues) {
        for (const p of league.featuredPokemon) {
          if (!sprites[p]) {
            const data = await getPokemon(p);
            sprites[p] = data?.sprites?.front_default;
          }
        }
      }
      setPokemonSprites(sprites);
    }
    fetchSprites();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">Ligas</h2>
      <p className="mb-6">
        Aquí mostraremos todas las ligas disponibles en el universo Pokémon.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {leagues.map((league) => (
          <div
            key={league.id}
            className="bg-white shadow-lg rounded-2xl p-4 hover:scale-105 transition"
          >
            <img
              src={league.logo}
              alt={league.name}
              className="w-20 mx-auto mb-2"
            />
            <h3 className="text-xl font-bold text-center">{league.name}</h3>
            <p className="text-center text-gray-600">{league.region}</p>

            <h4 className="mt-4 font-semibold">Insignias</h4>
            <div className="grid grid-cols-4 gap-2 mt-2">
              {league.badges.map((badge, i) => (
                <img
                  key={i}
                  src={badge}
                  alt={`badge-${i}`}
                  className="w-8 h-8"
                />
              ))}
            </div>

            <h4 className="mt-4 font-semibold">Elite Four</h4>
            <ul className="list-disc list-inside text-sm">
              {league.eliteFour.map((member, i) => (
                <li key={i}>{member}</li>
              ))}
            </ul>

            <h4 className="mt-4 font-semibold">Campeón</h4>
            <p>{league.champion}</p>

            <h4 className="mt-4 font-semibold">Pokémon destacados</h4>
            <div className="flex gap-2 mt-2">
              {league.featuredPokemon.map((p) =>
                pokemonSprites[p] ? (
                  <img
                    key={p}
                    src={pokemonSprites[p]}
                    alt={p}
                    className="w-12 h-12"
                  />
                ) : (
                  <span key={p}>Cargando...</span>
                )
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

