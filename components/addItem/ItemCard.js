import { useState, useEffect } from "react";

const ItemCard = () => {
  const [itens, setItens] = useState([]);
  const [qtd, setQtd] = useState({});

  const getItem = async () => {
    const response = await fetch("http://localhost:3001/api/item");
    const allItens = await response.json();
    setItens(allItens);
  };

  useEffect(() => {
    getItem();
  }, []);
  console.log(qtd);
  return (
    <div className="container">
      <div className="row">
        {itens.map((item) => {
          const name = item.name;
          return (
            <div className="col-4" key={item.id}>
              <div className="card-deck">
                <div className="card">
                  {/* <img className="card-img-top" src="..." alt="Card image cap" /> */}
                  <div className="card-body">
                    <h5 className="card-title text-center">{item.name} </h5>

                    <p className="card-text">
                      <small className="text-muted">
                        Tempo de preparo: {item.confetionTime} min
                      </small>
                    </p>
                  </div>
                </div>
              </div>
              <div className="">
                <button
                  className="float-start btn btn-danger"
                  onClick={() => {
                    if (qtd[name] > 0) {
                      setQtd({
                        ...qtd,
                        [name]: qtd[name] == null ? 0 : qtd[name] - 0.5,
                      });
                    }
                  }}
                >
                  -
                </button>

                <span className="" style={{ margin: 55 }}>
                  {qtd[name]}
                </span>

                <button
                  className="float-end btn btn-primary"
                  onClick={() =>
                    setQtd({
                      ...qtd,
                      [name]: qtd[name] == null ? 0.5 : qtd[name] + 0.5,
                    })
                  }
                >
                  +
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ItemCard;
