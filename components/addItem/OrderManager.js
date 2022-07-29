import { useEffect, useState } from "react";
import Form from "./Form";
import ItemCard from "./ItemCard";
import ListCards from "./ListCards";

const OrderManager = ({ method, id }) => {
  const [clientData, setClientData] = useState({});
  const [orderItems, setOrderItems] = useState({});
  const [loading, setLoading] = useState(true);
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
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/order`,
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
    setClientData({
      name: "",
      date: "",
      obs: "",
    });
    setOrderItems({});
  };

  const getOrder = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/order/${id}`
    );
    const newData = await response.json();

    if (newData) {
      setClientData({
        name: newData.name,
        date: newData.date,
        obs: newData.obs,
      });
      setOrderItems(Object.assign({}, ...newData.items));
    }
    setLoading(false);
  };

  useEffect(() => {
    if (id) {
      getOrder();
    }
  }, []);
  if (loading) {
    return <h1>Loading</h1>;
  }
  return (
    <div className="container">
      <div className="container mt-3 ">
        <div className="row justify-content-between">
          <div className="col-3">
            <ListCards order={orderItems} />
            <button
              className="float-end"
              onClick={(e) => {
                e.preventDefault();
                sendRequest();
              }}
            >
              Enviar
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
