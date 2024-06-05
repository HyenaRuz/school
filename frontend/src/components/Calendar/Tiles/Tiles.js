import React from "react";
import styles from "./Tiles.module.scss";
import { format } from "date-fns";
import { Status } from "../../../helpers/enums/status.js";
import { Role } from "../../../helpers/enums/roles.js";
import classNames from "classnames/bind";

const statusStyles = {
  [Status.Cancelled]: `${styles.day_circle} ${styles.cancelled}`,
  [Status.Conducted]: `${styles.day_circle} ${styles.conducted}`,
  [Status.Missed]: `${styles.day_circle} ${styles.missed}`,
  [Status.Planned]: `${styles.day_circle}`,
  [Status.Rescheduled]: `${styles.day_circle} ${styles.rescheduled}`,
};

const users = (data, role) => {
  let counter = 0;

  if (data && data.length > 0) {
    const userElements = [];

    for (let i = 0; i < data.length; i++) {
      if (counter < 2) {
        const style = statusStyles[data[i]?.status];

        counter++;

        userElements.push(
          <div key={i} className={style}>
            <p style={{ color: "#FFFFFF", fontWeight: 700 }}>
              {role === Role.teacher
                ? `${data[i].student.firstName[0].toUpperCase()}.${data[
                    i
                  ].student.lastName[0].toUpperCase()}`
                : `${data[i].teacher.firstName[0].toUpperCase()}.${data[
                    i
                  ].teacher.lastName[0].toUpperCase()}`}
            </p>
          </div>
        );
      } else {
        userElements.push(
          <div className={styles.day_circle} key={i}>
            <h6 key={i} className={styles.day_circle_text}>
              {data.length - counter}+
            </h6>
          </div>
        );
        break;
      }
    }
    return userElements;
  }
};

function Tiles({
  data,
  day,
  today,
  setDayTarget,
  setEventTarget,
  role,
  setActive,
}) {
  return (
    <div
      className={classNames(styles.day, {
        [styles.today]: today,
        [styles.active]: setActive,
      })}
      onClick={() => (day ? (setDayTarget(day), setEventTarget(data)) : false)}
    >
      <h4 className={styles.day_namber}>{day ? format(day, "d") : ""}</h4>
      <div className={styles.day_holder}>{users(data, role)}</div>
    </div>
  );
}

export default Tiles;
