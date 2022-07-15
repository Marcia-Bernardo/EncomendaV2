import Head from "next/head";
import React, { useState } from "react";
import ListItems from "../components/addItem/ListItems";
import ItemCard from "../components/addItem/ItemCard";
import Form from "../components/addItem/Form";

const AddItem = () => {
  const [order, setOrder] = useState({});
  const [itens, setItens] = useState({});
  console.log(order);
  return (
    <div className="container">
      <Head>
        <title>Item</title>
      </Head>
      <h1 className="mt-3">Items</h1>

      <div className="container">
        <div className="row">
          <div className="col-4">
            <ListItems />
          </div>
          <div className="col-8">
            <Form setOrder={setOrder} order={order} />

            <ItemCard itens={itens} setItens={setItens} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddItem;
