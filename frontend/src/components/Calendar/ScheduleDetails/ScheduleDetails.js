import { useState } from "react";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import Card from "../Card/Сard";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { ReactComponent as AddEvent } from "../../../images/svg/icon-calendar_plus.svg";
import CardNewEnent from "../CardNewEnent/CardNewEnent";
import { Role } from "../../../helpers/enums/roles";
import styles from "./ScheduleDetails.module.scss";
import "../CardAnimation.css";

function CardMap({ eventTarget, dayTarget, refetch, role }) {
  return (
    <div className={styles.scheduleDetails_holder} key={dayTarget}>
      {eventTarget &&
        eventTarget.map((event, index) => (
          <div className={styles.scheduleDetails_holder_card} key={index}>
            <Card
              event={event}
              day={dayTarget}
              key={event.id}
              refetch={refetch}
              role={role}
            />
          </div>
        ))}
    </div>
  );
}

function ScheduleDetails({
  refetch,
  students,
  role,
  dayTarget,
  eventTarget,
  toggle,
  currentDate,
  animation,
}) {
  const [addEvent, setAddEvent] = useState(false);

  const messages = useSelector((state) => state.locale.messages);

  return (
    <div
      className={
        toggle
          ? styles.scheduleDetails
          : `${styles.scheduleDetails} ${styles.deactivate}`
      }
    >
      <div className={styles.scheduleDetails_title}>
        <div>
          <h4>{messages.ScheduleDetails}</h4>
          <h6>
            {format(
              new Date(!dayTarget ? currentDate : dayTarget),
              "MMMM d yyyy"
            )}
          </h6>
        </div>
        {role === Role.teacher ? (
          <button
            className={styles.scheduleDetails_title_addEvent}
            onClick={() => setAddEvent(!addEvent)}
          >
            <AddEvent />
          </button>
        ) : (
          <></>
        )}
      </div>

      {addEvent && role === Role.teacher ? (
        <CardNewEnent
          day={!dayTarget ? currentDate : dayTarget}
          students={students}
          refetch={refetch}
        />
      ) : (
        <></>
      )}

      {animation ? (
        <SwitchTransition mode={"in-out"}>
          <CSSTransition
            key={dayTarget}
            timeout={500}
            unmountOnExit
            classNames="fade"
          >
            <CardMap
              eventTarget={eventTarget}
              dayTarget={dayTarget}
              refetch={refetch}
              role={role}
            />
          </CSSTransition>
        </SwitchTransition>
      ) : (
        <CardMap
          eventTarget={eventTarget}
          dayTarget={dayTarget}
          refetch={refetch}
          role={role}
        />
      )}
    </div>
  );
}
export default ScheduleDetails;
