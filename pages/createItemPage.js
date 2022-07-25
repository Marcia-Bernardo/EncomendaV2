import Head from "next/head";
import CreateItem from "../components/CreateItem";

const CreateItemPage = () => {
  return (
    <>
      <Head>
        <title>Criar item</title>
      </Head>
      <div className="container mt-3">
        <h1 className="mt-3">Criar item</h1>

        <div className="container mt-5 " style={{ paddingRight: 500 }}>
          <CreateItem method="POST" />
        </div>
      </div>
    </>
  );
};

export default CreateItemPage;
