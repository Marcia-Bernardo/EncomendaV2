import Head from "next/head";
import { useState, useEffect } from "react";
import Table from "../components/Table";

import DropdownAdmin from "../components/DropdownAdmin";

const OrderPage = () => {
  const [months] = useState([
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ]);

  const [date] = useState(new Date());

  return (
    <>
      <Head>
        <title>Encomendas</title>
      </Head>
      <div className="container">
        <div className="mt-2">
          <DropdownAdmin />
        </div>

        <h2 className="mt-3">
          Encomendas do dia: {date.getDate()} {months[date.getMonth()]}
        </h2>

        <div className="mt-3">
          <Table date={date} combination />
        </div>
      </div>
    </>
  );
};

export default OrderPage;
