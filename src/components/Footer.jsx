import "../styles/Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <p>PokeInfo © {new Date().getFullYear()} - Proyecto Fan-Made</p>
      <p>Pokémon es propiedad de Nintendo, Game Freak y Creatures Inc. Este sitio no tiene fines comerciales.</p>
    </footer>
  );
}
