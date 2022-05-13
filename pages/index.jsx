
import Head from "next/head";

import { useState, useEffect } from "react";
import Table from "../components/Table";

const Home= () => {
  const info = [
    {
      id: 3242,
      name: "Pedro",
      obs: "Pago",
      time: "11:25",
      items: [
        {
          type: "Arroz",
          qtd: 2,
        },
        { type: "Frango", qtd: 1 },
        { type: "Batata", qtd: 2 },
      ],
    },
    {
      id: 123142,
      name: "Antunes",
      obs: "Estar pronto",
      time: "12:00",
      items: [
        {
          type: "Recheado",
          qtd: 2,
        },
        { type: "Frango", qtd: 1 },
        { type: "Lulas", qtd: 2 },
      ],
    },
    {
      id: 1432511,
      name: "Jorge",
      time: "14",
      items: [
        {
          type: "Batatas",
          qtd: 1,
        },
        { type: "Frango", qtd: 3 },
      ],
    },
    {
      id: 24513543,
      name: "Maria",
      time: "15",
      items: [
        {
          type: "Batata",
          qtd: " 4 + 1/2",
        },
        { type: "Entrecosto", qtd: 6 },
      ],
    },
  ];

  const [data, setData] = useState([]);
  const [types, setTypes] = useState([
    "Batata",
    "Entrecosto",
    "Frango",
    "Lagareiro",
    "Ze do pipo",
    "Recheado",
    "Prego",
    " Bife",
    "Lulas",
    "Lulas c/gambas",
    "Bife a casa",
    "Arroz",
  ]);

  const getAnswer = async () => {
    setData(info);
    console.log("interval");
  };

  useEffect(() => {
    const timer = setInterval(getAnswer, 2000);
    return () => clearInterval(timer);
    
  }, []);
  return (
    <div className="container">
      <Head>
        <title>Encomendas</title>
      </Head>
      <h1>Encomendas Dia 12 </h1>
      <Table data={data} types={types}></Table>
    </div>
  );
};

export default Home;

