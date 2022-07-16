import { useState, useEffect } from "react";

const ItemCard = ({ orderItems, setOrderItems }) => {
  const [items, setItems] = useState([]);
  const [qtd, setQtd] = useState({});

  const getItem = async () => {
    const response = await fetch("http://localhost:3001/api/item");
    const allItens = await response.json();
    setItems(allItens);
  };

  useEffect(() => {
    getItem();
  }, []);

  return (
    <div className="container">
      <div className="row">
        {items.map((item) => {
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
              <div className="panel-footer text-center">
                <button
                  className="float-start btn btn-primary  mb-5"
                  onClick={() => {
                    if (orderItems[name] > 0) {
                      setOrderItems({
                        ...orderItems,
                        [name]:
                          orderItems[name] == null ? 0 : orderItems[name] - 0.5,
                      });
                    }
                  }}
                >
                  -
                </button>

                <span>{orderItems[name]}</span>

                <button
                  className="float-end btn btn-warning  mb-5"
                  onClick={() =>
                    setOrderItems({
                      ...orderItems,
                      [name]:
                        orderItems[name] == null ? 0.5 : orderItems[name] + 0.5,
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
