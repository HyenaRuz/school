import {
  eachDayOfInterval,
  endOfISOWeek,
  format,
  startOfISOWeek,
} from "date-fns";
import React, { useState } from "react";
// import Card from "../Card/Сard";
import styles from "./CalendarWeekTable.module.scss";
import Controll from "../Controll/Controll";
import { ReactComponent as AddEvent } from "../../../images/svg/icon-btnCta.svg";
import {
  DaysOfWeek,
  useLocalizedDaysOfWeek,
} from "../../../helpers/enums/DaysOfWeek";
import CardMimi from "../CardMimi/CardMimi";

const hours = [
  "09",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
];

function CalendarWeekTable({ data, role }) {
  const [selectDate, setSelectDate] = useState(new Date());

  const daysOfWeek = useLocalizedDaysOfWeek();
  const eventsByDayAndHour = {};

  const firstDayOfWeek = selectDate ? startOfISOWeek(selectDate) : new Date();
  const lastDayOfWeek = selectDate ? endOfISOWeek(selectDate) : new Date();

  const daysImWeek = eachDayOfInterval({
    start: firstDayOfWeek,
    end: lastDayOfWeek,
  });

  const eventsInWeek = data.filter((event) => {
    const eventDate = event.date;

    return (
      new Date(eventDate) >= firstDayOfWeek &&
      new Date(eventDate) <= lastDayOfWeek
    );
  });

  function addEventToCalendar(event) {
    const dayOfWeek = format(event.date, "EEEE");
    const hour = format(event.date, "kk");

    if (!eventsByDayAndHour[dayOfWeek]) {
      eventsByDayAndHour[dayOfWeek] = {};
    }

    if (!eventsByDayAndHour[dayOfWeek][hour]) {
      eventsByDayAndHour[dayOfWeek][hour] = [];
    }

    eventsByDayAndHour[dayOfWeek][hour].push(event);
  }

  eventsInWeek.forEach((item) => {
    addEventToCalendar(item);
  });

  const renderCellContent = (events) => {
    if (!events || events.length === 0) {
      return (
        <div className={styles.addEvent}>
          <AddEvent />;
        </div>
      );
    }

    return events.map((event) => (
      <CardMimi event={event} key={event.id} role={role} />
    ));
  };

  return (
    <div className={styles.calendar}>
      <div >
        <Controll setSelectDate={setSelectDate} week={true} />
      </div>

      <table className={styles.calendar_table}>
        <thead>
          <tr>
            <th width="4%"></th>
            {Object.values(daysOfWeek).map((day, index) => (
              <th className={styles.calendar_title} key={day}>
                <h6>{day}</h6>
                <h6>{format(daysImWeek[index], "MMM/dd")}</h6>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {hours.map((hour) => (
            <tr key={hour}>
              <td className={styles.calendar_title}>
                <h6>{hour}</h6>
              </td>
              {Object.values(DaysOfWeek).map((day) => (
                <td key={`${day}-${hour}`} className={styles.calendar_cell}>
                  {renderCellContent(eventsByDayAndHour[day]?.[hour])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CalendarWeekTable;
