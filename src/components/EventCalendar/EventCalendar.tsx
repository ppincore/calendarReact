import { type FC } from "react";
import { Calendar, type CalendarProps } from "antd";
import type { TEvent } from "../../types";
import  { Dayjs } from "dayjs";
import { formateDate } from "../../utils/formateDate";

type TEventCalsendarProps = {
  events: TEvent[];
};

const EventCalendar: FC<TEventCalsendarProps> = (props) => {
  const dateCellRender = (date: Dayjs) => {
    const formatedDate = formateDate(date.toDate());
    const currentDayEvents = props.events.filter(ev => ev.date === formatedDate)
    return (<div>
        {currentDayEvents.map((ev,i) => <div key={i}>{ev.description}</div> )}
    </div>);
  };

  const cellRender: CalendarProps<Dayjs>["cellRender"] = (current, info) => {
    if (info.type === "date") return dateCellRender(current);
    return info.originNode;
  };

  return <Calendar cellRender={cellRender} />;
};

export default EventCalendar;
