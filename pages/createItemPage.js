import Head from "next/head";
import ItemManager from "../components/ItemManager";
import { useRouter } from "next/router";
import { UserContext } from "../lib/AppWrapper";
import { useContext } from "react";
const CreateItemPage = () => {
  const router = useRouter();
  const { user, loading } = useContext(UserContext); //

  if (loading) {
    return;
  }
  if (!loading) {
    if (!user) {
      router.push("/");
    }
    if (user.permission != "admin") {
      router.push("/orderPage");
    }
  }
  return (
    <>
      <Head>
        <title>Criar item</title>
      </Head>

      <div className="container mt-4">
        <button
          type="button"
          className="float-end btn "
          onClick={() => {
            router.push("/orderPage");
          }}
        >
          <img src="/back.png" alt="me" width="25" height="25" />
        </button>

        <h1 className="mt-3">Criar item</h1>

        <div className="container mt-3" style={{ paddingRight: 500 }}>
          <ItemManager method="POST" />
        </div>
      </div>
    </>
  );
};

export default CreateItemPage;
