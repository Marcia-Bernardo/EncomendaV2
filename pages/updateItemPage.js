import Head from "next/head";
import ItemManager from "../components/ItemManager";
import { useRouter } from "next/router";

const UpdateItemPage = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Editar item</title>
      </Head>
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
        <h2 className="mt-3">Editar item</h2>

        <div className="container mt-5 " style={{ paddingRight: 500 }}>
          <ItemManager method="PUT" id={router.query.id} />
        </div>
      </div>
    </>
  );
};

export default UpdateItemPage;
