import React, { useEffect, useState } from "react";
import styles from "./Controll.module.scss";
import { addMonths, addWeeks, format, subMonths, subWeeks } from "date-fns";
import { ReactComponent as Arrow } from "../../../images/svg/icon-dropdown.svg";
import MySelect from "../../UI/MySelect/MySelect";
import { useSelector } from "react-redux";
import { useLocalizedMonths } from "../../../helpers/enums/Months";

const Years = (num) => {
  const result = [];

  for (let i = num - 5; i <= num + 5; i++) {
    result.push({
      value: i,
      label: i,
    });
  }

  return result;
};

function Controll({ setSelectDate, week }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [year, setYear] = useState(format(currentDate, "yyyy"));
  const [month, setMonth] = useState(format(currentDate, "MMMM"));
  // eslint-disable-next-line no-unused-vars
  const [day, seyDay] = useState(format(currentDate, "dd"));

  const MONTHS = useLocalizedMonths();

  const messages = useSelector((state) => state.locale.messages);

  useEffect(() => {
    if (year && month) {
      const newDate = new Date(`${month} ${day} ${year}`);
      setCurrentDate(newDate);
      setSelectDate(newDate);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year, month]);

  useEffect(() => {
    setSelectDate(currentDate);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDate]);

  const yearArray = Years(currentDate.getFullYear());

  const nextMonth = addMonths(currentDate, 1);
  const previousMonth = subMonths(currentDate, 1);

  const nextWeek = addWeeks(currentDate, 1);
  const previousWeek = subWeeks(currentDate, 1);

  return (
    <div className={styles.controll}>
      <h3 className={styles.controll_title}>{messages.Calendar}</h3>
      {week ? (
        <div className={styles.controll_buttons}>
          <button
            onClick={() => setCurrentDate(previousWeek)}
            className={styles.controll_buttons_button}
          >
            <Arrow className={styles.controll_buttons_arrowLeft} />
          </button>
          <h4>{messages.Week}</h4>
          <button
            onClick={() => setCurrentDate(nextWeek)}
            className={styles.controll_buttons_button}
          >
            <Arrow className={styles.controll_buttons_arrowRight} />
          </button>
        </div>
      ) : (
        <div className={styles.controll_buttons}>
          <button
            onClick={() => setCurrentDate(previousMonth)}
            className={styles.controll_buttons_button}
          >
            <Arrow className={styles.controll_buttons_arrowLeft} />
          </button>
          <h4>{messages.Month}</h4>
          <button
            onClick={() => setCurrentDate(nextMonth)}
            className={styles.controll_buttons_button}
          >
            <Arrow className={styles.controll_buttons_arrowRight} />
          </button>
        </div>
      )}{" "}
      <form className={styles.form}>
        <MySelect method={(e) => setMonth(e.target.value)} value={month}>
          {Object.keys(MONTHS).map((month, index) => (
            <option value={month} key={index}>
              {MONTHS[month]}
            </option>
          ))}
        </MySelect>

        <MySelect
          method={(e) => setYear(e.target.value)}
          value={format(currentDate, "yyyy")}
        >
          {yearArray.map((year) => (
            <option value={year.value} key={year.value}>
              {year.label}
            </option>
          ))}
        </MySelect>
      </form>
    </div>
  );
}

export default Controll;
