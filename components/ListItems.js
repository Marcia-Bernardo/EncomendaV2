import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
const ListItems = () => {
  const [items, setItems] = useState([]);
  const [classAlert, setClassAlert] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const listAllItems = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/item`
    );
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
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/item`,
      requestMetadata
    );
    const res = await response.json();
    console.log(res);

    listAllItems();
  };
  const updateItem = async (number, direction) => {
    const requestMetadata = {
      method: "PUT",
      credential: "same-origin",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        number,
        direction,
      }),
    };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/item/changeOrder`,
      requestMetadata
    );
    const message = await response.json();
    console.log(message);
    if (message.error) {
      setClassAlert("alert alert-danger alert-dismissible fade show");

      const error = message.error.map((erro, index) => {
        return <p key={index}>{erro.msg}</p>;
      });

      setAlertMessage(error);
      setTimeout(() => {
        setClassAlert("");
        setAlertMessage("");
      }, 2500);
      return;
    }

    setClassAlert("alert alert-success alert-dismissible fade show");
    setAlertMessage(`Pedido movido  com sucesso!`);
    setTimeout(() => {
      setClassAlert("");
      setAlertMessage("");
    }, 2500);

    listAllItems();
  };
  return (
    <div className="container">
      <div className={classAlert} role="alert">
        {alertMessage}
      </div>
      <table className="table" style={{ fontSize: "20px" }}>
        <thead>
          <tr>
            <th scope="col">Item</th>
            <th scope="col">Tempo</th>
            <th scope="col">Editar</th>
            <th scope="col">Remover</th>
            <th scope="col">Subir Item</th>
            <th scope="col">Descer Item</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => {
            return (
              <tr key={item.id}>
                <td>
                  {item.name} {index}
                </td>
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
                    className="btn btn-danger"
                    onClick={() => {
                      deleteItem(item.id);
                    }}
                  >
                    Remover
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn  btn-sm "
                    onClick={() => {
                      updateItem(item.orderNumber, "up");
                    }}
                  >
                    <Image
                      src="/up_arrow.png"
                      alt="me"
                      width="25"
                      height="25"
                    />
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn  btn-sm "
                    onClick={() => {
                      updateItem(item.orderNumber, "down");
                    }}
                  >
                    <Image
                      src="/down_arrow.png"
                      alt="me"
                      width="25"
                      height="25"
                    />
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
