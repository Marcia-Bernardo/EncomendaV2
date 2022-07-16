import Head from "next/head";
import React, { useState } from "react";
import ListItems from "../components/addItem/ListItems";
import ItemCard from "../components/addItem/ItemCard";
import Form from "../components/addItem/Form";

const AddItem = () => {
  const [order, setOrder] = useState({});
  const [items, setItems] = useState({});
  const [orderLine, setOrderLine] = useState({});

  return (
    <div className="container">
      <Head>
        <title>Item</title>
      </Head>
      <h1 className="mt-3">Items</h1>

      <div className="container">
        <div className="row">
          <div className="col-4">
            <ListItems order={items} />
          </div>
          <div className="col-8">
            <Form setOrder={setOrder} order={order} />

            <ItemCard orderItems={items} setOrderItems={setItems} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddItem;
