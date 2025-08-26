import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gymsData from "../data/gymsData.json";
import "../styles/Gyms.css";

function GymDetails({ isOpen, children }) {
  const ref = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const updateHeight = () => {
        setHeight(ref.current.scrollHeight);
      };

      // Actualiza altura inicial
      updateHeight();

      // Escucha carga de imágenes dentro del contenido
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

  //Animacion para la pagina
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height, opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          style={{ overflow: "hidden" }}
        >
          <div ref={ref}>{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

//Muestra los datos almacenados de los distintos gimnasios
export default function Gyms() {
  const [openCard, setOpenCard] = useState(null);

  const toggleCard = (city) => {
    setOpenCard(openCard === city ? null : city);
  };

  return (
    <div className="gyms-wrapper">
      {/*Region*/}
      {gymsData.map((region) => (
        <motion.div
          key={region.region}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2 className="region-title">{region.region}</h2>

          <div className="gyms-container">
            {region.gyms.map((gym) => (
              <motion.div
                key={gym.city}
                className="gym-card"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.2 }}
              >
                {/* Imagen */}
                <img
                  src={gym.gymImage}
                  alt={`Gimnasio de ${gym.city}`}
                  className="gym-image"
                />

                {/* Ciudad */}
                <h3>{gym.city}</h3>

                {/* Lider e imagen */}
                <GymDetails isOpen={openCard === gym.city}>
                  <p>
                    <strong>Líder:</strong>{" "}
                    {Array.isArray(gym.leader)
                      ? gym.leader.join(" / ")
                      : gym.leader}
                  </p>

                  {Array.isArray(gym.leaderImage) ? (
                    <div className="leader-image-container">
                      {gym.leaderImage.map((img, index) => (
                        <img
                          key={index}
                          src={img}
                          alt={`Líder ${gym.leader[index]} de ${gym.city}`}
                          className="leader-image"
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="leader-image-container">
                      <img
                        src={gym.leaderImage}
                        alt={`Líder ${gym.leader} de ${gym.city}`}
                        className="leader-image"
                      />
                    </div>
                  )}
                  {/* Tipo gimnasio e imagen */}
                  <p>
                    <strong>Tipo:</strong>{" "}
                    {gym.type.includes(" / ") ? (
                      gym.type
                        .split(" / ")
                        .map((tipo) => (
                          <img
                            key={tipo}
                            src={`/icons/tipos/${tipo.trim()}.png`}
                            alt={`Tipo ${tipo.trim()}`}
                            className="type-icon"
                          />
                        ))
                    ) : (
                      <img
                        src={`/icons/tipos/${gym.type.trim()}.png`}
                        alt={`Tipo ${gym.type.trim()}`}
                        className="type-icon"
                      />
                    )}
                  </p>
                  {/* Medalla gimnasio */}
                  {gym.badgeImage && (
                    <p className="gym-badge">
                      <strong>Medalla:</strong>{" "}
                      {Array.isArray(gym.badgeImage) ? (
                        gym.badgeImage.map((badge, index) => (
                          <img
                            key={index}
                            src={badge}
                            alt={`Insignia ${index + 1} de ${gym.city}`}
                            className="badge-image"
                          />
                        ))
                      ) : (
                        <img
                          src={gym.badgeImage}
                          alt={`Insignia de ${gym.city}`}
                          className="badge-image"
                        />
                      )}
                    </p>
                  )}
                </GymDetails>
                {/* Boton detalles tarjeta */}
                <button
                  className="toggle-btn"
                  onClick={() => toggleCard(gym.city)}
                >
                  {openCard === gym.city ? "Cerrar" : "Ver detalles"}
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
