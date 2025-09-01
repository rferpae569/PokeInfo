import { useState } from "react";
import { motion } from "framer-motion";
import "../styles/Enfrentamiento.css";

export default function Enfrentamiento({ TYPES, TYPE_DETAILS }) {
  const [slot1, setSlot1] = useState(null);
  const [slot2, setSlot2] = useState(null);
  const [resultado, setResultado] = useState(null);
  const [ganadorInfo, setGanadorInfo] = useState(null);

  // ✅ Datos de ventajas y debilidades
  const TYPE_MATCHUPS = {
    Acero: {
      ventajas: ["Hada", "Hielo", "Roca"],
      debilidades: ["Fuego", "Lucha", "Tierra"],
    },
    Agua: {
      ventajas: ["Fuego", "Tierra", "Roca"],
      debilidades: ["Eléctrico", "Planta"],
    },
    Bicho: {
      ventajas: ["Planta", "Psíquico", "Siniestro"],
      debilidades: ["Roca", "Volador", "Fuego"],
    },
    Dragón: {
      ventajas: ["Dragón"],
      debilidades: ["Hada", "Hielo", "Dragón"],
    },
    Eléctrico: {
      ventajas: ["Volador", "Agua"],
      debilidades: ["Tierra"],
    },
    Fantasma: {
      ventajas: ["Fantasma", "Psíquico"],
      debilidades: ["Fantasma", "Siniestro"],
    },
    Fuego: {
      ventajas: ["Bicho", "Planta", "Acero", "Hielo"],
      debilidades: ["Tierra", "Agua", "Roca"],
    },
    Hada: {
      ventajas: ["Siniestro", "Lucha", "Dragón"],
      debilidades: ["Acero", "Veneno"],
    },
    Hielo: {
      ventajas: ["Planta", "Tierra", "Volador", "Dragón"],
      debilidades: ["Lucha", "Acero", "Roca", "Fuego"],
    },
    Lucha: {
      ventajas: ["Roca", "Acero", "Hielo", "Normal", "Siniestro"],
      debilidades: ["Psíquico", "Volador", "Fuego"],
    },
    Normal: {
      ventajas: ["Fantasma"],
      debilidades: ["Lucha"],
    },
    Planta: {
      ventajas: ["Agua", "Tierra", "Roca"],
      debilidades: ["Volador", "Bicho", "Veneno", "Hielo", "Fuego"],
    },
    Psíquico: {
      ventajas: ["Lucha", "Veneno"],
      debilidades: ["Bicho", "Fantasma", "Siniestro"],
    },
    Roca: {
      ventajas: ["Fuego", "Volador", "Hielo", "Bicho"],
      debilidades: ["Lucha", "Tierra", "Acero", "Agua", "Planta"],
    },
    Siniestro: {
      ventajas: ["Psíquico", "Fantasma"],
      debilidades: ["Lucha", "Hada", "Bicho"],
    },
    Tierra: {
      ventajas: ["Fuego", "Eléctrico", "Veneno", "Roca", "Acero"],
      debilidades: ["Agua", "Planta", "Hielo"],
    },
    Veneno: {
      ventajas: ["Planta", "Hada"],
      debilidades: ["Tierra", "Psíquico"],
    },
    Volador: {
      ventajas: ["Vicho", "Lucha", "Planta"],
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

      let ganador = null;
      let perdedor = null;

      if (tipo1.ventajas.includes(slot2)) {
        ganador = slot1;
        perdedor = slot2;
      } else if (tipo2.ventajas.includes(slot1)) {
        ganador = slot2;
        perdedor = slot1;
      } else {
        ganador = slot1;
        perdedor = slot2;
      }

      setResultado(
        `Es muy probable que ${ganador} gane porque suele tener ventaja sobre ${perdedor}.`
      );

      setGanadorInfo(TYPE_MATCHUPS[ganador]);
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

      {/* Botón Luchar */}
      {slot1 && slot2 && (
        <motion.button
          className="fight-btn"
          whileHover={{ scale: 1.05 }}
          onClick={luchar}
        >
          Luchar
        </motion.button>
      )}

      {/* Resultado */}
      {resultado && (
        <motion.div
          className="resultado-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p>{resultado}</p>

          {/* Mostrar ventajas y debilidades */}
          {ganadorInfo && (
            <div className="info-ganador">
              <div className="ventajas">
                <h4>Ventajas del ganador:</h4>
                <ul>
                  {ganadorInfo.ventajas.map((tipo) => (
                    <li key={tipo}>{tipo}</li>
                  ))}
                </ul>
              </div>

              <div className="debilidades">
                <h4>Debilidades del ganador:</h4>
                <ul>
                  {ganadorInfo.debilidades.map((tipo) => (
                    <li key={tipo}>{tipo}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          <button onClick={reiniciar}>Reiniciar</button>
        </motion.div>
      )}
    </motion.div>
  );
}
