import ListItems from "../components/ListItems";

const ListItemsPage = () => {
  return (
    <>
      <div className="container mt-3">
        <h1>Listar Itens</h1>
        <div className="container">
          <ListItems />
        </div>
      </div>
    </>
  );
};

export default ListItemsPage;
