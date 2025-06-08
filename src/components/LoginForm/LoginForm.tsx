import { Form, Input, Button } from "antd";
import { rules } from "../utils/rules";
const LoginForm = () => {
  const submit = () => {
    console.log('sub')
  }
  return (
    <Form
      onFinish={submit}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[rules.required("Please input your username")]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Password"
        name="Password"
        rules={[rules.required("Password is incorrect")]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Login
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
