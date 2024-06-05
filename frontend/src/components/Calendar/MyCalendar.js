import { useEffect, useState } from "react";
import styles from "./MyCalendar.module.scss";
import CalendarMonth from "./CalendarMonth/CalendarMonth";
import CalendarWeekTable from "./CalendarWeekTable/CalendarWeekTable";
import { useSelector } from "react-redux";
import classNames from "classnames";
import ScheduleDetails from "./ScheduleDetails/ScheduleDetails";
import Modal from "../Modal/Modal";

const currentDate = new Date();

function MyCalendar({ events, students, refetch, role }) {
  const [dayTarget, setDayTarget] = useState();
  const [eventTarget, setEventTarget] = useState(null);
  const [toggle, setToggle] = useState(true);
  const [active, setActive] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };
  const handleActive = () => {
    setActive(!active);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const messages = useSelector((state) => state.locale.messages);

  useEffect(() => {
    setEventTarget(null);
    setDayTarget();
  }, [events]);

  useEffect(() => {
    if (dayTarget !== undefined) {
      setActive(true);
    }
  }, [dayTarget]);

  // console.log(active);

  return (
    <>
      <button
        className={classNames(styles.button, { [styles.active_right]: toggle })}
        onClick={() => setToggle(true)}
      >
        <h5>{messages.Month}</h5>
      </button>
      <button
        className={classNames(styles.button, { [styles.active]: !toggle })}
        onClick={() => setToggle(false)}
      >
        <h5>{messages.Week}</h5>
      </button>

      <div className={styles.wrapper}>
        <div className={classNames(styles.calendar, { [styles.week]: toggle })}>
          {toggle ? (
            <CalendarMonth
              currentDate={currentDate}
              events={events}
              setDayTarget={setDayTarget}
              setEventTarget={setEventTarget}
              role={role}
            />
          ) : (
            <CalendarWeekTable data={events} role={role} />
          )}
        </div>

        {windowWidth > 1435 ? (
          <ScheduleDetails
            refetch={refetch}
            students={students}
            role={role}
            eventTarget={eventTarget}
            dayTarget={dayTarget}
            toggle={toggle}
            currentDate={currentDate}
            animation={true}
          />
        ) : (
          <Modal active={active} setActive={() => handleActive()} background={true}>
            <ScheduleDetails
              refetch={refetch}
              students={students}
              role={role}
              eventTarget={eventTarget}
              dayTarget={dayTarget}
              toggle={toggle}
              currentDate={currentDate}
            />
          </Modal>
        )}
      </div>
    </>
  );
}

export default MyCalendar;
