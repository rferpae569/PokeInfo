import { motion } from "framer-motion";
import Gyms from "./Gyms";
import Leagues from "../pages/Leagues";
import Pokedex from "../pages/Pokedex";
import Types from "../pages/Types";

export default function Home() {
  return (
    <div id="Home" className="p-6 max-w-6xl mx-auto space-y-12">
      {/* Bloque de bienvenida con animaciones */}
      <motion.h2
        className="text-3xl font-bold mb-4"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Bienvenido a PokeInfo
      </motion.h2>

      <motion.p
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        Explora los tipos de Pokémon, sus fortalezas y debilidades, conoce
        gimnasios, ligas y consulta la Pokédex.
      </motion.p>

      {/* Secciones principales */}
      <div id="Pokedex">
        <Pokedex />
      </div>
      <div id="Types">
        <Types />
      </div>
      <div id="Gyms">
        <Gyms />
      </div>
      <div id="Leagues">
        <Leagues />
      </div>
    </div>
  );
}
