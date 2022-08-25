// import { Dropdown } from "bootstrap";
import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
const DropdownAdmin = ({ isAdmin }) => {
  const router = useRouter();
  return (
    <Dropdown className="float-end">
      <Dropdown.Toggle
        variant="secondary"
        id="dropdown-basic"
        style={{ fontSize: "20px" }}
      >
        Administrar
      </Dropdown.Toggle>

      <Dropdown.Menu style={{ fontSize: "20px" }}>
        {isAdmin && (
          <>
            <Dropdown.Item
              onClick={() => {
                router.push("/createItemPage");
              }}
            >
              Criar item
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                router.push("/listItemsPage");
              }}
            >
              Listar item
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                router.push("/listOrderPage");
              }}
            >
              Listar pedido
            </Dropdown.Item>
          </>
        )}
        <Dropdown.Item
          onClick={() => {
            Cookies.remove("token");
            localStorage.removeItem("user");
            router.push("/");
          }}
        >
          Sair
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropdownAdmin;
