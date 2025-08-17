import { useEffect, useState } from "react";
import { getPokemon } from "../services/pokeapi";
import "../styles/pokedex.css";

export default function Pokedex() {
  const [pokemon, setPokemon] = useState(null);
  const [search, setSearch] = useState("");
  const [currentId, setCurrentId] = useState(1);

  const fetchAndSetPokemon = async (poke) => {
    const data = await getPokemon(poke);
    if (data) {
      setPokemon(data);
      setCurrentId(data.id);
    } else {
      setPokemon(null);
    }
  };

  useEffect(() => {
    fetchAndSetPokemon(currentId);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search) return;

    if (!isNaN(search) && (search < 1 || search > 649)) {
      alert("Fuera de rango (1-649)");
      return;
    }

    fetchAndSetPokemon(search.toLowerCase());
    setSearch("");
  };

  const prevPokemon = () => {
    const newId = currentId > 1 ? currentId - 1 : 649;
    fetchAndSetPokemon(newId);
  };

  const nextPokemon = () => {
    const newId = currentId < 649 ? currentId + 1 : 1;
    fetchAndSetPokemon(newId);
  };

  return (
    <main>
      {/* Imagen del Pokémon */}
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

      {/* Nombre y número */}
      {pokemon && (
        <h1 className="pokemon_data">
          <span className="Numero_Pokemon">{pokemon.id}</span> -{" "}
          <span className="Nombre_Pokemon">{pokemon.name.split("-")[0]}</span>
        </h1>
      )}

      {/* Formulario */}
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

      {/* Botones */}
      <div className="buttons">
        <button onClick={prevPokemon} className="button btn-Ant">
          Anterior &lt;
        </button>
        <button onClick={nextPokemon} className="button btn-Sig">
          Siguiente &gt;
        </button>
      </div>

      {/* Imagen de la pokedex */}
      <img
        src="https://pokedex-conrado.vercel.app/images/pokedex.png"
        alt="pokedex"
        className="pokedex"
      />
    </main>
  );
}
