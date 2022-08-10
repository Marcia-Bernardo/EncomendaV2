const ListCards = ({ order }) => {
  // console.log(order);

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
            console.log(key, order);
            return (
              <tr key={index}>
                <th scope="row">{key}</th>
                <td>{order[key]}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default ListCards;
