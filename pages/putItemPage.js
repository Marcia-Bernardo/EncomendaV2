import Head from "next/head";
import CreateItem from "../components/CreateItem";
import { useRouter } from "next/router";

const PutItemPage = () => {
  const router = useRouter();
  console.log(router.query.id);
  return (
    <>
      <Head>
        <title>Editar item</title>
      </Head>
      <div className="container mt-3">
        <h1 className="mt-3">Editar item</h1>

        <div className="container mt-5 " style={{ paddingRight: 500 }}>
          <CreateItem method="PUT" id={router.query.id} />
        </div>
      </div>
    </>
  );
};

export default PutItemPage;
