import { useState, useEffect } from "react";
import Link from "next/link";

const ListItems = () => {
  const [items, setItems] = useState([]);

  const listAllItems = async () => {
    const response = await fetch("http://localhost:3001/api/item");
    const listAllI = await response.json();
    setItems(listAllI);
  };

  useEffect(() => {
    listAllItems();
  }, []);

  const deleteItem = async (id) => {
    const requestMetadata = {
      method: "DELETE",
      credential: "same-origin",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    };

    const response = await fetch(
      "http://localhost:3001/api/item",
      requestMetadata
    );
    await response.json();

    listAllItems();
  };

  return (
    <div className="container">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Item</th>
            <th scope="col">Tempo</th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => {
            return (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.confetionTime} min</td>

                <td>
                  <Link
                    href={{
                      pathname: "/updateItemPage",
                      query: { id: item.id },
                    }}
                  >
                    Editar
                  </Link>
                </td>
                <td>
                  <button
                    onClick={() => {
                      deleteItem(item.id);
                    }}
                  >
                    Remover
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ListItems;
