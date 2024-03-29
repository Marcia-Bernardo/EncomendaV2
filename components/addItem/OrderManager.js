import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import Form from "./Form";
import ItemCard from "./ItemCard";
import ListCards from "./ListCards";

const OrderManager = ({ method, id, link }) => {
  const [clientData, setClientData] = useState({});
  const [orderItems, setOrderItems] = useState({});
  const [loading, setLoading] = useState(true);
  const [classAlert, setClassAlert] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const sendRequest = async () => {
    const token = Cookies.get("token");
    setLoading(true);
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
        token,
      },
      body: JSON.stringify({ ...clientData, items, id }),
    };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/${link}`,
      requestMetadata
    );

    const message = await response.json();
    if (message.error) {
      setClassAlert("alert alert-danger alert-dismissible fade show");

      const error = message.error.map((erro, index) => {
        return <p key={index}>{erro.msg}</p>;
      });
      setAlertMessage(error);
      setLoading(false);
      return;
    }
    setClientData({
      name: "",
      date: "",
      obs: "",
    });
    setOrderItems({});
    setClassAlert("alert alert-success alert-dismissible fade show");
    setAlertMessage(
      `Pedido ${method == "PUT" ? "atualizado" : "criado"}  com sucesso!`
    );
    setTimeout(() => {
      setClassAlert("");
      setAlertMessage("");
    }, 2500);
    setLoading(false);
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
        newItem[item.item] = parseFloat(item.qtd);

        return newItem;
      });
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
