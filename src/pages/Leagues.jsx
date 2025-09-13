import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { getPokemon } from "../services/pokeapi";
import leagues from "../data/leagues.json";
import "../styles/Leagues.css";

// Componente reutilizable para expandir/colapsar con altura dinámica
function LeagueDetails({ isOpen, children }) {
  const ref = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const updateHeight = () => {
        setHeight(ref.current.scrollHeight);
      };

      updateHeight();

      const images = ref.current.querySelectorAll("img");
      images.forEach((img) => {
        if (!img.complete) {
          img.addEventListener("load", updateHeight);
        }
      });

      return () => {
        images.forEach((img) => img.removeEventListener("load", updateHeight));
      };
    }
  }, [children, isOpen]);

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={isOpen ? { height, opacity: 1 } : { height: 0, opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      style={{ overflow: "hidden" }}
    >
      <div ref={ref}>{children}</div>
    </motion.div>
  );
}

export default function Leagues() {
  const [pokemonSprites, setPokemonSprites] = useState({});
  const [openCard, setOpenCard] = useState(null);

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

  const toggleCard = (id) => {
    setOpenCard(openCard === id ? null : id);
  };

  return (
    <div className="leagues-container">
      <motion.h2
        className="leagues-title"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Ligas
      </motion.h2>

      <motion.p
        className="leagues-description"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        Aquí mostraremos todas las ligas disponibles en el universo Pokémon.
      </motion.p>

      <div className="leagues-grid">
        {leagues.map((league, index) => (
          <motion.div
            key={league.id}
            className="league-card"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <h3 className="league-name">{league.name}</h3>
            <p className="league-region">{league.region}</p>

            {/* Contenido colapsable */}
            <LeagueDetails isOpen={openCard === league.id}>
              {/* Acceso */}
              <h4 className="league-subtitle">Acceso</h4>
              {league.badges && league.badges.length > 0 ? (
                <div className="badges-grid">
                  {league.badges.map((badge, i) => (
                    <img
                      key={i}
                      src={badge}
                      alt={`badge-${i}`}
                      className="badge"
                    />
                  ))}
                </div>
              ) : league.accessText ? (
                <p className="league-access-text">{league.accessText}</p>
              ) : (
                <p className="league-access-text">Requisito desconocido</p>
              )}

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

              {/* Campeones */}
              <h4 className="league-subtitle">Campeón</h4>
              <div className="trainers-grid">
                {(league.champions || [league.champion]).map((champion, i) => (
                  <div key={i} className="trainer-card">
                    <img
                      src={champion.image}
                      alt={champion.name}
                      className="trainer-img champion"
                    />
                    <p className="trainer-name">{champion.name}</p>
                  </div>
                ))}
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
            </LeagueDetails>

            {/* Botón inscribirse */}
            <button
              className="league-button"
              onClick={() => toggleCard(league.id)}
            >
              {openCard === league.id ? "Cerrar" : "Inscribirse"}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
