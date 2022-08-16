import { useSate } from "react";

const Legend = () => {
  return (
    <div>
      Legenda:
      <button type="button" className="btn btn-warning mx-3">
        iniciar o preparo
      </button>
      <button type="button" className="btn btn-danger mx-3">
        preparo atrasado
      </button>
      {/* <button type="button" className="btn btn-orange mx-3">
        à preparar
      </button> */}
      <button type="button" className="btn btn-success mx-3">
        pronto
      </button>
    </div>
  );
};
export default Legend;
