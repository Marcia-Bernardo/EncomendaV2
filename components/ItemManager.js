import React, { useEffect, useState } from "react";

const ItemManager = ({ method, id }) => {
  const [saveName, setSaveName] = useState("");
  const [saveConfTime, setSaveConfTime] = useState("");

  const saveItem = async () => {
    const requestMetadata = {
      method: method,
      credential: "same-origin",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
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
      return alert(
        message.error.map((erro, index) => {
          //   if (index == 0) {
          //     return "";
          //   }
          return erro.msg + "\n";
        })
      );
    }
    alert(message);
    setSaveConfTime("");
    setSaveName("");
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
  }, []);

  return (
    <form>
      <div className="form-group">
        <label htmlFor="exampleInputNomeItem">Nome: </label>
        <br />
        <input
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
        <label htmlFor="exampleInputTime">Tempo de preparo: </label>
        <input
          type="text"
          className="form-control"
          id="exampleInputTime"
          onChange={(e) => {
            setSaveConfTime(e.target.value);
          }}
          value={saveConfTime}
          placeholder="Tempo"
        />
        <br />
      </div>
      <div className="container ">
        <button
          className="btn btn-primary col-3-lg-4 m-3 float-end"
          onClick={(e) => {
            e.preventDefault();
            saveItem();
          }}
        >
          Enviar
        </button>
      </div>
    </form>
  );
};

export default ItemManager;
