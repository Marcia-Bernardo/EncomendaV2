import { useState, useEffect } from "react";
import TableRow from "./TableRow";

const Table = ({ showEdit, date }) => {
  const [data, setData] = useState([]);

  const [products, setProducts] = useState([]);
  // console.log(date);
  const getAnswer = async () => {
    const response = await fetch("http://localhost:3001/api/all");

    const orderData = await response.json();

    const filteredResults = orderData.filter((order) => {
      const dateToSearch = new Date(order.date);

      const newDate = `${dateToSearch.getFullYear()}-${
        dateToSearch.getMonth() + 1
      }-${dateToSearch.getDate()}`;
      const searchDate = `${date.getFullYear()}-${
        date.getMonth() + 1
      }-${date.getDate()}`;
      console.log(newDate == searchDate);
      return newDate == searchDate;
    });
    return setData(filteredResults);

    setData(orderData);
  };

  const getProducts = async () => {
    const response = await fetch("http://localhost:3001/api/item");
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
    // getAnswer();
    if (date) {
      const timer = setInterval(getAnswer, 2000);
      return () => clearInterval(timer);
    }
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
                {products[key].name}
              </th>
            );
          })}
          <th>OBS</th>
          {showEdit && (
            <>
              <th>Editar</th>
              <th>Deletar</th>
            </>
          )}
        </tr>
      </thead>
      <tbody>
        {data.map((order) => {
          const map = {};
          order.items.map((displayItem) => {
            map[displayItem.item] = [displayItem.qtd, displayItem.isPreparing];
          });

          return (
            <TableRow
              key={order.id}
              order={order}
              products={products}
              map={map}
              displayItem={order}
              showEdit={showEdit}
            />
          );
        })}
      </tbody>
      <tfoot></tfoot>
    </table>
  );
};

export default Table;
