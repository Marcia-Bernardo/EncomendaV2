import { useSate } from "react";

const Legend = () => {
  return (
    <div style={{ fontSize: "20px" }}>
      Legenda:
      <button
        type="button"
        className="btn btn-warning mx-3"
        style={{ backgroundColor: "yellow", fontSize: "20px" }}
      >
        iniciar o preparo
      </button>
      <button
        type="button"
        className="btn btn-danger mx-3"
        style={{ backgroundColor: "red", fontSize: "20px" }}
      >
        preparo atrasado
      </button>
      <button
        type="button"
        className="btn btn-orange mx-3"
        style={{ backgroundColor: "orange", fontSize: "20px" }}
      >
        à preparar
      </button>
      <button
        type="button"
        className="btn btn-success mx-3"
        style={{ backgroundColor: "green", fontSize: "20px" }}
      >
        pronto
      </button>
    </div>
  );
};
export default Legend;
