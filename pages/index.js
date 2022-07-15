import Head from "next/head";
import { useState, useEffect } from "react";
import Table from "../components/Table";

const Home = () => {
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
  const [types, setTypes] = useState([]);
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
  const getAnswer = async () => {
    setData(info);
  };

  const getTypes = async () => {
    const response = await fetch("http://localhost:3001/api/item");
    const newData = await response.json();
    console.log(newData);
    const newTypes = [];
    if (newData) {
      newData.forEach((item) => {
        newTypes.push(item.name);
      });
    }
    setTypes(newTypes);
  };
  useEffect(() => {
    getTypes();
    const timer = setInterval(getAnswer, 2000);
    return () => clearInterval(timer);
  }, []);
  // useEffect(() => {
  //   const timer = setInterval(getAnswer, 2000);
  //   return () => clearInterval(timer);
  // }, []);
  // const date = new Date();

  return (
    <div className="container">
      <Head>
        <title>Encomendas</title>
      </Head>
      <h1 className="mt-3">
        Encomendas Dia {date.getDate()} {months[date.getMonth()]}{" "}
      </h1>
      <Table data={data} types={types}></Table>
    </div>
  );
};

export default Home;
