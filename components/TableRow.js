const TableRow = ({ item, types, map }) => {
  return (
    <tr key={item.id} className={item.id === 3242 ? "table-warning" : ""}>
      <td>{item.name}</td>
      <td>{item.time}</td>
      <td> {map[types[0]] || ""}</td>
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
      <td> {map[types[11]] || ""}</td>

      <td> {item.obs || ""}</td>
    </tr>
  );
};

export default TableRow;
