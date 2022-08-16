import { useSate } from "react";

const Legend = () => {
  return (
    <div>
      Legenda:
      <button
        type="button"
        className="btn btn-warning mx-3"
        style={{ backgroundColor: "yellow" }}
      >
        iniciar o preparo
      </button>
      <button
        type="button"
        className="btn btn-danger mx-3"
        style={{ backgroundColor: "red" }}
      >
        preparo atrasado
      </button>
      <button
        type="button"
        className="btn btn-orange mx-3"
        style={{ backgroundColor: "orange" }}
      >
        à preparar
      </button>
      <button
        type="button"
        className="btn btn-success mx-3"
        style={{ backgroundColor: "green" }}
      >
        pronto
      </button>
    </div>
  );
};
export default Legend;
