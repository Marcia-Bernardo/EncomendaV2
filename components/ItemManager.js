import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
const ItemManager = ({ method, id }) => {
  const [saveName, setSaveName] = useState("");
  const [saveConfTime, setSaveConfTime] = useState("");
  const [classAlert, setClassAlert] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const saveItem = async () => {
    const token = Cookies.get("token");
    const requestMetadata = {
      method: method,
      credential: "same-origin",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        token,
      },
      body: JSON.stringify({
        name: saveName,
        confetionTime: saveConfTime,
        id,
      }),
    };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/item`,
      requestMetadata
    );
    const message = await response.json();
    if (message.error) {
      setClassAlert("alert alert-danger alert-dismissible fade show");
      const error = message.error.map((erro, index) => {
        return <p key={index}>{erro.msg} </p>;
      });
      setAlertMessage(error);
      return;
    }
    // alert(message);
    setSaveConfTime("");
    setSaveName("");
    setClassAlert("alert alert-success alert-dismissible fade show");
    setAlertMessage(
      `Item ${method == "PUT" ? "atualizado" : "criado"} com sucesso!`
    );
    setTimeout(() => {
      setClassAlert("");
      setAlertMessage("");
    }, 2500);
  };

  const getItem = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/item/${id}`
    );
    const newData = await response.json();

    if (newData) {
      setSaveName(newData.name);
      setSaveConfTime(newData.confetionTime);
    }
  };

  useEffect(() => {
    if (id) {
      getItem();
    }
  }, [id]);

  return (
    <form>
      <div className="form-group ">
        <label htmlFor="exampleInputNomeItem">Nome: </label>
        <br />
        <input
          style={{ fontSize: "20px" }}
          type="text"
          className="form-control"
          id="exampleInputNomeItem"
          onChange={(e) => {
            setSaveName(e.target.value);
          }}
          placeholder="Nome item"
          value={saveName}
        />
      </div>
      <br />
      <div className="form-group">
        <label htmlFor="exampleInputTime">Tempo de preparo (minutos): </label>
        <input
          style={{ fontSize: "20px" }}
          type="text"
          className="form-control"
          id="exampleInputTime"
          onChange={(e) => {
            const finalValue = e.target.value.match(/\d*/g)[0];
            setSaveConfTime(finalValue);
          }}
          value={saveConfTime}
          placeholder="Tempo (minutos)"
        />
        <br />
      </div>
      <div className={classAlert} role="alert">
        {alertMessage}
      </div>
      <div className="container ">
        <button
          className="btn btn-primary col-3-lg-4 m-3 float-end"
          onClick={(e) => {
            e.preventDefault();
            saveItem();
          }}
          style={{ fontSize: "20px" }}
        >
          Enviar
        </button>
      </div>
    </form>
  );
};

export default ItemManager;
