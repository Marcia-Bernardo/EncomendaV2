import { useState, useEffect } from "react";

const ItemCard = ({ orderItems, setOrderItems }) => {
  const [items, setItems] = useState([]);

  const getItem = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/item`
    );
    const allItens = await response.json();
    setItems(allItens);
  };

  useEffect(() => {
    getItem();
  }, []);

  return (
    <div className="container mt-5">
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
                <input
                  type="text"
                  className="form-control text-center"
                  style={{ fontSize: "20px" }}
                  id="quantidade"
                  value={orderItems[name]}
                  onChange={(e) => {
                    setOrderItems({
                      ...orderItems,
                      [name]: e.target.value,
                    });
                  }}
                />
                <button
                  className="float-start btn btn-primary  mb-5"
                  onClick={() => {
                    if (orderItems[name] - 0.5 == 0) {
                      const newOrder = {
                        ...orderItems,
                      };
                      delete newOrder[name];

                      return setOrderItems({
                        ...newOrder,
                      });
                    }

                    if (orderItems[name] > 0) {
                      setOrderItems({
                        ...orderItems,
                        [name]: orderItems[name] - 0.5,
                      });
                    }
                  }}
                >
                  -
                </button>

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
