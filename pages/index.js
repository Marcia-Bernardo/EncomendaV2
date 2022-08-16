import Head from "next/head";
import React from "react";
import Login from "../components/Login";

const LoginPage = () => {
  return (
    <>
      <Head>
        <title>Logar</title>
      </Head>
      <div
        className="container mt-3"
        style={{ paddingRight: 500, "font-size": "20px" }}
      >
        <h2>Entrar conta</h2>
        <Login />
      </div>
    </>
  );
};

export default LoginPage;
