import {
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isSameDay,
  startOfMonth,
  startOfToday,
} from "date-fns";
import styles from "./CalendarMonth.module.scss";
import Tiles from "../Tiles/Tiles";
import Controll from "../Controll/Controll";
import { useEffect, useMemo, useState } from "react";
import { useLocalizedDaysOfWeek } from "../../../helpers/enums/DaysOfWeek";

const UserEventOnTheSelectedDay = (events, day) => {
  const eventToday = events?.filter((event) => {
    return isSameDay(event.date, day);
  });

  return eventToday;
};

function CalendarMonth({ events, setDayTarget, setEventTarget, role }) {
  const [selectDate, setSelectDate] = useState();
  const [selectedItemId, setSelectedItemId] = useState(null);
  const daysOfWeek = useLocalizedDaysOfWeek();
  
  const firstDayOfMonth = useMemo(() => startOfMonth(selectDate), [selectDate]);
  const lastDayOfMonth = useMemo(() => endOfMonth(selectDate), [selectDate]);

  const daysInMonth = useMemo(
    () => eachDayOfInterval({ start: firstDayOfMonth, end: lastDayOfMonth }),
    [firstDayOfMonth, lastDayOfMonth]
  );

  const startingDay = () => {
    if (getDay(firstDayOfMonth) !== 0) {
      return getDay(firstDayOfMonth) - 1;
    } else {
      return 6;
    }
  };

  const lastDay = () => {
    if (7 - getDay(lastDayOfMonth) !== 7) {
      return 7 - getDay(lastDayOfMonth);
    } else {
      return 0;
    }
  };

  const today = format(startOfToday(), "d");

  useEffect(() => {
    const currentDate = new Date();
    const eventsToDay = UserEventOnTheSelectedDay(events, currentDate);

    setDayTarget(currentDate);
    setEventTarget(eventsToDay);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const handleItemClick = (itemId) => {
    setSelectedItemId(itemId);
  };

  return (
    <div className={styles.wrapper}>
      <Controll setSelectDate={setSelectDate} />

      <div className={styles.wrapper_weekdays}>
        {Object.values(daysOfWeek)?.map((day, index) => (
          <h6 className={styles.wrapper_weekdays_day} key={index}>
            {day}
          </h6>
        ))}
      </div>

      <div className={styles.wrapper_days}>
        {Array.from({ length: startingDay() }).map((_, index) => (
          <Tiles today={false} key={index} />
        ))}

        {daysInMonth.map((day, index) => {
          const eventsToDay = UserEventOnTheSelectedDay(events, day);

          return (
            <div onClick={() => handleItemClick(index)}>
              <Tiles
                today={format(day, "d") === today}
                day={day}
                data={eventsToDay}
                key={index}
                setDayTarget={setDayTarget}
                setEventTarget={setEventTarget}
                role={role}
                setActive={selectedItemId === index ? true : false}
              />
            </div>
          );
        })}

        {Array.from({ length: lastDay() }).map((_, index) => (
          <Tiles today={false} key={index} />
        ))}
      </div>
    </div>
  );
}

export default CalendarMonth;
