import { compareDates, getHour } from "../lib/utils";
import Link from "next/link";
import Image from "next/image";
import DatePicker, { registerLocale } from "react-datepicker";
import { useRouter } from "next/router";
import "react-datepicker/dist/react-datepicker.css";
import pt from "date-fns/locale/pt";
import Cookies from "js-cookie";
registerLocale("pt", pt);

const TableRow = ({
  order,
  products,
  map,
  showEdit,
  admin,
  getOrders,
  total,
  isUnique,
}) => {
  const router = useRouter();
  const changeItemStatus = async (id, itemName) => {
    const token = Cookies.get("token");
    const requestMetadata = {
      method: "PUT",
      credential: "same-origin",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        token,
      },
      body: JSON.stringify({ id, itemName }),
    };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/statusItemOrder`,
      requestMetadata
    );
    await response.json();
    getOrders();
  };

  const changeStatus = async (id, status) => {
    const token = Cookies.get("token");
    const requestMetadata = {
      method: "PUT",
      credential: "same-origin",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        token,
      },
      body: JSON.stringify({ id, status }),
    };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orderStatus`,
      requestMetadata
    );
    await response.json();
    getOrders();
  };

  const deleteOrder = async (id) => {
    const token = Cookies.get("token");
    const requestMetadata = {
      method: "DELETE",
      credential: "same-origin",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        token,
      },
      body: JSON.stringify({
        id,
      }),
    };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/order`,
      requestMetadata
    );
    await response.json();
    getOrders();
  };
  return (
    <tr
      key={order.id}
      align="center"
      style={{ fontWeight: "bold", fontSize: "1.3em" }}
    >
      <td>{getHour(order.date)}</td>

      {Object.keys(products).map((product, index) => {
        if (total[products[product].name]) {
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
                changeItemStatus(order.id, products[product].name);
              }}
            >
              {map[products[product].name] && map[products[product].name][0]}
            </td>
          );
        }
      })}

      <td style={{ fontWeight: "normal", fontSize: "0.8em" }}>
        {" "}
        {order.obs || ""}
      </td>
      <td style={{ fontWeight: "normal", fontSize: "0.8em" }}>{order.name}</td>
      {showEdit ? (
        <>
          <td>
            <button
              type="button"
              className="btn  btn-sm "
              onClick={() => {
                router.push(`/updateOrderPage?id=${order.id}`);
              }}
            >
              <Image src="/pencil.png" alt="me" width={25} height={25} />
            </button>
          </td>
          <td>
            <button
              type="button"
              className="btn  btn-sm "
              onClick={() => {
                if (
                  confirm(
                    `Tem a certeza que pretende apagar a encomenda de ${order.name}`
                  )
                ) {
                  deleteOrder(order.id);
                }
              }}
            >
              <Image src="/trash.png" alt="me" width="25" height="25" />
            </button>
          </td>
        </>
      ) : admin ? (
        isUnique ? (
          <td>
            <button
              type="button"
              className="btn  btn-sm "
              onClick={() => {
                changeStatus(order.id, 1);
              }}
            >
              <Image src="/not_delivered.png" alt="me" width={40} height={43} />
            </button>
          </td>
        ) : (
          <td>
            <button
              type="button"
              className="btn  btn-sm "
              onClick={() => {
                changeStatus(order.id, 2);
              }}
            >
              <Image src="/delivered.png" alt="me" width={40} height={43} />
            </button>
          </td>
        )
      ) : isUnique ? (
        <td>
          <button
            type="button"
            className="btn  btn-sm "
            onClick={() => {
              changeStatus(order.id, 0);
            }}
          >
            <Image src="/not_ready.png" alt="me" width={40} height={43} />
          </button>
        </td>
      ) : (
        <td>
          <button
            type="button"
            className="btn  btn-sm "
            onClick={() => {
              changeStatus(order.id, 1);
            }}
          >
            <Image src="/ready.png" alt="me" width={20} height={20} />
          </button>
        </td>
      )}
    </tr>
  );
};

export default TableRow;
