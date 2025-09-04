import { useEffect, useState } from "react";
import { getPokemon } from "../services/pokeapi";
import leagues from "../data/leagues.json";
import "../styles/Leagues.css";

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
    <div className="leagues-container">
      <h2 className="leagues-title">Ligas</h2>
      <p className="leagues-description">
        Aquí mostraremos todas las ligas disponibles en el universo Pokémon.
      </p>

      <div className="leagues-grid">
        {leagues.map((league) => (
          <div key={league.id} className="league-card">
            <h3 className="league-name">{league.name}</h3>
            <p className="league-region">{league.region}</p>

            {/* Insignias */}
            <h4 className="league-subtitle">Insignias para acceder</h4>
            <div className="badges-grid">
              {league.badges.map((badge, i) => (
                <img key={i} src={badge} alt={`badge-${i}`} className="badge" />
              ))}
            </div>

            {/* Elite Four */}
            <h4 className="league-subtitle">Elite Four</h4>
            <div className="trainers-grid">
              {league.eliteFour.map((member, i) => (
                <div key={i} className="trainer-card">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="trainer-img"
                  />
                  <p className="trainer-name">{member.name}</p>
                </div>
              ))}
            </div>

            {/* Campeón */}
            <h4 className="league-subtitle">Campeón</h4>
            <div className="trainer-champion">
              <img
                src={league.champion.image}
                alt={league.champion.name}
                className="trainer-img champion"
              />
              <p className="trainer-name">{league.champion.name}</p>
            </div>

            {/* Pokémon destacados */}
            <h4 className="league-subtitle">Pokémon destacados</h4>
            <div className="featured-pokemon">
              {league.featuredPokemon.map((p) =>
                pokemonSprites[p] ? (
                  <img
                    key={p}
                    src={pokemonSprites[p]}
                    alt={p}
                    className="pokemon-sprite"
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
