import { useEffect, useState } from "react";
import Form from "./Form";
import ItemCard from "./ItemCard";
import ListCards from "./ListCards";

const OrderManager = ({ method, id }) => {
  const [clientData, setClientData] = useState({});
  const [orderItems, setOrderItems] = useState({});
  const [loading, setLoading] = useState(true);
  const [classAlert, setClassAlert] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const sendRequest = async () => {
    const items = [];

    Object.keys(orderItems).map((key) => {
      items.push({
        item: key,
        qtd: orderItems[key],
      });
    });
    console.log(clientData, items);
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
      setClassAlert("alert alert-danger alert-dismissible fade show");

      const error = message.error.map((erro) => {
        return <p>{erro.msg}</p>;
      });
      setAlertMessage(error);
      return;
    }
    setClientData({
      name: "",
      date: "",
      obs: "",
    });
    setOrderItems({});
    setClassAlert("alert alert-success alert-dismissible fade show");
    setAlertMessage("Pedido criado com sucesso!");
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
      const items = newData.items.map((item) => {
        const newItem = {};
        newItem[item.item] = parseInt(item.qtd);

        return newItem;
      });
      console.log(items);
      setOrderItems(Object.assign({}, ...items));
    }
    setLoading(false);
  };

  useEffect(() => {
    if (id) {
      getOrder();
    }
    setLoading(false);
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
            <div className={classAlert} role="alert">
              {alertMessage}
            </div>
            <button
              className="float-end"
              onClick={(e) => {
                e.preventDefault();
                sendRequest();
              }}
            >
              Enviar
            </button>
            <br></br>
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
