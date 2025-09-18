import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getPokemon } from "../services/pokeapi";
import leagues from "../data/leagues.json";
import eliteFourData from "../data/elitefour.json";
import championsData from "../data/champions.json";
import fase1 from "../data/fase1.json";
import fase2 from "../data/fase2.json";
import fase3 from "../data/fase3.json";
import "../styles/Leagues.css";

// Componente reutilizable para expandir/colapsar con altura dinámica
function LeagueDetails({ isOpen, children }) {
  const ref = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const updateHeight = () => setHeight(ref.current.scrollHeight);

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
  const [selectedTrainer, setSelectedTrainer] = useState(null);

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

  // Función para abrir overlay del Elite Four o Campeón
  const handleTrainerClick = (leagueName, type, index = 0) => {
    let trainer = null;

    if (type === "eliteFour") {
      const league = eliteFourData.find((l) => l.league === leagueName);
      if (league) trainer = league.EliteFour[index];
    } else if (type === "champion") {
      // Traer todos los campeones de esa liga
      const leagueChampions = championsData
        .filter((l) => l.league === leagueName) // varios objetos posibles
        .flatMap((l) => l.Champion); // aplanamos en un único array

      if (leagueChampions.length > 0) {
        trainer = leagueChampions[index];
      }
    }

    if (trainer) setSelectedTrainer(trainer);
  };

  // useEffect para bloquear scroll si estas activado el overlay
  useEffect(() => {
    if (selectedTrainer) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    };
  }, [selectedTrainer]);

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
                {league.eliteFour.map((member, i) => {
                  // Busca los datos completos en los datos de EliteFour
                  const fullData = eliteFourData.find(
                    (l) => l.league === league.name
                  )?.EliteFour[i];

                  return (
                    <div
                      key={i}
                      className="trainer-card"
                      onClick={() =>
                        handleTrainerClick(league.name, "eliteFour", i)
                      }
                    >
                      <img
                        src={member.image}
                        alt={member.name}
                        className="trainer-img"
                      />
                      <p className="trainer-name">{member.name}</p>
                    </div>
                  );
                })}
              </div>

              {/* Campeón */}
              <h4 className="league-subtitle">Campeón</h4>
              <div className="trainers-grid">
                {league.champion ? (
                  // Con un solo campeón
                  <div
                    className="trainer-card"
                    onClick={() =>
                      handleTrainerClick(league.name, "champion", 0)
                    }
                  >
                    <img
                      src={league.champion.image}
                      alt={league.champion.name}
                      className="trainer-img champion"
                    />
                    <p className="trainer-name">{league.champion.name}</p>
                  </div>
                ) : league.champions ? (
                  // Con varios campeones
                  league.champions.map((champ, i) => (
                    <div
                      key={i}
                      className="trainer-card"
                      onClick={() =>
                        handleTrainerClick(league.name, "champion", i)
                      }
                    >
                      <img
                        src={champ.image}
                        alt={champ.name}
                        className="trainer-img champion"
                      />
                      <p className="trainer-name">{champ.name}</p>
                    </div>
                  ))
                ) : (
                  <p>No hay campeón registrado</p>
                )}
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

            <button
              className="league-button"
              onClick={() => toggleCard(league.id)}
            >
              {openCard === league.id ? "Cerrar" : "Inscribirse"}
            </button>
          </motion.div>
        ))}
      </div>

      {/* Apartado especial: Copa de Campeones de Galar */}
      <motion.div
        className="galar-tournament"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="tournament-title">Liga Pokémon de Galar</h2>
        <p className="tournament-description">
          Este torneo se desarrolla en varias fases donde los entrenadores se
          enfrentan hasta llegar al campeón.
        </p>

        {/* Fase 1 */}
        <motion.div
          className="tournament-phase"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3>Fase 1: Torneo de Medallistas</h3>
          <div className="tournament-grid">
            {fase1.map((trainer, i) => (
              <motion.div
                key={i}
                className="tournament-card"
                onClick={() => setSelectedTrainer(trainer)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.2 }}
              >
                <img
                  src={trainer.image}
                  alt={trainer.name}
                  className="tournament-img"
                />
                <p className="tournament-name">{trainer.name}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Fase 2 */}
        <motion.div
          className="tournament-phase"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3>Fase 2: Torneo de Finalistas</h3>
          <div className="tournament-grid">
            {fase2.map((trainer, i) => (
              <motion.div
                key={i}
                className="tournament-card"
                onClick={() => setSelectedTrainer(trainer)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.2 }}
              >
                <img
                  src={trainer.image}
                  alt={trainer.name}
                  className="tournament-img"
                />
                <p className="tournament-name">{trainer.name}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Fase 3 */}
        <motion.div
          className="tournament-phase"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3>Fase 3: Encuentro de Campeones</h3>
          <div className="tournament-grid">
            {fase3.map((trainer, i) => (
              <motion.div
                key={i}
                className="tournament-card"
                onClick={() => setSelectedTrainer(trainer)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.2 }}
              >
                <img
                  src={trainer.image}
                  alt={trainer.name}
                  className="tournament-img"
                />
                <p className="tournament-name">{trainer.name}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Overlay de entrenador */}
      <AnimatePresence>
        {selectedTrainer && (
          <motion.div
            className="trainer-overlay"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <button
              className="close-overlay-btn"
              onClick={() => setSelectedTrainer(null)}
            >
              X
            </button>

            <div className="trainer-overlay-content">
              <img
                src={selectedTrainer.image}
                alt={selectedTrainer.name}
                className="trainer-overlay-img"
              />
              <h2>{selectedTrainer.nameJP}</h2>

              <table className="trainer-overlay-table">
                <tbody>
                  <tr>
                    <td>Sexo:</td>
                    <td>{selectedTrainer.sex}</td>
                  </tr>
                  <tr>
                    <td>Ciudad:</td>
                    <td>{selectedTrainer.home}</td>
                  </tr>
                  <tr>
                    <td>Región:</td>
                    <td>{selectedTrainer.region}</td>
                  </tr>
                  <tr>
                    <td>Tipo:</td>
                    <td>{selectedTrainer.type}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
