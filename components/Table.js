import { useState, useEffect } from "react";
import TableRow from "./TableRow";

const Table = () => {
  const [data, setData] = useState([]);

  const [products, setProducts] = useState([]);

  const getAnswer = async () => {
    const response = await fetch("http://localhost:3001/api/all");

    const newData = await response.json();
    setData(newData);
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
    const timer = setInterval(getAnswer, 2000);
    return () => clearInterval(timer);
  }, []);
  return (
    <table className="table  table-bordered">
      <thead className="table-dark">
        <tr>
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
        </tr>
      </thead>
      <tbody>
        {data.map((item) => {
          const map = {};
          item.items.map((displayItem) => {
            map[displayItem.item] = [displayItem.qtd, displayItem.isPreparing];
          });

          return (
            <TableRow
              key={item.id}
              item={item}
              products={products}
              map={map}
              displayItem={item}
            />
          );
        })}
      </tbody>
      <tfoot></tfoot>
    </table>
  );
};

export default Table;
