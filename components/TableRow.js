import { compareDates, getHour } from "../lib/utils";

const TableRow = ({ item, products, map, displayItem }) => {
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
      "http://localhost:3001/api/order",
      requestMetadata
    );
    await response.json();
  };

  return (
    <tr key={item.id}>
      <td>{item.name}</td>
      <td>{getHour(item.date)}</td>

      {Object.keys(products).map((product, index) => {
        console.log(map[products[product].name]);
        return (
          <td
            style={{
              backgroundColor: compareDates(
                item.date,
                products[product],
                map[products[product].name] || 0
              ),
            }}
            key={index}
            onClick={() => {
              // console.log(item.id, products[product].name);
              changeStatus(item.id, products[product].name);
            }}
          >
            {map[products[product].name] || ""}
          </td>
        );
      })}

      <td> {item.obs || ""}</td>
    </tr>
  );
};

export default TableRow;
