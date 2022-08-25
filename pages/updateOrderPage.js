import OrderManager from "../components/addItem/OrderManager";
import Head from "next/head";
import { useRouter } from "next/router";
import Image from "next/image";
import { UserContext } from "../lib/AppWrapper";
import { useContext } from "react";

const UpdateOrderPage = () => {
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
      <Head>
        <title>Editar item</title>
      </Head>

      <div className="container mt-3">
        <button
          type="button"
          className="float-end btn "
          onClick={() => {
            router.push("/listOrderPage");
          }}
        >
          <Image src="/back.png" alt="me" width="25" height="25" />
        </button>
        <h2>Editar item</h2>
        <OrderManager method="PUT" id={router.query.id} link="orderUpdate" />
      </div>
    </>
  );
};

export default UpdateOrderPage;
