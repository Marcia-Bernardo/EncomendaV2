import { compareDates } from "../lib/utils";

const TableRow = ({ item, types, map, displayItem }) => {
  return (
    <tr
      key={item.id}
      className={
        compareDates(item.time, displayItem.confetionTime)
          ? "table-warning"
          : ""
      }
    >
      <td>{item.name}</td>
      <td>{item.time}</td>
      {/* <td> {map[types[0]] || ""}</td>
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
      <td> {map[types[11]] || ""}</td> */}

      {types.map((type, index) => {
        return <td key={index}>{map[types[index]] || ""}</td>;
      })}

      <td> {item.obs || ""}</td>
    </tr>
  );
};

export default TableRow;
