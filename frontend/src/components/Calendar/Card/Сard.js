import { addHours, format } from "date-fns";
import styles from "./Card.module.scss";
import React, { useState } from "react";
import { ReactComponent as Clock } from "../../../images/svg/icon-clock.svg";
import { ReactComponent as Edit } from "../../../images/svg/icon-edit_square.svg";
import { ReactComponent as Book } from "../../../images/svg/icon-book_.svg";
import { Status } from "../../../helpers/enums/status.js";
import UpdateEventForm from "../../Forms/updateEventForm.js";
import { Role } from "../../../helpers/enums/roles.js";
import classNames from "classnames";
import { useSelector } from "react-redux";

const statusStyles = {
  [Status.Cancelled]: `${styles.card} ${styles.cancelled}`,
  [Status.Conducted]: `${styles.card} ${styles.conducted}`,
  [Status.Missed]: `${styles.card} ${styles.missed}`,
  [Status.Planned]: `${styles.card}`,
  [Status.Rescheduled]: `${styles.card} ${styles.rescheduled}`,
};

function Card({ event, refetch, role }) {
  const [active, setActive] = useState(false);
  const [topic, setTopic] = useState(event.topic);
  const [homework, setHomework] = useState(event.homework);
  const [bookLink, setBookLink] = useState(event.bookLink);

  const messages = useSelector((state) => state.locale.messages);

  const style = statusStyles[event.status];

  return (
    <div
      className={classNames(style, {
        [styles.active]: active,
      })}
    >
      <div className={styles.card_holder}>
        <div className={styles.card_info}>
          {role === Role.teacher ? (
            <h5
              className={styles.card_info_name}
            >{`${event?.student.firstName} ${event?.student.lastName}`}</h5>
          ) : (
            <h5
              className={styles.card_info_name}
            >{`${event?.teacher.firstName} ${event?.teacher.lastName}`}</h5>
          )}

          <div className={styles.card_info_description}>
            <div className={styles.card_info_description_title}>
              <h6 style={{ width: 55 }}>{messages.Topic}:</h6>
              <h6>
                {active ? (
                  <input
                    type="text"
                    maxLength={32}
                    style={{
                      borderBottom: "1px solid",
                      width: 200,
                      height: "100%",
                    }}
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                  />
                ) : (
                  event.topic
                )}
              </h6>
            </div>

            <div className={styles.card_info_description_title}>
              <h6 style={{ width: 55 }}>{messages.HW}:</h6>
              <h6>
                {active ? (
                  <input
                    type="text"
                    maxLength={32}
                    value={homework}
                    onChange={(e) => setHomework(e.target.value)}
                  />
                ) : (
                  event.homework
                )}
              </h6>
            </div>

            {active ? (
              <div className={styles.card_info_description_title}>
                <h6 style={{ width: 55 }}>Book:</h6>
                <h6>
                  <input
                    type="text"
                    value={bookLink}
                    onChange={(e) => setBookLink(e.target.value)}
                  />
                </h6>
              </div>
            ) : (
              <></>
            )}
          </div>

          <div className={styles.card_info_time}>
            <Clock className={styles.card_info_time_clock} />

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

        <div className={styles.card_control}>
          {role === Role.teacher ? (
            <button
              className={styles.card_control_button}
              style={{ alignSelf: "flex-start" }}
              onClick={() => setActive(!active)}
            >
              <Edit />
            </button>
          ) : (
            <></>
          )}
          <a
            className={classNames(styles.card_control_book, {
              [styles.active]: event.bookLink,
            })}
            target="_blank"
            rel="noreferrer"
            href={event.bookLink}
          >
            <Book />
          </a>
        </div>
      </div>

      {role === Role.teacher ? (
        <div
          className={classNames(styles.card_update, {
            [styles.active]: active,
          })}
        >
          <UpdateEventForm
            eventId={event.id}
            refetch={refetch}
            topic={topic}
            homework={homework}
            bookLink={bookLink}
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Card;
