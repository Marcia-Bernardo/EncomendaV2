import Head from "next/head";
import Table from "../components/Table";
import { useRouter } from "next/router";
import ListDate from "../components/ListDate";
import { useContext, useState } from "react";
import { UserContext } from "../lib/AppWrapper";

const ListOrderPage = () => {
  const router = useRouter();
  const [dateToFilter, setDateToFilter] = useState(new Date());
  const { user, loading } = useContext(UserContext); //

  if (loading) {
    return;
  }
  if (!loading) {
    if (!user) {
      router.push("/");
    }
    if (user.permission != "admin") {
      router.push("/orderPage");
    }
  }

  return (
    <>
      <Head>Listar Pedido</Head>

      <div className="container mt-4">
        <button
          type="button"
          className="float-end btn "
          onClick={() => {
            router.push("/orderPage");
          }}
        >
          <img src="/back.png" alt="me" width="25" height="25" />
        </button>

        <h1>Listar pedidos</h1>

        <div className="mt-3">
          <ListDate setDateToFilter={setDateToFilter} />
        </div>
        <div className="mt-3">
          <Table showEdit date={dateToFilter} link={"date"} />
        </div>
      </div>
    </>
  );
};

export default ListOrderPage;
