import { Layout, Row, Button, Modal } from "antd";
import { useEffect, useState, type FC } from "react";
import { useDispatch, useSelector } from "../../store/store";
import {
  fetchGuests,
  selectGuests,
  createEvent,
  fetchEvents,
} from "../../slices/sliceStorage/eventSlice";
import EventCalendar from "../../components/EventCalendar/EventCalendar";
import EventForm from "../../components/EventForm/EventForm";
import { selectUserInfo } from "../../slices/sliceStorage/userSlice";
const Event: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const guests = useSelector(selectGuests);
  const currentUser = useSelector(selectUserInfo).username;
  const showModal = () => {
    setIsModalOpen(true);
  };
  const onCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    dispatch(fetchGuests());
    dispatch(fetchEvents(currentUser));
  }, []);

  return (
    <Layout>
      <EventCalendar events={[]} />
      <Row justify="center">
        <Button onClick={showModal}>Add Event</Button>
      </Row>
      <Modal
        title="Add Event"
        open={isModalOpen}
        onCancel={onCancel}
        footer={null}
      >
        <EventForm
          guests={guests}
          submit={(event) => {
            dispatch(createEvent(event));
            setIsModalOpen(false);
          }}
        />
      </Modal>
    </Layout>
  );
};

export default Event;
