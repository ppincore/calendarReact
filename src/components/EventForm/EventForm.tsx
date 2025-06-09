import {type FC} from 'react'
import { Form, Input, DatePicker, Button, Row, Select } from "antd";
import { rules } from "../../utils/rules";
import type { TUser } from "../../types";

type TEventFormProps = {
  guests:TUser[]
}

const EventForm:FC<TEventFormProps> = (props) => {
  return (
    <Form >
      <Form.Item
        label="Event Name"
        name="description"
        rules={[rules.required()]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Event Date" name="date" rules={[rules.required()]}>
        <DatePicker />
      </Form.Item>
      <Form.Item label="Event Date" name="date" rules={[rules.required()]}>
        <Select
          // options={[
          //   { value: "jack", label: "Jack" },
          //   { value: "lucy", label: "Lucy" },
          //   { value: "Yiminghe", label: "yiminghe" },
          //   { value: "disabled", label: "Disabled", disabled: true },
          // ]}
          options={props.guests.map((user)=>({
            value: user.username, label: user.username
          }))}
        />
      </Form.Item>
      <Row justify="end">
        <Form.Item>
          <Button type="primary">Add Event</Button>
        </Form.Item>
      </Row>
    </Form>
  );
};

export default EventForm;
