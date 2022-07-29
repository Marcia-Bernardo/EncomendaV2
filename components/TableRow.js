import { compareDates, getHour } from "../lib/utils";
import Link from "next/link";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import pt from "date-fns/locale/pt";
registerLocale("pt", pt);

const TableRow = ({ order, products, map, showEdit }) => {
  const changeStatus = async (id, itemName) => {
    const requestMetadata = {
      method: "PUT",
      credential: "same-origin",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, itemName }),
    };

    const response = await fetch(
      `${process.env.BACKEND_URL}/api/order`,
      requestMetadata
    );
    await response.json();
  };

  const deleteOrder = async (id) => {
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
      "http://localhost:3001/api/order",
      requestMetadata
    );
    await response.json();
  };
  return (
    <tr key={order.id} align="center">
      <td>{order.name}</td>
      <td>{getHour(order.date)}</td>

      {Object.keys(products).map((product, index) => {
        return (
          <td
            style={{
              backgroundColor: compareDates(
                order.date,
                products[product],
                map[products[product].name] || 0
              ),
            }}
            key={index}
            onClick={() => {
              // console.log(item.id, products[product].name);
              changeStatus(order.id, products[product].name);
            }}
          >
            {map[products[product].name] || ""}
          </td>
        );
      })}

      <td> {order.obs || ""}</td>
      {showEdit && (
        <>
          <td>
            <Link
              href={{
                pathname: "/updateOrderPage",
                query: { id: order.id },
              }}
            >
              <img src="/pencil.png" alt="me" width="25" height="25" />
            </Link>
          </td>
          <td>
            <button
              type="button"
              className="btn  btn-sm "
              onClick={() => {
                deleteOrder(order.id);
              }}
            >
              <img src="/trash.png" alt="me" width="25" height="25" />
            </button>
          </td>
        </>
      )}
    </tr>
  );
};

export default TableRow;
