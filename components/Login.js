import { useState, useContext } from "react";
import Cookies from "js-cookie";
import { Router } from "react-router";
import { useRouter } from "next/router";
import { UserContext } from "../lib/AppWrapper";

const Login = () => {
  const router = useRouter();
  const [username, setName] = useState();
  const [password, setPassword] = useState();
  const { user, setUser } = useContext(UserContext);

  const sendRequest = async () => {
    const requestMetadata = {
      method: "POST",

      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/login`,
      requestMetadata
    );

    const message = await response.json();

    if (message.error) {
      return alert(
        message.error.map((erro) => {
          return erro.msg + "\n";
        })
      );
    }

    if (message.jwt) {
      Cookies.set("token", message.jwt, {
        path: "",
        expires: 1000 * 24 * 365 * 60 * 60, // 1 year cookie
      });
      setUser({ ...message.user });
      localStorage.setItem("user", JSON.stringify({ ...message.user }));
      router.push("/orderPage");
    }
    // alert(message);
  };

  return (
    <form>
      <div className="mb-3 mt-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Nome do utilizador
        </label>
        <input
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Senha
        </label>
        <input
          type="password"
          className="form-control"
          id="exampleInputPassword1"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <div className="mb-3 form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="exampleCheck1"
        />
        <label className="form-check-label" htmlFor="exampleCheck1">
          Salvar senha
        </label>
      </div>
      <button
        type="submit"
        className="btn btn-primary"
        onClick={(e) => {
          e.preventDefault();
          sendRequest();
        }}
      >
        Submit
      </button>
    </form>
  );
};

export default Login;
