import { Link } from "react-router-dom";
import "../styles/Header.css";

export default function Header() {
  return (
    <header className="header">
      <nav>
        <Link to="/" className="logo">
          <img src="/icons/PokeInfoLogo.png" alt="Logo" />
        </Link>

        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/types">Tipos</Link>
          </li>
          <li>
            <Link to="/gyms">Gimnasios</Link>
          </li>
          <li>
            <Link to="/leagues">Ligas</Link>
          </li>
          <li>
            <Link to="/pokedex">Pokédex</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
