import Head from "next/head";
import { useState, useContext, useEffect } from "react";
import Table from "../components/Table";
import { useRouter } from "next/router";

import DropdownAdmin from "../components/DropdownAdmin";
import Legend from "../components/Legend";
import { UserContext } from "../lib/AppWrapper"; //

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
  const { user, loading } = useContext(UserContext); //

  if (loading) {
    return;
  }
  if (!loading) {
    if (!user) {
      router.push("/");
    }
  }

  return (
    <>
      <Head>
        <title>Encomendas</title>
      </Head>
      <div className="container mt-4">
        <div className="mt-2 float-end ">
          {user.permission === "admin" && (
            <>
              <DropdownAdmin />
              <button
                style={{ fontSize: "20px" }}
                type="button"
                className="btn btn-primary mx-3"
                onClick={() => {
                  router.push("/addOrder");
                }}
              >
                Criar pedido
              </button>
            </>
          )}
        </div>

        <h1 className="mt-3">
          Encomendas do dia: {date.getDate()} {months[date.getMonth()]}
        </h1>
        <br />
        <div className="mt-3">
          <Legend />
          <br />
          <Table
            link={"status"}
            combination
            isAdmin={user.permission === "admin"}
          />
        </div>
      </div>
    </>
  );
};

export default OrderPage;
