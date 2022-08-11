import { useState, useEffect } from "react";
import { getColIndex } from "../lib/utils";
import TableRow from "./TableRow";

const Table = ({ showEdit, date, combination }) => {
  const [data, setData] = useState([]);
  const [admin, setAdmin] = useState(false);

  const [products, setProducts] = useState([]);
  const getOrders = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/all`
    );

    const orderData = await response.json();

    const filteredResults = orderData.filter((order) => {
      order.items.map((item) => {});
      return order;
    });

    return setData(filteredResults);
  };
  const getProducts = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/item`
    );
    const newData = await response.json();
    const products = [];
    if (newData) {
      newData.forEach((item) => {
        products.push({ name: item.name, confetionTime: item.confetionTime });
      });
    }
    setProducts(products);
  };

  useEffect(() => {
    getProducts();
    getOrders();
    const timer = setInterval(getOrders, 1000 * 60 * 5);
    return () => clearInterval(timer);
  }, [date]);
  return (
    <table className="table  table-bordered">
      <thead className="table-dark">
        <tr align="center">
          <th scope="col">Nome</th>
          <th scope="col">Hora</th>
          {Object.keys(products).map((key, index) => {
            return (
              <th key={index} scope="col">
                {combination
                  ? getColIndex(products[key].name)
                  : products[key].name}
              </th>
            );
          })}
          <th>OBS</th>

          {/* <th>PRONTO</th> */}
          {showEdit ? (
            <>
              <th>Editar</th>
              <th>Deletar</th>
            </>
          ) : admin ? (
            <th>Entregue</th>
          ) : (
            <th>Pronto</th>
          )}
        </tr>
      </thead>
      <tbody>
        {data.map((order) => {
          const map = {};
          order.items.map((displayItem) => {
            map[displayItem.item] = [displayItem.qtd, displayItem.status];
          });

          return (
            <TableRow
              key={order.id}
              order={order}
              products={products}
              map={map}
              displayItem={order}
              showEdit={showEdit}
              admin={admin}
              getOrders={getOrders}
            />
          );
        })}
      </tbody>
      <tfoot></tfoot>
    </table>
  );
};

export default Table;
