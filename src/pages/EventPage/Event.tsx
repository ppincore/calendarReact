import { Layout, Row, Button, Modal } from "antd";
import { useEffect, useState, type FC } from "react";
import { useDispatch, useSelector } from "../../store/store";
import { fetchGuests, selectGuests } from "../../slices/sliceStorage/eventSlice";
import EventCalendar from "../../components/EventCalendar/EventCalendar";
import EventForm from "../../components/EventForm/EventForm";
const Event: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch()
  const guests = useSelector(selectGuests)
  const showModal = () => {
    setIsModalOpen(true);
  };
const onCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(()=>{
    dispatch(fetchGuests())
  },[])


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
        <EventForm guests={guests}/>
      </Modal>
    </Layout>
  );
};

export default Event;
