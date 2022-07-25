import Head from "next/head";
import { useState, useEffect } from "react";
import Table from "../components/Table";

const Home = () => {
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
    <div className="container">
      <Head>
        <title>Encomendas</title>
      </Head>
      <h1 className="mt-5">
        Encomendas do dia: {date.getDate()} {months[date.getMonth()]}{" "}
      </h1>
      <div className="mt-5">
        <Table />
      </div>
    </div>
  );
};

export default Home;
