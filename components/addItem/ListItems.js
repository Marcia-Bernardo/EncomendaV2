import { useState, useEffect } from "react";

const ListItems = () => {
  return (
    <div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">Produto</th>
            <th scope="col">Quantidade</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Mark</th>
            <td>1</td>
          </tr>
        </tbody>
      </table>
      <button onClick={() => {}}>Save</button>
    </div>
  );
};
export default ListItems;
