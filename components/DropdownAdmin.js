// import { Dropdown } from "bootstrap";
import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { useRouter } from "next/router";

const DropdownAdmin = () => {
  const router = useRouter();
  return (
    <Dropdown className="float-end">
      <Dropdown.Toggle variant="secondary" id="dropdown-basic">
        Administrar
      </Dropdown.Toggle>

      <Dropdown.Menu>
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
            router.push("/addOrder");
          }}
        >
          Criar pedido
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => {
            router.push("/listOrderPage");
          }}
        >
          Listar pedido
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => {
            router.push("/loginPage");
          }}
        >
          Sair
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropdownAdmin;
