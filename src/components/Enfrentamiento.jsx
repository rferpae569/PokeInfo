import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/Enfrentamiento.css";

export default function Enfrentamiento({ TYPES, TYPE_DETAILS }) {
  const [slot1, setSlot1] = useState(null);
  const [slot2, setSlot2] = useState(null);
  const [resultado, setResultado] = useState(null);
  const [ganadorInfo, setGanadorInfo] = useState(null);

  // ✅ Datos de ventajas y debilidades
  const TYPE_MATCHUPS = {
    Acero: {
      icon: "/icons/tipos/Acero.png",
      ventajas: ["Hada", "Hielo", "Roca"],
      debilidades: ["Fuego", "Lucha", "Tierra"],
    },
    Agua: {
      icon: "/icons/tipos/Agua.png",
      ventajas: ["Fuego", "Tierra", "Roca"],
      debilidades: ["Eléctrico", "Planta"],
    },
    Bicho: {
      icon: "/icons/tipos/Bicho.png",
      ventajas: ["Planta", "Psíquico", "Siniestro"],
      debilidades: ["Roca", "Volador", "Fuego"],
    },
    Dragón: {
      icon: "/icons/tipos/Dragon.png",
      ventajas: ["Dragón"],
      debilidades: ["Hada", "Hielo", "Dragón"],
    },
    Eléctrico: {
      icon: "/icons/tipos/Electrico.png",
      ventajas: ["Volador", "Agua"],
      debilidades: ["Tierra"],
    },
    Fantasma: {
      icon: "/icons/tipos/Fantasma.png",
      ventajas: ["Fantasma", "Psíquico"],
      debilidades: ["Fantasma", "Siniestro"],
    },
    Fuego: {
      icon: "/icons/tipos/Fuego.png",
      ventajas: ["Bicho", "Planta", "Acero", "Hielo"],
      debilidades: ["Tierra", "Agua", "Roca"],
    },
    Hada: {
      icon: "/icons/tipos/Hada.png",
      ventajas: ["Siniestro", "Lucha", "Dragón"],
      debilidades: ["Acero", "Veneno"],
    },
    Hielo: {
      icon: "/icons/tipos/Hielo.png",
      ventajas: ["Planta", "Tierra", "Volador", "Dragón"],
      debilidades: ["Lucha", "Acero", "Roca", "Fuego"],
    },
    Lucha: {
      icon: "/icons/tipos/Lucha.png",
      ventajas: ["Roca", "Acero", "Hielo", "Normal", "Siniestro"],
      debilidades: ["Psíquico", "Volador", "Fuego"],
    },
    Normal: {
      icon: "/icons/tipos/Normal.png",
      ventajas: ["Fantasma"],
      debilidades: ["Lucha"],
    },
    Planta: {
      icon: "/icons/tipos/Planta.png",
      ventajas: ["Agua", "Tierra", "Roca"],
      debilidades: ["Volador", "Bicho", "Veneno", "Hielo", "Fuego"],
    },
    Psíquico: {
      icon: "/icons/tipos/Psiquico.png",
      ventajas: ["Lucha", "Veneno"],
      debilidades: ["Bicho", "Fantasma", "Siniestro"],
    },
    Roca: {
      icon: "/icons/tipos/Roca.png",
      ventajas: ["Fuego", "Volador", "Hielo", "Bicho"],
      debilidades: ["Lucha", "Tierra", "Acero", "Agua", "Planta"],
    },
    Siniestro: {
      icon: "/icons/tipos/Siniestro.png",
      ventajas: ["Psíquico", "Fantasma"],
      debilidades: ["Lucha", "Hada", "Bicho"],
    },
    Tierra: {
      icon: "/icons/tipos/Tierra.png",
      ventajas: ["Fuego", "Eléctrico", "Veneno", "Roca", "Acero"],
      debilidades: ["Agua", "Planta", "Hielo"],
    },
    Veneno: {
      icon: "/icons/tipos/Veneno.png",
      ventajas: ["Planta", "Hada"],
      debilidades: ["Tierra", "Psíquico"],
    },
    Volador: {
      icon: "/icons/tipos/Volador.png",
      ventajas: ["Bicho", "Lucha", "Planta"],
      debilidades: ["Roca", "Hielo", "Eléctrico"],
    },
  };

  const seleccionarTipo = (tipo) => {
    if (!slot1) setSlot1(tipo);
    else if (!slot2 && tipo !== slot1) setSlot2(tipo);
  };

  const reiniciar = () => {
    setSlot1(null);
    setSlot2(null);
    setResultado(null);
    setGanadorInfo(null);
  };

  const luchar = () => {
    if (slot1 && slot2) {
      const tipo1 = TYPE_MATCHUPS[slot1];
      const tipo2 = TYPE_MATCHUPS[slot2];

      const tipo1TieneVentaja = tipo1.ventajas.includes(slot2);
      const tipo2TieneVentaja = tipo2.ventajas.includes(slot1);

      let mensaje = "";
      let ganador = null;
      let perdedor = null;

      if (tipo1TieneVentaja && !tipo2TieneVentaja) {
        ganador = slot1;
        perdedor = slot2;
        mensaje = `Es muy probable que ${ganador} gane porque suele tener ventaja sobre ${perdedor}.`;
      } else if (tipo2TieneVentaja && !tipo1TieneVentaja) {
        ganador = slot2;
        perdedor = slot1;
        mensaje = `Es muy probable que ${ganador} gane porque suele tener ventaja sobre ${perdedor}.`;
      } else {
        mensaje = `Ambos (${slot1} y ${slot2}) tienen la misma posibilidad de ganar según los datos.`;
      }

      setResultado(mensaje);

      // Guardamos la info para mostrar detalles
      if (ganador) {
        setGanadorInfo({
          ganador: { name: ganador, ...TYPE_MATCHUPS[ganador] },
          perdedor: { name: perdedor, ...TYPE_MATCHUPS[perdedor] },
        });
      } else {
        // Caso empate: mostramos ambos como equivalentes
        setGanadorInfo({
          empate: [
            { name: slot1, ...TYPE_MATCHUPS[slot1] },
            { name: slot2, ...TYPE_MATCHUPS[slot2] },
          ],
        });
      }
    }
  };

  const fadeUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.6, ease: "easeOut" },
  };

  return (
    <motion.div {...fadeUp} className="enfrentamiento-section">
      <h2>Enfrentamiento</h2>
      <p>Selecciona dos tipos y ve quién tendría ventaja.</p>

      {/* Slots */}
      <div className="enfrentamiento-slots">
        <div className="slot" onClick={() => setSlot1(null)}>
          {slot1 ? (
            <img src={TYPE_DETAILS[slot1].image} alt={slot1} />
          ) : (
            <span>?</span>
          )}
        </div>
        <span className="vs-text">VS</span>
        <div className="slot" onClick={() => setSlot2(null)}>
          {slot2 ? (
            <img src={TYPE_DETAILS[slot2].image} alt={slot2} />
          ) : (
            <span>?</span>
          )}
        </div>
      </div>

      {/* Grid de selección */}
      <div className="types-grid mini-grid">
        {TYPES.map(({ name, img }) => (
          <img
            key={name}
            src={img}
            alt={name}
            className="type-img"
            onClick={() => seleccionarTipo(name)}
          />
        ))}
      </div>

      <AnimatePresence>
        {slot1 && slot2 && (
          <motion.button
            key="fight-btn"
            className="fight-btn"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            whileHover={{ scale: 1.05 }}
            onClick={luchar}
          >
            Luchar
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {/* Resultado */}
        {resultado && (
          <motion.div
            className="resultado-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20, height: 0, marginTop: 0 }}
            transition={{ duration: 0.5 }}
            style={{ marginTop: "15px", overflow: "hidden" }}
          >
            <p>{resultado}</p>

            {/* Mostrar detalles */}
            {ganadorInfo && (
              <div className="info-ganador">
                {ganadorInfo.ganador ? (
                  <>
                    {/* Ganador */}
                    <div className="tipo-card">
                      {/* Logo del tipo ganador */}
                      <img
                        src={TYPE_DETAILS[ganadorInfo.ganador.name].image}
                        alt={ganadorInfo.ganador.name}
                        className="tipo-logo"
                      />

                      <h4>Ventajas:</h4>
                      <div className="tipo-list">
                        {ganadorInfo.ganador.ventajas.map((tipo) => (
                          <img
                            key={tipo}
                            src={TYPE_MATCHUPS[tipo]?.icon}
                            alt={tipo}
                            className="tipo-mini"
                          />
                        ))}
                      </div>

                      <h4>Debilidades:</h4>
                      <div className="tipo-list">
                        {ganadorInfo.ganador.debilidades.map((tipo) => (
                          <img
                            key={tipo}
                            src={TYPE_MATCHUPS[tipo]?.icon}
                            alt={tipo}
                            className="tipo-mini"
                          />
                        ))}
                      </div>
                    </div>

                    {/* Perdedor */}
                    <div className="tipo-card">
                      {/* Logo del tipo perdedor */}
                      <img
                        src={TYPE_DETAILS[ganadorInfo.perdedor.name].image}
                        alt={ganadorInfo.perdedor.name}
                        className="tipo-logo"
                      />

                      <h4>Ventajas:</h4>
                      <div className="tipo-list">
                        {ganadorInfo.perdedor.ventajas.map((tipo) => (
                          <img
                            key={tipo}
                            src={TYPE_MATCHUPS[tipo]?.icon}
                            alt={tipo}
                            className="tipo-mini"
                          />
                        ))}
                      </div>

                      <h4>Debilidades:</h4>
                      <div className="tipo-list">
                        {ganadorInfo.perdedor.debilidades.map((tipo) => (
                          <img
                            key={tipo}
                            src={TYPE_MATCHUPS[tipo]?.icon}
                            alt={tipo}
                            className="tipo-mini"
                          />
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Empate */}
                    {ganadorInfo.empate.map((tipoObj) => (
                      <div key={tipoObj.name} className="tipo-card">
                        <img
                          src={TYPE_DETAILS[tipoObj.name].image}
                          alt={tipoObj.name}
                          className="tipo-logo"
                        />

                        <h4>Ventajas:</h4>
                        <div className="tipo-list">
                          {tipoObj.ventajas.map((tipo) => (
                            <img
                              key={tipo}
                              src={TYPE_MATCHUPS[tipo]?.icon}
                              alt={tipo}
                              className="tipo-mini"
                            />
                          ))}
                        </div>

                        <h4>Debilidades:</h4>
                        <div className="tipo-list">
                          {tipoObj.debilidades.map((tipo) => (
                            <img
                              key={tipo}
                              src={TYPE_MATCHUPS[tipo]?.icon}
                              alt={tipo}
                              className="tipo-mini"
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>
            )}

            <motion.button
              className="reset-btn"
              whileHover={{ scale: 1.05 }}
              onClick={reiniciar}
            >
              Reiniciar
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
