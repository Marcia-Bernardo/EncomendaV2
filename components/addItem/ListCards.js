const ListCards = ({ order }) => {
  return (
    <div>
      <table className="table table-bordered mt-3 ">
        <thead>
          <tr>
            <th scope="col">Produto</th>
            <th scope="col">Quantidade</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(order).map((key, index) => {
            return (
              <tr key={index}>
                <th scope="row">{key}</th>
                <td>{order[key]}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* {order.map((item) => {
        const name = item.name;
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">Produto</th>
              <th scope="col">Quantidade</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row" key={item.id}>
                {item.name}
              </th>
              <td>{qtd[name]}</td>
            </tr>
        
      })} */}
    </div>
  );
};
export default ListCards;
