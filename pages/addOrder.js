import Head from "next/head";
import OrderManager from "../components/addItem/OrderManager";
import { useRouter } from "next/router";
import { UserContext } from "../lib/AppWrapper";
import { useContext } from "react";
const AddItem = () => {
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
    <div className="container mt-4">
      <Head>
        <title>Criar pedido</title>
      </Head>

      <button
        type="button"
        className="float-end btn "
        onClick={() => {
          router.push("/orderPage");
        }}
      >
        <img src="/back.png" alt="me" width="25" height="25" />
      </button>

      <h1>Criar pedido</h1>

      <OrderManager method="POST" link="order" />
    </div>
  );
};

export default AddItem;
