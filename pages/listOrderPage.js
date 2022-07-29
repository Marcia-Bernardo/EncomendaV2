import Head from "next/head";
import Table from "../components/Table";
import { useRouter } from "next/router";
import ListDate from "../components/ListDate";
import { useState } from "react";

const ListOrderPage = () => {
  const router = useRouter();
  const [dateToFilter, setDateToFilter] = useState();
  return (
    <>
      <Head>Listar Pedido</Head>

      <div className="container mt-3">
        <button
          type="button"
          className="float-end btn "
          onClick={() => {
            router.push("/");
          }}
        >
          <img src="/back.png" alt="me" width="25" height="25" />
        </button>

        <h2>Listar pedidos</h2>

        <div>
          <ListDate setDateToFilter={setDateToFilter} />
        </div>
        <div className="mt-3">
          <Table showEdit date={dateToFilter} />
        </div>
      </div>
    </>
  );
};

export default ListOrderPage;
