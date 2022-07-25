import Head from "next/head";
import React, { useState } from "react";
import ListCards from "../components/addItem/ListCards";
import ItemCard from "../components/addItem/ItemCard";
import Form from "../components/addItem/Form";

const AddItem = () => {
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
      method: "POST",
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
    console.log(message);
    if (message.error) {
      return alert(
        message.error.map((erro) => {
          return erro.msg + "\n";
        })
      );
    }
    alert(message);
  };

  return (
    <div className="container">
      <Head>
        <title>Item</title>
      </Head>
      <h1 className="mt-3">Items</h1>

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

export default AddItem;
