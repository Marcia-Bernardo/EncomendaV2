import Head from "next/head";
import React, { useState } from "react";
import ListItems from "../components/addItem/ListItems";
import ItemCard from "../components/addItem/ItemCard";

const AddItem = () => {
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
            <ItemCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddItem;
