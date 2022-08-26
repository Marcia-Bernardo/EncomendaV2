import { useState, useEffect } from "react";
import TableRow from "./TableRow";

const Table = ({ showEdit, date, link, isAdmin }) => {
  const [data, setData] = useState([]);
  const [admin, setAdmin] = useState(isAdmin);

  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState({});

  const getOrders = async () => {
    const statusNumber = admin ? 2 : 1;
    const finalValue = date ? date : statusNumber;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/${link}/${finalValue}`
    );

    const orderData = await response.json();
    const count = {};
    orderData.forEach((order) => {
      order.items.forEach((item) => {
        if (!count[item.item]) {
          count[item.item] = 0;
        }
        count[item.item] = count[item.item] + parseFloat(item.qtd);
      });
    });
    setTotal(count);
    return setData(orderData);
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
    const timer = setInterval(getOrders, 1000 * 60 * 0.5);
    return () => clearInterval(timer);
  }, [date, link]);
  return (
    <table className="table  table-bordered">
      <thead
        className="table-dark"
        style={{
          position: "sticky",
          zIndex: 10,
          top: 0,
        }}
      >
        <tr align="center">
          <th scope="col">Hora</th>
          {Object.keys(products).map((key, index) => {
            if (total[products[key].name]) {
              return (
                <th key={index} scope="col">
                  {products[key].name}
                </th>
              );
            }
          })}
          <th>OBS</th>
          <th scope="col">Nome</th>
          {/* <th>PRONTO</th> */}
          {showEdit ? (
            <>
              <th>Editar</th>
              <th>Remover</th>
            </>
          ) : admin ? (
            link == "status" ? (
              <th>Entregue</th>
            ) : (
              <th>Não entregue</th>
            )
          ) : link == "status" ? (
            <th>Pronto</th>
          ) : (
            <th>Não pronto</th>
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
              total={total}
              isUnique={link == "uniqueStatus"}
            />
          );
        })}
      </tbody>
      <tfoot>
        <tr align="center" style={{ fontWeight: "bold", fontSize: "1.3em" }}>
          <td>Total</td>
          {products.map((key, index) => {
            if (total[key.name]) {
              return <td key={index}>{total[key.name]}</td>;
            }
          })}
        </tr>
      </tfoot>
    </table>
  );
};

export default Table;
