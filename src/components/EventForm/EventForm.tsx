import { useState, type FC } from "react";
import { Form, Input, DatePicker, Button, Row, Select } from "antd";
import { rules } from "../../utils/rules";
import type { TEvent, TUser } from "../../types";

type TEventFormProps = {
  guests: TUser[];
};

const EventForm: FC<TEventFormProps> = (props) => {

  const [event, setEvent] = useState<TEvent>({
    author: "",
    guest: "",
    date: "",
    descrition: "",
  });

  return (
    <Form>
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
      <Form.Item label="Guest" name="guest" rules={[rules.required()]}>
        <Select
          options={props.guests.map((user) => ({
            value: user.username,
            label: user.username,
          }))}
          onChange={(guest:string) => setEvent({...event, guest})}
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
