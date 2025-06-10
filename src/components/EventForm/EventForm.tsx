import { useState, type FC } from "react";
import { Form, Input, DatePicker, Button, Row, Select } from "antd";
import { rules } from "../../utils/rules";
import type { TEvent, TUser } from "../../types";
import { Dayjs } from "dayjs";
import { formateDate } from "../../utils/formateDate";
import { useSelector } from "../../store/store";
import { selectUserInfo } from "../../slices/sliceStorage/userSlice";

type TEventFormProps = {
  guests: TUser[];
  submit: (event: TEvent) => void;
};

const EventForm: FC<TEventFormProps> = (props) => {
  const currentUser = useSelector(selectUserInfo);
  const [event, setEvent] = useState<TEvent>({
    author: "",
    guest: "",
    date: "",
    description: "",
  });

  const selectDate = (date: Dayjs | null) => {
    if (date) {
      setEvent({ ...event, date: formateDate(date?.toDate()) });
    }
  };

  const submitForm = () => {
    props.submit({ ...event, author: currentUser.username });
  };

  return (
    <Form onFinish={submitForm}>
      <Form.Item
        label="Event Name"
        name="description"
        rules={[rules.required()]}
      >
        <Input
          onChange={(e) => setEvent({ ...event, description: e.target.value })}
          value={event.description}
        />
      </Form.Item>
      <Form.Item label="Event Date" name="date" rules={[rules.required()]}>
        <DatePicker
          onChange={(date: Dayjs) => selectDate(date)}
        />
      </Form.Item>
      <Form.Item label="Guest" name="guest" rules={[rules.required()]}>
        <Select
          options={props.guests
            .map((user) => ({
              value: user.username,
              label: user.username,
            }))
            .filter((select) => select.value !== currentUser.username)}
          onChange={(guest: string) => setEvent({ ...event, guest })}
        />
      </Form.Item>
      <Row justify="end">
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add Event
          </Button>
        </Form.Item>
      </Row>
    </Form>
  );
};

export default EventForm;
