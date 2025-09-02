import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getPokemon } from "../services/pokeapi";
import "../styles/pokedexinteractive.css";

export default function PokedexInteractive() {
  // Estados para guardar, buscar y llevar el id del Pokémon actual (El id empieza en 1 por defecto)
  const [pokemon, setPokemon] = useState(null);
  const [search, setSearch] = useState("");
  const [currentId, setCurrentId] = useState(1);

  //Función que obtiene datos del Pokémon (por nombre o ID) y actualiza el estado correspondiente.
  const fetchAndSetPokemon = async (poke) => {
    const data = await getPokemon(poke);
    if (data) {
      setPokemon(data);
      setCurrentId(data.id); // Actualiza el ID actual con el del Pokémon encontrado
    } else {
      setPokemon(null); // Si no encuentra, resetea
    }
  };

  // useEffect para cargar el primer Pokémon cuando el componente se monta
  useEffect(() => {
    fetchAndSetPokemon(currentId);
  }, []);

  //Maneja el enfio del formulario
  const handleSearch = (e) => {
    e.preventDefault();

    if (!search) return;

    // Condicional para coger los pokemon dentro del rango
    if (!isNaN(search) && (search < 1 || search > 649)) {
      alert("Fuera de rango (1-649)");
      return;
    }

    // Busca el Pokémon (convierte a minúsculas si es texto)
    fetchAndSetPokemon(search.toLowerCase());

    setSearch("");
  };

  //Cambia al Pokémon anterior (Si es el primero pasa al final)
  const prevPokemon = () => {
    const newId = currentId > 1 ? currentId - 1 : 649;
    fetchAndSetPokemon(newId);
  };

  //Cambia al Pokémon siguiente (Si es el ultimo pasa al primero)
  const nextPokemon = () => {
    const newId = currentId < 649 ? currentId + 1 : 1;
    fetchAndSetPokemon(newId);
  };

  return (
    <motion.main
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
      className="pokedex-section"
    >
      {/* Si hay Pokémon, muestra su sprite animado; si no, mensaje de error */}
      {pokemon ? (
        <img
          src={
            pokemon.sprites.versions["generation-v"]["black-white"].animated
              .front_default
          }
          alt={pokemon.name}
          className="Imagen_Pokemon"
        />
      ) : (
        <p>No encontrado</p>
      )}

      {/* Si hay Pokémon, muestra su ID y nombre */}
      {pokemon && (
        <h1 className="pokemon_data">
          <span className="Numero_Pokemon">{pokemon.id}</span> -{" "}
          <span className="Nombre_Pokemon">{pokemon.name.split("-")[0]}</span>
        </h1>
      )}

      {/* Formulario para buscar Pokémon por nombre o número */}
      <form onSubmit={handleSearch}>
        <input
          type="search"
          className="input_search"
          placeholder="Name or Number"
          required
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>

      {/* Botones para navegar entre Pokémon anterior y siguiente */}
      <div className="buttons">
        <button onClick={prevPokemon} className="button btn-Ant">
          Anterior &lt;
        </button>
        <button onClick={nextPokemon} className="button btn-Sig">
          Siguiente &gt;
        </button>
      </div>

      {/* Imagen de la Pokedex como fondo decorativo */}
      <img
        src="https://pokedex-conrado.vercel.app/images/pokedex.png"
        alt="pokedex"
        className="pokedex"
      />
    </motion.main>
  );
}
