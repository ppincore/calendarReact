import { Header } from "antd/es/layout/layout";
import { Menu, Row } from "antd";
import { useNavigate } from "react-router-dom";
import type { MenuProps } from "antd";
import { useSelector, useDispatch } from "../../store/store.ts";
import {
  selectIsAuth,
  fetchLogout,
  selectUserInfo,
} from "../../slices/sliceStorage/userSlice";

const NavBar = () => {
  const router = useNavigate();
  const isAuth = useSelector(selectIsAuth);
  const userInfo = useSelector(selectUserInfo);
  const dispatch = useDispatch();

  const menuItemsUnAuth: MenuProps["items"] = [
    {
      key: "2",
      label: "Войти",
      onClick: () => {
        router("/login");
      },
    },
  ];

  const menuItemsAuth: MenuProps["items"] = [
    {
      key: "1",
      label: "Выйти",
      onClick: () => {
        dispatch(fetchLogout());
        router("/login");
      },
    },
  ];

  return (
    <Header>
      <Row justify={"end"}>
        {isAuth ? (
          <>
            <div style={{ color: "white" }}>{userInfo.username}</div>
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
