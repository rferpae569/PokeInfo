import { Link } from "react-router-dom";
import "../styles/Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-logo">
        <Link to="/" className="logo">
          <img src="/icons/PokeInfoLogo.png" alt="Logo" />
        </Link>
      </div>

      <p>PokeInfo © {new Date().getFullYear()} - Proyecto Fan-Made</p>
      <p>
        Pokémon es propiedad de Nintendo, Game Freak y Creatures Inc. Este sitio no tiene fines comerciales.
      </p>
    </footer>
  );
}
