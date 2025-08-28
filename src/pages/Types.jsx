import { motion } from "framer-motion";
import aceroImg from "/icons/logoTipos/Acero.svg";
import aguaImg from "/icons/logoTipos/Agua.svg";
import bichoImg from "/icons/logoTipos/Bicho.svg";
import dragonImg from "/icons/logoTipos/Dragon.svg";
import electricoImg from "/icons/logoTipos/Electrico.svg";
import fantasmaImg from "/icons/logoTipos/Fantasma.svg";
import fuegoImg from "/icons/logoTipos/Fuego.svg";
import hadaImg from "/icons/logoTipos/Hada.svg";
import hieloImg from "/icons/logoTipos/Hielo.svg";
import luchaImg from "/icons/logoTipos/Lucha.svg";
import normalImg from "/icons/logoTipos/Normal.svg";
import plantaImg from "/icons/logoTipos/Planta.svg";
import psiquicoImg from "/icons/logoTipos/Psiquico.svg";
import rocaImg from "/icons/logoTipos/Roca.svg";
import siniestroImg from "/icons/logoTipos/Siniestro.svg";
import tierraImg from "/icons/logoTipos/Tierra.svg";
import venenoImg from "/icons/logoTipos/Veneno.svg";
import voladorImg from "/icons/logoTipos/Volador.svg";
import "../styles/Types.css";

const TYPES = [
  { name: "Acero", img: aceroImg },
  { name: "Agua", img: aguaImg },
  { name: "Bicho", img: bichoImg },
  { name: "Dragón", img: dragonImg },
  { name: "Electrico", img: electricoImg },
  { name: "Fantasma", img: fantasmaImg },
  { name: "Fuego", img: fuegoImg },
  { name: "Hada", img: hadaImg },
  { name: "Hielo", img: hieloImg },
  { name: "Lucha", img: luchaImg },
  { name: "Normal", img: normalImg },
  { name: "Planta", img: plantaImg },
  { name: "Psiquico", img: psiquicoImg },
  { name: "Roca", img: rocaImg },
  { name: "Siniestro", img: siniestroImg },
  { name: "Tierra", img: tierraImg },
  { name: "Veneno", img: venenoImg },
  { name: "Volador", img: voladorImg },
];

// Animaciones
const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.5, ease: "easeOut" },
};

const cardAnim = (i) => ({
  initial: { opacity: 0, y: 10 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { delay: i * 0.05, duration: 0.3, ease: "easeOut" },
});

export default function Types() {
  return (
    <div className="types-container">
      <motion.h2 {...fadeUp} className="types-title">
        Tipos de Pokémon
      </motion.h2>
      <motion.p {...fadeUp} className="types-subtitle">
        Aquí mostraremos todos los tipos y sus fortalezas/debilidades.
      </motion.p>

      <div className="types-grid">
        {TYPES.map(({ name, img }, i) => (
          <motion.div
            key={name}
            {...cardAnim(i)}
            whileHover={{
              y: -4,
              scale: 1.02,
              transition: { duration: 0.15 },
            }}
            className="type-card"
          >
            <img src={img} alt={name} />
            <span>{name}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
