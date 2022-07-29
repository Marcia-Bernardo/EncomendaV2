import OrderManager from "../components/addItem/OrderManager";
import Head from "next/head";
import { useRouter } from "next/router";

const UpdateOrderPage = () => {
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
        <h2>Editar item</h2>
        <OrderManager method="PUT" id={router.query.id} />
      </div>
    </>
  );
};

export default UpdateOrderPage;
