import { Form, Input, Button } from "antd";
import { rules } from "../../utils/rules";
import { useSelector, useDispatch } from "../../store/store.ts";
import {
  selectUserLoading,
  selectUserError,
  fetchUser,
  clearError,
} from "../../slices/sliceStorage/userSlice.ts";
import { useEffect, useState } from "react";

const LoginForm = () => {
  const [userName, setUserName] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");
  const isLoading = useSelector(selectUserLoading);
  const errorMessage = useSelector(selectUserError);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearError());
  }, [userName, userPassword, dispatch]);

  const submit = () => {
    dispatch(fetchUser({ username: userName, password: userPassword }));
  };

  return (
    <Form onFinish={submit}>
      <Form.Item
        label="Username"
        name="username"
        rules={[rules.required("Please input your username")]}
      >
        <Input value={userName} onChange={(e) => setUserName(e.target.value)} />
      </Form.Item>
      <Form.Item
        label="Password"
        name="Password"
        rules={[rules.required("Password is incorrect")]}
      >
        <Input
          value={userPassword}
          onChange={(e) => setUserPassword(e.target.value)}
          type="password"
        />
      </Form.Item>
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          Login
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
