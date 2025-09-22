import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getPokemon } from "../services/pokeapi";
import "../styles/Overlay.css";

export default function Overlay({ isOpen, onClose, data, type }) {
  const title = type === "leader" ? data?.name : data?.nameJP || data?.name;

  // --- Estado para recoger los datos de los pokemon de la API ---
  const [team, setTeam] = useState([]);

  useEffect(() => {
    if (!data?.team?.length) {
      setTeam([]);
      return;
    }

    async function fetchTeam() {
      const results = await Promise.all(
        data.team.map(async (p) => await getPokemon(p))
      );
      setTeam(results.filter(Boolean));
    }

    fetchTeam();
  }, [data]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key={data?.name || "overlay"}
          className={`overlay ${type}-overlay`}
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <button className="close-overlay-btn" onClick={onClose}>
            X
          </button>

          {data && (
            <div className={`${type}-overlay-content`}>
              <img
                src={data.image || data.leader?.image}
                alt={data.name || data.leader?.name}
                className={`${type}-overlay-img`}
              />
              <h2>{title}</h2>

              <table className={`${type}-overlay-table`}>
                <tbody>
                  {data.description && (
                    <tr>
                      <td colSpan={2}>
                        <em>{data.description}</em>
                      </td>
                    </tr>
                  )}
                  <tr>
                    <td>Sexo:</td>
                    <td>{data.sex || data.leader?.sex}</td>
                  </tr>
                  <tr>
                    <td>Ciudad:</td>
                    <td>{data.home || data.leader?.home}</td>
                  </tr>
                  <tr>
                    <td>Región:</td>
                    <td>{data.region || data.leader?.region}</td>
                  </tr>
                  <tr>
                    <td>Tipo:</td>
                    <td>{data.type || data.leader?.type}</td>
                  </tr>
                </tbody>
              </table>

              {/* Sección de equipo Pokémon */}
              {team.length > 0 && (
                <div className="pokemon-team">
                  <h3>Equipo Pokémon</h3>
                  <div className="pokemon-team-list">
                    {team.map((poke) => (
                      <div key={poke.id} className="pokemon-card">
                        <img
                          src={poke.sprites.front_default}
                          alt={poke.name}
                          className="pokemon-sprite"
                        />
                        <span>{poke.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}


