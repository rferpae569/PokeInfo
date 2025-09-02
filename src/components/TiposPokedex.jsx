import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import "../styles/tipospokedex.css";

export default function TiposPokedex() {
  // Carrusel con imágenes, información y sus animaciones
  function Carousel({ data, autoPlay = true, interval = 4000 }) {
    const [current, setCurrent] = useState(0);
    const [animation, setAnimation] = useState("fade-in");
    const [direction, setDirection] = useState("right");
    const timeoutRef = useRef(null);

    const changeSlide = (index, dir = "right") => {
      setDirection(dir);
      setAnimation("fade-out");
      setTimeout(() => {
        setCurrent(index);
        setAnimation("fade-in");
      }, 300);
    };

    const nextSlide = () => changeSlide((current + 1) % data.length, "right");
    const prevSlide = () =>
      changeSlide((current - 1 + data.length) % data.length, "left");
    const goToSlide = (index) =>
      changeSlide(index, index > current ? "right" : "left");

    useEffect(() => {
      if (!autoPlay) return;
      timeoutRef.current = setTimeout(nextSlide, interval);
      return () => clearTimeout(timeoutRef.current);
    }, [current, autoPlay, interval]);

    return (
      <div className="carousel">
        <button className="carousel-btn left" onClick={prevSlide}>
          ⬅
        </button>

        <div className={`carousel-slide ${animation} ${direction}`}>
          <img src={data[current].img} alt={data[current].title} />
          <h3>{data[current].title}</h3>
          <p>{data[current].desc}</p>
        </div>

        <button className="carousel-btn right" onClick={nextSlide}>
          ➡
        </button>

        <div className="carousel-dots">
          {data.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === current ? "active" : ""}`}
              onClick={() => goToSlide(index)}
            ></span>
          ))}
        </div>
      </div>
    );
  }

  // Datos de las distintas Pokédex
  const pokedexData = [
    {
      img: "/pokedex/Pokedex1.webp",
      title: "Pokédex Generación 1",
      desc: "Tiene la forma y el tamaño de un libro, pero electrónico. Tiene una voz masculina. Registra a un Pokémon con poca dificultad, solo verlo y muestra sus datos. Esta Pokédex solo es roja y su uso es unisex. Es originaria de Kanto y puede registrar 151 Pokémon.",
    },
    {
      img: "/pokedex/Pokedex2.webp",
      title: "Pokédex Generación 2",
      desc: "Esta Pokédex es más pequeña que la anterior, no pesa tanto y no es como un libro, sino que tiene una tapa que protege todos los botones, siendo así para que sea más fácil y más cómoda. También tiene una tapa para proteger la pantalla. Cuando se cierra, se muestra el símbolo de una Poké Ball. Pertenece a la región de Johto. Puede almacenar 100 Pokémon además de los 151 de Kanto.",
    },
    {
      img: "/pokedex/Pokedex3.webp",
      title: "Pokédex Generación 3",
      desc: "Esta Pokédex pesa mucho menos porque es mucho más pequeña y ya tiene una tapa para proteger todo. Pertenece a Hoenn y puede registrar 135 Pokémon más.",
    },
    {
      img: "/pokedex/Pokedex3-1.webp",
      title: "Pokédex Generación 3",
      desc: "Este es el nuevo modelo de Pokédex de la región Kanto.",
    },
    {
      img: "/pokedex/Pokedex4.webp",
      title: "Pokédex Generación 4",
      desc: "El peso es un poco menor. Su voz es femenina. Puede registrar entre 151 (DP) y 210 (Pt) Pokémon en el modo regional. Existen dos modelos: masculino y femenino. El masculino es de color rojo y el femenino rosa.",
    },
    {
      img: "/pokedex/Pokedex4-1.webp",
      title: "Pokédex Generación 4",
      desc: "Tiene voz femenina y también tiene modelo masculino. El peso no cambia mucho. Esta puede registrar 256 Pokémon porque se puede viajar en Johto y Kanto",
    },
    {
      img: "/pokedex/Pokedex5.webp",
      title: "Pokédex Generación 5",
      desc: "Esta versión posee dos pantallas al igual que todas las anteriores, pero la diferencia es que una va detrás de la otra, y cuando se desea información sobre un Pokémon, la pantalla de atrás se desplaza hacia arriba.",
    },
    {
      img: "/pokedex/Pokedex6.webp",
      title: "Pokédex Generación 6",
      desc: "Adquiere un modelo semejante a una tablet o tableta electrónica. Es desplegable y tiene el fondo azul claro, las características del Pokémon aparecen en la parte superior y los Pokémon encontrados en la inferior. Está separada en tres apartados según tu ubicación en Kalos: Zona Costera, Zona Central y Zona Montañosa.",
    },
    {
      img: "/pokedex/Pokedex6-1.webp",
      title: "Pokédex Generación 6",
      desc: "El modelo de la Pokédex cambia tomando la forma de una consola Game Boy Advance.",
    },
    {
      img: "/pokedex/Pokedex7.webp",
      title: "Pokédex Generación 7",
      desc: "Pokédex especial conocida como RotomDex. En su interior habita un Rotom, ya que es capaz de vivir en diversos aparatos electrónicos. La RotomDex además de registrar información sobre los Pokémon también muestra la posición actual del jugador a modo de mapa e indica el destino.",
    },
  ];

  return (
    <motion.section
      className="tipos"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <h2>Tipos de Pokédex</h2>
      <p>
        A lo largo de las diferentes generaciones de Pokémon, han existido
        múltiples diseños de Pokédex, cada uno con características únicas y
        adaptados a la región correspondiente.
      </p>
      <Carousel data={pokedexData} /> {/* Carrusel con las distintas pokedex */}
    </motion.section>
  );
}
