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
          const { name, id, confetionTime } = item;
          return (
            <div className="col-4" key={id}>
              <div className="card-deck">
                <div className="card">
                  {/* <img className="card-img-top" src="..." alt="Card image cap" /> */}
                  <div className="card-body">
                    <h4 className="card-title text-center">{name} </h4>

                    <p className="card-text">
                      <small
                        className="text-muted"
                        style={{ fontSize: "20px" }}
                      >
                        Tempo de preparo: {confetionTime} min
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
                  value={orderItems[name] || ""}
                  onChange={(e) => {
                    setOrderItems({
                      ...orderItems,
                      [name]: e.target.value,
                    });
                  }}
                />
                <button
                  className="float-start btn btn-primary  mb-5"
                  style={{ fontWeight: "bold", fontSize: "1.3em" }}
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
                  style={{ fontWeight: "bold", fontSize: "1.3em" }}
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
