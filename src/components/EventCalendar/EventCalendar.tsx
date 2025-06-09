import {type FC} from 'react';
import { Calendar } from 'antd';
import type { TEvent } from '../../types';

type TEventCalsendarProps = {
  events: TEvent[];

}

const EventCalendar: FC<TEventCalsendarProps> = () => {
  return (
    <Calendar/>
  );
};

export default EventCalendar;