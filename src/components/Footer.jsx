import { Link } from "react-router-dom";
import "../styles/Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-logo">
        <a href="#Home" className="logo">
          <img src="/icons/PokeInfoLogo.png" alt="Logo" />
        </a>
      </div>

      <p>PokeInfo © {new Date().getFullYear()} - Proyecto Fan-Made</p>

      <p>Pokémon es propiedad de:</p>

      <div className="footer-logos-row">
        <img src="/icons/NintendoLogo.png" alt="Nintendo" className="invert" />
        <img
          src="/icons/GameFreakLogo.png"
          alt="Game Freak"
          className="invert"
        />
        <img
          src="/icons/CreaturesInc.png"
          alt="Creatures Inc"
          className="invert creatures-logo"
        />
      </div>

      <p>Este sitio no tiene fines comerciales.</p>
    </footer>
  );
}
