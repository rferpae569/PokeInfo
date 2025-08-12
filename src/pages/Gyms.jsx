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
                    <p><strong>Tipo:</strong> {gym.type}</p>
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



