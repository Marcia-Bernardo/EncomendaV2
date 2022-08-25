import Head from "next/head";
import ListItems from "../components/ListItems";
import { useRouter } from "next/router";
import { UserContext } from "../lib/AppWrapper";
import { useContext } from "react";
const ListItemsPage = () => {
  const router = useRouter();
  const { user, loading } = useContext(UserContext); //

  if (loading) {
    return;
  }
  if (!loading) {
    if (!user) {
      router.push("/");
    }
    if (user && user.permission != "admin") {
      router.push("/orderPage");
    }
  }
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
