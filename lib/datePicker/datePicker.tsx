import React, { ReactElement, useImperativeHandle, useRef, useState } from 'react';
import './index.scss';
import Button from '../button/button'

interface CalendarProps {
    value?: Date,
    onChange?: (date: Date) => void
  }
interface CalendarRef {
  getDate: () => Date,
  setDate: (date: Date) => void,
}
type fn = (props:CalendarProps,ref:any)=>ReactElement
const InternalCalendar:fn= (props, ref) => {
  const {
    value = new Date(),
    onChange,
  } = props;

  const [date, setDate] = useState(value);

  useImperativeHandle(ref, () => {
    return {
      getDate() {
        return date;
      },
      setDate(date: Date) {
        setDate(date)
      }
    }
  });

  const handlePrevMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
  };

  const monthNames = [
    '一月',
    '二月',
    '三月',
    '四月',
    '五月',
    '六月',
    '七月',
    '八月',
    '九月',
    '十月',
    '十一月',
    '十二月',
  ];

  const daysOfMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const firstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const renderDates = () => {
    const days = [];

    const daysCount = daysOfMonth(date.getFullYear(), date.getMonth());
    const firstDay = firstDayOfMonth(date.getFullYear(), date.getMonth());

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="empty"></div>);
    }

    for (let i = 1; i <= daysCount; i++) {
      const clickHandler =onChange && onChange.bind(null, new Date(date.getFullYear(), date.getMonth(), i));
      if(i === date.getDate()) {
        days.push(<div key={i} className="day selected" onClick={clickHandler}>{i}</div>);  
      } else {
        days.push(<div key={i} className="day" onClick={clickHandler}>{i}</div>);
      }
    }

    return days;
  };

  return (
    <div className="calendar">
      <div className="header">
        <Button onClick={handlePrevMonth}>&lt;</Button>
        <div>{date.getFullYear()}年{monthNames[date.getMonth()]}</div>
        <Button onClick={handleNextMonth}>&gt;</Button>
      </div>
      <div className="days">
        <div className="day">日</div>
        <div className="day">一</div>
        <div className="day">二</div>
        <div className="day">三</div>
        <div className="day">四</div>
        <div className="day">五</div>
        <div className="day">六</div>
        {renderDates()}
      </div>
    </div>
  );
}

const Calendar = React.forwardRef(InternalCalendar);

function Test() {
  const calendarRef = useRef<CalendarRef>(null);
  return <div>
    <Calendar value={new Date()} ref={calendarRef} onChange={(date: Date) => {
      calendarRef.current&&calendarRef.current.setDate(date);
    }}></Calendar>
  </div>
}
export default Test;