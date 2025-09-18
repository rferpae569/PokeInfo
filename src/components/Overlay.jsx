import { AnimatePresence, motion } from "framer-motion";
import "../styles/Overlay.css";

export default function Overlay({ isOpen, onClose, data, type }) {
  const title = type === "leader" ? data?.name : data?.nameJP || data?.name;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key={data?.name || "overlay"}
          className={`overlay ${type}-overlay`}
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <button className="close-overlay-btn" onClick={onClose}>
            X
          </button>

          {data && (
            <div className={`${type}-overlay-content`}>
              <img
                src={data.image || data.leader?.image}
                alt={data.name || data.leader?.name}
                className={`${type}-overlay-img`}
              />
              <h2>{title}</h2>

              <table className={`${type}-overlay-table`}>
                <tbody>
                  {data.description && (
                    <tr>
                      <td colSpan={2}>
                        <em>{data.description}</em>
                      </td>
                    </tr>
                  )}
                  <tr>
                    <td>Sexo:</td>
                    <td>{data.sex || data.leader?.sex}</td>
                  </tr>
                  <tr>
                    <td>Ciudad:</td>
                    <td>{data.home || data.leader?.home}</td>
                  </tr>
                  <tr>
                    <td>Región:</td>
                    <td>{data.region || data.leader?.region}</td>
                  </tr>
                  <tr>
                    <td>Tipo:</td>
                    <td>{data.type || data.leader?.type}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}







