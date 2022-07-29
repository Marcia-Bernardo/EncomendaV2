import { useEffect, useState } from "react";
import Form from "./Form";
import ItemCard from "./ItemCard";
import ListCards from "./ListCards";

const OrderManager = ({ method, id }) => {
  const [clientData, setClientData] = useState({});
  const [orderItems, setOrderItems] = useState({});

  const sendRequest = async () => {
    const items = [];

    Object.keys(orderItems).map((key) => {
      items.push({
        item: key,
        qtd: orderItems[key],
      });
    });

    const requestMetadata = {
      method: method,
      credential: "same-origin",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...clientData, items }),
    };

    const response = await fetch(
      "http://localhost:3001/api/order",
      requestMetadata
    );

    const message = await response.json();
    if (message.error) {
      return alert(
        message.error.map((erro) => {
          return erro.msg + "\n";
        })
      );
    }
    alert(message);
  };

  const getOrder = async () => {
    const response = await fetch(`http://localhost:3001/api/order/${id}`);
    const newData = await response.json();

    if (newData) {
      setClientData({
        name: newData.name,
        date: newData.date,
        obs: newData.obs,
      });
      setOrderItems(Object.assign({}, ...newData.items));
    }
  };

  useEffect(() => {
    if (id) {
      getOrder();
    }
  }, []);

  return (
    <div className="container">
      <div className="container mt-3 ">
        <div className="row justify-content-between">
          <div className="col-3">
            <ListCards order={orderItems} />
            <button
              onClick={(e) => {
                e.preventDefault();
                sendRequest();
              }}
            >
              Save
            </button>
          </div>
          <div className="col-8">
            <Form setOrder={setClientData} order={clientData} />

            <ItemCard orderItems={orderItems} setOrderItems={setOrderItems} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderManager;
