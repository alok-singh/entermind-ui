import { useState } from 'react';
// import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Input from '../input';
import Calendar from 'react-calendar';
import { Calendar as CalenderIcon } from 'lucide-react';
import { formatDate } from '../../utils/parse.util';

const CalendarInput = (props) => {
  const [showCalendar, setShowCalendar] = useState(false);
  return (
    <div className={`${props.className} relative`}>
      <Input className={props.inputClassName} value={formatDate(props.value)} onClick={() => setShowCalendar(true)} />
      <Calendar
        className={`absolute ${showCalendar ? '' : 'invisible'}`}
        value={props.value}
        onChange={(newValue) => {
          props.onChange(newValue.getTime());
          setShowCalendar(false);
        }}
      />
      <CalenderIcon color="#0f1419" className="absolute top-1.5 right-1.5 cursor-pointer p-1" width="24px" height="24px" onClick={() => setShowCalendar(!showCalendar)} />
    </div>
  );
};

export default CalendarInput;
