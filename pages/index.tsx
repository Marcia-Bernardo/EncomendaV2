import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";

interface IItem {
  type: string;
  qtd: string | number;
}
interface IIndex {
  [key: string]: boolean;
}

interface IOrder {
  id: number;
  name: string;
  time: string;
  items: IItem[];
  obs?: string;
}
interface IOrders extends Array<IOrder> {}
const Home: NextPage = () => {
  const info: IOrders = [
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

  const [data, setData] = useState<IOrders>([]);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="container">
      <Head>
        <title>Encomendas</title>
      </Head>
      <h1>Encomendas Dia 12 </h1>
      <table className="table table-hover table-bordered">
        <thead className="table-dark">
          <tr>
            <th scope="col">Nome</th>
            <th scope="col">Hora</th>
            {types.map((type: string, index) => {
              return (
                <th key={index} scope="col">
                  {type}
                </th>
              );
            })}
            <th>OBS</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item: IOrder) => {
            const map: IIndex = {};
            item.items.map((displayItem: IItem) => {
              //@ts-ignore: Unreachable code error
              map[displayItem.type] = displayItem.qtd;
              //@ts-ignore: Unreachable code error
            });
            return (
              <tr
                key={item.id}
                className={item.id === 3242 ? "table-warning" : ""}
              >
                <td>{item.name}</td>
                <td>{item.time}</td>

                <td> {map[types[0]] || ""}</td>
                <td> {map[types[1]] || ""}</td>
                <td> {map[types[2]] || ""}</td>
                <td> {map[types[3]] || ""}</td>
                <td> {map[types[4]] || ""}</td>
                <td> {map[types[5]] || ""}</td>
                <td> {map[types[6]] || ""}</td>
                <td> {map[types[7]] || ""}</td>
                <td> {map[types[8]] || ""}</td>
                <td> {map[types[9]] || ""}</td>
                <td> {map[types[10]] || ""}</td>
                <td> {map[types[11]] || ""}</td>

                <td> {item.obs || ""}</td>
              </tr>
            );
          })}
        </tbody>
        <tfoot></tfoot>
      </table>
    </div>
  );
};

export default Home;

