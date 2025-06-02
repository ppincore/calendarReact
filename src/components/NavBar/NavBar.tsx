import { Header } from "antd/es/layout/layout";
import { Menu, Row } from "antd";
import { useNavigate } from "react-router-dom";

import type { MenuProps } from "antd";
const NavBar = () => {
  const router = useNavigate();
  const auth = true;
  console.log(router);

  const menuItemsUnAuth: MenuProps["items"] = [
    {
      key: "2",
      label: "Выйти",
      onClick: () => {
        console.log("logIn");
      },
    },
  ];

  const menuItemsAuth: MenuProps["items"] = [
    {
      key: "1",
      label: "Выйти",
      onClick: () => {
        console.log("logOut");
      },
    },
  ];

  return (
    <Header>
      <Row justify={"end"}>
        {auth ? (
          <>
            <div style={{ color: "white" }}>Admin</div>
            <Menu
              theme="dark"
              mode="horizontal"
              selectable={false}
              items={menuItemsAuth}
            />
          </>
        ) : (
          <Menu
            theme="dark"
            mode="horizontal"
            selectable={false}
            items={menuItemsUnAuth}
          />
        )}
      </Row>
    </Header>
  );
};

export default NavBar;
