import { useSelector } from "react-redux";
import { Status } from "../../../helpers/enums/status";
import styles from "./CardMimi.module.scss";
import { Role } from "../../../helpers/enums/roles";
import { ReactComponent as Clock } from "../../../images/svg/icon-clock.svg";
import { addHours, format } from "date-fns";
import { useEffect, useState } from "react";

const statusStyles = {
  [Status.Cancelled]: `${styles.cardMini} ${styles.cancelled}`,
  [Status.Conducted]: `${styles.cardMini} ${styles.conducted}`,
  [Status.Missed]: `${styles.cardMini} ${styles.missed}`,
  [Status.Planned]: `${styles.cardMini}`,
  [Status.Rescheduled]: `${styles.cardMini} ${styles.rescheduled}`,
};

function CardMimi({ event, role }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const messages = useSelector((state) => state.locale.messages);
  const style = statusStyles[event.status];

  return (
    <div className={style}>
      <div className={styles.cardMini_holder}>
        <div className={styles.cardMini_info}>
          {role === Role.teacher ? (
            <h5 className={styles.cardMini_info_name}>
              {windowWidth <= 425
                ? `${event?.student.firstName[0].toUpperCase()}.${event?.student.lastName[0].toUpperCase()}.`
                : `${event?.student.firstName} ${event?.student.lastName}`}
            </h5>
          ) : (
            <h5 className={styles.cardMini_info_name}>
              {windowWidth <= 425
                ? `${event?.teacher.firstName[0].toUpperCase()}.${event?.teacher.lastName[0].toUpperCase()}.`
                : `${event?.teacher.firstName} ${event?.teacher.lastName}`}
            </h5>
          )}

          <div className={styles.cardMini_info_description}>
            <div className={styles.cardMini_info_description_title}>
              <h6 style={{ width: 55 }}>{messages.Topic}:</h6>
              <h6>{event.topic}</h6>
            </div>

            <div className={styles.cardMini_info_description_title}>
              <h6 style={{ width: 55 }}>{messages.HW}:</h6>
              <h6>{event.homework}</h6>
            </div>
          </div>

          <div className={styles.cardMini_info_time}>
            <Clock className={styles.cardMini_info_time_clock} />

            <h6>
              {event?.date ? format(event.date, "kk:mm") : ""}
              {" - "}
              {event?.date ? format(addHours(event.date, 1), "kk:mm") : ""}
            </h6>
          </div>

          {event?.rescheduled ? (
            <h6>
              Rescheduled:{" "}
              {event?.rescheduled
                ? format(event.rescheduled, "d MMMM kk:mm")
                : ""}
            </h6>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default CardMimi;
