import Head from "next/head";
import { useState, useEffect } from "react";
import Table from "../components/Table";
import { useRouter } from "next/router";

import DropdownAdmin from "../components/DropdownAdmin";
import Legend from "../components/Legend";

const OrderPage = () => {
  const router = useRouter();
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
        <div className="mt-2 float-end ">
          <DropdownAdmin />

          <button
            type="button"
            className="btn btn-primary mx-3"
            onClick={() => {
              router.push("/addOrder");
            }}
          >
            Criar pedido
          </button>
        </div>

        <h2 className="mt-3">
          Encomendas do dia: {date.getDate()} {months[date.getMonth()]}
        </h2>

        <div className="mt-3">
          <Legend />
          <br />
          <Table link={"status"} combination />
        </div>
      </div>
    </>
  );
};

export default OrderPage;
