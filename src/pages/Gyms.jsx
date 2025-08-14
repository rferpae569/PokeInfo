import gymsData from '../data/gymsData.json';
import '../styles/Gyms.css';

export default function Gyms() {
  return (
    <div className="gyms-wrapper">
      {gymsData.map(region => (
        <div key={region.region}>
          <h2 className="region-title">{region.region}</h2>

          <div className="gyms-container">
            {region.gyms.map(gym => (
              <div className="gym-card" key={gym.city}>
                {/* Imagen del gimnasio */}
                <img
                  src={gym.gymImage}
                  alt={`Gimnasio de ${gym.city}`}
                  className="gym-image"
                />

                {/* Contenido de la tarjeta */}
                <div className="gym-content">
                  <h3>{gym.city}</h3>
                  <div className="gym-details">
                    <p><strong>Líder:</strong> {gym.leader}</p>
                    <p>
  <strong>Tipo:</strong>{" "}
  {
    gym.type.includes(" / ")
      ? gym.type.split(" / ").map(tipo => (
          <img
            key={tipo}
            src={`/icons/tipos/${tipo.trim()}.png`}  // sin cambiar mayúsculas/minúsculas
            alt={`Tipo ${tipo.trim()}`}
            className="type-icon"
          />
        ))
      : (
          <img
            src={`/icons/tipos/${gym.type.trim()}.png`}  // sin cambiar mayúsculas/minúsculas
            alt={`Tipo ${gym.type.trim()}`}
            className="type-icon"
          />
        )
  }
</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}




