import { useState } from "react";
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
  { name: "Eléctrico", img: electricoImg },
  { name: "Fantasma", img: fantasmaImg },
  { name: "Fuego", img: fuegoImg },
  { name: "Hada", img: hadaImg },
  { name: "Hielo", img: hieloImg },
  { name: "Lucha", img: luchaImg },
  { name: "Normal", img: normalImg },
  { name: "Planta", img: plantaImg },
  { name: "Psíquico", img: psiquicoImg },
  { name: "Roca", img: rocaImg },
  { name: "Siniestro", img: siniestroImg },
  { name: "Tierra", img: tierraImg },
  { name: "Veneno", img: venenoImg },
  { name: "Volador", img: voladorImg },
];

const TYPE_DETAILS = {
  Acero: {
    description:
      "Destacan por tener altas defensas, pero también por poseer poca velocidad. No se pueden envenenar en condiciones normales y no reciben daño por tormentas de arena. Son muy buenos luchadores; los ataques físicos raras veces les causan mucho daño. Los Pokémon de este tipo se ubican principalmente en cuevas y cavernas, aunque hay algunos que se pueden encontrar en zonas urbanas como fábricas o centrales eléctricas ",
    image: aceroImg,
  },
  Agua: {
    description:
      "Se dice que es puro y que suele adaptarse a cualquier situación o condición climática, ya que el agua puede adoptar cualquier forma en cualquier momento. Por eso, los Pokémon de tipo agua se sienten a menudo libres en cualquier sitio donde haya agua a su disposición. La mayoría de estos Pokémon pertenecen también a otros tipos. Por esto, se dice que los Pokémon de agua son muy adaptables y su dinamismo los hace destacarse en concursos, presentaciones y evasión de ataques. Como viven en el agua, muchos de ellos están provistos de aletas.",
    image: aguaImg,
  },
  Bicho: {
    description:
      "Este grupo de Pokémon se caracteriza por su crecimiento rápido, ya que, en general, no tardan mucho en evolucionar. Viven primordialmente en los bosques y zonas cercanas a estos, algunos son un poco más difíciles de divisar debido a que se encuentran en copas de árboles donde anidan.",
    image: bichoImg,
  },
  Dragón: {
    description:
      "Es un tipo elemental ancestral, suelen ser Pokémon que cuesta capturar y ver, la mayoría de estos Pokémon suelen vivir en cavernas y lagos.",
    image: dragonImg,
  },
  Eléctrico: {
    description:
      "Tienen hábitats variados, desde bosques y praderas, hasta ciudades y centrales eléctricas. Estos Pokémon almacenan electricidad estática en sus cuerpos y luego la liberan en forma de rayos por diferentes partes. Pero, cuando un Pokémon de este tipo absorbe demasiada electricidad, puede llegar a ser muy peligroso, debido a que tiene demasiada energía contenida en su interior que no puede ser liberada en poco tiempo, haciéndolos enfermar. Cuando eso pasa, hay que quitarles la electricidad en exceso a la mayor brevedad posible antes de que, en el peor de los casos, el Pokémon se sobrecargue y explote. ",
    image: electricoImg,
  },
  Fantasma: {
    description:
      "Se relacionan con el terror, lo oscuro y el más allá. La mayoría tienen aspecto de fantasma o de objeto poseído. Suelen vivir en casas abandonadas, cementerios, torres fúnebres y lugares oscuros e inhabitados. Gran parte de estos Pokémon esbozan una sonrisa siniestra y tenebrosa. Otra característica de los Pokémon fantasma es que son extremadamente traviesos, y les encanta gastarles bromas pesadas a los humanos y otros Pokémon. También les encantan ver la cara de miedo de las personas que invaden su territorio. Lo curioso de estos Pokémon es que, cuanto más miedo se les tenga, estos lo absorberán y serán más fuertes.",
    image: fantasmaImg,
  },
  Fuego: {
    description:
      "Basan sus ataques, principalmente, en el control de este elemento; y la mayoría pueden quemar al Pokémon oponente, mientras que ellos no sufren quemaduras. Son apasionados y, algunos, de mal carácter; viven en cuevas o zonas rocosas y muy áridas; y, más probable, aun cerca de volcanes activos.",
    image: fuegoImg,
  },
  Hada: {
    description:
      "Representa, principalmente, la pureza, la luz, el bien y el poder mágico, siendo esto lo más característico de esta especie. Se suelen encontrar, principalmente, en zonas al aire libre, rodeadas de flores o elementos similares.",
    image: hadaImg,
  },
  Hielo: {
    description:
      "Destacan por su gran resistencia y adaptación al medio frío o glaciar, como son las cimas de las montañas, las cavernas y cuevas heladas, o incluso los polos. Tienen la capacidad de congelar al enemigo en combate, mientras que ellos no pueden padecer dicho estado. Además, pueden realizar ataques devastadores, como frío polar, al cual son inmunes. No reciben daño por granizo.",
    image: hieloImg,
  },
  Lucha: {
    description:
      "Son especialistas en el combate cuerpo a cuerpo. Su desarrollo varía: puede ser veloz o tardío.",
    image: luchaImg,
  },
  Normal: {
    description:
      "Son los más diversos entre los Pokémon, con características variadas, desarrollos y requisitos para las evoluciones diferentes de cada uno, al igual que diferir en las zonas donde se pueden capturar, desde bosques, cuevas, montañas, ciudades, etc.",
    image: normalImg,
  },
  Planta: {
    description:
      "Les gusta cuidar de las flores y a los demás, pero también son grandes luchadores y son expertos en cambios de estado, pudiendo envenenar, paralizar o dormir al rival en combate, mientras que ellos son inmunes a drenadoras pero también a movimientos con esporas y polvos.",
    image: plantaImg,
  },
  Psíquico: {
    description:
      "Los Pokémon de este tipo suelen ser muy inteligentes y, a menudo, se les atribuye capacidades como prever acciones futuras, hacer levitar objetos o incluso a ellos mismos. Se puede localizar a este tipo de Pokémon en cuevas o zonas cercanas a estas.",
    image: psiquicoImg,
  },
  Roca: {
    description:
      "Destaca por su gran defensa frente a ataques físicos. Sin embargo, tiene en su contra que presenta varias debilidades con respecto a otros tipos, y los Pokémon de este tipo no se caracterizan por ser muy veloces. Cabe destacar que, la mayoría de los movimientos de tipo roca, poseen baja precisión a la hora de atacar.",
    image: rocaImg,
  },
  Siniestro: {
    description:
      "Son, en su mayoría, agresivos y misteriosos; por lo tanto, encontrar un tipo siniestro es un poco complicado. A estos Pokémon les cuesta formar lazos de amistad con entrenadores, pero, al formar uno, debido a la barrera moral que rompen al hacerlo, este lazo jamás será roto, siendo muy fieles a su entrenador e incluso dando su vida por él.",
    image: siniestroImg,
  },
  Tierra: {
    description:
      "Se pueden hallar en cuevas o zonas rocosas, con excepción de algunos de doble tipo.",
    image: tierraImg,
  },
  Veneno: {
    description:
      "Suelen encontrarse en zonas donde hay cuevas, pantanos o en sus cercanías. Muchos Pokémon de este tipo pueden expulsar de sus cuerpos distintas sustancias nocivas como gases, ácidos, venenos, esporas u olores malolientes.",
    image: venenoImg,
  },
  Volador: {
    description:
      "Son rápidos y con ataques que normalmente son de contacto físico, o en los que utilizan el viento a su favor. En su mayoría, los Pokémon de tipo volador poseen alas, aunque hay excepciones.",
    image: voladorImg,
  },
};

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
  const [selectedType, setSelectedType] = useState(null);

  const closePanel = () => setSelectedType(null);

  return (
    <div className="types-wrapper">
      <motion.div
        className="types-container"
        animate={{
          x: selectedType ? -150 : 0,
          transition: { type: "spring", stiffness: 100, damping: 20 },
        }}
      >
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
              className={`type-card ${selectedType === name ? "selected" : ""}`}
              onClick={() => setSelectedType(name)}
            >
              <img src={img} alt={name} />
              <span>{name}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="type-info-panel"
        initial={{ width: 0, opacity: 0 }}
        animate={{
          width: selectedType ? "300px" : 0,
          opacity: selectedType ? 1 : 0,
          transition: { type: "spring", stiffness: 100, damping: 20 },
        }}
      >
        {selectedType && TYPE_DETAILS[selectedType] && (
          <motion.div
            key={selectedType}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
            className="type-info-content"
          >
            <h3>{selectedType}</h3>
            <img
              src={TYPE_DETAILS[selectedType].image}
              alt={selectedType}
              className="type-info-img"
            />
            <p>{TYPE_DETAILS[selectedType].description}</p>

            {/* Botón de cerrar */}
            <button className="toggle-btn" onClick={closePanel}>
              Cerrar
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
