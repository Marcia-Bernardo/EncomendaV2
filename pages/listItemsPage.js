import Head from "next/head";
import ListItems from "../components/ListItems";
import { useRouter } from "next/router";

const ListItemsPage = () => {
  const router = useRouter();

  return (
    <>
      <Head>Listar Itens</Head>

      <div className="container mt-3">
        <button
          type="button"
          className="float-end btn "
          onClick={() => {
            router.push("/orderPage");
          }}
        >
          <img src="/back.png" alt="me" width="25" height="25" />
        </button>

        <h1>Listar itens</h1>
      </div>
      <div className="container">
        <ListItems />
      </div>
    </>
  );
};

export default ListItemsPage;
