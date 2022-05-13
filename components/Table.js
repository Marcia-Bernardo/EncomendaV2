import TableRow from "./TableRow";

const Table = ({ data, types }) => {
  return (
    <table className="table table-hover table-bordered">
      <thead className="table-dark">
        <tr>
          <th scope="col">Nome</th>
          <th scope="col">Hora</th>
          {types.map((type, index) => {
            return (
              <th key={index} scope="col">
                {type}
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
            map[displayItem.type] = displayItem.qtd;
          });
          return <TableRow key={item.id} item={item} types={types} map={map} />;
        })}
      </tbody>
      <tfoot></tfoot>
    </table>
  );
};

export default Table;
