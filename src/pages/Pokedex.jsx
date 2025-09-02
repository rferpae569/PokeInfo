import { motion } from "framer-motion";
import TiposPokedex from "../components/TiposPokedex";
import PokedexInteractive from "../components/PokedexInteractive";
import "../styles/pokedex.css";

export default function PokedexPage() {
  return (
    <div>
      {/*Animaciones y Datos sobre pokedex*/}
      <motion.section
        className="intro"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="intro-content">
          <div className="intro-text">
            <h1>¿Qué es una Pokédex?</h1>
            <p>
              La Pokédex es una enciclopedia electrónica portátil creada por el
              Profesor Oak. Su función principal es registrar automáticamente
              los datos de las diferentes especies de Pokémon que un entrenador
              encuentra o captura durante su viaje.
            </p>
          </div>
          <div className="intro-image">
            <img
              src="/pokedex/ProfesorOak.webp"
              alt="Profesor Oak"
              className="profesor"
            />
            <p className="leyenda">Imagen del Profesor Oak</p>
          </div>
        </div>
      </motion.section>

      <motion.section
        className="funcionamiento"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="funcionamiento-content">
          <h2>¿Cómo funciona la Pokédex?</h2>
          <p>
            La Pokédex utiliza sensores avanzados capaces de identificar la
            forma, tamaño y características biológicas de los Pokémon en el
            entorno. Cuando el entrenador se encuentra con un Pokémon nuevo, el
            dispositivo analiza su información y la añade automáticamente a la
            base de datos.
          </p>

          <div className="funcionamiento-row">
            <p>
              Además, al capturar un Pokémon, la Pokédex desbloquea datos más
              detallados como su peso, altura, tipología, habilidades y
              movimientos. Esto convierte a la Pokédex en una herramienta
              indispensable para los entrenadores que buscan conocer y
              comprender a cada criatura.
            </p>
            <div className="funcionamiento-image">
              <img src="/pokedex/FuncPokedex.webp" alt="FuncPokedex" />
              <p className="leyenda">
                Imagen de la Pokédex por fuera. Se puede apreciar como la
                Pokédex diferencia entre Pokémon avistados y capturados.
              </p>

              <img src="/pokedex/FuncPokedex2.webp" alt="FuncPokedex" />
              <p className="leyenda">Entrada de un Pokémon desconocido.</p>

              <img src="/pokedex/FuncPokedex3.webp" alt="FuncPokedex" />
              <p className="leyenda">
                Entrada de un Pokémon avistado; al número se suma el nombre y la
                imagen del Pokémon.
              </p>

              <img src="/pokedex/FuncPokedex4.webp" alt="FuncPokedex" />
              <p className="leyenda">
                Entrada de un Pokémon capturado con todos sus datos disponibles.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Sección Tipos de Pokédex */}
      <TiposPokedex />

      {/* Pokedex funcional */}
      <motion.section
        className="pokedex-funcional"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <h2>Pokédex Interactiva</h2>
        <p>
          Aquí puedes buscar cualquier Pokémon de la primera a la quinta
          generación (del número 1 al 649) por su nombre o número en la Pokédex.
          También puedes desplazarte entre Pokémon usando los botones de
          anterior y siguiente.
        </p>

        {/*Con esta llamada mostramos la pokedex interactiva*/}
        <PokedexInteractive />
      </motion.section>
    </div>
  );
}
