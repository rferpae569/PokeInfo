import "../styles/Header.css";

export default function Header() {
  return (
    <header className="header">
      <nav>
        <a href="#Home" className="logo">
          <img src="icons/PokeInfoLogo.png" alt="Logo" />
        </a>

        <ul>
          <li>
            <a href="#Pokedex">Pokédex</a>
          </li>
          <li>
            <a href="#Types">Tipos</a>
          </li>
          <li>
            <a href="#Gyms">Gimnasios</a>
          </li>
          <li>
            <a href="#Leagues">Ligas</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
