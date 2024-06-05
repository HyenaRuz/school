import React, { useState } from "react";
import styles from "./CalendarWeek.module.scss";
import Controll from "../Controll/Controll";
import Card from "../Card/Сard";
import {
  eachDayOfInterval,
  endOfISOWeek,
  format,
  fromUnixTime,
  startOfISOWeek,
} from "date-fns";

const WEEKDAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const UserEventOnTheSelectedDay = (data, day) => {
  const events = data.filter(
    (event) =>
      format(fromUnixTime(event.data), "EEEE") === format(new Date(day), "EEEE")
  );
  return events;
};

function CalendarWeek({ users, toggle, data }) {
  const [selectDate, setSelectDate] = useState(new Date());

  const firstDayOfWeek = selectDate ? startOfISOWeek(selectDate) : new Date();
  const lastDayOfWeek = selectDate ? endOfISOWeek(selectDate) : new Date();

  const daysImWeek = eachDayOfInterval({
    start: firstDayOfWeek,
    end: lastDayOfWeek,
  });

  const daysImWeekFormatted = daysImWeek.map((day) => {
    const options = { month: "2-digit", day: "2-digit" };
    return new Intl.DateTimeFormat("en-US", options).format(day);
  });

  const eventsInWeek = data.filter((event) => {
    const eventDate = fromUnixTime(event.date);

    return eventDate >= firstDayOfWeek && eventDate <= lastDayOfWeek;
  });

  return (
    <div className={styles.wrapper}>
      <Controll setSelectDate={setSelectDate} week={true} />

      <div>
        <div className={styles.weekdays}>
          {WEEKDAYS.map((day, index) => (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <h6 className={styles.weekdays_dayOfWeek} key={index}>
                {day}
              </h6>

              <h6>{daysImWeekFormatted[index]}</h6>
            </div>
          ))}
        </div>

        <div className={styles.weekdays_columns}>
          {daysImWeek.map((day, index) => (
            <div key={index} className={styles.weekdays_columns_column}>
              {UserEventOnTheSelectedDay(data, day).map((user, index) => (
                <Card day={day} user={user} mini={true} key={index} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default CalendarWeek;
