import React, { useEffect, useState } from "react";

const CreateItem = ({ method, id }) => {
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
      "http://localhost:3001/api/item",
      requestMetadata
    );
    const message = await response.json();
    console.log(message);
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
    const response = await fetch(`http://localhost:3001/api/item/${id}`);
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
          className="btn btn-primary col-3-lg-4 m-3"
          onClick={(e) => {
            e.preventDefault();
            saveItem();
          }}
        >
          Submeter
        </button>

        <button className="btn btn-secondary col-3-lg-4" onClick={() => {}}>
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default CreateItem;
